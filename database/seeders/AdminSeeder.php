<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'id' => 213,
            'name' => 'Kesiswaan SMK Pasim',
            'username' => 'admin213',
            'password' => bcrypt(213)
        ]);
    }
}
