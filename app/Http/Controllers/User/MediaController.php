<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;

class MediaController extends Controller
{
    public function index()
    {
        return view('user.media', ['event' => auth()->user()->events()->latest()->first()]);
    }
}
