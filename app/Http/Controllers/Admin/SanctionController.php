<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSanctionRequest;
use App\Http\Requests\Admin\UpdateSanctionRequest;
use App\Models\Violation;
use App\Models\ViolationCategory;
use App\Models\Sanction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as Req;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SanctionController extends Controller
{
    public function index(Request $request)
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

    public function create()
    {
        $minWeight = Sanction::max('weight_to');

        return Inertia::render('Dashboard/Sanction/Create', [
            'minWeight' => $minWeight + 1
        ]);
    }

    public function store(StoreSanctionRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $validatedData['id'] = Str::uuid();

        Sanction::create($validatedData);

        return Redirect::route('admin.dashboard.sanctions.index')->with('success', 'Data sanksi berhasil disimpan.');
    }

    public function show(Sanction $sanction)
    {
        return Inertia::render('Dashboard/Sanction/Detail', [
            'sanction' => $sanction->getDetailData()
        ]);
    }

    public function edit(Sanction $sanction)
    {
        $maxWeight = Sanction::where('weight_from', '>=', $sanction->weight_to)->orderBy('weight_from', 'asc')->first();

        return Inertia::render('Dashboard/Sanction/Edit', [
            'sanction' => $sanction->getDetailData(),
            'maxWeight' => $maxWeight['weight_from'] ?? null
        ]);
    }

    public function update(UpdateSanctionRequest $request, Sanction $sanction): RedirectResponse
    {
        $validatedData = $request->validated();

        $violations = Violation::where('sanction_id', $sanction->id)->get();

        if ($validatedData['weight_from'] > $sanction->weight_from) {
            $lowerSanction = Sanction::where('weight_to', '<=', $sanction->weight_from)->orderBy('weight_to', 'desc')->first();

            if ($lowerSanction) {
                $lowerSanction->update([
                    'weight_to' => $validatedData['weight_from'] - 1
                ]);

                foreach ($violations as $item) {
                    if ($item->violationForm->weight < $validatedData['weight_from']) {
                        $item->update([
                            'sanction_id' => $lowerSanction->id
                        ]);
                    }
                }
            }
        }

        if ($validatedData['weight_to'] < $sanction->weight_to) {
            $higherSanction = Sanction::where('weight_from', '>=', $sanction->weight_to)->orderBy('weight_from', 'asc')->first();

            if ($higherSanction) {
                $higherSanction->update([
                    'weight_from' => $validatedData['weight_to'] + 1
                ]);

                foreach ($violations as $item) {
                    if ($item->violationForm->weight > $validatedData['weight_to']) {
                        $item->update([
                            'sanction_id' => $higherSanction->id
                        ]);
                    }
                }
            }
        }

        $sanction->update($validatedData);

        return Redirect::route('admin.dashboard.sanctions.index')->with('success', 'Data sanksi berhasil diperbarui.');
    }

    public function destroy(Sanction $sanction): RedirectResponse
    {
        $violations = Violation::where('sanction_id', $sanction->id)->get();
        $higherSanction = Sanction::where('weight_from', '>=', $sanction->weight_to)->orderBy('weight_from', 'asc')->first();

        if ($higherSanction) {

            foreach ($violations as $item) {
                $item->update([
                    'sanction_id' => $higherSanction->id
                ]);
            }

            $sanction->delete();

            $higherSanction->update([
                'weight_from' => $sanction->weight_from
            ]);
        } else {
            $lowerSanction = Sanction::where('weight_to', '<=', $sanction->weight_from)->orderBy('weight_to', 'desc')->first();

            if ($lowerSanction) {
                foreach ($violations as $item) {
                    $item->update([
                        'sanction_id' => $lowerSanction->id
                    ]);
                }

                $sanction->delete();

                $lowerSanction->update([
                    'weight_to' => $sanction->weight_to
                ]);
            } else {
                $sanction->delete();
            }
        }


        return Redirect::route('admin.dashboard.sanctions.index')->with('success', 'Data sanksi berhasil dihapus.');
    }
}
