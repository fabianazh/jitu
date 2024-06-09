<?php

use App\Http\Controllers\Student\HistoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.history.')->group(function () {
    Route::get('/violation-history', [HistoryController::class, 'index'])->name('index');
    Route::get('/violation-history/{violation}', [HistoryController::class, 'show'])->name('show');
});