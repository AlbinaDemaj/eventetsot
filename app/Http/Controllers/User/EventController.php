<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return view('user.events');
    }

    public function switchEvent(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);

        $event = auth()->user()->events()->findOrFail($request->event_id);

        session(['selected_event_id' => $event->id]);

        return back();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_date' => 'required|date',
            'name' => 'required|string',
        ]);

        $event = Event::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'event_date' => $request->event_date,
        ]);

        return redirect()->back();
    }
}
