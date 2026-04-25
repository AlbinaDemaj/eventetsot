@extends('user.layouts.app')

@section('content')
    <div
        id="user-home-root"
        data-event='@json($event)'
    ></div>
@endsection

@push('scripts')
    @viteReactRefresh
    @vite('resources/js/user-home.jsx')
@endpush