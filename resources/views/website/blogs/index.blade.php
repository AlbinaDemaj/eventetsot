@extends('website.layouts.app')

@section('content')

    <section class="eblog my-5 py-5">
        <div class="container">
            <h1><strong>Blog</strong></h1>
            <p>See whats happening and get updates.</p>
            <div class="row">
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="blog-grid">
                        <div class="img-box">
                            <img src="{{ asset('website/img/blog-1.png') }}">
                        </div>
                        <p class="mt-3"><strong>September 18, 2024  |  0 comment</strong></p>
                        <h4><strong>The Meaning Behind Popular Flowers</strong></h4>
                        <p class="text-muted">Donec at nunc et felis vehicula imperdiet. Aliquam ac nulla...</p>
                    </div>
                </div>
            </div>
            <p class="p-4 text-center">*Prices are in US Dollars. All our plans are subject to our Terms of Use & Fair Usage Policy.</p>
        </div>
    </section>

    <section class="e-info-grid">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>Unforgettable Events Moments</h1>
                    <p>Find answers to common questions about our services, therapy, and mental well-being.</p>
                    <div class="client-logos">
                        <div class="comp-logo">
                            <img src="website/img/company-1.png">
                        </div>
                        <div class="comp-logo">
                            <img src="website/img/company-1.png">
                        </div>
                        <div class="comp-logo">
                            <img src="website/img/company-1.png">
                        </div>
                        <div class="comp-logo">
                            <img src="website/img/company-1.png">
                        </div>
                        <div class="comp-logo">
                            <img src="website/img/company-1.png">
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <a href="#" class="btn e-btn-primary">Get Started</a>
                        <a href="#" class="btn e-btn-ghost">Try this demo</a>
                    </div>
                </div>
                <div class="col-md-6 mt-md-0 mt-5">
                    <h1>Questions?</h1>
                    <p>Find answers to common questions about our services, therapy, and mental well-being.</p>
                    <div class="accordion" id="eAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    How do I book a therapy session?
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#myAccordion">
                                <div class="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> You can customize this content as needed.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Are online sessions available?
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#myAccordion">
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    What’s the difference between therapy and coaching?
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#myAccordion">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> Customize it as needed.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Do I need a subscription to access services?
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#myAccordion">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> Customize it as needed.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="internal-cta">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h1>A Party You'll Never Forget</h1>
                    <p>At any given moment you can view all the photos and videos captured by your guests in your own digital album. Revisit and cherish those unforgettable memories!</p>
                    <a href="#" class="btn e-btn-primary">Create your Event</a>
                </div>
                <div class="col-md-6 mt-md-0 mt-5">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/iecZQVxvjCM?si=qEGY73R0I86SiaeA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </section>
@endsection
