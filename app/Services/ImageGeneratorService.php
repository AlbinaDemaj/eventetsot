<?php

namespace App\Services;

use App\Models\Template;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageGeneratorService
{
    protected $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    public function generateFromTemplate(Template $template, string $text)
    {
        $image = $this->manager->read(public_path('website/img/templates/'.$template->image_path));

        $optimalSize = $this->calculateFontSize(
            $text,
            $template->max_width,
            $template->font_size,
            public_path('fonts/'.$template->font)
        );

        $image->text($text,
            $template->text_x,
            $template->text_y,
            function($font) use ($template, $optimalSize) {
                $font->file(public_path('fonts/'.$template->font));
                $font->size($optimalSize);
                $font->color($template->font_color);
                $font->align('center');
            });

        return $image;
    }

    protected function calculateFontSize($text, $maxWidth, $defaultSize, $fontPath)
    {
        $size = $defaultSize;
        do {
            $box = imagettfbbox($size, 0, $fontPath, $text);
            $textWidth = $box[2] - $box[0];
            if ($textWidth <= $maxWidth) return $size;
            $size--;
        } while ($size >= 8); // Min size 8px
        return 8;
    }
}
