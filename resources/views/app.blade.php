<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title inertia>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
