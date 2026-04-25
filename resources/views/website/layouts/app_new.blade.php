<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'EventetSot') }}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('website/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('website/css/style-new.css') }}">
    <link rel="stylesheet" href="{{ asset('website/css/responsive-new.css') }}">
    <link rel="stylesheet" href="{{ asset('website/css/fa.min.css') }}">
</head>
<body>

<header class="site-header">
    <div class="container">
        <nav class="navbar navbar-expand-lg custom-navbar">
            <div class="container-fluid px-0">
                <a class="navbar-brand site-logo" href="{{ route('index') }}">
                    <img src="{{ asset('website/img/logo.svg') }}" alt="EventetSot Logo">
                </a>

                <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="mainNavbar">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0 nav-center-links">
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('index') }}">{{ lang('website', 'header.home') }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('pricing') }}">{{ lang('website', 'header.pricing') }}</a>
                        </li>
                    </ul>

                    <div class="nav-actions d-flex align-items-center gap-3">
                        <x-language-switcher />

                        @guest
                            <a href="{{ route('login') }}" class="nav-link login-link">
                                {{ lang('website', 'header.login') }}
                            </a>
                            <a href="{{ route('register') }}" class="btn btn-primary-custom">
                                {{ lang('website', 'header.get_started') }}
                            </a>
                        @endguest

                        @auth
                            <a href="{{ route('user.home') }}" class="nav-link login-link">
                                {{ lang('website', 'header.login') }}
                            </a>
                            <a href="{{ route('user.home') }}" class="btn btn-primary-custom">
                                {{ lang('website', 'header.get_started') }}
                            </a>
                        @endauth
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>

<main>
    @yield('content')
</main>

<footer class="site-footer">
    <div class="container">
        <div class="row g-4 footer-top">
            <div class="col-lg-4 col-md-6">
                <div class="footer-brand">
                    <img src="{{ asset('website/img/logo.svg') }}" alt="EventetSot Logo">
                    <p class="footer-text">
                        EventetSot helps you create elegant digital event experiences, share memories instantly, and keep every guest connected in one place.
                    </p>
                </div>
            </div>

            <div class="col-lg-2 col-md-6">
                <div class="footer-links">
                    <h5>Pages</h5>
                    <ul>
                        <li><a href="{{ route('index') }}">{{ lang('website', 'header.home') }}</a></li>
                        <li><a href="{{ route('pricing') }}">{{ lang('website', 'header.pricing') }}</a></li>
                        <li><a href="{{ route('contact') }}">{{ lang('website', 'footer.contact') }}</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="footer-links">
                    <h5>{{ lang('website', 'footer.client_center') }}</h5>
                    <ul>
                        <li><a href="#faq">{{ lang('website', 'footer.faq') }}</a></li>
                        <li><a href="{{ route('contact') }}">{{ lang('website', 'footer.complaints') }}</a></li>
                        <li><a href="{{ route('about') }}">{{ lang('website', 'footer.about') }}</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-3 col-md-6">
                <div class="footer-links">
                    <h5>{{ lang('website', 'footer.social') }}</h5>
                    <div class="social-links">
                        <a href="https://instagram.com/eventetsot" target="_blank">
                            <img src="{{ asset('website/img/ig.svg') }}" alt="Instagram">
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom text-center">
            <p>{{ lang('website', 'footer.copyright') }}</p>
        </div>
    </div>
</footer>

<script src="{{ asset('website/js/bootstrap.bundle.min.js') }}"></script>
</body>
</html>