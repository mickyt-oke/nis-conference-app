<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conference extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'location',
        'venue_details',
        'max_attendees',
        'registration_fee',
        'status',
        'banner_image',
        'created_by'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_fee' => 'decimal:2'
    ];

    // Relationships
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function speakers()
    {
        return $this->belongsToMany(Speaker::class, 'conference_speakers');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now());
    }

    public function scopeOngoing($query)
    {
        return $query->where('start_date', '<=', now())
                    ->where('end_date', '>=', now());
    }

    // Accessors
    public function getIsFullAttribute()
    {
        return $this->registrations()->where('status', '!=', 'cancelled')->count() >= $this->max_attendees;
    }

    public function getAvailableSlotsAttribute()
    {
        return $this->max_attendees - $this->registrations()->where('status', '!=', 'cancelled')->count();
    }
}
