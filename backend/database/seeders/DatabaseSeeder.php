<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@nis.gov.ng',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Supervisor User',
            'email' => 'supervisor@nis.gov.ng',
            'password' => bcrypt('supervisor123'),
            'role' => 'supervisor',
        ]);

        User::factory()->create([
            'name' => 'Regular User',
            'email' => 'user@nis.gov.ng',
            'password' => bcrypt('user123'),
            'role' => 'user',
        ]);
    }
}
