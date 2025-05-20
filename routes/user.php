<?php

use App\Http\Controllers\User\EventController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\SettingController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {

    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::prefix('onboarding')->name('onboarding.')->group(function () {
        Route::get('/', [OnboardingController::class, 'index'])->name('index');

        Route::get('/event-name', [OnboardingController::class, 'eventName'])->name('event-name');
        Route::post('/event-name', [OnboardingController::class, 'saveEventName']);

        Route::get('/event-date', [OnboardingController::class, 'eventDate'])->name('event-date');
        Route::post('/event-date', [OnboardingController::class, 'saveEventDate']);
    });

    Route::get('/settings', [SettingController::class, 'index'])->name('settings');
    Route::post('/settings', [SettingController::class, 'saveSettings']);
    Route::get('/events', [EventController::class, 'index'])->name('events');
    Route::post('/events', [EventController::class, 'store']);
    Route::post('/switch-event', [EventController::class, 'switchEvent'])->name('switch-event');

});



