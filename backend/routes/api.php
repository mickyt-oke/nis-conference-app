<?php
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('/users', function(){
    return UserResource::collection(User::all());
});

Route::post('/login', [AuthController::class, 'login']);

// Add RBAC and JWT middleware to these routes
Route::middleware(['auth:api', 'role:user'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    // Other user-specific protected routes can go here
});

Route::middleware(['auth:api', 'role:admin'])->group(function () {
    // Admin routes here
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Admin Dashboard']);
    });
});

Route::middleware(['auth:api', 'role:supervisor'])->group(function () {
    // Supervisor routes here
    Route::get('/supervisor/dashboard', function () {
        return response()->json(['message' => 'Supervisor Dashboard']);
    });
});

