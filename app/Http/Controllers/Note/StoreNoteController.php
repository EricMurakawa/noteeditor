<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteStoreRequest;
use App\Jobs\NoteContentProcessJob;
use App\Models\Note;
use Exception;
use Illuminate\Support\Facades\DB;

class StoreNoteController extends Controller
{
    public function __invoke(NoteStoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $note = Note::create($request->validated());
            NoteContentProcessJob::dispatch($note);

            DB::commit();
            return response()->json($note, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
