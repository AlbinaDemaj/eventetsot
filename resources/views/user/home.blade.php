@extends('user.layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="page-heading mt-3">
            <h2>Këtu do të gjeni gjithçka që ju nevojitet për të menaxhuar eventin tuaj</h2>
        </div>
        <div class="main-content">
            <div class="row">
                <div class="col-md-6">
                    <div class="mbl-area">
                        <h3>Albumi juaj digjital</h3>
                        <p class="mt-3">Të ftuarit mund të ngarkojnë lehtësisht foto të reja ose të shfletojnë ato ekzistuese në albumin digjital. Ndajeni duke dërguar një link të drejtpërdrejtë ose një kod QR unik – perfekt për printim ose shfaqje në ekrane.</p>
                    </div>

                    <div class="form-area pt-3">
                        <div class="form-group">
                            
                            <div class="input-wrapper">
                                <i class="fa-solid fa-copy" onclick="copyURL()"></i>
                                <input type="text" readonly id="url" value="{{ url('events/'.$selectedEvent->code) }}" required>
                                <button class="opn-btn" onclick="openURL()">Hap</button>
                            </div>
                        </div>
                    </div>
                    <div class="qr-code">
                        <button type="button" class="login-btn" onclick="downloadQRCode()">
                            Shkarko Kodin QR <i class="fa-solid fa-cloud-arrow-down"></i>
                        </button>
                        <div class="qr-img">
                            <img src="{{ $selectedEvent->qr_code }}" alt="" id="event-qr"/>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mbl-img">
                        <img src="{{ asset('user/assets/img/mobile-img.png') }}" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
