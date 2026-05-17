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
        <div className="space-y-7">
            <section className="relative overflow-hidden rounded-[38px] border border-[#ECE7FF] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8F5FF_52%,#F2FAFF_100%)] p-6 shadow-[0_28px_80px_rgba(15,23,42,0.07)] sm:p-8">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#7B61FF]/12 blur-3xl" />
                <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#6EC3F4]/14 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-pink-200/20 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#7B61FF_1px,transparent_1px),linear-gradient(to_bottom,#7B61FF_1px,transparent_1px)] [background-size:36px_36px]" />

                <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#DDD4FF] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF] shadow-[0_8px_20px_rgba(123,97,255,0.08)] backdrop-blur">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                            Digital Album
                        </span>

                        <h2 className="mt-5 text-[34px] font-black leading-[1.02] tracking-[-0.06em] text-slate-950 sm:text-5xl">
                            Albumi juaj digjital për eventin
                        </h2>

                        <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-500 sm:text-[16px]">
                            Ndani eventin me një link unik ose QR Code. Të ftuarit mund të
                            hapin albumin, të shohin detajet dhe të ngarkojnë foto apo video
                            në mënyrë të thjeshtë dhe elegante.
                        </p>

                        {selectedEvent && (
                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-[26px] border border-[#EEE8FF] bg-white/90 px-5 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)] backdrop-blur">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#7B61FF]">
                                        Eventi aktiv
                                    </p>
                                    <p className="mt-2 truncate text-sm font-black text-slate-950">
                                        {selectedEvent.name}
                                    </p>
                                </div>

                                <div className="rounded-[26px] border border-[#E8F2FF] bg-white/90 px-5 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)] backdrop-blur">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#4F9FD8]">
                                        Data
                                    </p>
                                    <p className="mt-2 text-sm font-black text-slate-950">
                                        {selectedEvent.event_date || "Pa datë"}
                                    </p>
                                </div>

                                <div className="rounded-[26px] border border-emerald-100 bg-white/90 px-5 py-4 shadow-[0_14px_35px_rgba(15,23,42,0.05)] backdrop-blur">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600">
                                        Status
                                    </p>
                                    <p className="mt-2 text-sm font-black text-slate-950">
                                        Gati për ndarje
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden xl:block">
                        <div className="relative rounded-[34px] border border-white/80 bg-white/80 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[#7B61FF]/15 blur-2xl" />

                            <div className="rounded-[28px] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] p-5 text-white shadow-[0_18px_45px_rgba(123,97,255,0.24)]">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
                                    Preview
                                </p>

                                <h3 className="mt-4 text-2xl font-black leading-tight">
                                    Link + QR për mysafirët
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-white/75">
                                    Një mënyrë moderne për të mbledhur kujtimet nga çdo i ftuar.
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-[22px] border border-[#EEE8FF] bg-white p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                        Link
                                    </p>
                                    <p className="mt-2 text-sm font-black text-slate-950">
                                        Aktiv
                                    </p>
                                </div>

                                <div className="rounded-[22px] border border-[#EEE8FF] bg-white p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                                        QR
                                    </p>
                                    <p className="mt-2 text-sm font-black text-slate-950">
                                        Gati
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {!selectedEvent ? (
                <section className="rounded-[34px] border border-[#ECE8F8] bg-white p-8 text-center shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:p-10">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl shadow-inner">
                        📅
                    </div>

                    <h3 className="mt-5 text-2xl font-black text-slate-950">
                        Nuk keni ende event
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                        Filloni duke krijuar një event të ri dhe sistemi do të gjenerojë
                        menjëherë linkun publik dhe QR Code.
                    </p>

                    <a
                        href="/user/onboarding"
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-6 py-3.5 text-sm font-black text-white shadow-[0_16px_38px_rgba(123,97,255,0.22)] transition hover:scale-[1.02]"
                    >
                        Krijo event
                        <span>→</span>
                    </a>
                </section>
            ) : (
                <>
                    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                        <div className="space-y-6">
                            <div className="relative overflow-hidden rounded-[32px] border border-[#ECE7FF] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7B61FF]/10 blur-3xl" />

                                <div className="relative flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                                            Event aktiv
                                        </p>

                                        <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                                            {selectedEvent.name}
                                        </h3>

                                        <p className="mt-3 text-sm font-semibold text-slate-500">
                                            {selectedEvent.event_date || "Pa datë"}
                                        </p>
                                    </div>

                                    <div className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
                                        Live sharing
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[32px] border border-[#ECE7FF] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                                            Linku i eventit
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                                            Shpërndaje me të ftuarit
                                        </h3>
                                    </div>

                                    <div className="rounded-full border border-[#EEE8FF] bg-[#FCFBFF] px-4 py-2 text-xs font-black text-slate-500">
                                        {selectedEvent.code}
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[28px] border border-[#EEF1F7] bg-[#FAFBFF] p-3">
                                    <div className="flex flex-col gap-3 lg:flex-row">
                                        <input
                                            value={eventUrl}
                                            readOnly
                                            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none"
                                        />

                                        <button
                                            onClick={copyURL}
                                            className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(123,97,255,0.18)] transition hover:scale-[1.02]"
                                        >
                                            Kopjo
                                        </button>

                                        <button
                                            onClick={openURL}
                                            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                        >
                                            Hape
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[26px] border border-[#F3F0FF] bg-[#FCFBFF] p-4">
                                        <p className="text-sm font-black text-slate-800">
                                            Kodi i eventit
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-500">
                                            {selectedEvent.code}
                                        </p>
                                    </div>

                                    <div className="rounded-[26px] border border-[#EEF3FF] bg-[#FBFDFF] p-4">
                                        <p className="text-sm font-black text-slate-800">
                                            Link publik
                                        </p>
                                        <p className="mt-1 truncate text-sm font-semibold text-slate-500">
                                            {eventUrl}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-[#ECE7FF] bg-[linear-gradient(180deg,#FFFFFF_0%,#FAF7FF_55%,#F3FAFF_100%)] p-6 text-center shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                            <div className="inline-flex rounded-full border border-[#DDD4FF] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#7B61FF]">
                                QR Access
                            </div>

                            <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-950">
                                Kodi QR i eventit
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                                Shkarko QR Code dhe vendose në tavolina, ftesa ose ekran.
                            </p>

                            <div className="mt-6 rounded-[30px] border border-[#EEE8FF] bg-white/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_40px_rgba(15,23,42,0.05)]">
                                <img
                                    src={selectedEvent.qr_code}
                                    alt="QR Code"
                                    className="mx-auto w-full max-w-[230px]"
                                />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="mt-5 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3.5 text-sm font-black text-white shadow-[0_16px_38px_rgba(123,97,255,0.24)] transition hover:scale-[1.02]"
                            >
                                Shkarko QR
                            </button>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        {[
                            {
                                href: `/events/${selectedEvent.code}`,
                                label: "Quick access",
                                title: "Shiko eventin",
                                text: "Hap pamjen publike të eventit dhe shiko përvojën si një i ftuar.",
                                color: "#7B61FF",
                            },
                            {
                                href: "/user/media",
                                label: "Gallery",
                                title: "Menaxho median",
                                text: "Shiko, shkarko dhe organizo fotot dhe videot e ngarkuara.",
                                color: "#4F9FD8",
                            },
                            {
                                href: "/user/settings",
                                label: "Customization",
                                title: "Rregullo pamjen",
                                text: "Personalizo eventin, detajet dhe eksperiencën për të ftuarit.",
                                color: "#E07AA5",
                            },
                        ].map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                className="group rounded-[30px] border border-[#ECE7FF] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.055)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
                            >
                                <p
                                    className="text-[11px] font-black uppercase tracking-[0.18em]"
                                    style={{ color: item.color }}
                                >
                                    {item.label}
                                </p>

                                <h4 className="mt-3 text-xl font-black text-slate-950">
                                    {item.title}
                                </h4>

                                <p className="mt-2 text-sm leading-7 text-slate-500">
                                    {item.text}
                                </p>

                                <div className="mt-4 text-sm font-black text-[#7B61FF]">
                                    Vazhdo →
                                </div>
                            </a>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
}