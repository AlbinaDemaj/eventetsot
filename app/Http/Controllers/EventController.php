<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Template;
use Illuminate\Http\Request;

class EventController extends Controller
{
    private function ensureEventIsActive(Event $event): void
    {
        $event->loadMissing('user');

        // Nëse përdoruesi ka Premium aktiv,
        // eventi hapet pavarësisht skadimit të mëparshëm
        if ($event->user?->hasActivePremium()) {
            return;
        }

        if ($event->expires_at && $event->expires_at->isPast()) {
            abort(403, 'Ky event ka skaduar.');
        }
    }

    private function attachPremiumData(Event $event): Event
    {
        $event->is_premium = $event->user?->hasActivePremium() ?? false;
        $event->premium_until = $event->user?->premium_until;

        return $event;
    }

    public function welcome(Request $request)
    {
        $event = Event::with([
            'media',
            'user.activeSubscription.plan',
        ])
            ->where('code', $request->code)
            ->firstOrFail();

        $this->ensureEventIsActive($event);
        $this->attachPremiumData($event);

        return view('website.events.react-welcome', [
            'event' => $event,
        ]);
    }

    public function show(Request $request)
    {
        $event = Event::with([
            'media',
            'user.activeSubscription.plan',
        ])
            ->where('code', $request->code)
            ->firstOrFail();

        $this->ensureEventIsActive($event);
        $this->attachPremiumData($event);

        return view('website.events.react-show', [
            'event' => $event,
        ]);
    }

    public function loadMoreMedia(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $this->ensureEventIsActive($event);

        $page = $request->get('page', 1);

        $media = $event->media()
            ->latest()
            ->paginate(8, ['*'], 'page', $page);

        return response()->json([
            'media' => $media->items(),
            'hasMore' => $media->hasMorePages(),
            'currentPage' => $media->currentPage(),
            'lastPage' => $media->lastPage(),
        ]);
    }

    public function upload(Request $request)
    {
        $event = Event::with([
            'media',
            'user.activeSubscription.plan',
        ])
            ->where('code', $request->code)
            ->firstOrFail();

        $this->ensureEventIsActive($event);
        $this->attachPremiumData($event);

        $templates = Template::get();

        return view('website.events.react-upload', [
            'event' => $event,
            'templates' => $templates,
        ]);
    }
}