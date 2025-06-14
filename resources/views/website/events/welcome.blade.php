@extends('website.layouts.event')

@section('content')
    <div class="welcome-bg">
        <div class="center-card" style="background: url({{ asset('storage/' .$event->background) ?? '../website/img/card-bg.png' }});">
            <div class="card-caption">
                <div class="img-wrap {{ $event->is_animated ? 'animated-element' : '' }}">
                    <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}">
                </div>
                <h4 class="m-0 {{ $event->is_animated ? 'animated-element-delay-1' : '' }}">{{ $event->name }}</h4>
                <p class="{{ $event->is_animated ? 'animated-element-delay-2' : '' }}">{{ $event->description ? $event->description : 'Ju lutemi ndani fotot dhe videot tuaja me ne për këtë ditë të veçantë!' }}</p>
                <form>
                    <div class="input-wrap {{ $event->is_animated ? 'animated-element-delay-3' : '' }}">
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
