export default function UserHomePage({ selectedEvent }) {
    const eventUrl = selectedEvent?.code
        ? `${window.location.origin}/events/${selectedEvent.code}`
        : "";

    const copyURL = async () => {
        if (!eventUrl) return;

        try {
            await navigator.clipboard.writeText(eventUrl);
            alert("Linku u kopjua!");
        } catch (error) {
            alert("Kopjimi dështoi.");
        }
    };

    const openURL = () => {
        if (!eventUrl) return;
        window.open(eventUrl, "_blank");
    };

    const downloadQR = () => {
        if (!selectedEvent?.qr_code) return;

        const link = document.createElement("a");
        link.href = selectedEvent.qr_code;
        link.download = "qr-code.png";
        link.click();
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,#ffffff_0%,#f8f6ff_45%,#fdfbff_100%)] p-8 shadow-[0_20px_60px_rgba(123,97,255,0.10)] lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.14),transparent_24%)]" />
                <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#E9E2FF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] backdrop-blur">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                        Digital Album Experience
                    </div>

                    <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <h1 className="max-w-3xl text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
                                Menaxho albumin e eventit tuaj në një mënyrë moderne dhe elegante
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-[15px]">
                                Ndani linkun, përdorni QR code dhe krijoni një eksperiencë të pastër
                                për mysafirët tuaj. Çdo event bëhet më i lehtë për t’u shpërndarë,
                                më profesional për t’u prezantuar dhe më i bukur për t’u menaxhuar.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <div className="rounded-2xl border border-[#EEE8FF] bg-white px-4 py-3 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                        Status
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {selectedEvent ? "Aktiv" : "Pa event"}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#EEE8FF] bg-white px-4 py-3 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                        Sharing
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        Link + QR Code
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#EEE8FF] bg-white px-4 py-3 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                        Experience
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        Premium & Simple
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-white/80 bg-white/80 p-5 backdrop-blur shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                Quick overview
                            </p>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8FF] px-4 py-3">
                                    <span className="text-sm text-slate-500">Event aktiv</span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {selectedEvent?.name || "Asnjë"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8FF] px-4 py-3">
                                    <span className="text-sm text-slate-500">Data</span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {selectedEvent?.event_date || "Pa datë"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8FF] px-4 py-3">
                                    <span className="text-sm text-slate-500">Kodi</span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {selectedEvent?.code || "---"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {!selectedEvent ? (
                <section className="rounded-[32px] border border-[#ECE8F8] bg-white p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.05)] lg:p-12">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-5xl shadow-inner">
                        ✨
                    </div>

                    <h2 className="mt-6 text-3xl font-black tracking-[-0.03em] text-slate-900">
                        Nuk keni ende event aktiv
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                        Krijoni eventin tuaj të parë për të gjeneruar linkun dhe QR kodin që
                        mysafirët tuaj do ta përdorin për të ngarkuar foto dhe video.
                    </p>

                    <a
                        href="/user/onboarding"
                        className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(123,97,255,0.25)] transition hover:scale-[1.02]"
                    >
                        Krijo event
                        <span>→</span>
                    </a>
                </section>
            ) : (
                <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-6">
                        <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] lg:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                        Active event
                                    </p>

                                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900">
                                        {selectedEvent.name}
                                    </h2>

                                    <p className="mt-3 text-sm text-slate-500">
                                        {selectedEvent.event_date || "Pa datë"}
                                    </p>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E1FF] bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                    Ready to share
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-[#FCFBFF] p-4 ring-1 ring-[#F1EDFF]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Event code
                                    </p>
                                    <p className="mt-2 truncate text-sm font-bold text-slate-900">
                                        {selectedEvent.code}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#FCFBFF] p-4 ring-1 ring-[#F1EDFF]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Album access
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-slate-900">
                                        Link publik
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-[#FCFBFF] p-4 ring-1 ring-[#F1EDFF]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        QR sharing
                                    </p>
                                    <p className="mt-2 text-sm font-bold text-slate-900">
                                        Gati për print
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] lg:p-7">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                        Event link
                                    </p>
                                    <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-900">
                                        Shpërndaje me një klik
                                    </h3>
                                </div>

                                <div className="hidden rounded-full bg-[#F8F6FF] px-4 py-2 text-xs font-semibold text-slate-500 sm:block">
                                    Fast sharing
                                </div>
                            </div>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Përdor këtë link për ta ndarë albumin me mysafirët. Ata mund të
                                hyjnë direkt dhe të ngarkojnë kujtimet e eventit tuaj.
                            </p>

                            <div className="mt-5 rounded-[24px] border border-[#EEE8FF] bg-[#FAFBFF] p-3">
                                <input
                                    value={eventUrl}
                                    readOnly
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                                />
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={copyURL}
                                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)] transition hover:scale-[1.01]"
                                >
                                    Kopjo linkun
                                </button>

                                <button
                                    onClick={openURL}
                                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Hape eventin
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)] lg:p-7">
                        <div className="text-center">
                            <span className="inline-flex rounded-full border border-[#E8E0FF] bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                QR Access
                            </span>

                            <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-900">
                                Kodi QR i eventit
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Ideale për printim, tavolina, hyrje ose ekran. Mysafirët mund ta
                                skanojnë dhe të hyjnë menjëherë në album.
                            </p>
                        </div>

                        <div className="mt-6 rounded-[28px] border border-[#EEE8FF] bg-[linear-gradient(180deg,#FCFBFF_0%,#F9F7FF_100%)] p-5 shadow-inner">
                            <div className="rounded-[22px] bg-white p-4">
                                <img
                                    src={selectedEvent.qr_code}
                                    alt="QR Code"
                                    className="mx-auto w-full max-w-[240px]"
                                />
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <button
                                onClick={downloadQR}
                                className="w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(123,97,255,0.22)] transition hover:scale-[1.01]"
                            >
                                Shkarko QR
                            </button>

                            <button
                                onClick={openURL}
                                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Hape albumin
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}