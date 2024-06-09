<?php

namespace Database\Seeders;

use App\Models\AuthEndpoint;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthEndpointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AuthEndpoint::create([
            'endpoint' => 'admin'
        ]);
    }
}
