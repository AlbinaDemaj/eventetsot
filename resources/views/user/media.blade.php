<div class="space-y-6">
    <div class="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div class="max-w-2xl">
                <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                    Photo & Video
                </p>

                <h2 class="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">
                    Fotografitë dhe videot tuaja
                </h2>

                <p class="mt-3 text-sm leading-7 text-slate-500">
                    Këtu mund të gjeni të gjitha fotot dhe videot e ngjarjes tuaj.
                    Ju gjithashtu mund të ngarkoni foto të reja dhe t’i menaxhoni
                    në një mënyrë më të organizuar dhe moderne.
                </p>
            </div>

            <div class="rounded-2xl border border-[#EEE8FF] bg-[#FAF8FF] px-4 py-3">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Event aktiv
                </p>
                <p class="mt-1 text-sm font-bold text-slate-900">
                    {{ $selectedEvent->name ?? 'Asnjë event aktiv' }}
                </p>
            </div>
        </div>

        <div class="mt-6 grid gap-3 md:grid-cols-2">
            <button
                type="button"
                onclick="window.open('{{ url('events/' . ($selectedEvent->code ?? '')) }}', '_blank');"
                class="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)] transition hover:opacity-95"
            >
                Ngarko foto
            </button>

            @if(isset($userActiveSubscription) && $userActiveSubscription->payment_method !== 'free')
                <button
                    type="button"
                    onclick="window.location.href='{{ route('user.media.download', ['id' => $selectedEvent->id]) }}'"
                    class="inline-flex items-center justify-center rounded-2xl border border-[#EAE5FA] bg-[#FAF8FF] px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#F2EEFF]"
                >
                    Shkarko të gjitha fotot/videot
                </button>
            @endif
        </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div class="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                        Storage
                    </p>
                    <h3 class="mt-2 text-xl font-black text-slate-900">
                        Kufiri i ngarkimit
                    </h3>
                </div>

                <span class="rounded-full bg-[#F7F4FF] px-3 py-1 text-xs font-bold text-[#7B61FF]">
                    Plani falas
                </span>
            </div>

            <div class="mt-6 flex items-center justify-center">
                <div class="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#7B61FF_0deg,#8F7DFF_86deg,#E9E4FF_86deg,#E9E4FF_360deg)] p-3">
                    <div class="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
                        <span class="text-3xl font-black text-slate-900">24%</span>
                        <span class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            përdorur
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="h-3 w-full overflow-hidden rounded-full bg-[#EFEAFE]">
                    <div class="h-full w-[24%] rounded-full bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)]"></div>
                </div>

                <div class="mt-3 flex items-center justify-between text-sm">
                    <span class="text-slate-500">0 nga 100 ngarkime të përdorura</span>
                    <span class="font-semibold text-slate-900">24%</span>
                </div>
            </div>

            <button
                type="button"
                class="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#EAE5FA] bg-[#FAF8FF] px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#F2EEFF]"
                data-bs-toggle="modal"
                data-bs-target="#pricingModal"
                data-bs-whatever="@mdo"
            >
                Merr më shumë
            </button>
        </div>

        <div class="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4">
                <div>
                    <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                        Gallery
                    </p>
                    <h3 class="mt-2 text-xl font-black text-slate-900">
                        Media e ngarkuar
                    </h3>
                </div>

                <span class="rounded-full border border-[#ECE7FA] bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    {{ $media->count() }} items
                </span>
            </div>

            @if($media->count())
                <div class="mt-6 grid gap-4 sm:grid-cols-2">
                    @foreach($media as $med)
                        <div class="group overflow-hidden rounded-[24px] border border-[#F0ECFB] bg-[#FCFBFF] shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
                            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                <a
                                    href="{{ route('user.media.destroy', $med->id) }}"
                                    class="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-red-50"
                                >
                                    <img src="{{ asset('assets/img/trash.svg') }}" alt="Delete" class="h-4 w-4">
                                </a>

                                <div class="h-full w-full cursor-pointer" data-bs-toggle="modal" data-bs-target="#lightboxModal">
                                    <img
                                        src="{{ $med->file_path }}"
                                        alt="Media"
                                        class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                    >
                                </div>
                            </div>

                            <div class="p-4">
                                <div class="flex items-center justify-between gap-3">
                                    <div class="min-w-0">
                                        <p class="truncate text-sm font-bold text-slate-900">
                                            Media item
                                        </p>
                                        <p class="mt-1 text-xs text-slate-500">
                                            {{ $med->created_at ? $med->created_at->format('d M Y, H:i') : 'Pa datë' }}
                                        </p>
                                    </div>

                                    <span class="rounded-full bg-[#F7F4FF] px-3 py-1 text-[11px] font-bold text-[#7B61FF]">
                                        Upload
                                    </span>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="mt-6 rounded-[28px] border border-[#ECE8F8] bg-[#FCFBFF] p-10 text-center">
                    <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl">
                        🖼️
                    </div>

                    <h3 class="mt-5 text-2xl font-black text-slate-900">
                        Nuk ka ende media
                    </h3>

                    <p class="mt-3 text-sm leading-7 text-slate-500">
                        Kur të ftuarit të ngarkojnë foto ose video, ato do të shfaqen këtu.
                    </p>
                </div>
            @endif
        </div>
    </div>
</div>