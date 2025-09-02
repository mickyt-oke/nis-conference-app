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
        Schema::create('conference_speakers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conference_id')->constrained('conferences');
            $table->foreignId('speaker_id')->constrained('speakers');
            $table->string('session_title')->nullable();
            $table->datetime('session_time')->nullable();
            $table->integer('session_duration')->nullable(); // in minutes
            $table->text('session_description')->nullable();
            $table->timestamps();

            $table->unique(['conference_id', 'speaker_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conference_speakers');
    }
};
