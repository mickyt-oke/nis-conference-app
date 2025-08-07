<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('conferences', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->string('location');
            $table->text('venue_details')->nullable();
            $table->integer('max_attendees');
            $table->decimal('registration_fee', 10, 2)->default(0);
            $table->enum('status', ['draft', 'published', 'ongoing', 'completed', 'cancelled'])->default('draft');
            $table->string('banner_image')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('conferences');
    }
};
