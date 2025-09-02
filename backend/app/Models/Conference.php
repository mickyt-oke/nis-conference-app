<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conference extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'location',
        'venue',
        'max_participants',
        'registration_deadline',
        'status',
        'image_url',
        'agenda',
        'requirements',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_deadline' => 'datetime',
        'agenda' => 'array',
        'requirements' => 'array',
    ];

    /**
     * Get the user who created the conference
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get conference registrations
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Get conference speakers
     */
    public function speakers()
    {
        return $this->belongsToMany(Speaker::class, 'conference_speakers');
    }

    /**
     * Get conference documents
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Check if registration is open
     */
    public function isRegistrationOpen()
    {
        return $this->status === 'active' && 
               $this->registration_deadline > now() &&
               $this->registrations()->where('status', 'approved')->count() < $this->max_participants;
    }

    /**
     * Get available spots
     */
    public function getAvailableSpotsAttribute()
    {
        return $this->max_participants - $this->registrations()->where('status', 'approved')->count();
    }
}
