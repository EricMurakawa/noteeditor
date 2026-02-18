<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteNoteController extends Controller
{
    public function __invoke($id)
    {
        try {
            DB::beginTransaction();

            $deleted = Note::destroy($id);
            Storage::disk('public')->deleteDirectory("notes/{$id}");

            DB::commit();
            return response()->json($deleted, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
