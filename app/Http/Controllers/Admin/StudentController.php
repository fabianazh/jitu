<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStudentRequest;
use App\Http\Requests\Admin\UpdateStudentRequest;
use App\Models\Grade;
use App\Models\Student;
use App\Models\StudentPoints;
use App\Models\Violation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $query = Student::query();

        $currentPage = $request->input('page', 1);

        $totalStudents = Student::count();

        if ($request->has('filter') && $request->input('filter') !== 'all') {
            $query->where('status', $request->input('filter'));
            $totalStudents = $query->count();
        }

        $sortField = $request->input('sort') ?? 'name';
        $sortDirection = $request->input('direction') ?? 'asc';

        $query->leftJoin('student_points', 'students.nis', '=', 'student_points.student_id');
        $query->select('students.*', DB::raw('COALESCE(MAX(student_points.points), 0) AS max_points'));
        $query->groupBy('students.nis');

        if ($sortField === 'points') {
            $query->orderBy('max_points', $sortDirection);
        } else {
            $query->orderBy($sortField, $sortDirection);
        }

        $students = $query->skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function (Student $student) {
                return $student->getPreviewData();
            });

        return Inertia::render('Dashboard/Student/Index', [
            'students' => $students,
            'totalStudents' => $totalStudents,
            'sort' => $sortField,
            'direction' => $sortDirection,
            'currentPage' => intval($currentPage),
            'perPage' => $perPage,
            'filter' => $request->input('filter') ?? "all"
        ]);
    }

    public function create()
    {
        $classes = Grade::all()->map(function (Grade $class) {
            return $class->getActionData();
        });

        return Inertia::render('Dashboard/Student/Create', [
            'classes' => $classes
        ]);
    }

    public function show(Student $student)
    {
        $violations = $student->violations();

        return Inertia::render('Dashboard/Student/Detail', [
            'student' => $student->getDetailData(),
            'violations' => $violations->orderBy('created_at', 'asc')->get()->map(function (Violation $violation) {
                return $violation->getDetailData();
            }),
            'totalViolations' => $violations->count()
        ]);
    }

    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['nis'] = intval($request->nis);
        $grade_id = Grade::find(Str::lower($validatedData['class_name']))['id'];
        $validatedData['grade_id'] = $grade_id;

        if ($request->file('photo')) {
            $validatedData['photo'] = $request->file('photo')->store('img/student' . $request->input('photo'));
        }

        $student = Student::create($validatedData);

        StudentPoints::create([
            'student_id' => $student->nis,
        ]);

        return Redirect::to(route('admin.dashboard.students.index'))->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function edit(Student $student)
    {
        $classes = Grade::all()->map(function (Grade $class) {
            return $class->getActionData();
        });

        return Inertia::render('Dashboard/Student/Edit', [
            'student' => $student->getActionData(),
            'classes' => $classes
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['nis'] = intval($request->nis);
        // dd($request->file('photo'));
        if ($request->file('photo')) {
            if ($student->photo && $student->photo !== 'img/avatar/default-avatar.jpg') {
                Storage::delete($request->old_photo);
            }
            $validatedData['photo'] = $request->file('photo')->store('img/student/' . $request->input('photo'));
        } else if ($request->file('photo') === null) {
            $validatedData['photo'] = $student->photo;
        }

        $student->update($validatedData);

        return Redirect::route('admin.dashboard.students.index')->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        if ($student->photo && $student->photo !== 'img/avatar/default-avatar.jpg') {
            Storage::delete($student->photo);
        }

        $student->delete();

        return Redirect::route('admin.dashboard.students.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}
