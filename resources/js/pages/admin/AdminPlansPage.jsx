import { useMemo, useState } from "react";

export default function AdminPlansPage({ extra = {} }) {
    const plans = Array.isArray(extra?.plans) ? extra.plans : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loadingPlanId, setLoadingPlanId] = useState(null);

    const filteredPlans = useMemo(() => {
        const q = search.trim().toLowerCase();

        return plans.filter((plan) => {
            const matchesSearch =
                !q ||
                String(plan?.name || "").toLowerCase().includes(q) ||
                String(plan?.slug || "").toLowerCase().includes(q) ||
                String(plan?.description || "").toLowerCase().includes(q);

            const status = plan?.is_active ? "active" : "inactive";
            const matchesStatus = statusFilter === "all" || status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [plans, search, statusFilter]);

    const summary = useMemo(() => {
        const active = plans.filter((plan) => plan?.is_active).length;
        const inactive = plans.length - active;
        const avgPrice =
            plans.length > 0
                ? plans.reduce((sum, plan) => sum + Number(plan?.price || 0), 0) / plans.length
                : 0;

        return {
            total: plans.length,
            active,
            inactive,
            avgPrice: avgPrice.toFixed(2),
        };
    }, [plans]);

    const handleDelete = async (plan) => {
        if (!window.confirm(`Delete plan "${plan?.name || "this plan"}"?`)) return;

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

            if (!response.ok) throw new Error("Delete failed");

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error deleting plan.");
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

            if (!response.ok) throw new Error("Status update failed");

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

                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Admin Plans
                        </span>

                        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                            Subscription Plans
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            Menaxho paketat, çmimet, ciklet e faturimit, statusin aktiv dhe
                            opsionet që shfaqen për përdoruesit.
                        </p>
                    </div>

                    <a
                        href="/admin/plans/create"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF]"
                    >
                        Add Plan
                    </a>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Total Plans" value={summary.total} />
                <SummaryCard title="Active Plans" value={summary.active} />
                <SummaryCard title="Inactive Plans" value={summary.inactive} />
                <SummaryCard title="Average Price" value={`€${summary.avgPrice}`} />
            </section>

            <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-[#1F1B2D]">
                            Plans Directory
                        </h2>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Kërko planin sipas emrit, slug ose përshkrimit.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search plans..."
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(123,97,255,0.10)] sm:w-80"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm text-[#1F1B2D] outline-none transition focus:border-[#7B61FF] focus:bg-white"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => {
                        const isActive = Boolean(plan?.is_active);
                        const isLoading = loadingPlanId === plan.id;
                        const features = Array.isArray(plan?.features) ? plan.features : [];

                        return (
                            <article
                                key={plan.id}
                                className="group relative overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(123,97,255,0.15)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/6 to-transparent opacity-0 transition group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                    isActive
                                                        ? "bg-[#EAFBF1] text-[#1F8F55]"
                                                        : "bg-[#FFF1F3] text-[#D14D72]"
                                                }`}
                                            >
                                                {isActive ? "Active" : "Inactive"}
                                            </span>

                                            <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-[#1F1B2D]">
                                                {plan?.name || "Plan"}
                                            </h3>

                                            <p className="mt-1 text-sm text-[#8A86A3]">
                                                {plan?.slug || "no-slug"}
                                            </p>
                                        </div>

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7B61FF]/10 font-bold text-[#7B61FF]">
                                            {getInitial(plan?.name)}
                                        </div>
                                    </div>

                                    <p className="mt-4 min-h-[44px] text-sm leading-6 text-[#7C7890]">
                                        {plan?.description || "No description added yet."}
                                    </p>

                                    <div className="mt-5">
                                        <div className="text-4xl font-black text-[#7B61FF]">
                                            {formatPrice(plan)}
                                        </div>
                                        <p className="mt-1 text-sm text-[#7C7890]">
                                            Every {plan?.billing_cycle_days || 30} days
                                        </p>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <MiniInfo
                                            label="Active Days"
                                            value={plan?.active_days || plan?.limits?.active_days || plan?.billing_cycle_days || 30}
                                        />
                                        <MiniInfo
                                            label="Active Hours"
                                            value={plan?.active_hours || plan?.limits?.active_hours || 3}
                                        />
                                    </div>

                                    <div className="mt-5 space-y-2">
                                        {features.length > 0 ? (
                                            features.slice(0, 4).map((feature, index) => (
                                                <div
                                                    key={`${feature}-${index}`}
                                                    className="flex items-start gap-2 text-sm text-[#5F5A72]"
                                                >
                                                    <span className="mt-0.5 text-[#7B61FF]">✓</span>
                                                    <span>{feature}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[#9A96B2]">
                                                No features added.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <a
                                            href={`/admin/plans/${plan.id}/edit`}
                                            className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                        >
                                            Edit
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() => toggleStatus(plan)}
                                            disabled={isLoading}
                                            className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-semibold text-[#5F5A72] transition hover:border-[#52B788] hover:text-[#2E9B67] disabled:opacity-60"
                                        >
                                            {isLoading
                                                ? "Saving..."
                                                : isActive
                                                ? "Deactivate"
                                                : "Activate"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(plan)}
                                            disabled={isLoading}
                                            className="rounded-xl border border-[#FFE3E8] bg-[#FFF1F3] px-3 py-2 text-xs font-semibold text-[#D14D72] transition hover:bg-[#FFE4EA] disabled:opacity-60"
                                        >
                                            {isLoading ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })
                ) : (
                    <div className="md:col-span-2 xl:col-span-3 rounded-[30px] border border-dashed border-[#DCD7F1] bg-white p-10 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7B61FF]/10 text-xl font-bold text-[#7B61FF]">
                            P
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-[#1F1B2D]">
                            No plans found
                        </h3>
                        <p className="mt-2 text-sm text-[#7C7890]">
                            Nuk u gjet asnjë plan sipas filtrave aktualë.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

function SummaryCard({ title, value }) {
    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_36px_rgba(123,97,255,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,97,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
                <p className="text-sm font-medium text-[#7C7890]">{title}</p>
                <h3 className="mt-3 text-3xl font-bold text-[#1F1B2D]">
                    {value}
                </h3>
            </div>
        </div>
    );
}

function MiniInfo({ label, value }) {
    return (
        <div className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3">
            <p className="text-xs text-[#9A96B2]">{label}</p>
            <p className="mt-1 text-sm font-bold text-[#1F1B2D]">{value}</p>
        </div>
    );
}

function formatPrice(plan) {
    const price = Number(plan?.price || 0).toFixed(2);
    const currency = plan?.currency || "EUR";

    if (currency === "EUR") return `€${price}`;
    return `${currency} ${price}`;
}

function getInitial(name) {
    return String(name || "P").charAt(0).toUpperCase();
}

function getCsrf() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}