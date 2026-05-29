<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\User;

class AdminUserPremiumController extends Controller
{
    public function givePremium(User $user)
    {
        $premiumUntil = now()->addMonths(6);

        $user->update([
            'is_premium' => true,
            'premium_until' => $premiumUntil,
            'premium_given_by' => auth('admin')->user()?->name ?? 'Admin',
        ]);

        Event::where('user_id', $user->id)->update([
            'expires_at' => $premiumUntil,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Premium u aktivizua për 6 muaj dhe eventet u riaktivizuan.',
            'user' => $user->fresh(),
        ]);
    }

    public function removePremium(User $user)
    {
        $user->update([
            'is_premium' => false,
            'premium_until' => null,
            'premium_given_by' => null,
        ]);

        Event::where('user_id', $user->id)
            ->where('created_at', '<=', now()->subHours(3))
            ->update([
                'expires_at' => now()->subMinute(),
            ]);

        Event::where('user_id', $user->id)
            ->where('created_at', '>', now()->subHours(3))
            ->update([
                'expires_at' => null,
            ]);

        return response()->json([
            'success' => true,
            'message' => 'Premium u largua dhe eventet u kthyen në logjikën Free.',
            'user' => $user->fresh(),
        ]);
    }
}