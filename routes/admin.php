<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\SubscriptionPlanController;
use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\AdminUserPremiumController;

Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
    });

    Route::middleware('auth:admin')->group(function () {

        Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/settings', [DashboardController::class, 'settings'])->name('settings');

        Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');

            // Jep Premium nga admini
            Route::post('/{user}/grant-premium', 'grantPremium')->name('grant-premium');

            Route::get('/{user}', 'show')->name('show');
            Route::get('/{user}/edit', 'edit')->name('edit');
            Route::put('/{user}', 'update')->name('update');
            Route::delete('/{user}', 'destroy')->name('destroy');
            Route::patch('/{user}/toggle-status', 'toggleStatus')->name('toggle-status');
        });

        Route::controller(EventController::class)->prefix('events')->name('events.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/{event}', 'show')->name('show');
            Route::get('/{event}/edit', 'edit')->name('edit');
            Route::put('/{event}', 'update')->name('update');
            Route::delete('/{event}', 'destroy')->name('destroy');
        });

        Route::controller(SubscriptionPlanController::class)->prefix('plans')->name('plans.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
            Route::post('/', 'store')->name('store');
            Route::get('/{plan}', 'show')->name('show');
            Route::get('/{plan}/edit', 'edit')->name('edit');
            Route::put('/{plan}', 'update')->name('update');
            Route::delete('/{plan}', 'destroy')->name('destroy');
            Route::patch('/{plan}/toggle-status', 'toggleStatus')->name('toggle-status');
        });
        Route::patch('/users/{user}/give-premium', [AdminUserPremiumController::class, 'givePremium'])
    ->name('admin.users.give-premium');

Route::patch('/users/{user}/remove-premium', [AdminUserPremiumController::class, 'removePremium'])
    ->name('admin.users.remove-premium');

    });
});