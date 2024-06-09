<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateEndpointRequest;
use App\Models\Admin;
use App\Models\AuthEndpoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Settings/Index');
    }

    public function auth()
    {
        $authEndpoint = AuthEndpoint::find(1);

        return Inertia::render('Dashboard/Settings/Auth/Index', [
            'authEndpoint' => $authEndpoint
        ]);
    }

    public function update(UpdateEndpointRequest $request)
    {
        $validatedData = $request->validated();
        $authEndpoint = AuthEndpoint::find(1);
        $authEndpoint->update($validatedData);

        return Redirect::route('admin.dashboard.settings.auth')->with('success', 'Endpoint autentikasi berhasil diperbarui.');
    }
}
