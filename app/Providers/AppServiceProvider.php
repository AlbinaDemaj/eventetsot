<?php

namespace App\Providers;

use App\Models\Event;
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

            // Skip all checks for admin users
            if (auth()->guard()->name === 'admin') {
                return;
            }

            $userActiveSubscription = null;
            if ($user) {
                $userActiveSubscription = $user->activeSubscription()->first();
            }

            $selectedEvent = null;
            if ($user && session()->has('selected_event_id')) {
                $selectedEvent = $user->events()->find(session('selected_event_id'));
            }

            if ($user &&
                !session()->has('selected_event_id') &&
                !request()->routeIs('user.onboarding.*')
            ) {
                session(['selected_event_id' => $user->events()->latest()->first()->id]);
                $selectedEvent = $user->events()->find(session('selected_event_id'));
            }

            $public_event = Event::where('is_public', true)->latest()->first();

            $view->with([
                'userActiveSubscription' => $userActiveSubscription,
                'currentUser' => $user,
                'publicEvent' => $public_event,
                'selectedEvent' => $selectedEvent
            ]);
        });

        // Set default string length for migrations
        Schema::defaultStringLength(191);
    }
}
