<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\PasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('/admin/dashboard')->name('admin.dashboard.profile.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('index');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('edit');
    Route::post('/profile/edit', [ProfileController::class, 'update'])->name('update');
    Route::put('/change-password', [PasswordController::class, 'update'])->name('change-password');
});