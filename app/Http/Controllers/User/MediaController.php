<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index()
    {
        return view('user.media', ['media' => Media::where('event_id', session('selected_event_id'))->latest()->get()]);
    }

    public function destroy(Request $request)
    {
        $media = Media::find($request->id);
        Storage::disk('public')->delete($media->file_path);
        $media->delete();

        return back()->with('success', 'Media deleted successfully!');
    }
}
