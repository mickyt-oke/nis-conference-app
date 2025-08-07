<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Models\Registration;
use App\Models\Conference;
use App\Mail\RegistrationConfirmation;
use App\Mail\SupervisorNotification;

class RegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    public function index(Request $request)
    {
        try {
            $query = Registration::with(['conference', 'user']);

            // Filter by status
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filter by conference
            if ($request->has('conference_id')) {
                $query->where('conference_id', $request->conference_id);
            }

            // Filter by registration type
            if ($request->has('registration_type')) {
                $query->where('registration_type', $request->registration_type);
            }

            $registrations = $query->orderBy('created_at', 'desc')->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $registrations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch registrations'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'registration_type' => 'required|in:attendee,speaker,team',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'conference_id' => 'required|exists:conferences,id',
            'organization' => 'nullable|string|max:255',
            'job_title' => 'nullable|string|max:255',
        ]);

        // Additional validation based on registration type
        if ($request->registration_type === 'speaker') {
            $validator->addRules([
                'biography' => 'required|string',
                'presentation_title' => 'required|string|max:255',
                'presentation_abstract' => 'required|string',
                'expertise' => 'required|string|max:255',
                'experience' => 'required|string'
            ]);
        }

        if ($request->registration_type === 'team') {
            $validator->addRules([
                'staff_id' => 'required|string|max:50',
                'department' => 'required|string|max:255',
                'grade_level' => 'required|string|max:10',
                'supervisor_name' => 'required|string|max:255',
                'supervisor_email' => 'required|email|max:255',
                'justification' => 'required|string'
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check conference availability
            $conference = Conference::findOrFail($request->conference_id);
            $currentRegistrations = Registration::where('conference_id', $conference->id)
                                                ->where('status', '!=', 'cancelled')
                                                ->count();

            if ($currentRegistrations >= $conference->max_attendees) {
                return response()->json([
                    'success' => false,
                    'message' => 'Conference is fully booked'
                ], 400);
            }

            // Generate registration ID
            $registrationId = 'NIS-' . time() . '-' . strtoupper(substr(md5(uniqid()), 0, 6));

            // Create registration
            $registration = Registration::create([
                'registration_id' => $registrationId,
                'conference_id' => $request->conference_id,
                'registration_type' => $request->registration_type,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'organization' => $request->organization,
                'job_title' => $request->job_title,
                'status' => $request->registration_type === 'team' ? 'pending' : 'confirmed',
                'registration_data' => json_encode($request->except(['_token', 'conference_id', 'registration_type', 'first_name', 'last_name', 'email', 'phone', 'organization', 'job_title']))
            ]);

            // Send confirmation email
            Mail::to($registration->email)->send(new RegistrationConfirmation($registration, $conference));

            // Send supervisor notification for team registrations
            if ($request->registration_type === 'team') {
                Mail::to($request->supervisor_email)->send(new SupervisorNotification($registration, $conference));
            }

            return response()->json([
                'success' => true,
                'message' => 'Registration submitted successfully',
                'data' => [
                    'registration_id' => $registrationId,
                    'status' => $registration->status
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $registration = Registration::with(['conference'])->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $registration
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration not found'
            ], 404);
        }
    }

    public function approve(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $registration = Registration::findOrFail($id);
            
            if ($registration->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Registration is not pending approval'
                ], 400);
            }

            $registration->update([
                'status' => 'approved',
                'approved_at' => now(),
                'approved_by' => auth()->id(),
                'supervisor_comments' => $request->comments
            ]);

            // Send approval email
            Mail::to($registration->email)->send(new \App\Mail\ApprovalNotification($registration, 'approved'));

            return response()->json([
                'success' => true,
                'message' => 'Registration approved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to approve registration'
            ], 500);
        }
    }

    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comments' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $registration = Registration::findOrFail($id);
            
            if ($registration->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Registration is not pending approval'
                ], 400);
            }

            $registration->update([
                'status' => 'rejected',
                'rejected_at' => now(),
                'rejected_by' => auth()->id(),
                'supervisor_comments' => $request->comments
            ]);

            // Send rejection email
            Mail::to($registration->email)->send(new \App\Mail\ApprovalNotification($registration, 'rejected'));

            return response()->json([
                'success' => true,
                'message' => 'Registration rejected successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject registration'
            ], 500);
        }
    }
}
