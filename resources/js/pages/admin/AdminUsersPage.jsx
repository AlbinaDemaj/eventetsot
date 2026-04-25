import { useMemo, useState } from "react";

export default function AdminUsersPage({ extra = {} }) {
    const users = Array.isArray(extra?.users) ? extra.users : [];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loadingUserId, setLoadingUserId] = useState(null);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const name = String(user?.name || "").toLowerCase();
            const email = String(user?.email || "").toLowerCase();
            const normalizedStatus = normalizeUserStatus(user).toLowerCase();

            const matchesSearch =
                !normalizedSearch ||
                name.includes(normalizedSearch) ||
                email.includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                normalizedStatus === String(statusFilter).toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [users, normalizedSearch, statusFilter]);

    const summary = useMemo(() => {
        return {
            total: users.length,
            active: users.filter((user) => normalizeUserStatus(user) === "Active").length,
            inactive: users.filter((user) => normalizeUserStatus(user) === "Inactive").length,
            recent: users.filter((user) => isRecentUser(user?.created_at)).length,
        };
    }, [users]);

    const handleDelete = async (user) => {
        const confirmed = window.confirm(`Delete user "${user?.name || "this user"}"?`);

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
                throw new Error("Delete failed");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error deleting user.");
            setLoadingUserId(null);
        }
    };

    const handleToggleStatus = async (user) => {
        const currentStatus = normalizeUserStatus(user);
        const newStatus = currentStatus === "Active" ? "inactive" : "active";

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
                throw new Error("Update failed");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error updating user status.");
            setLoadingUserId(null);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.08),transparent_24%)]" />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Admin Users
                        </span>

                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                            Manage Users
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm text-[#7C7890]">
                            Shiko përdoruesit e regjistruar, statusin, planin aktiv dhe
                            menaxho llogaritë nga një tabelë e vetme.
                        </p>
                    </div>

                    <a
                        href="/admin/users/create"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] hover:shadow-[0_14px_30px_rgba(123,97,255,0.25)]"
                    >
                        Add User
                    </a>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard title="Total Users" value={summary.total} tone="purple" />
                <SummaryCard title="Active Users" value={summary.active} tone="green" />
                <SummaryCard title="Inactive Users" value={summary.inactive} tone="red" />
                <SummaryCard title="New This Week" value={summary.recent} tone="blue" />
            </section>

            <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-[#1F1B2D]">
                            Users Directory
                        </h3>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Kërko dhe filtro përdoruesit e platformës.
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
                                placeholder="Search by name or email..."
                                className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] py-3 pl-11 pr-4 text-sm text-[#1F1B2D] placeholder:text-[#9A96B2] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(123,97,255,0.10)] sm:w-72"
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
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                <div className="flex flex-col gap-3 border-b border-[#F1EFF8] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-[#1F1B2D]">
                            Users List
                        </h3>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Showing {filteredUsers.length} of {users.length} users
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
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Plan</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Registered</th>
                                <th className="px-6 py-4 font-semibold">Last Login</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
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
                                            className={`transition duration-200 hover:bg-[#F8F5FF] ${
                                                status === "Active" ? "bg-[#FCFBFF]" : ""
                                            }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 font-semibold text-[#7B61FF]">
                                                        {getInitials(user?.name)}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-semibold text-[#1F1B2D]">
                                                            {user?.name || "-"}
                                                        </p>
                                                        <p className="truncate text-sm text-[#7C7890]">
                                                            {user?.email || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#4567D8]">
                                                    {user?.subscription_plan_name ||
                                                        user?.plan_name ||
                                                        "No Plan"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <StatusBadge status={status} />
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#6B6880]">
                                                {formatDateTime(user?.created_at)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-[#6B6880]">
                                                {formatDateTime(user?.last_login_at)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap items-center justify-end gap-2">
                                                    <a
                                                        href={`/admin/users/${user.id}`}
                                                        className="rounded-xl border border-[#E6E0FF] bg-[#F8F5FF] px-3 py-2 text-xs font-semibold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                                                    >
                                                        View
                                                    </a>

                                                    <a
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="rounded-xl border border-[#ECEAF4] bg-white px-3 py-2 text-xs font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                                                    >
                                                        Edit
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleStatus(user)}
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
                                                        onClick={() => handleDelete(user)}
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
                                    <td colSpan={6} className="px-6 py-14 text-center">
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 text-xl font-bold text-[#7B61FF]">
                                                U
                                            </div>

                                            <h4 className="mt-4 text-lg font-semibold text-[#1F1B2D]">
                                                No users found
                                            </h4>

                                            <p className="mt-2 text-sm text-[#7C7890]">
                                                Nuk u gjet asnjë përdorues sipas filtrave aktualë.
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
        Pending: "bg-[#FFF8E8] text-[#C58A16]",
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

function normalizeUserStatus(user) {
    if (typeof user?.status === "string" && user.status.trim()) {
        const value = user.status.toLowerCase();

        if (value === "active") return "Active";
        if (value === "inactive") return "Inactive";
        if (value === "pending") return "Pending";
    }

    if (user?.last_login_at) return "Active";

    return "Inactive";
}

function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString();
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