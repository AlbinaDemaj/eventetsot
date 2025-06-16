@extends('website.layouts.event')

@section('content')

    <div class="add-album">
         <div class="add-album-banner">

             <div class="flex-banner" style="background: url({{ $event->background ? asset('storage/' . $event->background) : '../website/img/flex-banner.jpg'}}); background-size: cover; min-height: 70vh; background-position: center; position: relative; flex-direction: column; display: flex; align-items: center; justify-content: center;">
                    <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}" />
                    <h4>{{ $event->name }}</h4>
                    <a href="{{ route('events.upload', request()->route('code')) }}" class="btn e-btn-primary"><span>+</span> Shtoni Album</a>
                </div>
                <div class="media-count">
                    <p><strong>{{ $event->media()->count() }} Fotografitë, videot dhe postimet</strong></p>
                </div>
            </div>
        </div>
         <div class="collage-box">

            <div class="img-collage">
                <div class="child-wrap img-gallery-magnific">
                    @foreach($event->media()->get() as $media)
                        @if($media->file_type === 'video/mp4')
                        <div class="post-img magnific-img">
                            <video controls>
                                <source src="{{ asset('storage/' . $media->file_path) }}" type="{{ $media->file_type }}">
                                Your browser does not support the video tag.
                            </video>
                            @if($media->caption_name || $media->caption_text)
                                <img src="../website/img/comment.png" class="cmnt-img" />
                            @endif
                        </div>
                        @else
                            <div class="post-img magnific-img">
                                <a href="{{ asset('storage/' . $media->file_path) }}" class="image-popup-vertical-fit">
                                    <img src="{{ asset('storage/' . $media->file_path) }}">
                                    @if($media->caption_name || $media->caption_text)
                                        <img src="../website/img/comment.png" class="cmnt-img" />
                                    @endif
                                </a>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    </div>

@endsection
