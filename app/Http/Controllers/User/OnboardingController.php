<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class OnboardingController extends Controller
{
    public function index()
    {
        return view('user.onboarding.index');
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

        $event = Event::create([
            'user_id' => auth()->id(),
            'name' => session('onboarding.event_name'),
            'event_date' => $request->event_date,
        ]);

        session(['selected_event_id' => $event->id]);

        session()->forget('onboarding');

        return redirect()->route('user.home');
    }
}
