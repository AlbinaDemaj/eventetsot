<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Event extends Model
{
    protected $fillable = [
        'name',
        'event_date',
        'expires_at',
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
        'background',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'expires_at' => 'datetime',
        'is_public' => 'boolean',
        'is_animated' => 'boolean',
        'dynamic_fields' => 'array',
    ];

    protected static function booted(): void
    {
        static::creating(function ($event) {
            do {
                $code = Str::upper(Str::random(10));
            } while (self::where('code', $code)->exists());

            $event->code = $code;

            $url = url('/events/' . $event->code);

            $qrCode = base64_encode(
                QrCode::format('svg')->size(200)->generate($url)
            );

            $event->qr_code = 'data:image/svg+xml;base64,' . $qrCode;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function getDisplayTitleAttribute(): string
    {
        return $this->name ?: 'Event';
    }

    public function isActive(): bool
    {
        // Kontrollo nëse ka skaduar sipas expires_at
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        if (!$this->user) {
            return false;
        }

        $subscription = $this->user->activeSubscription ?? null;

        if (!$subscription) {
            return false;
        }

        $plan = $subscription->plan ?? $subscription->subscriptionPlan ?? null;

        if (!$plan) {
            return false;
        }

        if (($plan->slug ?? null) === 'free') {
            $activeHours = data_get($plan, 'limits.active_hours', 3);
            return $this->created_at?->copy()?->addHours($activeHours)?->isFuture() ?? false;
        }

        $activeDays = data_get($plan, 'limits.active_days', 30);
        return $this->created_at?->copy()?->addDays($activeDays)?->isFuture() ?? false;
    }
}