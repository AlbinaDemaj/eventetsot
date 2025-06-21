<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Eventesot</title>
    <link href="{{ asset('user/css/styles.css') }}" rel="stylesheet" />
    <link href="{{ asset('user/css/custom.css') }}" rel="stylesheet" />
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@eonasdan/tempus-dominus@6.4.4/dist/css/tempus-dominus.min.css" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/css/bootstrap-select.min.css" />
</head>

<body class="sb-nav-fixed">

<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <a class="navbar-brand" href="{{ route('user.home') }}">
                    <img src="{{ asset('website/img/logo.svg') }}" />
                </a>
                <!-- Sidebar Toggle-->
                <button class="btn btn-link sidebar-expand btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </button>
                <div class="form-group">
                    <label for="email">Current Event</label>
                    <form method="POST" action="{{ route('user.switch-event') }}">
                        @csrf
                        <select id="eventSelector" name="event_id" class="my-select selectpicker" data-container="body">
                            @foreach(auth()->user()->events()->latest()->get() as $event)
                                <option value="{{ $event->id }}" {{ $selectedEvent && $selectedEvent->id == $event->id ? 'selected' : '' }}>
                                    {{ $event->name }}
                                </option>
                            @endforeach
                            <option value="create_new">Create New Event</option>
                        </select>
                    </form>
                </div>
                @if($userActiveSubscription->payment_method === 'free')
                    <div class="upgrade-event">
                        <h3 data-bs-toggle="modal" data-bs-target="#pricingModal" data-bs-whatever="@mdo" class="cursor-pointer"><i class="fa-solid fa-star" data-bs-toggle="modal" data-bs-target="#pricingModal" data-bs-whatever="@mdo"></i>Upgrade your event</h3>
                    </div>
                @endif
                <div class="nav">
                    <ul>
                        <li>
                            <a class="nav-link" href="{{ route('user.home') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-house-chimney"></i></div>
                                Home
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="{{ route('user.media') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-photo-film"></i></div>
                                Photo & Video
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="{{ route('user.settings') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-sliders"></i></div>
                                Event Setting
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="{{ route('user.events') }}">
                                <div class="sb-nav-link-icon"><img src="{{ asset('user/assets/img/red-carpet.png') }}" alt=""></div>
                                View Events
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="user-profile">
                        <img src="{{ asset('user/assets/img/user.png') }}" />
                    </div>
                    <div class="name-area">
                        <div class="small">{{ auth()->user()->name }}</div>
                        <p>{{ auth()->user()->email }}</p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <main>
            @if($userActiveSubscription->payment_method === 'free')
                <div class="payment-alert">
                    <div class="alert alert-warning" role="alert">
                        <p><i class="fa-solid fa-info-circle"></i>
                            You're currently using the limited free plan. Upgrade your event to unlock all the features we are offering!</p>

                        <div class="progress-btn">
                            <button type="submit" class="login-btn" data-bs-toggle="modal" data-bs-target="#pricingModal" data-bs-whatever="@mdo">Upgrade Plan</button>
                        </div>
                        <button type="button" class="close-alert" aria-label="Close">&times;</button>
                    </div>
                </div>
            @endif

            <nav class="sb-topnav navbar navbar-expand">
                <!-- Sidebar Toggle-->
                <!-- <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                    <i class="fas fa-bars"></i>
                </button> -->
                <div class="header-text">
                    <h2>Welcome {{ auth()->user()->name }}
                        @if($userActiveSubscription->payment_method === 'free')
                            <span>Free Plan</span>
                        @endif
                    </h2>
                </div>
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false"><img src="{{ asset('user/assets/img/user.png') }}" alt="" /> {{ auth()->user()->name }}</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li><a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
            @yield('content')
        </main>
    </div>
</div>


<!-- Add Event Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content add-event">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Event</h5>
                <button type="button" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-area">
                    <form method="POST" action="{{ route('user.events') }}">
                        @csrf
                        <div class="form-group">
                            <label for="name">Write Event Name</label>
                            <div class="input-wrapper">
                                <div class="input-wrapper">
                                    <input type="text" id="name" name="name" placeholder="Write Here" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="date">Event date</label>
                            <div class="input-wrapper">
                                <input type="date" id="date" name="event_date" placeholder="29-04-2026" required>
                            </div>
                        </div>
                        <button type="submit" class="login-btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>




