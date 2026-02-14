<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Models\Note;

class ShowNoteController extends Controller
{
    public function __invoke($id)
    {
        return inertia('Editor/Editor', [
            'note' => Note::findOrFail($id)
        ]);
    }
}
