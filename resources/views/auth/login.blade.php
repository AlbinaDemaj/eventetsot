<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite('resources/js/auth.jsx')
    <title>Login - EventetSot</title>
</head>
<body>
    <div
        id="auth-root"
        data-page="login"
        data-csrf="{{ csrf_token() }}"
        data-old-email="{{ old('email') }}"
        data-errors='@json($errors->toArray())'
    ></div>
</body>
</html>