<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('s', function () {
    $this->call('serve');
})->describe('Run Server');

Artisan::command('t', function () {
    $this->call('tinker');
})->describe('Open Tinker');

Artisan::command('mf', function () {
    $this->call('migrate:fresh');
})->describe('Migrate fresh');

Artisan::command('mfs', function () {
    $this->call('migrate:fresh', ['--seed' => true]);
})->describe('Migrate fresh and seed the database');