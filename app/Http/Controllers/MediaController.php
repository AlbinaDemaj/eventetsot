<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Media;
use App\Models\User;
use App\Services\ImageGeneratorService;
use App\Services\ImageOptimizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MediaController extends Controller
{
    protected $imageOptimizationService;

    public function __construct(ImageOptimizationService $imageOptimizationService)
    {
        $this->imageOptimizationService = $imageOptimizationService;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|in:file,text',
            'items.*.file' => 'required_if:items.*.type,file|file|mimetypes:image/*,video/*',
            'items.*.textContent' => 'required_if:items.*.type,text|string',
            'items.*.backgroundImage' => 'required_if:items.*.type,text|string',
            'items.*.fontColor' => 'required_if:items.*.type,text|string',
            'items.*.caption.text' => 'nullable|string|max:255',
            'items.*.caption.name' => 'nullable|string|max:255',
            'code' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Të dhënat nuk janë të sakta.',
                'errors' => $validator->errors(),
            ], 422);
        }

        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', '0');
        ini_set('max_file_uploads', '1000');

        $event = Event::where('code', $request->code)->firstOrFail();
        $user = User::findOrFail($event->user_id);

        $incomingItemsCount = count($request->items);
        $currentUploadsCount = $event->media()->count();

        /*
         * LOGJIKA E PLANEVE:
         * Free plan  = max 5 media
         * Premium    = pa limit
         *
         * Këtu po përdorim disa mundësi sepse projekti yt mund ta ruajë planin
         * si is_paid, is_premium ose subscription aktive.
         */

        $isPremium =
            (bool) ($user->is_paid ?? false) ||
            (bool) ($user->is_premium ?? false) ||
            (bool) optional($user->subscription ?? null)->is_active ||
            (optional(optional($user->subscription ?? null)->plan ?? null)->slug === 'premium');

        $freeUploadLimit = 5;

        if (!$isPremium && !$event->is_public) {
            if (($currentUploadsCount + $incomingItemsCount) > $freeUploadLimit) {
                return response()->json([
                    'success' => false,
                    'message' => "Plani falas lejon vetëm {$freeUploadLimit} foto/video. Për më shumë, duhet të kalosh në Premium.",
                    'used' => $currentUploadsCount,
                    'limit' => $freeUploadLimit,
                    'remaining' => max(0, $freeUploadLimit - $currentUploadsCount),
                ], 403);
            }
        }

        $uploadedItems = [];

        foreach ($request->items as $item) {
            if ($item['type'] === 'file') {
                $file = $item['file'];
                $fileType = $file->getMimeType();
                $isVideo = str_starts_with($fileType, 'video/');

                try {
                    if ($isVideo) {
                        $path = 'media/' . $event->id . '/';
                        $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                        $s3Path = $path . $fileName;
                        $debugData = [];

                        $this->imageOptimizationService->uploadDirectToS3(
                            $file,
                            $s3Path,
                            $file->getMimeType(),
                            $debugData
                        );

                        $uploadedItems[] = [
                            'user_id' => $event->user_id,
                            'event_id' => $event->id,
                            'is_guest' => !auth()->check(),
                            'file_path' => Storage::disk('s3')->url($s3Path),
                            'file_type' => $fileType,
                            'file_size' => $file->getSize(),
                            'caption_text' => $item['caption']['text'] ?? null,
                            'caption_name' => $item['caption']['name'] ?? null,
                            'type' => 'file',
                            'is_cloud' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    } else {
                        $processedFile = $this->imageOptimizationService->processUploadedFileObject(
                            $file,
                            $event->id
                        );

                        $uploadedItems[] = [
                            'user_id' => $event->user_id,
                            'event_id' => $event->id,
                            'is_guest' => !auth()->check(),
                            'file_path' => $processedFile['url'],
                            'file_type' => $processedFile['file_type'],
                            'file_size' => $processedFile['file_size'],
                            'caption_text' => $item['caption']['text'] ?? null,
                            'caption_name' => $item['caption']['name'] ?? null,
                            'type' => 'file',
                            'is_cloud' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                } catch (\Exception $e) {
                    \Log::error('File upload failed: ' . $e->getMessage());
                }
            }

            if ($item['type'] === 'text') {
                $textToImageService = new ImageGeneratorService();
                $filename = basename(parse_url($item['backgroundImage'], PHP_URL_PATH));

                try {
                    $image = $textToImageService->createTextImage(
                        $item['textContent'],
                        $filename,
                        $item['fontColor']
                    );

                    $processedImage = $this->imageOptimizationService->processUploadedFile(
                        $image,
                        $event->id,
                        time() . '_' . uniqid() . '.png'
                    );

                    $uploadedItems[] = [
                        'user_id' => $event->user_id,
                        'event_id' => $event->id,
                        'is_guest' => !auth()->check(),
                        'file_path' => $processedImage['url'],
                        'file_type' => $processedImage['file_type'],
                        'file_size' => $processedImage['file_size'],
                        'text_content' => $item['textContent'],
                        'background_image' => $filename,
                        'font_color' => $item['fontColor'],
                        'caption_text' => $item['caption']['text'] ?? null,
                        'caption_name' => $item['caption']['name'] ?? null,
                        'type' => 'text',
                        'is_cloud' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                } catch (\Exception $e) {
                    \Log::error('Text image generation/optimization failed: ' . $e->getMessage());
                }
            }
        }

        if (empty($uploadedItems)) {
            return response()->json([
                'success' => false,
                'message' => 'Asnjë media nuk u ngarkua. Provo përsëri.',
            ], 500);
        }

        $event->media()->insert($uploadedItems);

        return response()->json([
            'success' => true,
            'message' => 'Media u ngarkua me sukses.',
            'count' => count($uploadedItems),
            'used' => $currentUploadsCount + count($uploadedItems),
            'limit' => $isPremium ? null : $freeUploadLimit,
            'is_premium' => $isPremium,
        ]);
    }

    public function mediaComment(Request $request)
    {
        $relativePath = str_replace(asset('storage'), '', $request->image);
        $relativePath = ltrim($relativePath, '/');

        $media = Media::where('file_path', $relativePath)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $media,
        ]);
    }
    public function storeGuest(Request $request, $code)
{
    $event = Event::where('code', $code)->firstOrFail();
    $user = User::findOrFail($event->user_id);

    $freeUploadLimit = 5;
    $currentUploadsCount = $event->media()->count();

    $isPremium =
        (bool) ($user->is_paid ?? false) ||
        (bool) ($user->is_premium ?? false) ||
        (bool) optional($user->subscription ?? null)->is_active ||
        (optional(optional($user->subscription ?? null)->plan ?? null)->slug === 'premium');

    if (!$isPremium && $currentUploadsCount >= $freeUploadLimit) {
        return response()->json([
            'success' => false,
            'message' => "Plani falas lejon vetëm {$freeUploadLimit} vendosje. Për më shumë, duhet Premium.",
            'used' => $currentUploadsCount,
            'limit' => $freeUploadLimit,
            'remaining' => 0,
        ], 403);
    }

    $validator = Validator::make($request->all(), [
        'file' => 'nullable|file|mimetypes:image/*,video/*',
        'name' => 'nullable|string|max:255',
        'text' => 'nullable|string|max:2000',
        'caption_text' => 'nullable|string|max:2000',
        'caption_name' => 'nullable|string|max:255',
        'text_content' => 'nullable|string|max:2000',
        'type' => 'nullable|string|max:100',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Të dhënat nuk janë të sakta.',
            'errors' => $validator->errors(),
        ], 422);
    }

    $guestName =
        $request->input('caption_name') ?:
        $request->input('name') ?:
        'I ftuar';

    $guestText =
        $request->input('caption_text') ?:
        $request->input('text_content') ?:
        $request->input('text') ?:
        '';

    if (!$request->hasFile('file') && trim($guestText) === '') {
        return response()->json([
            'success' => false,
            'message' => 'Shto foto/video ose shkruaj një mesazh.',
        ], 422);
    }

    try {
        $media = new Media();

        $media->user_id = $event->user_id;
        $media->event_id = $event->id;
        $media->is_guest = 1;
        $media->caption_name = $guestName;
        $media->caption_text = $guestText;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileType = $file->getMimeType();
            $isVideo = str_starts_with($fileType, 'video/');

            if ($isVideo) {
                $path = 'media/' . $event->id . '/';
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $s3Path = $path . $fileName;
                $debugData = [];

                $this->imageOptimizationService->uploadDirectToS3(
                    $file,
                    $s3Path,
                    $file->getMimeType(),
                    $debugData
                );

                $media->file_path = Storage::disk('s3')->url($s3Path);
                $media->file_type = $fileType;
                $media->file_size = $file->getSize();
                $media->type = 'file';
                $media->is_cloud = true;
            } else {
                $processedFile = $this->imageOptimizationService->processUploadedFileObject(
                    $file,
                    $event->id
                );

                $media->file_path = $processedFile['url'];
                $media->file_type = $processedFile['file_type'];
                $media->file_size = $processedFile['file_size'];
                $media->type = 'file';
                $media->is_cloud = true;
            }
        } else {
            $media->file_path = null;
            $media->file_type = 'text/plain';
            $media->file_size = null;
            $media->text_content = $guestText;
            $media->type = 'text';
            $media->is_cloud = false;
        }

        $media->save();

        return response()->json([
            'success' => true,
            'message' => 'Kujtimi u ruajt me sukses.',
            'data' => $media->fresh(),
            'used' => $currentUploadsCount + 1,
            'limit' => $isPremium ? null : $freeUploadLimit,
            'is_premium' => $isPremium,
        ]);
    } catch (\Exception $e) {
        \Log::error('Guest media upload failed: ' . $e->getMessage());

        return response()->json([
            'success' => false,
            'message' => 'Nuk u ruajt kujtimi. Provo përsëri.',
        ], 500);
    }
}
}