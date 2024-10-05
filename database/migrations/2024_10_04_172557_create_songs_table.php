<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained()->onDelete('cascade'); // Clave foránea a la tabla 'albums'
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Clave foránea a la tabla 'users'
            $table->string('title');
            $table->string('file_url');
            $table->time('duration'); // Para almacenar la duración de la canción
            $table->decimal('price', 8, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
