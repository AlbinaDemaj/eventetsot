<?php

namespace App\Services;

use Intervention\Image\Drivers\Gd\Encoders\PngEncoder;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageGeneratorService
{
    protected $imageManager;
    protected $lineHeightMultiplier = 1.5;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * Generate an image from text with smart wrapping and sizing
     */
    public function createTextImage(
        string $text,
        string $backgroundImagePath,
        string $fontColor = '#000000',
        string $fontPath = null,
        int $minFontSize = 18,
        int $maxFontSize = 120,
        float $widthRatio = 0.9,
        float $heightRatio = 0.9,
        int $maxLines = 6
    ) {
        $backgroundImagePath = public_path('website/img/templates/'.$backgroundImagePath);
        $image = $this->imageManager->read($backgroundImagePath);
        $width = $image->width();
        $height = $image->height();
        $fontPath = $fontPath ?? public_path('website/fonts/ARIAL.TTF');

        // First determine if we need line wrapping
        $needsWrapping = $this->needsWrapping($text, $fontPath, $maxFontSize, $width * $widthRatio);

        if ($needsWrapping) {
            // Use smart wrapping algorithm
            $result = $this->smartTextWrapping(
                $text,
                $fontPath,
                $width * $widthRatio,
                $height * $heightRatio,
                $minFontSize,
                $maxFontSize,
                $maxLines
            );

            $text = $result['text'];
            $fontSize = $result['fontSize'];
        } else {
            // Single line text
            $fontSize = $this->calculateSingleLineSize(
                $text,
                $fontPath,
                $width * $widthRatio,
                $height * $heightRatio,
                $minFontSize,
                $maxFontSize
            );
        }

        // Final text positioning
        $textBox = $this->calculateTextBox($text, $fontPath, $fontSize);
        $x = $width / 2;
        $y = ($height / 2) - ($textBox['height'] / 2) + $textBox['ascender'];

        // Add text to image
        $image->text($text, $x, $y, function($font) use ($fontPath, $fontSize, $fontColor) {
            $font->file($fontPath);
            $font->size($fontSize);
            $font->color($fontColor);
            $font->align('center');
            $font->valign('top');
            $font->lineHeight($this->lineHeightMultiplier);
        });

        return  $image->encode(new PngEncoder());
    }

    /**
     * Determine if text needs wrapping
     */
    protected function needsWrapping($text, $fontPath, $fontSize, $maxWidth)
    {
        $box = imagettfbbox($fontSize, 0, $fontPath, $text);
        return (abs($box[2] - $box[0]) > $maxWidth) || (str_word_count($text) > 5);
    }

    /**
     * Smart text wrapping algorithm
     */
    protected function smartTextWrapping(
        $text,
        $fontPath,
        $maxWidth,
        $maxHeight,
        $minSize,
        $maxSize,
        $maxLines
    ) {
        $words = explode(' ', $text);
        $bestConfig = ['text' => $text, 'fontSize' => $minSize];
        $optimalSize = $minSize;

        // Binary search for best font size
        $low = $minSize;
        $high = $maxSize;

        while ($low <= $high) {
            $mid = (int)(($low + $high) / 2);
            $wrapped = $this->wrapTextToSize($words, $fontPath, $mid, $maxWidth, $maxLines);

            if ($wrapped['lineCount'] <= $maxLines) {
                $textBox = $this->calculateTextBox($wrapped['text'], $fontPath, $mid);

                if ($textBox['height'] <= $maxHeight) {
                    $optimalSize = $mid;
                    $bestConfig = ['text' => $wrapped['text'], 'fontSize' => $mid];
                    $low = $mid + 1;
                    continue;
                }
            }
            $high = $mid - 1;
        }

        // If we didn't find a good fit, use the best we have with reduced size
        if ($optimalSize === $minSize) {
            $bestConfig['fontSize'] = max(
                $minSize,
                min($maxSize, $maxHeight / ($maxLines * 2))
            );
        }

        return $bestConfig;
    }

    /**
     * Wrap text to specific width and font size
     */
    protected function wrapTextToSize($words, $fontPath, $fontSize, $maxWidth, $maxLines)
    {
        $lines = [''];
        $currentLine = 0;

        foreach ($words as $word) {
            $testLine = $lines[$currentLine] . ' ' . $word;
            $testLine = ltrim($testLine);
            $testWidth = $this->calculateTextWidth($testLine, $fontPath, $fontSize);

            if ($testWidth <= $maxWidth && $currentLine < $maxLines) {
                $lines[$currentLine] = $testLine;
            } else {
                if (++$currentLine >= $maxLines) {
                    break;
                }
                $lines[$currentLine] = $word;
            }
        }

        return [
            'text' => implode("\n", $lines),
            'lineCount' => count($lines)
        ];
    }

    /**
     * Calculate single line font size
     */
    protected function calculateSingleLineSize($text, $fontPath, $maxWidth, $maxHeight, $minSize, $maxSize)
    {
        $box = imagettfbbox($maxSize, 0, $fontPath, $text);
        $width = abs($box[2] - $box[0]);
        $height = abs($box[7] - $box[1]);

        if ($width <= $maxWidth && $height <= $maxHeight) {
            return $maxSize;
        }

        return min(
            $maxSize,
            max(
                $minSize,
                min(
                    $maxWidth / $width * $maxSize * 0.9,
                    $maxHeight / $height * $maxSize * 0.9
                )
            )
        );
    }

    /**
     * Calculate text dimensions including multi-line support
     */
    protected function calculateTextBox($text, $fontPath, $fontSize)
    {
        $lines = explode("\n", $text);
        $maxWidth = 0;
        $totalHeight = 0;
        $ascender = 0;
        $descender = 0;

        foreach ($lines as $line) {
            $box = imagettfbbox($fontSize, 0, $fontPath, $line);
            $maxWidth = max($maxWidth, abs($box[2] - $box[0]));
            $lineHeight = abs($box[7] - $box[1]);
            $totalHeight += $lineHeight;
            $ascender = max($ascender, abs($box[1]));
            $descender = max($descender, abs($box[7]));
        }

        // Add line spacing
        $totalHeight += (count($lines) - 1) * $fontSize * ($this->lineHeightMultiplier - 1);

        return [
            'width' => $maxWidth,
            'height' => $totalHeight,
            'ascender' => $ascender,
            'descender' => $descender
        ];
    }

    /**
     * Calculate width of text
     */
    protected function calculateTextWidth($text, $fontPath, $fontSize)
    {
        $box = imagettfbbox($fontSize, 0, $fontPath, $text);
        return abs($box[2] - $box[0]);
    }

    public function saveImage($image, $eventId, $format = 'jpg', $quality = 90)
    {
        $filename = 'text_image_' . time() . '.' . $format;
        $path = "media/{$eventId}/{$filename}";
        $image->toPng()->save(storage_path("app/public/{$path}"));
        return $path;
    }
}
