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
            $user = auth()->user();

            $selectedEvent = null;
            if ($user && session()->has('selected_event_id')) {
                $selectedEvent = $user->events()->find(session('selected_event_id'));
            }

            if ($user && !session()->has('selected_event_id')) {
                session(['selected_event_id' => $user->events()->latest()->first()->id]);
                $selectedEvent = $user->events()->find(session('selected_event_id'));
            }

            $view->with('currentUser', $user);
            $view->with('selectedEvent', $selectedEvent);
        });

        // Set default string length for migrations
        Schema::defaultStringLength(191);
    }
}
