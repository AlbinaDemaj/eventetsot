
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="A simple HTML page with all necessary header tags.">
    <meta name="author" content="Your Name">
    <meta name="keywords" content="HTML, basic, header tags">


    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <!-- Stylesheet -->
    <link rel="stylesheet" href="{{ asset('website/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ url('website/css/style.css') }}">
    <link rel="stylesheet" href="{{ url('website/css/responsive.css') }}">

    <link rel="stylesheet" type="text/css" href="{{ url('website/css/slick.css') }}"/>
    <!-- Font Awesome 6 CDN -->
    <link rel="stylesheet" href="{{ url('website/css/fa.min.css') }}" />
</head>
<body>

@yield('content')

<script type="text/javascript" src="{{ asset('website/js/bootstrap.bundle.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('website/js//jquery-1.11.0.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('website/js/jquery-migrate-1.2.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('website/js/slick.min.js') }}"></script>
<script type="text/javascript">
    $('.eslider.a').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.arrowbox.a'),
        centerPadding: '1150px',
        autoplay: true,
        prevArrow: '<span class="slick-prev"><img src="{{ asset('website/img/arrow-left.svg') }}"></span>',
        nextArrow: '<span class="slick-next"><img src="{{ asset('website/img/arrow-right.svg') }}"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.eslider.t').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        appendArrows: $('.arrowbox.t'),
        centerPadding: '1150px',
        autoplay: true,
        prevArrow: '<span class="slick-prev"><img src="{{ asset('website/img/arrow-left.svg') }}"></span>',
        nextArrow: '<span class="slick-next"><img src="{{ asset('website/img/arrow-right.svg') }}"></span>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    document.addEventListener('DOMContentLoaded', function() {
        // =============================================
        // DOM Elements
        // =============================================
        const fileInput = document.getElementById('fileInput');
        const dropzone = document.getElementById('dropzone');
        const fileSelectionStep = document.getElementById('fileSelectionStep');
        const reviewUploadStep = document.getElementById('reviewUploadStep');
        const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
        const addMoreFilesBtn = document.getElementById('addMoreFilesBtn');
        const finalUploadBtn = document.getElementById('finalUploadBtn');
        const saveCaptionBtn = document.getElementById('saveCaptionBtn');
        const textarea = document.querySelector('.preview-editor .postbg');
        const thumbnails = document.querySelectorAll('.thumbnail-single');
        const addTextPostBtn = document.getElementById('addTextPostBtn');
        const captionTextInput = document.getElementById('captionText');
        const captionNameInput = document.getElementById('captionName');
        const captionFileIndexInput = document.getElementById('captionFileIndex');

        // =============================================
        // State Management
        // =============================================
        let uploadItems = []; // Combined array for both files and text posts
        const imagePaths = {
            caption: "{{ asset('website/img/caption.svg') }}",
            check2: "{{ asset('website/img/check-2.svg') }}",
            trash: "{{ asset('website/img/trash.svg') }}"
        };

        // =============================================
        // Event Listeners
        // =============================================
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', handleDragOver);
        dropzone.addEventListener('dragleave', handleDragLeave);
        dropzone.addEventListener('drop', handleDrop);
        fileInput.addEventListener('change', handleFileInputChange);
        addMoreFilesBtn.addEventListener('click', showSelectionStep);
        finalUploadBtn.addEventListener('click', handleFinalUpload);
        saveCaptionBtn.addEventListener('click', handleCaptionSave);
        document.addEventListener('click', handleDocumentClick);
        thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', handleThumbnailClick));
        addTextPostBtn.addEventListener('click', handleTextPostAdd);

        // =============================================
        // Core Functions
        // =============================================
        function handleFiles(files) {
            const validFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/') || file.type.startsWith('video/')
            );

            if (validFiles.length === 0) {
                alert('Only images and videos are allowed.');
                return;
            }

            // Add files to uploadItems with type 'file'
            validFiles.forEach(file => {
                uploadItems.push({
                    type: 'file',
                    file: file,
                    caption: {
                        text: '',
                        name: ''
                    }
                });
            });

            updatePreviews();
            showReviewStep();
        }

        function updatePreviews() {
            uploadPreviewContainer.innerHTML = '';

            uploadItems.forEach((item, index) => {
                const col = document.createElement('div');
                col.className = 'post-main';

                if (item.type === 'file') {
                    const file = item.file;
                    const hasCaption = item.caption &&
                        (item.caption.text.trim() || item.caption.name.trim());

                    if (file.type.startsWith('image/')) {
                        createImagePreview(col, file, index, hasCaption, item.caption);
                    } else if (file.type.startsWith('video/')) {
                        createVideoPreview(col, file, index, hasCaption, item.caption);
                    }
                } else if (item.type === 'text') {
                    createTextPostPreview(col, item, index);
                }

                uploadPreviewContainer.appendChild(col);
            });
        }

        function createImagePreview(container, file, index, hasCaption, caption) {
            const reader = new FileReader();
            reader.onload = function(e) {
                container.innerHTML = `
                <div class="uploaded-img">
                    <span class="remove-img" data-type="file" data-index="${index}">
                        <img src="{{ asset('website/img/trash.svg') }}">
                    </span>
                    <div class="img-box">
                        <img src="${e.target.result}">
                    </div>
                    <span class="btn ${hasCaption ? 'btn-outline-success disabled add-caption' : 'e-btn-ghost'} d-flex align-items-center justify-content-center gap-4"
                          data-bs-toggle="modal"
                          data-bs-target="#addCaption"
                          data-item-index="${index}">
                        <img src="${hasCaption ? imagePaths.check2 : imagePaths.caption}">
                        ${hasCaption ? 'Caption Added' : 'Add Caption'}
                    </span>
                </div>
            `;
            };
            reader.readAsDataURL(file);
        }

        function createVideoPreview(container, file, index, hasCaption, caption) {
            const videoURL = URL.createObjectURL(file);
            container.innerHTML = `
            <div class="uploaded-img">
                <span class="remove-img" data-type="file" data-index="${index}">
                    <img src="{{ asset('website/img/trash.svg') }}">
                </span>
                <div class="img-box">
                    <video controls>
                        <source src="${videoURL}" type="${file.type}">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <span class="btn ${hasCaption ? 'btn-outline-success disabled' : 'e-btn-ghost'} d-flex align-items-center justify-content-center gap-4"
                      data-bs-toggle="modal"
                      data-bs-target="#addCaption"
                      data-item-index="${index}">
                    <img src="${hasCaption ? imagePaths.check2 : imagePaths.caption}">
                    ${hasCaption ? 'Caption Added' : 'Add Caption'}
                </span>
            </div>
        `;
        }

        function createTextPostPreview(container, item, index) {
            const hasCaption = item.caption &&
                (item.caption.text.trim() || item.caption.name.trim());

            container.innerHTML = `
            <div class="uploaded-img text-post-preview"
                 style="background-image: url('${item.backgroundImage}');
                        background-size: cover;
                        height: 200px;
                        position: relative;
                        color: ${item.fontColor};">
                <span class="remove-img" data-type="text" data-index="${index}"
                      style="position: absolute; top: 5px; right: 5px; cursor: pointer;">
                    <img src="{{ asset('website/img/trash.svg') }}">
                </span>
                <div class="img-box" style="height: 100%; overflow: auto;">
                    <p style="margin: 0;">${item.textContent}</p>
                </div>
                <span class="btn ${hasCaption ? 'btn-outline-success add-caption disabled' : 'e-btn-ghost'} d-flex align-items-center justify-content-center gap-4"
                      data-bs-toggle="modal"
                      data-bs-target="#addCaption"
                      data-item-index="${index}"
                      style="margin-top: 10px;">
                    <img src="${hasCaption ? imagePaths.check2 : imagePaths.caption}">
                    ${hasCaption ? 'Caption Added' : 'Add Caption'}
                </span>
            </div>
        `;
        }

        // =============================================
        // Event Handlers
        // =============================================
        function handleDragOver(e) {
            e.preventDefault();
            dropzone.classList.add('dragover');
        }

        function handleDragLeave() {
            dropzone.classList.remove('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        }

        function handleFileInputChange() {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        }

        function handleCaptionSave() {
            const itemIndex = captionFileIndexInput.value;
            const captionText = captionTextInput.value.trim();
            const captionName = captionNameInput.value.trim();

            if (uploadItems[itemIndex]) {
                uploadItems[itemIndex].caption = {
                    text: captionText,
                    name: captionName
                };
            }

            bootstrap.Modal.getInstance(document.getElementById('addCaption')).hide();
            updatePreviews();
        }

        function handleDocumentClick(e) {
            // Handle caption button clicks
            if (e.target.closest('[data-bs-target="#addCaption"]')) {
                const btn = e.target.closest('[data-bs-target="#addCaption"]');
                const itemIndex = btn.getAttribute('data-item-index');
                captionFileIndexInput.value = itemIndex;

                if (uploadItems[itemIndex]?.caption) {
                    captionTextInput.value = uploadItems[itemIndex].caption.text || '';
                    captionNameInput.value = uploadItems[itemIndex].caption.name || '';
                } else {
                    captionTextInput.value = '';
                    captionNameInput.value = '';
                }
            }

            // Handle remove button clicks
            if (e.target.closest('.remove-img')) {
                const removeBtn = e.target.closest('.remove-img');
                const itemType = removeBtn.getAttribute('data-type');
                const index = removeBtn.getAttribute('data-index');

                if (index !== null) {
                    uploadItems.splice(index, 1);
                }

                updatePreviews();
                if (uploadItems.length === 0) {
                    showSelectionStep();
                }
            }
        }

        function handleThumbnailClick() {
            const imageName = this.dataset.bg;
            if (!imageName) return;

            textarea.style.backgroundImage = `url('${imageName}')`;
            textarea.style.color = this.dataset.fg;
            textarea.style.setProperty('--placeholder-color', this.dataset.fg);

            const placeholderStyles = `
            textarea::placeholder { color: ${this.dataset.fg} !important; }
            textarea::-webkit-input-placeholder { color: ${this.dataset.fg} !important; }
            textarea::-moz-placeholder { color: ${this.dataset.fg} !important; opacity: 1; }
        `;

            const styleTag = document.createElement('style');
            styleTag.innerHTML = placeholderStyles;
            document.head.appendChild(styleTag);

            const oldStyles = document.querySelectorAll('style[data-placeholder-style]');
            oldStyles.forEach(style => style.remove());
            styleTag.setAttribute('data-placeholder-style', '');
        }

        function handleTextPostAdd() {
            const textContent = textarea.value.trim();
            const backgroundImage = textarea.style.backgroundImage;
            const cleanBgUrl = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            const fontColor = textarea.style.color || '#000';

            if (!textContent) return;

            // Add text post to uploadItems with type 'text'
            uploadItems.push({
                type: 'text',
                textContent: textContent,
                backgroundImage: cleanBgUrl,
                fontColor: fontColor,
                caption: {
                    text: '',
                    name: ''
                }
            });

            // Clear the textarea
            textarea.value = '';
            textarea.style.backgroundImage = '';
            textarea.style.color = '';
            textarea.style.setProperty('--placeholder-color', '');

            // Close modal and update UI
            bootstrap.Modal.getInstance(document.getElementById('add_text_post')).hide();
            updatePreviews();
            showReviewStep();
        }

        function handleFinalUpload() {
            if (uploadItems.length === 0) {
                alert('Please add at least one file or text post to upload.');
                return;
            }

            const originalBtnText = finalUploadBtn.textContent;

            finalUploadBtn.textContent = 'Uploading...';
            finalUploadBtn.disabled = true;

            const formData = new FormData();

            // Add all items to formData with their type and captions
            uploadItems.forEach((item, index) => {
                if (item.type === 'file') {
                    formData.append(`items[${index}][type]`, 'file');
                    formData.append(`items[${index}][file]`, item.file);
                    formData.append(`items[${index}][caption][text]`, item.caption.text || '');
                    formData.append(`items[${index}][caption][name]`, item.caption.name || '');
                } else if (item.type === 'text') {
                    formData.append(`items[${index}][type]`, 'text');
                    formData.append(`items[${index}][textContent]`, item.textContent);
                    formData.append(`items[${index}][backgroundImage]`, item.backgroundImage);
                    formData.append(`items[${index}][fontColor]`, item.fontColor);
                    formData.append(`items[${index}][caption][text]`, item.caption.text || '');
                    formData.append(`items[${index}][caption][name]`, item.caption.name || '');
                }
            });

            formData.append('code', '{{request()->route('code')}}');

            fetch('{{ route("media.store") }}', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = '{{ route('events.show', request()->route('code')) }}';
                    } else {
                        alert(data.message || 'Upload failed');
                        finalUploadBtn.textContent = originalBtnText;
                        finalUploadBtn.disabled = false;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred during upload');
                    finalUploadBtn.textContent = originalBtnText;
                    finalUploadBtn.disabled = false;
                });
        }

        // =============================================
        // UI Helper Functions
        // =============================================
        function showReviewStep() {
            fileSelectionStep.classList.add('d-none');
            reviewUploadStep.classList.remove('d-none');
        }

        function showSelectionStep() {
            fileSelectionStep.classList.remove('d-none');
            reviewUploadStep.classList.add('d-none');
            fileInput.value = '';
        }
    });
</script>
</body>
</html>
