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
        <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,247,255,0.98))] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7B61FF]/10 blur-3xl" />
                <div className="absolute bottom-0 left-20 h-24 w-24 rounded-full bg-[#6EC3F4]/10 blur-3xl" />

                <div className="relative">
                    <span className="inline-flex rounded-full border border-[#E7E1FF] bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                        Digital Album
                    </span>

                    <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-900 sm:text-4xl">
                        Albumi juaj digjital
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-[15px]">
                        Ndani eventin me një link unik ose QR Code në një mënyrë
                        moderne, elegante dhe të lehtë për t’u përdorur. Të ftuarit
                        mund të ngarkojnë foto dhe video direkt në albumin tuaj.
                    </p>

                    {selectedEvent && (
                        <div className="mt-6 flex flex-wrap gap-3">
                            <div className="rounded-2xl border border-[#EEE8FF] bg-white px-4 py-3 shadow-sm">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7B61FF]">
                                    Eventi aktiv
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {selectedEvent.name}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#EEF3FF] bg-white px-4 py-3 shadow-sm">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#4F9FD8]">
                                    Data
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {selectedEvent.event_date || "Pa datë"}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#FDE7EF] bg-white px-4 py-3 shadow-sm">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E07AA5]">
                                    Status
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    Ready to share
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!selectedEvent ? (
                <div className="rounded-[32px] border border-[#ECE8F8] bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-10">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl shadow-inner">
                        📅
                    </div>

                    <h3 className="mt-5 text-2xl font-black text-slate-900">
                        Nuk keni ende event
                    </h3>

                    <p className="mt-3 text-slate-500">
                        Filloni duke krijuar një event të ri dhe do të gjenerohet
                        menjëherë linku dhe QR Code.
                    </p>

                    <a
                        href="/user/onboarding"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(123,97,255,0.20)] transition hover:scale-[1.02]"
                    >
                        Krijo event
                        <span>→</span>
                    </a>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                        <div className="space-y-6">
                            <div className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                            Active event
                                        </p>

                                        <h3 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900">
                                            {selectedEvent.name}
                                        </h3>

                                        <p className="mt-3 text-sm text-slate-500">
                                            {selectedEvent.event_date || "Pa datë"}
                                        </p>
                                    </div>

                                    <div className="rounded-full bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                        Live sharing enabled
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                            Event link
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-900">
                                            Shpërndaje eventin me link
                                        </h3>
                                    </div>

                                    <div className="rounded-full border border-[#EEE8FF] bg-[#FCFBFF] px-4 py-2 text-xs font-semibold text-slate-500">
                                        {selectedEvent.code}
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[24px] border border-[#EEF1F7] bg-[#FAFBFF] p-3">
                                    <div className="flex flex-col gap-3 lg:flex-row">
                                        <input
                                            value={eventUrl}
                                            readOnly
                                            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
                                        />

                                        <button
                                            onClick={copyURL}
                                            className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(123,97,255,0.18)] transition hover:scale-[1.02]"
                                        >
                                            Copy
                                        </button>

                                        <button
                                            onClick={openURL}
                                            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                        >
                                            Open
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[22px] border border-[#F3F0FF] bg-[#FCFBFF] p-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Code i eventit
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {selectedEvent.code}
                                        </p>
                                    </div>

                                    <div className="rounded-[22px] border border-[#EEF3FF] bg-[#FBFDFF] p-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Link i gatshëm për ndarje
                                        </p>
                                        <p className="mt-1 truncate text-sm text-slate-500">
                                            {eventUrl}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,#ffffff,#faf8ff)] p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                            <div className="inline-flex rounded-full bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                QR Access
                            </div>

                            <h3 className="mt-4 text-2xl font-black tracking-[-0.02em] text-slate-900">
                                Kodi QR i eventit
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Shkarko kodin QR dhe përdore për printim ose për
                                shfaqje në ekran që të ftuarit të futen menjëherë.
                            </p>

                            <div className="mt-5 rounded-[26px] border border-[#EEE8FF] bg-white p-5 shadow-inner">
                                <img
                                    src={selectedEvent.qr_code}
                                    alt="QR Code"
                                    className="mx-auto w-full max-w-[220px]"
                                />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="mt-5 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(123,97,255,0.22)] transition hover:scale-[1.02]"
                            >
                                Shkarko QR
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <a
                            href={`/events/${selectedEvent.code}`}
                            className="rounded-[24px] border border-white/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                Quick access
                            </p>
                            <h4 className="mt-3 text-xl font-black text-slate-900">
                                Shiko eventin
                            </h4>
                            <p className="mt-2 text-sm leading-7 text-slate-500">
                                Hap pamjen publike të eventit dhe shiko përvojën si një i ftuar.
                            </p>
                        </a>

                        <a
                            href="/user/media"
                            className="rounded-[24px] border border-white/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4F9FD8]">
                                Gallery
                            </p>
                            <h4 className="mt-3 text-xl font-black text-slate-900">
                                Menaxho median
                            </h4>
                            <p className="mt-2 text-sm leading-7 text-slate-500">
                                Shiko, shkarko dhe organizo fotot dhe videot e ngarkuara.
                            </p>
                        </a>

                        <a
                            href="/user/settings"
                            className="rounded-[24px] border border-white/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E07AA5]">
                                Customization
                            </p>
                            <h4 className="mt-3 text-xl font-black text-slate-900">
                                Rregullo pamjen
                            </h4>
                            <p className="mt-2 text-sm leading-7 text-slate-500">
                                Personalizo eventin, detajet dhe eksperiencën për të ftuarit.
                            </p>
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}