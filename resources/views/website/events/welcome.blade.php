@extends('website.layouts.event')

@section('content')
    <div class="welcome-bg">
        <div class="center-card" style="background: url({{ $event->background ? asset('storage/' . $event->background) : asset('website/img/card-bg.png') }});">
            <div class="card-caption">
                <div class="img-wrap {{ $event->is_animated ? 'animated-element' : '' }}">
                    <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}">
                </div>
                <h4 class="m-0 {{ $event->is_animated ? 'animated-element-delay-1' : '' }}">{{ $event->name }}</h4>
                <p class="{{ $event->is_animated ? 'animated-element-delay-2' : '' }}">
                    {{ $event->description ?: lang('website','event_welcome.default_description') }}
                </p>
                <form>
                    <div class="input-wrap {{ $event->is_animated ? 'animated-element-delay-3' : '' }}">
                        <input type="text" class="form-control" name="name" placeholder="{{lang('website', 'event_welcome.name_placeholder')}}">
                        <div class="submit-wrap">
                            <input type="button" name="continue" value="{{lang('website', 'event_welcome.continue_button')}}"
                                   onclick="window.location.href='{{ route('events.show', $event->code) }}';">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
