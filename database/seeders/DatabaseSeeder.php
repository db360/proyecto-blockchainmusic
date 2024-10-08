<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Song;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear 10 usuarios
        User::factory(10)->create()->each(function ($user) {
            // Crear 4 álbumes por usuario
            Album::factory(4)->create(['user_id' => $user->id])->each(function ($album) use ($user) {
                // Inicializar el track_number en 1 para cada álbum
                $trackNumber = 1;

                // Crear 5 canciones por álbum
                foreach (range(1, 5) as $index) {
                    Song::factory()->create([
                        'album_id' => $album->id,
                        'user_id' => $user->id,
                        'track_number' => $trackNumber++  // Incrementar el track_number para cada canción del álbum
                    ]);
                }
            });
        });
    }
}
