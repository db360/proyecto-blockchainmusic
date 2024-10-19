<?php

use App\Http\Controllers\AccountTypeController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Firebase\UploadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialLoginController;
use App\Http\Middleware\CheckArtistRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard Controller
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
// Show Album Controller
Route::get('/album/{id}', [AlbumController::class, 'showAlbum'])->name('dashboard.showAlbum');

// Register-Edit Controller
Route::get('/register-edit', [AccountTypeController::class, 'showForm'])->name('register-edit');
Route::post('/register-edit', [AccountTypeController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Socialite Router
Route::get('/socialite/{driver}', [SocialLoginController::class, 'toProvider'])->where('driver', 'github|google');
Route::get('/auth/{driver}/login', [SocialLoginController::class, 'handleCallback'])->where('driver', 'github|google');

// Upload Route

Route::get('/upload', [UploadController::class, 'uploadForm'])->name('albums.uploadAlbum');
Route::post('/upload', [UploadController::class, 'upload'])->name('albums.upload')->middleware(CheckArtistRole::class);

require __DIR__ . '/auth.php';
