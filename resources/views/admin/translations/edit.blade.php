@extends('admin.layouts.app')

@section('content')
    <div class="edit-form mt-4">
        
            <h1>Edit Translation</h1>
            <div class="edit-form-inner">
                <form action="{{ route('admin.translations.update', $translation->id) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="form-group mb-3">
                        <input type="hidden" class="form-control" value="{{ $translation->group }}" readonly>
                    </div>

                    <div class="form-group mb-3">
                        <input type="hidden" class="form-control" value="{{ $translation->key }}" readonly>
                    </div>

                    @foreach($languages as $language)
                        <div class="form-group mb-3">
                            <label>{{ $language->name }} ({{ $language->code }})</label>
                            @php
                                $item = $translation->items->where('language_id', $language->id)->first();
                            @endphp
                            <textarea name="translations[{{ $language->code }}]" class="form-control" rows="3">{{ $item->value ?? '' }}</textarea>
                        </div>
                    @endforeach

                    <button type="submit" class="btn login-btn">Update Translation</button>
                </form>
            </div>
        
    </div>
@endsection
