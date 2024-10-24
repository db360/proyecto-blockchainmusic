<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Inertia\Inertia;
use Kreait\Firebase\Factory;

class AlbumController extends Controller
{
    public function showAlbum($id)
    {

        $album = Album::with(['songs', 'user'])->findOrFail($id);


        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $bucket = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

        $albumWithCover = $album->cover_image;
        $coverObject = $bucket->object($albumWithCover);
        $coverSignedUrl = $coverObject->signedUrl(
            new \DateTime('+1 hour'),
            [
                'version' => 'v4',
            ]
            );

        $album->cover_image = $coverSignedUrl;



        // Generar Signed URLs para cada canción
        $songsWithSignedUrls = $album->songs->map(function ($song) use ($bucket) {
            $songObject = $bucket->object($song->file_url);

            // Generar una URL firmada válida por 1 hora
            $AudioSignedUrl = $songObject->signedUrl(
                new \DateTime('+1 hour'),  // Duración de la URL firmada
                [
                    'version' => 'v4',  // Utiliza la versión 4 de la firma
                ]
            );

            // Agregar la URL firmada a la canción
            $song->song_signed_url = $AudioSignedUrl;
            return $song;
        });

        return Inertia::render('Dashboard/ShowAlbum', [
            'album' => $album,
            'songs' => $songsWithSignedUrls,
            'user' => $album->user
        ]);
    }


    public function explorer()
    {

        $albums = Album::with(['songs'])->paginate(20);



        return Inertia::render(
            'Dashboard/Explorer',
            [
                'albums' => $albums
            ]
        );
    }
}
