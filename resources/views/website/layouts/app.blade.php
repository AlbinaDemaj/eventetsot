
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="A simple HTML page with all necessary header tags.">
    <meta name="author" content="Your Name">
    <meta name="keywords" content="HTML, basic, header tags">


    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <!-- Stylesheet -->
    <link rel="stylesheet" href="{{ asset('website/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url('website/css/style.css') }}">
    <link rel="stylesheet" href="{{ url('website/css/responsive.css') }}">


    <link rel="stylesheet" type="text/css" href="{{ url('website/css/slick.css') }}"/>
    <!-- Font Awesome 6 CDN -->
    <link rel="stylesheet" href="{{ url('website/css/fa.min.css') }}" />
</head>
<body>
<header class="sticky">
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">

                <a class="navbar-brand" href="{{ route('index') }}"><img src="{{ asset('website/img/logo.svg') }}"></a>
                <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('index') }}">{{lang('website', 'header.home')}}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('pricing') }}">{{lang('website', 'header.pricing')}}</a>
                        </li>
                    </ul>
                    <x-language-switcher />
                    <div class="d-flex gap-4 align-items-center">
                        @guest
                            <a href="{{ route('login') }}" class="nav-link">{{lang('website', 'header.login')}}</a>
                            <a href="{{ route('register') }}" class="btn e-btn-primary">{{lang('website', 'header.get_started')}}</a>
                        @endguest
                        @auth
                            <a href="{{ route('user.home') }}" class="nav-link">{{lang('website', 'header.login')}}</a>
                            <a href="{{ route('user.home') }}" class="btn e-btn-primary">{{lang('website', 'header.get_started')}}</a>
                        @endauth
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>

@yield('content')

<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <img src="{{ asset('website/img/logo.svg') }}">
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <ul class="general">
                        <li><a href="{{ route('index') }}">{{lang('website', 'header.home')}}</a></li>
                        <li><a href="{{ route('pricing') }}">{{lang('website', 'header.pricing')}}</a></li>
                        <li><a href="{{ route('contact') }}">{{lang('website', 'footer.contact')}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <strong>{{lang('website', 'footer.client_center')}}</strong>
                    <ul>
                        <li><a href="#faq">{{lang('website', 'footer.faq')}}</a></li>
                        <li><a href="{{ route('contact') }}">{{lang('website', 'footer.complaints')}}</a></li>
                        <li><a href="{{ route('about') }}">{{lang('website', 'footer.about')}}</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <strong>{{lang('website', 'footer.social')}}</strong>
                    <div class="social-links mt-2">
                        <a href="https://instagram.com/eventetsot"><img src="{{ asset('website/img/ig.svg') }}"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-md-flex align-items-center justify-content-center mt-5">
            <p class="m-0">{{lang('website', 'footer.copyright')}}</p>
        </div>
    </div>
</footer>

<script type="text/javascript" src="{{ asset('website/js/bootstrap.bundle.min.js') }}"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="{{ asset('website/js/jquery-migrate-1.2.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('website/js/slick.min.js') }}"></script>

<script type="text/javascript">

    $('.eslider.a').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.arrowbox.a'),
        centerPadding: '1150px',
        autoplay: true,
        prevArrow: '<span class="slick-prev"><img src="{{ asset('website/img/arrow-left.svg') }}"></span>',
        nextArrow: '<span class="slick-next"><img src="{{ asset('website/img/arrow-right.svg') }}"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.eslider.t').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.arrowbox.t'),
        centerPadding: '1150px',
        autoplay: true,
        prevArrow: '<span class="slick-prev"><img src="{{ asset('website/img/arrow-left.svg') }}"></span>',
        nextArrow: '<span class="slick-next"><img src="{{ asset('website/img/arrow-right.svg') }}"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //Action sheet
    const toggleButtons = document.getElementsByClassName('action-sheet-t');
        const action_sheet = document.getElementsByClassName('e-actionsheet');
        const dismissButtons = document.getElementsByClassName('dismiss-action');
        const body = document.body;

        for (let i = 0; i < toggleButtons.length; i++) {
          toggleButtons[i].addEventListener('click', () => {
            action_sheet[i].classList.toggle('show');

            // Add or remove class on body based on sheet visibility
            if (action_sheet[i].classList.contains('show')) {
              body.classList.add('action-sheet-open');
            } else {
              body.classList.remove('action-sheet-open');
            }
          });

          dismissButtons[i].addEventListener('click', () => {
            action_sheet[i].classList.remove('show');
            body.classList.remove('action-sheet-open');
          });
        }


        $(document).ready(function () {
          $('.image-popup-vertical-fit').magnificPopup({

            type: 'image',
            mainClass: 'mfp-with-zoom',
            gallery: {
              enabled: true
            },
            zoom: {
              enabled: true,
              duration: 300,
              easing: 'ease-in-out',
              opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
              }
            }
          });
        });
</script>
<script>


  </script>
</body>
</html>
