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
        Schema::create('conferences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->string('location');
            $table->string('venue');
            $table->integer('max_participants')->default(100);
            $table->datetime('registration_deadline');
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('draft');
            $table->string('image_url')->nullable();
            $table->json('agenda')->nullable();
            $table->json('requirements')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conferences');
    }
};
