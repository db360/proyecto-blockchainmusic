<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Kreait\Firebase\Factory;

class DashboardController extends Controller
{
    public function index() {
        // Get the user
        $user = Auth::user();

        // Get Albums
        $albums = Album::where('user_id', $user->id)->get();

        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $bucket = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

              // Generar Signed URLs para cada canción
              $coversWithSignedURLS = $albums->map(function ($album) use ($bucket) {
                $coverObject = $bucket->object($album->cover_image);

                // Generar una URL firmada válida por 1 hora
                $CoverSignedUrl = $coverObject->signedUrl(
                    new \DateTime('+1 hour'),  // Duración de la URL firmada
                    [
                        'version' => 'v4',  // Utiliza la versión 4 de la firma
                    ]
                );

                // Agregar la URL firmada a la canción
                $album->cover_image = $CoverSignedUrl;
                return $album;
            });
        // dd($albums);
        // Return Inertia Component
        return Inertia::render('Dashboard/Dashboard', [
            'user' => $user,
            'albums' => $coversWithSignedURLS
        ]);
    }
}
