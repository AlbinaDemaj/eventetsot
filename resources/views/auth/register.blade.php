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
                            <a href="{{ route('login') }}">
                                <button class="spectacledcoder-hover-fill-button login" type="button">
                                    <div class="color-fill"></div>
                                    <p>{{ lang('website', 'login') }}</p>
                                </button>
                            </a>
                        </div>
                        <div class="btn-single">
                            <a href="javascript:">
                                <button class="spectacledcoder-hover-fill-button active signup" type="button">
                                    <div class="color-fill"></div>
                                    <p>{{ lang('website', 'register') }}</p>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div class="form-area">
                        <form method="POST" action="{{ route('register') }}">
                            @csrf
                            <div class="form-group">
                                <label for="name">{{ lang('website', 'name') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-user"></i>
                                    <input id="name" type="text" name="name" value="{{ old('name') }}"
                                           placeholder="{{ lang('website', 'name_placeholder') }}" required>

                                    @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email">{{ lang('website', 'email') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input id="email" type="email" name="email" value="{{ old('email') }}"
                                           placeholder="{{ lang('website', 'email_placeholder') }}" required>

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">{{ lang('website', 'password') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input id="password" type="password" name="password"
                                           placeholder="{{ lang('website', 'password_placeholder') }}" required>

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password-confirm">{{ lang('website', 'confirm_password') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input id="password-confirm" type="password" name="password_confirmation"
                                           placeholder="{{ lang('website', 'password_placeholder') }}" required>
                                </div>
                            </div>
                            <button type="submit" class="login-btn">
                                {{ lang('website', 'create_account') }} <i class="fa-solid fa-user-plus"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
