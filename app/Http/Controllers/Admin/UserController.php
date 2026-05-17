<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->latest()
            ->get()
            ->map(fn ($user) => $this->transformUser($user))
            ->values();

        return view('admin.react', [
            'page' => 'users',
            'user' => auth('admin')->user(),
            'extra' => [
                'users' => $users,
            ],
        ]);
    }

    public function create()
    {
        $plans = $this->getPlans();

        return view('admin.react', [
            'page' => 'users-create',
            'user' => auth('admin')->user(),
            'extra' => [
                'plans' => $plans,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'status' => ['nullable', 'in:active,inactive,pending'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => $validated['status'] ?? 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully.',
            'redirect' => route('admin.users.show', $user),
        ]);
    }

    public function show(User $user)
    {
        return view('admin.react', [
            'page' => 'users-show',
            'user' => auth('admin')->user(),
            'extra' => [
                'selectedUser' => $this->transformUser($user),
            ],
        ]);
    }

    public function edit(User $user)
    {
        $plans = $this->getPlans();

        return view('admin.react', [
            'page' => 'users-edit',
            'user' => auth('admin')->user(),
            'extra' => [
                'selectedUser' => $this->transformUser($user),
                'plans' => $plans,
            ],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:6'],
            'status' => ['nullable', 'in:active,inactive,pending'],
        ]);

        if (array_key_exists('name', $validated)) {
            $user->name = $validated['name'];
        }

        if (array_key_exists('email', $validated)) {
            $user->email = $validated['email'];
        }

        if (!empty($validated['status'])) {
            $user->status = $validated['status'];
        }

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully.',
            'redirect' => route('admin.users.show', $user),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
            'redirect' => route('admin.users.index'),
        ]);
    }

    public function toggleStatus(User $user)
    {
        $current = strtolower((string) ($user->status ?? ''));

        $user->status = $current === 'active' ? 'inactive' : 'active';
        $user->save();

        return response()->json([
            'success' => true,
            'status' => $user->status,
            'message' => 'User status updated successfully.',
        ]);
    }

    public function grantPremium(User $user)
    {
        $premiumPlan = SubscriptionPlan::query()
            ->where('price', '>', 0)
            ->where('is_active', 1)
            ->first();

        if (!$premiumPlan) {
            return response()->json([
                'success' => false,
                'message' => 'Plani Plus/Premium nuk u gjet.',
            ], 404);
        }

        UserSubscription::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'subscription_plan_id' => $premiumPlan->id,
                'status' => 'active',
                'starts_at' => now(),
                'ends_at' => now()->addDays($premiumPlan->billing_cycle_days ?? 180),
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Plani Plus u aktivizua me sukses.',
        ]);
    }

    protected function transformUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'status' => $user->status ?? null,
            'created_at' => optional($user->created_at)?->toISOString(),
            'updated_at' => optional($user->updated_at)?->toISOString(),
            'last_login_at' => isset($user->last_login_at) ? optional($user->last_login_at)?->toISOString() : null,
            'subscription_plan_name' => $user->subscription_plan_name ?? null,
            'plan_name' => $user->plan_name ?? null,
        ];
    }

    protected function getPlans()
    {
        if (!class_exists(SubscriptionPlan::class)) {
            return [];
        }

        return SubscriptionPlan::query()
            ->get(['id', 'name', 'price'])
            ->map(fn ($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'price' => $plan->price,
            ])
            ->values();
    }
}