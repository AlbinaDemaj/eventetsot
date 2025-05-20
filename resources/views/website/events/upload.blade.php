@extends('website.layouts.event')

@section('content')

    <style>
        /* Add some styles for the preview thumbnails */
        .preview-thumb {
            position: relative;
            display: inline-block;
            margin: 5px;
            width: 100px;
            height: 100px;
        }
        .preview-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .preview-thumb .remove-thumb {
            position: absolute;
            top: 0;
            right: 0;
            background: red;
            color: white;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            cursor: pointer;
        }
        .dragover {
            background-color: #f8f9fa;
            border: 2px dashed #0d6efd;
        }
    </style>

    <section class="upload-area p-4 master-head">
        <div class="container">
            <a href="" class="breadcrumb-back text-decoration-none text-body"><img src="{{ asset('website/img/back.svg') }}"> <strong>Kthehu te Albumi</strong></a>

            <!-- Step 1: File Selection -->
            <div class="upload-step" id="fileSelectionStep">
                <div class="upload-grid">
                    <div id="dropzone"><img src="{{ asset('website/img/upload.svg') }}" width="50"><strong>Zgjidh Fotografitë dhe videot</strong></div>
                    <input type="file" id="fileInput" multiple accept="image/*,video/*" hidden />
                    <div id="preview"></div>
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
                <button class="btn e-btn-primary upload-selected" id="finalUploadBtn">Upload <span id="fileCount">0</span> Item(s)</button>
            </div>
        </div>
    </section>

    <!-- Modals (unchanged from your original) -->
    <div class="modal fade" id="add_text_post" tabindex="-1" aria-labelledby="add_text_postLabel" aria-hidden="true">
        <!-- ... keep your existing modal HTML ... -->
    </div>

    <div class="modal fade" id="addCaption" tabindex="-1" aria-labelledby="addCaptionLabel" aria-hidden="true">
        <!-- ... keep your existing modal HTML ... -->
    </div>

@endsection
