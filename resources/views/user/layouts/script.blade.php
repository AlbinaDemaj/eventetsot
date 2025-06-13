<script>
    /*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
    // Scripts
    //

    window.addEventListener('DOMContentLoaded', event => {

        // Toggle the side navigation
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }

        document.getElementById('eventSelector').addEventListener('change', function (e) {
            if (this.value === 'create_new') {
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();
            } else {
                // Submit the form if another event is selected
                this.form.submit();
            }
        });


        // File upload
        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('dragover');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                const file = files[0];

                // Optional: check file type
                if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                    // ✅ Navigate to another page
                    window.location.href = 'upload-view.html'; // change this to your desired URL
                } else {
                    alert('Only images and videos are allowed.');
                }
            }
        });

        // Optional: allow click to upload
        dropzone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', () => {
            const files = Array.from(fileInput.files);
            if (files.length > 0) {
                window.location.href = 'upload-view.html';
            }
        });

    });

    function switchTab(tabId) {
        // Hide all content sections
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

        // Show selected tab and mark it active
        document.getElementById(tabId).style.display = 'block';
        event.target.closest('.tab').classList.add('active');
    }

    function upload() {
        var imgcanvas = document.getElementById("canv1");
        var fileinput = document.getElementById("finput");
        var image = new SimpleImage(fileinput);
        image.drawTo(imgcanvas);
    }

    function downloadQRCode() {
        const img = document.getElementById('event-qr');
        const url = img.src;
        const fileName = "event-qr-code.png";

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function copyURL() {
        const urlInput = document.getElementById('url');
        urlInput.select();
        urlInput.setSelectionRange(0, 99999); // For mobile

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    function openURL() {
        const url = document.getElementById('url').value;
        window.open(url, '_blank');
    }

    let timeout;

    document.querySelectorAll('.event-setting input[name], .event-setting select[name], .event-setting .my-select').forEach((el) => {
        el.addEventListener('input', function () {
            const field = this.name;

            if (this.type === 'file') {
                const file = this.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('field', field);
                formData.append('value', file);

                fetch("{{ route('user.settings') }}", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": "{{ csrf_token() }}"
                    },
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            console.log(`${field} updated (file)`);
                        } else {
                            console.error(data);
                        }
                    });

            } else {
                // Debounced text/select field update
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const value = this.value;

                    fetch("{{ route('user.settings') }}", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": "{{ csrf_token() }}"
                        },
                        body: JSON.stringify({
                            field,
                            value
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                console.log(`${field} updated`);
                            } else {
                                console.error(data);
                            }
                        });
                }, 2000); // 2-second debounce
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Add dynamic field
        let fieldIndex = {{ count(old('dynamic_fields', $selectedEvent->dynamic_fields ?? [])) }};
        const previewContainer = document.getElementById('preview-fields-container');

        // Function to update preview fields
        function updatePreviewFields() {
            const fields = [];
            document.querySelectorAll('.dynamic-field').forEach(fieldEl => {
                const label = fieldEl.querySelector('.field-label').value;
                const type = fieldEl.querySelector('.field-type').value;
                const required = fieldEl.querySelector('.field-required').checked;

                if (label) {
                    fields.push({
                        label: label,
                        type: type,
                        required: required
                    });
                }
            });

            // Clear existing preview fields
            previewContainer.innerHTML = '';

            // Add updated fields
            fields.forEach((field, index) => {
                const fieldHtml = `
                    <div class="input-wrap mb-2" data-index="${index}">
                        <input type="${field.type}"
                               class="form-control"
                               placeholder="${field.label}"
                               >
                    </div>
                `;
                previewContainer.insertAdjacentHTML('beforeend', fieldHtml);
            });
        }

        // Add new field
        document.getElementById('add-field').addEventListener('click', function() {
            const container = document.getElementById('dynamic-fields-container');
            const newField = document.createElement('div');
            newField.className = 'form-group dynamic-field mb-3 p-3 border rounded';
            newField.dataset.index = fieldIndex;
            newField.innerHTML = `
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Field Label</label>
                            <input type="text"
                                   name="dynamic_fields[${fieldIndex}][label]"
                                   class="form-control field-label"
                                   placeholder="e.g. Full Name"
                                   required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Field Type</label>
                            <select name="dynamic_fields[${fieldIndex}][type]" class="form-control field-type">
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="tel">Telephone</option>
                                <option value="number">Number</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Required</label>
                            <div class="form-check">
                                <input type="checkbox"
                                       name="dynamic_fields[${fieldIndex}][required]"
                                       class="form-check-input field-required" checked>
                                <label class="form-check-label">Required field</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1 d-flex align-items-end">
                        <button type="button" class="btn btn-sm btn-danger remove-field mb-3">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(newField);

            // Add event listeners to new field
            addFieldEventListeners(newField);

            // Update preview
            updatePreviewFields();

            fieldIndex++;
        });

        // Remove field
        document.addEventListener('click', function(e) {
            if (e.target && (e.target.classList.contains('remove-field') || e.target.closest('.remove-field'))) {
                e.preventDefault();
                const fieldToRemove = e.target.closest('.dynamic-field');
                if (fieldToRemove) {
                    fieldToRemove.remove();
                    updatePreviewFields();
                }
            }
        });

        // Add event listeners to existing fields
        document.querySelectorAll('.dynamic-field').forEach(field => {
            addFieldEventListeners(field);
        });

        function addFieldEventListeners(fieldElement) {
            const labelInput = fieldElement.querySelector('.field-label');
            const typeSelect = fieldElement.querySelector('.field-type');
            const requiredCheckbox = fieldElement.querySelector('.field-required');

            // Update preview when any field property changes
            [labelInput, typeSelect, requiredCheckbox].forEach(element => {
                element.addEventListener('change', updatePreviewFields);
                element.addEventListener('input', updatePreviewFields);
            });
        }

        // Update other preview elements
        document.getElementById('title').addEventListener('input', function() {
            document.getElementById('preview-title').textContent = this.value;
        });

        document.getElementById('description').addEventListener('input', function() {
            document.getElementById('preview-description').textContent = this.value;
        });

        document.getElementById('button_text').addEventListener('input', function() {
            document.getElementById('preview-button').textContent = this.value;
        });

        // Initial preview update
        updatePreviewFields();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const backgroundInput = document.getElementById('background');
        const backgroundPreview = document.getElementById('background-preview');

        backgroundInput.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const reader = new FileReader();

                reader.onload = function(event) {
                    backgroundPreview.src = event.target.result;
                }

                reader.readAsDataURL(this.files[0]);
            } else {
                // If user cancels file selection, keep current image
                @if($selectedEvent->background)
                    backgroundPreview.src = "{{ asset('storage/' . $selectedEvent->background) }}";
                @else
                    backgroundPreview.src = "../user/assets/img/colored-paper.jpg";
                @endif
            }
        });
    });


</script>
