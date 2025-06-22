@extends('layouts.auth')

@section('content')
    <div class="login-main">
        <div class="row">
            <div class="col-md-6 d-none d-lg-block">
                <div class="left-area">
                    <img src="{{ asset('user/assets/img/login-img.png') }}" alt=""/>
                    <div class="img-text">
                        <h2>{{ lang('website', 'welcome_title') }}</h2>
                        <p>{{ lang('website', 'welcome_subtitle') }}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-12">
                <div class="right-area">
                    <div class="logo">
                        <img src="{{ asset('website/img/logo.svg') }}" alt=""/>
                    </div>
                    <div class="auth-btn">
                        <div class="btn-single">
                            <a href="javascript:">
                                <button class="spectacledcoder-hover-fill-button active login" type="button">
                                    <div class="color-fill"></div>
                                    <p>{{ lang('website', 'login') }}</p>
                                </button>
                            </a>
                        </div>
                        <div class="btn-single">
                            <a href="{{ route('register') }}">
                                <button class="spectacledcoder-hover-fill-button signup" type="button">
                                    <div class="color-fill"></div>
                                    <p>{{ lang('website', 'register') }}</p>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div class="form-area">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="form-group">
                                <label for="email">{{ lang('website', 'email') }}</label>
                                <div class="input-wrapper">
                                    <div class="input-wrapper">
                                        <i class="fa-solid fa-envelope"></i>
                                        <input id="email" type="email" name="email" value="{{ old('email') }}"
                                               placeholder="{{ lang('website', 'email') }}" required>

                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">{{ lang('website', 'password') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input id="password" type="password" name="password"
                                           placeholder="{{ lang('website', 'password') }}" required>

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="forgot-password">
                                <a href="{{ route('password.request') }}">{{ lang('website', 'forgot_password') }}</a>
                            </div>

                            <button type="submit" class="login-btn">
                                {{ lang('website', 'submit_login') }} <i class="fas fa-right-to-bracket"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
