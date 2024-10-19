<?php

namespace App\Providers\Firebase;

use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;

class FirebaseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Registrar la instancia de Firebase Storage en el contenedor de servicios
        $this->app->singleton('firebase', function ($app) {
            $app = (new Factory)
                ->withServiceAccount(config('firebase.path'))
                ->withDefaultStorageBucket(config('firebase.storage_bucket')); // Asegúrate de que este campo esté en tu configuración

            return $app->createStorage();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
