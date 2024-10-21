<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SongsController extends Controller
{
    public function playSong(Request $request, $albumId, $songId) {
        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $storage = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

        // Obtén el álbum y la canción por su ID
        $album = Album::findOrFail($albumId);
        $song = $album->songs->find($songId);

        // Verifica si la canción existe
        if (!$song) {
            abort(404, 'Canción no encontrada.');
        }

        // Obtener la URL del archivo
        $url = $song->file_url;

        dd($url);

        // $object = $storage->object($url);

        // // Crear una respuesta en stream para servir el archivo
        // return new StreamedResponse(function() use ($object) {
        //     // Descargamos el archivo como stream
        //     $stream = $object->downloadAsStream();
        //     dd($stream);
        //     // Pasamos el contenido del archivo directamente al output
        //     while (!$stream->eof()) {
        //         echo $stream->read(1024); // Leer 1 KB por iteración
        //     }
        // }, 200, [
        //     'Content-Type' => 'audio/mpeg', // Cambiar si es otro tipo de archivo
        //     'Content-Disposition' => 'inline; filename="' . basename($url) . '"',
        // ]);
    }
}
