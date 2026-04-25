export default function UserHomeContent({ event }) {
    const eventUrl = event?.code
        ? `${window.location.origin}/events/${event.code}`
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
        if (!event?.qr_code) return;

        const link = document.createElement("a");
        link.href = event.qr_code;
        link.download = "qr-code.png";
        link.click();
    };

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,247,255,0.96))] p-6 p-md-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#7B61FF]/10 blur-3xl" />
                <div className="absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-[#6EC3F4]/10 blur-3xl" />

                <div className="relative">
                    <span className="inline-flex rounded-full border border-[#E7E1FF] bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                        Digital Album
                    </span>

                    <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-[#0F172A] md:text-4xl">
                        Albumi juaj digjital
                    </h2>

                    <p className="mt-4 max-w-3xl text-[15px] leading-8 text-slate-600">
                        Ndani eventin tuaj me një link ose QR Code në një mënyrë të
                        pastër, moderne dhe elegante. Të ftuarit mund të ngarkojnë foto
                        dhe video direkt në albumin tuaj.
                    </p>
                </div>
            </div>

            {!event ? (
                <div className="rounded-[32px] border border-[#ECE8F8] bg-white p-10 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl shadow-inner">
                        📅
                    </div>

                    <h4 className="mt-5 text-2xl font-black tracking-[-0.02em] text-slate-900">
                        Nuk keni ende event
                    </h4>

                    <p className="mt-3 text-slate-500">
                        Filloni duke krijuar një event të ri dhe gjeneroni menjëherë
                        linkun dhe kodin QR.
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
                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="mb-4 rounded-[30px] border border-white/70 bg-white p-5 p-md-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                            <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                                <div>
                                    <p className="mb-2 text-uppercase text-[12px] font-semibold tracking-[0.18em] text-[#7B61FF]">
                                        Active event
                                    </p>

                                    <h4 className="mb-2 text-3xl font-black tracking-[-0.03em] text-slate-900">
                                        {event.name}
                                    </h4>

                                    <p className="mb-0 text-slate-500">
                                        {event.event_date || "Pa datë"}
                                    </p>
                                </div>

                                <div className="rounded-full bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                    Ready to share
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-white/70 bg-white p-5 p-md-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                            <div className="mb-4">
                                <p className="mb-2 text-uppercase text-[12px] font-semibold tracking-[0.18em] text-[#7B61FF]">
                                    Event link
                                </p>

                                <h6 className="mb-0 text-xl font-bold text-slate-900">
                                    Shpërndaje eventin me link
                                </h6>
                            </div>

                            <div className="rounded-[24px] border border-[#EEF1F7] bg-[#FAFBFF] p-3">
                                <div className="d-flex flex-column gap-3 flex-lg-row">
                                    <input
                                        value={eventUrl}
                                        readOnly
                                        className="form-control border-0 bg-white shadow-none rounded-4 px-4 py-3"
                                    />

                                    <button
                                        onClick={copyURL}
                                        className="btn rounded-4 px-4 py-3 fw-semibold text-white border-0"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#7B61FF,#8F7DFF)",
                                            boxShadow:
                                                "0 12px 30px rgba(123,97,255,0.20)",
                                        }}
                                    >
                                        Copy
                                    </button>

                                    <button
                                        onClick={openURL}
                                        className="btn rounded-4 px-4 py-3 fw-semibold border"
                                        style={{
                                            borderColor: "#E5E7EB",
                                            background: "#fff",
                                            color: "#334155",
                                        }}
                                    >
                                        Open
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 rounded-[24px] border border-[#F3F0FF] bg-[linear-gradient(135deg,#FCFBFF,#F8F7FF)] p-4">
                                <p className="mb-1 text-sm fw-semibold text-slate-800">
                                    Code i eventit
                                </p>
                                <p className="mb-0 text-sm text-slate-500">
                                    {event.code}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="h-100 rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,#ffffff,#faf8ff)] p-5 p-md-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                            <div className="mx-auto mb-4 inline-flex rounded-full bg-[#F7F4FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                QR Access
                            </div>

                            <h6 className="text-2xl font-black tracking-[-0.02em] text-slate-900">
                                Kodi QR i eventit
                            </h6>

                            <p className="mt-3 text-sm leading-7 text-slate-500">
                                Shkarko kodin QR dhe përdore për printim ose për
                                shfaqje në ekran që të ftuarit të futen menjëherë.
                            </p>

                            <div className="mt-5 rounded-[28px] border border-[#EEE8FF] bg-white p-4 shadow-inner">
                                <img
                                    src={event.qr_code}
                                    alt="QR Code"
                                    className="mx-auto"
                                    style={{ maxWidth: "210px", width: "100%" }}
                                />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="mt-5 w-100 rounded-4 border-0 px-4 py-3 fw-semibold text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)",
                                    boxShadow:
                                        "0 14px 36px rgba(123,97,255,0.24)",
                                }}
                            >
                                Shkarko QR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}