<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageOptimizationService;
use Exception;
use Illuminate\Support\Facades\Log;

class MigrateMediaToS3 extends Command
{
    protected $signature = 'media:migrate-to-s3
                            {--event-id= : Migrate media for a specific event}
                            {--limit= : Limit the number of events to process}';
    protected $description = 'Migrate local media to S3 cloud storage';

    protected $imageOptimizationService;

    public function __construct(ImageOptimizationService $imageOptimizationService)
    {
        parent::__construct();
        $this->imageOptimizationService = $imageOptimizationService;
    }

    public function handle()
    {
        $eventId = $this->option('event-id');
        $limit = $this->option('limit');

        $query = Event::query();

        if ($eventId) {
            $query->where('id', $eventId);
        }

        if ($limit) {
            $query->limit($limit);
        }

        $events = $query->get();

        if ($events->isEmpty()) {
            $this->error('No events found matching the criteria.');
            return;
        }

        foreach ($events as $event) {
            $this->info("Processing event ID: {$event->id}");

            // Get all media for this event that hasn't been migrated yet
            $mediaItems = Media::where('event_id', $event->id)
                ->where('is_cloud', false)
                ->get();

            if ($mediaItems->isEmpty()) {
                $this->info("No local media found for event ID: {$event->id}");
                continue;
            }

            $this->info("Found {$mediaItems->count()} media items to migrate for event ID: {$event->id}");

            foreach ($mediaItems as $media) {
                try {
                    $this->processMediaItem($media, $event);
                } catch (Exception $e) {
                    Log::error("Failed to migrate media ID: {$media->id} for event ID: {$event->id}. Error: " . $e->getMessage());
                    $this->error("Error migrating media ID: {$media->id} - " . $e->getMessage());
                    continue;
                }
            }
        }

        $this->info('Media migration process completed.');
    }

    protected function processMediaItem(Media $media, Event $event)
    {
        $this->info("Processing media ID: {$media->id}");

        // Extract the local file path from the URL
        $localPath = $this->getLocalFilePath($media->file_path, $event->id);

        if (!file_exists($localPath)) {
            throw new Exception("Local file not found at path: {$localPath}");
        }

        $isVideo = strpos($media->file_type, 'video/') === 0;
        $fileName = basename($localPath);
        $s3Path = 'media/' . $event->id . '/' . $fileName;

        if ($isVideo) {
            $this->info("Uploading video to S3: {$s3Path}");

            // For videos, upload directly to S3
            $file = new \Illuminate\Http\UploadedFile(
                $localPath,
                $fileName,
                $media->file_type,
                null,
                true
            );

            $debugData = [];
            $this->imageOptimizationService->uploadDirectToS3(
                $file,
                $s3Path,
                $media->file_type,
                $debugData
            );

            $s3Url = Storage::disk('s3')->url($s3Path);
        } else {
            $this->info("Processing and uploading image to S3: {$s3Path}");

            // For images, use the optimization service
            $file = new \Illuminate\Http\UploadedFile(
                $localPath,
                $fileName,
                $media->file_type,
                null,
                true
            );

            $processedFile = $this->imageOptimizationService->processUploadedFileObject(
                $file,
                $event->id
            );
            $s3Url = $processedFile['url'];

        }

        // Update the media record
        $path = parse_url($s3Url, PHP_URL_PATH);

        $isUpdated = $media->update([
            'file_path' => $s3Url,
            'is_cloud' => true,
            'file_size' => Storage::disk('s3')->size($path) ?? $media->file_size
        ]);

        $this->info("Successfully migrated media ID: {$media->id} to S3");
    }

    protected function getLocalFilePath(string $filePath, int $eventId): string
    {
        // If it's already a full local path, return it directly
        if (strpos($filePath, storage_path('app/public')) === 0) {
            return $filePath;
        }

        // If it's a relative path (like "media/1/filename.jpg")
        if (strpos($filePath, 'http') !== 0 && strpos($filePath, 'media/') === 0) {
            return storage_path('app/public/' . $filePath);
        }

        // If it's a URL, extract the relative path
        if (strpos($filePath, 'http') === 0) {
            $baseUrl = config('app.url') . '/storage/media/' . $eventId . '/';
            $relativePath = str_replace($baseUrl, '', $filePath);
            return storage_path('app/public/media/' . $eventId . '/' . $relativePath);
        }

        // Default case (shouldn't normally reach here)
        return storage_path('app/public/media/' . $eventId . '/' . basename($filePath));
    }
}
