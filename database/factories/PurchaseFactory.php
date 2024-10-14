<?php

namespace Database\Factories;

use App\Models\Purchase;
use App\Models\Song;
use App\Models\Album;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Purchase>
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
            'user_id' => null,  // Será definido en el seeder
            'song_id' => null,  // Opcional si es compra de canción
            'album_id' => null, // Será definido en el seeder si es compra de álbum
            'transaction_id' => $this->faker->uuid(),
            'amount' => $this->faker->randomFloat(2, 5, 20) // Precio aleatorio entre 5 y 100
        ];
    }
}
