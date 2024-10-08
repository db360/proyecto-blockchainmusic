<?php

namespace Database\Factories;

use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Song>
 */
class SongFactory extends Factory
{
    protected $model = Song::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        return [
            'album_id' => Album::factory(),
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(),
            'file_url' => $this->faker->url(),
            'duration' => $this->faker->time(),
            'price' => $this->faker->randomFloat(2, 1, 20),
        ];
    }
}
