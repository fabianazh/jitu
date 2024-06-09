<?php

namespace App\Http\Controllers\Student;

use App\Models\Violation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $violations = auth()->guard('student')->user()->violations();

        return Inertia::render('Dashboard/History/Index', [
            'violations' => $violations->orderBy('created_at', 'asc')->get()->map(function (Violation $violation) {
                return $violation->getDetailData();
            }),
            'totalViolations' => $violations->count()
        ]);
    }

    public function show(Violation $violation)
    {
        return Inertia::render('Dashboard/History/Detail', [
            'violation' => $violation->getDetailData(),
        ]);
    }
}
