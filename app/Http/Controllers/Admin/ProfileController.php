<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Settings/Profile/Index');
    }

    public function edit(): Response
    {
        return Inertia::render('Dashboard/Settings/Profile/Edit');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $admin = auth()->guard('admin')->user();

        if ($request->file('photo')) {
            if ($admin->photo && $admin->photo !== 'img/avatar/default-avatar.jpg') {
                Storage::delete($request->old_photo);
            }
            $validatedData['photo'] = $request->file('photo')->store('img/admin/' . $request->input('photo'));
        }

        $request->user()->fill($validatedData);

        $request->user()->save();

        return Redirect::route('admin.dashboard.profile.index')->with('success', 'Profil berhasil diperbarui.');
    }

    public function changePassword(): Response
    {
        return Inertia::render('Dashboard/Settings/Profile/ChangePassword');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
