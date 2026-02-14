<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class ListNoteController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = Note::select($request->select ?? ['*'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json($data);
    }
}
