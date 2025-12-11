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
        Schema::table('users', function (Blueprint $table) {
            // Add email verification fields if they don't exist
            if (!Schema::hasColumn('users', 'verification_token')) {
                $table->string('verification_token')->nullable()->unique()->after('email_verified_at');
            }

            if (!Schema::hasColumn('users', 'reset_token')) {
                $table->string('reset_token')->nullable()->unique()->after('verification_token');
                $table->timestamp('reset_token_expires_at')->nullable()->after('reset_token');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('verification_token');
            $table->dropColumn('reset_token');
            $table->dropColumn('reset_token_expires_at');
        });
    }
};
