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
        ]);

        $event->update($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully.',
        ]);
    }
}