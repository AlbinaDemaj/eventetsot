<?php

use App\Http\Controllers\User\EventController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\MediaController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\SettingController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {

    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/media', [MediaController::class, 'index'])->name('media');
    Route::get('/media/{id}', [MediaController::class, 'destroy'])->name('media.destroy');
    Route::get('/media/{id}/download-media', [EventController::class, 'downloadMedia'])->name('media.download');

    Route::prefix('onboarding')->name('onboarding.')->group(function () {
        Route::get('/', [OnboardingController::class, 'index'])->name('index');

        Route::get('/event-name', [OnboardingController::class, 'eventName'])->name('event-name');
        Route::post('/event-name', [OnboardingController::class, 'saveEventName']);

        Route::get('/event-date', [OnboardingController::class, 'eventDate'])->name('event-date');
        Route::post('/event-date', [OnboardingController::class, 'saveEventDate']);
    });

    Route::get('/settings', [SettingController::class, 'index'])->name('settings');
    Route::post('/settings', [SettingController::class, 'saveSettings']);
    Route::post('/settings-code/{id}', [SettingController::class, 'updateCode'])->name('settings-code');
    Route::get('/events', [EventController::class, 'index'])->name('events');
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
    Route::post('/switch-event', [EventController::class, 'switchEvent'])->name('switch-event');

});



