<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $fillable = [
        'name', 'image_path', 'text_x', 'text_y',
        'max_width', 'font', 'font_size', 'font_color'
    ];

    public function getImageUrl()
    {
        return asset('storage/'.$this->image_path);
    }
}
