@extends('admin.layouts.app')

@section('content')

    <div class="container">
        <h1>Create New Translation</h1>

        <form action="{{ route('admin.translations.store') }}" method="POST">
            @csrf

            <div class="form-group">
                <label for="group">Group</label>
                <select name="group" id="group" class="form-control" required>
                    <option value="">Select Group</option>
                    <option value="website">Website</option>
                </select>
                @error('group')
                <span class="text-danger">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="key">Translation Key</label>
                <input type="text" name="key" id="key" class="form-control" value="{{ old('key') }}" required>
                @error('key')
                <span class="text-danger">{{ $message }}</span>
                @enderror
                <small class="form-text text-muted">Use dot notation (e.g., 'website.title')</small>
            </div>

            <div class="card mb-4">
                <div class="card-header">Translations</div>
                <div class="card-body">
                    @foreach($languages as $language)
                        <div class="form-group">
                            <label for="translations_{{ $language->code }}">
                                {{ $language->name }} ({{ strtoupper($language->code) }})
                            </label>
                            <textarea name="translations[{{ $language->code }}]"
                                      id="translations_{{ $language->code }}"
                                      class="form-control"
                                      rows="3">{{ old("translations.{$language->code}") }}</textarea>
                            @error("translations.{$language->code}")
                            <span class="text-danger">{{ $message }}</span>
                            @enderror
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Save Translation</button>
                <a href="{{ route('admin.translations.index') }}" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
@endsection
