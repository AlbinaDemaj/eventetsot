export default function AdminLayout({ user, page, children }) {
    const navigation = [
        { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: DashboardIcon },
        { key: "users", label: "Users", href: "/admin/users", icon: UsersIcon },
        { key: "plans", label: "Plans", href: "/admin/plans", icon: CardIcon },
        { key: "events", label: "Events", href: "/admin/events", icon: CalendarIcon },
        { key: "settings", label: "Settings", href: "/admin/settings", icon: SettingsIcon },
    ];

    const pageTitles = {
        dashboard: "Dashboard Overview",
        users: "Manage Users",
        plans: "Subscription Plans",
        events: "Events Overview",
        settings: "Platform Settings",
    };

    const handleAdminLogout = (event) => {
        event.preventDefault();

        const token =
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || "";

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "/admin/logout";

        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = token;

        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(to_bottom_right,#fcfbff,#f7f4ff,#f9fbff)] text-[#1F1B2D]">
            <div className="flex min-h-screen">
                <aside className="hidden w-72 border-r border-[#ECEAF4] bg-white/85 backdrop-blur xl:flex xl:flex-col">
                    <div className="border-b border-[#ECEAF4] px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7B61FF] text-lg font-bold text-white shadow-lg shadow-[#7B61FF]/30">
                                E
                            </div>

                            <div>
                                <h1 className="text-lg font-semibold text-[#1F1B2D]">
                                    EventetSot
                                </h1>
                                <p className="text-sm text-[#7C7890]">
                                    Admin Panel
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = page === item.key;

                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                        active
                                            ? "bg-[#7B61FF]/10 text-[#7B61FF] shadow-sm"
                                            : "text-[#5F5A72] hover:bg-[#F6F3FF] hover:text-[#7B61FF]"
                                    }`}
                                >
                                    <span
                                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                                            active
                                                ? "bg-white text-[#7B61FF] shadow-sm"
                                                : "bg-[#F7F5FF] text-[#7B61FF]/80 group-hover:bg-white"
                                        }`}
                                    >
                                        <Icon />
                                    </span>
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[#ECEAF4] p-4">
                        <div className="rounded-2xl border border-[#ECEAF4] bg-[#FAF8FF] p-4">
                            <p className="text-sm font-semibold text-[#1F1B2D]">
                                {user?.name || "Administrator"}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-[#7C7890]">
                                Manage users, subscriptions and platform activity.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleAdminLogout}
                            className="mt-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#5F5A72] transition hover:bg-[#FFF1F3] hover:text-[#D14D72]"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6F7]">
                                <LogoutIcon />
                            </span>
                            Logout
                        </button>
                    </div>
                </aside>

                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="border-b border-[#ECEAF4] bg-white/75 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Admin Panel
                                </span>
                                <h2 className="mt-2 text-2xl font-bold text-[#1F1B2D]">
                                    {pageTitles[page] || "Admin Dashboard"}
                                </h2>
                                <p className="mt-1 text-sm text-[#7C7890]">
                                    Monitor platform performance and manage everything from one place.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden items-center gap-2 rounded-2xl border border-[#ECEAF4] bg-white px-4 py-3 lg:flex">
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-48 border-0 bg-transparent p-0 text-sm text-[#1F1B2D] placeholder:text-[#9A96B2] focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ECEAF4] bg-white text-[#6B6880] transition hover:border-[#D9D2FF] hover:text-[#7B61FF]"
                                >
                                    <BellIcon />
                                </button>

                                <div className="flex items-center gap-3 rounded-2xl border border-[#ECEAF4] bg-white px-4 py-2.5 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B61FF]/10 font-semibold text-[#7B61FF]">
                                        {user?.name?.charAt(0)?.toUpperCase() || "A"}
                                    </div>

                                    <div className="hidden sm:block">
                                        <p className="text-sm font-semibold text-[#1F1B2D]">
                                            {user?.name || "Admin"}
                                        </p>
                                        <p className="text-xs text-[#8A86A3]">
                                            Platform administrator
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

/* ---------------- ICONS ---------------- */

function DashboardIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="8" height="8" rx="2" />
            <rect x="13" y="3" width="8" height="5" rx="2" />
            <rect x="13" y="10" width="8" height="11" rx="2" />
            <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9.5" cy="7" r="3.2" />
            <path d="M21 21v-2a3.5 3.5 0 0 0-2.6-3.4" />
            <path d="M16.5 3.8a3.5 3.5 0 0 1 0 6.8" />
        </svg>
    );
}

function CardIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
            <path d="M2.5 9h19" />
            <path d="M6 14h4" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M3 10h18" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V21a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V5a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H19a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
        </svg>
    );
}

function LogoutIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
            <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg className="h-4 w-4 text-[#8A86A3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
        </svg>
    );
}