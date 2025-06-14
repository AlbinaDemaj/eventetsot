@extends('user.layouts.onboarding')

@section('content')
    <div class="lets-go-main">
        <div class="lets-inner">
            <div class="lets-logo">
                <img src="{{ asset('website/img/logo.svg') }}" alt="" />
            </div>
            <form method="POST" action="{{ route('user.onboarding.event-date') }}">
                @csrf
                <div class="lets-card">
                    <h2>When will your event take place?</h2>
                    <p>Go ahead and select a date if you’ve already got one in mind.</p>
                    <div class="form-area">
                        <div class="form-group">
                            <div class="input-wrapper">
                                <div class="input-group" id="datepicker" data-td-target-input="nearest" data-td-target-toggle="nearest">
                                    <input type="date" name="event_date" class="form-control" data-td-target="#datepicker" placeholder="MM/DD/YYYY" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="login-btn">
                        Create my Event <i class="fa-solid fa-angles-right"></i>
                    </button>
                    <div class="alread-account">
                        <p class="dont-account">The Date is to be Decided.</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
