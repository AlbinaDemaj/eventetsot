@extends('website.layouts.event')

@section('content')

    <header>
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html"><img src="img/logo.svg"></a>
                    <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Ballina</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="pricing.html">Abonimi</a>
                            </li>

                        </ul>
                        <div class="d-flex gap-4 align-items-center">
                            <a href="#" class="nav-link">Kyçu</a>
                            <a href="#" class="btn e-btn-primary">Filloni</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <section class="uploaded-photos mt-4 mb-5 pb-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="uploaded-img">
                        <span class="remove-img"><img src="img/trash.svg"></span>
                        <div class="img-box"><img src="img/cta-img.png"></div>

                        <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption"><img src="img/caption.svg"> Add Caption</span>

                        <!-- Show this button when caption is added -->
                        <!-- <span class="btn btn-outline-success disabled d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption"><img src="img/check-2.svg"> Caption Added</span> -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="uploaded-img">
                        <span class="remove-img"><img src="img/trash.svg"></span>
                        <div class="img-box"><img src="img/cta-img.png"></div>
                        <span class="btn e-btn-ghost d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption"><img src="img/caption.svg"> Add Caption</span>

                        <!-- Show this button when caption is added -->
                        <!-- <span class="btn btn-outline-success disabled d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption"><img src="img/check-2.svg"> Caption Added</span> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    <button class="add-photos btn" onclick="window.location.href='upload-album.html';"><img src="img/addphotos.svg"></button>
    <button class="btn e-btn-primary upload-selected">Upload 1 Item</button>

    <!-- Modal -->
    <div class="modal fade" id="addCaption" tabindex="-1" aria-labelledby="addCaptionLabel" aria-hidden="true">
        <div class="modal-dialog modal-md"> <!-- Use modal-sm for small size -->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCaptionLabel">Add Caption</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Caption</label>
                            <textarea rows="6" cols="6" placeholder="Write a caption for this photo here" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" name="name" placeholder="Name">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn e-btn-primary" data-bs-dismiss="modal">Save Caption</button>
                    <button type="button" class="btn e-btn-ghost" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

@endsection

