<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Template;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function welcome(Request $request)
    {
        $event = Event::with('media')->where('code', $request->code)->first();
        return view('website.events.welcome', ['event' => $event]);
    }

    public function show(Request $request)
    {
        $event = Event::where('code', $request->code)->first();
        $media = $event->media()->latest()->paginate(8);

        return view('website.events.show', ['event' => $event, 'media' => $media]);
    }

    public function loadMoreMedia(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $page = $request->get('page', 1);
        $media = $event->media()->latest()->paginate(8, ['*'], 'page', $page);

        if ($request->ajax()) {
            return response()->json([
                'html' => view('website.events.media-items', compact('media'))->render(),
                'hasMore' => $media->hasMorePages(),
                'currentPage' => $media->currentPage(),
                'lastPage' => $media->lastPage()
            ]);
        }

        return redirect()->back();
    }

    public function upload()
    {
        $templates = Template::get();
        return view('website.events.upload', ['templates' => $templates]);
    }

}
