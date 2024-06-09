<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__ . '/landing.php';

require __DIR__ . '/admin/dashboard.php';
require __DIR__ . '/admin/student.php';
require __DIR__ . '/admin/class.php';
require __DIR__ . '/admin/major.php';
require __DIR__ . '/admin/violation.php';
require __DIR__ . '/admin/form_of_violation.php';
require __DIR__ . '/admin/sanction.php';
require __DIR__ . '/admin/profile.php';
require __DIR__ . '/admin/notification.php';
require __DIR__ . '/admin/settings.php';
require __DIR__ . '/admin/auth.php';

require __DIR__ . '/student/dashboard.php';
require __DIR__ . '/student/notification.php';
require __DIR__ . '/student/auth.php';
require __DIR__ . '/student/history.php';
require __DIR__ . '/student/form_of_violation.php';
require __DIR__ . '/student/sanction.php';
require __DIR__ . '/student/settings.php';
require __DIR__ . '/student/profile.php';