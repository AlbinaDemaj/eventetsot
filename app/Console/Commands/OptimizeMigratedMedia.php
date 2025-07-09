<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageOptimizationService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Helper\ProgressBar;

class OptimizeMigratedMedia extends Command
{
    protected $signature = 'media:optimize-migrated
                          {--event-id= : Optimize media for specific event}
                          {--limit= : Number of items to process (default: all)}
                          {--report : Generate detailed optimization report}';

    protected $description = 'Optimize already migrated media files in S3 with progress tracking';

    protected $imageOptimizationService;
    protected $reportData = [];

    public function __construct(ImageOptimizationService $imageOptimizationService)
    {
        parent::__construct();
        $this->imageOptimizationService = $imageOptimizationService;
    }

    public function handle()
    {
        $query = Media::where('is_cloud', true)
            ->where('file_type', 'like', 'image/%')
            ->orderBy('event_id');

        if ($this->option('event-id')) {
            $query->where('event_id', $this->option('event-id'));
        }

        $totalItems = $query->count();
        $this->info("Starting optimization for {$totalItems} media files...");

        // Initialize progress bar
        $progressBar = $this->output->createProgressBar($totalItems);
        $progressBar->setFormat("%current%/%max% [%bar%] %percent:3s%% %message%");
        $progressBar->setMessage('Starting...');
        $progressBar->start();

        $query->chunkById($this->option('limit') ?? 100, function ($mediaItems) use ($progressBar) {
            foreach ($mediaItems as $media) {
                try {
                    $progressBar->setMessage("Processing ID: {$media->id}");
                    $result = $this->processMediaItem($media);

                    if ($this->option('report')) {
                        $this->reportData[] = $result;
                    }

                    $progressBar->advance();
                } catch (Exception $e) {
                    Log::error("Optimization failed for media ID: {$media->id} - " . $e->getMessage());
                    $progressBar->setMessage("<error>Failed ID: {$media->id}</error>");
                }
            }
        });

        $progressBar->finish();
        $this->newLine(2);
        $this->info("Optimization completed!");

        // Display summary report
        if ($this->option('report')) {
            $this->displayOptimizationReport();
        }
    }

    protected function processMediaItem(Media $media): array
    {
        $s3Path = ltrim(parse_url($media->file_path, PHP_URL_PATH), '/');
        $tempDir = storage_path('app/temp-optimize/');

        if (!File::exists($tempDir)) {
            File::makeDirectory($tempDir);
        }

        $tempFile = $tempDir . basename($s3Path);
        $originalSize = Storage::disk('s3')->size($s3Path);

        try {
            // Download from S3
            Storage::disk('s3')->get($s3Path, $tempFile);

            // Process optimization
            $file = new \Illuminate\Http\UploadedFile(
                $tempFile,
                basename($s3Path),
                mime_content_type($tempFile),
                null,
                true
            );

            $processedFile = $this->imageOptimizationService->processUploadedFileObject(
                $file,
                $media->event_id
            );

            $newPath = ltrim(parse_url($processedFile['url'], PHP_URL_PATH), '/');
            $newSize = Storage::disk('s3')->size($newPath);
            $savedBytes = $originalSize - $newSize;
            $savedPercent = round(($savedBytes / $originalSize) * 100, 2);

            // Update record if changed
            if ($processedFile['url'] !== $media->file_path) {
                Storage::disk('s3')->delete($s3Path);
                $media->update([
                    'file_path' => $processedFile['url'],
                    'file_size' => $newSize
                ]);
            }

            return [
                'id' => $media->id,
                'event_id' => $media->event_id,
                'original_size' => $originalSize,
                'optimized_size' => $newSize,
                'saved_bytes' => $savedBytes,
                'saved_percent' => $savedPercent,
                'original_path' => $s3Path,
                'new_path' => $newPath,
                'status' => 'optimized'
            ];

        } catch (Exception $e) {
            return [
                'id' => $media->id,
                'event_id' => $media->event_id,
                'status' => 'failed',
                'error' => $e->getMessage()
            ];
        } finally {
            if (file_exists($tempFile)) {
                unlink($tempFile);
            }
        }
    }

    protected function displayOptimizationReport()
    {
        $totalOriginal = collect($this->reportData)->sum('original_size');
        $totalOptimized = collect($this->reportData)->sum('optimized_size');
        $totalSaved = $totalOriginal - $totalOptimized;
        $successCount = collect($this->reportData)->where('status', 'optimized')->count();
        $failedCount = collect($this->reportData)->where('status', 'failed')->count();

        $this->info("\nOptimization Report Summary:");
        $this->table([], [
            ['Total Files Processed', count($this->reportData)],
            ['Successfully Optimized', $successCount],
            ['Failed Optimizations', $failedCount],
            ['Total Original Size', $this->formatBytes($totalOriginal)],
            ['Total Optimized Size', $this->formatBytes($totalOptimized)],
            ['Total Space Saved', $this->formatBytes($totalSaved)],
        ]);

        $this->info("\nTop 10 Best Optimizations:");
        $topOptimized = collect($this->reportData)
            ->where('status', 'optimized')
            ->sortByDesc('saved_percent')
            ->take(10);

        $this->table([
            'Media ID',
            'Event ID',
            'Original Size',
            'Optimized Size',
            'Saved %'
        ], $topOptimized->map(function ($item) {
            return [
                $item['id'],
                $item['event_id'],
                $this->formatBytes($item['original_size']),
                $this->formatBytes($item['optimized_size']),
                $item['saved_percent'] . '%'
            ];
        }));

        if ($failedCount > 0) {
            $this->error("\nFailed Optimizations:");
            $this->table([
                'Media ID',
                'Event ID',
                'Error'
            ], collect($this->reportData)
                ->where('status', 'failed')
                ->map(function ($item) {
                    return [
                        $item['id'],
                        $item['event_id'],
                        substr($item['error'], 0, 50) . '...'
                    ];
                }));
        }
    }

    protected function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        return round($bytes / (1024 ** $pow), $precision) . ' ' . $units[$pow];
    }
}
