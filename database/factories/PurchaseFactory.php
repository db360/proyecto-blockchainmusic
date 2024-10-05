<?php

namespace Database\Factories;

use App\Models\Purchase;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Purchase>
 */
class PurchaseFactory extends Factory
{
    protected $model = Purchase::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'song_id' => Song::factory(),
            'album_id' => null,
            'transaction_id' => $this->faker->uuid(),
            'amount' => $this->faker->randomFloat(2, 5, 100)

        ];
    }
}
