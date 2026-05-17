<?php

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Arr;

if (!function_exists('formatCurrency')) {
    function formatCurrency($amount, $currency = null, $convertToCents = true)
    {
        $currency = $currency ?? config('currencies.default');
        $config = Arr::get(config('currencies.supported'), $currency, []);

        if (empty($config)) {
            return number_format($amount, 2) . ' ' . $currency;
        }

        $amount = $convertToCents ? $amount / 100 : $amount;

        $formatted = number_format(
            $amount,
            $config['decimal_digits'],
            $config['decimal_separator'],
            $config['thousands_separator']
        );

        return $config['symbol_position'] === 'before'
            ? $config['symbol'] . $formatted
            : $formatted . $config['symbol'];
    }
}

if (!function_exists('getCurrencySymbol')) {
    function getCurrencySymbol($currency = null)
    {
        $currency = $currency ?? config('currencies.default');
        return Arr::get(config('currencies.supported'), "{$currency}.symbol", $currency);
    }
}

if (!function_exists('checkUploadLimit')) {
    function checkUploadLimit(User $user, int $attemptedUploads = 1): bool
    {
        $subscription = $user->activeSubscription;

        if (!$subscription || !$subscription->plan) {
            return false;
        }

        $plan = $subscription->plan;
        $limits = is_array($plan->limits) ? $plan->limits : json_decode($plan->limits ?? '{}', true);

        // Plus/Premium: nëse çmimi është më i madh se 0, lejo pa limit
        if ((float) $plan->price > 0) {
            return true;
        }

        $maxUploads = $limits['max_uploads'] ?? 5;

        // Nëse max_uploads është null = pa limit
        if ($maxUploads === null) {
            return true;
        }

        $usedUploads = $user->uploads()->count();

        return ($usedUploads + $attemptedUploads) <= (int) $maxUploads;
    }
}

if (!function_exists('canUserUpload')) {
    function canUserUpload(User $user, $eventDate = null): bool
    {
        if (!$eventDate) {
            return false;
        }

        $subscription = $user->activeSubscription;
        if (!$subscription) {
            return false;
        }

        $activeDaysLimit = $subscription->plan->limits['active_days'] ?? 3;

        $daysBeforeEvent = now()->diffInDays($eventDate, false);

        return $daysBeforeEvent <= $activeDaysLimit && $daysBeforeEvent >= 0;
    }
}

if (!function_exists('getStorageDays')) {
    function getStorageDays(User $user): int
    {
        $subscription = $user->activeSubscription;

        if (!$subscription) return 0;

        return $subscription->plan->limits['storage_days'] ?? 0;
    }
}

if (!function_exists('lang')) {
    function lang($group, $key = null, $replace = [])
    {
        return app('translation.service')->get($group, $key, $replace, session()->get('locale'));
    }
}
