export default function AdminUserShowPage({ extra = {} }) {
    const selectedUser = extra?.selectedUser || null;

    const handleDelete = async () => {
        if (!selectedUser) return;
        const confirmed = window.confirm(`Delete user "${selectedUser.name}"?`);
        if (!confirmed) return;

        try {
            const response = await fetch(`/admin/users/${selectedUser.id}`, {
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

            window.location.href = data.redirect || "/admin/users";
        } catch (error) {
            console.error(error);
            alert("Error deleting user.");
        }
    };

    const handleToggleStatus = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`/admin/users/${selectedUser.id}/toggle-status`, {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            if (!response.ok) {
                throw new Error("Status update failed");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error updating user status.");
        }
    };

    if (!selectedUser) {
        return (
            <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-10 text-center">
                User not found.
            </div>
        );
    }

    const status = normalizeUserStatus(selectedUser);

    return (
        <div className="space-y-8">
            <section className="rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7B61FF]/10 to-[#A78BFA]/10 text-xl font-bold text-[#7B61FF]">
                            {getInitials(selectedUser.name)}
                        </div>

                        <div>
                            <p className="text-sm text-[#7C7890]">User Details</p>
                            <h1 className="text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                                {selectedUser.name}
                            </h1>
                            <p className="mt-1 text-sm text-[#7C7890]">{selectedUser.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <a
                            href={`/admin/users/${selectedUser.id}/edit`}
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-4 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Edit User
                        </a>

                        <button
                            type="button"
                            onClick={handleToggleStatus}
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-4 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#52B788] hover:text-[#2E9B67]"
                        >
                            {status === "Active" ? "Deactivate" : "Activate"}
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="rounded-2xl border border-[#FFE3E8] bg-[#FFF1F3] px-4 py-3 text-sm font-semibold text-[#D14D72] transition hover:bg-[#FFE4EA]"
                        >
                            Delete User
                        </button>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <InfoCard title="Basic Information">
                    <InfoRow label="Full Name" value={selectedUser.name} />
                    <InfoRow label="Email" value={selectedUser.email} />
                    <InfoRow label="Status" value={status} />
                    <InfoRow
                        label="Plan"
                        value={selectedUser.subscription_plan_name || selectedUser.plan_name || "No Plan"}
                    />
                </InfoCard>

                <InfoCard title="Account Timeline">
                    <InfoRow label="Created At" value={formatDateTime(selectedUser.created_at)} />
                    <InfoRow label="Updated At" value={formatDateTime(selectedUser.updated_at)} />
                    <InfoRow label="Last Login" value={formatDateTime(selectedUser.last_login_at)} />
                </InfoCard>
            </section>
        </div>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
            <h2 className="text-lg font-semibold text-[#1F1B2D]">{title}</h2>
            <div className="mt-5 space-y-4">{children}</div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#F1EFF8] bg-[#FCFBFF] px-4 py-3">
            <span className="text-sm font-medium text-[#7C7890]">{label}</span>
            <span className="text-sm font-semibold text-[#1F1B2D]">{value || "-"}</span>
        </div>
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

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}