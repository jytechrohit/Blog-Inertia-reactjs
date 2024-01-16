<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Tag;

class UserController extends Controller
{
    //
    public function index()
    {
        $posts = Post::with('user', 'categories', 'comment.user', 'tags')->paginate(6);
        //dd($posts);
        $tag = Tag::all();
        return Inertia::render('Dashboard', [
            'posts' => $posts,
            'tags' => $tag,
        ]);
        // return Inertia::render('Dashboard');
    }
}
