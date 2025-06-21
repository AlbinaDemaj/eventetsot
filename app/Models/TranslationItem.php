<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TranslationItem extends Model
{
    protected $fillable = ['translation_id', 'language_id', 'value'];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }

    public function translation()
    {
        return $this->belongsTo(Translation::class);
    }
}
