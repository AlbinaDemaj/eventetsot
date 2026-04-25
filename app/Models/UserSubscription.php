<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subscription_plan_id',
        'starts_at',
        'ends_at',
        'canceled_at',
        'is_active',
        'auto_renew',
        'payment_method',
        'payment_reference',
        'status',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'canceled_at' => 'datetime',
        'is_active' => 'boolean',
        'auto_renew' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }

    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class, 'subscription_plan_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query
            ->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('ends_at')
                  ->orWhere('ends_at', '>', now());
            });
    }

    public function isCurrentlyActive(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->canceled_at) {
            return false;
        }

        if ($this->ends_at && $this->ends_at->isPast()) {
            return false;
        }

        return true;
    }

    public function isExpired(): bool
    {
        return $this->ends_at ? $this->ends_at->isPast() : false;
    }

    public function cancel(): bool
    {
        return $this->update([
            'is_active' => false,
            'auto_renew' => false,
            'status' => 'cancelled',
            'canceled_at' => now(),
        ]);
    }

    public function markAsActive(): bool
    {
        return $this->update([
            'is_active' => true,
            'status' => 'active',
            'canceled_at' => null,
        ]);
    }

    public function markAsExpired(): bool
    {
        return $this->update([
            'is_active' => false,
            'status' => 'expired',
        ]);
    }

    public function getDisplayStatusAttribute(): string
    {
        if ($this->isExpired()) {
            return 'expired';
        }

        if ($this->canceled_at) {
            return 'cancelled';
        }

        if ($this->isCurrentlyActive()) {
            return 'active';
        }

        return $this->status ?: 'pending';
    }
}