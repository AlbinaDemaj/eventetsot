@extends('website.layouts.app')

@section('content')
    <section class="about-main">
        <div class="container">
            <div class="row how-works-box align-items-center">
                <div class="tbox col-md-6">
                    <h4>{{lang('website', 'about.title')}}</h4>
                    <p>{{lang('website', 'about.paragraph1')}}</p>
                    <p>{{lang('website', 'about.paragraph2')}}</p>
                    <p>{{lang('website', 'about.paragraph3')}}</p>
                </div>
                <div class="col-md-6">
                    <img src="{{ asset('img/sideimage-1.png') }}" class="img-fluid">
                </div>
            </div>
        </div>
    </section>
@endsection
