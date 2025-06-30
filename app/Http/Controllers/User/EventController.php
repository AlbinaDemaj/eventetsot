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
        return view('user.events');
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

        $event = Event::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'event_date' => $request->event_date,
        ]);

        return redirect()->back();
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

        // Handle file upload for background
        if ($request->hasFile('background')) {
            if ($event->background) {
                Storage::delete('public/' . $event->background);
            }

            $path = $request->file('background')->store('backgrounds', 'public');

            $validated['background'] = $path;
        }

        // Clean up dynamic fields (remove empty or invalid entries)
        if (isset($validated['dynamic_fields'])) {
            $validated['dynamic_fields'] = array_filter($validated['dynamic_fields'], function($field) {
                return !empty($field['label']) && in_array($field['type'], ['text', 'email', 'tel', 'number']);
            });

            // Reset array keys to ensure proper JSON encoding
            $validated['dynamic_fields'] = array_values($validated['dynamic_fields']);
        } else {
            $validated['dynamic_fields'] = null;
        }

        // Update the event
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
        // Define the directory path based on your URL structure
        $directory = "media/{$id}";

        // Get all files from the public storage disk
        $files = Storage::disk('public')->files($directory);

        if (empty($files)) {
            return back()->with('error', 'No files found for download');
        }

        // Set the zip file name
        $zipFileName = "media-{$id}-download.zip";

        // Create the zip stream response
        return response()->streamDownload(
            function () use ($files, $id) {
                $zip = new ZipStream(
                    outputName: 'media.zip',
                    sendHttpHeaders: false // Important for Laravel response
                );

                foreach ($files as $file) {
                    // Get the relative path without the directory for cleaner zip structure
                    $relativePath = str_replace("media/{$id}/", '', $file);

                    $zip->addFileFromPath(
                        $relativePath,
                        Storage::disk('public')->path($file)
                    );
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
