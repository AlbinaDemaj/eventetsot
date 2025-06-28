@extends('website.layouts.event')

@section('content')
    <section class="upload-area p-4 master-head">
        <div class="container">
            <a href="{{ route('events.show', request()->route('code')) }}" class="breadcrumb-back text-decoration-none text-body">
                <img src="{{ asset('website/img/back.svg') }}">
                <strong>{{lang('website', 'upload.back_to_album')}}</strong>
            </a>

            <!-- Step 1: File Selection -->
            <div class="upload-step" id="fileSelectionStep">
                <div class="upload-grid">
                    <div id="dropzone">
                        <img src="{{ asset('website/img/upload.svg') }}" width="50">
                        <strong>{{lang('website', 'upload.select_files')}}</strong>
                    </div>
                    <input type="file" id="fileInput" multiple accept="image/*,video/*" hidden />
                </div>
                <p class="text-center">
                    {{lang('website', 'upload.or_add_text')}}
                    <span id="text_post_trigger" data-bs-toggle="modal" data-bs-target="#add_text_post">
                        {{lang('website', 'upload.text_post')}}
                    </span>
                </p>
            </div>

            <!-- Step 2: Review & Upload (initially hidden) -->
            <div class="upload-step d-none" id="reviewUploadStep">
                <div class="uploaded-photos mt-4 mb-5 pb-5">
                    <div class="container">
                        <div id="uploadPreviewContainer">
                            <!-- Dynamic preview items will be inserted here -->
                        </div>
                    </div>
                </div>
                <button class="add-photos btn" id="addMoreFilesBtn">
                    <img src="{{ asset('website/img/addphotos.svg') }}">
                    {{lang('website', 'upload.add_more')}}
                </button>
                <button class="btn e-btn-primary upload-selected" id="finalUploadBtn">
                    {{lang('website', 'upload.final_upload')}}
                </button>
            </div>
        </div>
    </section>

    <!-- Text Post Modal -->
    <div class="modal fade" id="add_text_post" tabindex="-1" aria-labelledby="add_text_postLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add_text_postLabel">{{lang('website', 'modal.text_post.title')}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="preview-editor">
                        <textarea placeholder="{{lang('website', 'modal.text_post.placeholder')}}" class="postbg {{ asset('website/img/templates/'.$templates[0]->image_path) }}"></textarea>
                        <div class="postbg-thumbnails">
                            @foreach($templates as $template)
                                <div class="thumbnail-single" data-fg="{{ $template->font_color }}" data-bg="{{ asset('website/img/templates/'.$template->image_path) }}">
                                    <img src="{{ asset('website/img/templates/'.$template->image_path) }}">
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" data-bs-dismiss="modal" id="addTextPostBtn">
                        {{lang('website', 'modal.text_post.add_button')}}
                    </button>
                    <button type="button" class="btn e-btn-ghost" data-bs-dismiss="modal">
                        {{lang('website', 'modal.text_post.cancel')}}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Caption Modal -->
    <div class="modal fade" id="addCaption" tabindex="-1" aria-labelledby="addCaptionLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCaptionLabel">{{lang('website', 'modal.caption.title')}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="captionForm">
                        <input type="hidden" id="captionFileIndex">
                        <div class="form-group mb-3">
                            <label>{{lang('website', 'modal.caption.text_placeholder')}}</label>
                            <textarea id="captionText" rows="6" cols="6" class="form-control"></textarea>
                        </div>
                        <div class="form-group mb-3">
                            <label>{{lang('website', 'modal.caption.name_placeholder')}}</label>
                            <input type="text" id="captionName" value="{{ auth()->check() ? auth()->user()->name : '' }}" class="form-control" name="name">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" id="saveCaptionBtn">
                        {{lang('website', 'modal.caption.save_button')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
@endsection
