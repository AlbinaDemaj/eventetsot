export default function UserTopbar({ user }) {
    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <header className="relative mb-6 overflow-hidden rounded-[30px] border border-white/70 bg-[rgba(255,255,255,0.82)] shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.10),transparent_20%)]" />

            <div className="relative px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#E7E1FF] bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7B61FF] shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                            Dashboard
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <h1 className="truncate text-2xl font-black tracking-[-0.04em] text-slate-900 sm:text-3xl xl:text-[34px]">
                                Përshëndetje, {user?.name || "User"}
                            </h1>

                            <span className="inline-flex items-center rounded-full border border-[#EEE8FF] bg-[linear-gradient(135deg,#F8F5FF,#FDFBFF)] px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-[0_8px_24px_rgba(123,97,255,0.08)]">
                                User Panel
                            </span>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-[15px]">
                            Menaxho eventet, median dhe eksperiencën e të ftuarve në një panel elegant,
                            të organizuar dhe të lehtë për përdorim.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                        <div className="rounded-[22px] border border-[#F0ECFB] bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                Account
                            </p>
                            <p className="mt-1 max-w-[220px] truncate text-sm font-semibold text-slate-900">
                                {user?.email || "No email"}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-[22px] border border-[#F0ECFB] bg-white/90 px-3 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] text-sm font-black text-white shadow-[0_10px_24px_rgba(123,97,255,0.25)]">
                                {firstLetter}
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                                    Logged in as
                                </p>
                                <p className="mt-1 text-sm font-bold text-slate-900">
                                    {user?.name || "User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}