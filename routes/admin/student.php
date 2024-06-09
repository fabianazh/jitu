<?php

use App\Http\Controllers\Admin\StudentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.students.')->group(function () {
    Route::get('students', [StudentController::class, 'index'])->name('index');
    Route::get('student/add', [StudentController::class, 'create'])->name('create');
    Route::post('student', [StudentController::class, 'store'])->name('store');
    Route::get('student/{student}', [StudentController::class, 'show'])->name('show');
    Route::get('student/{student}/edit', [StudentController::class, 'edit'])->name('edit');
    Route::post('student/{student}/edit', [StudentController::class, 'update'])->name('update');
    Route::delete('student/{student}', [StudentController::class, 'destroy'])->name('destroy');
});
