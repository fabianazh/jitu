<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $profilePath = asset('storage/' . auth()->guard('student')->user()->photo);

        return Inertia::render('Dashboard/Settings/Index', [
            'profilePath' => $profilePath,
        ]);
    }
}
