<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('organization');
            $table->text('biography');
            $table->string('expertise');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->string('photo')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speakers');
    }
};
