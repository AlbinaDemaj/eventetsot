<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZipStream\ZipStream;

class EventController extends Controller
{
    public function index()
    {
        $events = auth()->user()->events()->latest()->get();
        $selectedEventId = session('selected_event_id');

        $selectedEvent = $events->firstWhere('id', $selectedEventId) ?? $events->first();

        return view('user.panel', [
            'page' => 'events',
            'events' => $events,
            'selectedEvent' => $selectedEvent,
            'extra' => [],
        ]);
    }

    public function switchEvent(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);

        $event = auth()->user()->events()->findOrFail($request->event_id);

        session(['selected_event_id' => $event->id]);

        return back();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_date' => 'required|date',
            'name' => 'required|string',
        ]);

        Event::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'event_date' => $request->event_date,
        ]);

        return redirect()->route('user.events');
    }

    public function update(Request $request, Event $event)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'font' => 'nullable|string',
            'button_text' => 'nullable|string|max:50',
            'is_animated' => 'boolean',
            'background' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];

        if ($request->has('dynamic_fields')) {
            $rules['dynamic_fields'] = 'nullable|array';
            $rules['dynamic_fields.*.label'] = 'required|string|max:255';
            $rules['dynamic_fields.*.type'] = 'required|in:text,email,tel,number';
            $rules['dynamic_fields.*.required'] = 'boolean';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('background')) {
            if ($event->background) {
                Storage::delete('public/' . $event->background);
            }

            $path = $request->file('background')->store('backgrounds', 'public');
            $validated['background'] = $path;
        }

        if (isset($validated['dynamic_fields'])) {
            $validated['dynamic_fields'] = array_filter($validated['dynamic_fields'], function ($field) {
                return !empty($field['label']) && in_array($field['type'], ['text', 'email', 'tel', 'number']);
            });

            $validated['dynamic_fields'] = array_values($validated['dynamic_fields']);
        } else {
            $validated['dynamic_fields'] = null;
        }

        $event->update([
            'name' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'font' => $validated['font'] ?? null,
            'button_text' => $validated['button_text'] ?? 'Continue',
            'is_animated' => $validated['is_animated'] ?? false,
            'background' => $validated['background'] ?? $event->background,
            'dynamic_fields' => $validated['dynamic_fields'] ?? null,
        ]);

        return redirect()->back()->with([
            'success' => 'Welcome screen updated successfully!',
            'event' => $event
        ]);
    }

    public function downloadMedia($id)
    {
        $directory = "media/{$id}/";
        $zipFileName = "media-{$id}-directory.zip";

        if (!Storage::disk('s3')->exists($directory)) {
            return back()->with('error', 'Directory not found');
        }

        $files = Storage::disk('s3')->allFiles($directory);

        if (empty($files)) {
            return back()->with('error', 'No files found in directory');
        }

        return response()->streamDownload(
            function () use ($files, $directory) {
                $zip = new ZipStream(
                    outputName: 'media-directory.zip',
                    sendHttpHeaders: false,
                    enableZip64: true
                );

                foreach ($files as $file) {
                    $relativePath = str_replace($directory, '', $file);
                    $stream = Storage::disk('s3')->readStream($file);
                    $zip->addFileFromStream($relativePath, $stream);

                    if (is_resource($stream)) {
                        fclose($stream);
                    }
                }

                $zip->finish();
            },
            $zipFileName,
            [
                'Content-Type' => 'application/zip',
                'Content-Disposition' => "attachment; filename={$zipFileName}",
            ]
        );
    }
}