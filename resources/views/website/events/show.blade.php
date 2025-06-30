@extends('website.layouts.event')

@section('content')
    <div class="add-album">
        <div class="add-album-banner">
            <div class="flex-banner" style="background: url({{ $event->background ? asset('storage/' . $event->background) : asset('website/img/flex-banner.jpg')}}); background-size: cover; min-height: 70vh; background-position: center; position: relative; flex-direction: column; display: flex; align-items: center; justify-content: center;">
                <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}" />
                <h4>{{ $event->name }}</h4>
                <a href="{{ route('events.upload', request()->route('code')) }}" class="btn e-btn-primary">
                    <span>+</span> {{lang('website', 'event.add_album')}}
                </a>
            </div>
            <div class="media-count">
                <p><strong>{{ $event->media()->count() }} {{lang('website', 'event.media_count')}}</strong></p>
            </div>
        </div>
    </div>

    <div class="collage-box">
        <div class="img-collage">
            <div class="child-wrap img-gallery-magnific" id="media-gallery">
                @foreach($event->media()->latest()->get() as $media)
                    @if($media->file_type === 'video/mp4')
                        <div class="post-img magnific-img">
                            <video controls preload="metadata" poster="{{ asset('website/img/video-placeholder.jpg') }}">
                                <source src="{{ asset('storage/' . $media->file_path) }}" type="{{ $media->file_type }}">
                                {{lang('website', 'event.video_unsupported')}}
                            </video>
                            @if($media->caption_name || $media->caption_text)
                                <img src="{{ asset('website/img/comment.png') }}" class="cmnt-img" loading="lazy" />
                            @endif
                        </div>
                    @else
                        <div class="post-img magnific-img">
                            <a href="{{ asset('storage/' . $media->file_path) }}" class="image-popup-vertical-fit">
                                <img
                                    src="{{ asset('storage/' . $media->file_path) }}"
                                    loading="lazy"
                                    data-src="{{ asset('storage/' . $media->file_path) }}"
                                    class="lazy-load"
                                    alt="{{ $media->caption_name ?? 'Event image' }}"
                                >
                                @if($media->caption_name || $media->caption_text)
                                    <img src="{{ asset('website/img/comment.png') }}" class="cmnt-img" loading="lazy" />
                                @endif
                            </a>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>
    </div>
@endsection
