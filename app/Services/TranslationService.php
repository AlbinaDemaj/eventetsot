<?php

namespace App\Services;

use App\Models\Language;
use App\Models\Translation;

class TranslationService
{
    public function get($group, $key, $replace = [], $locale = null)
    {
        $locale = $locale ?: app()->getLocale();

        $translation = Translation::where('group', $group)
            ->where('key', $key)
            ->first();

        if (!$translation) {
            return $key;
        }

        $value = $translation->getTranslation($locale);

        if (empty($value)) {
            // Fallback to default language
            $defaultLanguage = Language::where('is_default', true)->first();
            if ($defaultLanguage && $defaultLanguage->code != $locale) {
                $value = $translation->getTranslation($defaultLanguage->code);
            }

            if (empty($value)) {
                return $key;
            }
        }

        foreach ($replace as $k => $v) {
            $value = str_replace(":$k", $v, $value);
        }

        return $value;
    }

    public function updateOrCreateTranslation($group, $key, $translations)
    {
        $translation = Translation::firstOrCreate([
            'group' => $group,
            'key' => $key
        ]);

        foreach ($translations as $languageCode => $value) {
            $language = Language::where('code', $languageCode)->first();

            if ($language) {
                $translation->items()->updateOrCreate(
                    ['language_id' => $language->id],
                    ['value' => $value]
                );
            }
        }

        return $translation;
    }
}
