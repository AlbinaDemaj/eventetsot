<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct(
        protected SubscriptionService $subscriptionService
    )
    {}
    public function index()
    {
        $users = User::latest()->get();
        return view('admin.users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required'],
            'is_paid' => ['nullable', 'boolean'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($request->has('is_paid')) {
            $plan = SubscriptionPlan::where('price', '>' ,0)->first();

            $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: false,
                paymentMethod: 'ibas',
                status: 'active'
            );
        } else {
            $plan = SubscriptionPlan::where('price', 0)->first();

            $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: false,
                paymentMethod: 'free',
                status: 'active'
            );
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'password' => ['nullable'],
            'is_paid' => ['nullable', 'boolean'],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        $currentPaidStatus = $user->activeSubscription && $user->activeSubscription->payment_method !== 'free';

        if ($request->is_paid != $currentPaidStatus) {
            $plan = $request->is_paid
                ? SubscriptionPlan::where('price', '>', 0)->first()
                : SubscriptionPlan::where('price', 0)->first();

            $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: false,
                paymentMethod: $request->is_paid ? 'ibas' : 'free',
                status: 'active'
            );
        }

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function edit(User $user)
    {
        $user->load(['activeSubscription' => function($query) {
            $query->with('plan');
        }]);

        return response()->json([
            'user' => $user,
            'subscription' => $user->activeSubscription,
            'is_paid' => $user->activeSubscription && $user->activeSubscription->payment_method !== 'free'
        ]);
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
