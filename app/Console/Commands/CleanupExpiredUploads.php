<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CleanupExpiredUploads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cleanup-expired-uploads';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::with('activeSubscription.plan')->get();

        foreach ($users as $user) {
            if (!$user->activeSubscription) continue;

            $storageDays = getStorageDays($user);
            $expiryDate = now()->subDays($storageDays);

            $user->uploads()
                ->where('created_at', '<', $expiryDate)
                ->delete();
        }

        $this->info('Expired uploads cleaned successfully');
    }
}
