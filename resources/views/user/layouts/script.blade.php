<script>
    /*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */

    window.addEventListener('DOMContentLoaded', event => {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', event => {
                event.preventDefault();
                document.body.classList.toggle('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            });
        }

        const eventSelector = document.getElementById('eventSelector');
        if (eventSelector) {
            eventSelector.addEventListener('change', function () {
                if (this.value === 'create_new') {
                    const exampleModal = document.getElementById('exampleModal');
                    if (exampleModal) {
                        const modal = new bootstrap.Modal(exampleModal);
                        modal.show();
                    }
                } else if (this.form) {
                    this.form.submit();
                }
            });
        }

        const dropzone = document.getElementById('dropzone');
        const fileInput = document.getElementById('fileInput');

        if (dropzone && fileInput) {
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

                    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                        window.location.href = 'upload-view.html';
                    } else {
                        alert('Only images and videos are allowed.');
                    }
                }
            });

            dropzone.addEventListener('click', () => fileInput.click());

            fileInput.addEventListener('change', () => {
                const files = Array.from(fileInput.files);
                if (files.length > 0) {
                    window.location.href = 'upload-view.html';
                }
            });
        }
    });

    function switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block';
        }

        if (window.event && window.event.target) {
            const tab = window.event.target.closest('.tab');
            if (tab) {
                tab.classList.add('active');
            }
        }
    }

    function upload() {
        const imgcanvas = document.getElementById("canv1");
        const fileinput = document.getElementById("finput");

        if (!imgcanvas || !fileinput || !fileinput.files || !fileinput.files.length) return;

        const image = new SimpleImage(fileinput);
        image.drawTo(imgcanvas);
    }

    function downloadQRCode() {
        const img = document.getElementById('event-qr');
        if (!img || !img.src) return;

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
        if (!urlInput || !urlInput.value) return;

        urlInput.select();
        urlInput.setSelectionRange(0, 99999);

        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Copy failed', err);
        }
    }

    function openURL() {
        const urlInput = document.getElementById('url');
        if (!urlInput || !urlInput.value) return;

        window.open(urlInput.value, '_blank');
    }

    let timeout;

    document.querySelectorAll('.event-setting input[name], .event-setting select[name], .event-setting .my-select').forEach((el) => {
        if (el.name === 'code') return;

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
                }, 2000);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const previewContainer = document.getElementById('preview-fields-container');
        const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
        const addFieldButton = document.getElementById('add-field');

        let fieldIndex = {{ count(old('dynamic_fields', optional($selectedEvent)->dynamic_fields ?? [])) }};

        function updatePreviewFields() {
            if (!previewContainer) return;

            const fields = [];
            document.querySelectorAll('.dynamic-field').forEach(fieldEl => {
                const labelInput = fieldEl.querySelector('.field-label');
                const typeSelect = fieldEl.querySelector('.field-type');
                const requiredCheckbox = fieldEl.querySelector('.field-required');

                const label = labelInput ? labelInput.value : '';
                const type = typeSelect ? typeSelect.value : 'text';
                const required = requiredCheckbox ? requiredCheckbox.checked : false;

                if (label) {
                    fields.push({
                        label: label,
                        type: type,
                        required: required
                    });
                }
            });

            previewContainer.innerHTML = '';

            fields.forEach((field, index) => {
                const fieldHtml = `
                    <div class="input-wrap mb-2" data-index="${index}">
                        <input type="${field.type}" class="form-control" placeholder="${field.label}">
                    </div>
                `;
                previewContainer.insertAdjacentHTML('beforeend', fieldHtml);
            });
        }

        if (addFieldButton && dynamicFieldsContainer) {
            addFieldButton.addEventListener('click', function() {
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
                dynamicFieldsContainer.appendChild(newField);

                addFieldEventListeners(newField);
                updatePreviewFields();
                fieldIndex++;
            });
        }

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

        document.querySelectorAll('.dynamic-field').forEach(field => {
            addFieldEventListeners(field);
        });

        function addFieldEventListeners(fieldElement) {
            const labelInput = fieldElement.querySelector('.field-label');
            const typeSelect = fieldElement.querySelector('.field-type');
            const requiredCheckbox = fieldElement.querySelector('.field-required');

            [labelInput, typeSelect, requiredCheckbox].forEach(element => {
                if (element) {
                    element.addEventListener('change', updatePreviewFields);
                    element.addEventListener('input', updatePreviewFields);
                }
            });
        }

        const titleInput = document.getElementById('title');
        const previewTitle = document.getElementById('preview-title');
        if (titleInput && previewTitle) {
            titleInput.addEventListener('input', function() {
                previewTitle.textContent = this.value;
            });
        }

        const descriptionInput = document.getElementById('description');
        const previewDescription = document.getElementById('preview-description');
        if (descriptionInput && previewDescription) {
            descriptionInput.addEventListener('input', function() {
                previewDescription.textContent = this.value;
            });
        }

        const buttonTextInput = document.getElementById('button_text');
        const previewButton = document.getElementById('preview-button');
        if (buttonTextInput && previewButton) {
            buttonTextInput.addEventListener('input', function() {
                previewButton.textContent = this.value;
            });
        }

        updatePreviewFields();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const backgroundInput = document.getElementById('background');
        const backgroundPreview = document.getElementById('background-preview');

        if (backgroundInput && backgroundPreview) {
            backgroundInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function(event) {
                        backgroundPreview.src = event.target.result;
                    };

                    reader.readAsDataURL(this.files[0]);
                } else {
                    @if($selectedEvent && $selectedEvent->background)
                        backgroundPreview.src = "{{ asset('storage/' . $selectedEvent->background) }}";
                    @else
                        backgroundPreview.src = "../user/assets/img/colored-paper.jpg";
                    @endif
                }
            });
        }
    });
</script>