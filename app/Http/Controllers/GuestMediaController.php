<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GuestMediaController extends Controller
{
    private function eventIsPremium(Event $event): bool
    {
        return $event->user?->hasActivePremium() ?? false;
    }

    public function show($code)
    {
        $event = Event::with([
            'media',
            'user.activeSubscription.plan',
        ])
            ->where('share_code', $code)
            ->orWhere('code', $code)
            ->firstOrFail();

        $event->is_premium = $this->eventIsPremium($event);
        $event->premium_until = $event->user?->premium_until;

        $media = $event->media()
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'url' => $item->file_path ? Storage::url($item->file_path) : null,
                    'path' => $item->file_path ? Storage::url($item->file_path) : null,
                    'file_path' => $item->file_path ? Storage::url($item->file_path) : null,
                    'type' => $item->file_type,
                    'file_type' => $item->file_type,
                    'size' => $item->file_size,
                    'caption' => $item->caption,
                    'caption_name' => $item->caption_name ?? null,
                    'caption_text' => $item->caption_text ?? null,
                    'text_content' => $item->text_content ?? $item->caption_text ?? null,
                    'created_at' => $item->created_at,
                ];
            });

        return view('guest.event', [
            'event' => $event,
            'media' => $media,
        ]);
    }

    public function store(Request $request, $code)
    {
        $event = Event::with([
            'user.activeSubscription.plan',
        ])
            ->where('share_code', $code)
            ->orWhere('code', $code)
            ->firstOrFail();

        $isPremium = $this->eventIsPremium($event);

        $request->validate([
            'file' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,webp,mp4,mov,avi',
                'max:20480',
            ],
            'media' => ['nullable', 'array'],
            'media.*' => [
                'file',
                'mimes:jpg,jpeg,png,webp,mp4,mov,avi',
                'max:20480',
            ],
            'type' => ['nullable', 'string', 'max:50'],
            'file_type' => ['nullable', 'string', 'max:100'],
            'name' => ['nullable', 'string', 'max:255'],
            'text' => ['nullable', 'string', 'max:1000'],
            'text_content' => ['nullable', 'string', 'max:1000'],
            'caption' => ['nullable', 'string', 'max:255'],
            'caption_name' => ['nullable', 'string', 'max:255'],
            'caption_text' => ['nullable', 'string', 'max:1000'],
        ]);

        $files = [];

        if ($request->hasFile('file')) {
            $files[] = $request->file('file');
        }

        if ($request->hasFile('media')) {
            $files = array_merge($files, $request->file('media'));
        }

        $textToSave = trim(
            $request->caption_text
                ?? $request->text_content
                ?? $request->text
                ?? ''
        );

        $isTextOnly = count($files) === 0 && $textToSave !== '';

        if (count($files) === 0 && !$isTextOnly) {
            return response()->json([
                'success' => false,
                'message' => 'Shto një foto, video ose mesazh.',
            ], 422);
        }

        $currentCount = $event->media()->count();
        $newItemsCount = $isTextOnly ? 1 : count($files);

        if (!$isPremium && ($currentCount + $newItemsCount) > 5) {
            return response()->json([
                'success' => false,
                'message' => 'Plani falas lejon vetëm 5 vendosje. Për më shumë foto, video dhe mesazhe duhet Premium.',
            ], 403);
        }

        if (!$isPremium) {
            foreach ($files as $file) {
                if (str_starts_with($file->getMimeType(), 'video')) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Video lejohen vetëm për planin Premium.',
                    ], 403);
                }
            }
        }

        $guestName = $request->caption_name ?? $request->name ?? 'I ftuar';

        if ($isTextOnly) {
            $media = $event->media()->create([
                'is_guest' => true,
                'file_path' => null,
                'file_type' => 'text/plain',
                'file_size' => 0,
                'caption' => $textToSave,
                'caption_name' => $guestName,
                'caption_text' => $textToSave,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Mesazhi u ruajt me sukses.',
                'data' => [
                    'id' => $media->id,
                    'url' => null,
                    'file_path' => null,
                    'path' => null,
                    'type' => 'text/plain',
                    'file_type' => 'text/plain',
                    'size' => 0,
                    'caption' => $media->caption,
                    'caption_name' => $media->caption_name,
                    'caption_text' => $media->caption_text,
                    'text_content' => $media->caption_text,
                    'created_at' => $media->created_at,
                ],
            ]);
        }

        $uploadedMedia = [];

        foreach ($files as $file) {
            $path = $file->store("media/{$event->id}", 'public');

            $media = $event->media()->create([
                'is_guest' => true,
                'file_path' => $path,
                'file_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'caption' => $request->caption ?? $textToSave,
                'caption_name' => $guestName,
                'caption_text' => $textToSave,
            ]);

            $uploadedMedia[] = [
                'id' => $media->id,
                'url' => Storage::url($media->file_path),
                'file_path' => Storage::url($media->file_path),
                'path' => Storage::url($media->file_path),
                'type' => $media->file_type,
                'file_type' => $media->file_type,
                'size' => $media->file_size,
                'caption' => $media->caption,
                'caption_name' => $media->caption_name,
                'caption_text' => $media->caption_text,
                'created_at' => $media->created_at,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Media u ngarkua me sukses.',
            'data' => $uploadedMedia[0],
            'media' => $uploadedMedia,
        ]);
    }
}