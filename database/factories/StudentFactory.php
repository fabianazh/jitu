<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nis' => str_pad(fake()->unique()->numberBetween(0, 999999999999), 12, '0', STR_PAD_LEFT),
            'grade_id' => fake()->randomElement(['12-rpl-1', '11-rpl-1', '11-rpl-2', '10-rpl-1', '10-tkj-1']),
            'name' => fake()->name(),
            'phone' => str_pad(fake()->unique()->numberBetween(0, 999999999999), 12, '0', STR_PAD_LEFT),
            'parents_phone' => str_pad(fake()->unique()->numberBetween(0, 999999999999), 12, '0', STR_PAD_LEFT),
            'address' => fake()->address(),
            'date_of_birth' => fake()->date(),
            'gender' => fake()->randomElement(['Laki-Laki', 'Perempuan']),
            'password' => bcrypt('Pasim2024'),
        ];
    }
}
