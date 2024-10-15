<?php

namespace App\Http\Controllers;

use App\Models\SocialLogin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function toProvider($driver): RedirectResponse
    {
        return Socialite::driver($driver)->redirect();
    }
    public function handleCallback($driver): RedirectResponse
    {
        // Taking User data thru callback
        $user = Socialite::driver($driver)->user();

        $userAcount = SocialLogin::where('provider', $driver)->where('provider_id', $user->getId())->first();

        if ($userAcount) {
            Auth::login($userAcount->user);

            Session::regenerate();

            return redirect()->intended('dashboard');
        }


        session([

            'social_user' => [
                'name' => $user->getName() ?? $user->getNickname(),
                'email' => $user->getEmail(),
                'provider_id' => $user->getId(),
                'avatar' => $user->getAvatar(),
                'provider' => $driver,
            ]
        ]);

        return redirect()->route('register-edit');

    }
}
