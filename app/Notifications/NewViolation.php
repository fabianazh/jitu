<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewViolation extends Notification
{
    use Queueable;

    protected $user_id;
    protected $violation_id;
    protected $title;
    protected $message;


    public function __construct($user_id, $violation_id, $title, $message)
    {
        $this->user_id = $user_id;
        $this->violation_id = $violation_id;
        $this->title = $title;
        $this->message = $message;
    }

    public function toArray($notifiable): array
    {
        return [
            'user_id' => $this->user_id,
            'violation_id' => $this->violation_id,
            'title' => $this->title,
            'message' => $this->message,
        ];
    }

    public function via($notifiable)
    {
        return ['database'];
    }
}
