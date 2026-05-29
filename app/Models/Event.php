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

        'is_active',
        'is_premium',
        'premium_until',
    ];

    protected $casts = [
        'event_date' => 'datetime',
        'expires_at' => 'datetime',
        'premium_until' => 'datetime',
        'is_public' => 'boolean',
        'is_animated' => 'boolean',
        'is_active' => 'boolean',
        'is_premium' => 'boolean',
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
        if ($this->is_active === false) {
            return false;
        }

        if ($this->is_premium === true) {
            return ! $this->premium_until || $this->premium_until->isFuture();
        }

        if (! $this->user) {
            return false;
        }

        if ($this->user->hasActivePremium()) {
            return ! $this->expires_at || $this->expires_at->isFuture();
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        $subscription = $this->user->activeSubscription ?? null;

        if (! $subscription) {
            return $this->created_at?->copy()?->addHours(3)?->isFuture() ?? false;
        }

        $plan = $subscription->plan ?? $subscription->subscriptionPlan ?? null;

        if (! $plan) {
            return $this->created_at?->copy()?->addHours(3)?->isFuture() ?? false;
        }

        if (($plan->slug ?? null) === 'free') {
            $activeHours = data_get($plan, 'limits.active_hours', 3);

            return $this->created_at?->copy()?->addHours($activeHours)?->isFuture() ?? false;
        }

        $activeDays = data_get($plan, 'limits.active_days', 30);

        return $this->created_at?->copy()?->addDays($activeDays)?->isFuture() ?? false;
    }
}