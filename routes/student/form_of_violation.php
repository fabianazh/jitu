<?php

use App\Http\Controllers\Student\ViolationFormController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:student')->prefix('/dashboard')->name('student.dashboard.forms_of_violation.')->group(function () {
    Route::get('forms-of-violation', [ViolationFormController::class, 'index'])->name('index');
    Route::get('form-of-violation/{violationForm}', [ViolationFormController::class, 'show'])->name('show');
});
