<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'conference_id',
        'user_id',
        'registration_type',
        'first_name',
        'last_name',
        'email',
        'phone',
        'organization',
        'job_title',
        'status',
        'registration_data',
        'approved_at',
        'approved_by',
        'rejected_at',
        'rejected_by',
        'supervisor_comments'
    ];

    protected $casts = [
        'registration_data' => 'array',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime'
    ];

    // Relationships
    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rejectedBy()
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
