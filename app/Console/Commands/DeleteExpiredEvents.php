<?php

namespace App\Console\Commands;

use App\Models\Event;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteExpiredEvents extends Command
{
    protected $signature = 'events:delete-expired';

    protected $description = 'Fshin automatikisht eventet e skaduara dhe mediat e tyre';

    public function handle()
    {
        $events = Event::whereNotNull('expires_at')
            ->where('expires_at', '<', now())
            ->with('media')
            ->get();

        foreach ($events as $event) {
            foreach ($event->media as $media) {
                $media->delete();
            }

            $event->delete();
        }

        $this->info("U fshinë {$events->count()} evente të skaduara.");

        return Command::SUCCESS;
    }
}