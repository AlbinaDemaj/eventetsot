<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index()
{
    $selectedEvent = auth()->user()->events()->find(session('selected_event_id'))
        ?? auth()->user()->events()->latest()->first();

    $events = auth()->user()->events()->latest()->get();

    $media = $selectedEvent
        ? Media::where('event_id', $selectedEvent->id)->latest()->get()
        : collect();

    $userActiveSubscription = auth()->user()->activeSubscription ?? null;

    return view('user.panel', [
        'page' => 'media',
        'selectedEvent' => $selectedEvent,
        'events' => $events,
        'media' => $media,
        'userActiveSubscription' => $userActiveSubscription,
        'extra' => [],
    ]);
}

    public function destroy($id)
    {
        $media = Media::findOrFail($id);

        if ($media->file_path) {
            Storage::disk('public')->delete($media->file_path);
        }

        $media->delete();

        return back()->with('success', 'Media deleted successfully!');
    }
}