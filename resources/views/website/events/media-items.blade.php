@foreach($media as $mediaItem)
    @if(str_contains($mediaItem->file_type, 'video/'))
        <div class="post-img magnific-img video-container">
            <div class="video-thumbnail-wrapper" onclick="openVideoModal('{{ $mediaItem->file_path }}', '{{ $mediaItem->file_type }}')">
                <div class="play-button">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                    </svg>
                </div>
            </div>

            @if($mediaItem->caption_name || $mediaItem->caption_text)
                <img src="{{ asset('website/img/comment.png') }}" class="cmnt-img" loading="lazy" />
            @endif
        </div>
    @else
        <div class="post-img magnific-img">
            <a href="{{ $mediaItem->file_path }}" class="image-popup-vertical-fit">
                <img
                    src="{{ $mediaItem->file_path }}"
                    loading="lazy"
                    data-src="{{ $mediaItem->file_path }}"
                    class="lazy-load"
                    alt="{{ $mediaItem->caption_name ?? 'Event image' }}"
                >
                @if($mediaItem->caption_name || $mediaItem->caption_text)
                    <img src="{{ asset('website/img/comment.png') }}" class="cmnt-img" loading="lazy" />
                @endif
            </a>
        </div>
    @endif
@endforeach
