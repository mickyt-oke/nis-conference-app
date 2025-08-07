<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('conference_id')->constrained('conferences');
            $table->enum('type', ['presentation', 'document', 'image', 'video', 'other']);
            $table->string('filename');
            $table->string('file_path');
            $table->bigInteger('file_size');
            $table->string('mime_type');
            $table->boolean('is_public')->default(true);
            $table->integer('download_count')->default(0);
            $table->foreignId('uploaded_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
};
