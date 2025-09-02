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
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Health check
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'service' => 'NIS Conference CMS API'
    ]);
});

// Authentication routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
    
    // Admin only routes
    Route::middleware(['auth:api', 'role:admin'])->group(function () {
        Route::get('users', [AuthController::class, 'users']);
        Route::put('users/{id}/status', [AuthController::class, 'updateUserStatus']);
    });
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    
    // Conference routes
    Route::apiResource('conferences', ConferenceController::class);
    Route::post('conferences/{conference}/publish', [ConferenceController::class, 'publish']);
    Route::post('conferences/{conference}/unpublish', [ConferenceController::class, 'unpublish']);
    
    // Registration routes
    Route::apiResource('registrations', RegistrationController::class);
    Route::put('registrations/{registration}/approve', [RegistrationController::class, 'approve']);
    Route::put('registrations/{registration}/reject', [RegistrationController::class, 'reject']);
    Route::get('conferences/{conference}/registrations', [RegistrationController::class, 'getByConference']);
    
    // Speaker routes
    Route::apiResource('speakers', SpeakerController::class);
    Route::post('speakers/{speaker}/upload-photo', [SpeakerController::class, 'uploadPhoto']);
    Route::get('conferences/{conference}/speakers', [SpeakerController::class, 'getByConference']);
    
    // Document routes
    Route::apiResource('documents', DocumentController::class);
    Route::post('documents/{document}/upload', [DocumentController::class, 'upload']);
    Route::get('documents/{document}/download', [DocumentController::class, 'download']);
    Route::get('conferences/{conference}/documents', [DocumentController::class, 'getByConference']);
    
    // Admin only routes
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/dashboard', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'total_conferences' => \App\Models\Conference::count(),
                    'total_registrations' => \App\Models\Registration::count(),
                    'total_speakers' => \App\Models\Speaker::count(),
                    'total_documents' => \App\Models\Document::count(),
                    'pending_registrations' => \App\Models\Registration::where('status', 'pending')->count(),
                ]
            ]);
        });
    });
    
    // Supervisor routes
    Route::middleware('role:supervisor,admin')->group(function () {
        Route::get('supervisor/dashboard', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'my_conferences' => \App\Models\Conference::where('created_by', auth()->id())->count(),
                    'pending_approvals' => \App\Models\Registration::where('status', 'pending')->count(),
                ]
            ]);
        });
    });
});

// Public routes (no authentication required)
Route::group(['prefix' => 'public'], function () {
    Route::get('conferences', [ConferenceController::class, 'publicIndex']);
    Route::get('conferences/{conference}', [ConferenceController::class, 'publicShow']);
    Route::get('speakers', [SpeakerController::class, 'publicIndex']);
    Route::get('speakers/{speaker}', [SpeakerController::class, 'publicShow']);
});
