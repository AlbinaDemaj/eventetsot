export default function UserHomePage({ selectedEvent }) {
    const eventUrl = selectedEvent?.code
        ? `${window.location.origin}/events/${selectedEvent.code}`
        : "";

    const copyURL = async () => {
        if (!eventUrl) return;

        try {
            await navigator.clipboard.writeText(eventUrl);
            alert("Linku u kopjua me sukses!");
        } catch (error) {
            alert("Linku nuk u kopjua. Provo përsëri.");
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
        link.download = "kodi-qr-eventit.png";
        link.click();
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(123,97,255,0.18),transparent_28%),radial-gradient(circle_at_90%_0%,rgba(110,195,244,0.18),transparent_26%),linear-gradient(135deg,#ffffff_0%,#faf8ff_52%,#f8fbff_100%)]" />

                <div className="relative grid gap-8 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#E8E1FF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7B61FF] shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                            Album digjital
                        </div>

                        <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
                            Menaxho eventin dhe shpërndaje albumin në mënyrë elegante.
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-[15px]">
                            Kopjo linkun publik, hap albumin dhe shkarko kodin QR për mysafirët.
                            Çdo gjë është e organizuar, e thjeshtë dhe gati për t’u përdorur në event.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-3">
                            <StatCard title="Statusi" value={selectedEvent ? "Aktiv" : "Pa event"} />
                            <StatCard title="Qasja" value="Link publik" />
                            <StatCard title="Kodi QR" value="Gati për print" />
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/80 bg-white/85 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)] backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Përmbledhje
                        </p>

                        <div className="mt-5 space-y-3">
                            <InfoRow label="Eventi" value={selectedEvent?.name || "Nuk ka event"} />
                            <InfoRow label="Data" value={selectedEvent?.event_date || "Pa datë"} />
                            <InfoRow label="Kodi" value={selectedEvent?.code || "---"} />
                        </div>
                    </div>
                </div>
            </section>

            {!selectedEvent ? (
                <section className="relative overflow-hidden rounded-[34px] border border-[#EEE8FF] bg-white p-8 text-center shadow-[0_20px_55px_rgba(15,23,42,0.06)] lg:p-12">
                    <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#F4F0FF,transparent)]" />

                    <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] border border-[#EEE8FF] bg-[linear-gradient(135deg,#ffffff,#F6F2FF)] shadow-inner">
                        <span className="text-4xl font-black text-[#7B61FF]">+</span>
                    </div>

                    <h2 className="relative mt-6 text-3xl font-black tracking-[-0.035em] text-slate-950">
                        Nuk keni ende event aktiv
                    </h2>

                    <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500">
                        Krijoni eventin tuaj të parë për të gjeneruar linkun publik dhe kodin QR
                        që mysafirët do ta përdorin për të ngarkuar foto dhe video.
                    </p>

                    <a
                        href="/user/onboarding"
                        className="relative mt-7 inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(123,97,255,0.28)] transition hover:-translate-y-0.5"
                    >
                        Krijo eventin tani
                    </a>
                </section>
            ) : (
                <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-6">
                        <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                        Eventi aktiv
                                    </p>

                                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                                        {selectedEvent.name}
                                    </h2>

                                    <p className="mt-3 text-sm font-medium text-slate-500">
                                        {selectedEvent.event_date || "Pa datë të vendosur"}
                                    </p>
                                </div>

                                <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                                    Gati për shpërndarje
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <MiniCard label="Kodi i eventit" value={selectedEvent.code} />
                                <MiniCard label="Qasja" value="Album publik" />
                                <MiniCard label="Përdorimi" value="Link + QR" />
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                        Linku i eventit
                                    </p>

                                    <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950">
                                        Shpërndaje albumin me një klik
                                    </h3>
                                </div>

                                <span className="rounded-full bg-[#F7F4FF] px-4 py-2 text-xs font-bold text-[#7B61FF]">
                                    Link publik
                                </span>
                            </div>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Dërgoja këtë link mysafirëve që të hapin albumin dhe të ngarkojnë
                                kujtimet e tyre nga eventi.
                            </p>

                            <div className="mt-5 rounded-[24px] border border-[#EEE8FF] bg-[#FAFBFF] p-3">
                                <input
                                    value={eventUrl}
                                    readOnly
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF]"
                                />
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <button
                                    onClick={copyURL}
                                    className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(123,97,255,0.24)] transition hover:-translate-y-0.5"
                                >
                                    Kopjo linkun
                                </button>

                                <button
                                    onClick={openURL}
                                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#D8D0FF] hover:bg-[#FAF8FF]"
                                >
                                    Hape eventin
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] lg:p-7">
                        <div className="text-center">
                            <span className="inline-flex rounded-full border border-[#E8E0FF] bg-[#F7F4FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#7B61FF]">
                                Kodi QR
                            </span>

                            <h3 className="mt-4 text-2xl font-black tracking-[-0.035em] text-slate-950">
                                Kodi QR i eventit
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Vendose në tavolina, hyrje, ftesa ose poster që mysafirët ta
                                skanojnë menjëherë.
                            </p>
                        </div>

                        <div className="mt-6 rounded-[30px] border border-[#EEE8FF] bg-[linear-gradient(180deg,#FCFBFF_0%,#F7F4FF_100%)] p-5 shadow-inner">
                            <div className="rounded-[24px] bg-white p-5 shadow-sm">
                                {selectedEvent.qr_code ? (
                                    <img
                                        src={selectedEvent.qr_code}
                                        alt="Kodi QR i eventit"
                                        className="mx-auto w-full max-w-[240px]"
                                    />
                                ) : (
                                    <div className="flex h-[240px] items-center justify-center rounded-2xl bg-slate-50 text-sm font-semibold text-slate-400">
                                        Kodi QR nuk është gjeneruar
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                            <button
                                onClick={downloadQR}
                                className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(123,97,255,0.25)] transition hover:-translate-y-0.5"
                            >
                                Shkarko kodin QR
                            </button>

                            <button
                                onClick={openURL}
                                className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#D8D0FF] hover:bg-[#FAF8FF]"
                            >
                                Hape albumin publik
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {title}
            </p>
            <p className="mt-2 text-base font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F0ECFF] bg-[#FAF8FF] px-4 py-3">
            <span className="text-sm font-semibold text-slate-500">{label}</span>
            <span className="truncate text-sm font-black text-slate-950">{value}</span>
        </div>
    );
}

function MiniCard({ label, value }) {
    return (
        <div className="rounded-3xl border border-[#F0ECFF] bg-[#FCFBFF] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>
            <p className="mt-2 truncate text-sm font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}