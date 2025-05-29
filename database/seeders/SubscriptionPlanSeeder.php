<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    public function run()
    {
        SubscriptionPlan::create([
            'name' => 'Plus',
            'slug' => 'plust',
            'description' => 'Ideale për dasma të mëdha, konferenca, koncerte, festa dhe eventet publike.',
            'price' => 100,
            'currency' => 'EUR',
            'billing_cycle_days' => 182,
            'features' => [
                'Ngarkime të pakufizuara të fotove dhe videove',
                'Të ftuar dhe pjesëmarrës të pakufizuar',
                'Ngarkimet ruhën për 6 muaj',
                'Opsione të avancuara për personalizim',
                'Aktive për 30 ditë nga data e eventit',
                'Të gjitha ngarkimet ruhën në cilësi të lartë',
                'Shkarkoni të gjitha fotot dhe videot menjëherë'
            ]
        ]);
    }
}
