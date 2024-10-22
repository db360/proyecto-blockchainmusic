<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistorialController extends Controller
{
    public function show() {

        $userId = Auth::user()->id;

        $albums = Album::where('user_id', $userId)
        ->with('songs') // Cargar pistas asociadas
        ->orderBy('created_at', 'desc') // Ordenar por fecha de creación
        ->get();


        return Inertia::render('Dashboard/Historial', ['albums' => $albums]);
    }
}
