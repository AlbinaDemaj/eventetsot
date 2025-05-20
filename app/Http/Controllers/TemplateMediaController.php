<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Template;
use App\Services\ImageGeneratorService;
use Illuminate\Http\Request;

class TemplateMediaController extends Controller
{
    protected $imageGenerator;

    public function __construct(ImageGeneratorService $imageGenerator)
    {
        $this->imageGenerator = $imageGenerator;
    }

    public function create(Event $event)
    {
        $templates = Template::all();
        return view('media.template-create', compact('event', 'templates'));
    }

    public function store(Request $request, Event $event)
    {
        $request->validate([
            'template_id' => 'required|exists:templates,id',
            'text' => 'required|string|max:255',
            'caption' => 'nullable|string|max:255'
        ]);

        $template = Template::find($request->template_id);
        $image = $this->imageGenerator->generateFromTemplate($template, $request->text);

        $path = "media/{$event->id}/".uniqid().'.png';
        $image->save(storage_path('app/public/'.$path));

        $event->media()->create([
            'user_id' => auth()->id(),
            'is_template_based' => true,
            'file_path' => $path,
            'file_type' => 'image/png',
            'file_size' => filesize(storage_path('app/public/'.$path)),
            'caption' => $request->caption,
            'template_data' => [
                'template_id' => $template->id,
                'text' => $request->text
            ]
        ]);

        return redirect()->route('events.show', $event)->with('success', 'Image created successfully!');
    }
}
