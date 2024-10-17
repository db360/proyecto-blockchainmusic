<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;

class UploadController extends Controller
{
    protected $storage;

    public function __construct(){
        $this->storage = app('firebase');
    }

    public function uploadForm() {
        return Inertia::render('Dashboard/UploadAlbum');
    }

    public function upload(Request $request){


        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        $file = $request->file('file');
        $path = 'uploads/' . $file->getClientOriginalName();

        // Upload

        dd($this->storage->getBucket()->upload(
            fopen($file->getRealPath(), 'r'),
            ['name' => $path]
        ));

        return response()->json(['success' => true, 'path' => $path]);
    }
}
