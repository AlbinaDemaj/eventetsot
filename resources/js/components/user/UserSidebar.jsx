export default function UserSidebar({
    user,
    selectedEvent,
    events = [],
    currentPage,
}) {
    const navItems = [
        { key: "home", label: "Ballina", href: "/user/home", icon: "🏠" },
        { key: "media", label: "Photo & Video", href: "/user/media", icon: "🖼️" },
        { key: "settings", label: "Cilësimet", href: "/user/settings", icon: "⚙️" },
        { key: "events", label: "Shiko Eventet", href: "/user/events", icon: "✨" },
    ];

    const csrfToken =
        document.querySelector('meta[name="csrf-token"]')?.content || "";

    const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <aside className="relative border-r border-[#ECEAF4] bg-[linear-gradient(180deg,#FCFBFF_0%,#F7F5FF_55%,#F9FAFF_100%)] px-5 py-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.10),transparent_22%)]" />

            <div className="relative flex h-full flex-col">
                <a
                    href="/user/home"
                    className="mb-6 overflow-hidden rounded-[30px] border border-white/70 bg-white/90 px-4 py-4 shadow-[0_20px_45px_rgba(15,23,42,0.06)] backdrop-blur"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] text-base font-black text-white shadow-[0_12px_28px_rgba(123,97,255,0.24)]">
                            E
                        </div>

                        <div className="min-w-0">
                            <span className="block truncate bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] bg-clip-text text-[22px] font-black tracking-[-0.04em] text-transparent">
                                eventetsot
                            </span>
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                User Dashboard
                            </span>
                        </div>
                    </div>
                </a>

                <div className="mb-5 rounded-[30px] border border-white/70 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                Eventi aktiv
                            </p>
                            <p className="mt-1 text-xs leading-6 text-slate-500">
                                Zgjedh eventin që dëshiron të menaxhosh
                            </p>
                        </div>

                        <span className="rounded-full border border-[#E8DEFF] bg-[#F8F4FF] px-3 py-1 text-[11px] font-bold text-[#7B61FF]">
                            Live
                        </span>
                    </div>

                    <form method="POST" action="/user/switch-event" className="mt-4 space-y-3">
                        <input type="hidden" name="_token" value={csrfToken} />

                        <select
                            name="event_id"
                            className="w-full rounded-2xl border border-[#E8E3F5] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaff_100%)] px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#CFC3FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            value={selectedEvent?.id || ""}
                            onChange={(e) => e.target.form.submit()}
                        >
                            {events.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.name}
                                </option>
                            ))}
                            <option value="create_new">Krijo ngjarje të re</option>
                        </select>

                        <div className="rounded-[22px] border border-[#F1ECFF] bg-[linear-gradient(180deg,#FCFAFF_0%,#F8F5FF_100%)] px-4 py-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                Aktuale
                            </p>
                            <p className="mt-1 truncate text-sm font-bold text-slate-900">
                                {selectedEvent?.name || "Asnjë event aktiv"}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Menaxho linkun, median dhe cilësimet e eventit
                            </p>
                        </div>
                    </form>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => {
                        const active = currentPage === item.key;

                        return (
                            <a
                                key={item.key}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                                    active
                                        ? "border border-[#E6DEFF] bg-[linear-gradient(135deg,rgba(123,97,255,0.16),rgba(143,125,255,0.10),rgba(110,195,244,0.08))] text-[#7B61FF] shadow-[0_14px_28px_rgba(123,97,255,0.08)]"
                                        : "border border-transparent text-slate-600 hover:border-white/70 hover:bg-white/80 hover:text-slate-900 hover:shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
                                }`}
                            >
                                <span
                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-base transition ${
                                        active
                                            ? "bg-white text-[#7B61FF] shadow-sm"
                                            : "bg-[#F5F2FF] text-slate-700 group-hover:bg-[#EEE8FF]"
                                    }`}
                                >
                                    {item.icon}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <span className="truncate">{item.label}</span>
                                </div>

                                {active ? (
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                ) : (
                                    <span className="text-slate-300 transition group-hover:text-slate-400">
                                        →
                                    </span>
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="mt-5 rounded-[26px] border border-white/70 bg-white/85 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.05)]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Quick access
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                        Gjithçka që të duhet për eventin tënd në një panel të pastër dhe modern.
                    </p>
                </div>

                <div className="mt-auto rounded-[30px] border border-white/70 bg-white/95 p-4 shadow-[0_22px_50px_rgba(15,23,42,0.06)] backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] text-sm font-black text-white shadow-[0_10px_24px_rgba(123,97,255,0.22)]">
                            {firstLetter}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-900">
                                {user?.name || "User"}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                {user?.email || "No email"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[#F3EEFF] bg-[linear-gradient(180deg,#FCFBFF_0%,#F8F5FF_100%)] px-4 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            Status
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            <p className="text-sm font-semibold text-slate-900">
                                Panel aktiv
                            </p>
                        </div>
                    </div>

                    <form method="POST" action="/logout" className="mt-4">
                        <input type="hidden" name="_token" value={csrfToken} />
                        <button
                            type="submit"
                            className="w-full rounded-2xl border border-[#ECE7FA] bg-[linear-gradient(180deg,#ffffff_0%,#faf8ff_100%)] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#DCCFFF] hover:bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] hover:text-white hover:shadow-[0_14px_30px_rgba(123,97,255,0.18)]"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}