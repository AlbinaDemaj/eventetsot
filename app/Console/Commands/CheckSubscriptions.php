<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\SubscriptionService;

class CheckSubscriptions extends Command
{
    protected $signature = 'subscriptions:check';
    protected $description = 'Check and process expired subscriptions';

    public function __construct(
        protected SubscriptionService $subscriptionService
    ) {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Checking for expired subscriptions...');
        $this->subscriptionService->renewExpiredSubscriptions();
        $this->info('Subscription check completed.');
    }
}
