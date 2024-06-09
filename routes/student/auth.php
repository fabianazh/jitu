<?php

use App\Http\Controllers\Student\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:student,admin')->prefix('auth')->name('student.login.')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'index'])
        ->name('index');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('store');
});

Route::middleware('auth:student')->group(function () {
    Route::post('student-logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('student.logout');
});
