@extends('website.layouts.event')

@section('content')

    <div class="add-album h-100">
        <div class="row h-100 g-0">
            <div class="col-md-12">
                <div class="flex-banner h-100 d-flex align-items-center justify-content-center">
                        <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}" />
                        <h4>{{ $event->name }}</h4>
                        <a href="{{ route('events.upload', request()->route('code')) }}" class="btn e-btn-primary"><span>+</span> Shtoni Album</a>
                    </div>
                    <div class="media-count">
                        <p><strong>{{ $event->media()->count() }} Fotografitë, videot dhe postimet</strong></p>
                    </div>
                </div>
            </div>

            <div class="col-md-12 text-center">
                <div class="collage-box d-flex align-items-center justify-content-center flex-column">

                    <div class="img-collage">
                        <div class="child-wrap img-gallery-magnific">
                            @foreach($event->media()->get() as $media)
                                <div class="post-img magnific-img">
                                    <a href="{{ asset('storage/' . $media->file_path) }}" class="image-popup-vertical-fit">
                                        <img src="{{ asset('storage/' . $media->file_path) }}">
                                        @if($media->caption_name || $media->caption_text)
                                            <img src="../website/img/comment.png" class="cmnt-img" />
                                        @endif
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
