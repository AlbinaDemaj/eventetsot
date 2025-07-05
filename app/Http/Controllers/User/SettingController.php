<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SettingController extends Controller
{
    public function index()
    {
        return view('user.settings', ['event' => null]);
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

    public function updateCode(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:events,code,'.$request->id,
        ]);

        $event = Event::findOrFail($request->id);

        $event->code = $request->code;

        $url = url('/events/' . $event->code);
        $qrCode = base64_encode(
            QrCode::format('png')->size(200)->generate($url)
        );

        $event->qr_code = 'data:image/png;base64,' . $qrCode;

        $event->save();

        return redirect()->back();
    }

}
