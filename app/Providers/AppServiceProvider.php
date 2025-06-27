<?php

namespace App\Providers;

use App\Models\Event;
use App\Models\SubscriptionPlan;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('translation.service', function($app) {
            return new TranslationService();
        });

        Blade::directive('lang', function ($expression) {
            return "<?php echo lang($expression); ?>";
        });
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
            $allSubscriptionPlans = SubscriptionPlan::get();
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
                $latestEvent = $user->events()->latest()->first();

                if (!$latestEvent) {
                    $latestEvent = $user->events()->where('is_public', true)->latest()->first();
                }

                session(['selected_event_id' => $latestEvent?->id]);
                $selectedEvent = $user->events()->find(session('selected_event_id'));
            }

            $public_event = Event::where('is_public', true)->latest()->first();

            $view->with([
                'userActiveSubscription' => $userActiveSubscription,
                'currentUser' => $user,
                'publicEvent' => $public_event,
                'selectedEvent' => $selectedEvent,
                'allSubscriptionPlans' => $allSubscriptionPlans
            ]);
        });

        // Set default string length for migrations
        Schema::defaultStringLength(191);
    }
}
