<?php

use App\Http\Controllers\LandingController;

Route::get('/', [LandingController::class, 'index'])->name('landing.home');
Route::get('/about', [LandingController::class, 'about'])->name('landing.about');
Route::get('/rules', [LandingController::class, 'rules'])->name('landing.rules');
Route::get('/contact', [LandingController::class, 'contact'])->name('landing.contact');
Route::post('/contact', [LandingController::class, 'submitMessage'])->name('landing.contact.post');
