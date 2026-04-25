<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'currency',
        'billing_cycle_days',
        'is_active',
        'features',
        'limits',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'features' => 'array',
        'limits' => 'array',
        'billing_cycle_days' => 'integer',
    ];

    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class, 'subscription_plan_id');
    }

    public function activeSubscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class, 'subscription_plan_id')
            ->where('is_active', true);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function getFormattedPriceAttribute(): string
    {
        if (function_exists('formatCurrency')) {
            return formatCurrency($this->price, $this->currency);
        }

        return ($this->currency ?: 'EUR') . ' ' . number_format((float) $this->price, 2);
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->name ?: 'Plan';
    }

    public function getActiveDaysAttribute(): int
    {
        return (int) data_get($this->limits, 'active_days', $this->billing_cycle_days ?: 30);
    }

    public function getActiveHoursAttribute(): int
    {
        return (int) data_get($this->limits, 'active_hours', 3);
    }
}