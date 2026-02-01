<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteUpdateRequest;
use App\Jobs\NoteContentProcessJob;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

class UpdateNoteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NoteUpdateRequest $request, Note $note)
    {
        try {
            DB::beginTransaction();

            $note->update($request->validated());
            NoteContentProcessJob::dispatch($note);

            DB::commit();
            return response()->json(['message' => 'Nota salva com sucesso!']);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
