<?php

namespace Database\Seeders;

use App\Models\Student;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\StudentPoints;
use App\Models\Violation;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AuthEndpointSeeder::class);
        $this->call(AdminSeeder::class);

        $this->call(MajorSeeder::class);
        $this->call(GradeSeeder::class);
        $this->call(StudentSeeder::class);
        Student::factory(50)->create();
        $this->call(StudentPointsSeeder::class);

        $this->call(ViolationCategorySeeder::class);
        $this->call(ViolationFormSeeder::class);
        $this->call(SanctionSeeder::class);
        $this->call(ViolationSeeder::class);
        // Violation::factory(15)->create();
    }
}
