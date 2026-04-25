import { useState } from "react";

export default function AdminUserFormPage({ extra = {}, mode = "create" }) {
    const selectedUser = extra?.selectedUser || null;
    const isEdit = mode === "edit";

    const [form, setForm] = useState({
        name: selectedUser?.name || "",
        email: selectedUser?.email || "",
        password: "",
        status: selectedUser?.status || "active",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const url = isEdit
                ? `/admin/users/${selectedUser.id}`
                : `/admin/users`;

            const method = isEdit ? "PUT" : "POST";

            const payload = {
                name: form.name,
                email: form.email,
                status: form.status,
            };

            if (form.password) {
                payload.password = form.password;
            }

            if (!isEdit && !payload.password) {
                alert("Password is required for new users.");
                setSubmitting(false);
                return;
            }

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Save failed");
            }

            window.location.href = data.redirect || "/admin/users";
        } catch (error) {
            console.error(error);
            alert("Error saving user.");
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <section className="rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            {isEdit ? "Edit User" : "Create User"}
                        </span>

                        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                            {isEdit ? "Update User Profile" : "Create New User"}
                        </h1>

                        <p className="mt-2 text-sm text-[#7C7890]">
                            {isEdit
                                ? "Edit account information, email, password and status."
                                : "Add a new user account to the platform."}
                        </p>
                    </div>

                    <a
                        href="/admin/users"
                        className="inline-flex items-center justify-center rounded-2xl border border-[#ECEAF4] bg-white px-5 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                    >
                        Back to Users
                    </a>
                </div>
            </section>

            <form
                onSubmit={handleSubmit}
                className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.05)]"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full Name">
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:bg-white"
                            required
                        />
                    </Field>

                    <Field label="Email Address">
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:bg-white"
                            required
                        />
                    </Field>

                    <Field label={isEdit ? "New Password (optional)" : "Password"}>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:bg-white"
                            placeholder={isEdit ? "Leave blank to keep current password" : ""}
                        />
                    </Field>

                    <Field label="Status">
                        <select
                            value={form.status}
                            onChange={(e) => handleChange("status", e.target.value)}
                            className="w-full rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:bg-white"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                    </Field>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {submitting
                            ? "Saving..."
                            : isEdit
                            ? "Save Changes"
                            : "Create User"}
                    </button>

                    {isEdit && selectedUser?.id ? (
                        <a
                            href={`/admin/users/${selectedUser.id}`}
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-5 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Cancel
                        </a>
                    ) : (
                        <a
                            href="/admin/users"
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-5 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Cancel
                        </a>
                    )}
                </div>
            </form>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-[#1F1B2D]">
                {label}
            </label>
            {children}
        </div>
    );
}

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}