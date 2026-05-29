<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('user')
            ->latest()
            ->get();

        return view('admin.react', [
            'page' => 'events',
            'extra' => [
                'events' => $events,
            ],
        ]);
    }

    public function show(Event $event)
    {
        return view('admin.react', [
            'page' => 'events-show',
            'extra' => [
                'event' => $event->load('user'),
            ],
        ]);
    }

    public function edit(Event $event)
    {
        return view('admin.react', [
            'page' => 'events-edit',
            'extra' => [
                'event' => $event->load('user'),
            ],
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:255'],
            'date' => ['nullable', 'date'],
            'event_date' => ['nullable', 'date'],
            'is_active' => ['nullable', 'boolean'],
            'is_premium' => ['nullable', 'boolean'],
            'premium_until' => ['nullable', 'date'],
        ]);

        $event->update($validated);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Eventi u përditësua me sukses.');
    }

    public function toggleStatus(Event $event)
    {
        $currentlyActive = $event->is_active !== false;

        $event->forceFill([
            'is_active' => ! $currentlyActive,
        ])->save();

        return response()->json([
            'success' => true,
            'message' => $event->fresh()->is_active
                ? 'Eventi u aktivizua me sukses.'
                : 'Eventi u ndal me sukses.',
            'event' => $event->fresh('user'),
        ]);
    }

    public function togglePremium(Event $event)
    {
        $event->load('user');

        $currentlyPremium = $event->is_premium === true;
        $user = $event->user;

        if ($currentlyPremium) {
            $event->forceFill([
                'is_premium' => false,
                'premium_until' => null,
            ])->save();

            if ($user) {
                $user->forceFill([
                    'is_premium' => false,
                    'premium_until' => null,
                ])->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Premium u hoq nga eventi dhe nga përdoruesi.',
                'event' => $event->fresh('user'),
            ]);
        }

        $premiumUntil = now()->addMonths(6);

        $event->forceFill([
            'is_premium' => true,
            'premium_until' => $premiumUntil,
        ])->save();

        if ($user) {
            $user->forceFill([
                'is_premium' => true,
                'premium_until' => $premiumUntil,
            ])->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Eventi dhe përdoruesi u bënë Premium me sukses.',
            'event' => $event->fresh('user'),
        ]);
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Eventi u fshi me sukses.',
        ]);
    }
}