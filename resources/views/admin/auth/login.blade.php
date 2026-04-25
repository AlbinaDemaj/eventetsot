<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - EventetSot</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css'])
</head>
<body class="min-h-screen bg-[linear-gradient(to_bottom_right,#fcfbff,#f7f4ff,#f9fbff)]">
    <div class="flex min-h-screen items-center justify-center px-4">
        <div class="w-full max-w-md rounded-[32px] border border-[#ECEAF4] bg-white p-8 shadow-[0_20px_60px_rgba(123,97,255,0.10)]">
            <div class="mb-8 text-center">
                <span class="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                    Admin Panel
                </span>
                <h1 class="mt-4 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                    Kyçu si Admin
                </h1>
                <p class="mt-2 text-sm text-[#7C7890]">
                    Përdor kredencialet e tabelës admins.
                </p>
            </div>

            @if ($errors->any())
                <div class="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login.submit') }}" class="space-y-5">
                @csrf

                <div>
                    <label class="mb-2 block text-sm font-semibold text-[#1F1B2D]">Email</label>
                    <input
                        type="email"
                        name="email"
                        value="{{ old('email') }}"
                        required
                        autocomplete="email"
                        class="w-full rounded-2xl border border-[#E7E1F7] bg-[#FCFBFF] px-4 py-3 text-sm text-[#1F1B2D] outline-none transition focus:border-[#CFC5FF] focus:bg-white"
                        placeholder="admin@eventetsot.com"
                    >
                </div>

                <div>
                    <label class="mb-2 block text-sm font-semibold text-[#1F1B2D]">Fjalëkalimi</label>
                    <input
                        type="password"
                        name="password"
                        required
                        autocomplete="current-password"
                        class="w-full rounded-2xl border border-[#E7E1F7] bg-[#FCFBFF] px-4 py-3 text-sm text-[#1F1B2D] outline-none transition focus:border-[#CFC5FF] focus:bg-white"
                        placeholder="Shkruaj fjalëkalimin"
                    >
                </div>

                <div class="flex items-center justify-between text-sm">
                    <label class="flex items-center gap-2 text-[#6B6880]">
                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                        <span>Më kujto mua</span>
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full rounded-2xl bg-[linear-gradient(90deg,#7B61FF,#6EC3F4)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/20 transition hover:opacity-95"
                >
                    Kyçu
                </button>
            </form>
        </div>
    </div>
</body>
</html>