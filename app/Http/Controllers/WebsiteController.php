<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('website.index');
    }

    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function party()
    {
        return view('website.party');
    }

    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function birthday()
    {
        return view('website.birthday');
    }

    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function wedding()
    {
        return view('website.wedding');
    }

    /**
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function pricing()
    {
        $subscription_plans = SubscriptionPlan::get();
        return view('website.pricing', compact('subscription_plans'));
    }

    public function contact()
    {
        return view('website.contact');
    }
    public function contactAnkesa()
    {
        return view('website.contactAnkesa');
    }
    public function about()
    {
        return view('website.about');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function wallOfLove()
    {
        return view('wall-of-love');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function blogs()
    {
        return view('website.blogs.index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function blogDetail($slug)
    {
        return view('website.blogs.show');
    }
}
