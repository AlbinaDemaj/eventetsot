<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    public function index()
    {
        return view('website.react', [
            'page' => 'home',
        ]);
    }

    public function events()
    {
        return view('website.react', [
            'page' => 'events',
        ]);
    }

    public function categories()
    {
        return view('website.react', [
            'page' => 'categories',
        ]);
    }

    public function about()
    {
        return view('website.react', [
            'page' => 'about',
        ]);
    }

    public function contact()
    {
        return view('website.react', [
            'page' => 'contact',
        ]);
    }

    public function party()
    {
        return view('website.party');
    }

    public function birthday()
    {
        return view('website.birthday');
    }

    public function wedding()
    {
        return view('website.wedding');
    }

    public function pricing()
    {
        $subscription_plans = SubscriptionPlan::get();
        return view('website.pricing', compact('subscription_plans'));
    }

    public function contactAnkesa()
    {
        return view('website.contactAnkesa');
    }

    public function wallOfLove()
    {
        return view('wall-of-love');
    }

    public function blogs()
    {
        return view('website.blogs.index');
    }

    public function show($slug)
    {
        return view('website.blogs.show', compact('slug'));
    }
}