<?php

use App\Http\Controllers\Admin\MajorController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.majors.')->group(function () {
    Route::get('majors', [MajorController::class, 'index'])->name('index');
    Route::get('major/add', [MajorController::class, 'create'])->name('create');
    Route::post('major', [MajorController::class, 'store'])->name('store');
    Route::get('major/{major}', [MajorController::class, 'show'])->name('show');
    Route::get('major/{major}/edit', [MajorController::class, 'edit'])->name('edit');
    Route::put('major/{major}', [MajorController::class, 'update'])->name('update');
    Route::delete('major/{major}', [MajorController::class, 'destroy'])->name('destroy');
});
