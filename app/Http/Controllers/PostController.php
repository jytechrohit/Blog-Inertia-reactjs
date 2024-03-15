<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Sitemap;

class PostController extends Controller
{
    //
    public function index()
    {


        $posts = Post::with('categories', 'user', 'comment', 'tags', 'post_tags')->paginate(6);
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        $category = Category::all();
        return Inertia::render('Posts/Create', [
            'categories' => $category,
        ]);
        // return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'name' => 'string|max:255',
            'slug' => 'string|max:255',
            'content' => 'required|string',
            'image' => 'required|file|mimes:pdf,doc,docx,png,jpeg,jpg',

        ]);
        $post = Post::create([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'content' => $request->content,
            'image' => $request->image->getClientOriginalName(),
        ]);
        dd($post);
        $request->image->storeAs('upload', $request->image->getClientOriginalName(), 'public');


        session()->flash('success', 'Post created successfully. Thank you.');
        return redirect()->back();
    }

    public function show(Post $post)
    {
        return Inertia::render('post/Show', [
            'post' => $post->only(
                'id',
                'user_id',
                'title',
                'content',
                'image'
            ),
        ]);
    }

    public function edit($id)
    {
        $post = Post::findOrFail($id);
        $category = Category::all();
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $category,
        ]);
    }

    public function update(Request $request, Post $post, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'slug' => 'string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,jpg,webp',
        ]);

        $post = Post::find($id);

        $post->user_id = $request->user_id;
        $post->category_id = $request->category_id;
        $post->name = $request->name;
        $post->slug = $request->slug;
        $post->content = $request->content;
        $post->image = $request->image->getClientOriginalName();
        $post->save();
        $request->image->storeAs('upload', $request->image->getClientOriginalName(), 'public');
        return redirect()->back()->with('success', 'Expense updated');;
    }

    public function destroy($id)
    {
        $Post = Post::find($id);
        $Post->delete();
        session()->flash('warning', 'You did it. Thank you');
        return redirect()->back();
    }

    public function readMore(Request $request, $id)
    {

        $post = Post::with('categories', 'user', 'comment', 'tags', 'post_tags')->find($id);
        //dd($post);
        $tag = Tag::all();
        return Inertia::render('Posts/ReadMore', [
            'post' => $post,
            'tags' => $tag,
        ]);
    }

    public function addCategory(Post $post, Category $category)
    {
        $post->categories()->attach($category);

        return redirect()->route('posts.show', $post->slug);
    }

    public function generateSitemap()
    {
        $baseUrl = config('app.url') . '/generate-sitemap';

        SitemapGenerator::create($baseUrl)
            ->hasCrawled(function (Sitemap $sitemap) {
                foreach (Post::all() as $post) {
                    $sitemap->add(route('PostIndex', $post->title), $post->updated_at);
                }
            })
            ->writeToFile(public_path('sitemap.xml'));

        return 'Sitemap generated successfully!';
    }


    // protected function syncTags(Post $post, $tagNames)
    // {
    //     $tagIds = [];

    //     foreach ($tagNames as $tagName) {
    //         // $tag = Tag::firstOrCreate(['name' => $tagName], ['slug' => Str::slug($tagName)]);
    //         $tag = Tag::firstOrCreate(['name' => $tagName]);
    //         $tagIds[] = $tag->id;
    //     }

    //     $post->tags()->sync($tagIds);
    // }
}
