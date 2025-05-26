
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
        // File handling variables
        let selectedFiles = [];
        const fileInput = document.getElementById('fileInput');
        const dropzone = document.getElementById('dropzone');
        const fileSelectionStep = document.getElementById('fileSelectionStep');
        const reviewUploadStep = document.getElementById('reviewUploadStep');
        const uploadPreviewContainer = document.getElementById('uploadPreviewContainer');
        const addMoreFilesBtn = document.getElementById('addMoreFilesBtn');
        const finalUploadBtn = document.getElementById('finalUploadBtn');
        const fileCountSpan = document.getElementById('fileCount');

        // Setup dropzone
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                handleFiles(fileInput.files);
            }
        });

        // Process selected files
        function handleFiles(files) {console.log(files, '@files')
            // Convert to array and filter for images/videos only
            const validFiles = Array.from(files).filter(file =>
                file.type.startsWith('image/') || file.type.startsWith('video/')
            );

            if (validFiles.length === 0) {
                alert('Only images and videos are allowed.');
                return;
            }

            // Add to our selected files
            selectedFiles = selectedFiles.concat(validFiles);
            updatePreviews();
            showReviewStep();
        }

        // Update preview thumbnails
        function updatePreviews() {
            // Clear existing previews
            uploadPreviewContainer.innerHTML = '';

            // Update file count
            fileCountSpan.textContent = selectedFiles.length;

            // Create preview items
            selectedFiles.forEach((file, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-3';

                if (file.type.startsWith('image/')) {
                    // Handle image files
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        col.innerHTML = `
                <div class="uploaded-img">
                    <span class="remove-img" data-name="${file.name}" data-size="${file.size}">
                        <img src="{{ asset('website/img/trash.svg') }}">
                    </span>
                    <div class="img-box">
                        <img src="${e.target.result}">
                    </div>
                    <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption">
                        <img src="{{ asset('website/img/caption.svg') }}"> Add Caption
                    </span>
                </div>
            `;
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video/')) {
                    // Handle video files
                    const videoURL = URL.createObjectURL(file);
                    col.innerHTML = `
            <div class="uploaded-img">
                <span class="remove-img" data-name="${file.name}" data-size="${file.size}">
                    <img src="{{ asset('website/img/trash.svg') }}">
                </span>
                <div class="img-box">
                    <video controls>
                        <source src="${videoURL}" type="${file.type}">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption">
                    <img src="{{ asset('website/img/caption.svg') }}"> Add Caption
                </span>
            </div>
        `;
                }

                uploadPreviewContainer.appendChild(col);
            });
        }

        // Add event delegation for remove handlers
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-img')) {
                const removeBtn = e.target.closest('.remove-img');
                const fileName = removeBtn.getAttribute('data-name');
                const fileSize = removeBtn.getAttribute('data-size');

                // Find the file by name and size (more reliable than just name)
                const index = selectedFiles.findIndex(file =>
                    file.name === fileName && file.size.toString() === fileSize
                );

                if (index !== -1) {
                    selectedFiles.splice(index, 1);
                }

                updatePreviews();
                if (selectedFiles.length === 0) {
                    showSelectionStep();
                }
            }
        });

        // Navigation between steps
        function showReviewStep() {
            fileSelectionStep.classList.add('d-none');
            reviewUploadStep.classList.remove('d-none');
        }

        function showSelectionStep() {
            fileSelectionStep.classList.remove('d-none');
            reviewUploadStep.classList.add('d-none');
            fileInput.value = ''; // Reset file input
        }

        // Button handlers
        addMoreFilesBtn.addEventListener('click', showSelectionStep);

        finalUploadBtn.addEventListener('click', function() {
            if (selectedFiles.length === 0) {
                alert('Please select at least one file to upload.');
                return;
            }

            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append(`media[${index}]`, file);
            });

            formData.append('code', '{{request()->route('code')}}')

            // Submit to server
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
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred during upload');
                });
        });

        // Text Post
        const textarea = document.querySelector('.preview-editor .postbg');
        const thumbnails = document.querySelectorAll('.thumbnail-single');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const imageName = thumbnail.dataset.bg;
                if (!imageName) return;

                textarea.style.backgroundImage = `url('${imageName}')`;
                textarea.style.color = thumbnail.dataset.fg;
                textarea.style.setProperty('--placeholder-color', thumbnail.dataset.fg);

                const placeholderStyles = `
                  textarea::placeholder { color: ${thumbnail.dataset.fg} !important; }
                  textarea::-webkit-input-placeholder { color: ${thumbnail.dataset.fg} !important; }
                  textarea::-moz-placeholder { color: ${thumbnail.dataset.fg} !important; opacity: 1; }
                `;

                const styleTag = document.createElement('style');
                styleTag.innerHTML = placeholderStyles;
                document.head.appendChild(styleTag);

                // Remove previous style tags to avoid duplication
                const oldStyles = document.querySelectorAll('style[data-placeholder-style]');
                oldStyles.forEach(style => style.remove());
                styleTag.setAttribute('data-placeholder-style', '');
            });
        });


        document.querySelector('#addTextPostBtn').addEventListener('click', function () {
            const textarea = document.querySelector('.preview-editor textarea');
            const backgroundImage = textarea.style.backgroundImage;
            const cleanBgUrl = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');

            const textContent = textarea.value;
            const fontColor = textarea.style.color || '#000';

            if (!textContent.trim()) return;

            const col = document.createElement('div');
            col.className = 'col-md-4 mb-3';

            col.innerHTML = `
        <div class="uploaded-img text-post-preview" style="background-image: url('${cleanBgUrl}'); background-size: cover; height: 200px; position: relative; color: ${fontColor}; padding: 1rem;">
            <span class="remove-img" data-index="-1" style="position: absolute; top: 5px; right: 5px; cursor: pointer;"><img src="{{ asset('website/img/trash.svg') }}"></span>
            <div class="img-box" style="height: 100%; overflow: auto;">
                <p style="margin: 0;">${textContent}</p>
            </div>
        </div>
    `;

            document.querySelector('#uploadPreviewContainer').appendChild(col);

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('add_text_post'));
            modal.hide();

            document.getElementById('reviewUploadStep').classList.remove('d-none');
        });

    });
</script>
</body>
</html>
