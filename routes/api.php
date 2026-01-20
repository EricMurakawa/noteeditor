<?php

use App\Http\Controllers\Notes\StoreNoteController;
use App\Http\Controllers\Notes\UpdateNoteController;
use Illuminate\Support\Facades\Route;

Route::post('/notes', StoreNoteController::class);
Route::put('/notes/{note}', UpdateNoteController::class);
