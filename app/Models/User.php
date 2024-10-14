<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_picture',
        'bio',
        'wallet_address',
        'social_links',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function albums() {
        return $this->hasMany(Album::class);
    }

    public function songs() {
        return $this->hasMany(Song::class);
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }

    public function following() {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_id');
    }

    public function followers() {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followed_id');
    }

    public function interactions() {
        return $this->hasMany(Interaction::class);
    }
}
