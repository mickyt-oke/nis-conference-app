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

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });

    // Conference routes
    Route::apiResource('conferences', ConferenceController::class);
    
    // Registration routes
    Route::prefix('registrations')->group(function () {
        Route::get('/', [RegistrationController::class, 'index']);
        Route::post('/', [RegistrationController::class, 'store']);
        Route::get('/{id}', [RegistrationController::class, 'show']);
        Route::put('/{id}', [RegistrationController::class, 'update']);
        Route::delete('/{id}', [RegistrationController::class, 'destroy']);
        Route::patch('/{id}/approve', [RegistrationController::class, 'approve']);
        Route::patch('/{id}/reject', [RegistrationController::class, 'reject']);
    });

    // Speaker routes
    Route::apiResource('speakers', SpeakerController::class);
    Route::post('speakers/{id}/photo', [SpeakerController::class, 'uploadPhoto']);

    // Document routes
    Route::apiResource('documents', DocumentController::class);
    Route::post('documents/{id}/file', [DocumentController::class, 'uploadFile']);

    // Admin only routes
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/dashboard', function () {
            return response()->json(['message' => 'Admin dashboard data']);
        });
    });

    // Supervisor routes
    Route::middleware('role:supervisor,admin')->group(function () {
        Route::get('supervisor/dashboard', function () {
            return response()->json(['message' => 'Supervisor dashboard data']);
        });
    });
});

// Health check
Route::get('health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});
