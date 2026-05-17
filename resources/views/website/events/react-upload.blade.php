<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Ngarko media - EventetSot</title>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/event-public.jsx'])
</head>
<body>
    <div
        id="event-public-root"
        data-page="upload"
        data-event='@json($event)'
        data-templates='@json($templates)'
    ></div>
</body>
</html>