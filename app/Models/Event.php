<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Event extends Model
{
    protected $fillable = [
        'name',
        'event_date',
        'code',
        'qr_code',
        'user_id',
        'type',
        'is_public',
        'dynamic_fields',
        'description',
        'font',
        'button_text',
        'is_animated',
        'background'
    ];

    protected static function booted()
    {
        static::creating(function ($event) {
            do {
                $code = Str::upper(Str::random(10));
            } while (self::where('code', $code)->exists());

            $event->code = $code;

            $url = url('/' . $event->code);
            $qrCode = base64_encode(
                QrCode::format('png')->size(200)->generate($url)
            );

            $event->qr_code = 'data:image/png;base64,' . $qrCode;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    public function isActive(): bool
    {
        $subscription = $this->user->activeSubscription;

        if (!$subscription) return false;

        if ($subscription->plan->slug === 'free') {
            $activeHours = $subscription->plan->limits['active_hours'] ?? 3;
            return $this->created_at->addHours($activeHours)->isFuture();
        }

        $activeDays = $subscription->plan->limits['active_days'] ?? 30;
        return $this->created_at->addDays($activeDays)->isFuture();
    }
}
