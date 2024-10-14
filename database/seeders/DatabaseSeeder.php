<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use App\Models\Purchase;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear 5 usuarios con rol 'artist'
        $artists = User::factory(5)->create(['role' => 'artist'])->each(function ($user) {
            // Crear 4 álbumes por artista
            Album::factory(4)->create(['user_id' => $user->id])->each(function ($album) use ($user) {
                // Inicializar el track_number en 1 para cada álbum
                $trackNumber = 1;

                // Crear 5 canciones por álbum
                foreach (range(1, 5) as $index) {
                    Song::factory()->create([
                        'album_id' => $album->id,
                        'user_id' => $user->id,
                        'track_number' => $trackNumber++,  // Incrementar el track_number para cada canción del álbum
                    ]);
                }
            });
        });

        // Crear 5 usuarios con rol 'user' (no crearán álbumes)
        $users = User::factory(5)->create(['role' => 'user']);

        // Crear compras para los usuarios 'user'
        $users->each(function ($user) use ($artists) {
            // Para cada usuario 'user', seleccionar álbumes aleatorios de los artistas para que realicen compras
            foreach ($artists as $artist) {
                $album = $artist->albums->random(); // Seleccionar un álbum aleatorio de un artista
                Purchase::factory()->create([
                    'user_id' => $user->id,
                    'album_id' => $album->id,
                    'amount' => $album->price ?? 9.99,  // Asumir un precio o usar un precio fijo
                ]);
            }
        });
    }
}
