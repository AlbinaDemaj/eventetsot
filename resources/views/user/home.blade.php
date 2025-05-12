@extends('user.layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="page-heading mt-3">
            <h2>Here you'll find everything you need to manage your wedding.</h2>
        </div>
        <div class="main-content">
            <div class="row">
                <div class="col-md-6">
                    <div class="mbl-area">
                        <h3>Your Digital Album</h3>
                        <p class="mt-3">Guests can easily upload new photos or browse existing ones in the digital album.
                            Share it by sending a direct link or a unique QR code perfect for printing or
                            displaying on screens.</p>
                    </div>
                    <div class="form-area pt-3">
                        <div class="form-group">
                            <div class="input-wrapper">
                                <i class="fa-solid fa-copy"></i>
                                <input type="password" id="password" placeholder="app.evemtetsot.com/x9joci" required>
                                <button class="opn-btn">Open</button>
                            </div>
                        </div>
                    </div>
                    <div class="qr-code">
                        <button type="submit" class="login-btn">
                            Download QR Code <i class="fa-solid fa-cloud-arrow-down"></i>
                        </button>
                        <div class="qr-img">
                            <img src="{{ asset('user/assets/img/qr-code.png') }}" alt="" />
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
