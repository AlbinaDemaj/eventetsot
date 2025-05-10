
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
    <link rel="stylesheet" href="website/css/bootstrap.min.css">
    <link rel="stylesheet" href="website/css/style.css">
    <link rel="stylesheet" href="website/css/responsive.css">

    <link rel="stylesheet" type="text/css" href="website/css/slick.css"/>
    <!-- Font Awesome 6 CDN -->
    <link rel="stylesheet" href="website/css/fa.min.css" />
</head>
<body>
<header>
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a class="navbar-brand" href="{{ route('index') }}"><img src="website/img/logo.svg"></a>
                <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Use Cases
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="{{ route('wedding') }}">Wedding</a></li>
                                <li><a class="dropdown-item" href="{{ route('birthday') }}">Birthday</a></li>
                                <li><a class="dropdown-item" href="{{ route('party') }}">Parties</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('pricing') }}">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('blogs.index') }}">Blog</a>
                        </li>
                    </ul>
                    <div class="d-flex gap-4 align-items-center">
                        <a href="#" class="nav-link">Log in</a>
                        <a href="#" class="btn e-btn-primary">Get started</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</header>

@yield('content')

<section class="ps-cta">
    <div class="c-heading">
        <div class="container">
            <h2>We take event photo sharing seriously</h2>
            <p>Don't settle for less — ensure a seamless and easy event experience for you and <br> your guests.</p>
        </div>
    </div>
    <div class="text-center">
        <img src="website/img/photo-collage.png" class="img-fluid">
    </div>
    <div class="ecomparison py-5 my-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <img src="website/img/logo.svg">
                    <ul class="checkitems">
                        <li>Effortless and smooth experience</li>
                        <li>Beautifully designed digital albums</li>
                        <li>Real-time slideshow</li>
                        <li>Unlimited guests & participants</li>
                        <li>Extensive customization options</li>
                        <li>Get started for free - pay only for extras</li>
                    </ul>
                </div>
                <div class="col-md-6 mt-md-0 mt-4">
                    <h5><strong>Other Photo Sharing Apps</strong></h5>
                    <ul class="checkitems cross">
                        <li>Effortless and smooth experience</li>
                        <li>Beautifully designed digital albums</li>
                        <li>Real-time slideshow</li>
                        <li>Unlimited guests & participants</li>
                        <li>Extensive customization options</li>
                        <li>Get started for free - pay only for extras</li>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-4 gap-2">
                <a href="#" class="btn e-btn-primary">Get Started</a>
                <a href="#" class="btn e-btn-ghost">Try this demo</a>
            </div>
        </div>
    </div>
</section>

<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <img src="website/img/logo.svg">
                <p>Events just got better!</p>
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <strong>General</strong>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Reviews</a></li>
                        <li><a href="#">For Businesses</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <strong>Use Cases</strong>
                    <ul>
                        <li><a href="#">Weddings</a></li>
                        <li><a href="#">Conferences</a></li>
                        <li><a href="#">Corporate</a></li>
                        <li><a href="#">Group Photo Sharing</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3">
                <div class="fnav">
                    <strong>Related</strong>
                    <ul>
                        <li><a href="#">The Guest Alternative</a></li>
                        <li><a href="#">Digital Wedding Guestbook</a></li>
                        <li><a href="#">QR Code for Wedding Pictures</a></li>
                        <li><a href="#">QR Code for Photo Sharing</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="d-md-flex align-items-center justify-content-between mt-5">
            <p class="m-0">© 2024 eventetsot.com. Operated by Eventetsot LLC, 21 Smith Street, Sheridan, WY 82801.</p>
            <div class="social-links">
                <a href=""><img src="website/img/fb.svg"></a>
                <a href=""><img src="website/img/ig.svg"></a>
                <a href=""><img src="website/img/gplus.svg"></a>
            </div>
        </div>
    </div>
</footer>

<script type="text/javascript" src="website/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="website/js//jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="website/js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="website/js/slick.min.js"></script>
<script type="text/javascript">
    $('.eslider.a').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.arrowbox.a'),
        centerPadding: '1150px',
        autoplay: true,
        prevArrow: '<span class="slick-prev"><img src="website/img/arrow-left.svg"></span>',
        nextArrow: '<span class="slick-next"><img src="website/img/arrow-right.svg"></span>',
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
        prevArrow: '<span class="slick-prev"><img src="website/img/arrow-left.svg"></span>',
        nextArrow: '<span class="slick-next"><img src="website/img/arrow-right.svg"></span>',
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
</script>
</body>
</html>
