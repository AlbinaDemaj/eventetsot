<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.type' => 'required|in:file,text',
            'items.*.file' => 'required_if:items.*.type,file|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480',
            'items.*.textContent' => 'required_if:items.*.type,text|string',
            'items.*.backgroundImage' => 'required_if:items.*.type,text|string',
            'items.*.fontColor' => 'required_if:items.*.type,text|string',
            'items.*.caption.text' => 'nullable|string|max:255',
            'items.*.caption.name' => 'nullable|string|max:255',
            'code' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $event = Event::where('code', $request->code)->firstOrFail();
        $uploadedItems = [];

        foreach ($request->items as $item) {
            if ($item['type'] === 'file') {
                // Handle file upload
                $file = $item['file'];
                $path = $file->store("media/{$event->id}", 'public');

                $uploadedItems[] = [
                    'user_id' => $event->user_id,
                    'event_id' => $event->id,
                    'is_guest' => !auth()->check(),
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                    'file_size' => $file->getSize(),
                    'caption_text' => $item['caption']['text'] ?? null,
                    'caption_name' => $item['caption']['name'] ?? null,
                    'type' => 'file',
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            } elseif ($item['type'] === 'text') {
                // Handle text post
                $uploadedItems[] = [
                    'user_id' => $event->user_id,
                    'event_id' => $event->id,
                    'is_guest' => !auth()->check(),
                    'text_content' => $item['textContent'],
                    'background_image' => $item['backgroundImage'],
                    'font_color' => $item['fontColor'],
                    'caption_text' => $item['caption']['text'] ?? null,
                    'caption_name' => $item['caption']['name'] ?? null,
                    'type' => 'text',
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            }
        }

        $event->media()->insert($uploadedItems);

        return response()->json([
            'success' => true,
            'message' => 'Content uploaded successfully!',
            'count' => count($uploadedItems)
        ]);
    }
}
