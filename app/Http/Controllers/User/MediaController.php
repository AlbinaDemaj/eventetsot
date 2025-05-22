<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Media;

class MediaController extends Controller
{
    public function index()
    {
        return view('user.media', ['media' => Media::where('event_id', session('selected_event_id'))->latest()->get()]);
    }
}
