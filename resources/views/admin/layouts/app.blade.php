<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Eventesot</title>
    <link href="{{ asset('admin/css/styles.css') }}" rel="stylesheet" />
    <link href="{{ asset('admin/css/custom.css') }}" rel="stylesheet" />
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
                <a class="navbar-brand" href="index.html">
                    <img src="{{ asset('admin/assets/img/logo.png') }}" />
                </a>
                <div class="form-group">
                    <label for="email">Current Event</label>
                    <select class="my-select selectpicker" data-container="body">
                        <option>View Event</option>
                        <option>Create New Event</option>

                    </select>
                </div>
                <div class="nav">
                    <ul>
                        <li>
                            <a class="nav-link" href="index.html">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-house-chimney"></i></div>
                                Home
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="#">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-photo-film"></i></div>
                                Photo & Video
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="#">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-sliders"></i></div>
                                Event Setting
                            </a>
                        </li>
                        <li>
                            <a class="nav-link" href="#">
                                <div class="sb-nav-link-icon"><img src="{{ asset('admin/assets/img/red-carpet.png') }}" alt=""></div>
                                View Event
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="user-profile">
                        <img src="{{ asset('admin/assets/img/user.png') }}" />
                    </div>
                    <div class="name-area">
                        <div class="small">Sam Wheelerc</div>
                        <p>samwheeler@example.com</p>
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
                    <h2>Welcome Sam <span>Free Plan</span></h2>
                </div>
                <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false"><img src="{{ asset('admin/assets/img/user.png') }}" alt="" /> Sam Wheeler</a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            @yield('content')
        </main>

    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js"></script>
<script src="{{ asset('admin/js/scripts.js') }}"></script>

<script>
    $(document).ready(function () {
        $('.selectpicker').selectpicker();
    });
</script>
</body>
</html>
