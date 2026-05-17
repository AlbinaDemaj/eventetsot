<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function index()
    {
        return redirect()->route('user.onboarding.event-name');
    }

    public function eventName()
    {
        return view('user.onboarding.event-name');
    }

    public function saveEventName(Request $request)
    {
        $request->validate([
            'event_name' => 'required|string|max:255',
        ]);

        session(['onboarding.event_name' => $request->event_name]);

        return redirect()->route('user.onboarding.event-date');
    }

    public function eventDate()
    {
        return view('user.onboarding.event-date');
    }

    public function saveEventDate(Request $request)
    {
        $request->validate([
            'event_date' => 'required|date',
        ]);

        $user = auth()->user();

        $isPremium =
            (bool) ($user->is_paid ?? false) ||
            (bool) ($user->is_premium ?? false) ||
            (bool) optional($user->subscription ?? null)->is_active ||
            (optional(optional($user->subscription ?? null)->plan ?? null)->slug === 'premium');

        $event = Event::create([
            'user_id' => $user->id,
            'name' => session('onboarding.event_name'),
            'event_date' => $request->event_date,
            'expires_at' => $isPremium
                ? now()->addMonths(6)
                : now()->addDays(7),
        ]);

        session(['selected_event_id' => $event->id]);

        session()->forget('onboarding');

        return redirect()->route('user.home');
    }
}