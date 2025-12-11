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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_id')->unique();
            $table->enum('registration_type', ['attendee', 'speaker', 'team']);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('organization')->nullable();
            $table->string('job_title')->nullable();
            $table->string('conference_id');
            $table->enum('status', ['confirmed', 'pending_approval', 'rejected', 'cancelled'])->default('confirmed');
            $table->json('additional_data')->nullable();
            $table->timestamps();

            // Index for faster queries
            $table->index(['email', 'conference_id']);
            $table->index(['registration_type', 'status']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
