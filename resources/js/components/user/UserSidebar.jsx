export default function UserSidebar({
    user,
    selectedEvent,
    events = [],
    currentPage,
}) {
    const navItems = [
        { key: "home", label: "Ballina", href: "/user/home", icon: "⌂" },
        { key: "media", label: "Media", href: "/user/media", icon: "◉" },
        { key: "pricing", label: "Planet", href: "/user/settings?page=pricing", icon: "✦" },
        { key: "settings", label: "Cilësimet", href: "/user/settings", icon: "⚙" },
        { key: "events", label: "Eventet", href: "/user/events", icon: "▣" },
    ];

    const csrfToken =
        document.querySelector('meta[name="csrf-token"]')?.content || "";

    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <aside
            className="
                relative z-20 w-full shrink-0 overflow-hidden
                border-b border-[#E9E4FF]
                bg-[#FBFAFF] px-4 pb-5 pt-4
                shadow-[0_14px_45px_rgba(15,23,42,0.06)]
                md:min-h-screen md:w-[320px] md:border-b-0 md:border-r
                md:bg-[linear-gradient(180deg,#FFFFFF_0%,#F8F5FF_48%,#F2FAFF_100%)]
                md:px-5 md:py-6
            "
        >
            <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-[#7B61FF]/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-20 h-56 w-56 rounded-full bg-[#6EC3F4]/20 blur-3xl" />

            <div className="relative flex h-full flex-col gap-3 md:gap-4">
                <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur">
                    <div className="h-1.5 bg-[linear-gradient(90deg,#7B61FF,#A78BFA,#6EC3F4)]" />

                    <div className="flex items-center justify-between gap-4 p-4 md:block md:text-center">
                        <a href="/user/home" className="block min-w-0">
                            <span
                                className="block text-[34px] leading-none text-[#7B61FF] md:text-[42px]"
                                style={{ fontFamily: "Yellowtail, cursive" }}
                            >
                                eventetsot
                            </span>

                            <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.22em] text-slate-400">
                                Paneli i përdoruesit
                            </span>
                        </a>

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)] text-sm font-black text-white shadow-[0_12px_25px_rgba(123,97,255,0.28)] md:hidden">
                            {firstLetter}
                        </div>
                    </div>
                </div>

                <div className="rounded-[28px] border border-[#ECE7FF] bg-white/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.055)]">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Eventi aktiv
                                </p>
                            </div>

                            <p className="mt-2 truncate text-base font-black text-slate-950">
                                {selectedEvent?.name || "Asnjë event aktiv"}
                            </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-[#DCD4FF] bg-[#F5F2FF] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#7B61FF]">
                            Live
                        </span>
                    </div>

                    <form method="POST" action="/user/switch-event" className="mt-4">
                        <input type="hidden" name="_token" value={csrfToken} />

                        <select
                            name="event_id"
                            className="
                                w-full appearance-none rounded-2xl border border-[#E8E3F5]
                                bg-[#FCFBFF] px-4 py-3 text-sm font-extrabold text-slate-700
                                outline-none transition
                                focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10
                            "
                            value={selectedEvent?.id || ""}
                            onChange={(e) => e.target.form.submit()}
                        >
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.name}
                                </option>
                            ))}

                            <option value="create_new">Krijo event të ri</option>
                        </select>
                    </form>
                </div>

                <nav
                    className="
                        fixed bottom-3 left-3 right-3 z-50
                        grid grid-cols-5 gap-1 rounded-[26px]
                        border border-white/80 bg-white/90 p-2
                        shadow-[0_18px_45px_rgba(15,23,42,0.18)]
                        backdrop-blur-xl
                        md:static md:block md:space-y-2 md:border-0
                        md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0
                    "
                >
                    {navItems.map((item) => {
                        const active = currentPage === item.key;

                        return (
                            <a
                                key={item.key}
                                href={item.href}
                                className={`
                                    group flex min-w-0 flex-col items-center justify-center gap-1
                                    rounded-[20px] px-1.5 py-2.5 text-[10px] font-black
                                    transition-all duration-300
                                    md:flex-row md:justify-start md:gap-3 md:px-4 md:py-3.5 md:text-sm
                                    ${
                                        active
                                            ? "bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)] text-white shadow-[0_12px_28px_rgba(123,97,255,0.28)]"
                                            : "text-slate-500 hover:bg-[#F4F1FF] hover:text-[#7B61FF]"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-sm
                                        md:h-9 md:w-9
                                        ${
                                            active
                                                ? "bg-white/20 text-white"
                                                : "bg-[#F3F0FF] text-[#7B61FF]"
                                        }
                                    `}
                                >
                                    {item.icon}
                                </span>

                                <span className="w-full truncate text-center leading-none md:text-left">
                                    {item.label}
                                </span>

                                <span
                                    className={`
                                        hidden flex-1 text-right text-lg leading-none md:block
                                        ${
                                            active
                                                ? "text-white"
                                                : "text-slate-300 group-hover:text-[#7B61FF]"
                                        }
                                    `}
                                >
                                    →
                                </span>
                            </a>
                        );
                    })}
                </nav>

                <div className="hidden rounded-[28px] border border-[#ECE7FF] bg-white/80 p-4 shadow-[0_16px_35px_rgba(15,23,42,0.045)] md:block">
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#7B61FF]">
                        Qasje e shpejtë
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                        Menaxho eventin, galerinë, planet dhe cilësimet nga një panel i vetëm.
                    </p>
                </div>

                <div className="mt-auto hidden rounded-[30px] border border-white/80 bg-white/95 p-4 shadow-[0_24px_55px_rgba(15,23,42,0.07)] backdrop-blur md:block">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)] text-sm font-black text-white shadow-[0_12px_25px_rgba(123,97,255,0.25)]">
                            {firstLetter}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-950">
                                {user?.name || "Përdorues"}
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                {user?.email || "Pa email"}
                            </p>
                        </div>
                    </div>

                    <form method="POST" action="/logout" className="mt-4">
                        <input type="hidden" name="_token" value={csrfToken} />

                        <button
                            type="submit"
                            className="
                                w-full rounded-2xl border border-[#E6E1F0] bg-[#FBFAFF]
                                px-4 py-3 text-sm font-black text-slate-700 transition
                                hover:-translate-y-0.5 hover:border-[#DCD2FF]
                                hover:bg-[#F3F0FF] hover:text-[#7B61FF]
                            "
                        >
                            Dil nga llogaria
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}