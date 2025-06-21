@extends('website.layouts.app')

@section('content')
    <section class="epricing my-5 py-5">
        <div class="container">
            <h1><strong>{{lang('website', 'pricing.title')}}</strong></h1>
            <p>{{lang('website', 'pricing.subtitle')}}</p>
            <div class="row">
                <div class="col-md-6">
                    <div class="pricing-table">
                        <h2><strong>{{ $subscription_plans[0]->name }}</strong><br><small>€</small>{{ substr($subscription_plans[0]->price , 0, -3) }}</h2>
                        <p>{{lang('website', 'pricing.plan1.description')}}</p>
                        <ul class="checkitems mb-4 pricing text-start">
                            <li>{{lang('website', 'pricing.plan1.features.1')}}</li>
                            <li>{{lang('website', 'pricing.plan1.features.2')}}</li>
                            <li>{{lang('website', 'pricing.plan1.features.3')}}</li>
                            <li>{{lang('website', 'pricing.plan1.features.4')}}</li>
                            <li>{{lang('website', 'pricing.plan1.features.5')}}</li>
                            <li>{{lang('website', 'pricing.plan1.features.6')}}</li>
                        </ul>
                        @guest
                            <a href="{{ route('register') }}" class="btn e-btn-primary">{{lang('website', 'pricing.cta')}}</a>
                        @endguest
                        @auth
                            <a href="javascript:" class="btn e-btn-primary">{{lang('website', 'pricing.cta')}}</a>
                        @endauth
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="pricing-table">
                        <h2><strong>{{ $subscription_plans[1]->name }}</strong><br><small>€</small>{{ substr($subscription_plans[1]->price , 0, -3) }}</h2>
                        <p>{{lang('website', 'pricing.plan2.description')}}</p>
                        <ul class="checkitems mb-4 pricing text-start">
                            <li>{{lang('website', 'pricing.plan2.features.1')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.2')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.3')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.4')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.5')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.6')}}</li>
                            <li>{{lang('website', 'pricing.plan2.features.7')}}</li>
                        </ul>
                        @guest
                            <a href="{{ route('register') }}" class="btn e-btn-primary">{{lang('website', 'pricing.cta')}}</a>
                        @endguest

                        @auth
                            <a href="javascript:" onclick="event.preventDefault(); document.getElementById('subscribe-form-1').submit();" class="btn e-btn-primary">
                                {{lang('website', 'pricing.cta')}}
                            </a>
                        @endauth

                        <form id="subscribe-form-1" action="{{ route('subscriptions.subscribe', 2) }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>
            <p class="p-4 text-center">{{lang('website', 'pricing.footer_note')}}</p>
        </div>
    </section>
@endsection
