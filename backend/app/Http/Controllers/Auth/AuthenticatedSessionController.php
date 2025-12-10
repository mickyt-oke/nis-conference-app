<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * The authentication guard name.
     */
    private const GUARD = 'web';
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request  The login request instance containing user credentials.
     * @return \Illuminate\Http\Response  Returns a response with no content on successful authentication.
     * @throws \Illuminate\Validation\ValidationException  If the authentication fails due to invalid credentials.
     */
    public function store(LoginRequest $request): \Symfony\Component\HttpFoundation\Response
    {
        $request->authenticate();

        $request->session()->regenerate();

        return response()->noContent();
    }

    /**
     * Log out the authenticated user and invalidate the session.
     *
     * @param \Illuminate\Http\Request $request The current HTTP request instance.
     * @return \Illuminate\Http\Response
     * @throws \Exception If session invalidation or token regeneration fails.
     */
    public function destroy(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        Auth::guard(self::GUARD)->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
