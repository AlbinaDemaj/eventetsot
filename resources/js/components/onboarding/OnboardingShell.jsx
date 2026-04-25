export default function OnboardingShell({
    step,
    title,
    description,
    sideTitle,
    sideText,
    children,
}) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#fcfbff]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.10),transparent_24%),linear-gradient(to_bottom,#ffffff,#f8f7ff)]" />
            <div className="absolute left-[-80px] top-[-40px] h-[220px] w-[220px] rounded-full bg-[#7B61FF]/12 blur-3xl" />
            <div className="absolute right-[-60px] top-[18%] h-[220px] w-[220px] rounded-full bg-[#6EC3F4]/10 blur-3xl" />
            <div className="absolute bottom-[-70px] left-[20%] h-[180px] w-[180px] rounded-full bg-[#F8A5C2]/10 blur-3xl" />

            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div className="hidden lg:block">
                    <div className="max-w-xl">
                        <span className="inline-flex rounded-full border border-[#E4DAFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-[0_10px_30px_rgba(123,97,255,0.08)] backdrop-blur-xl">
                            Onboarding step {step}
                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-[-0.04em] text-[#0F172A]">
                            Krijoje eventin tënd me pak hapa të thjeshtë.
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            {sideText}
                        </p>

                        <div className="mt-10 space-y-4">
                            <div className="rounded-[1.6rem] border border-[#EAE7FF] bg-white/78 px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B8BE6]">
                                    Step 1
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900">
                                    Vendos emrin e eventit
                                </p>
                            </div>

                            <div className="rounded-[1.6rem] border border-[#E2F2FF] bg-white/78 px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#68A9D8]">
                                    Step 2
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900">
                                    Zgjedh datën e eventit
                                </p>
                            </div>

                            <div className="rounded-[1.6rem] border border-[#FFE5EE] bg-white/78 px-5 py-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E58AAE]">
                                    Final
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900">
                                    Hyr në dashboard dhe vazhdo personalizimin
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-xl">
                    <div className="rounded-[2rem] border border-white/70 bg-white/78 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl sm:p-10">
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                            Step {step}
                        </span>

                        <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#0F172A]">
                            {title}
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-600">
                            {description}
                        </p>

                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}