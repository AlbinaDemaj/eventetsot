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
        // Validate the request
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.type' => 'required|in:file,text',
            'items.*.file' => 'required_if:items.*.type,file|file|mimetypes:image/*,video/*',
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
                $file = $item['file'];
                $fileType = $file->getMimeType();
                $isVideo = strpos($fileType, 'video/') === 0;

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
                            'updated_at' => now()
                        ];
                    } else {
                        // Handle image upload with optimization
                        $processedFile = $this->imageOptimizationService->processUploadedFileObject(
                            $file,
                            $event->id,
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
                            'updated_at' => now()
                        ];
                    }
                } catch (\Exception $e) {
                    \Log::error('File upload failed: ' . $e->getMessage());
                }
            } elseif ($item['type'] === 'text') {
                // Handle text post with image generation and optimization
                $textToImageService = new ImageGeneratorService();
                $filename = basename(parse_url($item['backgroundImage'], PHP_URL_PATH));

                try {
                    // Generate the image
                    $image = $textToImageService->createTextImage(
                        $item['textContent'],
                        $filename,
                        $item['fontColor']
                    );

                    $processedImage = $this->imageOptimizationService->processUploadedFile(
                        $image,
                        $event->id,
                        time() . '_' . uniqid() . '.png',
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
                        'updated_at' => now()
                    ];

                } catch (\Exception $e) {
                    \Log::error('Text image generation/optimization failed: ' . $e->getMessage());
                }
            }
        }

        $event->media()->insert($uploadedItems);

        return response()->json([
            'success' => true,
            'message' => 'Content uploaded successfully!',
            'count' => count($uploadedItems)
        ]);
    }

    public function mediaComment(Request $request) {
        $relativePath = str_replace(asset('storage'), '', $request->image);
        $relativePath = ltrim($relativePath, '/');

        $media = Media::where('file_path', $relativePath)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $media
        ]);
    }
}
