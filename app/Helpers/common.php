<?php

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
