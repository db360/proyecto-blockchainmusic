<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
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

        if(!Auth::check()) {
            return redirect()->back()->withErrors(['error' => 'No estás autentificado']);
        }

        $userId = Auth::user()->getAuthIdentifier();



        $request->validate([
            'titles.*' => 'required|string|max:255',
            'files.*' => 'required|file|max:10240',
        ]);

        $filePaths = [];


        $firebase = (new Factory)->withServiceAccount(config('firebase.path'))->withDefaultStorageBucket(config('firebase.storage_bucket'));

        // dd(config('firebase.storage_bucket'));
        $storage = $firebase->createStorage()->getBucket(config('firebase.storage_bucket'));

        foreach ($request->file('files') as $index => $file) {
           // Generamos un nombre único para cada archivo
           $fileName = time() . '_' . $file->getClientOriginalName();
           $filePath = 'uploads/' . $userId . '/' . $fileName;

           // Subimos el archivo al bucket de Firebase
           $storage->upload(fopen($file->getPathname(), 'r'), [
               'name' => $filePath
           ]);

           // Guardamos los títulos y rutas
           $filePaths[] = [
               'title' => $request->titles[$index],
               'path' => $filePath
           ];
        }

        redirect()->route('dashboard')->with($filePaths);
    }
}
