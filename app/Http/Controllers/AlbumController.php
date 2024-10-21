<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Inertia\Inertia;
use Kreait\Firebase\Factory;

class AlbumController extends Controller
{
   public function showAlbum($id) {

        $album = Album::with(['songs', 'user'])->findOrFail($id);


        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $bucket = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

             // Generar Signed URLs para cada canción
             $songsWithSignedUrls = $album->songs->map(function ($song) use ($bucket) {
                $object = $bucket->object($song->file_url);

                // Generar una URL firmada válida por 1 hora
                $signedUrl = $object->signedUrl(
                    new \DateTime('+1 hour'),  // Duración de la URL firmada
                    [
                        'version' => 'v4',  // Utiliza la versión 4 de la firma
                    ]
                );

                // Agregar la URL firmada a la canción
                $song->signed_url = $signedUrl;
                return $song;
            });

        return Inertia::render('Dashboard/ShowAlbum', [
            'album' => $album,
            'songs' => $songsWithSignedUrls,
            'user' => $album->user
        ]);
   }


   public function explorer() {

    $albums = Album::with(['songs'])->paginate(20);


    // $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
    // $storage = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

    // foreach($albums as $album) {
    //     $url = $album->songs[0]->file_url;
    //     $file = $storage->object($url);
    //     dd($file);
    //     $tempFile = $file->downloadToFile(__DIR__ . '/uploads/');
    // };

    return Inertia::render('Dashboard/Explorer',
    [
        'albums' => $albums
    ]);
   }
}
