<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class GuestMediaController extends Controller
{
    public function show($code)
    {
        $event = Event::where('share_code', $code)->firstOrFail();
        return view('guest.event', [
            'event' => $event,
            'media' => $event->media()->latest()->get()
        ]);
    }

    public function store(Request $request, $code)
    {
        $event = Event::where('share_code', $code)->firstOrFail();

        $request->validate([
            'media' => 'required|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480',
            'caption' => 'nullable|string|max:255'
        ]);

        $file = $request->file('media');
        $path = $file->store("media/{$event->id}", 'public');

        $event->media()->create([
            'is_guest' => true,
            'file_path' => $path,
            'file_type' => $file->getClientMimeType(),
            'file_size' => $file->getSize(),
            'caption' => $request->caption
        ]);

        return back()->with('success', 'Thank you for your contribution!');
    }
}
