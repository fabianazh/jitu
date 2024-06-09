<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin,student')->prefix('auth')->group(function () {
    Route::get('login/{authEndpoint}', [AuthenticatedSessionController::class, 'index'])
        ->name('admin.login.index');

    Route::post('login/{authEndpoint}', [AuthenticatedSessionController::class, 'store'])
        ->name('admin.login.store');
});

Route::middleware('auth.admin')->group(function () {
    Route::post('admin-logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout');
});
