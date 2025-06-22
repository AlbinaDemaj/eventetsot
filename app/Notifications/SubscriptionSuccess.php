<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubscriptionSuccess extends Notification
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Subscription Confirmation - ' . config('app.name'))
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Thank you for subscribing to our plus plan.')
            ->line('Your subscription is now active and ready to use!')
            ->line('Now you access to all premium features.');
    }
}
