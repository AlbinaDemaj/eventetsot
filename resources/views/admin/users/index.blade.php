@extends('admin.layouts.app')

@section('content')
    <div class="container-fluid">
@php
    $selectedEvent = null;
    @endphp
        <div class="main-content">
            <div class="create-event-head">
                <div class="view-event-text">
                    <h2>Users</h2>
                    <p>Here you can find all Users</p>
                </div>
            </div>
            <div class="row">
                @foreach($users as $user)
                    <div class="col-md-4 mb-4">
                        <div class="event-card">
                            <div class="event-card-header">
                                <h3>{{ $user->name }}</h3>
                            </div>
                            <span class="plan-badge text-capitalize">{{ $user->email }}</span>
                            <div class="event-card-list">
                                <i class="fa-solid fa-calendar-days"></i>
                                <h5><span>Created on</span> {{ $user->created_at->format('d M Y') }}</h5>
                            </div>
                            @if($user->activeSubscription()->first()->payment_method === 'free')
                                <div class="event-card-btn">
                                    Free Subscription
                                </div>
                            @else
                                <div class="event-card-btn">
                                    Paid Subscription
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>


@endsection
