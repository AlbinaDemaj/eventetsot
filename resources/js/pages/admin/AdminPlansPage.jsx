import { useMemo, useState } from "react";

export default function AdminPlansPage({ extra = {} }) {
    const plans = Array.isArray(extra?.plans) ? extra.plans : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const filteredPlans = useMemo(() => {
        const q = search.trim().toLowerCase();

        const result = plans.filter((plan) => {
            const matchesSearch =
                !q ||
                String(plan?.name || "").toLowerCase().includes(q) ||
                String(plan?.slug || "").toLowerCase().includes(q) ||
                String(plan?.description || "").toLowerCase().includes(q);

            const status = plan?.is_active ? "active" : "inactive";
            const matchesStatus = statusFilter === "all" || status === statusFilter;

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
    }, [plans, search, statusFilter, sortBy]);

    const summary = useMemo(() => {
        const active = plans.filter((plan) => plan?.is_active).length;
        const inactive = plans.length - active;
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
                    "X-CSRF-TOKEN": getCsrf(),
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

    const toggleStatus = async (plan) => {
        setLoadingPlanId(plan.id);

        try {
            const response = await fetch(`/admin/plans/${plan.id}/toggle-status`, {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": getCsrf(),
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

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setSortBy("newest");
    };

    const exportCsv = () => {
        const rows = filteredPlans.map((plan) => ({
            Plani: plan?.name || "-",
            Slug: plan?.slug || "-",
            Çmimi: formatPrice(plan),
            Cikli: formatBillingCycle(plan),
            Statusi: plan?.is_active ? "Aktiv" : "Jo aktiv",
            "Ditë aktive": getActiveDays(plan),
            "Orë aktive": getActiveHours(plan),
            Veçori: getFeatures(plan).length,
        }));

        downloadCsv(rows, "planet-eventetsot.csv");
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
                            Menaxho paketat, çmimet, ciklet e faturimit, ditët aktive,
                            orët aktive dhe opsionet që shfaqen për përdoruesit.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={exportCsv}
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
                                Kërkim dhe filtrim
                            </h2>
                            <p className="mt-1 text-sm text-[#7C7890]">
                                Kërko planin sipas emrit, slug-ut ose përshkrimit.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="w-fit rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-2.5 text-sm font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Pastro filtrat
                        </button>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Kërko plan..."
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition placeholder:text-[#AAA6B8] focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]"
                        />

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

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => {
                        const isActive = Boolean(plan?.is_active);
                        const isLoading = loadingPlanId === plan.id;
                        const features = getFeatures(plan);

                        return (
                            <article
                                key={plan.id}
                                className="group relative overflow-hidden rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(123,97,255,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/8 via-transparent to-[#6EC3F4]/8 opacity-0 transition group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <StatusBadge active={isActive} />

                                            <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-[#1F1B2D]">
                                                {plan?.name || "Plan pa emër"}
                                            </h3>

                                            <p className="mt-1 text-sm font-medium text-[#8A86A3]">
                                                {plan?.slug || "pa-slug"}
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/12 to-[#6EC3F4]/12 text-sm font-black text-[#7B61FF] ring-1 ring-[#7B61FF]/10">
                                            {getInitial(plan?.name)}
                                        </div>
                                    </div>

                                    <p className="mt-4 min-h-[48px] text-sm leading-6 text-[#7C7890]">
                                        {plan?.description || "Nuk është shtuar ende përshkrim për këtë plan."}
                                    </p>

                                    <div className="mt-6 rounded-[24px] border border-[#F1EFF8] bg-[#FCFBFF] p-5">
                                        <div className="text-4xl font-black tracking-[-0.04em] text-[#7B61FF]">
                                            {formatPrice(plan)}
                                        </div>

                                        <p className="mt-1 text-sm font-medium text-[#7C7890]">
                                            {formatBillingCycle(plan)}
                                        </p>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <MiniInfo label="Ditë aktive" value={getActiveDays(plan)} />
                                        <MiniInfo label="Orë aktive" value={getActiveHours(plan)} />
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-sm font-black text-[#1F1B2D]">
                                            Veçoritë kryesore
                                        </p>

                                        <div className="mt-3 space-y-2">
                                            {features.length > 0 ? (
                                                features.slice(0, 4).map((feature, index) => (
                                                    <div
                                                        key={`${feature}-${index}`}
                                                        className="flex items-start gap-2 text-sm leading-6 text-[#5F5A72]"
                                                    >
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7B61FF]" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-[#9A96B2]">
                                                    Nuk ka veçori të shtuara.
                                                </p>
                                            )}
                                        </div>

                                        {features.length > 4 ? (
                                            <p className="mt-2 text-xs font-bold text-[#7B61FF]">
                                                +{features.length - 4} veçori të tjera
                                            </p>
                                        ) : null}
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2">
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
                                            onClick={() => toggleStatus(plan)}
                                            disabled={isLoading}
                                            className="rounded-xl border border-[#E2F5EB] bg-white px-3 py-2 text-xs font-bold text-[#2E9B67] transition hover:bg-[#EAFBF1] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isLoading
                                                ? "Duke ruajtur..."
                                                : isActive
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
                                </div>
                            </article>
                        );
                    })
                ) : (
                    <div className="rounded-[30px] border border-dashed border-[#DCD7F1] bg-white p-10 text-center md:col-span-2 xl:col-span-3">
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
                            onClick={resetFilters}
                            className="mt-5 rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6A4DFF]"
                        >
                            Pastro filtrat
                        </button>
                    </div>
                )}
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

function StatusBadge({ active }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${
                active
                    ? "bg-[#EAFBF1] text-[#1F8F55] ring-[#BFEBD2]"
                    : "bg-[#FFF1F3] text-[#D14D72] ring-[#FFD1DC]"
            }`}
        >
            {active ? "Aktiv" : "Jo aktiv"}
        </span>
    );
}

function MiniInfo({ label, value }) {
    return (
        <div className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3">
            <p className="text-xs font-bold text-[#9A96B2]">{label}</p>
            <p className="mt-1 text-sm font-black text-[#1F1B2D]">{value}</p>
        </div>
    );
}

function getFeatures(plan) {
    if (Array.isArray(plan?.features)) return plan.features;

    if (typeof plan?.features === "string") {
        try {
            const parsed = JSON.parse(plan.features);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return plan.features.trim() ? [plan.features] : [];
        }
    }

    return [];
}

function getActiveDays(plan) {
    return plan?.active_days || plan?.limits?.active_days || plan?.billing_cycle_days || 30;
}

function getActiveHours(plan) {
    return plan?.active_hours || plan?.limits?.active_hours || 3;
}

function formatPrice(plan) {
    const price = Number(plan?.price || 0).toFixed(2);
    const currency = plan?.currency || "EUR";

    if (currency === "EUR") return `€${price}`;

    return `${currency} ${price}`;
}

function formatBillingCycle(plan) {
    const days = Number(plan?.billing_cycle_days || 30);

    if (days === 30) return "Pagesë mujore";
    if (days === 90) return "Pagesë çdo 3 muaj";
    if (days === 180) return "Pagesë çdo 6 muaj";
    if (days === 365) return "Pagesë vjetore";

    return `Çdo ${days} ditë`;
}

function getInitial(name) {
    return String(name || "P").charAt(0).toUpperCase();
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

function getCsrf() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}