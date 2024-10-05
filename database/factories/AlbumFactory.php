<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Album>
 */
class AlbumFactory extends Factory
{
    protected $model = Album::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'cover_image' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph(),
            'release_date' => $this->faker->date(),
            'price' => $this->faker->randomFloat(2, 5, 100),
        ];
    }
}
