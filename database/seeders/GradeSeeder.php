<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Grade::create([
            'id' => '12-rpl-1',
            'grade' => 12,
            'major_id' => 'rpl',
            'homeroom_teacher' => 'Pak Arif'
        ]);

        Grade::create([
            'id' => '11-rpl-1',
            'grade' => 11,
            'major_id' => 'rpl',
            'homeroom_teacher' => 'Homelander'
        ]);

        Grade::create([
            'id' => '11-rpl-2',
            'grade' => 11,
            'major_id' => 'rpl',
            'class_number' => 2,
            'homeroom_teacher' => 'Ten Hag'
        ]);

        Grade::create([
            'id' => '10-rpl-1',
            'grade' => 10,
            'major_id' => 'rpl',
            'homeroom_teacher' => 'Messi'
        ]);

        Grade::create([
            'id' => '10-tkj-1',
            'grade' => 10,
            'major_id' => 'tkj',
            'homeroom_teacher' => 'Walter White'
        ]);
    }
}
