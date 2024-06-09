<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Student::create([
            'nis' => 213,
            'grade_id' => '12-rpl-1',
            'name' => 'Muhammad Fabian Azhar',
            'phone' => '0895-4042-88345',
            'parents_phone' => Factory::create()->phoneNumber(),
            'address' => 'Goalpara Sukabumi, Jawa Barat.',
            'date_of_birth' => '2006-01-02',
            'gender' => 'Laki-Laki',
            'password' => bcrypt('213'),
        ]);

        Student::create([
            'nis' => 132,
            'grade_id' => '10-tkj-1',
            'name' => 'FF',
            'phone' => '0895-4042-8834',
            'parents_phone' => Factory::create()->phoneNumber(),
            'address' => 'Goalpara Sukabumi, Jawa Barat.',
            'date_of_birth' => '2006-01-02',
            'gender' => 'Laki-Laki',
            'password' => bcrypt('213'),
        ]);

        Student::create([
            'nis' => 6969,
            'grade_id' => '10-tkj-1',
            'name' => 'Jarwo',
            'phone' => Factory::create()->phoneNumber(),
            'parents_phone' => Factory::create()->phoneNumber(),
            'address' => 'Sukabumi',
            'date_of_birth' => Factory::create()->date,
            'gender' => 'Laki-Laki',
            'password' => bcrypt('213'),
        ]);

        Student::create([
            'nis' => 62,
            'grade_id' => '12-rpl-1',
            'name' => 'Owi',
            'phone' => Factory::create()->phoneNumber(),
            'parents_phone' => Factory::create()->phoneNumber(),
            'address' => 'Bhayangkara',
            'date_of_birth' => Factory::create()->date,
            'gender' => 'Perempuan',
            'password' => bcrypt('213'),
        ]);
    }
}
