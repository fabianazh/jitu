<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use App\Models\AuthEndpoint;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function index(Request $request): Response
    {
        $authEndpoint = AuthEndpoint::find(1);

        if ($authEndpoint->endpoint === $request->authEndpoint) {

            return Inertia::render('Auth/AdminLogin', [
                'canResetPassword' => Route::has('password.request'),
                'status' => session('status'),
            ]);
        } else {
            return abort(404);
        }
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $authEndpoint = AuthEndpoint::find(1);

        if ($authEndpoint->endpoint === $request->authEndpoint) {

            $request->authenticate();

            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard.index'))->with('info', 'Login berhasil.');
        } else {
            return abort(404);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('landing.home'))->with('info', 'Logout berhasil.');
    }
}
