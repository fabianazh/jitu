<?php

use App\Http\Controllers\Admin\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('/admin/dashboard')->name('admin.dashboard.notifications.')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('index');
    Route::get('/notification/{notification}', [NotificationController::class, 'show'])->name('show');
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy'])->name('destroy');
});