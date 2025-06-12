<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run()
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('11223344'),
        ]);

        $plan = SubscriptionPlan::where('price', '=', 0)->first();

        $now = Carbon::now();
        $status = 'active';

        UserSubscription::create([
            'user_id' => $user->id,
            'subscription_plan_id' => $plan->id,
            'starts_at' => $now,
            'ends_at' => $now->copy()->addDays($plan->billing_cycle_days),
            'is_active' => $status === 'active',
            'status' => $status,
            'auto_renew' => false,
            'payment_method' => 'free',
            'payment_reference' => null,
        ]);
    }
}
