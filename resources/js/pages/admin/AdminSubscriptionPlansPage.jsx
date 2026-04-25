import { useMemo, useState } from "react";

export default function AdminSubscriptionPlansPage({ extra = {} }) {
    const plans = Array.isArray(extra?.plans) ? extra.plans : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredPlans = useMemo(() => {
        return plans.filter((plan) => {
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
                normalizePlanStatus(plan).toLowerCase() === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [plans, normalizedSearch, statusFilter]);

    const summary = useMemo(() => {
        return {
            total: plans.length,
            active: plans.filter((plan) => normalizePlanStatus(plan) === "Active").length,
            inactive: plans.filter((plan) => normalizePlanStatus(plan) === "Inactive").length,
            avgPrice:
                plans.length > 0
                    ? (
                          plans.reduce(
                              (sum, plan) => sum + Number(plan?.price || 0),
                              0
                          ) / plans.length
                      ).toFixed(2)
                    : "0.00",
        };
    }, [plans]);

    const handleDelete = async (plan) => {
        const confirmed = window.confirm(`Delete plan "${plan?.name || "this plan"}"?`);
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Delete failed");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error deleting plan.");
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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Status update failed");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error updating plan status.");
            setLoadingPlanId(null);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.08),transparent_24%)]" />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Admin Plans
                        </span>

                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                            Subscription Plans
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-[#7C7890]">
                            Menaxho planet e abonimit, çmimet, ciklin e faturimit dhe
                            statusin aktiv të secilit plan.
                        </p>
                    </div>

                    <a
                        href="/admin/plans/create"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] hover:shadow-[0_14px_30px_rgba(123,97,255,0.25)]"
                    >
                        Add Plan
                    </a>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Total Plans" value={summary.total} tone="purple" />
                <SummaryCard title="Active Plans" value={summary.active} tone="green" />
                <SummaryCard title="Inactive Plans" value={summary.inactive} tone="red" />
                <SummaryCard title="Average Price" value={`€${summary.avgPrice}`} tone="blue" />
            </section>

            <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-[#1F1B2D]">
                            Plans Directory
                        </h3>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Kërko dhe filtro planet e platformës.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9A96B2]">
                                <SearchIcon />
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, slug or description..."
                                className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] py-3 pl-11 pr-4 text-sm text-[#1F1B2D] placeholder:text-[#9A96B2] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(123,97,255,0.10)] sm:w-80"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(123,97,255,0.10)]"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                <div className="flex flex-col gap-3 border-b border-[#F1EFF8] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-[#1F1B2D]">
                            Plans List
                        </h3>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Showing {filteredPlans.length} of {plans.length} plans
                        </p>
                    </div>

                    <div className="text-sm text-[#8A86A3]">
                        Active: {summary.active} · Inactive: {summary.inactive}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-[#FAF8FF] text-sm text-[#6B6880]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Plan</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Cycle</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Features</th>
                                <th className="px-6 py-4 font-semibold">Created</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
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
                                            className={`transition duration-200 hover:bg-[#F8F5FF] ${
                                                status === "Active" ? "bg-[#FCFBFF]" : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 font-semibold text-[#7B61FF]">
                                                            {getPlanInitial(plan?.name)}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate font-semibold text-[#1F1B2D]">
                                                                {plan?.name || "Plan"}
                                                            </p>
                                                            <p className="truncate text-sm text-[#7C7890]">
                                                                {plan?.slug || "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {plan?.description ? (
                                                        <p className="mt-3 max-w-md text-sm text-[#7C7890] line-clamp-2">
                                                            {plan.description}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#4567D8]">
                                                    {formatPlanPrice(plan)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#6B6880]">
                                                {plan?.billing_cycle_days || 0} days
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={status} />
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#6B6880]">
                                                {Array.isArray(plan?.features)
                                                    ? `${plan.features.length} features`
                                                    : "0 features"}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#6B6880]">
                                                {formatDateTime(plan?.created_at)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <a
                                                        href={`/admin/plans/${plan.id}`}
                                                        className="rounded-xl border border-[#E6E0FF] bg-[#F8F5FF] px-3 py-2 text-xs font-semibold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                                                    >
                                                        View
                                                    </a>

                                                    <a
                                                        href={`/admin/plans/${plan.id}/edit`}
                                                        className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                                    >
                                                        Edit
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(plan)}
                                                        disabled={isLoading}
                                                        className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-semibold text-[#5F5A72] transition hover:border-[#52B788] hover:text-[#2E9B67] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading
                                                            ? "Saving..."
                                                            : status === "Active"
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(plan)}
                                                        disabled={isLoading}
                                                        className="rounded-xl border border-[#FFE3E8] bg-[#FFF1F3] px-3 py-2 text-xs font-semibold text-[#D14D72] transition hover:bg-[#FFE4EA] disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-14 text-center">
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 text-xl font-bold text-[#7B61FF]">
                                                P
                                            </div>

                                            <h4 className="mt-4 text-lg font-semibold text-[#1F1B2D]">
                                                No plans found
                                            </h4>

                                            <p className="mt-2 text-sm text-[#7C7890]">
                                                Nuk u gjet asnjë plan sipas filtrave aktualë.
                                            </p>
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
        purple: "from-[#7B61FF]/5",
        green: "from-[#52B788]/6",
        red: "from-[#FF7B9C]/6",
        blue: "from-[#6EC3F4]/6",
    };

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_36px_rgba(123,97,255,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,97,255,0.15)]">
            <div
                className={`absolute inset-0 bg-gradient-to-br ${tones[tone] || tones.purple} to-transparent opacity-0 transition group-hover:opacity-100`}
            />

            <div className="relative z-10">
                <p className="text-sm font-medium text-[#7C7890]">{title}</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1F1B2D]">{value}</h3>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Active: "bg-[#EAFBF1] text-[#1F8F55]",
        Inactive: "bg-[#FFF1F3] text-[#D14D72]",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-[#F3F1FA] text-[#6B6880]"
            }`}
        >
            {status}
        </span>
    );
}

function normalizePlanStatus(plan) {
    return plan?.is_active ? "Active" : "Inactive";
}

function formatPlanPrice(plan) {
    const currency = plan?.currency || "EUR";
    const price = Number(plan?.price || 0).toFixed(2);

    if (currency === "EUR") {
        return `€${price}`;
    }

    return `${currency} ${price}`;
}

function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString();
}

function getPlanInitial(name) {
    if (!name) return "P";
    return String(name).charAt(0).toUpperCase();
}

function getCsrfToken() {
    return (
        document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || ""
    );
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