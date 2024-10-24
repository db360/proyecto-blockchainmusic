<?php

namespace App\Http\Controllers;

use App\Models\Song;

class SongsController extends Controller
{


    public function incrementPlayCount($songId) {

        $song = Song::where(['id'=> $songId])->increment('plays_count');

        return redirect()->back()->with('message', 'Play count incremented successfully');
    }
}
