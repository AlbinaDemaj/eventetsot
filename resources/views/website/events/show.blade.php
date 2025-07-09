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
            {{-- Your main view file --}}
            <div class="child-wrap img-gallery-magnific" id="media-gallery">
                @include('website.events.media-items', ['media' => $media])
            </div>

            {{-- Loading indicator --}}
            <div id="loading-indicator" class="loading-indicator" style="display: none;">
                <div class="spinner"></div>
                <p>Loading more images...</p>
            </div>

            {{-- No more content indicator --}}
            <div id="no-more-content" class="no-more-content" style="display: none;">
                <p>No more images to load</p>
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

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let currentPage = {{ $media->currentPage() }};
            let lastPage = {{ $media->lastPage() }};
            let loading = false;
            let eventId = {{ $event->id }};

            const mediaGallery = document.getElementById('media-gallery');
            const loadingIndicator = document.getElementById('loading-indicator');
            const noMoreContent = document.getElementById('no-more-content');

            // Intersection Observer for infinite scroll
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !loading && currentPage < lastPage) {
                        loadMoreMedia();
                    }
                });
            }, {
                rootMargin: '100px' // Start loading 100px before reaching the bottom
            });

            // Create a sentinel element to observe
            const sentinel = document.createElement('div');
            sentinel.id = 'scroll-sentinel';
            sentinel.style.height = '1px';
            mediaGallery.parentNode.insertBefore(sentinel, mediaGallery.nextSibling);
            observer.observe(sentinel);

            function loadMoreMedia() {
                if (loading || currentPage >= lastPage) return;

                loading = true;
                loadingIndicator.style.display = 'block';

                fetch(`/events/${eventId}/load-more-media?page=${currentPage + 1}`, {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.html) {
                            mediaGallery.insertAdjacentHTML('beforeend', data.html);
                            currentPage = data.currentPage;
                            lastPage = data.lastPage;

                            // Initialize any new magnific popup or lazy loading
                            initializeNewMediaElements();

                            if (!data.hasMore) {
                                noMoreContent.style.display = 'block';
                                observer.disconnect();
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error loading more media:', error);
                    })
                    .finally(() => {
                        loading = false;
                        loadingIndicator.style.display = 'none';
                    });
            }

            function initializeNewMediaElements() {
                // Re-initialize magnific popup for new elements
                if (typeof $.magnificPopup !== 'undefined') {
                    $('.image-popup-vertical-fit').magnificPopup({
                        type: 'image',
                        closeOnContentClick: true,
                        mainClass: 'mfp-img-mobile',
                        image: {
                            verticalFit: true
                        }
                    });
                }

                // Re-initialize lazy loading for new images
                const newLazyImages = document.querySelectorAll('.lazy-load:not(.loaded)');
                newLazyImages.forEach(img => {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                img.src = img.dataset.src;
                                img.classList.add('loaded');
                                observer.unobserve(img);
                            }
                        });
                    });
                    observer.observe(img);
                });
            }

            // Show no more content message if we're already on the last page
            if (currentPage >= lastPage) {
                noMoreContent.style.display = 'block';
            }
        });
    </script>
@endsection
