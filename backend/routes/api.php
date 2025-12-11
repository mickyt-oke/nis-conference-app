<?php
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminAuthController;

Route::get('/users', function(){
    return UserResource::collection(User::all());
});

// Public authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Admin authentication routes (public)
Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/verify-email', [AdminAuthController::class, 'verifyEmail']);
Route::post('/admin/request-password-reset', [AdminAuthController::class, 'requestPasswordReset']);
Route::post('/admin/reset-password', [AdminAuthController::class, 'resetPassword']);

// User protected routes
Route::middleware(['auth:api', 'role:user'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

// Admin protected routes
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Admin Dashboard']);
    });
});

// Supervisor protected routes
Route::middleware(['auth:api', 'role:supervisor'])->group(function () {
    Route::get('/supervisor/dashboard', function () {
        return response()->json(['message' => 'Supervisor Dashboard']);
    });
});
