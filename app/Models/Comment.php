<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'content',
        'image',
        'post_id',
        'user_id',
    ];
    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        if ($this->image) {
            return url('storage/upload/' . $this->image);
        }
        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
