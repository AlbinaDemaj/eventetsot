@extends('website.layouts.app')

@section('content')
    <section class="about-main">
        <div class="container">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">
                                Redirecting to Payment Gateway - {{ $plan->name }}
                            </div>
                            <div class="card-body text-center">
                                <p>Please wait while we redirect you to the secure payment gateway...</p>
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="paymentFormContainer">
                {!! $formHtml !!}
            </div>
        </div>
    </section>
@endsection
