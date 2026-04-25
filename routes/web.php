<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TemplateMediaController;
use App\Http\Controllers\WebsiteController;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [WebsiteController::class, 'index'])->name('index');

Route::get('/events', [WebsiteController::class, 'events'])->name('events');
Route::get('/categories', [WebsiteController::class, 'categories'])->name('categories');
Route::get('/about', [WebsiteController::class, 'about'])->name('about');
Route::get('/contact', [WebsiteController::class, 'contact'])->name('contact');

/*
|--------------------------------------------------------------------------
| Existing Website Routes
|--------------------------------------------------------------------------
*/

Route::get('/party', [WebsiteController::class, 'party'])->name('party');
Route::get('/birthday', [WebsiteController::class, 'birthday'])->name('birthday');
Route::get('/wedding', [WebsiteController::class, 'wedding'])->name('wedding');
Route::get('/pricing', [WebsiteController::class, 'pricing'])->name('pricing');
Route::get('/blogs', [WebsiteController::class, 'blogs'])->name('blogs.index');
Route::get('/blogs/{slug}', [WebsiteController::class, 'show'])->name('blogs.show');
Route::get('/contactAnkesa', [WebsiteController::class, 'contactAnkesa'])->name('contactAnkesa');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Auth::routes();

/*
|--------------------------------------------------------------------------
| Event / Media Routes
|--------------------------------------------------------------------------
*/

Route::get('/events/welcome/{code}', [EventController::class, 'show'])->name('events.show');
Route::get('/events/{code}', [EventController::class, 'welcome'])->name('events.welcome');
Route::get('/upload/{code}', [EventController::class, 'upload'])->name('events.upload');
Route::post('/media', [MediaController::class, 'store'])->name('media.store');
Route::get('/events/{id}/load-more-media', [EventController::class, 'loadMoreMedia'])->name('events.load-more-media');

Route::post('/media-comment', [MediaController::class, 'mediaComment'])->name('media.comment');

/*
|--------------------------------------------------------------------------
| Utility Routes
|--------------------------------------------------------------------------
*/

Route::get('/fix-qrcodes', function () {
    $events = Event::where('code', 'NgomFest')->get();

    foreach ($events as $event) {
        $url = url('/events/' . $event->code);
        $qrCode = base64_encode(
            QrCode::format('svg')->size(200)->generate($url)
        );

        $event->qr_code = 'data:image/svg+xml;base64,' . $qrCode;
        $event->save();
    }

    return 'QR codes regenerated for ' . count($events) . ' events';
});

Route::get('/set-locale/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'sq'])) {
        session()->put('locale', $locale);
    }

    return back();
})->name('set-locale');

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/templates', [TemplateMediaController::class, 'create'])->name('templates');
    Route::post('/templates', [TemplateMediaController::class, 'store']);

    Route::post('/subscriptions/{plan}/subscribe', [SubscriptionController::class, 'subscribe'])
        ->name('subscriptions.subscribe');

    Route::get('/subscriptions/{plan}/payment/callback', [SubscriptionController::class, 'handlePaymentCallback'])
        ->name('subscription.payment.callback');

    Route::get('/subscriptions/{plan}/payment/redirect', [SubscriptionController::class, 'handlePaymentRedirect'])
        ->name('subscription.payment.redirect');
});

/*
|--------------------------------------------------------------------------
| Split Route Files
|--------------------------------------------------------------------------
*/

require __DIR__ . '/admin.php';
require __DIR__ . '/user.php';