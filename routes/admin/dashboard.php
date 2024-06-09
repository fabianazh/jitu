<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('/admin/dashboard')->name('admin.dashboard.')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('index');
    Route::delete('/{violation}', [DashboardController::class, 'destroy'])->name('violation.destroy');
});