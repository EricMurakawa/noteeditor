<?php

use App\Http\Controllers\Note\ShowNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Editor/Editor');
})->name('note.new');

Route::get('/{id}', ShowNoteController::class);
