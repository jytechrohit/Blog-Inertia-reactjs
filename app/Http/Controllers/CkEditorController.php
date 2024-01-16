<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CkEditorController extends Controller
{
    public function index()
    {
        //dd('here code');

        return Inertia::render('CKEditorPage', [
            'content' => 'Initial content here',
        ]);
    }
}
