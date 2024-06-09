<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreClassRequest;
use App\Http\Requests\Admin\UpdateClassRequest;
use App\Models\Grade;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;
        $currentPage = $request->input('page', 1);

        $classes = Grade::skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function (Grade $class) {
                return $class->getPreviewData();
            });

        return Inertia::render('Dashboard/Class/Index', [
            'classes' => $classes,
            'totalClasses' => Grade::count(),
            'currentPage' => intval($currentPage),
            'perPage' => $perPage
        ]);
    }

    public function create()
    {
        $classes = Grade::all()->map(function (Grade $class) {
            return $class->getActionData();
        });

        $majors = Major::all()->map(function (Major $major) {
            return $major->getPreviewData();
        });

        return Inertia::render('Dashboard/Class/Create', [
            'classes' => $classes,
            'majors' => $majors,
        ]);
    }

    public function store(StoreClassRequest $request)
    {
        $validatedData = $request->validated();
        $classNumber = explode('-', $request->class_number);
        $validatedData['class_number'] = intval($classNumber[1]);

        Grade::create($validatedData);

        return Redirect::route('admin.dashboard.classes.index')->with('success', 'Data kelas berhasil ditambahkan');
    }

    public function show(Grade $class)
    {
        return Inertia::render('Dashboard/Class/Detail', [
            'grade' => $class->getDetailData(),
        ]);
    }

    public function edit(Grade $class)
    {
        $classes = Grade::all()->map(function (Grade $class) {
            return $class->getPreviewData();
        });

        $majors = Major::all()->map(function (Major $major) {
            return $major->getPreviewData();
        });

        return Inertia::render('Dashboard/Class/Edit', [
            'grade' => $class->getDetailData(),
            'classes' => $classes,
            'majors' => $majors,
        ]);
    }

    public function update(UpdateClassRequest $request, Grade $class)
    {
        $validatedData = $request->validated();

        $class->update($validatedData);

        return Redirect::route('admin.dashboard.classes.index')->with('success', 'Data kelas berhasil diperbarui.');
    }

    public function destroy(Grade $class)
    {
        $class->delete();

        return Redirect::route('admin.dashboard.classes.index')->with('success', 'Data kelas berhasil dihapus.');
    }
}
