<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Song;
use getID3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Kreait\Firebase\Factory;


class UploadController extends Controller
{
    protected $storage;


    public function uploadForm()
    {
        return Inertia::render('Dashboard/UploadAlbum');
    }

    public function upload(Request $request)
    {

        // dd($request->file('files'));

        if (!Auth::check()) {
            return redirect()->back()->withErrors(['error' => 'No estás autentificado']);
        }

        $userId = Auth::user()->getAuthIdentifier();


        $request->validate([
            'titles.*' => 'required|string|max:255',
            'files.*' => 'required|file|max:10240',
            'album_title' => 'required|string|max:100'
        ]);

        $filePaths = [];

        $albumTitle = $request->input('album_title');
        $fechaMySQL = now()->format('Y-m-d H:i:s');
        $newAlbum = Album::create(['user_id' => $userId, 'title' => $albumTitle, 'cover_image' => 'https://fakeimg.pl/600x400/1bd42e/909090?text=TITULO', 'description' => 'description', 'price' => 10, 'release_date' => $fechaMySQL]);

        // if($newAlbum == null) {
        //     return redirect('/dashboard')->withErrors(['error' => 'No se pudo crear el album en la base de datos']);
        // }
        // dd();
        $albumID = $newAlbum->id;
        // FIREBASE STORAGE INSTANCE

        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $storage = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

        // ID3 METADATA
        // Initialize getID3 engine
        $getID3 = new getID3;
        // ITERATION OVER FILES AND SAVE
        foreach ($request->file('files') as $index => $file) {

            // INFO METADATA FILE
            $infoFile = $getID3->analyze($file->getPathname());

            $fileDuration = $infoFile['playtime_seconds'];

            $title = $request->titles[$index];


            //Unique Name File
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = 'uploads/' . $userId . '/' . $fileName;

            // Subimos el archivo al bucket de Firebase
            $storage->upload(fopen($file->getPathname(), 'r'), [
                'name' => $filePath
            ]);

            Song::create([
                'album_id' => $albumID,
                'user_id' => $userId,
                'duration' => $fileDuration,
                'title' => $title,
                'file_url' => $filePath,
                'track_number' => $index + 1,
                'price' => 1.5
            ]);

            // if($newSong === null) {
            //     return redirect('/dashboard')->withErrors(['error' => 'No se pudo crear la cancion en la base de datos']);
            // }

            // Guardamos los títulos y rutas
            $filePaths[] = [
                'title' => $request->titles[$index],
                'path' => $filePath,
                'album_title' => $albumTitle
            ];
        }

        return to_route('dashboard.showAlbum',[
            'id' => $newAlbum->id,
            200
        ])->withInput($filePaths);

        // return Inertia::render(
        //     "Dashboard/album/{$newAlbum->id}",
        //     [
        //         'filepaths' => $filePaths,
        //         'auth' => [
        //             'user' => $request->user(),
        //         ],
        //         'success' => true,
        //     ]
        // );
    }
}
