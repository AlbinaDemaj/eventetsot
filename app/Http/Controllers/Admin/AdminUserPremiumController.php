<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminUserPremiumController extends Controller
{
    public function givePremium(User $user)
    {
        $user->is_premium = true;
        $user->premium_until = now()->addMonths(6);
        $user->premium_given_by = auth()->user()?->name ?? 'Admin';
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Premium u aktivizua me sukses për 6 muaj.',
            'user' => $user->fresh(),
        ]);
    }

    public function removePremium(User $user)
    {
        $user->is_premium = false;
        $user->premium_until = null;
        $user->premium_given_by = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Premium u largua me sukses.',
            'user' => $user->fresh(),
        ]);
    }
}