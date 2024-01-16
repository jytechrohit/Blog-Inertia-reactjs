<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $todos = Todo::paginate(5);
        return Inertia::render('Todos/Index', [
            'todos' => $todos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Todos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'is_done' => 'required|integer',
            'content' => 'required|string|max:255',
        ]);

        $todo = Todo::create($request->all());

        session()->flash('success', 'Todo created successfully. Thank you.');
        return redirect()->back();
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $todo = Todo::findOrFail($id);
        return Inertia::render('Todos/Edit', [
            'todo' => $todo,
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo, $id)
    {

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'is_done' => 'required|integer',
            'content' => 'required|string|max:255',
        ]);
        $todo = Todo::find($id);

        $todo->save($request->all());
        return redirect()->back()->with('success', 'todo record successfully updated');
    }


    public function destroy($id)
    {

        $Todo = Todo::find($id);
        $Todo->delete();
        session()->flash('warning', 'You did it. Thank you');
        return redirect()->back();
    }
}
