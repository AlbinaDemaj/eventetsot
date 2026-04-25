@extends('website.layouts.app')

@section('content')
    @php
        $plans = $subscription_plans ?? collect();
        $activeSubscription = auth()->check() ? auth()->user()->activeSubscription : null;
        $activePlanId = $activeSubscription?->plan_id;
    @endphp

    <section class="my-5 py-5" style="background: linear-gradient(180deg, #fcfbff 0%, #f8f6ff 55%, #ffffff 100%);">
        <div class="container">
            <div class="text-center mx-auto mb-5" style="max-width: 760px;">
                <span
                    class="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-3"
                    style="background:#f4efff; color:#7B61FF; font-size:12px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;"
                >
                    Pricing Plans
                </span>

                <h1 class="fw-bold mb-3" style="font-size: clamp(2rem, 4vw, 3.4rem); color:#0f172a;">
                    {{ lang('website', 'pricing.title') }}
                </h1>

                <p class="mb-0" style="font-size:1rem; line-height:1.9; color:#64748b;">
                    {{ lang('website', 'pricing.subtitle') }}
                </p>
            </div>

            @if(session('success'))
                <div class="alert alert-success rounded-4 border-0 shadow-sm mb-4">
                    {{ session('success') }}
                </div>
            @endif

            @if(session('error'))
                <div class="alert alert-danger rounded-4 border-0 shadow-sm mb-4">
                    {{ session('error') }}
                </div>
            @endif

            <div class="row g-4 justify-content-center">
                @forelse($plans as $plan)
                    @php
                        $isActive = auth()->check() && $activePlanId === $plan->id;
                        $isPopular = $loop->last;
                        $isFree = (float) $plan->price <= 0;
                    @endphp

                    <div class="col-lg-6 col-xl-5">
                        <div
                            class="h-100 position-relative rounded-5 p-4 p-lg-5"
                            style="
                                background: {{ $isPopular
                                    ? 'linear-gradient(180deg,#ffffff 0%,#faf7ff 100%)'
                                    : '#ffffff' }};
                                border: 1px solid {{ $isPopular ? '#e7dcff' : '#ece8f8' }};
                                box-shadow: 0 22px 55px rgba(15,23,42,0.06);
                            "
                        >
                            @if($isPopular)
                                <span
                                    class="position-absolute top-0 start-50 translate-middle px-3 py-2 rounded-pill"
                                    style="background:linear-gradient(135deg,#7B61FF,#8F7DFF); color:#fff; font-size:12px; font-weight:700;"
                                >
                                    Most Popular
                                </span>
                            @endif

                            <div class="d-flex align-items-start justify-content-between gap-3 mb-4">
                                <div>
                                    <p class="mb-2 text-uppercase fw-bold" style="font-size:12px; letter-spacing:.14em; color:#7B61FF;">
                                        {{ $isFree ? 'Starter Plan' : 'Premium Plan' }}
                                    </p>

                                    <h2 class="fw-bold mb-2" style="font-size:2rem; color:#0f172a;">
                                        {{ $plan->name }}
                                    </h2>

                                    <p class="mb-0" style="color:#64748b; line-height:1.8;">
                                        {{ $isFree
                                            ? lang('website', 'pricing.plan1.description')
                                            : lang('website', 'pricing.plan2.description') }}
                                    </p>
                                </div>

                                @if($isActive)
                                    <span class="px-3 py-2 rounded-pill" style="background:#ecfdf3; color:#15803d; font-size:12px; font-weight:700;">
                                        Active Plan
                                    </span>
                                @endif
                            </div>

                            <div class="mb-4">
                                <div class="d-flex align-items-end gap-2">
                                    <span class="fw-bold" style="font-size:3rem; line-height:1; color:#0f172a;">
                                        €{{ rtrim(rtrim(number_format((float) $plan->price, 2, '.', ''), '0'), '.') }}
                                    </span>
                                    <span class="pb-2" style="color:#94a3b8;">/ plan</span>
                                </div>
                            </div>

                            <ul class="list-unstyled mb-4">
                                @if($isFree)
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.1') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.2') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.3') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.4') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.5') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan1.features.6') }}</span>
                                    </li>
                                @else
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.1') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.2') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.3') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.4') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.5') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.6') }}</span>
                                    </li>
                                    <li class="d-flex align-items-start gap-3 mb-3">
                                        <span style="color:#7B61FF;">✓</span>
                                        <span>{{ lang('website', 'pricing.plan2.features.7') }}</span>
                                    </li>
                                @endif
                            </ul>

                            @guest
                                <a
                                    href="{{ route('register') }}"
                                    class="btn w-100 rounded-pill py-3 fw-semibold"
                                    style="background:linear-gradient(135deg,#7B61FF,#8F7DFF); color:#fff; border:none;"
                                >
                                    {{ lang('website', 'pricing.cta') }}
                                </a>
                            @endguest

                            @auth
                                @if($isActive)
                                    <button
                                        type="button"
                                        class="btn w-100 rounded-pill py-3 fw-semibold"
                                        style="background:#eef2ff; color:#4338ca; border:none;"
                                        disabled
                                    >
                                        Plani aktual
                                    </button>
                                @else
                                    <a
                                        href="javascript:void(0);"
                                        onclick="event.preventDefault(); document.getElementById('subscribe-form-{{ $plan->id }}').submit();"
                                        class="btn w-100 rounded-pill py-3 fw-semibold"
                                        style="background:linear-gradient(135deg,#7B61FF,#8F7DFF); color:#fff; border:none;"
                                    >
                                        {{ $isFree ? 'Fillo falas' : lang('website', 'pricing.cta') }}
                                    </a>

                                    <form
                                        id="subscribe-form-{{ $plan->id }}"
                                        action="{{ route('subscriptions.subscribe', $plan->id) }}"
                                        method="POST"
                                        style="display:none;"
                                    >
                                        @csrf
                                    </form>
                                @endif
                            @endauth
                        </div>
                    </div>
                @empty
                    <div class="col-12">
                        <div class="text-center rounded-5 bg-white p-5 shadow-sm" style="border:1px solid #ece8f8;">
                            <h3 class="fw-bold mb-3" style="color:#0f172a;">Nuk ka plane të disponueshme</h3>
                            <p class="mb-0" style="color:#64748b;">
                                Ju lutem shtoni planet nga admin paneli për t’i shfaqur këtu.
                            </p>
                        </div>
                    </div>
                @endforelse
            </div>

            <p class="pt-5 text-center" style="color:#64748b;">
                {{ lang('website', 'pricing.footer_note') }}
            </p>
        </div>
    </section>
@endsection