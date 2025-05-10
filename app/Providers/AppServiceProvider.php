<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share common variables with all views
        view()->composer('*', function ($view) {
            $view->with('currentUser', auth()->user());
        });

        // Set default string length for migrations
        Schema::defaultStringLength(191);
    }
}
