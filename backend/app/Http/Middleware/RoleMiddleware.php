<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            if (!in_array($user->role, $roles)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient permissions'
                ], 403);
            }

            return $next($request);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token invalid'
            ], 401);
        }
    }
}
