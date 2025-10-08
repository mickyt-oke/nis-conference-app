<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConferenceController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\DocumentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'service' => 'NIS Conference API'
    ]);
});

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    
    // Conference routes
    Route::apiResource('conferences', ConferenceController::class);
    Route::post('conferences/{conference}/register', [ConferenceController::class, 'register']);
    Route::get('conferences/{conference}/registrations', [ConferenceController::class, 'getRegistrations']);
    
    // Registration routes
    Route::apiResource('registrations', RegistrationController::class);
    Route::patch('registrations/{registration}/approve', [RegistrationController::class, 'approve']);
    Route::patch('registrations/{registration}/reject', [RegistrationController::class, 'reject']);
    
    // Speaker routes
    Route::apiResource('speakers', SpeakerController::class);
    Route::post('speakers/{speaker}/upload-photo', [SpeakerController::class, 'uploadPhoto']);
    
    // Document routes
    Route::apiResource('documents', DocumentController::class);
    Route::post('documents/upload', [DocumentController::class, 'upload']);
    Route::get('documents/{document}/download', [DocumentController::class, 'download']);
    
    // Admin only routes
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/dashboard', function () {
            return response()->json([
                'message' => 'Admin dashboard data',
                'stats' => [
                    'total_conferences' => \App\Models\Conference::count(),
                    'total_registrations' => \App\Models\Registration::count(),
                    'total_speakers' => \App\Models\Speaker::count(),
                    'total_documents' => \App\Models\Document::count(),
                ]
            ]);
        });
        
        Route::get('admin/users', function () {
            return response()->json([
                'users' => \App\Models\User::select('id', 'name', 'email', 'role', 'created_at')->get()
            ]);
        });
    });
    
    // Supervisor routes
    Route::middleware('role:admin,supervisor')->group(function () {
        Route::get('supervisor/registrations', [RegistrationController::class, 'getPendingRegistrations']);
        Route::patch('supervisor/registrations/{registration}/process', [RegistrationController::class, 'processRegistration']);
    });
});

// Fallback route
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'API endpoint not found'
    ], 404);
});
