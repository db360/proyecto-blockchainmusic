<?php

namespace Database\Seeders;

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
        // User::factory(10)->create();
        // Creamos un usuario
        User::factory()->create([
            'name' => 'Dab',
            'email' => 'da.b@hotmail.es',
            'password' => bcrypt('123.324A'),
            'profile_picture' => 'https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg',
            'bio' => 'Un tio guay que pasa lorem ipsum jejejej',
            'wallet_address' => '0xe8f04c75b331c309987d161f2ec1bec32170437a',
            'social_links' => json_encode(['https://wwww.facebook.com/db360', 'https://wwww.twitter.com/db360', 'https://wwww.linkedin.com/db360']),
            'email_verified_at' => time()
        ]);
    }
}
