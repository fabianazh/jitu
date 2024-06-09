<?php

use App\Http\Controllers\Student\SanctionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.sanctions.')->group(function () {
    Route::get('sanctions', [SanctionController::class, 'index'])->name('index');
    Route::get('sanction/{sanction}', [SanctionController::class, 'show'])->name('show');
});
