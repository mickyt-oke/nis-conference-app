<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_name',
        'file_path',
        'file_size',
        'file_type',
        'conference_id',
        'uploaded_by',
        'is_public',
        'download_count',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'file_size' => 'integer',
        'download_count' => 'integer',
    ];

    /**
     * Get the conference this document belongs to
     */
    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    /**
     * Get the user who uploaded the document
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Increment download count
     */
    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }
}
