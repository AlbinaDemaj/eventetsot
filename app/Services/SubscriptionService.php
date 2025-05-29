<?php

namespace App\Services;

use App\Models\User;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;

class SubscriptionService
{
    public function createSubscription(
        User $user,
        SubscriptionPlan $plan,
        bool $autoRenew = true,
        string $paymentMethod = null,
        string $status = 'pending',
        string $paymentReference = null,

    ): UserSubscription {
        // Cancel any existing active subscription
        $this->cancelActiveSubscriptions($user);

        $now = Carbon::now();

        return UserSubscription::create([
            'user_id' => $user->id,
            'subscription_plan_id' => $plan->id,
            'starts_at' => $now,
            'ends_at' => $now->copy()->addDays($plan->billing_cycle_days),
            'is_active' => $status === 'active',
            'status' => $status,
            'auto_renew' => $autoRenew,
            'payment_method' => $paymentMethod,
            'payment_reference' => $paymentReference,
        ]);
    }

    public function activateSubscription(UserSubscription $subscription, string $paymentReference): UserSubscription
    {
        return $subscription->update([
            'is_active' => true,
            'status' => 'active',
            'payment_reference' => $paymentReference
        ]);
    }

    public function cancelActiveSubscriptions(User $user): void
    {
        $user->subscriptions()
            ->active()
            ->get()
            ->each
            ->cancel();
    }

    public function renewExpiredSubscriptions(): void
    {
        UserSubscription::with(['user', 'plan'])
            ->where('ends_at', '<=', now())
            ->where('is_active', true)
            ->where('auto_renew', true)
            ->get()
            ->each(function ($subscription) {
                $this->renewSubscription($subscription);
            });
    }

    protected function renewSubscription(UserSubscription $subscription): void
    {
        $paymentSuccess = true; // In real app, verify payment first

        if ($paymentSuccess) {
            $now = Carbon::now();
            $subscription->update([
                'starts_at' => $now,
                'ends_at' => $now->copy()->addDays($subscription->plan->billing_cycle_days)
            ]);
        } else {
            $subscription->cancel();
        }
    }
}
