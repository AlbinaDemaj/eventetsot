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
                    @if($media->file_type === 'video/mp4' || $media->file_type === 'video/quicktime' || str_contains($media->file_type, 'video/'))
                        <div class="post-img magnific-img video-container">
                            <div class="video-thumbnail-wrapper" onclick="openVideoModal('{{ $media->file_path }}', '{{ $media->file_type }}')">
                                <div class="play-button">
                                    <svg viewBox="0 0 24 24" width="48" height="48">
                                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                                    </svg>
                                </div>
                            </div>

                            @if($media->caption_name || $media->caption_text)
                                <img src="{{ asset('website/img/comment.png') }}" class="cmnt-img" loading="lazy" />
                            @endif
                        </div>
                    @else
                        <div class="post-img magnific-img">
                            <a href="{{ $media->file_path }}" class="image-popup-vertical-fit">
                                <img
                                    src="{{ $media->file_path }}"
                                    loading="lazy"
                                    data-src="{{ $media->file_path }}"
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

    <!-- Video Modal -->
    <div id="videoModal" class="video-modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeVideoModal()">&times;</span>
            <video id="modalVideo" controls autoplay>
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
@endsection
