<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'conference_id',
        'type',
        'filename',
        'file_path',
        'file_size',
        'mime_type',
        'is_public',
        'download_count',
        'uploaded_by'
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'file_size' => 'integer',
        'download_count' => 'integer'
    ];

    // Relationships
    public function conference()
    {
        return $this->belongsTo(Conference::class);
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Scopes
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Accessors
    public function getFileUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
    }

    public function getFileSizeHumanAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
