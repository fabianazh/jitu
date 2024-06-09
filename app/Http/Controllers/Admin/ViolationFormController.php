<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreViolationFormRequest;
use App\Http\Requests\Admin\UpdateViolationFormRequest;
use App\Models\Sanction;
use App\Models\ViolationCategory;
use App\Models\ViolationForm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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

    public function create()
    {
        $maxWeight = Sanction::max('weight_to');

        return Inertia::render('Dashboard/ViolationForm/Create', [
            'maxWeight' => $maxWeight,
            'lowCategory' => intval(env('FIRST_MAX_POINTS')),
            'mediumCategory' => intval(env('SECOND_MAX_POINTS')),
        ]);
    }

    public function store(StoreViolationFormRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['id'] = Str::uuid();
        $validatedData['weight'] = intval($request->weight);

        ViolationForm::create($validatedData);

        return Redirect::route('admin.dashboard.forms_of_violation.index')->with('success', 'Bentuk pelanggaran berhasil disimpan.');
    }

    public function show(ViolationForm $violationForm)
    {
        return Inertia::render('Dashboard/ViolationForm/Detail', [
            'violationForm' => $violationForm->getDetailData()
        ]);
    }

    public function edit(ViolationForm $violationForm)
    {
        $maxWeight = Sanction::max('weight_to');

        return Inertia::render('Dashboard/ViolationForm/Edit', [
            'violationForm' => $violationForm->getDetailData(),
            'maxWeight' => $maxWeight,
        ]);
    }

    public function update(UpdateViolationFormRequest $request, ViolationForm $violationForm): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['weight'] = intval($request->weight);

        $violationForm->update($validatedData);

        return Redirect::route('admin.dashboard.forms_of_violation.index')->with('success', 'Bentuk pelanggaran berhasil diperbarui.');
    }

    public function destroy(ViolationForm $violationForm): RedirectResponse
    {
        $violationForm->delete();

        return Redirect::route('admin.dashboard.forms_of_violation.index')->with('success', 'Bentuk pelanggaran berhasil dihapus.');
    }
}
