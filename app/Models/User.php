<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'last_login_at',
        'last_login_ip',
        'is_premium',
'premium_until',
'premium_given_by',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

   protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
    'is_premium' => 'boolean',
    'premium_until' => 'datetime',
];

public function hasActivePremium(): bool
{
    return $this->is_premium === true
        && $this->premium_until
        && $this->premium_until->isFuture();
}

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function uploads(): HasMany
    {
        return $this->hasMany(Media::class);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserSubscription::class);
    }

    public function activeSubscription(): HasOne
    {
        return $this->hasOne(UserSubscription::class)
            ->active()
            ->latestOfMany();
    }

    public function canUpload(int $count = 1): bool
    {
        return checkUploadLimit($this, $count);
    }

    public function isLinkActive($eventData): bool
    {
        return canUserUpload($this, $eventData);
    }
}