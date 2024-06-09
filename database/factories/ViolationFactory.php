<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Violation>
 */
class ViolationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->uuid(),
            'student_id' => fake()->randomElement([6969, 62]),
            'violation_form_id' => fake()->randomElement(['3618de7f-1ef0-3b3c-bd7d-da8080a', '3618dde7f-1ef0w-3b3c-bd7dd-66asdaw', '90dsadh-dasd9ask9-casc0900-d9', 'iasdjas-09dn-sd9daj9-as9d9ajsd', 'd0asi90asdj-asc08nc-dassda0s-9asdas']),
            'sanction_id' => fake()->randomElement(['asn9sac8na-as8ca8nsc-a8scnasi', 'xasnx98-ans0as0cas-acns08-ascsi', 'ans0d-asd9nasd-as8dbasd-dasas', 'cna0sinc-a0sncnaisc-a9sdnaid-sad']),
            'message' => fake()->realText(),
            'created_at' => now()
        ];
    }
}
