import { useState } from "react";

export default function AdminUserShowPage({ extra = {} }) {
    const selectedUser = extra?.selectedUser || null;
    const [loadingAction, setLoadingAction] = useState(null);

    if (!selectedUser) {
        return (
            <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-10 text-center shadow-[0_14px_40px_rgba(32,24,64,0.06)]">
                <h2 className="text-xl font-black text-[#1F1B2D]">
                    Përdoruesi nuk u gjet
                </h2>
                <p className="mt-2 text-sm text-[#7C7890]">
                    Ky përdorues mund të jetë fshirë ose nuk ekziston më.
                </p>

                <a
                    href="/admin/users"
                    className="mt-6 inline-flex rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6A4DFF]"
                >
                    Kthehu te përdoruesit
                </a>
            </div>
        );
    }

    const status = normalizeUserStatus(selectedUser);
    const plan = getUserPlan(selectedUser);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `A je e sigurt që dëshiron ta fshish përdoruesin "${selectedUser?.name || "pa emër"}"?`
        );

        if (!confirmed) return;

        setLoadingAction("delete");

        try {
            const response = await fetch(`/admin/users/${selectedUser.id}`, {
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

            window.location.href = data?.redirect || "/admin/users";
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë fshirjes së përdoruesit.");
            setLoadingAction(null);
        }
    };

    const handleToggleStatus = async () => {
        setLoadingAction("status");

        try {
            const response = await fetch(`/admin/users/${selectedUser.id}/toggle-status`, {
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
            setLoadingAction(null);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-[#ECEAF4] bg-white p-6 shadow-[0_18px_55px_rgba(32,24,64,0.07)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.12),transparent_25%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#7B61FF]/12 to-[#6EC3F4]/12 text-2xl font-black text-[#7B61FF] ring-1 ring-[#7B61FF]/10">
                            {getInitials(selectedUser.name)}
                        </div>

                        <div>
                            <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B61FF]">
                                Detajet e përdoruesit
                            </span>

                            <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] md:text-4xl">
                                {selectedUser.name || "Përdorues pa emër"}
                            </h1>

                            <p className="mt-2 text-sm font-medium text-[#7C7890]">
                                {selectedUser.email || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <a
                            href="/admin/users"
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-4 py-3 text-sm font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Kthehu
                        </a>

                        <a
                            href={`/admin/users/${selectedUser.id}/edit`}
                            className="rounded-2xl border border-[#E6E0FF] bg-[#F8F5FF] px-4 py-3 text-sm font-bold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                        >
                            Ndrysho
                        </a>

                        <button
                            type="button"
                            onClick={handleToggleStatus}
                            disabled={loadingAction !== null}
                            className="rounded-2xl border border-[#E2F5EB] bg-white px-4 py-3 text-sm font-bold text-[#2E9B67] transition hover:bg-[#EAFBF1] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingAction === "status"
                                ? "Duke ruajtur..."
                                : status === "Aktiv"
                                ? "Çaktivizo"
                                : "Aktivizo"}
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loadingAction !== null}
                            className="rounded-2xl border border-[#FFE3E8] bg-[#FFF1F3] px-4 py-3 text-sm font-bold text-[#D14D72] transition hover:bg-[#FFE4EA] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loadingAction === "delete" ? "Duke fshirë..." : "Fshi"}
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MiniCard title="Statusi" value={status} badge={<StatusBadge status={status} />} />
                <MiniCard title="Plani aktiv" value={plan} />
                <MiniCard title="Regjistruar" value={formatDateTime(selectedUser.created_at)} />
                <MiniCard title="Hyrja e fundit" value={formatDateTime(selectedUser.last_login_at)} />
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <InfoCard title="Informacion bazë">
                    <InfoRow label="Emri i plotë" value={selectedUser.name} />
                    <InfoRow label="Email" value={selectedUser.email} />
                    <InfoRow label="Statusi" value={<StatusBadge status={status} />} />
                    <InfoRow label="Plani" value={plan} />
                </InfoCard>

                <InfoCard title="Historia e llogarisë">
                    <InfoRow label="Krijuar më" value={formatDateTime(selectedUser.created_at)} />
                    <InfoRow label="Përditësuar më" value={formatDateTime(selectedUser.updated_at)} />
                    <InfoRow label="Hyrja e fundit" value={formatDateTime(selectedUser.last_login_at)} />
                    <InfoRow label="ID e përdoruesit" value={`#${selectedUser.id}`} />
                </InfoCard>
            </section>
        </div>
    );
}

function MiniCard({ title, value, badge = null }) {
    return (
        <div className="rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_36px_rgba(32,24,64,0.05)]">
            <p className="text-sm font-bold text-[#7C7890]">{title}</p>

            <div className="mt-3">
                {badge || (
                    <p className="truncate text-lg font-black text-[#1F1B2D]">
                        {value || "-"}
                    </p>
                )}
            </div>
        </div>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
            <h2 className="text-lg font-black text-[#1F1B2D]">{title}</h2>
            <div className="mt-5 space-y-4">{children}</div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F1EFF8] bg-[#FCFBFF] px-4 py-3">
            <span className="text-sm font-bold text-[#7C7890]">{label}</span>
            <span className="text-right text-sm font-black text-[#1F1B2D]">
                {value || "-"}
            </span>
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