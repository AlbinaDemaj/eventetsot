@extends('website.layouts.event')

@section('content')

    <div class="add-album h-100">
        <div class="row h-100 g-0">
            <div class="col-md-12">
                <div class="flex-banner h-100 d-flex align-items-center justify-content-center">
                    <div class="flex-caption">
                        <img src="../website/img/card-bg.png" />
                        <h4>Sam Dasma</h4>
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
                                @if($media->type === 'file')
                                    <div class="post-img magnific-img">
                                        <a href="{{ asset('storage/' . $media->file_path) }}" class="image-popup-vertical-fit">
                                            <img src="{{ asset('storage/' . $media->file_path) }}">
                                            <img src="../website/img/comment.png" class="cmnt-img" />
                                        </a>
                                    </div>
                                @else
                                    <div class="post-text magnific-img">
                                        <a href="javescript:0" class="image-popup-vertical-fit">
                                            <span  style="background-image: url('{{ asset($media->background_image) }}'); ">
                                                <div style="color: {{ $media->font_color }}; font-size: clamp(14px, 3vw, 18px); line-height: 1.7;text-shadow: 0 1px 4px rgba(0,0,0,0.2); width: 90%;">
                                                    {!! nl2br(e($media->text_content)) !!}
                                                </div>
                                            </span>
                                        </a>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
