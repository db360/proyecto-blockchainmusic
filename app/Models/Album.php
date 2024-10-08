<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'cover_image',
        'description',
        'release_date',
        'price'
    ];
    // Un álbum pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un álbum tiene muchas canciones
    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    // Un álbum tiene muchas compras
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
