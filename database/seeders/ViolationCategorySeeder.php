<?php

namespace Database\Seeders;

use App\Models\ViolationCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ViolationCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ViolationCategory::create([
            'id' => '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            'category' => 'Ringan'
        ]);

        ViolationCategory::create([
            'id' => '2618de7f-1ef0-3bsa3c-bd7d-8sd98ad4',
            'category' => 'Sedang'
        ]);

        ViolationCategory::create([
            'id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'category' => 'Berat'
        ]);
    }
}
