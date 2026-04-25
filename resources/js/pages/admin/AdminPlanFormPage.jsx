import { useMemo, useState } from "react";

export default function AdminPlanFormPage({ extra = {}, mode = "create" }) {
    const plan = extra?.selectedPlan || {};
    const isEdit = mode === "edit";

    const [form, setForm] = useState({
        name: plan.name || "",
        slug: plan.slug || "",
        description: plan.description || "",
        price: plan.price || "",
        currency: plan.currency || "EUR",
        billing_cycle_days: plan.billing_cycle_days || 30,
        is_active: Boolean(plan.is_active ?? true),
        featuresText: Array.isArray(plan.features) ? plan.features.join("\n") : "",
        active_days: plan.limits?.active_days || plan.active_days || 30,
        active_hours: plan.limits?.active_hours || plan.active_hours || 3,
    });

    const [submitting, setSubmitting] = useState(false);

    const previewFeatures = useMemo(() => {
        return form.featuresText
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
    }, [form.featuresText]);

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
            const url = isEdit ? `/admin/plans/${plan.id}` : "/admin/plans";
            const method = isEdit ? "PUT" : "POST";

            const payload = {
                name: form.name,
                slug: form.slug,
                description: form.description,
                price: Number(form.price || 0),
                currency: form.currency || "EUR",
                billing_cycle_days: Number(form.billing_cycle_days || 30),
                is_active: Boolean(form.is_active),
                features: previewFeatures,
                limits: {
                    active_days: Number(form.active_days || form.billing_cycle_days || 30),
                    active_hours: Number(form.active_hours || 3),
                },
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": getCsrf(),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || "Save failed");
            }

            window.location.href = data.redirect || "/admin/plans";
        } catch (error) {
            console.error(error);
            alert("Error saving plan.");
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.06)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.08),transparent_24%)]" />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            {isEdit ? "Edit Plan" : "Create Plan"}
                        </span>

                        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D]">
                            {isEdit ? "Update Subscription Plan" : "Create Subscription Plan"}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-[#7C7890]">
                            Menaxho emrin, çmimin, ciklin e faturimit, features dhe limitet e planit.
                        </p>
                    </div>

                    <a
                        href="/admin/plans"
                        className="inline-flex items-center justify-center rounded-2xl border border-[#ECEAF4] bg-white px-5 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                    >
                        Back to Plans
                    </a>
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-3">
                <form
                    onSubmit={handleSubmit}
                    className="xl:col-span-2 rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.05)]"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Plan Name">
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="input-premium"
                                placeholder="Premium Plan"
                                required
                            />
                        </Field>

                        <Field label="Slug">
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => handleChange("slug", e.target.value)}
                                className="input-premium"
                                placeholder="premium-plan"
                            />
                        </Field>

                        <Field label="Price">
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => handleChange("price", e.target.value)}
                                className="input-premium"
                                placeholder="29.99"
                                required
                            />
                        </Field>

                        <Field label="Currency">
                            <select
                                value={form.currency}
                                onChange={(e) => handleChange("currency", e.target.value)}
                                className="input-premium"
                            >
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="ALL">ALL</option>
                            </select>
                        </Field>

                        <Field label="Billing Cycle Days">
                            <input
                                type="number"
                                min="1"
                                value={form.billing_cycle_days}
                                onChange={(e) => handleChange("billing_cycle_days", e.target.value)}
                                className="input-premium"
                                required
                            />
                        </Field>

                        <Field label="Status">
                            <select
                                value={form.is_active ? "active" : "inactive"}
                                onChange={(e) => handleChange("is_active", e.target.value === "active")}
                                className="input-premium"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </Field>

                        <Field label="Active Days Limit">
                            <input
                                type="number"
                                min="1"
                                value={form.active_days}
                                onChange={(e) => handleChange("active_days", e.target.value)}
                                className="input-premium"
                            />
                        </Field>

                        <Field label="Active Hours Limit">
                            <input
                                type="number"
                                min="1"
                                value={form.active_hours}
                                onChange={(e) => handleChange("active_hours", e.target.value)}
                                className="input-premium"
                            />
                        </Field>
                    </div>

                    <div className="mt-5">
                        <Field label="Description">
                            <textarea
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="input-premium min-h-[110px] resize-none"
                                placeholder="Describe what this plan includes..."
                            />
                        </Field>
                    </div>

                    <div className="mt-5">
                        <Field label="Features - one per line">
                            <textarea
                                value={form.featuresText}
                                onChange={(e) => handleChange("featuresText", e.target.value)}
                                className="input-premium min-h-[160px] resize-none"
                                placeholder={`Unlimited media uploads\nPremium templates\nEvent analytics\nPriority support`}
                            />
                        </Field>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Plan"}
                        </button>

                        <a
                            href="/admin/plans"
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-5 py-3 text-sm font-semibold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Cancel
                        </a>
                    </div>
                </form>

                <aside className="space-y-6">
                    <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Preview
                        </p>

                        <h2 className="mt-4 text-2xl font-black text-[#1F1B2D]">
                            {form.name || "Plan Name"}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#7C7890]">
                            {form.description || "Plan description will appear here."}
                        </p>

                        <div className="mt-5 text-4xl font-black text-[#7B61FF]">
                            {formatCurrency(form.price, form.currency)}
                        </div>

                        <p className="mt-1 text-sm text-[#7C7890]">
                            Every {form.billing_cycle_days || 30} days
                        </p>

                        <div className="mt-5">
                            <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                    form.is_active
                                        ? "bg-[#EAFBF1] text-[#1F8F55]"
                                        : "bg-[#FFF1F3] text-[#D14D72]"
                                }`}
                            >
                                {form.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_40px_rgba(123,97,255,0.05)]">
                        <h3 className="font-semibold text-[#1F1B2D]">Features Preview</h3>

                        <div className="mt-4 space-y-3">
                            {previewFeatures.length > 0 ? (
                                previewFeatures.map((feature, index) => (
                                    <div
                                        key={`${feature}-${index}`}
                                        className="flex items-start gap-3 rounded-2xl border border-[#F1EFF8] bg-[#FCFBFF] px-4 py-3"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7B61FF]/10 text-xs font-bold text-[#7B61FF]">
                                            ✓
                                        </span>
                                        <span className="text-sm text-[#5F5A72]">{feature}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-[#8A86A3]">
                                    No features added yet.
                                </p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            <style>{`
                .input-premium {
                    width: 100%;
                    border-radius: 1rem;
                    border: 1px solid #ECEAF4;
                    background: #FCFBFF;
                    padding: 0.85rem 1rem;
                    font-size: 0.875rem;
                    color: #1F1B2D;
                    outline: none;
                    transition: all 0.2s ease;
                }

                .input-premium:focus {
                    border-color: #7B61FF;
                    background: #FFFFFF;
                    box-shadow: 0 0 0 3px rgba(123, 97, 255, 0.10);
                }
            `}</style>
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

function formatCurrency(price, currency = "EUR") {
    const value = Number(price || 0).toFixed(2);

    if (currency === "EUR") return `€${value}`;
    return `${currency} ${value}`;
}

function getCsrf() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}