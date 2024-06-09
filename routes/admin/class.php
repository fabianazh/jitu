<?php

use App\Http\Controllers\Admin\ClassController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.classes.')->group(function () {
    Route::get('classes', [ClassController::class, 'index'])->name('index');
    Route::get('class/add', [ClassController::class, 'create'])->name('create');
    Route::get('class/{class}', [ClassController::class, 'show'])->name('show');
    Route::post('class', [ClassController::class, 'store'])->name('store');
    Route::get('class/{class}/edit', [ClassController::class, 'edit'])->name('edit');
    Route::put('class/{class}', [ClassController::class, 'update'])->name('update');
    Route::delete('class/{class}', [ClassController::class, 'destroy'])->name('destroy');
});
