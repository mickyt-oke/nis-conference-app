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

// Public routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Protected routes
Route::group(['middleware' => 'auth:api'], function () {
    // Auth routes
    Route::group(['prefix' => 'auth'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });

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
    Route::group(['middleware' => 'role:admin'], function () {
        Route::get('admin/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Admin dashboard data',
                'data' => [
                    'total_users' => \App\Models\User::count(),
                    'total_conferences' => \App\Models\Conference::count(),
                    'total_registrations' => \App\Models\Registration::count(),
                    'total_speakers' => \App\Models\Speaker::count(),
                ]
            ]);
        });
    });

    // Supervisor routes
    Route::group(['middleware' => 'role:supervisor,admin'], function () {
        Route::get('supervisor/dashboard', function () {
            return response()->json([
                'success' => true,
                'message' => 'Supervisor dashboard data',
                'data' => [
                    'pending_registrations' => \App\Models\Registration::where('status', 'pending')->count(),
                    'active_conferences' => \App\Models\Conference::where('status', 'active')->count(),
                ]
            ]);
        });
    });
});

// Fallback route
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'API endpoint not found'
    ], 404);
});
