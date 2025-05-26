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
            console.log('aa')
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


</script>
