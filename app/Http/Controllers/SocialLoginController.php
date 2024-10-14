<?php

namespace App\Http\Controllers;

use App\Models\SocialLogin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function toProvider($driver)
    {
        return Socialite::driver($driver)->redirect();
    }
    public function handleCallback($driver)
    {
        // Taking User data thru callback
        $user = Socialite::driver($driver)->user();

        $userAcount = SocialLogin::where('provider', $driver)->where('provider_id', $user->getId())->first();

        if ($userAcount) {
            Auth::login($userAcount->user);

            Session::regenerate();

            return redirect()->intended('dashboard');
        }

        $dbUser = User::where('email', $user->getEmail())->first();

        if ($dbUser) {
            SocialLogin::create([
                'provider' => $driver,
                'provider_id' => $user->getId(),
                'user_id' => $dbUser->id
            ]);
            // If doesn't exist
        } else {
            
            $dbUser = User::create([
                'name' => $user->getName() ?? $user->getNickname(),
                'email' => $user->getEmail(),
                'password' => Hash::make('password'),
                'profile_picture' => $user->getAvatar(),
            ]);

            SocialLogin::create([
                'provider' => $driver,
                'provider_id' => $user->getId(),
                'user_id' => $dbUser->id
            ]);
        }

        Auth::login($dbUser);

        Session::regenerate();

        return redirect()->intended('dashboard');
    }
}
