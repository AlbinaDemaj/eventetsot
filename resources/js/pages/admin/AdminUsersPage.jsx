import { useMemo, useState } from "react";

export default function AdminUsersPage({ extra = {} }) {
    const users = Array.isArray(extra?.users) ? extra.users : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [planFilter, setPlanFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [loadingUserId, setLoadingUserId] = useState(null);

    const normalizedSearch = search.trim().toLowerCase();

    const plans = useMemo(() => {
        return [
            ...new Set(
                users
                    .map((user) => getUserPlan(user))
                    .filter((plan) => plan && plan !== "Pa plan")
            ),
        ];
    }, [users]);

    const filteredUsers = useMemo(() => {
        let result = users.filter((user) => {
            const name = String(user?.name || "").toLowerCase();
            const email = String(user?.email || "").toLowerCase();
            const status = normalizeUserStatus(user).toLowerCase();
            const plan = getUserPlan(user);

            const matchesSearch =
                !normalizedSearch ||
                name.includes(normalizedSearch) ||
                email.includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                status === String(statusFilter).toLowerCase();

            const matchesPlan =
                planFilter === "all" || plan === planFilter;

            return matchesSearch && matchesStatus && matchesPlan;
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b?.created_at || 0) - new Date(a?.created_at || 0);
            }

            if (sortBy === "oldest") {
                return new Date(a?.created_at || 0) - new Date(b?.created_at || 0);
            }

            if (sortBy === "name") {
                return String(a?.name || "").localeCompare(String(b?.name || ""));
            }

            return 0;
        });

        return result;
    }, [users, normalizedSearch, statusFilter, planFilter, sortBy]);

    const summary = useMemo(() => {
        return {
            total: users.length,
            active: users.filter((user) => normalizeUserStatus(user) === "Aktiv").length,
            inactive: users.filter((user) => normalizeUserStatus(user) === "Jo aktiv").length,
            pending: users.filter((user) => normalizeUserStatus(user) === "Në pritje").length,
            recent: users.filter((user) => isRecentUser(user?.created_at)).length,
        };
    }, [users]);

    const handleDelete = async (user) => {
        const confirmed = window.confirm(
            `A je e sigurt që dëshiron ta fshish përdoruesin "${user?.name || "pa emër"}"?`
        );

        if (!confirmed) return;

        setLoadingUserId(user.id);

        try {
            const response = await fetch(`/admin/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            if (!response.ok) {
                throw new Error("Fshirja dështoi.");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë fshirjes së përdoruesit.");
            setLoadingUserId(null);
        }
    };

    const handleToggleStatus = async (user) => {
        const currentStatus = normalizeUserStatus(user);
        const newStatus = currentStatus === "Aktiv" ? "inactive" : "active";

        setLoadingUserId(user.id);

        try {
            const response = await fetch(`/admin/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error("Përditësimi dështoi.");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë përditësimit të statusit.");
            setLoadingUserId(null);
        }
    };
const handleGrantPremium = async (user) => {
    const confirmed = window.confirm(
        `A dëshiron t’i aktivizosh Premium për 6 muaj përdoruesit "${user?.name || "pa emër"}"?`
    );

    if (!confirmed) return;

    setLoadingUserId(user.id);

    try {
      const response = await fetch(`/admin/users/${user.id}/give-premium`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCsrfToken(),
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
    },
    credentials: "same-origin",
});

        if (!response.ok) {
            throw new Error("Aktivizimi i Premium dështoi.");
        }

        alert("Premium u aktivizua me sukses për 6 muaj.");
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert(error.message || "Ndodhi një gabim gjatë aktivizimit të Premium.");
        setLoadingUserId(null);
    }
};
    const handleResetFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setPlanFilter("all");
        setSortBy("newest");
    };

    const handleExportCsv = () => {
        const rows = filteredUsers.map((user) => ({
            Emri: user?.name || "-",
            Email: user?.email || "-",
            Plani: getUserPlan(user),
            Statusi: normalizeUserStatus(user),
            Regjistruar: formatDateTime(user?.created_at),
            "Hyrja e fundit": formatDateTime(user?.last_login_at),
        }));

        downloadCsv(rows, "perdoruesit-eventetsot.csv");
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-[#ECEAF4] bg-white p-6 shadow-[0_18px_55px_rgba(32,24,64,0.07)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.12),transparent_25%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B61FF]">
                            Paneli i administratorit
                        </span>

                        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] md:text-4xl">
                            Menaxhimi i përdoruesve
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            Kontrollo përdoruesit, statusin e llogarisë, planin aktiv,
                            datën e regjistrimit dhe veprimet kryesore nga një hapësirë
                            e vetme e pastër dhe profesionale.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleExportCsv}
                            className="inline-flex items-center justify-center rounded-2xl border border-[#E6E0FF] bg-white px-5 py-3 text-sm font-bold text-[#7B61FF] transition hover:bg-[#F8F5FF]"
                        >
                            Eksporto CSV
                        </button>

                        <a
                            href="/admin/users/create"
                            className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] hover:shadow-[0_18px_36px_rgba(123,97,255,0.26)]"
                        >
                            Shto përdorues
                        </a>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <SummaryCard title="Përdorues gjithsej" value={summary.total} tone="purple" />
                <SummaryCard title="Aktivë" value={summary.active} tone="green" />
                <SummaryCard title="Jo aktivë" value={summary.inactive} tone="red" />
                <SummaryCard title="Në pritje" value={summary.pending} tone="yellow" />
                <SummaryCard title="Të rinj këtë javë" value={summary.recent} tone="blue" />
            </section>

            <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(32,24,64,0.05)]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#1F1B2D]">
                                Filtrim dhe kërkim
                            </h2>
                            <p className="mt-1 text-sm text-[#7C7890]">
                                Gjej përdoruesin sipas emrit, email-it, statusit ose planit.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="w-fit rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-2.5 text-sm font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Pastro filtrat
                        </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A96B2]">
                                <SearchIcon />
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Kërko me emër ose email..."
                                className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] py-3 pl-11 pr-4 text-sm text-[#1F1B2D] placeholder:text-[#9A96B2] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                        >
                            <option value="all">Të gjitha statuset</option>
                            <option value="active">Aktiv</option>
                            <option value="inactive">Jo aktiv</option>
                            <option value="pending">Në pritje</option>
                        </select>

                        <select
                            value={planFilter}
                            onChange={(e) => setPlanFilter(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                        >
                            <option value="all">Të gjitha planet</option>
                            {plans.map((plan) => (
                                <option key={plan} value={plan}>
                                    {plan}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                        >
                            <option value="newest">Më të rinjtë</option>
                            <option value="oldest">Më të vjetrit</option>
                            <option value="name">Sipas emrit</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
                <div className="flex flex-col gap-3 border-b border-[#F1EFF8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base font-bold text-[#1F1B2D]">
                            Lista e përdoruesve
                        </h2>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Po shfaqen {filteredUsers.length} nga {users.length} përdorues.
                        </p>
                    </div>

                    <div className="rounded-full bg-[#F8F5FF] px-4 py-2 text-xs font-bold text-[#7B61FF]">
                        Aktivë: {summary.active} · Jo aktivë: {summary.inactive}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-[#FAF8FF] text-sm text-[#6B6880]">
                            <tr>
                                <th className="px-6 py-4 font-bold">Përdoruesi</th>
                                <th className="px-6 py-4 font-bold">Plani</th>
                                <th className="px-6 py-4 font-bold">Statusi</th>
                                <th className="px-6 py-4 font-bold">Regjistruar</th>
                                <th className="px-6 py-4 font-bold">Hyrja e fundit</th>
                                <th className="px-6 py-4 text-right font-bold">Veprime</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#F1EFF8] bg-white">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const status = normalizeUserStatus(user);
                                    const isLoading = loadingUserId === user.id;

                                    return (
                                        <tr
                                            key={user.id}
                                            className="transition duration-200 hover:bg-[#F9F7FF]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/12 to-[#6EC3F4]/12 text-sm font-black text-[#7B61FF] ring-1 ring-[#7B61FF]/10">
                                                        {getInitials(user?.name)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-[#1F1B2D]">
                                                            {user?.name || "Pa emër"}
                                                        </p>
                                                        <p className="truncate text-sm text-[#7C7890]">
                                                            {user?.email || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-bold text-[#4567D8]">
                                                    {getUserPlan(user)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={status} />
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#6B6880]">
                                                {formatDateTime(user?.created_at)}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#6B6880]">
                                                {formatDateTime(user?.last_login_at)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <a
                                                        href={`/admin/users/${user.id}`}
                                                        className="rounded-xl border border-[#E6E0FF] bg-[#F8F5FF] px-3 py-2 text-xs font-bold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                                                    >
                                                        Shiko
                                                    </a>

                                                    <a
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                                    >
                                                        Ndrysho
                                                    </a>
                                                    <button
    type="button"
    onClick={() => handleGrantPremium(user)}
    disabled={isLoading}
    className="rounded-xl border border-[#EDE7FF] bg-[#F4F0FF] px-3 py-2 text-xs font-bold text-[#7B61FF] transition hover:bg-[#EDE7FF] disabled:cursor-not-allowed disabled:opacity-60"
>
    {isLoading ? "Duke ruajtur..." : "Jep Premium"}
</button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(user)}
                                                        disabled={isLoading}
                                                        className="rounded-xl border border-[#E2F5EB] bg-white px-3 py-2 text-xs font-bold text-[#2E9B67] transition hover:bg-[#EAFBF1] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading
                                                            ? "Duke ruajtur..."
                                                            : status === "Aktiv"
                                                            ? "Çaktivizo"
                                                            : "Aktivizo"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user)}
                                                        disabled={isLoading}
                                                        className="rounded-xl border border-[#FFE3E8] bg-[#FFF1F3] px-3 py-2 text-xs font-bold text-[#D14D72] transition hover:bg-[#FFE4EA] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading ? "Duke fshirë..." : "Fshi"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7B61FF]/10 to-[#6EC3F4]/10 text-xl font-black text-[#7B61FF]">
                                                U
                                            </div>

                                            <h3 className="mt-5 text-lg font-black text-[#1F1B2D]">
                                                Nuk u gjet asnjë përdorues
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-[#7C7890]">
                                                Provo të ndryshosh kërkimin ose pastro filtrat
                                                për të parë të gjithë përdoruesit.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={handleResetFilters}
                                                className="mt-5 rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6A4DFF]"
                                            >
                                                Pastro filtrat
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

function SummaryCard({ title, value, tone = "purple" }) {
    const tones = {
        purple: {
            bg: "from-[#7B61FF]/10",
            text: "text-[#7B61FF]",
        },
        green: {
            bg: "from-[#52B788]/12",
            text: "text-[#1F8F55]",
        },
        red: {
            bg: "from-[#FF7B9C]/12",
            text: "text-[#D14D72]",
        },
        yellow: {
            bg: "from-[#FFD166]/18",
            text: "text-[#B7791F]",
        },
        blue: {
            bg: "from-[#6EC3F4]/14",
            text: "text-[#337DAA]",
        },
    };

    const selectedTone = tones[tone] || tones.purple;

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_36px_rgba(32,24,64,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,97,255,0.14)]">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${selectedTone.bg} to-transparent opacity-80`}
            />

            <div className="relative z-10">
                <p className="text-sm font-bold text-[#7C7890]">{title}</p>
                <h3 className={`mt-3 text-3xl font-black ${selectedTone.text}`}>
                    {value}
                </h3>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Aktiv: "bg-[#EAFBF1] text-[#1F8F55] ring-[#BFEBD2]",
        "Jo aktiv": "bg-[#FFF1F3] text-[#D14D72] ring-[#FFD1DC]",
        "Në pritje": "bg-[#FFF8E8] text-[#C58A16] ring-[#FFE8A8]",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${
                styles[status] || "bg-[#F3F1FA] text-[#6B6880] ring-[#E8E4F4]"
            }`}
        >
            {status}
        </span>
    );
}

function normalizeUserStatus(user) {
    if (typeof user?.status === "string" && user.status.trim()) {
        const value = user.status.toLowerCase();

        if (value === "active") return "Aktiv";
        if (value === "inactive") return "Jo aktiv";
        if (value === "pending") return "Në pritje";
    }

    if (user?.is_active === true || user?.is_active === 1) return "Aktiv";
    if (user?.is_active === false || user?.is_active === 0) return "Jo aktiv";

    if (user?.last_login_at) return "Aktiv";

    return "Jo aktiv";
}

function getUserPlan(user) {
    return (
        user?.subscription_plan_name ||
        user?.plan_name ||
        user?.subscription?.plan?.name ||
        user?.plan?.name ||
        "Pa plan"
    );
}

function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("sq-AL", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function getInitials(name) {
    if (!name) return "U";

    return String(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}

function isRecentUser(value) {
    if (!value) return false;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return false;

    const diff = Date.now() - date.getTime();

    return diff <= 7 * 24 * 60 * 60 * 1000;
}

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}

function downloadCsv(rows, filename) {
    if (!rows.length) {
        alert("Nuk ka të dhëna për eksport.");
        return;
    }

    const headers = Object.keys(rows[0]);

    const csv = [
        headers.join(","),
        ...rows.map((row) =>
            headers
                .map((header) => `"${String(row[header] ?? "").replaceAll('"', '""')}"`)
                .join(",")
        ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

function SearchIcon() {
    return (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
        </svg>
    );
}