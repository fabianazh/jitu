<?php

use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('/admin/dashboard')->name('admin.dashboard.settings.')->group(function () {
    Route::get('/settings', [SettingsController::class, 'index'])->name('index');
    Route::get('/settings/auth', [SettingsController::class, 'auth'])->name('auth');
    Route::put('/settings/auth', [SettingsController::class, 'update'])->name('auth.update');
});