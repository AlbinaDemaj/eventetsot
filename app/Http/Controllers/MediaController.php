<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Services\ImageGeneratorService;
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
        $user = User::where('id', $event->user_id)->firstOrFail();

//        if (!$user->isLinkActive($event->event_date) && !$event->is_public) {
//            return response()->json([
//                'success' => false,
//                'message' => 'You cannot upload right now. Please wait to activate the event upload.'
//            ]);
//        }

        if (!$user->canUpload() && !$event->is_public) {
            return response()->json([
                'success' => false,
                'message' => 'Upload limit reached for your subscription'
            ]);
        }

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
                // Handle text post with image generation
                $textToImageService = new ImageGeneratorService();

                $filename = basename(parse_url( $item['backgroundImage'], PHP_URL_PATH));

                // Generate the image
                $image = $textToImageService->createTextImage(
                    $item['textContent'],
                    $filename,
                    $item['fontColor']
                );

                // Save the generated image
                $path = $textToImageService->saveImage($image, $event->id);

                $uploadedItems[] = [
                    'user_id' => $event->user_id,
                    'event_id' => $event->id,
                    'is_guest' => !auth()->check(),
                    'file_path' => $path,
                    'file_type' => 'image/jpg',
                    'file_size' => filesize(storage_path("app/public/{$path}")),
                    'text_content' => $item['textContent'],
                    'background_image' => $filename,
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
