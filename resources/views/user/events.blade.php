@extends('user.layouts.app')

@section('content')
    <div class="container-fluid">

        <div class="main-content">
            <div class="create-event-head">
                <div class="view-event-text">
                    <h2>My Events</h2>
                    <p>Here you can find all you events or create new ones
                        Create new event</p>
                </div>
                <button type="submit" class="login-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-circle-plus"></i> Create Event
                </button>
            </div>
            <div class="row">
                @foreach(auth()->user()->events()->latest()->get() as $event)
                <div class="col-md-4 mb-4">
                    <div class="event-card">
                        <div class="event-card-header">
                            <h3>{{ $event->name }}</h3>
                        </div>
                        <span class="plan-badge text-capitalize">{{ $event->type }}</span>
                        <div class="event-card-list">
                            <i class="fa-solid fa-image"></i>
                            <h5><span>0</span> Upload</h5>
                        </div>
                        <div class="event-card-list">
                            <i class="fa-solid fa-calendar-days"></i>
                            <h5><span>Created on</span> {{ $event->created_at->format('d M Y') }}</h5>
                        </div>
                        @if($selectedEvent && $selectedEvent->id == $event->id)
                            <div class="event-card-btn">
                                Current Event
                            </div>
                        @else
                            <form id="switch-form-{{ $event->id }}" method="POST" action="{{ route('user.switch-event') }}">
                                @csrf
                                <input type="hidden" name="event_id" value="{{ $event->id }}">
                            </form>

                            <div onclick="document.getElementById('switch-form-{{ $event->id }}').submit()" class="event-card-btn cursor-pointer">
                                Switch Event
                            </div>
                        @endif
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection
