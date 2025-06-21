@extends('admin.layouts.app')

@section('content')
    <div class="container mt-5">
        <h1>Translations</h1>

        <div class="translation-table">
            <table class="table">
                <thead>
                <tr>
                    @foreach($languages as $language)
                        <th>{{ $language->name }}</th>
                    @endforeach
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($translations as $translation)
                    <tr>
                        @foreach($languages as $language)
                            <td>
                                @php
                                    $item = $translation->items->where('language_id', $language->id)->first();
                                @endphp
                                {{ Str::limit($item->value ?? '', 50) }}
                            </td>
                        @endforeach
                        <td>
                            <a href="{{ route('admin.translations.edit', $translation->id) }}" class="btn btn-sm btn-info">Edit</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        {{-- {{ $translations->links() }} --}}
    </div>
@endsection
