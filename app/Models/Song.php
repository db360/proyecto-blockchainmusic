<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'album_id', 'user_id', 'title', 'file_url', 'duration', 'price', 'track_number'
    ];

    public function album() {
        return $this->belongsTo(Album::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function purchases() {
        return $this->hasMany(Purchase::class);
    }
}
