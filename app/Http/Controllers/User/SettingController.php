<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return view('user.settings', []);
    }

    public function saveSettings(Request $request)
    {
        $request->validate([
            'field' => 'required|in:name,event_date,logo,locale,note',
        ]);

        $event = Event::findOrFail(session('selected_event_id'));

        if ($request->field === 'logo') {
            $request->validate([
                'value' => 'required|file|image'
            ]);

            $path = $request->file('value')->store('logos', 'public');
            $event->logo = '/storage/' . $path;
        } else {
            $request->validate([
                'value' => 'required|string|max:255'
            ]);

            $value = $request->field === 'event_date'
                ? \Carbon\Carbon::parse($request->value)->format('Y-m-d')
                : $request->value;

            $event->{$request->field} = $value;
        }

        $event->save();

        return response()->json(['success' => true]);
    }

}
