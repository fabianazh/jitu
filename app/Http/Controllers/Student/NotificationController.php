<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Violation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {

        $notifications = auth()->guard('student')->user()->notifications;

        $totalNotifications = $notifications->count();

        $mapedNotifications = $notifications->map(function ($notification) {
            return [
                'id' => $notification->id,
                'read_at' => $notification->read_at !== null ? $notification->read_at->diffForHumans() : null,
                'created_at' => $notification->created_at,
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
        $notification = auth()->guard('student')->user()->notifications->where('id', $id);
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

        $admin = Admin::find(intval($notification->first()['data']['user_id']));

        if ($notification->first()['type'] === "App\Notifications\NewViolation") {
            $violation = Violation::find($notification->first()['data']['violation_id']);

            return Inertia::render('Dashboard/Notification/Detail', [
                'notification' => $mapedNotification,
                'admin' => $admin,
                'violation' => $violation->getDetailData()
            ]);
        }

        return Inertia::render('Dashboard/Notification/Detail', [
            'notification' => $mapedNotification,
            'admin' => $admin,
        ]);
    }
}
