<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteUpdateRequest;
use App\Jobs\NoteContentProcessJob;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

class UpdateNoteController extends Controller
{
    public function __invoke(NoteUpdateRequest $request, Note $note)
    {
        try {
            DB::beginTransaction();

            $note->update($request->validated());
            NoteContentProcessJob::dispatch($note);

            DB::commit();
            return response()->json($note);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
