<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - EventetSot</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite('resources/js/admin-panel.jsx')
</head>
<body>
    <div
        id="admin-panel-root"
        data-page='@json($page)'
        data-user='@json($user)'
        data-extra='@json($extra)'
    ></div>
</body>
</html>