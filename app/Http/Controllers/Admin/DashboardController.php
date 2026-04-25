<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Event;
use App\Models\Media;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalEvents = Event::count();
        $totalMedia = class_exists(Media::class) ? Media::count() : 0;

        $activePlans = class_exists(UserSubscription::class)
            ? UserSubscription::where('status', 'active')->count()
            : SubscriptionPlan::count();

        $totalRevenue = 0;

        if (
            class_exists(UserSubscription::class) &&
            Schema::hasTable('subscription_plans') &&
            Schema::hasColumn('user_subscriptions', 'subscription_plan_id') &&
            Schema::hasColumn('subscription_plans', 'price')
        ) {
            $totalRevenue = UserSubscription::query()
                ->join('subscription_plans', 'user_subscriptions.subscription_plan_id', '=', 'subscription_plans.id')
                ->where('user_subscriptions.status', 'active')
                ->sum('subscription_plans.price');
        }

        $recentUsers = User::query()
            ->latest()
            ->take(6)
            ->get(['id', 'name', 'email', 'created_at'])
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => optional($user->created_at)?->toISOString(),
                ];
            })
            ->values();

        $recentEvents = Event::query()
            ->with('user:id,name')
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title ?? $event->name ?? 'Event',
                    'owner' => optional($event->user)->name ?? 'Unknown',
                    'date' => optional($event->event_date ?? $event->created_at)?->toISOString(),
                    'status' => $event->status ?? 'Published',
                ];
            })
            ->values();

        $upcomingEvents = collect();

        if (Schema::hasColumn('events', 'event_date')) {
            $upcomingEvents = Event::query()
                ->whereDate('event_date', '>=', today())
                ->orderBy('event_date', 'asc')
                ->take(5)
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'title' => $event->title ?? $event->name ?? 'Event',
                        'event_date' => optional($event->event_date)?->toISOString(),
                    ];
                })
                ->values();
        }

        $recentSubscriptions = collect();

        if (class_exists(UserSubscription::class)) {
            $subscriptionQuery = UserSubscription::query()->latest()->take(6);

            if (method_exists(UserSubscription::class, 'user')) {
                $subscriptionQuery->with(['user:id,name,email']);
            }

            if (method_exists(UserSubscription::class, 'subscriptionPlan')) {
                $subscriptionQuery->with(['subscriptionPlan:id,name,price']);
            }

            $recentSubscriptions = $subscriptionQuery
                ->get()
                ->map(function ($subscription) {
                    return [
                        'id' => $subscription->id,
                        'user_name' => optional($subscription->user)->name ?? 'Unknown',
                        'plan_name' => optional($subscription->subscriptionPlan)->name ?? 'Unknown',
                        'price' => optional($subscription->subscriptionPlan)->price ?? 0,
                        'status' => $subscription->status ?? 'pending',
                        'created_at' => optional($subscription->created_at)?->toISOString(),
                    ];
                })
                ->values();
        }

        $recentLogins = collect();

        if (Schema::hasColumn('users', 'last_login_at')) {
            $recentLogins = User::query()
                ->whereNotNull('last_login_at')
                ->orderByDesc('last_login_at')
                ->take(6)
                ->get(['id', 'name', 'email', 'last_login_at'])
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'last_login_at' => optional($user->last_login_at)?->toISOString(),
                    ];
                })
                ->values();
        }

        $recentActivities = collect()
            ->merge(
                $recentUsers->map(function ($user) {
                    return [
                        'id' => 'user-' . $user['id'],
                        'type' => 'user_registered',
                        'text' => $user['name'] . ' registered on the platform',
                        'time' => $user['created_at'],
                    ];
                })
            )
            ->merge(
                $recentEvents->map(function ($event) {
                    return [
                        'id' => 'event-' . $event['id'],
                        'type' => 'event_created',
                        'text' => $event['owner'] . ' created event "' . $event['title'] . '"',
                        'time' => $event['date'],
                    ];
                })
            )
            ->merge(
                $recentSubscriptions->map(function ($subscription) {
                    return [
                        'id' => 'subscription-' . $subscription['id'],
                        'type' => 'subscription',
                        'text' => $subscription['user_name'] . ' started ' . $subscription['plan_name'],
                        'time' => $subscription['created_at'],
                    ];
                })
            )
            ->merge(
                $recentLogins->map(function ($login) {
                    return [
                        'id' => 'login-' . $login['id'],
                        'type' => 'login',
                        'text' => $login['name'] . ' logged into the platform',
                        'time' => $login['last_login_at'],
                    ];
                })
            )
            ->sortByDesc('time')
            ->take(10)
            ->values();

        $monthlyUsers = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = Carbon::now()->subMonths($monthsAgo);

            return [
                'label' => $date->format('M'),
                'value' => User::query()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        })->values();

        $monthlyEvents = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = Carbon::now()->subMonths($monthsAgo);

            return [
                'label' => $date->format('M'),
                'value' => Event::query()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        })->values();

        $monthlyMedia = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = Carbon::now()->subMonths($monthsAgo);

            return [
                'label' => $date->format('M'),
                'value' => class_exists(Media::class)
                    ? Media::query()
                        ->whereYear('created_at', $date->year)
                        ->whereMonth('created_at', $date->month)
                        ->count()
                    : 0,
            ];
        })->values();

        $loginActivity = collect(range(6, 0))->map(function ($daysAgo) {
            $date = Carbon::now()->subDays($daysAgo);

            if (Schema::hasColumn('users', 'last_login_at')) {
                $value = User::query()
                    ->whereDate('last_login_at', $date->toDateString())
                    ->count();
            } else {
                $value = User::query()
                    ->whereDate('created_at', $date->toDateString())
                    ->count();
            }

            return [
                'label' => $date->format('D'),
                'value' => $value,
            ];
        })->values();

        return view('admin.react', [
            'page' => 'dashboard',
            'user' => auth('admin')->user(),
            'extra' => [
                'stats' => [
                    'totalUsers' => $totalUsers,
                    'totalEvents' => $totalEvents,
                    'activePlans' => $activePlans,
                    'totalRevenue' => '€' . number_format((float) $totalRevenue, 2),
                    'totalMedia' => $totalMedia,
                ],
                'recentUsers' => $recentUsers,
                'recentEvents' => $recentEvents,
                'upcomingEvents' => $upcomingEvents,
                'recentSubscriptions' => $recentSubscriptions,
                'recentLogins' => $recentLogins,
                'activities' => $recentActivities,
                'charts' => [
                    'monthlyUsers' => $monthlyUsers,
                    'monthlyEvents' => $monthlyEvents,
                    'monthlyMedia' => $monthlyMedia,
                    'loginActivity' => $loginActivity,
                ],
            ],
        ]);
    }
}