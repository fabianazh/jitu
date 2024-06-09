<?php

namespace Database\Seeders;

use App\Models\ViolationForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class ViolationFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ViolationForm::create([
            'id' => '3618de7f-1ef0-3b3c-bd7d-da8080a',
            'violation_category_id' => '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            'description' => 'Terlambat datang ke sekolah',
            'weight' => 5
        ]);

        ViolationForm::create([
            'id' => '3618dde7f-1ef0w-3b3c-bd7dd-66asdaw',
            'violation_category_id' => '2618de7f-1ef0-3bsa3c-bd7d-8sd98ad4',
            'description' => 'Merokok di area sekolah',
            'weight' => 10
        ]);

        ViolationForm::create([
            'id' => '90dsadh-dasd9ask9-casc0900-d9',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Mengonsumsi obat-obatan terlarang',
            'weight' => 20
        ]);

        ViolationForm::create([
            'id' => 'iasdjas-09dn-sd9daj9-as9d9ajsd',
            'violation_category_id' => '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            'description' => 'Tidak membawa buku pelajaran',
            'weight' => 3
        ]);

        ViolationForm::create([
            'id' => 'd0as0asdj-asc08nc-dasda0s-9asdas',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Marah kecil',
            'weight' => 30
        ]);

        ViolationForm::create([
            'id' => 'd0as0asdj-ad08nc-dadaas-dasdas',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Marah sedeng',
            'weight' => 30
        ]);

        ViolationForm::create([
            'id' => 'd0as0dj-ad08dc-daddas-dsaddas',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Marah besar',
            'weight' => 30
        ]);

        ViolationForm::create([
            'id' => '76a8s7d6-asd89as7d-89asd67-18',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Menyontek saat ujian',
            'weight' => 25
        ]);

        ViolationForm::create([
            'id' => '65as8d76-8asd76a5-0asd765-19',
            'violation_category_id' => '1618de7f-1ef0-3b3c-bd7d-8dnsiad80',
            'description' => 'Tidak mengikuti aturan seragam',
            'weight' => 8
        ]);

        ViolationForm::create([
            'id' => '54as65d4-76asd54a-98sd7a-20',
            'violation_category_id' => '3618de7f-1ef0-3b3c-bd7d-6a6f6adasdaw',
            'description' => 'Mengganggu kelas',
            'weight' => 15
        ]);

        ViolationForm::create([
            'id' => '32as43d2-54asd32a-76sd5a-22',
            'violation_category_id' => '2618de7f-1ef0-3bsa3c-bd7d-8sd98ad4',
            'description' => 'Menggunakan bahasa kasar di sekolah',
            'weight' => 12
        ]);
    }
}
