@extends('user.layouts.onboarding')

@section('content')
    <div class="lets-go-main">
        <div class="lets-inner">
            <div class="lets-logo">
                <img src="{{ asset('user/assets/img/logo.png') }}" alt="" />
            </div>
            <div class="lets-card">
                <h2>Welcome {{ auth()->user()->name }}</h2>
                <p>Let’s get your digital album and photo wall in no-time</p>
                <a href="{{ route('user.onboarding.event-name') }}" class="login-btn">
                    Let’s Go <i class="fas fa-right-to-bracket"></i>
                </a>
                <div class="alread-account">
                    <p class="dont-account">Don’t You? <a href="#">Sign out</a></p>
                </div>
            </div>
        </div>
    </div>
@endsection
