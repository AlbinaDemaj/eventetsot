@extends('user.layouts.app')

@section('content')

    <div class="page-top mt-3">
        <div class="row">
            <div class="col-xl-6 col-lg-12 mb-3 mb-xl-0">
                <div class="live-preview">
                    <h2>Fotografitë dhe videot tuaja</h2>
                    <p>Këtu mund të gjeni të gjitha fotot dhe videot e ngjarjes tuaj. Ju gjithashtu mund të ngarkoni fotot tuaja dhe ato do të
                        shfaqen në Murin tuaj fotografik dhe <a href="#" >Album dixhital.</a></p>
                    <button type="button" onclick="window.open('{{ url('events/'.$selectedEvent->code) }}', '_blank');" class="login-btn">
                        Ngarko foto
                    </button>
                </div>

            </div>
            <div class="col-xl-6 col-lg-12">
                <div class="progress-main">
                    <div class="progress-bar">
                        <div id="progress-bar--container">
                            <svg viewBox="0 0 100 100">
                                <circle stroke="#EAEAEA" stroke-width="5.5" cx="50" cy="50" r="30" fill="none" />
                                <circle id="progress--circle" stroke="#28411B" stroke-width="5.5" cx="50" cy="50" r="30" fill="none"
                                        pathLength="100" />
                                <text id="progress--text" x="50" y="48" text-anchor="middle" dominant-baseline="middle">0%</text>
                                <text id="progress--text" class="progress--text--second" x="50" y="55" text-anchor="middle"
                                      dominant-baseline="middle"></text>
                            </svg>
                        </div>
                        <div class="meter-info">
                            <p>Progress: <output id="meter--progress">0%</output></p>
                            <input id="meter--ranger" type="range" value="24" min="0" max="100">
                        </div>
                        <div class="progressbar-text">
                            <h3>Kufiri i ngarkimit (Plani falas)</h3>
                            <p>0 nga 100 ngarkime të përdorura</p>
                        </div>
                    </div>

                    <div class="progress-btn">
                        <button type="submit" class="login-btn">
                            Merr më shumë
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <div class="main-content">
        <!-- Tab content -->
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <section class="uploaded-photos mt-4 mb-5 pb-5">
                    <div class="row">
                        @foreach($media as $med)
                        <div class="col-md-3">
                            <div class="uploaded-img">
                                <a href="{{ route('user.media.destroy', $med->id) }}" class="remove-img"><img src="assets/img/trash.svg"></a>
                                <div class="img-box" data-bs-toggle="modal" data-bs-target="#lightboxModal"><img src="{{ asset('storage/' . $med->file_path) }}"></div>

                                <!-- Show this button when caption is added -->
                                <!-- <span class="btn btn-outline-success disabled d-flex align-items-center justify-content-center gap-4" data-bs-toggle="modal" data-bs-target="#addCaption"><img src="img/check-2.svg"> Caption Added</span> -->
                            </div>
                        </div>
                        @endforeach
                    </div>
                </section>
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <p class="alert alert-secondary">Uploads here are hidden from guests and won't appear in the album</p>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <p class="alert alert-warning">Uploads here are hidden from guests and won't appear in the album</p>
            </div>
        </div>
    </div>

@endsection
