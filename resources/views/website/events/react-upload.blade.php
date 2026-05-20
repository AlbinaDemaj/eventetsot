<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $event->name ?? 'Galeria e eventit' }}</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/event-public.jsx'])
</head>
<body>
    <div
        id="event-public-root"
        data-page="show"
        data-event='@json($event)'
        data-gallery='@json($event->media ?? [])'
        data-upload-url="{{ url('/events/' . $event->code . '/guest-media') }}"
    ></div>
</body>
</html>