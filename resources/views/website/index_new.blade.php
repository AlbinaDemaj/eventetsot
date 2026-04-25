@extends('website.layouts.app_new')

@section('content')
    <section class="hero-section">
        <div class="hero-blur hero-blur-one"></div>
        <div class="hero-blur hero-blur-two"></div>

        <div class="container">
            <div class="row align-items-center hero-row">
                <div class="col-lg-6">
                    <div class="hero-content">
                        <span class="hero-badge">Digital Event Experience</span>

                        <h1>
                            {{ lang('website', 'home.hero.title_part1') }}<br>
                            <strong>
                                {{ lang('website', 'home.hero.title_part2') }}<br>
                                {{ lang('website', 'home.hero.title_part3') }}
                                <span class="text-gradient">{{ lang('website', 'home.hero.title_part4') }}</span>
                            </strong>
                        </h1>

                        <p>
                            {{ lang('website', 'home.hero.subtitle') }}
                        </p>

                        <div class="hero-actions d-flex flex-wrap gap-3">
                            <a href="{{ route('register') }}" class="btn btn-primary-custom">
                                {{ lang('website', 'home.hero.cta.primary') }}
                            </a>
                            <a href="#demo-preview" class="btn btn-outline-custom">
                                {{ lang('website', 'home.hero.cta.secondary') }}
                            </a>
                        </div>

                        <div class="hero-stats">
                            <div class="hero-stat-card">
                                <strong>{{ lang('website', 'home.steps.1.title') }}</strong>
                                <span>{{ lang('website', 'home.steps.1.description') }}</span>
                            </div>
                            <div class="hero-stat-card">
                                <strong>{{ lang('website', 'home.steps.2.title') }}</strong>
                                <span>{{ lang('website', 'home.steps.2.description') }}</span>
                            </div>
                            <div class="hero-stat-card">
                                <strong>{{ lang('website', 'home.steps.3.title') }}</strong>
                                <span>{{ lang('website', 'home.steps.3.description') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="hero-visual">
                        <div class="hero-image-wrap">
                            <img src="{{ asset('website/img/photo.png') }}" alt="EventetSot Hero Image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="preview-section" id="demo-preview">
        <div class="container">
            <div class="section-heading">
                <h2>{{ lang('website', 'home.sharing.title') }}</h2>
                <p>{{ lang('website', 'home.sharing.subtitle') }}</p>
            </div>

            <div class="row g-4 align-items-center">
                <div class="col-lg-4">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <img src="{{ asset('website/img/guest-photos.svg') }}" alt="">
                        </div>
                        <h3>{{ lang('website', 'home.features.1.title') }}</h3>
                        <p>{{ lang('website', 'home.features.1.description') }}</p>
                    </div>

                    <div class="feature-card mt-4">
                        <div class="feature-icon">
                            <img src="{{ asset('website/img/posts.svg') }}" alt="">
                        </div>
                        <h3>{{ lang('website', 'home.features.2.title') }}</h3>
                        <p>{{ lang('website', 'home.features.2.description') }}</p>
                    </div>
                </div>

                <div class="col-lg-4 text-center">
                    <div class="phone-preview-card">
                        <video class="appDemo mw-100" autoplay loop muted playsinline poster="{{ asset('website/img/wedding-demo-poster.jpg') }}" src="{{ asset('website/img/video-1.mp4') }}"></video>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <img src="{{ asset('website/img/usage.svg') }}" alt="">
                        </div>
                        <h3>{{ lang('website', 'home.features.3.title') }}</h3>
                        <p>{{ lang('website', 'home.features.3.description') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection