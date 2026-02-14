<?php

use App\Http\Controllers\Note\ListNoteController;
use App\Http\Controllers\Note\StoreNoteController;
use App\Http\Controllers\Note\UpdateNoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('/notes')->group(function() {
    Route::get('/', ListNoteController::class);
    Route::post('/', StoreNoteController::class);
    Route::put('/{note}', UpdateNoteController::class);
});
