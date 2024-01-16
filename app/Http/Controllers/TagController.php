<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Post_tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tag;

class TagController extends Controller
{
    //
    public function index()
    {
        $tag = Tag::paginate(10);
        //$tag = Tag::with('post_tags')->all();
        //dd($tag);
        return Inertia::render('Tags/Index', [
            'tags' => $tag,
        ]);
    }

    public function create()
    {
        $tag = Tag::all();
        //$post = Post::all();
        return Inertia::render('Tags/CreateTags', [
            'tags' => $tag,
            // 'posts' => $post,
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'tag_id' => 'required|array',
            'tag_id.*' => 'exists:tags,id',
            // 'tag_id.*' => 'unique|required|exists:tags,id',
        ]);

        foreach ($request->tag_id as $tagId) {
            Post_tag::create([
                'post_id' => $request->post_id,
                'tag_id' => $tagId,
            ]);
        }

        session()->flash('success', 'Tags added successfully. Thank you.');
        return redirect()->back();
    }

    public function destroy($id)
    {
        $tag = Post_tag::find($id);
        $tag->delete();
        session()->flash('warning', 'You did it. Thank you');
        return redirect()->back();
    }
}
