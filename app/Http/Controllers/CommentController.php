<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CommentController extends Controller
{

    public function index()
    {
        $comment = Comment::with('user', 'post')->paginate(6);
        return Inertia::render('Comments/Index', [
            'comments' => $comment,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($postId)
    {
        $postData = Post::findOrFail($postId);
        return Inertia::render('Comments/Create', [
            'postData' => $postData,
        ]);

        //return Inertia::render('Comments/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
            'content' => 'string|max:255',
            'image' => 'required|file|mimes:pdf,doc,docx,png,jpeg,jpg',

        ]);
        Comment::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id,
            'content' => $request->content,
            'image' => $request->image->getClientOriginalName(),
        ]);
        $request->image->storeAs('upload', $request->image->getClientOriginalName(), 'public');

        session()->flash('success', 'Comment created successfully. Thank you.');
        return redirect()->back();
    }

    public function commentList(Request $request, $id)
    {
        $post = Post::with('categories', 'user', 'comment')->find($id);

        return Inertia::render('Comments/showComment', [
            'post' => $post,
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Comment $comment)
    // {
    //     //
    // }
    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();
        session()->flash('warning', 'Do You Want to delete the Comment');
        return redirect()->back();
    }
}
