<?php

use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\PasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('edit');
    Route::put('/change-password', [PasswordController::class, 'update'])->name('update');
});