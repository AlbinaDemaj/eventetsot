@extends('user.layouts.onboarding')

@section('content')
    <div class="lets-go-main">
        <div class="lets-inner">
            <div class="lets-logo">
                <img src="{{ asset('website/img/logo.svg') }}" alt="" />
            </div>
            <form method="POST" action="{{ route('user.onboarding.event-name') }}">
                @csrf
                <div class="lets-card">
                    <h2>What would you like to name your event?</h2>
                    <p>No pressure — you can always change it later.</p>
                    <div class="form-area">
                        <div class="form-group">
                            <div class="input-wrapper">
                                <img src="{{ asset('user/assets/img/event.png') }}" alt="" />
                                <input type="text" id="event_name" name="event_name" placeholder="Enter Event Name" required>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="login-btn">
                        Continue <i class="fa-solid fa-angles-right"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection
