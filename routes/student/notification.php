<?php

use App\Http\Controllers\Student\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.notifications.')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('index');
    Route::get('/notification/{notification}', [NotificationController::class, 'show'])->name('show');
});