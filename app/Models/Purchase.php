<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'song_id', 'album_id', 'transaction_id', 'amount'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function song() {
        return $this->belongsTo(Song::class);
    }

    public function album() {
        return $this->belongsTo(Album::class);
    }
}
