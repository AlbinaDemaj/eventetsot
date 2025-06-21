@extends('website.layouts.app')

@section('content')
    <section class="contact-form">
        <div class="container">
            <div class="form-heading">
                <h2>{{lang('website', 'contact.title')}}</h2>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <div class="form-input">
                        <label for="fname">{{lang('website', 'contact.form.full_name')}}</label>
                        <input type="text" id="fname" name="fname" placeholder="{{lang('website', 'contact.form.full_name_placeholder')}}">
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="form-input">
                        <label for="email">{{lang('website', 'contact.form.email')}}</label>
                        <input type="text" id="email" name="email" placeholder="{{lang('website', 'contact.form.email_placeholder')}}">
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <div class="form-input">
                        <label for="phone">{{lang('website', 'contact.form.phone')}}</label>
                        <input type="text" id="phone" name="phone" placeholder="{{lang('website', 'contact.form.phone_placeholder')}}">
                    </div>
                </div>
                <div class="col-md-12 mb-3">
                    <div class="form-input">
                        <label for="message">{{lang('website', 'contact.form.message')}}</label>
                        <textarea type="text" id="message" name="message" rows="8" placeholder="{{lang('website', 'contact.form.message_placeholder')}}"></textarea>
                    </div>
                </div>
                <div class="col-md-12 text-end">
                    <a href="#" class="btn e-btn-primary">{{lang('website', 'contact.form.submit')}}</a>
                </div>
            </div>
        </div>
    </section>
@endsection
