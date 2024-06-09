<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ViolationForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViolationFormController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $currentPage = $request->input('page', 1);

        $violationForms = ViolationForm::skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->orderBy('weight', 'asc')
            ->get()
            ->map(function (ViolationForm $violationForm) {
                return $violationForm->getPreviewData();
            });

        return Inertia::render('Dashboard/ViolationForm/Index', [
            'violationForms' => $violationForms,
            'totalViolationForms' => ViolationForm::count(),
            'currentPage' => intval($currentPage),
            'perPage' => $perPage
        ]);
    }

    public function show(ViolationForm $violationForm)
    {
        return Inertia::render('Dashboard/ViolationForm/Detail', [
            'violationForm' => $violationForm->getDetailData()
        ]);
    }
}
