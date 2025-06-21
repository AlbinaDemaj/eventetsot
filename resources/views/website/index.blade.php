@extends('website.layouts.app')

@section('content')
    <section class="master-head d-flex align-items-center">
        <div class="container">
            <div class="caption">
                <h1>{{lang('website', 'home.hero.title_part1')}}<br>
                    <strong>{{lang('website', 'home.hero.title_part2')}}  <br>
                        {{lang('website', 'home.hero.title_part3')}}  <span class="e-text-primary">{{lang('website', 'home.hero.title_part4')}}</span> <img src="{{ asset('website/img/heart.svg') }}">
                    </strong>
                </h1>
                <p>{{lang('website', 'home.hero.subtitle')}}</p>
                <div class="d-flex gap-2 slider_btn">
                    <a href="#" class="btn e-btn-primary">{{lang('website', 'home.hero.cta.primary')}}</a>
                    <a href="#" class="btn e-btn-ghost action-sheet-t">{{lang('website', 'home.hero.cta.secondary')}}</a>
                </div>
                <div class="d-flex flex-wrap gap-4 mt-4 e-steps">
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="{{ asset('website/img/step-1.png') }}"></div>
                        <div class="txt"><strong class="d-block">{{lang('website', 'home.steps.1.title')}}</strong> {{lang('website', 'home.steps.1.description')}}</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="{{ asset('website/img/step-2.png') }}"></div>
                        <div class="txt"><strong class="d-block">{{lang('website', 'home.steps.2.title')}}</strong> {{lang('website', 'home.steps.2.description')}}</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="{{ asset('website/img/step-3.png') }}"></div>
                        <div class="txt"><strong class="d-block">{{lang('website', 'home.steps.3.title')}}</strong> {{lang('website', 'home.steps.3.description')}}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="c-heading">
        <div class="container">
            <h2>{{lang('website', 'home.sharing.title')}}</h2>
            <p>{{lang('website', 'home.sharing.subtitle')}}</p>
        </div>
    </div>

    <section class="e-sharing">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4 text-center mbl-view">
                    <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="{{ asset('website/img/wedding-demo-poster.jpg') }}"
                           src="{{ asset('website/img/video-1.mp4') }}">
                    </video>
                </div>
                <div class="col-md-4">
                    <div class="box-item">
                        <div class="icon-span">
                            <img src="{{ asset('website/img/guest-photos.svg') }}">
                        </div>
                        <strong>{{lang('website', 'home.features.1.title')}}</strong>
                        <p>{{lang('website', 'home.features.1.description')}}</p>
                    </div>
                    <div class="box-item ">
                        <div class="icon-span">
                            <img src="{{ asset('website/img/posts.svg') }}">
                        </div>
                        <strong>{{lang('website', 'home.features.2.title')}}</strong>
                        <p>{{lang('website', 'home.features.2.description')}}</p>
                    </div>
                </div>
                <div class="col-md-4 text-center desktop-view">
                    <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="{{ asset('website/img/wedding-demo-poster.jpg') }}" src="{{ asset('website/img/video-1.mp4') }}">
                    </video>
                </div>
                <div class="col-md-4">
                    <div class="box-item box-mobile">
                        <div class="icon-span">
                            <img src="{{ asset('website/img/usage.svg') }}">
                        </div>
                        <strong>{{lang('website', 'home.features.3.title')}}</strong>
                        <p>{{lang('website', 'home.features.3.description')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="how-it-works">
        <div class="container">
            <div class="c-heading">
                <div class="container">
                    <h2>{{lang('website', 'home.how_it_works.title')}}</h2>
                    <p>{{lang('website', 'home.how_it_works.subtitle')}}</p>
                </div>
            </div>
            <div class="row how-works-box align-items-center">
                <div class="tbox col-md-6">
                    <span class="ecount">1</span>
                    <h4>{{lang('website', 'home.steps.1.heading')}}</h4>
                    <p>{{lang('website', 'home.steps.1.description_long')}}</p>
                </div>
                <div class="col-md-6">
                    <img src="{{ asset('website/img/sideimage-1.png') }}" class="img-fluid">
                </div>
            </div>
            <div class="row how-works-box align-items-center">
                <div class="col-md-6 d-md-block d-none">
                    <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="{{ asset('website/img/sidevidimg-1.png') }}" src="{{ asset('website/img/sidevid-2.webm') }}"></video>
                </div>
                <div class="tbox col-md-6">
                    <span class="ecount">2</span>
                    <h4>{{lang('website', 'home.steps.2.heading')}}</h4>
                    <p>{{lang('website', 'home.steps.2.description_long')}}
                    <ul>
                        <li>{{lang('website', 'home.steps.2.bullets.1')}}</li>
                        <li>{{lang('website', 'home.steps.2.bullets.2')}}</li>
                        <li>{{lang('website', 'home.steps.2.bullets.3')}}</li>
                    </ul></p>
                </div>
                <div class="col-md-6 d-md-none">
                    <video class="appDemo mw-100" autoplay="" loop="" muted="" playsinline="" poster="{{ asset('website/img/sidevidimg-1.png') }}" src="{{ asset('website/img/sidevid-2.webm') }}"></video>
                </div>
            </div>
            <div class="row works-how align-items-center">
                <div class="tbox col-md-6">
                    <span class="ecount">3</span>
                    <h4>{{lang('website', 'home.steps.3.heading')}}</h4>
                    <p>{{lang('website', 'home.steps.3.description_long')}}
                    <ul>
                        <li>{{lang('website', 'home.steps.3.bullets.1')}}</li>
                        <li>{{lang('website', 'home.steps.3.bullets.2')}}</li>
                    </ul></p>
                </div>
                <div class="col-md-6 d-md-block d-none">
                    <img src="{{ asset('website/img/sideimg-2.png') }}" class="img-fluid">
                </div>
                <div class="col-md-6 d-md-none">
                    <img src="{{ asset('website/img/sideimg-2.png') }}" class="img-fluid">
                </div>
            </div>
        </div>
    </section>

    <section class="ecarousel">
        <div class="c-heading">
            <div class="container">
                <h2>{{lang('website', 'home.features_slider.title')}}</h2>
                <p>{{lang('website', 'home.features_slider.subtitle')}}</p>
            </div>
        </div>
        <div class="container">
            <div class="arrowbox a"></div>
            <div class="eslider a">
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="{{ asset('website/img/digital-album.svg') }}"></span>
                        <span class="title">{{lang('website', 'home.features_slider.1.title')}}</span>
                        <p>{{lang('website', 'home.features_slider.1.description')}}</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="{{ asset('website/img/digital-album.svg') }}"></span>
                        <span class="title">{{lang('website', 'home.features_slider.2.title')}}</span>
                        <p>{{lang('website', 'home.features_slider.2.description')}}</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="{{ asset('website/img/digital-album.svg') }}"></span>
                        <span class="title">{{lang('website', 'home.features_slider.3.title')}}</span>
                        <p>{{lang('website', 'home.features_slider.3.description')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="e-info-grid" id="faq">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h1>{{lang('website', 'home.faq.title')}}</h1>
                    <p>{{lang('website', 'home.faq.subtitle')}}</p>
                    <div class="row">
                        <div class="col-md-6 accordian-column">
                            <div class="accordion" id="eAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingSix">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix"
                                                aria-expanded="false" aria-controls="collapseSix">
                                            {{lang('website', 'home.faq.1.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.1.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingSeven">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                            {{lang('website', 'home.faq.2.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.2.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingEight">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                            {{lang('website', 'home.faq.3.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.3.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingNine">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                            {{lang('website', 'home.faq.4.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.4.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTen">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen"
                                                aria-expanded="false" aria-controls="collapseTen">
                                            {{lang('website', 'home.faq.5.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.5.answer')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="accordion" id="eAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                            {{lang('website', 'home.faq.6.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.6.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                            {{lang('website', 'home.faq.7.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.7.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">
                                            {{lang('website', 'home.faq.8.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.8.answer')}}
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingFour">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                aria-expanded="false" aria-controls="collapseFour">
                                            {{lang('website', 'home.faq.9.question')}}
                                        </button>
                                    </h2>
                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                         data-bs-parent="#myAccordion">
                                        <div class="accordion-body">
                                            {{lang('website', 'home.faq.9.answer')}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="e-actionsheet">
        <div class="content-scroll">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <h2><strong>{{lang('website', 'home.demo.title')}}</strong></h2>
                        <p>{{lang('website', 'home.demo.subtitle')}}</p>
                        <span class="l-number"><span class="number">1</span><span><strong>{{lang('website', 'home.demo.step1')}}</strong></span></span>
                        <span class="l-number"><span class="number">2</span><span><strong>{{lang('website', 'home.demo.step2')}}</strong></span></span>
                        <div class="qr-code d-flex align-items-center flex-column gap-3 pt-5">
                            <img src="{{ $publicEvent->qr_code }}">
                            <span>{{lang('website', 'home.demo.qr_label')}}</span>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <img src="{{ asset('website/img/actionimg.png') }}" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
        <span class="dismiss-action"><img src="{{ asset('website/img/cross-1.svg') }}" /></span>
    </div>
@endsection

{{--    <!DOCTYPE html>--}}
{{--<html lang="en">--}}
{{--<head>--}}
{{--    <meta charset="UTF-8" />--}}
{{--    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>--}}
{{--    <title>EventetSot – Coming Soon</title>--}}
{{--    <style>--}}
{{--        * {--}}
{{--            box-sizing: border-box;--}}
{{--        }--}}

{{--        body, html {--}}
{{--            margin: 0;--}}
{{--            padding: 0;--}}
{{--            height: 100%;--}}
{{--            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;--}}
{{--        }--}}

{{--        .main-container {--}}
{{--            display: flex;--}}
{{--            height: 100vh;--}}
{{--            flex-direction: row;--}}
{{--        }--}}

{{--        .left-section {--}}
{{--            background-color: #1A1A1A;--}}
{{--            color: #FDF6E3;--}}
{{--            flex: 1;--}}
{{--            display: flex;--}}
{{--            flex-direction: column;--}}
{{--            justify-content: center;--}}
{{--            align-items: center;--}}
{{--            padding: 40px;--}}
{{--            text-align: center;--}}
{{--        }--}}

{{--        .left-section img.logo {--}}
{{--            max-width: 180px;--}}
{{--            margin-bottom: 30px;--}}
{{--        }--}}

{{--        .left-section h1 {--}}
{{--            font-size: 2.8rem;--}}
{{--            margin-bottom: 20px;--}}
{{--            color: #D38D00;--}}
{{--        }--}}

{{--        .left-section p {--}}
{{--            font-size: 1.2rem;--}}
{{--            margin-bottom: 30px;--}}
{{--            max-width: 400px;--}}
{{--            line-height: 1.5;--}}
{{--        }--}}

{{--        .instagram-button {--}}
{{--            display: inline-block;--}}
{{--            background-color: #D38D00;--}}
{{--            color: white;--}}
{{--            text-decoration: none;--}}
{{--            padding: 12px 24px;--}}
{{--            border-radius: 5px;--}}
{{--            font-weight: bold;--}}
{{--            transition: background 0.3s ease;--}}
{{--        }--}}

{{--        .instagram-button:hover {--}}
{{--            background-color: #a76f00;--}}
{{--        }--}}

{{--        .right-section {--}}
{{--            flex: 1;--}}
{{--            background-image: url('https://eventetsot.com/website/img/photo.png'); /* Replace with your image */--}}
{{--            background-size: cover;--}}
{{--            background-position: -970px center;--}}
{{--        }--}}

{{--        @media (max-width: 768px) {--}}
{{--            .main-container {--}}
{{--                flex-direction: column;--}}
{{--            }--}}
{{--            .right-section {--}}
{{--                height: 50vh;--}}
{{--            }--}}

{{--            .right-section {--}}
{{--                background-position: -400px center !important;--}}
{{--            }--}}
{{--        }--}}
{{--    </style>--}}
{{--</head>--}}
{{--<body>--}}

{{--<div class="main-container">--}}
{{--    <div class="left-section">--}}
{{--        <img src="https://eventetsot.com/website/img/logo.svg" alt="Eventetsot Logo" class="logo" />--}}
{{--        <h1>Coming Soon</h1>--}}
{{--        <p>We’re working on something amazing for your events. Stay tuned for Eventetsot!</p>--}}
{{--        <a href="https://instagram.com/eventetsot" target="_blank" class="instagram-button">--}}
{{--            Follow us on Instagram--}}
{{--        </a>--}}
{{--    </div>--}}
{{--    <div class="right-section"></div>--}}
{{--</div>--}}

{{--</body>--}}
{{--</html>--}}
