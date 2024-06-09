<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentPoints;
use App\Models\Violation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today();
        $currentYear = Carbon::now()->year;
        $years = [];

        for ($y = 2023; $y <= $currentYear; $y++) {
            $years[] = $y;
        }

        $selectedYear = intval($request->query('year', $currentYear));

        $todayViolations = Violation::whereDate('created_at', $today)
            ->get()
            ->map(function (Violation $violation) {
                return $violation->getPreviewData();
            });

        $monthlyViolationStats = $this->getMonthlyViolationStats(intval($selectedYear));

        return Inertia::render('Dashboard/Index', [
            'todayViolations' => $todayViolations,
            'monthlyViolationStats' => $monthlyViolationStats,
            'years' => $years,
            'selectedYear' => $selectedYear,
            'currentYear' => $currentYear
        ]);
    }

    public function getMonthlyViolationStats($year)
    {
        $stats = [];

        $monthNames = [
            'January' => 'Jan',
            'February' => 'Feb',
            'March' => 'Mar',
            'April' => 'Apr',
            'May' => 'Mei',
            'June' => 'Jun',
            'July' => 'Jul',
            'August' => 'Agu',
            'September' => 'Sep',
            'October' => 'Okt',
            'November' => 'Nov',
            'December' => 'Des',
        ];

        for ($month = 1; $month <= 12; $month++) {
            $startDate = Carbon::create($year, $month, 1);
            $endDate = $startDate->copy()->endOfMonth();

            $maleViolations = Violation::whereHas('student', function ($query) use ($startDate, $endDate) {
                $query->where('gender', 'Laki-Laki');
            })
                ->whereBetween('created_at', [$startDate, $endDate])
                ->distinct('student_id')
                ->count('student_id');

            $femaleViolations = Violation::whereHas('student', function ($query) use ($startDate, $endDate) {
                $query->where('gender', 'Perempuan');
            })
                ->whereBetween('created_at', [$startDate, $endDate])
                ->distinct('student_id')
                ->count('student_id');

            $stats[] = [
                'name' => $monthNames[$startDate->format('F')],
                'LL' => $maleViolations,
                'P' => $femaleViolations,
            ];
        }

        return $stats;
    }


    public function destroy(Violation $violation): RedirectResponse
    {
        $studentPoints = StudentPoints::where('student_id', $violation->student['nis'])->first();
        $newPoints = max(0, $studentPoints['points'] - $violation->violationForm['weight']);

        $studentPoints->update([
            'points' => $newPoints
        ]);

        $violation->delete();

        return Redirect::route('admin.dashboard.index')->with('success', 'Pelanggaran berhasil dihapus.');
    }
}
