<?php

use App\Http\Controllers\Admin\SanctionController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth.admin')->prefix('admin/dashboard')->name('admin.dashboard.sanctions.')->group(function () {
    Route::get('sanctions', [SanctionController::class, 'index'])->name('index');
    Route::get('sanction/add', [SanctionController::class, 'create'])->name('create');
    Route::post('sanction', [SanctionController::class, 'store'])->name('store');
    Route::get('sanction/{sanction}', [SanctionController::class, 'show'])->name('show');
    Route::get('sanction/{sanction}/edit', [SanctionController::class, 'edit'])->name('edit');
    Route::put('sanction/{sanction}/edit', [SanctionController::class, 'update'])->name('update');
    Route::delete('sanction/{sanction}', [SanctionController::class, 'destroy'])->name('destroy');
});
