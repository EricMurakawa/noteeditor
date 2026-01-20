<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteStoreRequest;
use App\Models\Note;

class StoreNoteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NoteStoreRequest $request)
    {
        $validated = $request->validated();

        $note = Note::create([
            'title'   => data_get($validated, 'title'),
            'content' => data_get($validated, 'content'),
        ]);

        return response()->json($note, 201);
    }
}
