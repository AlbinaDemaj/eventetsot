<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SubscriptionController;
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

Route::get('/events/{code}', [EventController::class, 'show'])->name('events.show');
Route::get('/upload/{code}', [EventController::class, 'upload'])->name('events.upload');
Route::post('/media', [MediaController::class, 'store'])->name('media.store');

Route::middleware('auth')->group(function() {
    Route::get('templates', [TemplateMediaController::class, 'create'])->name('templates');
    Route::post('templates', [TemplateMediaController::class, 'store']);


    Route::post('/subscriptions/{plan}/subscribe', [SubscriptionController::class, 'subscribe'])
        ->name('subscriptions.subscribe');

    // Payment handling routes
    Route::post('/subscriptions/{plan}/payment/callback',
        [SubscriptionController::class, 'handlePaymentCallback'])
        ->name('subscription.payment.callback');

    Route::get('/subscriptions/{plan}/payment/redirect',
        [SubscriptionController::class, 'handlePaymentRedirect'])
        ->name('subscription.payment.redirect');
});


require __DIR__.'/admin.php';
require __DIR__.'/user.php';
