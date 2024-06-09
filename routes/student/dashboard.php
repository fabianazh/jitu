<?php

use App\Http\Controllers\Student\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.')->group(function () {
    Route::get('', [DashboardController::class, 'index'])->name('index');
});