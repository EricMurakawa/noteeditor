<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteUpdateRequest;
use App\Models\Note;

class UpdateNoteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NoteUpdateRequest $request, Note $note)
    {
        $note->update($request->validated());

        return response()->json(['message' => 'Nota salva com sucesso!']);
    }
}
