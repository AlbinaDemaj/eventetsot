<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubscriptionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'description', 'price', 'currency',
        'billing_cycle_days', 'is_active', 'features'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'features' => 'array',
    ];

    public function subscriptions()
    {
        return $this->hasMany(UserSubscription::class);
    }

    public function getFormattedPriceAttribute()
    {
        return formatCurrency($this->price, $this->currency);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
