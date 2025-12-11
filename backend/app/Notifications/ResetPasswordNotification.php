<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    protected $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $resetUrl = env('FRONTEND_URL') . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Your Password - NIS Conference')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('You requested a password reset for your NIS Conference admin account.')
            ->action('Reset Password', $resetUrl)
            ->line('This link will expire in 1 hour.')
            ->line('If you did not request this, please ignore this email and your password will remain unchanged.');
    }
}
