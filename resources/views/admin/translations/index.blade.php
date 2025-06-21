@extends('admin.layouts.app')

@section('content')
    <div class="container">
        <h1>Translations</h1>

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

        {{ $translations->links() }}
    </div>
@endsection
