<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\TemplateMediaController;
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
Route::get('/contact', [WebsiteController::class, 'contact'])->name('contact');
Route::get('/contactAnkesa', [WebsiteController::class, 'contactAnkesa'])->name('contactAnkesa');
Route::get('/about', [WebsiteController::class, 'about'])->name('about');

Route::middleware('auth')->group(function() {
    Route::get('templates', [TemplateMediaController::class, 'create'])->name('templates');
    Route::post('templates', [TemplateMediaController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {

    Route::get('/events/{code}', [EventController::class, 'show'])->name('events.show');
    Route::get('/upload/{code}', [EventController::class, 'upload'])->name('events.upload');
    Route::get('/upload-view/{code}', [EventController::class, 'uploadView'])->name('events.upload-view');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');

});

require __DIR__.'/admin.php';
require __DIR__.'/user.php';
