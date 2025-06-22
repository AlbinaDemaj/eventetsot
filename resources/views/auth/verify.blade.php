@extends('layouts.auth')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ lang('website', 'verify_email_title') }}</div>

                    <div class="card-body">
                        @if (session('resent'))
                            <div class="alert alert-success" role="alert">
                                {{ lang('website', 'fresh_link_sent') }}
                            </div>
                        @endif

                        {{ lang('website', 'check_email_message') }}
                        {{ lang('website', 'not_received_email') }}
                        <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                            @csrf
                            <button type="submit"
                                    class="btn btn-link p-0 m-0 align-baseline">
                                {{ lang('website', 'request_another_link') }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
