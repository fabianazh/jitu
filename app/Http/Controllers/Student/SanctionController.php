<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Sanction;
use Illuminate\Support\Facades\Request as Req;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SanctionController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = 10;
        $currentPage = $request->input('page', 1);

        $sortBy = Req::get('sort_by', 'weight_from');
        $sortOrder = Req::get('sort_order', 'asc');

        $sanctions = Sanction::skip(($currentPage - 1) * $perPage)
            ->take($perPage)->orderBy($sortBy, $sortOrder)->get()->map(function (Sanction $sanction) {
                return $sanction->getPreviewData();
            });

        return Inertia::render('Dashboard/Sanction/Index', [
            'sanctions' => $sanctions,
            'totalSanctions' => Sanction::count(),
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder,
            'currentPage' => intval($currentPage),
            'perPage' => $perPage
        ]);
    }

    public function show(Sanction $sanction): Response
    {
        return Inertia::render('Dashboard/Sanction/Detail', [
            'sanction' => $sanction->getDetailData()
        ]);
    }
}
