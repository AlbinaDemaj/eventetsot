
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
        const preview = document.getElementById('preview');
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
            preview.innerHTML = '';
            uploadPreviewContainer.innerHTML = '';

            // Update file count
            fileCountSpan.textContent = selectedFiles.length;

            // Create preview items
            selectedFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Create thumbnail for selection step
                    const thumb = document.createElement('div');
                    thumb.className = 'preview-thumb';
                    thumb.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <span class="remove-thumb" data-index="${index}">×</span>
                `;
                    preview.appendChild(thumb);

                    // Create preview item for review step
                    const col = document.createElement('div');
                    col.className = 'col-md-4 mb-3';
                    col.innerHTML = `
                    <div class="uploaded-img">
                        <span class="remove-img" data-index="${index}"><img src="{{ asset('website/img/trash.svg') }}"></span>
                        <div class="img-box"><img src="${e.target.result}"></div>
                        <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption">
                            <img src="{{ asset('website/img/caption.svg') }}"> Add Caption
                        </span>
                    </div>
                `;
                    uploadPreviewContainer.appendChild(col);
                };

                if (file.type.startsWith('image/')) {
                    reader.readAsDataURL(file);
                } else {
                    // For videos, you could show a video thumbnail or generic video icon
                    const videoThumb = document.createElement('video');
                    videoThumb.src = URL.createObjectURL(file);
                    videoThumb.width = 100;
                    videoThumb.height = 100;
                    preview.appendChild(videoThumb);
                }
            });

            // Add remove handlers
            document.querySelectorAll('.remove-thumb, .remove-img').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    selectedFiles.splice(index, 1);
                    updatePreviews();
                    if (selectedFiles.length === 0) {
                        showSelectionStep();
                    }
                });
            });
        }

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
console.log(selectedFiles, '@selectedFiles')
            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append(`media[${index}]`, file);
                // You could also add captions here if you've collected them
            });

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
                        window.location.href = '';
                    } else {
                        alert(data.message || 'Upload failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred during upload');
                });
        });

        // Text Post Modal Handling (from your original code)
        const textarea = document.querySelector('.preview-editor .postbg');
        const thumbnails = document.querySelectorAll('.thumbnail-single');
        const bgClasses = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const bg = thumbnail.dataset.bg;
                if (!bg) return;

                // Remove all background classes
                textarea.classList.remove(...bgClasses);

                // Add selected background class
                textarea.classList.add(bg);
            });
        });
    });
</script>
</body>
</html>
