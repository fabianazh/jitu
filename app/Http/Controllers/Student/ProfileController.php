<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $auth = Student::find(auth()->guard('student')->user()->nis)->getDetailData();

        return Inertia::render('Dashboard/Settings/Profile/Index', [
            'auth' => [
                'student' => [
                    'user' => $auth,
                    'unreadNotifications' => isset(auth()->guard('student')->user()->unreadNotifications) ? auth()->guard('student')->user()->unreadNotifications->count() : 0
                ]
            ]
        ]);
    }
}
