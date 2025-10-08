<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Speaker;

class SpeakerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        try {
            $speakers = Speaker::with(['conferences'])->get();
            
            return response()->json([
                'success' => true,
                'data' => $speakers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch speakers'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $speaker = Speaker::with(['conferences'])->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $speaker
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Speaker not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'biography' => 'required|string',
            'expertise' => 'required|string',
            'email' => 'required|email|unique:speakers,email',
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|string|max:100',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'required|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->all();

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('speakers', 'public');
                $data['photo'] = $photoPath;
            }

            $speaker = Speaker::create($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Speaker created successfully',
                'data' => $speaker
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create speaker'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'title' => 'sometimes|required|string|max:255',
            'organization' => 'sometimes|required|string|max:255',
            'biography' => 'sometimes|required|string',
            'expertise' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:speakers,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|string|max:100',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'status' => 'sometimes|required|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $speaker = Speaker::findOrFail($id);
            $data = $request->all();

            // Handle photo upload
            if ($request->hasFile('photo')) {
                // Delete old photo
                if ($speaker->photo) {
                    Storage::disk('public')->delete($speaker->photo);
                }
                
                $photoPath = $request->file('photo')->store('speakers', 'public');
                $data['photo'] = $photoPath;
            }

            $speaker->update($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Speaker updated successfully',
                'data' => $speaker
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update speaker'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $speaker = Speaker::findOrFail($id);
            
            // Delete photo
            if ($speaker->photo) {
                Storage::disk('public')->delete($speaker->photo);
            }
            
            $speaker->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Speaker deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete speaker'
            ], 500);
        }
    }
}
