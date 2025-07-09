<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['event_id', 'file_path', 'mime_type', 'is_guest', 'is_cloud'];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isImage()
    {
        return str_starts_with($this->file_type, 'image/');
    }

    public function isVideo()
    {
        return str_starts_with($this->file_type, 'video/');
    }
}
