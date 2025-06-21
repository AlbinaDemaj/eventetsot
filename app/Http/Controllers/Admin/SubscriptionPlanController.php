<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $subscription_plans = SubscriptionPlan::latest()->get();
        return view('admin.subscription-plans', compact('subscription_plans'));
    }

    public function update(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        $subscriptionPlan->update([
            'name' => $request->name,
            'price' => $request->price,
        ]);

        return redirect()->route('admin.subscription-plans.index')
            ->with('success', 'Subscription plan updated successfully.');
    }

}
