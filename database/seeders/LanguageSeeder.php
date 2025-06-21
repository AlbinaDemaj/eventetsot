<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Language::create([
            'code' => 'sq',
            'name' => 'Albanian',
            'is_default' => true
        ]);

        Language::create([
            'code' => 'en',
            'name' => 'English',
            'is_default' => false
        ]);
    }
}
