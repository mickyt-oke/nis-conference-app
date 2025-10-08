<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'conference_id',
        'full_name',
        'email',
        'phone',
        'organization',
        'position',
        'dietary_requirements',
        'special_needs',
        'status',
        'approved_by',
        'approved_at',
        'rejection_reason',
        'comments',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'dietary_requirements' => 'array',
    ];

    /**
     * Get the user who made the registration
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the conference
     */
    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    /**
     * Get the user who approved the registration
     */
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Approve the registration
     */
    public function approve($approvedBy, $comments = null)
    {
        $this->update([
            'status' => 'approved',
            'approved_by' => $approvedBy,
            'approved_at' => now(),
            'comments' => $comments,
        ]);
    }

    /**
     * Reject the registration
     */
    public function reject($rejectedBy, $reason)
    {
        $this->update([
            'status' => 'rejected',
            'approved_by' => $rejectedBy,
            'rejection_reason' => $reason,
        ]);
    }
}
