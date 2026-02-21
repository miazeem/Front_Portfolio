<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'problem',
        'solution',
        'image_url',
        'live_url',
        'github_url',
        'tags',
        'order',
        'is_featured',
    ];

    protected $casts = [
        'tags'        => 'array',
        'is_featured' => 'boolean',
        'order'       => 'integer',
    ];
}
