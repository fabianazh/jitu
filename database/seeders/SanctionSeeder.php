<?php

namespace Database\Seeders;

use App\Models\Sanction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class SanctionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sanction::create([
            'id' => 'asn9sac8na-as8ca8nsc-a8scnasi',
            'criteria' => 'Pelanggaran ringan 1 - 5 poin.',
            'weight_from' => 1,
            'weight_to' => 5,
            'sanction' => 'Peringatan lisan.',
        ]);

        Sanction::create([
            'id' => 'xasnx98-ans0as0cas-acns08-ascsi',
            'criteria' => 'Pelanggaran sedang 6 - 10 poin.',
            'weight_from' => 6,
            'weight_to' => 10,
            'sanction' => 'Pengurangan nilai sikap.',
        ]);

        Sanction::create([
            'id' => 'ans0d-asd9nasd-as8dbasd-dasas',
            'criteria' => 'Pelanggaran berat 11 - 15 poin.',
            'weight_from' => 11,
            'weight_to' => 15,
            'sanction' => 'Pemanggilan orang tua.',
        ]);

        Sanction::create([
            'id' => 'cna0sinc-a0sncnaisc-a9sdnaid-sad',
            'criteria' => 'Pelanggaran serius 16 - 30 poin.',
            'weight_from' => 16,
            'weight_to' => 30,
            'sanction' => 'Pemberhentian sementara.',
        ]);
    }
}

