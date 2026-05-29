<div class="space-y-6">
    <div class="rounded-[30px] border border-[#ECE7FF] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                    Foto & Video
                </p>

                <h2 class="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900 sm:text-3xl">
                    {{ $selectedEvent->name ?? 'Galeria e eventit' }}
                </h2>
            </div>

            @if($selectedEvent)
                <button
                    type="button"
                    onclick="window.open('{{ url('events/' . $selectedEvent->code) }}', '_blank');"
                    class="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)] transition hover:scale-[1.02]"
                >
                    Ngarko foto/video
                </button>
            @endif
        </div>
    </div>

    <div class="rounded-[30px] border border-[#ECE7FF] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div class="flex items-center justify-between gap-4">
            <h3 class="text-xl font-black text-slate-900">
                Media e ngarkuar
            </h3>

            <span class="rounded-full bg-[#F7F4FF] px-3 py-1 text-xs font-bold text-[#7B61FF]">
                {{ $media->count() }} items
            </span>
        </div>

        @if($media->count())
            <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @foreach($media as $med)
                    <div class="group overflow-hidden rounded-[24px] border border-[#F0ECFB] bg-[#FCFBFF] shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
                        <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            <a
                                href="{{ route('user.media.destroy', $med->id) }}"
                                class="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-red-50"
                            >
                                <img src="{{ asset('assets/img/trash.svg') }}" alt="Delete" class="h-4 w-4">
                            </a>

                            <img
                                src="{{ $med->file_path }}"
                                alt="Media"
                                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            >
                        </div>

                        <div class="p-4">
                            <p class="text-xs text-slate-500">
                                {{ $med->created_at ? $med->created_at->format('d M Y, H:i') : 'Pa datë' }}
                            </p>
                        </div>
                    </div>
                @endforeach
            </div>
        @else
            <div class="mt-6 rounded-[28px] border border-[#ECE8F8] bg-[#FCFBFF] p-10 text-center">
                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F4F1FF] text-4xl">
                    🖼️
                </div>

                <h3 class="mt-5 text-2xl font-black text-slate-900">
                    Nuk ka ende foto/video
                </h3>

                <p class="mt-3 text-sm text-slate-500">
                    Kur të ngarkohen media, do të shfaqen këtu.
                </p>
            </div>
        @endif
    </div>
</div>