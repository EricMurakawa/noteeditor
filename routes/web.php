<?php

use App\Http\Controllers\Notes\ShowNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Editor/Editor');
})->name('note.new');

Route::get('/{id}', ShowNoteController::class);
