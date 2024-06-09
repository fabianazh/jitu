<?php

use App\Http\Controllers\Student\SettingsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.settings.')->group(function () {
    Route::get('/settings', [SettingsController::class, 'index'])->name('index');
    Route::get('/settings/{settings}', [SettingsController::class, 'show'])->name('show');
    Route::get('/settingss/{settings}/edit', [SettingsController::class, 'edit'])->name('edit');
});