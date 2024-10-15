<?php

namespace App\Http\Controllers;

use App\Models\SocialLogin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AccountTypeController extends Controller
{
    public function showForm(){
        return Inertia::render('Auth/RegisterEdit');
    }

    public function store(Request $request) {
        $request->validate([
            'role' => 'required|in:artist,user',
            'password' => ['required', 'confirmed', Password::defaults()],

        ]);

        $socialUser = session('social_user');

        $dbUser = User::create([
            'name' => $socialUser['name'],
            'email' => $socialUser['email'],
            'password' => $request->input('password'),
            'profile_picture' => $socialUser['avatar'],
            'role' => $request->input('role'),
        ]);

        SocialLogin::create([
            'provider' => $socialUser['provider'],
            'provider_id' => $socialUser['provider_id'],
            'user_id' => $dbUser->id
        ]);

        Auth::login($dbUser);

        $request->session()->regenerate();

        return redirect()->intended('dashboard');
    }
}
