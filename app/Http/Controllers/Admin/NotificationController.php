<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Violation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $notifications = auth()->user()->notifications;

        $totalNotifications = $notifications->count();

        $mapedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'read_at' => $notification->read_at !== null ? $notification->read_at->diffForHumans() : null,
                'created_at' => $notification->created_at ?? null,
                'updated_at' => $notification->updated_at->diffForHumans() ?? null,
                'data' => $notification->data,
                'type' => $notification->type,
                'date' => \Carbon\Carbon::parse($notification->created_at)->format('d M, Y')
            ];
        });

        return Inertia::render('Dashboard/Notification/Index', [
            'notifications' => $mapedNotifications,
            'totalNotifications' => $totalNotifications,
        ]);
    }

    public function show($id)
    {
        $notification = auth()->user()->notifications->where('id', $id);
        $notification->markAsRead();

        $mapedNotification = $notification->map(function ($notification) {
            return [
                'id' => $notification->id,
                'read_at' => $notification->read_at !== null ? $notification->read_at->diffForHumans() : null,
                'created_at' => $notification->created_at->diffForHumans() ?? null,
                'updated_at' => $notification->updated_at->diffForHumans() ?? null,
                'data' => $notification->data,
                'type' => $notification->type,
                'date' => \Carbon\Carbon::parse($notification->created_at)->format('d M, Y')
            ];
        })->first();

        if ($notification->first()['type'] === "App\Notifications\MessageFromGuest") {
            return Inertia::render('Dashboard/Notification/Detail', [
                'notification' => $mapedNotification,
            ]);
        }

        $student = Student::find($notification->first()['data']['user_id']);

        if ($notification->first()['type'] === "App\Notifications\NewViolation") {
            $violation = Violation::find($notification->first()['data']['violation_id']);

            return Inertia::render('Dashboard/Notification/Detail', [
                'notification' => $mapedNotification,
                'student' => $student,
                'violation' => $violation->getDetailData()
            ]);
        }

        return Inertia::render('Dashboard/Notification/Detail', [
            'notification' => $mapedNotification,
            'student' => $student,
        ]);
    }

    public function destroy($id)
    {
        $notification = auth()->user()->notifications->find($id);
        if (!$notification) {
            return Redirect::route('admin.dashboard.notifications.index')->with('error', 'Pesan tidak ditemukan.');
        }

        $notification->delete();

        return Redirect::route('admin.dashboard.notifications.index')->with('success', 'Pesan berhasil dihapus.');
    }
}
