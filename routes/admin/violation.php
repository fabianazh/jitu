<?php

use App\Http\Controllers\Admin\ViolationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.violations.')->group(function () {
    Route::get('violations', [ViolationController::class, 'index'])->name('index');
    Route::get('violation/add', [ViolationController::class, 'create'])->name('create');
    Route::post('violation', [ViolationController::class, 'store'])->name('store');
    Route::get('violation/{violation}', [ViolationController::class, 'show'])->name('show');
    Route::get('violation/{violation}/edit', [ViolationController::class, 'edit'])->name('edit');
    Route::put('violation/{violation}/edit', [ViolationController::class, 'update'])->name('update');
    Route::delete('violation/{violation}', [ViolationController::class, 'destroy'])->name('destroy');
});
