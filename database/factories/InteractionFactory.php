<?php

namespace Database\Factories;

use App\Models\Interaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Interaction>
 */
class InteractionFactory extends Factory
{
    protected $model = Interaction::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'content' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['message', 'comment']),
            'target_user_id' => User::factory(),
        ];
    }
}
