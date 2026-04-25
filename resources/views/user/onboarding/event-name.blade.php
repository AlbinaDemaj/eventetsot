<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite('resources/js/onboarding.jsx')
    <title>Event Name - EventetSot</title>
</head>
<body>
    <div
        id="onboarding-root"
        data-page="event-name"
        data-csrf="{{ csrf_token() }}"
        data-old-event-name="{{ old('event_name') }}"
        data-errors='@json($errors->toArray())'
    ></div>
</body>
</html>