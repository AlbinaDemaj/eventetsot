<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Models\Translation;
use App\Services\TranslationService;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function index()
    {
        $translations = Translation::with('items.language')->get();
        $languages = Language::all();

        return view('admin.translations.index', compact('translations', 'languages'));
    }

    public function edit(Translation $translation)
    {
        $languages = Language::all();
        return view('admin.translations.edit', compact('translation', 'languages'));
    }

    public function update(Request $request, Translation $translation)
    {
        $data = $request->validate([
            'translations' => 'required|array',
            'translations.*' => 'nullable|string'
        ]);

        foreach ($data['translations'] as $languageCode => $value) {
            $language = Language::where('code', $languageCode)->first();

            if ($language) {
                $translation->items()->updateOrCreate(
                    ['language_id' => $language->id],
                    ['value' => $value]
                );
            }
        }

        return redirect()->route('admin.translations.index')
            ->with('success', 'Translation updated successfully');
    }

    public function create()
    {
        $languages = Language::all();
        $groups = ['frontend', 'auth', 'validation', 'emails']; // Add your groups
        return view('admin.translations.create', compact('languages', 'groups'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => 'required|string',
            'translations' => 'required|array',
            'translations.*' => 'nullable|string'
        ]);

        $this->translationService->updateOrCreateTranslation(
            $data['group'],
            $data['key'],
            $data['translations']
        );

        return redirect()->route('admin.translations.index')
            ->with('success', 'Translation created successfully');
    }
}
