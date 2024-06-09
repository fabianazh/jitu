<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudentPoints;
use Illuminate\Database\Seeder;

class StudentPointsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (Student::all() as $item) {
            StudentPoints::create([
                'student_id' => $item->nis
            ]);
        }
    }
}
