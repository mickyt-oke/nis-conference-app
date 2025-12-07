<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create users with different roles
        User::factory()->create([
            'email' => 'admin@nis.gov.ng',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'email' => 'supervisor@nis.gov.ng',
            'password' => bcrypt('supervisor123'),
            'role' => 'supervisor',
        ]);

        User::factory()->create([
            'email' => 'user@nis.gov.ng',
            'password' => bcrypt('user123'),
            'role' => 'user',
        ]);
    }

    public function test_login_with_valid_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@nis.gov.ng',
            'password' => 'admin123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token', 'user' => ['id', 'email', 'name', 'role']])
            ->assertJson(['user' => ['email' => 'admin@nis.gov.ng', 'role' => 'admin']]);
    }

    public function test_login_with_invalid_credentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@nis.gov.ng',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Invalid credentials']);
    }

    public function test_login_required_fields()
    {
        $response = $this->postJson('/api/login', [
            'email' => '',
            'password' => '',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Invalid credentials']);
    }

    public function test_logout_authenticated_user()
    {
        $token = auth()->attempt(['email' => 'admin@nis.gov.ng', 'password' => 'admin123']);
        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Logged out']);
    }

    public function test_logout_without_token_fails()
    {
        $response = $this->postJson('/api/logout');

        $response->assertStatus(500)
            ->assertJson(['message' => 'Failed to logout, please try again.']);
    }

    public function test_get_authenticated_user_me_endpoint()
    {
        $token = auth()->attempt(['email' => 'user@nis.gov.ng', 'password' => 'user123']);
        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->getJson('/api/me');

        $response->assertStatus(200)
            ->assertJson(['user' => ['email' => 'user@nis.gov.ng', 'role' => 'user']]);
    }

    public function test_get_me_with_no_token_fails()
    {
        $response = $this->getJson('/api/me');

        $response->assertStatus(404)
            ->assertJson(['message' => 'User not found']);
    }

    public function test_refresh_token_success()
    {
        $token = auth()->attempt(['email' => 'supervisor@nis.gov.ng', 'password' => 'supervisor123']);
        $response = $this->withHeaders(['Authorization' => "Bearer $token"])
            ->postJson('/api/refresh');

        $response->assertStatus(200)
            ->assertJsonStructure(['token']);
    }

    public function test_refresh_token_no_token_fails()
    {
        $response = $this->postJson('/api/refresh');

        $response->assertStatus(500)
            ->assertJson(['message' => 'Failed to refresh token']);
    }
}
