<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\User;
use App\Models\UserSubscription;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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

        $isPaidRequested = filter_var($request->is_paid, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if (!is_null($isPaidRequested) && $isPaidRequested !== $currentPaidStatus) {
            $plan = $isPaidRequested
                ? SubscriptionPlan::where('price', '>', 0)->first()
                : SubscriptionPlan::where('price', 0)->first();

            $this->subscriptionService->cancelAllActiveSubscriptions($user);

            $this->subscriptionService->createSubscription(
                user: $user,
                plan: $plan,
                autoRenew: false,
                paymentMethod: $isPaidRequested ? 'ibas' : 'free',
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
        DB::beginTransaction();

        try {
            // 1. Get all unique event IDs that belong to this user
            $eventIds = $user->events()->pluck('id');

            // 2. Delete entire media directories for each event
            foreach ($eventIds as $eventId) {
                $directory = "media/{$eventId}/";

                // Check if directory exists in S3
                if (Storage::disk('s3')->exists($directory)) {
                    // Delete all files in the directory
                    Storage::disk('s3')->deleteDirectory($directory);
                    Log::info("Deleted S3 directory: {$directory}");
                }
            }

            // 3. Delete all media records from database
            $user->media()->forceDelete();

            // 4. Delete all events (this will cascade if relationships are setup correctly)
            $user->events()->forceDelete();

            // 5. Delete user subscriptions
            $user->subscriptions()->forceDelete();

            // 7. Finally delete the user
            $user->forceDelete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'User and all associated data (including event media directories) deleted permanently',
                'deleted_directories' => $eventIds->map(fn($id) => "media/{$id}/")->toArray()
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('User deletion failed: ' . $e->getMessage(), [
                'user_id' => $user->id,
                'exception' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user and associated data',
                'error' => config('app.debug') ? $e->getMessage() : 'Server error'
            ], 500);
        }
    }
}
