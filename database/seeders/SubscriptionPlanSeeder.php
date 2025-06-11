<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    public function run()
    {
        SubscriptionPlan::create([
            'name' => 'Falas',
            'slug' => 'free',
            'price' => 0,
            'currency' => 'EUR',
            'billing_cycle_days' => 0,
            'features' => [
                'Deri në 20 ngarkime fotosh dhe videosh',
                'Të ftuar dhe pjesëmarrës të pakufizuar',
                'Ngarkimet ruhen për 7 ditë',
                'Opsione bazë për personalizim',
                'Aktive për 3 orë nga data e eventit',
                'Të gjitha ngarkimet ruhen në cilësi të mirë'
            ],
            'limits' => [
                'max_uploads' => 20,
                'storage_days' => 7,
                'active_hours' => 3,
            ]
        ]);

        SubscriptionPlan::create([
            'name' => 'Plus',
            'slug' => 'plus',
            'price' => 100,
            'currency' => 'EUR',
            'billing_cycle_days' => 180,
            'features' => [
                'Ngarkime të pakufizuara të fotove dhe videove',
                'Të ftuar dhe pjesëmarrës të pakufizuar',
                'Ngarkimet ruhën për 6 muaj',
                'Opsione të avancuara për personalizim',
                'Aktive për 30 ditë nga data e eventit',
                'Të gjitha ngarkimet ruhën në cilësi të lartë',
                'Shkarkoni të gjitha fotot dhe videot menjëherë'
            ],
            'limits' => [
                'max_uploads' => null,
                'storage_days' => 180,
                'active_days' => 30,
                'instant_download' => true
            ]
        ]);
    }
}
