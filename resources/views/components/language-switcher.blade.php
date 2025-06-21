<div class="language-switcher">
    @foreach(\App\Models\Language::all() as $language)
        <a href="{{ route('set-locale', $language->code)  }}"
           class="{{ app()->getLocale() === $language->code ? 'active' : '' }}">
            {{ strtoupper($language->code) }}
        </a>
        @if(!$loop->last) | @endif
    @endforeach
</div>
