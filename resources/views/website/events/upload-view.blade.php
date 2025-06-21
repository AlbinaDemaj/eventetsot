@extends('website.layouts.event')

@section('content')
    <header>
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="{{ route('index') }}"><img src="{{ asset('img/logo.svg') }}"></a>
                    <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('index') }}">{{lang('website', 'header.home')}}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('pricing') }}">{{lang('website', 'header.pricing')}}</a>
                            </li>
                        </ul>
                        <div class="d-flex gap-4 align-items-center">
                            <a href="{{ route('login') }}" class="nav-link">{{lang('website', 'header.login')}}</a>
                            <a href="{{ route('register') }}" class="btn e-btn-primary">{{lang('website', 'header.get_started')</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    <section class="uploaded-photos mt-4 mb-5 pb-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="uploaded-img">
                        <span class="remove-img"><img src="{{ asset('img/trash.svg') }}"></span>
                        <div class="img-box"><img src="{{ asset('img/cta-img.png') }}"></div>
                        <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption">
                            <img src="{{ asset('img/caption.svg') }}"> {{lang('website', 'gallery.add_caption')}}
                        </span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="uploaded-img">
                        <span class="remove-img"><img src="{{ asset('img/trash.svg') }}"></span>
                        <div class="img-box"><img src="{{ asset('img/cta-img.png') }}"></div>
                        <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption">
                            <img src="{{ asset('img/caption.svg') }}"> {{lang('website', 'gallery.add_caption')}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <button class="add-photos btn" onclick="window.location.href='{{ route('events.upload', ['code' => request()->route('code')]) }}';">
        <img src="{{ asset('img/addphotos.svg') }}"> {{lang('website', 'gallery.add_photos')}}
    </button>
    <button class="btn e-btn-primary upload-selected">
        {{lang('website', 'gallery.upload_items', ['count' => 1])}}
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addCaption" tabindex="-1" aria-labelledby="addCaptionLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCaptionLabel">{{lang('website', 'modal.caption.title')}}</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>{{lang('website', 'modal.caption.text_label')</label>
                            <textarea rows="6" cols="6" placeholder="{{lang('website', 'modal.caption.text_placeholder')}}" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label>{{lang('website', 'modal.caption.name_label')}}</label>
                            <input type="text" class="form-control" name="name" placeholder="{{lang('website', 'modal.caption.name_placeholder')}}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" data-bs-dismiss="modal">
                        {{lang('website', 'modal.caption.save_button')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
@endsection
