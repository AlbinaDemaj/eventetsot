@extends('website.layouts.event')

@section('content')

    <div class="add-album h-100">
        <div class="row h-100 g-0">
            <div class="col-md-6">
                <div class="flex-banner h-100 d-flex align-items-center justify-content-center">
                    <div class="flex-caption">
                        <h4>Sam Dasma</h4>
                        <a href="{{ route('events.upload', request()->route('code')) }}" class="btn e-btn-primary"><span>+</span> Shtoni Album</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6 text-center">
                <div class="collage-box px-4 h-100 d-flex align-items-center justify-content-center flex-column">
                    <p><strong>{{ $event->media()->count() }} Fotografitë, videot dhe postimet</strong></p>
                    <div class="img-collage">
                        <div class="child-wrap">
                            @foreach($event->media()->get() as $media)
                                @if($media->type === 'file')
                                    <span><img src="{{ asset('storage/' . $media->file_path) }}"></span>
                                @else
                                    <span style="position: relative;display: grid;place-items: center;background-image: url('{{ asset($media->background_image) }}'); background-size: cover;background-position: center;">
                                        <div style="color: {{ $media->font_color }}; font-size: clamp(14px, 3vw, 18px); line-height: 1.7;text-shadow: 0 1px 4px rgba(0,0,0,0.2); width: 90%;">
                                            {!! nl2br(e($media->text_content)) !!}
                                        </div>
                                    </span>
                                @endif
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
