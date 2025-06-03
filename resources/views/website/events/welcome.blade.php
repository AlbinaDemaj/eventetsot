@extends('website.layouts.event')

@section('content')

    <div class="welcome-bg">
        <div class="center-card">
            <div class="card-caption">
                <div class="img-wrap">
                    <img src="{{ asset('website/img/img-round.jpg') }}">
                </div>
                <h4 class="m-0">Sam Dasma</h4>
                <p>Ju lutemi ndani fotot dhe videot tuaja me ne për këtë ditë të veçantë!</p>
                <form>
                    <div class="input-wrap">
                        <input type="text" class="form-control" name="name" placeholder="Shkruani Emrin Këtu">
                        <div class="submit-wrap">
                            <input type="button" name="continue" onclick="window.location.href='{{ route('events.show', $event->code) }}';">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection
