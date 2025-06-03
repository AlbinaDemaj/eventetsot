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
        $event = Event::with('media')->where('code', $request->code)->first();
        return view('website.events.show', ['event' => $event]);
    }

    public function upload()
    {
        $templates = Template::get();
        return view('website.events.upload', ['templates' => $templates]);
    }

}
