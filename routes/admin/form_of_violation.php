<?php

use App\Http\Controllers\Admin\ViolationFormController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.forms_of_violation.')->group(function () {
    Route::get('forms-of-violation', [ViolationFormController::class, 'index'])->name('index');
    Route::get('form-of-violation/add', [ViolationFormController::class, 'create'])->name('create');
    Route::post('form-of-violation', [ViolationFormController::class, 'store'])->name('store');
    Route::get('form-of-violation/{violationForm}', [ViolationFormController::class, 'show'])->name('show');
    Route::get('form-of-violation/{violationForm}/edit', [ViolationFormController::class, 'edit'])->name('edit');
    Route::put('form-of-violation/{violationForm}/edit', [ViolationFormController::class, 'update'])->name('update');
    Route::delete('form-of-violation/{violationForm}', [ViolationFormController::class, 'destroy'])->name('destroy');
});
