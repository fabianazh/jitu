<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreMajorRequest;
use App\Http\Requests\Admin\UpdateMajorRequest;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MajorController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;
        $currentPage = $request->input('page', 1);

        $majors = Major::skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function (Major $major) {
                return $major->getPreviewData();
            });

        return Inertia::render('Dashboard/Major/Index', [
            'majors' => $majors,
            'totalMajors' => Major::count(),
            'currentPage' => intval($currentPage),
            'perPage' => $perPage
        ]);
    }

    public function create()
    {
        $majors = Major::all()->map(function (Major $major) {
            return $major->getPreviewData();
        });

        return Inertia::render('Dashboard/Major/Create', [
            'majors' => $majors,
        ]);
    }

    public function store(StoreMajorRequest $request)
    {
        $validatedData = $request->validated();

        Major::create($validatedData);

        return Redirect::route('admin.dashboard.majors.index')->with('success', 'Data jurusan berhasil ditambahkan');
    }

    public function show(Major $major)
    {
        $major = Major::find($major->id);

        if (!$major) {
            return Redirect::back()->with('error', 'Jurusan tidak ditemukan');
        }

        return Inertia::render('Dashboard/Major/Detail', [
            'major' => $major->getDetailData(),
        ]);
    }

    public function edit(Major $major)
    {
        $major = Major::find($major->id);

        if (!$major) {
            return Redirect::back()->with('error', 'Jurusan tidak ditemukan');
        }

        $majors = Major::all()->map(function (Major $major) {
            return $major->getPreviewData();
        });

        return Inertia::render('Dashboard/Major/Edit', [
            'majors' => $majors,
            'major' => $major->getDetailData(),
        ]);
    }

    public function update(UpdateMajorRequest $request, Major $major)
    {
        $validatedData = $request->validated();
        $major->update($validatedData);

        return Redirect::route('admin.dashboard.majors.index')->with('success', 'Data jurusan berhasil diperbarui.');
    }

    public function destroy(Major $major)
    {
        $major->delete();

        return Redirect::route('admin.dashboard.majors.index')->with('success', 'Data jurusan berhasil dihapus.');
    }
}
