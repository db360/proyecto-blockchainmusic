<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Inertia\Inertia;

class AlbumController extends Controller
{
   public function showAlbum($id) {

        $album = Album::with(['songs', 'user'])->findOrFail($id);


        return Inertia::render('Dashboard/ShowAlbum', [
            'album' => $album,
            'songs' => $album->songs,
            'user' => $album->user
        ]);
   }
}
