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
                        <button type="submit" class="login-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
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

    {{-- Price Modal --}}
    <div class="modal fade pricing-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body">
                <section class="epricing my-5">
                    <div class="container">
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="pricing-table">
                                    <h2><strong>Falas</strong><br><small>€</small>0</h2>
                                    <p>E shkëlqyeshme për ditëlindje, mbledhje familjare dhe ngjarje apo raste të tjera të vogla.</p>
                                    <ul class="checkitems mb-4 pricing text-start">
                                        <li>Deri në 20 ngarkime fotosh dhe videosh</li>
                                        <li>Të ftuar dhe pjesëmarrës të pakufizuar</li>
                                        <li>Ngarkimet ruhen për 7 ditë</li>
                                        <li>Opsione bazë për personalizim</li>
                                        <li>Aktive për 3 orë nga data e eventit</li>
                                        <li>Të gjitha ngarkimet ruhen në cilësi të mirë</li>
                                    </ul>
                                    <a href="#" class="btn login-btn">Krijoni Eventin Tuaj</a>
                                </div>
                            </div>
            
                            <div class="col-md-6">
                                <div class="pricing-table">
                                    <h2><strong>Plus</strong><br><small>€</small>100</h2>
                                    <p>Ideale për dasma të mëdha, konferenca, koncerte, festa dhe eventet publike.</p>
                                    <ul class="checkitems mb-4 pricing text-start">
                                        <li>Ngarkime të pakufizuara të fotove dhe videove</li>
                                        <li>Të ftuar dhe pjesëmarrës të pakufizuar</li>
                                        <li>Ngarkimet ruhën për 6 muaj</li>
                                        <li>Opsione të avancuara për personalizim</li>
                                        <li>Aktive për 30 ditë nga data e eventit</li>
                                        <li>Të gjitha ngarkimet ruhën në cilësi të lartë</li>
                                        <li>Shkarkoni të gjitha fotot dhe videot menjëherë</li>
                                    </ul>
                                    <a href="javascript:" class="btn login-btn" data-bs-toggle="modal" data-bs-target="#paymentpay">
                                        Krijoni Eventin Tuaj
                                    </a>
            
                                    <form id="subscribe-form-1" action="{{ route('subscriptions.subscribe', 1) }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
            
          </div>
        </div>
    </div>

    <div class="modal fade" id="paymentpay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content ">
            <div class="modal-header">
              
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
                <div class="payment-modal">
                    <div class="payment-right-side">
                        <h3>Order Summary</h3>
                        <h2>$99.00</h2>
                        <h5><img src="{{ asset('user/assets/img/logo.png') }}" /> Pro Event</h5>
                        <div class="price-total-main">
                            <div class="price-subtotal">
                                <h4>Subtotal</h4>
                                <h5>$99.00</h5>
                            </div>
                            <div class="price-vat">
                                <h4>VAT</h4>
                                <h5>$0.00</h5>
                            </div>
                            <div class="price-total">
                                <h4>Total</h4>
                                <h5>$99.00</h5>
                            </div>
                        </div>
                    </div>
                    <div class="payment-left-side">
                        <h3>Your details</h3> 
                        <p>We collect this information to help combat fraud, and to keep your payment secure.</p>   
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input type="text" class="form-control" name="name" placeholder="Email">
                        </div>
                        <div class="form-group mb-3">
                            <label>Country</label>
                            <input type="text" class="form-control" name="name" placeholder="Country">
                        </div>
                        <button type="button" class="btn login-btn" data-bs-dismiss="modal">Continue</button>
                    </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
@endsection
