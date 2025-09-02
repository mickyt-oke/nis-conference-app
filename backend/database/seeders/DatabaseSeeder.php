<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Conference;
use App\Models\Speaker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default users
        $admin = User::create([
            'name' => 'System Administrator',
            'username' => 'admin',
            'email' => 'admin@immigration.gov.ng',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'department' => 'IT Department',
            'status' => 'active',
        ]);

        $supervisor = User::create([
            'name' => 'Department Supervisor',
            'username' => 'supervisor',
            'email' => 'supervisor@immigration.gov.ng',
            'password' => Hash::make('super123'),
            'role' => 'supervisor',
            'department' => 'Operations',
            'status' => 'active',
        ]);

        $user = User::create([
            'name' => 'Regular User',
            'username' => 'user',
            'email' => 'user@immigration.gov.ng',
            'password' => Hash::make('user123'),
            'role' => 'user',
            'department' => 'General',
            'status' => 'active',
        ]);

        // Create sample conference
        $conference = Conference::create([
            'title' => 'Annual Immigration Conference 2024',
            'description' => 'Join us for the annual immigration conference featuring expert speakers and networking opportunities.',
            'start_date' => now()->addDays(30),
            'end_date' => now()->addDays(32),
            'location' => 'Abuja, Nigeria',
            'venue' => 'International Conference Centre',
            'max_participants' => 500,
            'registration_deadline' => now()->addDays(20),
            'status' => 'active',
            'created_by' => $admin->id,
        ]);

        // Create sample speakers
        $speaker1 = Speaker::create([
            'name' => 'Dr. John Smith',
            'title' => 'Immigration Policy Expert',
            'bio' => 'Dr. Smith has over 20 years of experience in immigration policy and reform.',
            'organization' => 'Immigration Research Institute',
            'email' => 'john.smith@example.com',
            'expertise' => ['Policy', 'Reform', 'Research'],
            'status' => 'active',
        ]);

        $speaker2 = Speaker::create([
            'name' => 'Prof. Sarah Johnson',
            'title' => 'International Relations Specialist',
            'bio' => 'Prof. Johnson specializes in international migration and border security.',
            'organization' => 'University of Global Studies',
            'email' => 'sarah.johnson@example.com',
            'expertise' => ['International Relations', 'Border Security', 'Migration'],
            'status' => 'active',
        ]);

        // Attach speakers to conference
        $conference->speakers()->attach([$speaker1->id, $speaker2->id]);
    }
}
