<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubscriptionPlanController extends Controller
{
    public function index()
    {
        $plans = SubscriptionPlan::query()
            ->latest()
            ->get()
            ->map(function ($plan) {
                return $this->transformPlan($plan);
            })
            ->values();

        return view('admin.react', [
            'page' => 'plans',
            'user' => auth('admin')->user(),
            'extra' => [
                'plans' => $plans,
            ],
        ]);
    }

    public function create()
    {
        return view('admin.react', [
            'page' => 'plans-create',
            'user' => auth('admin')->user(),
            'extra' => [],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:subscription_plans,slug'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:10'],
            'billing_cycle_days' => ['required', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
            'features' => ['nullable', 'array'],
            'limits' => ['nullable', 'array'],
        ]);

        $plan = SubscriptionPlan::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'currency' => $validated['currency'] ?? 'EUR',
            'billing_cycle_days' => $validated['billing_cycle_days'],
            'is_active' => $validated['is_active'] ?? true,
            'features' => $validated['features'] ?? [],
            'limits' => $validated['limits'] ?? [],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Plan created successfully.',
            'redirect' => route('admin.plans.index'),
            'plan_id' => $plan->id,
        ]);
    }

    public function show(SubscriptionPlan $plan)
    {
        return view('admin.react', [
            'page' => 'plans-show',
            'user' => auth('admin')->user(),
            'extra' => [
                'selectedPlan' => $this->transformPlan($plan),
            ],
        ]);
    }

    public function edit(SubscriptionPlan $plan)
    {
        return view('admin.react', [
            'page' => 'plans-edit',
            'user' => auth('admin')->user(),
            'extra' => [
                'selectedPlan' => $this->transformPlan($plan),
            ],
        ]);
    }

    public function update(Request $request, SubscriptionPlan $plan)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:subscription_plans,slug,' . $plan->id],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:10'],
            'billing_cycle_days' => ['required', 'integer', 'min:1'],
            'is_active' => ['nullable', 'boolean'],
            'features' => ['nullable', 'array'],
            'limits' => ['nullable', 'array'],
        ]);

        $plan->update([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'currency' => $validated['currency'] ?? 'EUR',
            'billing_cycle_days' => $validated['billing_cycle_days'],
            'is_active' => $validated['is_active'] ?? true,
            'features' => $validated['features'] ?? [],
            'limits' => $validated['limits'] ?? [],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Plan updated successfully.',
            'redirect' => route('admin.plans.index'),
        ]);
    }

    public function destroy(SubscriptionPlan $plan)
    {
        $plan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Plan deleted successfully.',
            'redirect' => route('admin.plans.index'),
        ]);
    }

    public function toggleStatus(SubscriptionPlan $plan)
    {
        $plan->is_active = !$plan->is_active;
        $plan->save();

        return response()->json([
            'success' => true,
            'is_active' => $plan->is_active,
            'message' => 'Plan status updated successfully.',
        ]);
    }

    protected function transformPlan(SubscriptionPlan $plan): array
    {
        return [
            'id' => $plan->id,
            'name' => $plan->name,
            'slug' => $plan->slug,
            'description' => $plan->description,
            'price' => $plan->price,
            'currency' => $plan->currency ?? 'EUR',
            'billing_cycle_days' => $plan->billing_cycle_days,
            'is_active' => (bool) $plan->is_active,
            'features' => $plan->features ?? [],
            'limits' => $plan->limits ?? [],
            'formatted_price' => $plan->formatted_price,
            'display_name' => $plan->display_name,
            'active_days' => $plan->active_days,
            'active_hours' => $plan->active_hours,
            'created_at' => optional($plan->created_at)?->toISOString(),
            'updated_at' => optional($plan->updated_at)?->toISOString(),
        ];
    }
}