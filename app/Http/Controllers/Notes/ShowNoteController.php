<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class ShowNoteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        return inertia('Editor/Editor', [
            'note' => Note::findOrFail($id)
        ]);
    }
}
