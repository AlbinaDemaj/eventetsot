<?php

use App\Models\User;
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

        if (!$subscription) return false;

        $maxUploads = $subscription->plan->limits['max_uploads'] ?? 0;

        // Unlimited
        if ($maxUploads === null) return true;

        $usedUploads = $user->uploads()->count();

        return ($usedUploads + $attemptedUploads) <= $maxUploads;
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
