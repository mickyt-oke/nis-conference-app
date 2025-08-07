<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Speaker extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'title',
        'organization',
        'biography',
        'expertise',
        'email',
        'phone',
        'linkedin',
        'twitter',
        'photo',
        'status'
    ];

    // Relationships
    public function conferences()
    {
        return $this->belongsToMany(Conference::class, 'conference_speakers');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Accessors
    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }
}
