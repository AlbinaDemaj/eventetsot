<?php

namespace App\Services;

use App\Models\User;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Notifications\SubscriptionSuccess;
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

    public function activateSubscription(UserSubscription $subscription, string $paymentReference)
    {
        $user = User::findOrFail($subscription->user_id);
        $this->cancelActiveSubscriptions($user, $subscription);

        $subscription->update([
            'is_active' => true,
            'status' => 'active',
            'payment_reference' => $paymentReference
        ]);

        $user->notify(new SubscriptionSuccess);

        return $subscription;
    }

    public function cancelActiveSubscriptions(User $user, UserSubscription $subscription): void
    {
        $user->subscriptions()
            ->where('status', 'active')
            ->where('id', '!=', $subscription->id)
            ->update([
                'status' => 'cancelled',
                'is_active' => false,
                'canceled_at' => now()
            ]);
    }

    public function cancelAllActiveSubscriptions(User $user): void
    {
        $user->subscriptions()
            ->where('status', 'active')
            ->update([
                'status' => 'cancelled',
                'is_active' => false,
                'canceled_at' => now()
            ]);
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
