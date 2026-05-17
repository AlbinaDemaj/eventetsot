import { useMemo, useState } from "react";

export default function AdminSubscriptionPlansPage({ extra = {} }) {
    const plans = Array.isArray(extra?.plans) ? extra.plans : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredPlans = useMemo(() => {
        let result = plans.filter((plan) => {
            const name = String(plan?.name || "").toLowerCase();
            const slug = String(plan?.slug || "").toLowerCase();
            const description = String(plan?.description || "").toLowerCase();

            const matchesSearch =
                !normalizedSearch ||
                name.includes(normalizedSearch) ||
                slug.includes(normalizedSearch) ||
                description.includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                normalizePlanStatus(plan).key === statusFilter;

            return matchesSearch && matchesStatus;
        });

        return [...result].sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b?.created_at || 0) - new Date(a?.created_at || 0);
            }

            if (sortBy === "oldest") {
                return new Date(a?.created_at || 0) - new Date(b?.created_at || 0);
            }

            if (sortBy === "price_high") {
                return Number(b?.price || 0) - Number(a?.price || 0);
            }

            if (sortBy === "price_low") {
                return Number(a?.price || 0) - Number(b?.price || 0);
            }

            return String(a?.name || "").localeCompare(String(b?.name || ""));
        });
    }, [plans, normalizedSearch, statusFilter, sortBy]);

    const summary = useMemo(() => {
        const active = plans.filter((plan) => normalizePlanStatus(plan).key === "active").length;
        const inactive = plans.filter((plan) => normalizePlanStatus(plan).key === "inactive").length;
        const avgPrice =
            plans.length > 0
                ? plans.reduce((sum, plan) => sum + Number(plan?.price || 0), 0) /
                  plans.length
                : 0;

        return {
            total: plans.length,
            active,
            inactive,
            avgPrice: avgPrice.toFixed(2),
        };
    }, [plans]);

    const handleDelete = async (plan) => {
        const confirmed = window.confirm(
            `A je e sigurt që dëshiron ta fshish planin "${plan?.name || "pa emër"}"?`
        );

        if (!confirmed) return;

        setLoadingPlanId(plan.id);

        try {
            const response = await fetch(`/admin/plans/${plan.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            const data = await safeJson(response);

            if (!response.ok) {
                throw new Error(data?.message || "Fshirja dështoi.");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë fshirjes së planit.");
            setLoadingPlanId(null);
        }
    };

    const handleToggleStatus = async (plan) => {
        setLoadingPlanId(plan.id);

        try {
            const response = await fetch(`/admin/plans/${plan.id}/toggle-status`, {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            const data = await safeJson(response);

            if (!response.ok) {
                throw new Error(data?.message || "Përditësimi i statusit dështoi.");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë përditësimit të statusit.");
            setLoadingPlanId(null);
        }
    };

    const handleResetFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setSortBy("newest");
    };

    const handleExportCsv = () => {
        const rows = filteredPlans.map((plan) => ({
            Plani: plan?.name || "-",
            Slug: plan?.slug || "-",
            Çmimi: formatPlanPrice(plan),
            Cikli: formatBillingCycle(plan),
            Statusi: normalizePlanStatus(plan).label,
            Veçori: getFeaturesCount(plan),
            Krijuar: formatDateTime(plan?.created_at),
        }));

        downloadCsv(rows, "planet-e-abonimit.csv");
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-[#ECEAF4] bg-white p-6 shadow-[0_18px_55px_rgba(32,24,64,0.07)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.12),transparent_25%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B61FF]">
                            Planet e abonimit
                        </span>

                        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] md:text-4xl">
                            Menaxhimi i planeve
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            Menaxho paketat premium, çmimet, ciklin e faturimit,
                            veçoritë dhe statusin aktiv të secilit plan në platformë.
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
                            href="/admin/plans/create"
                            className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF]"
                        >
                            Shto plan
                        </a>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Plane gjithsej" value={summary.total} tone="purple" />
                <SummaryCard title="Plane aktive" value={summary.active} tone="green" />
                <SummaryCard title="Jo aktive" value={summary.inactive} tone="red" />
                <SummaryCard title="Çmimi mesatar" value={`€${summary.avgPrice}`} tone="blue" />
            </section>

            <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(32,24,64,0.05)]">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-lg font-black text-[#1F1B2D]">
                                Filtrim dhe kërkim
                            </h2>
                            <p className="mt-1 text-sm text-[#7C7890]">
                                Kërko sipas emrit, slug-ut ose përshkrimit të planit.
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

                    <div className="grid gap-3 md:grid-cols-3">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A96B2]">
                                <SearchIcon />
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Kërko plan..."
                                className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] py-3 pl-11 pr-4 text-sm font-medium text-[#1F1B2D] placeholder:text-[#AAA6B8] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
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
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                        >
                            <option value="newest">Më të rinjtë</option>
                            <option value="oldest">Më të vjetrit</option>
                            <option value="price_high">Çmimi më i lartë</option>
                            <option value="price_low">Çmimi më i ulët</option>
                            <option value="name">Sipas emrit</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
                <div className="flex flex-col gap-3 border-b border-[#F1EFF8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base font-black text-[#1F1B2D]">
                            Lista e planeve
                        </h2>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Po shfaqen {filteredPlans.length} nga {plans.length} plane.
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
                                <th className="px-6 py-4 font-bold">Plani</th>
                                <th className="px-6 py-4 font-bold">Çmimi</th>
                                <th className="px-6 py-4 font-bold">Cikli</th>
                                <th className="px-6 py-4 font-bold">Statusi</th>
                                <th className="px-6 py-4 font-bold">Veçori</th>
                                <th className="px-6 py-4 font-bold">Krijuar</th>
                                <th className="px-6 py-4 text-right font-bold">Veprime</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#F1EFF8] bg-white">
                            {filteredPlans.length > 0 ? (
                                filteredPlans.map((plan) => {
                                    const status = normalizePlanStatus(plan);
                                    const isLoading = loadingPlanId === plan.id;

                                    return (
                                        <tr
                                            key={plan.id}
                                            className="transition duration-200 hover:bg-[#F9F7FF]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/12 to-[#6EC3F4]/12 text-sm font-black text-[#7B61FF] ring-1 ring-[#7B61FF]/10">
                                                        {getPlanInitial(plan?.name)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-black text-[#1F1B2D]">
                                                            {plan?.name || "Plan pa emër"}
                                                        </p>

                                                        <p className="mt-1 truncate text-sm text-[#7C7890]">
                                                            {plan?.slug || "-"}
                                                        </p>

                                                        {plan?.description ? (
                                                            <p className="mt-2 max-w-md text-sm leading-6 text-[#7C7890] line-clamp-2">
                                                                {plan.description}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-black text-[#4567D8]">
                                                    {formatPlanPrice(plan)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#6B6880]">
                                                {formatBillingCycle(plan)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={status.label} />
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#6B6880]">
                                                {getFeaturesCount(plan)} veçori
                                            </td>

                                            <td className="px-6 py-4 text-sm font-medium text-[#6B6880]">
                                                {formatDateTime(plan?.created_at)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <a
                                                        href={`/admin/plans/${plan.id}`}
                                                        className="rounded-xl border border-[#E6E0FF] bg-[#F8F5FF] px-3 py-2 text-xs font-bold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                                                    >
                                                        Shiko
                                                    </a>

                                                    <a
                                                        href={`/admin/plans/${plan.id}/edit`}
                                                        className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                                    >
                                                        Ndrysho
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(plan)}
                                                        disabled={isLoading}
                                                        className="rounded-xl border border-[#E2F5EB] bg-white px-3 py-2 text-xs font-bold text-[#2E9B67] transition hover:bg-[#EAFBF1] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading
                                                            ? "Duke ruajtur..."
                                                            : status.key === "active"
                                                            ? "Çaktivizo"
                                                            : "Aktivizo"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(plan)}
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
                                    <td colSpan={7} className="px-6 py-16 text-center">
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7B61FF]/10 to-[#6EC3F4]/10 text-xl font-black text-[#7B61FF]">
                                                P
                                            </div>

                                            <h3 className="mt-5 text-lg font-black text-[#1F1B2D]">
                                                Nuk u gjet asnjë plan
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-[#7C7890]">
                                                Provo të ndryshosh kërkimin ose pastro filtrat.
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
        blue: {
            bg: "from-[#6EC3F4]/14",
            text: "text-[#337DAA]",
        },
    };

    const selectedTone = tones[tone] || tones.purple;

    return (
        <div className="relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_36px_rgba(32,24,64,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,97,255,0.14)]">
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

function normalizePlanStatus(plan) {
    return plan?.is_active
        ? { key: "active", label: "Aktiv" }
        : { key: "inactive", label: "Jo aktiv" };
}

function formatPlanPrice(plan) {
    const currency = plan?.currency || "EUR";
    const price = Number(plan?.price || 0).toFixed(2);

    if (currency === "EUR") return `€${price}`;

    return `${currency} ${price}`;
}

function formatBillingCycle(plan) {
    const days = Number(plan?.billing_cycle_days || 0);

    if (days === 30) return "Mujor";
    if (days === 90) return "3 muaj";
    if (days === 180) return "6 muaj";
    if (days === 365) return "Vjetor";

    return `${days} ditë`;
}

function getFeaturesCount(plan) {
    if (Array.isArray(plan?.features)) return plan.features.length;

    if (typeof plan?.features === "string") {
        try {
            const parsed = JSON.parse(plan.features);
            return Array.isArray(parsed) ? parsed.length : 0;
        } catch {
            return plan.features.trim() ? 1 : 0;
        }
    }

    return 0;
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

function getPlanInitial(name) {
    if (!name) return "P";
    return String(name).charAt(0).toUpperCase();
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

async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
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