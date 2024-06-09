<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'student' => [
                    'user' => auth()->guard('student')->user(),
                    'unreadNotifications' => isset(auth()->guard('student')->user()->unreadNotifications) ? auth()->guard('student')->user()->unreadNotifications->count() : 0
                ],
                'admin' => [
                    'user' => auth()->guard('admin')->user(),
                    'unreadNotifications' => isset(auth()->guard('admin')->user()->unreadNotifications) ? auth()->guard('admin')->user()->unreadNotifications->count() : 0,

                ],
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'info' => fn() => $request->session()->get('info'),
                'success' => fn() => $request->session()->get('success'),
                'warning' => fn() => $request->session()->get('warning'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }
}
