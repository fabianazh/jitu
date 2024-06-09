<?php

namespace App\Http\Middleware;

use App\Models\AuthEndpoint;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class AdminAuthenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        $authEndpoint = AuthEndpoint::find(1);
        return $request->expectsJson() ? null : route('admin.login.index', $authEndpoint->endpoint);
    }
}
