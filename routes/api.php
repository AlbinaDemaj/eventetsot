<?php

use Illuminate\Support\Facades\Route;
use App\Models\Event;

Route::get('/test-react', function () {
    return response()->json([
        'message' => 'React connected successfully'
    ]);
});

Route::get('/events', function () {
    return response()->json(
        Event::latest()->take(6)->get()
    );
});