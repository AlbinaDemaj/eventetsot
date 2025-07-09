<?php

namespace App\Services;

use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Drivers\Gd\Encoders\WebpEncoder;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Exception;
use Aws\S3\Exception\S3Exception;
use Spatie\ImageOptimizer\OptimizerChainFactory;

class ImageOptimizationService
{
    protected $manager;
    protected $s3;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
        $this->s3 = Storage::disk('s3')->getClient();
    }

    /**
     * Process raw image data (binary string) and upload to S3
     */
    public function processUploadedFile($fileData, $eventId, $filename)
    {
        $debugData = [
            'start_time' => microtime(true),
            'original_name' => $filename,
            'file_size' => strlen($fileData),
            'event_id' => $eventId
        ];

        $tempPath = null;
        $optimizedTempPath = null;

        try {
            // Create a temporary file for the raw image data
            $tempPath = tempnam(sys_get_temp_dir(), 'img');
            file_put_contents($tempPath, $fileData);
            $debugData['temp_path'] = $tempPath;

            // Check if the file is actually an image
            if (!$this->isImageFile($tempPath)) {
                throw new Exception("Only image files can be optimized");
            }

            // Generate optimized filename (ensure .webp extension)
            $optimizedFilename = $this->generateOptimizedFilenameFromString();
            $optimizedPath = "media/{$eventId}/{$optimizedFilename}";
            $debugData['s3_path'] = $optimizedPath;

            // Process the image to WebP format
            $optimizedTempPath = $this->processImageToTempFile($tempPath, $debugData);

            // Upload to S3 with detailed error handling
            $this->uploadToS3($optimizedTempPath, $optimizedPath, $debugData);

            return [
                'path' => $optimizedPath,
                'url' => Storage::disk('s3')->url($optimizedPath),
                'file_type' => 'image/webp',
                'file_size' => Storage::disk('s3')->size($optimizedPath),
                'is_optimized' => true
            ];

        } catch (S3Exception $e) {
            $debugData['aws_error'] = $e->getAwsErrorMessage();
            $debugData['aws_code'] = $e->getAwsErrorCode();

            throw new Exception("S3 upload failed: " . $e->getAwsErrorMessage());
        } catch (Exception $e) {
            \Log::error('Image Processing Failed', $debugData + ['error' => $e->getMessage()]);
            throw new Exception("Image processing failed: " . $e->getMessage());
        } finally {
            // Clean up temporary files
            if (!empty($tempPath) && file_exists($tempPath)) {
                unlink($tempPath);
            }
            if (!empty($optimizedTempPath) && file_exists($optimizedTempPath) && $optimizedTempPath !== $tempPath) {
                unlink($optimizedTempPath);
            }
        }
    }

    /**
     * Process an uploaded file object and upload to S3
     */
    public function processUploadedFileObject(UploadedFile $file, $eventId)
    {
        $debugData = [
            'start_time' => microtime(true),
            'original_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getClientMimeType(),
            'event_id' => $eventId
        ];

        $optimizedTempPath = null;

        try {
            if (!$this->isImageUpload($file)) {
                throw new Exception("Only image files can be optimized");
            }

            // Generate unique filename with timestamp
            $filename = $this->generateOptimizedFilenameFromUpload($file);
            $optimizedPath = "media/{$eventId}/{$filename}";
            $debugData['s3_path'] = $optimizedPath;

            // Process directly to optimized WebP
            $optimizedTempPath = $this->processImageToTempFile($file->getRealPath(), $debugData);

            // Upload to S3 with detailed error handling
            $this->uploadToS3($optimizedTempPath, $optimizedPath, $debugData);

            return [
                'path' => $optimizedPath,
                'url' => Storage::disk('s3')->url($optimizedPath),
                'file_type' => 'image/webp',
                'file_size' => Storage::disk('s3')->size($optimizedPath),
                'is_optimized' => true
            ];

        } catch (S3Exception $e) {
            $debugData['aws_error'] = $e->getAwsErrorMessage();
            $debugData['aws_code'] = $e->getAwsErrorCode();
            \Log::error('S3 Upload Failed', $debugData);
            throw new Exception("S3 upload failed: " . $e->getAwsErrorMessage());
        } catch (Exception $e) {
            \Log::error('Image Processing Failed', $debugData + ['error' => $e->getMessage()]);
            throw new Exception("Image processing failed: " . $e->getMessage());
        } finally {
            if (!empty($optimizedTempPath) && file_exists($optimizedTempPath)) {
                unlink($optimizedTempPath);
            }
        }
    }

    protected function generateOptimizedFilenameFromString(): string
    {
        return time() . '_' . uniqid() . '.webp';
    }

    protected function generateOptimizedFilenameFromUpload(UploadedFile $file): string
    {
        return time() . '_' . uniqid() . '.webp';
    }

    protected function processImageToTempFile(string $inputPath, array &$debugData): string
    {
        $tempPath = tempnam(sys_get_temp_dir(), 's3upload');
        $debugData['temp_path'] = $tempPath;

        $this->optimizeAndConvertToWebP(
            $inputPath,
            $tempPath,
            quality: 50,
            maxWidth: 1200,
            maxHeight: 1200
        );

        if (!file_exists($tempPath) || filesize($tempPath) === 0) {
            throw new Exception("Failed to create optimized image file");
        }

        $debugData['optimized_size'] = filesize($tempPath);
        return $tempPath;
    }

    protected function uploadToS3(string $tempFile, string $s3Path, array &$debugData): void
    {
        $debugData['upload_start'] = microtime(true);

        try {
            $result = $this->s3->putObject([
                'Bucket' => config('filesystems.disks.s3.bucket'),
                'Key' => $s3Path,
                'Body' => fopen($tempFile, 'rb'),
                'ContentType' => 'image/webp',
                'CacheControl' => 'max-age=31536000, public'
            ]);

            $debugData['upload_result'] = $result->toArray();
            $debugData['upload_duration'] = microtime(true) - $debugData['upload_start'];

            if (!Storage::disk('s3')->exists($s3Path)) {
                throw new Exception("Upload verification failed - file not found on S3");
            }

        } catch (S3Exception $e) {
            $debugData['aws_request_id'] = $e->getAwsRequestId();
            $debugData['aws_error_type'] = $e->getAwsErrorType();
            throw $e;
        }
    }

    public function uploadDirectToS3($fileInput, string $s3Path, string $mimeType, array &$debugData = []): void
    {
        $debugData['upload_start'] = microtime(true);

        try {
            // Handle both file paths and UploadedFile objects
            $fileStream = is_string($fileInput) ? fopen($fileInput, 'rb') : $fileInput->get();

            $result = $this->s3->putObject([
                'Bucket' => config('filesystems.disks.s3.bucket'),
                'Key' => $s3Path,
                'Body' => $fileStream,
                'ContentType' => $mimeType,
                'CacheControl' => 'max-age=31536000, public',
            ]);

            $debugData['upload_result'] = [
                'etag' => $result['ETag'],
                'url' => $result['ObjectURL'] ?? Storage::disk('s3')->url($s3Path),
                'file_size' => is_string($fileInput) ? filesize($fileInput) : $fileInput->getSize()
            ];

        } catch (\Exception $e) {
            $debugData['upload_error'] = [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
                'trace' => $e->getTraceAsString()
            ];
            throw $e;
        } finally {
            $debugData['upload_duration'] = microtime(true) - $debugData['upload_start'];
            if (is_resource($fileStream)) {
                fclose($fileStream);
            }
        }
    }

    protected function optimizeAndConvertToWebP(
        string $inputPath,
        string $outputPath,
        int $quality = 50,
        int $maxWidth = 1920,
        int $maxHeight = 1080
    ): void {
        $image = $this->manager->read($inputPath);

        // Calculate new dimensions
        $newDimensions = $this->calculateDimensions(
            $image->width(),
            $image->height(),
            $maxWidth,
            $maxHeight
        );

        // Resize if needed
        if ($newDimensions['width'] < $image->width() || $newDimensions['height'] < $image->height()) {
            $image->resize(
                width: $newDimensions['width'],
                height: $newDimensions['height']
            );
        }

        // Convert to WebP
        $image->encode(new WebpEncoder(quality: $quality));
        $image->save($outputPath);

        // Additional optimization with spatie/image-optimizer
        try {
            $optimizerChain = OptimizerChainFactory::create();
            $optimizerChain->optimize($outputPath);

        } catch (\Exception $e) {
            \Log::error("Image optimization failed: " . $e->getMessage());
        }
    }

    protected function calculateDimensions($originalWidth, $originalHeight, $maxWidth, $maxHeight): array
    {
        $ratio = min($maxWidth / $originalWidth, $maxHeight / $originalHeight, 1);
        return [
            'width' => round($originalWidth * $ratio),
            'height' => round($originalHeight * $ratio)
        ];
    }

    protected function isImageFile(string $filePath): bool
    {
        try {
            $mime = mime_content_type($filePath);
            return str_starts_with($mime, 'image/');
        } catch (Exception $e) {
            return false;
        }
    }

    protected function isImageUpload(UploadedFile $file): bool
    {
        return str_starts_with($file->getClientMimeType(), 'image/');
    }
}
