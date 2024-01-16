<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    //  protected $guarded = [];s
    protected $fillable = ['user_id', 'category_id', 'name', 'slug', 'content', 'image'];
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
        return $this->belongsTo(User::class, 'user_id');
    }
    public function categories()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function comment()
    {
        return $this->hasMany(Comment::class);
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function post_tags()
    {
        return $this->hasMany(Post_tag::class);
    }
}
