<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_id')->unique();
            $table->foreignId('conference_id')->constrained('conferences');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->enum('registration_type', ['attendee', 'speaker', 'team']);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('organization')->nullable();
            $table->string('job_title')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected', 'confirmed', 'cancelled'])->default('confirmed');
            $table->json('registration_data')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('rejected_at')->nullable();
            $table->foreignId('rejected_by')->nullable()->constrained('users');
            $table->text('supervisor_comments')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('registrations');
    }
};
