<?php

use App\Http\Controllers\WebsiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/', [WebsiteController::class, 'index'])->name('index');
Route::get('/party', [WebsiteController::class, 'party'])->name('party');
Route::get('/birthday', [WebsiteController::class, 'birthday'])->name('birthday');
Route::get('/wedding', [WebsiteController::class, 'wedding'])->name('wedding');
Route::get('/pricing', [WebsiteController::class, 'pricing'])->name('pricing');
Route::get('/blogs', [WebsiteController::class, 'blogs'])->name('blogs.index');
Route::get('/blogs/{slug}', [WebsiteController::class, 'show'])->name('blogs.show');

require __DIR__.'/admin.php';
require __DIR__.'/user.php';
