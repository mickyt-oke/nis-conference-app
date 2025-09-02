<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speaker extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'bio',
        'organization',
        'email',
        'phone',
        'photo_url',
        'linkedin_url',
        'twitter_url',
        'website_url',
        'expertise',
        'status',
    ];

    protected $casts = [
        'expertise' => 'array',
    ];

    /**
     * Get conferences where this speaker is speaking
     */
    public function conferences()
    {
        return $this->belongsToMany(Conference::class, 'conference_speakers');
    }
}
