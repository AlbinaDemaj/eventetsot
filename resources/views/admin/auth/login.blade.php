@extends('layouts.auth')

@section('content')
    <div class="login-main">
        <div class="row">
            <div class="col-md-6 d-none d-lg-block">
                <div class="left-area">
                    <img src="{{ asset('admin/assets/img/login-img.png') }}" alt=""/>
                    <div class="img-text">
                        <h2>Welcome to Eventesot.</h2>
                        <p>Easily gather every guest's photos and videos into a shareable live slideshow</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="right-area">
                    <div class="logo">
                        <img src="{{ asset('admin/assets/img/logo.png') }}" alt=""/>
                    </div>

                    <div style="position:fixed; bottom:0; background:#fff; padding:10px; z-index:1000;">
                        <p>CSRF: {{ csrf_token() }}</p>
                        <p>Session: {{ session()->getId() }}</p>
                        <p>Cookies: {{ json_encode(request()->cookies->all()) }}</p>
                    </div>

                    <div class="form-area">
                        <form method="POST" action="{{ route('admin.login') }}">
                            @csrf
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-wrapper">
                                    <div class="input-wrapper">
                                        <i class="fa-solid fa-envelope"></i>
                                        <input id="email" type="email" name="email" value="{{ old('email') }}"
                                               placeholder="Enter Email" required>

                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input id="password" type="password" name="password" placeholder="Enter Password"
                                           required>

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <button type="submit" class="login-btn">
                                Login <i class="fas fa-right-to-bracket"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
