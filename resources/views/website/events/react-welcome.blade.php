<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $event->name ?? 'EventetSot' }}</title>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/event-public.jsx'])
</head>
<body>
    <div
        id="event-public-root"
        data-page="welcome"
        data-event='@json($event)'
    ></div>
</body>
</html>