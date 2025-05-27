@extends('website.layouts.event')

@section('content')

    <section class="upload-area p-4 master-head">
        <div class="container">
            <a href="" class="breadcrumb-back text-decoration-none text-body"><img src="{{ asset('website/img/back.svg') }}"> <strong>Kthehu te Albumi</strong></a>

            <!-- Step 1: File Selection -->
            <div class="upload-step" id="fileSelectionStep">
                <div class="upload-grid">
                    <div id="dropzone"><img src="{{ asset('website/img/upload.svg') }}" width="50"><strong>Zgjidh Fotografitë dhe videot</strong></div>
                    <input type="file" id="fileInput" multiple accept="image/*,video/*" hidden />
                </div>
                <p class="text-center">Or add a <span id="text_post_trigger" data-bs-toggle="modal" data-bs-target="#add_text_post">text post</span></p>
            </div>

            <!-- Step 2: Review & Upload (initially hidden) -->
            <div class="upload-step d-none" id="reviewUploadStep">
                <div class="uploaded-photos mt-4 mb-5 pb-5">
                    <div class="container">
                        <div class="row" id="uploadPreviewContainer">
                            <!-- Dynamic preview items will be inserted here -->
                        </div>
                    </div>
                </div>
                <button class="add-photos btn" id="addMoreFilesBtn"><img src="{{ asset('website/img/addphotos.svg') }}"></button>
                <button class="btn e-btn-primary upload-selected" id="finalUploadBtn">Upload Item(s)</button>
            </div>
        </div>
    </section>

    <!-- Modals (unchanged from your original) -->
    <div class="modal fade" id="add_text_post" tabindex="-1" aria-labelledby="add_text_postLabel" aria-hidden="true">
        <div class="modal-dialog modal-md"> <!-- Use modal-sm for small size -->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="add_text_postLabel">Create Text Post</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="preview-editor">
                        <textarea placeholder="What's on your mind?" class="postbg {{ asset('website/img/templates/'.$templates[0]->image_path) }}"></textarea>
                        <div class="postbg-thumbnails">
                            @foreach($templates as $template)
                                <div class="thumbnail-single" data-fg="{{ $template->font_color }}" data-bg="{{ asset('website/img/templates/'.$template->image_path) }}"><img src="{{ asset('website/img/templates/'.$template->image_path) }}"></div>
                            @endforeach
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" data-bs-dismiss="modal" id="addTextPostBtn">Add Post</button>
                    <button type="button" class="btn e-btn-ghost" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="addCaption" tabindex="-1" aria-labelledby="addCaptionLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCaptionLabel">Add Caption</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="captionForm">
                        <input type="hidden" id="captionFileIndex">
                        <div class="form-group">
                            <label>Caption</label>
                            <textarea id="captionText" rows="6" cols="6" placeholder="Write a caption for this photo here" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="captionName" value="{{ auth()->check() ? auth()->user()->name : '' }}" class="form-control" name="name" placeholder="Name">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" id="saveCaptionBtn">Save Caption</button>
                    <button type="button" class="btn e-btn-ghost" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

@endsection
