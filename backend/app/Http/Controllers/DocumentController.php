<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show', 'download']]);
    }

    public function index(Request $request)
    {
        try {
            $query = Document::with(['conference', 'uploadedBy']);

            // Filter by conference
            if ($request->has('conference_id')) {
                $query->where('conference_id', $request->conference_id);
            }

            // Filter by type
            if ($request->has('type')) {
                $query->where('type', $request->type);
            }

            // Search by title
            if ($request->has('search')) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }

            $documents = $query->orderBy('created_at', 'desc')->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $documents
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch documents'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $document = Document::with(['conference', 'uploadedBy'])->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $document
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Document not found'
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'conference_id' => 'required|exists:conferences,id',
            'type' => 'required|in:presentation,document,image,video,other',
            'file' => 'required|file|max:10240', // 10MB max
            'is_public' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Upload file
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('documents', $filename, 'public');

            $document = Document::create([
                'title' => $request->title,
                'description' => $request->description,
                'conference_id' => $request->conference_id,
                'type' => $request->type,
                'filename' => $filename,
                'file_path' => $filePath,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'is_public' => $request->boolean('is_public', true),
                'uploaded_by' => auth()->id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Document uploaded successfully',
                'data' => $document
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload document'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|in:presentation,document,image,video,other',
            'is_public' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $document = Document::findOrFail($id);
            $document->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Document updated successfully',
                'data' => $document
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update document'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $document = Document::findOrFail($id);
            
            // Delete file
            if ($document->file_path) {
                Storage::disk('public')->delete($document->file_path);
            }
            
            $document->delete();

            return response()->json([
                'success' => true,
                'message' => 'Document deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete document'
            ], 500);
        }
    }

    public function download($id)
    {
        try {
            $document = Document::findOrFail($id);
            
            if (!Storage::disk('public')->exists($document->file_path)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], 404);
            }

            // Increment download count
            $document->increment('download_count');

            return Storage::disk('public')->download($document->file_path, $document->filename);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to download document'
            ], 500);
        }
    }
}
