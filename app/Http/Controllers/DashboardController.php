<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        // Get the user
        $user = Auth::user();

        // Get Albums
        $albums = Album::where('user_id', $user->id)
                ->with('songs')
                ->get();

        // Return Inertia Component
        return Inertia::render('Dashboard/Dashboard', [
            'user' => $user,
            'albums' => $albums
        ]);


    }
}
