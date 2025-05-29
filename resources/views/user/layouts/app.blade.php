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
                    <img src="{{ asset('user/assets/img/logo.png') }}" />
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
            <nav class="sb-topnav navbar navbar-expand">
                <!-- Sidebar Toggle-->
                <!-- <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                    <i class="fas fa-bars"></i>
                </button> -->
                <div class="header-text">
                    <h2>Welcome {{ auth()->user()->name }} <span>Free Plan</span></h2>
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
</body>
</html>
