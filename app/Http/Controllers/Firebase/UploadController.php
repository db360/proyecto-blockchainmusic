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

    private function convertGsToHttp($path)
    {
        $bucket = "blockchain-music-138d8.appspot.com"; // Cambia esto si es necesario
        $encodedFilePath = urlencode($path); // Codifica el path, convirtiendo las barras en %2F
        return "https://firebasestorage.googleapis.com/v0/b/{$bucket}/o/{$encodedFilePath}?alt=media";
    }


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
            'image' => 'required|file|max:5000',
            'album_title' => 'required|string|max:100'
        ]);

        // dd($request->all());

        // dd($request->file('image'));

        $filePaths = [];
        $imageCover = $request->file('image');


        $albumTitle = $request->input('album_title');
        $fechaMySQL = now()->format('Y-m-d H:i:s');


        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));
        $storage = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));




        $imageCoverName = time() . '_' . $imageCover->getClientOriginalName();
        $imagePath = 'images/' . $userId . '/' . $imageCoverName;
        $storage->upload(fopen($imageCover->getPathname(), 'r'), [
            'name' => $imagePath
        ]);


        $newAlbum = Album::create(['user_id' => $userId, 'title' => $albumTitle, 'cover_image' => $this->convertGsToHttp($imagePath) , 'description' => 'description', 'price' => 10, 'release_date' => $fechaMySQL]);

        $albumID = $newAlbum->id;


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
            $filePath = 'tracks/' . $userId . '/' . $fileName;

            // Subimos el archivo al bucket de Firebase
            $storage->upload(fopen($file->getPathname(), 'r'), [
                'name' => $filePath
            ]);



            $newSong = Song::create([
                'album_id' => $albumID,
                'user_id' => $userId,
                'duration' => $fileDuration,
                'title' => $title,
                'file_url' => $filePath,
                'track_number' => $index + 1,
                'price' => 1.5
            ]);

            if ($newSong === null) {
                return redirect('/dashboard')->withErrors(['error' => 'No se pudo crear la cancion en la base de datos']);
            }

            $filePaths[] = [
                'title' => $request->titles[$index],
                'path' => $filePath,
                'album_title' => $albumTitle
            ];
        }

        return to_route('dashboard.showAlbum', [
            'id' => $newAlbum->id,
            200
        ])->withInput($filePaths);
    }
}
