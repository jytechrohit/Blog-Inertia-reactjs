<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CkEditorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PizzaController;
use App\Http\Controllers\TagController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('welcome');

Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');


Route::get('/postIndex', [PostController::class, 'index'])->name('postIndex');
Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::post('/posts/store', [PostController::class, 'store'])->name('posts.store');
Route::get('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
Route::get('Post/{id}/{slug}', [PostController::class, 'readMore'])->name('posts.readMore');



Route::get('/todo', [TodoController::class, 'index'])->name('todo');
Route::get('todos/{id}/edit', [TodoController::class, 'edit'])->name('todos.edit');
//Route::post('/todos/update', [TodoController::class, 'update'])->name('todos.update');
Route::get('/todos/create', [TodoController::class, 'create'])->name('todos.create');
Route::post('/todos/store', [TodoController::class, 'store'])->name('todos.store');
Route::post('/todos/{id}', [TodoController::class, 'update'])->name('todos.update');
Route::get('/todos/{id}', [TodoController::class, 'destroy'])->name('todos.destroy');

//Route::get('/demo', [TodoController::class, 'index'])->name('todos.index');

Route::get('category', [CategoryController::class, 'index'])->name('category');
Route::get('category/{id}/{category}', [CategoryController::class, 'categoryList'])->name('category.categoryList');
Route::post('/posts/{post:slug}/add-category/{category:slug}', [PostController::class, 'addCategory'])
    ->name('posts.addCategory');


Route::get('comment', [CommentController::class, 'index'])->name('comment');
Route::get('/comment/create/{post_id}', [CommentController::class, 'create'])->name('comment.create');
Route::post('/comment/store', [CommentController::class, 'store'])->name('comment.store');
Route::get('comment/{id}/{slug}', [CommentController::class, 'commentList'])->name('comment.commentList');
Route::get('/comment/{id}', [CommentController::class, 'destroy'])->name('comment.destroy');


Route::get('tags', [TagController::class, 'index'])->name('tags');
Route::get('tags/create', [TagController::class, 'create'])->name('tags.create');
Route::post('tags/store', [TagController::class, 'store'])->name('tags.store');
Route::get('/tags/{id}', [TagController::class, 'destroy'])->name('tags.destroy');



// Route::get('/generate-sitemap', 'PostController@generateSitemap');
Route::get('/generate-sitemap', [PostController::class, 'generateSitemap'])->name('generateSitemap');

Route::get('ckeditor', [CkEditorController::class, 'index']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index');
Route::get('/pizzas/{pizza}', [PizzaController::class, 'edit'])->name('pizzas.edit');
Route::patch('/pizzas/{pizza}', [PizzaController::class, 'update'])->name('pizzas.update');

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


require __DIR__ . '/auth.php';
