<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreViolationRequest;
use App\Http\Requests\Admin\UpdateViolationRequest;
use App\Models\Grade;
use App\Models\Sanction;
use App\Models\Student;
use App\Models\StudentPoints;
use App\Models\Violation;
use App\Models\ViolationForm;
use App\Notifications\NewViolation;
use App\Notifications\PointsThresholdReached;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ViolationController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $query = Violation::query();

        $currentPage = $request->input('page', 1);

        if ($request->has('filter') && $request->input('filter') !== 'all') {
            $query->where('violation_category_id', $request->input('filter'));
        }

        $validSortOptions = ['updated_at', 'student_name'];
        $sortField = in_array($request->input('sort'), $validSortOptions) ? $request->input('sort') : 'updated_at';
        $sortDirection = $request->input('direction', 'desc');

        if ($sortField === 'student_name') {
            $query->join('students', 'students.nis', '=', 'violations.student_id')
                ->select('violations.*', 'students.name as student_name');
        }

        $violations = $query->orderBy($sortField, $sortDirection)
            ->skip(($currentPage - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function (Violation $violation) {
                return $violation->getPreviewData();
            });

        return Inertia::render('Dashboard/Violation/Index', [
            'violations' => $violations,
            'totalViolations' => Violation::count(),
            'sort' => $sortField,
            'direction' => $sortDirection,
            'currentPage' => intval($currentPage),
            'perPage' => $perPage
        ]);
    }

    public function create(): Response
    {
        $classes = Grade::all()->map(function (Grade $grade) {
            return $grade->getPreviewData();
        });

        $students = Student::all()->map(function (Student $student) {
            return $student->getPreviewData();
        });

        $violationForms = ViolationForm::all()->map(function (ViolationForm $violationForm) {
            return $violationForm->getPreviewData();
        });

        $sanctions = Sanction::all()->map(function (Sanction $sanction) {
            return $sanction->getPreviewData();
        });

        return Inertia::render('Dashboard/Violation/Create', [
            'classes' => $classes,
            'students' => $students,
            'violationForms' => $violationForms,
            'sanctions' => $sanctions,
        ]);
    }

    public function store(StoreViolationRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['id'] = Str::uuid();

        $weight = intval($request->weight);

        $student = Student::find($request->student_id);

        $studentPoints = $student->points;

        $studentPoints->update([
            'points' => $studentPoints['points'] + $weight
        ]);

        $student->notify(new NewViolation(auth()->guard('admin')->user()->id, $validatedData['id'], "Anda telah melakukan pelanggaran baru", 'Halo ' . $student->name . ', kamu baru saja tercatat melakukan pelanggaran. Kami menyarankan untuk segera meninjau detail pelanggaran ini dan memahami konsekuensinya. Mohon perbaiki perilaku di masa mendatang. Terima kasih atas perhatiannya.'));

        auth()->guard('admin')->user()->notify(new NewViolation($student->nis, $validatedData['id'], $student->name . ' telah melakukan pelanggaran baru', 'Halo Admin, seorang siswa dengan Nomor Induk Siswa ' . $student->nis . ' dan nama ' . $student->name . ' baru saja terlibat dalam pelanggaran. Kami menyarankan untuk segera meninjau detail pelanggaran ini dan mempertimbangkan langkah-langkah yang perlu diambil untuk menanggapi situasi ini. Terima kasih atas perhatiannya, dan kami berharap dapat bekerja sama dalam menjaga ketertiban di sekolah.'));


        if ($studentPoints['points'] >= intval(env('FIRST_MAX_POINTS')) && $studentPoints['points'] < intval(env('SECOND_MAX_POINTS'))) {
            $student->notify(new PointsThresholdReached(auth()->guard('admin')->user()->id, 'Kamu telah mencapai 10 poin pelanggaran', 'Halo ' . $student->name . ', kamu telah mencapai atau melebihi batas 10 poin pelanggaran. Kami menyarankan untuk lebih berhati-hati dan menjaga perilaku di sekolah. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk memperbaiki situasi ini. Terima kasih atas perhatiannya, dan kami harap kamu dapat memperbaiki perilaku di masa mendatang.'));

            auth()->guard('admin')->user()->notify(new PointsThresholdReached($student->nis, $student->name . ' telah mencapai ' . intval(env('FIRST_MAX_POINTS')) . ' poin pelanggaran.', 'Halo Admin, seorang siswa dengan Nomor Induk Siswa ' . $student->nis . ' dan nama ' . $student->name . ' telah mencapai atau melebihi batas ' . intval(env('FIRST_MAX_POINTS')) . ' poin. Situasi ini memerlukan perhatian khusus untuk mengevaluasi dan mengambil tindakan yang diperlukan demi menjaga ketertiban dan disiplin di sekolah. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk menanggapi hal ini. Terima kasih atas perhatiannya, dan kami berharap dapat bekerja sama dalam menjaga lingkungan pendidikan yang aman dan kondusif.'));
        } else if ($studentPoints['points'] >= intval(env('SECOND_MAX_POINTS')) && $studentPoints['points'] < intval(env('THIRD_MAX_POINTS'))) {
            $student->notify(new PointsThresholdReached(auth()->guard('admin')->user()->id, 'Kamu telah mencapai ' . intval(env('SECOND_MAX_POINTS')) . ' poin pelanggaran', 'Halo ' . $student->name . ', kamu telah mencapai atau melebihi batas ' . intval(env('SECOND_MAX_POINTS')) . ' poin pelanggaran. Situasi ini cukup serius dan memerlukan perhatian ekstra. Kami menyarankan untuk segera memperbaiki perilaku dan menghindari pelanggaran lebih lanjut. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk memperbaiki situasi ini. Terima kasih atas perhatiannya, dan kami harap kamu dapat mengambil tindakan positif dalam menjaga ketertiban di sekolah.'));

            auth()->guard('admin')->user()->notify(new PointsThresholdReached($student->nis, $student->name . ' telah mencapai ' . intval(env('SECOND_MAX_POINTS')) . ' poin pelanggaran.', 'Halo Admin, seorang siswa dengan Nomor Induk Siswa ' . $student->nis . ' dan nama ' . $student->name . ' telah mencapai atau melebihi batas ' . intval(env('SECOND_MAX_POINTS')) . ' poin. Situasi ini cukup serius dan memerlukan perhatian ekstra. Kami menyarankan untuk segera memperbaiki perilaku dan menghindari pelanggaran lebih lanjut. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk menanggapi hal ini. Terima kasih atas perhatiannya, dan kami berharap dapat bekerja sama dalam menjaga lingkungan pendidikan yang aman dan kondusif.'));
        } else if ($studentPoints['points'] >= intval(env('THIRD_MAX_POINTS'))) {
            $student->notify(new PointsThresholdReached(auth()->guard('admin')->user()->id, 'Kamu telah mencapai ' . intval(env('THIRD_MAX_POINTS')) . ' poin pelanggaran', 'Halo ' . $student->name . ', kamu telah mencapai atau melebihi batas ' . intval(env('THIRD_MAX_POINTS')) . ' poin pelanggaran. Situasi ini sangat serius dan memerlukan tindakan segera. Kami menyarankan untuk segera mengatasi masalah ini dan melakukan perubahan positif dalam perilaku di sekolah. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk memperbaiki situasi ini. Terima kasih atas perhatiannya, dan kami harap kamu dapat memperbaiki perilaku di masa mendatang.'));

            auth()->guard('admin')->user()->notify(new PointsThresholdReached($student->nis, $student->name . ' telah mencapai ' . intval(env('THIRD_MAX_POINTS')) . ' poin pelanggaran.', 'Halo Admin, seorang siswa dengan Nomor Induk Siswa ' . $student->nis . ' dan nama ' . $student->name . ' telah mencapai atau melebihi batas ' . intval(env('THIRD_MAX_POINTS')) . ' poin. Situasi ini sangat serius dan memerlukan tindakan segera. Kami menyarankan untuk segera mengatasi masalah ini dan melakukan perubahan positif dalam perilaku di sekolah. Mohon segera tinjau detail pelanggaran dan pertimbangkan langkah-langkah yang perlu diambil untuk menanggapi hal ini. Terima kasih atas perhatiannya, dan kami berharap dapat bekerja sama dalam menjaga lingkungan pendidikan yang aman dan kondusif.'));

            $student->update([
                'status' => 'Dropout'
            ]);
        }

        Violation::create($validatedData);

        return Redirect::route('admin.dashboard.violations.index')->with('success', 'Pelanggaran berhasil disimpan.');
    }

    public function show(Violation $violation): Response
    {
        return Inertia::render('Dashboard/Violation/Detail', [
            'violation' => $violation->getDetailData()
        ]);
    }

    public function edit(Violation $violation): Response
    {
        $students = Student::all()->map(function (Student $student) {
            return $student->getPreviewData();
        });

        $classes = Grade::all()->map(function (Grade $grade) {
            return $grade->getPreviewData();
        });

        $violationForms = ViolationForm::all()->map(function (ViolationForm $violationForm) {
            return $violationForm->getPreviewData();
        });

        $sanctions = Sanction::all()->map(function (Sanction $sanction) {
            return $sanction->getPreviewData();
        });

        return Inertia::render('Dashboard/Violation/Edit', [
            'classes' => $classes,
            'violationForms' => $violationForms,
            'sanctions' => $sanctions,
            'students' => $students,
            'violation' => $violation->getActionData()
        ]);
    }

    public function update(UpdateViolationRequest $request, Violation $violation): RedirectResponse
    {
        $studentPoints = StudentPoints::where('student_id', $violation->student['nis'])->first();

        if ($request->old_points !== $request->weight) {
            $studentPoints->update([
                'points' => max(0, $studentPoints['points'] - $request->old_points + $request->weight)
            ]);
        }

        $violation->update($request->validated());

        return Redirect::route('admin.dashboard.violations.index')->with('success', 'Pelanggaran berhasil diperbarui.');
    }

    public function destroy(Violation $violation): RedirectResponse
    {
        $student = Student::find($violation->student['nis']);
        $studentPoints = $student->points;
        $newPoints = max(0, $studentPoints['points'] - $violation->violationForm['weight']);

        $studentPoints->update([
            'points' => $newPoints
        ]);

        if ($student->status === 'Dropout' && $studentPoints['points'] < 30) {
            $student->update([
                'status' => 'Aktif'
            ]);
        }

        $violation->delete();

        return Redirect::route('admin.dashboard.violations.index')->with('success', 'Pelanggaran berhasil dihapus.');
    }
}
