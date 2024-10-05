<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'cover_image', 'description', 'release_date', 'price'
    ];

    public function user() {
        return $this->hasMany(Song::class);
    }

    public function songs() {
        return $this->hasMany(Song::class);
    }

    public function purchases(){
        return $this->hasMany(Purchase::class);
    }
}
