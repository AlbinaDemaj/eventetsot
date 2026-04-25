<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite('resources/js/user-panel.jsx')
    <title>User Panel - EventetSot</title>
</head>
<body class="bg-[#F7F5FC]">
    <div
        id="user-panel-root"
        data-page='@json($page ?? "home")'
        data-user='@json(auth()->user())'
        data-selected-event='@json($selectedEvent ?? null)'
        data-events='@json($events ?? auth()->user()->events()->latest()->get())'
        data-extra='@json($extra ?? [])'
        data-media='@json($media ?? [])'
        data-event='@json($event ?? $selectedEvent ?? null)'
    ></div>
</body>
</html>