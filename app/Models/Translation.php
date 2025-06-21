<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    protected $fillable = ['group', 'key'];

    public function items()
    {
        return $this->hasMany(TranslationItem::class);
    }

    public function getTranslation($languageCode)
    {
        return $this->items()->whereHas('language', function($q) use ($languageCode) {
            $q->where('code', $languageCode);
        })->value('value');
    }
}
