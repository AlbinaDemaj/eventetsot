@extends('website.layouts.event')

@section('content')
    <style>
        .event-welcome-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            position: relative;
            overflow: hidden;
            background:
                radial-gradient(circle at top left, rgba(123, 97, 255, 0.20), transparent 30%),
                radial-gradient(circle at bottom right, rgba(110, 195, 244, 0.18), transparent 28%),
                linear-gradient(180deg, #fdfcff 0%, #f7f5ff 55%, #f4f7ff 100%);
        }

        .event-welcome-page::before {
            content: "";
            position: absolute;
            inset: 0;
            background: rgba(10, 14, 30, 0.18);
            pointer-events: none;
        }

        .event-welcome-card {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 620px;
            border-radius: 36px;
            overflow: hidden;
            background:
                linear-gradient(rgba(17, 24, 39, 0.45), rgba(17, 24, 39, 0.58)),
                url('{{ $event->background ? asset('storage/' . $event->background) : asset('website/img/card-bg.png') }}');
            background-size: cover;
            background-position: center;
            box-shadow: 0 30px 80px rgba(15, 23, 42, 0.22);
            border: 1px solid rgba(255, 255, 255, 0.22);
        }

        .event-welcome-inner {
            padding: 38px 30px;
            backdrop-filter: blur(6px);
        }

        .event-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.16);
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        .event-logo-wrap {
            width: 108px;
            height: 108px;
            margin: 28px auto 20px;
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.12);
            border: 1px solid rgba(255, 255, 255, 0.18);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        }

        .event-logo-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .event-title {
            margin: 0;
            text-align: center;
            color: #ffffff;
            font-size: 38px;
            line-height: 1.1;
            font-weight: 900;
            letter-spacing: -0.03em;
        }

        .event-description {
            max-width: 500px;
            margin: 16px auto 0;
            text-align: center;
            color: rgba(255, 255, 255, 0.86);
            font-size: 15px;
            line-height: 1.8;
        }

        .event-form {
            margin-top: 30px;
        }

        .event-input-shell {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.14);
            border: 1px solid rgba(255, 255, 255, 0.16);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .event-input-shell input[type="text"] {
            flex: 1;
            min-width: 0;
            height: 56px;
            border: 0;
            outline: none;
            border-radius: 18px;
            padding: 0 18px;
            background: rgba(255, 255, 255, 0.94);
            color: #1f1a33;
            font-size: 15px;
            font-weight: 600;
            box-shadow: none;
        }

        .event-input-shell input[type="text"]::placeholder {
            color: #8a84a3;
            font-weight: 500;
        }

        .event-submit-btn {
            border: 0;
            outline: none;
            height: 56px;
            padding: 0 24px;
            border-radius: 18px;
            background: linear-gradient(135deg, #7B61FF, #8F7DFF, #6EC3F4);
            color: #fff;
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 0.01em;
            transition: all 0.25s ease;
            box-shadow: 0 14px 30px rgba(123, 97, 255, 0.26);
            white-space: nowrap;
        }

        .event-submit-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 18px 34px rgba(123, 97, 255, 0.32);
        }

        .event-footer-note {
            margin-top: 18px;
            text-align: center;
            color: rgba(255, 255, 255, 0.74);
            font-size: 13px;
            line-height: 1.7;
        }

        .event-mini-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 24px;
        }

        .event-mini-pill {
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.10);
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: #fff;
            font-size: 12px;
            font-weight: 700;
        }

        @media (max-width: 640px) {
            .event-welcome-inner {
                padding: 28px 18px;
            }

            .event-title {
                font-size: 30px;
            }

            .event-input-shell {
                flex-direction: column;
                align-items: stretch;
            }

            .event-submit-btn {
                width: 100%;
            }
        }
    </style>

    <div class="event-welcome-page">
        <div class="event-welcome-card">
            <div class="event-welcome-inner">
                <div class="event-badge {{ $event->is_animated ? 'animated-element' : '' }}">
                    Event Experience
                </div>

                <div class="event-logo-wrap {{ $event->is_animated ? 'animated-element-delay-1' : '' }}">
                    <img src="{{ asset($event->logo ?: 'website/img/card-bg.png') }}" alt="{{ $event->name }}">
                </div>

                <h1 class="event-title {{ $event->is_animated ? 'animated-element-delay-1' : '' }}">
                    {{ $event->name }}
                </h1>

                <p class="event-description {{ $event->is_animated ? 'animated-element-delay-2' : '' }}">
                    {{ $event->description ?: lang('website','event_welcome.default_description') }}
                </p>

                <form class="event-form" onsubmit="event.preventDefault(); window.location.href='{{ route('events.show', $event->code) }}';">
                    <div class="event-input-shell {{ $event->is_animated ? 'animated-element-delay-3' : '' }}">
                        <input
                            type="text"
                            name="name"
                            placeholder="{{ lang('website', 'event_welcome.name_placeholder') }}"
                        >

                        <button type="submit" class="event-submit-btn">
                            {{ lang('website', 'event_welcome.continue_button') }}
                        </button>
                    </div>
                </form>

                <p class="event-footer-note">
                    Mirë se vini në galerinë e eventit tuaj. Vazhdoni për të parë dhe ngarkuar kujtimet më të bukura.
                </p>

                <div class="event-mini-info">
                    <span class="event-mini-pill">Foto & Video</span>
                    <span class="event-mini-pill">Galeri e sigurt</span>
                    <span class="event-mini-pill">Eksperiencë moderne</span>
                </div>
            </div>
        </div>
    </div>
@endsection