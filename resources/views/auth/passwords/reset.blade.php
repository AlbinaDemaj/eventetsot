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

                    <div class="form-area">
                        <form method="POST" action="{{ route('password.update') }}">
                            @csrf
                            <input type="hidden" name="token" value="{{ $token }}">

                            <div class="form-group">
                                <label for="email">{{ lang('website', 'email_label') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input id="email" type="email" name="email" value="{{ $email ?? old('email') }}"
                                           placeholder="{{ lang('website', 'email_placeholder') }}" required>
                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password">{{ lang('website', 'password_label') }}</label>
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
                                <label for="password-confirm">{{ lang('website', 'confirm_password_label') }}</label>
                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input id="password-confirm" type="password" name="password_confirmation"
                                           placeholder="{{ lang('website', 'password_placeholder') }}" required>
                                </div>
                            </div>

                            <button type="submit" class="login-btn">
                                {{ lang('website', 'reset_password_button') }} <i class="fa-solid fa-rotate"></i>
                            </button>
                        </form>
                        <div class="alread-account">
                            <p>{{ lang('website', 'dont_have_account') }} <a href="{{ route('register') }}">{{ lang('website', 'sign_up') }}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
