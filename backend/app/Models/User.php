<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role',
        'department',
        'status',
        'last_login',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the registrations for the user.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Get the speakers created by the user.
     */
    public function speakers(): HasMany
    {
        return $this->hasMany(Speaker::class, 'created_by');
    }

    /**
     * Get the conferences created by the user.
     */
    public function conferences(): HasMany
    {
        return $this->hasMany(Conference::class, 'created_by');
    }

    /**
     * Get the documents uploaded by the user.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    /**
     * Check if user has a specific role.
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    /**
     * Check if user is supervisor.
     */
    public function isSupervisor(): bool
    {
        return $this->hasRole('supervisor');
    }

    /**
     * Check if user is regular user.
     */
    public function isUser(): bool
    {
        return $this->hasRole('user');
    }

    /**
     * Check if user is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
