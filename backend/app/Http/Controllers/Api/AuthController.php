<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Controller for handling authentication-related API requests.
 */
class AuthController extends Controller
{
    /**
     * Handle user login and create JWT token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Could not create token'], 500);
        }

        $user = JWTAuth::user();

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                // 'role' => $user->role, // Removed for privacy
            ],
        ]);
    }

    /**
     * Invalidate the token, logging out the user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 400);
            }
            JWTAuth::invalidate($token);
            return response()->json(['message' => 'Logged out']);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Failed to logout, please try again.'], 500);
        }
    }

    /**
     * Get the authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            if (!$token) {
                return response()->json(['message' => 'Token not provided'], 400);
            }
            $user = JWTAuth::authenticate($token);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            return response()->json(['user' => $user]);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $currentToken = JWTAuth::getToken();
            if (!$currentToken) {
                return response()->json(['message' => 'Token not provided'], 400);
            }
            $token = JWTAuth::refresh($currentToken);
            return response()->json(['token' => $token]);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Failed to refresh token'], 500);
        }
    }
}
