<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'media.*' => 'required|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480',
            'caption' => 'nullable|string|max:255'
        ]);

        $event = Event::where('code', $request->code)->first();

        $uploadedFiles = [];

        foreach ($request->file('media') as $file) {
            $path = $file->store("media/{$event->id}", 'public');

            $uploadedFiles[] = [
                'user_id' => $event->user_id,
                'event_id' => $event->id,
                'is_guest' => !auth()->check(),
                'file_path' => $path,
                'file_type' => $file->getClientMimeType(),
                'file_size' => $file->getSize(),
                'caption' => $request->caption,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        $event->media()->insert($uploadedFiles);

        return response()->json([
            'success' => true,
            'message' => 'Media uploaded successfully!',
            'count' => count($uploadedFiles)
        ]);
    }
}
