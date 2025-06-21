<?php
namespace App\Http\Middleware;

use Closure;
use App\Models\Language;

class SetLocale
{
    public function handle($request, Closure $next)
    {
        if ($request->has('lang')) {
            $language = Language::where('code', $request->lang)->first();
            if ($language) {
                app()->setLocale($language->code);
                session()->put('locale', $language->code);
            }
        } elseif (session()->has('locale')) {
            app()->setLocale(session()->get('locale'));
        } else {
            $defaultLanguage = Language::where('is_default', true)->first();
            if ($defaultLanguage) {
                app()->setLocale($defaultLanguage->code);
            }
        }

        return $next($request);
    }
}
