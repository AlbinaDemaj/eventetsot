export default function UserTopbar({ user }) {
    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    const isPremium =
        user?.is_premium === true ||
        user?.is_premium === 1 ||
        user?.is_premium === "1";

    const premiumUntil = user?.premium_until
        ? new Date(user.premium_until).toLocaleDateString("sq-AL")
        : null;

    return (
       <header className="relative mb-1 overflow-hidden rounded-[34px] border border-[#ECE7FF] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8F5FF_55%,#F2FAFF_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.06)]">
            <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#6EC3F4]/18 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-[4px] bg-[linear-gradient(90deg,#7B61FF,#A78BFA,#6EC3F4)]" />

            <div className="relative p-5 sm:p-6 lg:p-7">
                <div className="flex flex-col gap-6 lg:ml-4 lg:flex-row lg:items-center lg:justify-between xl:ml-6">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700 shadow-[0_6px_18px_rgba(16,185,129,0.08)]">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
                                Panel aktiv
                            </span>

                            <span className="inline-flex rounded-full border border-[#DCD4FF] bg-[#F5F2FF] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#7B61FF] shadow-[0_6px_18px_rgba(123,97,255,0.08)]">
                                EventetSot
                            </span>

                            {isPremium && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CCFF] bg-[#F4F0FF] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#7B61FF] shadow-[0_6px_18px_rgba(123,97,255,0.10)]">
                                    <span>⭐</span>
                                    Premium aktiv
                                </span>
                            )}
                        </div>

                        <h1 className="mt-5 text-[30px] font-black leading-[1.02] tracking-[-0.06em] text-slate-950 sm:text-4xl lg:text-[46px]">
                            Mirë se erdhe,{" "}
                            <span className="bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] bg-clip-text text-transparent">
                                {user?.name || "Përdorues"}
                            </span>
                        </h1>

                        {isPremium ? (
                            <div className="mt-4 max-w-2xl rounded-[24px] border border-[#D8CCFF] bg-[linear-gradient(135deg,#F8F5FF,#F2FAFF)] p-4 shadow-[0_12px_32px_rgba(123,97,255,0.10)]">
                                <p className="text-sm font-black text-[#7B61FF]">
                                    🎉 Tani e ke Premium aktiv
                                </p>

                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    Eventet e tua janë riaktivizuar dhe mund të përdorësh përfitimet Premium.
                                    {premiumUntil && (
                                        <>
                                            {" "}
                                            Aktiv deri më <strong>{premiumUntil}</strong>.
                                        </>
                                    )}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-[15px]">
                                Menaxho eventin, galerinë, linkun publik dhe QR Code nga një panel elegant,
                                modern dhe i lehtë për përdorim.
                            </p>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                            {(isPremium
                                ? ["Premium aktiv", "Evente të riaktivizuara", "Akses i zgjeruar"]
                                : ["Galeri moderne", "Link publik", "QR Code"]
                            ).map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[#E9E4FF] bg-white/80 px-4 py-2 text-xs font-bold text-slate-600 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[30px] border border-white/90 bg-white/85 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur lg:min-w-[340px]">
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(123,97,255,0.05),rgba(110,195,244,0.06))]" />

                        {isPremium && (
                            <div className="absolute right-4 top-4 rounded-full border border-[#D8CCFF] bg-[#F4F0FF] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#7B61FF]">
                                Premium
                            </div>
                        )}

                        <div className="relative flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-[22px] bg-[#7B61FF]/25 blur-xl" />

                                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] text-lg font-black text-white shadow-[0_18px_35px_rgba(123,97,255,0.28)]">
                                    {firstLetter}
                                </div>
                            </div>

                            <div className={`min-w-0 ${isPremium ? "pr-20" : ""}`}>
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#7B61FF]">
                                    Llogaria
                                </p>

                                <p className="mt-1 truncate text-base font-black text-slate-950">
                                    {user?.name || "Përdorues"}
                                </p>

                                <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                                    {user?.email || "Pa email"}
                                </p>

                                <div className="mt-3 flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                    <span className="text-xs font-bold text-emerald-700">
                                        {isPremium ? "Premium aktiv" : "Aktiv tani"}
                                    </span>
                                </div>

                                {isPremium && premiumUntil && (
                                    <p className="mt-2 text-xs font-semibold text-slate-500">
                                        Deri më {premiumUntil}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}