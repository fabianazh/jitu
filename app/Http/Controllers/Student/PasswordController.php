<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\UpdatePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class PasswordController extends Controller
{

    /**
     * Update the user's password.
     */
    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $request->user()->update([
            'password' => Hash::make($validatedData['password']),
        ]);

        return Redirect::route('student.dashboard.profile.index')->with('success', 'Password berhasil diperbarui.');
    }
}
