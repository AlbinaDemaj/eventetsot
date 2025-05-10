@extends('website.layouts.app')

@section('content')
    <section class="master-head party d-flex align-items-center">
        <div class="container">
            <div class="caption">
                <h1>Party Photo<br>
                    <strong>
                        Sharing
                        <span class="e-text-primary">Made Simple</span> <img src="website/img/heart.svg">
                    </strong></h1>
                <p>This app is a simple and fun way to collect photos & videos from your guests into a beautiful digital album and stream it on a live photo wall.</p>
                <div class="d-flex gap-2">
                    <a href="#" class="btn e-btn-primary">Get Started</a>
                    <a href="#" class="btn e-btn-ghost">Try this demo</a>
                </div>
                <div class="d-flex flex-wrap gap-4 mt-4 e-steps">
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="website/img/step-1.png"></div>
                        <div class="txt"><strong class="d-block">Step 1</strong> Sign-up & create your event</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="website/img/step-2.png"></div>
                        <div class="txt"><strong class="d-block">Step 2</strong> Join with a link or QR scan</div>
                    </div>
                    <div class="d-flex gap-2 align-items-center">
                        <div class="icon"><img src="website/img/step-3.png"></div>
                        <div class="txt"><strong class="d-block">Step 3</strong> Enjoy all captured moments!</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="c-heading">
        <div class="container">
            <h2>Event Photo Sharing Made Easy</h2>
            <p>Collect & share photos and videos with your guests in a stunning <br> digital album - setup is a breeze, and sharing is even easier.</p>
        </div>
    </div>
    <section class="e-sharing">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4">
                    <div class="box-item">
                        <div class="icon-span">
                            <img src="website/img/guest-photos.svg">
                        </div>
                        <strong>Guests Photos & Videos</strong>
                        <p>Experience your event through your guests' eyes by collecting every photo and video they take!</p>
                    </div>
                    <div class="box-item">
                        <div class="icon-span">
                            <img src="website/img/posts.svg">
                        </div>
                        <strong>Text Posts & Captions</strong>
                        <p>Allow guests to share messages as decorated text posts or captions alongside their photos and videos.</p>
                    </div>
                </div>
                <div class="col-md-4 text-center">
                    <img src="website/img/mobile-phone.png" class="img-fluid">
                </div>
                <div class="col-md-4">
                    <div class="box-item">
                        <div class="icon-span">
                            <img src="website/img/usage.svg">
                        </div>
                        <strong>Guests Photos & Videos</strong>
                        <p>Experience your event through your guests' eyes by collecting every photo and video they take!</p>
                    </div>
                    <div class="box-item">
                        <div class="icon-span">
                            <img src="website/img/slideshow.svg">
                        </div>
                        <strong>Text Posts & Captions</strong>
                        <p>Allow guests to share messages as decorated text posts or captions alongside their photos and videos.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="how-it-works">
        <div class="container">
            <div class="c-heading">
                <div class="container">
                    <h2>How does it work?</h2>
                    <p>Hassle-free experience - for you and your guests.</p>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="tbox col-md-6">
                    <span class="ecount">1</span>
                    <h4>Create your event</h4>
                    <p>Create a private digital album for guests to add photos, <br> videos, and messages. Customize the title, date, colors, <br> and backgrounds to make it your own!</p>
                </div>
                <div class="col-md-6">
                    <img src="website/img/timg-1.png" class="img-fluid">
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-md-6 d-md-block d-none">
                    <img src="website/img/timg-2.png" class="img-fluid">
                </div>
                <div class="tbox col-md-6">
                    <span class="ecount">2</span>
                    <h4>Share it with your guests</h4>
                    <p>Your guests can easily view or contribute photos and <br> videos to your digital album by scanning the unique QR <br> code or using the album URL—before, during, and after <br> your event!</p>
                </div>
                <div class="col-md-6 d-md-none">
                    <img src="website/img/timg-2.png" class="img-fluid">
                </div>
            </div>
            <div class="row align-items-center">
                <div class="tbox col-md-6">
                    <span class="ecount">3</span>
                    <h4>Display it all on a live slideshow</h4>
                    <p>Create a private digital album for guests to add photos, videos, and messages. Customize the title, date, colors, and backgrounds to make it your own!</p>
                </div>
                <div class="col-md-6">
                    <img src="website/img/timg-3.png" class="img-fluid">
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-md-6 d-md-block d-none">
                    <img src="website/img/timg-4.png" class="img-fluid">
                </div>
                <div class="tbox col-md-6">
                    <span class="ecount">2</span>
                    <h4>Enjoy all captured moments</h4>
                    <p>At any given moment you can view all the photos and <br> videos captured by your guests in your own digital album. <br> Revisit and cherish those unforgettable memories!</p>
                </div>
                <div class="col-md-6 d-md-none">
                    <img src="website/img/timg-4.png" class="img-fluid">
                </div>
            </div>
        </div>
    </section>


    <section class="ecarousel">
        <div class="c-heading">
            <div class="container">
                <h2>All you need for a perfect event</h2>
                <p>From digital albums to QR code templates - we've got it all covered</p>
            </div>
        </div>
        <div class="container">
            <div class="arrowbox a"></div>
            <div class="eslider a">
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">Digital Album</span>
                        <p>All photos and videos are automatically saved in a digital album for you to access at any time.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">One-click Download</span>
                        <p>All photos and videos are automatically saved in a digital album for you to access at any time.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">QR Code Templates</span>
                        <p>Get a unique QR code to print on cards and signs for guests to access your digital album easily.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">Live Photo Wall</span>
                        <p>A live slideshow featuring photos and videos uploaded by you and your guests.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">Digital Album</span>
                        <p>All photos and videos are automatically saved in a digital album for you to access at any time.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">Digital Album</span>
                        <p>All photos and videos are automatically saved in a digital album for you to access at any time.</p>
                    </div>
                </div>
                <div class="ebox">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/digital-album.svg"></span>
                        <span class="title">Digital Album</span>
                        <p>All photos and videos are automatically saved in a digital album for you to access at any time.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-dark my-5 py-5">
        <div class="container">
            <div class="cta-container overflow-hidden">
                <div class="row">
                    <div class="col-md-7 p-5">
                        <h2 class="cta-heading">Event Photo Sharing For Any Occasion</h2>
                        <p class="cta-desc">From intimate weddings to grand conferences, we've got every moment covered.</p>
                        <div class="cta-grid-wrap">
                            <div class="cta-grid">
                                <div class="d-flex align-items-center gap-3">
                                    <img src="website/img/ring.svg">
                                    <h5 class="m-0">Weddings</h5>
                                </div>
                                <p>Collect every moment of it</p>
                                <a href="" class="e-link-primary">Learn More<img src="website/img/arrow-right.svg" class="px-3"></a>
                            </div>
                            <div class="cta-grid">
                                <div class="d-flex align-items-center gap-3">
                                    <img src="website/img/conference.svg">
                                    <h5 class="m-0">Conferences & Public Events</h5>
                                </div>
                                <p>Engage with your audience</p>
                                <a href="" class="e-link-primary">Learn More<img src="website/img/arrow-right.svg" class="px-3"></a>
                            </div>
                            <div class="cta-grid">
                                <div class="d-flex align-items-center gap-3">
                                    <img src="website/img/birthday.svg">
                                    <h5 class="m-0">Birthdays</h5>
                                </div>
                                <p>Celebrate with your loved ones</p>
                                <a href="" class="e-link-primary">Learn More<img src="website/img/arrow-right.svg" class="px-3"></a>
                            </div>
                            <div class="cta-grid">
                                <div class="d-flex align-items-center gap-3">
                                    <img src="website/img/parties.svg">
                                    <h5 class="m-0">Parties & Celebrations</h5>
                                </div>
                                <p>Share photos & have fun</p>
                                <a href="" class="e-link-primary">Learn More<img src="website/img/arrow-right.svg" class="px-3"></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <img src="website/img/cta-img.png" class="st-img">
                    </div>
                </div>
            </div>
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

    <section class="e-testimonial">
        <div class="c-heading">
            <div class="container">
                <h2>All you need for a perfect event</h2>
                <p>From digital albums to QR code templates - we've got it all covered</p>
            </div>
        </div>
        <div class="container">
            <div class="arrowbox t"></div>
            <div class="eslider t">
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
                    </div>
                </div>
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
                    </div>
                </div>
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
                    </div>
                </div>
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
                    </div>
                </div>
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
                    </div>
                </div>
                <div class="ebox avatar">
                    <div class="p-4">
                        <span class="circle-icon"><img src="website/img/avatar.jpg"></span>
                        <span class="title">Jacquelin D’Ripper</span>
                        <span class="mb-3 d-block"><img src="website/img/stars.svg"></span>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar felis sit amet cursus varius. Sed ac tellus non nisl tincidunt faucibus.</p>
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