{{-- Price Modal --}}
<div class="modal fade pricing-modal" id="pricingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body">
                <section class="epricing my-5">
                    <div class="container">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="pricing-table">
                                    <h2><strong>{{ $allSubscriptionPlans[0]->name }}</strong><br><small>€</small>{{ substr($allSubscriptionPlans[0]->price , 0, -3) }}
                                        @if($userActiveSubscription->payment_method === 'free')
                                            <small class="active-message">Abonimi Aktuale</small>
                                        @endif
                                    </h2>
                                    <p>E shkëlqyeshme për ditëlindje, mbledhje familjare dhe ngjarje apo raste të tjera të vogla.</p>
                                    <ul class="checkitems mb-4 pricing text-start">
                                        <li>Deri në 20 ngarkime fotosh dhe videosh</li>
                                        <li>Të ftuar dhe pjesëmarrës të pakufizuar</li>
                                        <li>Ngarkimet ruhen për 7 ditë</li>
                                        <li>Opsione bazë për personalizim</li>
                                        <li>Aktive për 3 orë nga data e eventit</li>
                                        <li>Të gjitha ngarkimet ruhen në cilësi të mirë</li>
                                    </ul>
                                    <a href="javascript;" class="btn login-btn {{ $userActiveSubscription->payment_method === 'free' ? 'active-subs' : '' }}">
                                        @if($userActiveSubscription->payment_method === 'free')
                                            Abonimi Aktuale
                                        @else
                                            Krijoni Eventin Tuaj
                                        @endif
                                    </a>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="pricing-table {{ $userActiveSubscription->payment_method === 'ibas' ? 'active' : '' }}">
                                    <h2><strong>{{ $allSubscriptionPlans[1]->name }}</strong><br><small>€</small>{{ substr($allSubscriptionPlans[1]->price , 0, -3) }}
                                        @if($userActiveSubscription->payment_method === 'ibas')
                                            <small class="active-message">Abonimi Aktuale</small>
                                        @endif
                                    </h2>
                                    <p>Ideale për dasma të mëdha, konferenca, koncerte, festa dhe eventet publike.</p>
                                    <ul class="checkitems mb-4 pricing text-start">
                                        <li>Ngarkime të pakufizuara të fotove dhe videove</li>
                                        <li>Të ftuar dhe pjesëmarrës të pakufizuar</li>
                                        <li>Ngarkimet ruhën për 6 muaj</li>
                                        <li>Opsione të avancuara për personalizim</li>
                                        <li>Aktive për 30 ditë nga data e eventit</li>
                                        <li>Të gjitha ngarkimet ruhën në cilësi të lartë</li>
                                        <li>Shkarkoni të gjitha fotot dhe videot menjëherë</li>
                                    </ul>
                                    <a href="javascript:" class="btn login-btn" data-bs-toggle="modal" data-bs-target="#paymentpay">
                                        Krijoni Eventin Tuaj
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="paymentpay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content ">
            <div class="modal-header">

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
                <div class="payment-modal">
                    <div class="payment-right-side">
                        <h3>Order Summary</h3>
                        <h2>€{{ $allSubscriptionPlans[1]->price }}</h2>
                        <h5><img src="{{ asset('website/img/logo.svg') }}" /> Pro Event</h5>
                        <div class="price-total-main">
                            <div class="price-subtotal">
                                <h4>Subtotal</h4>
                                <h5>€{{ $allSubscriptionPlans[1]->price }}</h5>
                            </div>
                            <div class="price-vat">
                                <h4>VAT</h4>
                                <h5>€0.00</h5>
                            </div>
                            <div class="price-total">
                                <h4>Total</h4>
                                <h5>€{{ $allSubscriptionPlans[1]->price }}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="payment-left-side">
                        <h3>Your details</h3>
                        <p>We collect this information to help combat fraud, and to keep your payment secure.</p>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input type="text" class="form-control" readonly value="{{ auth()->user()->name }}" name="name" placeholder="Email">
                        </div>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input type="text" class="form-control" name="email" value="{{ auth()->user()->email }}" readonly placeholder="email">
                        </div>
                        <button type="button" class="btn login-btn" onclick="event.preventDefault(); document.getElementById('subscribe-form-1').submit();">Continue</button>

                        <form id="subscribe-form-1" action="{{ route('subscriptions.subscribe', 2) }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js"></script>
<script src="https://www.dukelearntoprogram.com/course1/common/js/image/SimpleImage.js"></script>
@include('user.layouts.script')

<script>
    $(document).ready(function () {
        $('.selectpicker').selectpicker();
    });
</script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const closeBtn = document.querySelector(".close-alert");
      const alertBox = document.querySelector(".payment-alert");

      if (closeBtn && alertBox) {
        closeBtn.addEventListener("click", function () {
          alertBox.style.display = "none";
        });
      }
    });
  </script>
  <script>
    var firstTabEl = document.querySelector('#myTab li:last-child a')
    var firstTab = new bootstrap.Tab(firstTabEl)

    firstTab.show()
  </script>
</body>
</html>
