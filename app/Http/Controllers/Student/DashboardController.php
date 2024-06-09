<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'totalPoints' => auth()->guard('student')->user()->points['points'],
            'totalMessage' => auth()->guard('student')->user()->notifications()->count(),
            'totalViolations' => auth()->guard('student')->user()->violations()->count(),
        ]);
    }
}
