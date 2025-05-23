@extends('website.layouts.app')

@section('content')
<section class="contact-form">
    <div class="container">
      <div class="form-heading">
        <h2>Na Kontaktoni Për Çdo Pyetje</h2>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="form-input">
            <label for="fname">Emri Mbiemri:</label>
            <input type="text" id="fname" name="fname" placeholder="Emri Mbiemri">
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="form-input">
            <label for="fname">Email:</label>
            <input type="text" id="fname" name="email" placeholder="Email">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <div class="form-input">
            <label for="fname">Numri i Kontaktit:</label>
            <input type="text" id="fname" name="fname" placeholder="Numri i Kontaktit">
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <div class="form-input">
            <label for="fname">Mesazhi:</label>
            <textarea type="text" id="fname" name="fname" rows="8" placeholder="Mesazhi"></textarea>
          </div>
        </div>
        <div class="col-md-12 text-end">
          <a href="#" class="btn e-btn-primary">Dërgo</a>
        </div>
      </div>
    </div>
  </section>
@endsection
