<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'name' => 'Sam Dasma',
            'event_date' => now()->addMonths(6)->format('Y-m-d'),
            'is_public' => true,
            'user_id' => 1
        ]);
    }
}
