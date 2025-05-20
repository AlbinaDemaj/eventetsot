<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Template::create([
            'image_path' => 'cartoon-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#000000'
        ]);

        Template::create([
            'image_path' => 'dark-abstract-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#000000'
        ]);

        Template::create([
            'image_path' => 'emoji-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'love-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'memphis-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'pinky-sky-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'present-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'simple-black-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#000000'
        ]);

        Template::create([
            'image_path' => 'tropical-summer-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'wedding-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'white-abstract-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'white-decorations-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);

        Template::create([
            'image_path' => 'white-green-abstract-bg.jpg',
            'text_x' => 250,
            'text_y' => 200,
            'max_width' => 300,
            'font' => 'arial.ttf',
            'font_size' => 36,
            'font_color' => '#FFFFFF'
        ]);
    }
}
