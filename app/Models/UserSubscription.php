<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'subscription_plan_id', 'starts_at', 'ends_at',
        'canceled_at', 'is_active', 'auto_renew', 'payment_method', 'payment_reference', 'status'
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

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function cancel()
    {
        $this->update([
            'is_active' => false,
            'auto_renew' => false,
            'canceled_at' => now()
        ]);
    }
}
