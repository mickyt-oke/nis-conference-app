<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Conference;
use App\Models\Registration;

class ConferenceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        try {
            $conferences = Conference::with(['registrations' => function($query) {
                $query->select('conference_id', \DB::raw('count(*) as total'))
                      ->groupBy('conference_id');
            }])->get();

            return response()->json([
                'success' => true,
                'data' => $conferences
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch conferences'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $conference = Conference::with(['registrations', 'speakers'])->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $conference
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Conference not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'location' => 'required|string|max:255',
            'max_attendees' => 'required|integer|min:1',
            'registration_fee' => 'required|numeric|min:0',
            'status' => 'required|in:draft,published,ongoing,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $conference = Conference::create($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Conference created successfully',
                'data' => $conference
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create conference'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'location' => 'sometimes|required|string|max:255',
            'max_attendees' => 'sometimes|required|integer|min:1',
            'registration_fee' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:draft,published,ongoing,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $conference = Conference::findOrFail($id);
            $conference->update($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Conference updated successfully',
                'data' => $conference
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update conference'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $conference = Conference::findOrFail($id);
            $conference->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Conference deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete conference'
            ], 500);
        }
    }

    public function getUpcoming()
    {
        try {
            $conferences = Conference::where('start_date', '>', now())
                                   ->where('status', 'published')
                                   ->orderBy('start_date', 'asc')
                                   ->limit(6)
                                   ->get();

            return response()->json([
                'success' => true,
                'data' => $conferences
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch upcoming conferences'
            ], 500);
        }
    }
}
