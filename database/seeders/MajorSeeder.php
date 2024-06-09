<?php

namespace Database\Seeders;

use App\Models\Major;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;
use Illuminate\Support\Str;

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Major::create([
            'id' => 'rpl',
            'name' => 'Rekayasa Perangkat Lunak',
            'abbreviation' => 'RPL',
            'head_of_program' => Factory::create()->name()
        ]);

        Major::create([
            'id' => 'tkj',
            'name' => 'Teknik Komputer Jaringan',
            'abbreviation' => 'TKJ',
            'head_of_program' => Factory::create()->name()
        ]);

        Major::create([
            'id' => 'otkp',
            'name' => 'Otomatisasi Tata Kelola Perkantoran',
            'abbreviation' => 'OTKP',
            'head_of_program' => Factory::create()->name()
        ]);

        Major::create([
            'id' => 'akl',
            'name' => 'Akutansi dan Keuangan Lembaga',
            'abbreviation' => 'AKL',
            'head_of_program' => Factory::create()->name()
        ]);

        Major::create([
            'id' => 'anm',
            'name' => 'Animasi',
            'abbreviation' => 'ANM',
            'head_of_program' => Factory::create()->name()
        ]);

        Major::create([
            'id' => 'pspt',
            'name' => 'Produksi dan Siaran Program Televisi',
            'abbreviation' => 'PSPT',
            'head_of_program' => Factory::create()->name()
        ]);
    }
}
