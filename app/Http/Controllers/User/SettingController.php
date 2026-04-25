<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Carbon\Carbon;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $page = $request->get('page', 'settings');

        if (!in_array($page, ['settings', 'pricing'])) {
            $page = 'settings';
        }

        $selectedEvent = $user->events()->find(session('selected_event_id'))
            ?? $user->events()->latest()->first();

        $events = $user->events()->latest()->get();
        $subscription = $user->activeSubscription;
        $subscriptionPlans = SubscriptionPlan::get();

        return view('user.panel', [
            'page' => $page,
            'selectedEvent' => $selectedEvent,
            'events' => $events,
            'event' => $selectedEvent,
            'extra' => [
                'subscription' => [
                    'plan_id' => $subscription?->plan_id,
                    'name' => $subscription?->plan?->name ?? 'Free Plan',
                    'is_premium' => ($subscription?->plan?->price ?? 0) > 0,
                    'price' => $subscription?->plan?->price ?? 0,
                    'status' => $subscription?->status ?? 'inactive',
                    'payment_method' => $subscription?->payment_method ?? 'free',
                    'used_uploads' => 0,
                    'max_uploads' => 100,
                ],
                'subscriptionPlans' => $subscriptionPlans,
            ],
        ]);
    }

    public function saveSettings(Request $request)
    {
        $request->validate([
            'field' => 'required|in:name,event_date,logo,locale,note',
        ]);

        $user = auth()->user();

        $event = $user->events()->find(session('selected_event_id'))
            ?? $user->events()->latest()->first();

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Nuk u gjet asnjë event aktiv.',
            ], 404);
        }

        if ($request->field === 'logo') {
            $request->validate([
                'value' => 'required|file|image|max:2048',
            ]);

            $path = $request->file('value')->store('logos', 'public');
            $event->logo = '/storage/' . $path;
        } else {
            $request->validate([
                'value' => 'required|string|max:255',
            ]);

            $value = $request->field === 'event_date'
                ? Carbon::parse($request->value)->format('Y-m-d')
                : $request->value;

            $event->{$request->field} = $value;
        }

        $event->save();

        return response()->json([
            'success' => true,
            'message' => 'Ndryshimi u ruajt me sukses.',
            'event' => $event,
        ]);
    }

    public function updateCode(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|string|max:255|unique:events,code,' . $id,
        ]);

        $user = auth()->user();

        $event = $user->events()->findOrFail($id);
        $event->code = $request->code;

        $url = url('/events/' . $event->code);
        $qrCode = base64_encode(
            QrCode::format('png')->size(200)->generate($url)
        );

        $event->qr_code = 'data:image/png;base64,' . $qrCode;
        $event->save();

        return response()->json([
            'success' => true,
            'message' => 'Kodi u përditësua me sukses.',
            'event' => $event,
        ]);
    }
}