@extends('layouts.app')

@section('content')
    <div class="login-main">
        <div class="row">
            <div class="col-md-6 d-none d-lg-block">
                <div class="left-area">
                    <img src="{{ asset('user/assets/img/login-img.png') }}" alt="" />
                    <div class="img-text">
                        <h2>Welcome to Eventesot.</h2>
                        <p>Easily gather every guest's photos and videos
                            into a shareable live slideshow</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="right-area">
                    <div class="logo">
                        <img src="{{ asset('user/assets/img/logo.png') }}" alt="" />
                    </div>

                    <div class="form-area">
                        <form method="POST" action="{{ route('password.email') }}">
                            @csrf
                            <div class="form-group">
                                <label for="email">Email</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input id="email" type="email" name="email" value="{{ old('email') }}" placeholder="Enter Email" required>

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <button type="submit" class="login-btn">
                                Reset Instructions <i class="fa-solid fa-rotate"></i>
                            </button>
                        </form>
                        <div class="alread-account">
                            <p>Don’t Have account <a href="{{ route('register') }}">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
