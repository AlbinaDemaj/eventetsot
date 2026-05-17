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
        featuresText: Array.isArray(plan.features) ? plan.features.join("\n") : parseFeaturesText(plan.features),
        active_days: plan.limits?.active_days || plan.active_days || 30,
        active_hours: plan.limits?.active_hours || plan.active_hours || 3,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const previewFeatures = useMemo(() => {
        return form.featuresText
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
    }, [form.featuresText]);

    const handleChange = (field, value) => {
        setForm((prev) => {
            const next = { ...prev, [field]: value };

            if (field === "name" && !isEdit) {
                next.slug = makeSlug(value);
            }

            return next;
        });

        setErrors((prev) => ({
            ...prev,
            [field]: null,
            general: null,
        }));
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.name.trim()) nextErrors.name = "Emri i planit është i detyrueshëm.";
        if (!form.slug.trim()) nextErrors.slug = "Slug është i detyrueshëm.";
        if (!form.price || Number(form.price) < 0) nextErrors.price = "Vendos një çmim të vlefshëm.";
        if (!form.billing_cycle_days || Number(form.billing_cycle_days) < 1) {
            nextErrors.billing_cycle_days = "Cikli duhet të jetë të paktën 1 ditë.";
        }
        if (!form.active_days || Number(form.active_days) < 1) {
            nextErrors.active_days = "Ditët aktive duhet të jenë të paktën 1.";
        }
        if (!form.active_hours || Number(form.active_hours) < 1) {
            nextErrors.active_hours = "Orët aktive duhet të jenë të paktën 1.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);

        try {
            const url = isEdit ? `/admin/plans/${plan.id}` : "/admin/plans";
            const method = isEdit ? "PUT" : "POST";

            const payload = {
                name: form.name.trim(),
                slug: form.slug.trim(),
                description: form.description.trim(),
                price: Number(form.price || 0),
                currency: form.currency || "EUR",
                billing_cycle_days: Number(form.billing_cycle_days || 30),
                is_active: Boolean(form.is_active),
                features: previewFeatures,
                limits: {
                    active_days: Number(form.active_days || 30),
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

            const data = await safeJson(response);

            if (!response.ok) {
                if (data?.errors) {
                    setErrors(flattenLaravelErrors(data.errors));
                } else {
                    setErrors({
                        general: data?.message || "Ruajtja dështoi. Kontrollo të dhënat dhe provo përsëri.",
                    });
                }

                setSubmitting(false);
                return;
            }

            window.location.href = data?.redirect || "/admin/plans";
        } catch (error) {
            console.error(error);
            setErrors({
                general: "Ndodhi një gabim gjatë ruajtjes së planit.",
            });
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-[#ECEAF4] bg-white p-6 shadow-[0_18px_55px_rgba(32,24,64,0.07)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.12),transparent_25%)]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7B61FF]">
                            {isEdit ? "Ndrysho planin" : "Plan i ri"}
                        </span>

                        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] md:text-4xl">
                            {isEdit ? "Përditëso planin e abonimit" : "Krijo plan abonimi"}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            Menaxho emrin, çmimin, ciklin e faturimit, statusin, veçoritë
                            dhe limitet që do të ketë përdoruesi në këtë paketë.
                        </p>
                    </div>

                    <a
                        href="/admin/plans"
                        className="inline-flex items-center justify-center rounded-2xl border border-[#E6E0FF] bg-white px-5 py-3 text-sm font-bold text-[#7B61FF] transition hover:bg-[#F8F5FF]"
                    >
                        Kthehu te planet
                    </a>
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)]"
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-black text-[#1F1B2D]">
                            Të dhënat e planit
                        </h2>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Plotëso informacionin kryesor për paketën e abonimit.
                        </p>
                    </div>

                    {errors.general ? (
                        <div className="mb-5 rounded-2xl border border-[#FFE3E8] bg-[#FFF1F3] px-4 py-3 text-sm font-bold text-[#D14D72]">
                            {errors.general}
                        </div>
                    ) : null}

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Emri i planit" error={errors.name} required>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className={inputClass(errors.name)}
                                placeholder="p.sh. Premium"
                            />
                        </Field>

                        <Field label="Slug" error={errors.slug} required>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => handleChange("slug", makeSlug(e.target.value))}
                                className={inputClass(errors.slug)}
                                placeholder="premium"
                            />
                        </Field>

                        <Field label="Çmimi" error={errors.price} required>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => handleChange("price", e.target.value)}
                                className={inputClass(errors.price)}
                                placeholder="29.99"
                            />
                        </Field>

                        <Field label="Valuta">
                            <select
                                value={form.currency}
                                onChange={(e) => handleChange("currency", e.target.value)}
                                className={inputClass()}
                            >
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="ALL">ALL</option>
                            </select>
                        </Field>

                        <Field label="Cikli i faturimit" error={errors.billing_cycle_days} required>
                            <select
                                value={String(form.billing_cycle_days)}
                                onChange={(e) => handleChange("billing_cycle_days", e.target.value)}
                                className={inputClass(errors.billing_cycle_days)}
                            >
                                <option value="30">Mujor - 30 ditë</option>
                                <option value="90">3 muaj - 90 ditë</option>
                                <option value="180">6 muaj - 180 ditë</option>
                                <option value="365">Vjetor - 365 ditë</option>
                            </select>
                        </Field>

                        <Field label="Statusi">
                            <select
                                value={form.is_active ? "active" : "inactive"}
                                onChange={(e) => handleChange("is_active", e.target.value === "active")}
                                className={inputClass()}
                            >
                                <option value="active">Aktiv</option>
                                <option value="inactive">Jo aktiv</option>
                            </select>
                        </Field>

                        <Field label="Ditë aktive" error={errors.active_days} required>
                            <input
                                type="number"
                                min="1"
                                value={form.active_days}
                                onChange={(e) => handleChange("active_days", e.target.value)}
                                className={inputClass(errors.active_days)}
                            />
                        </Field>

                        <Field label="Orë aktive" error={errors.active_hours} required>
                            <input
                                type="number"
                                min="1"
                                value={form.active_hours}
                                onChange={(e) => handleChange("active_hours", e.target.value)}
                                className={inputClass(errors.active_hours)}
                            />
                        </Field>
                    </div>

                    <div className="mt-5">
                        <Field label="Përshkrimi">
                            <textarea
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className={`${inputClass()} min-h-[120px] resize-none`}
                                placeholder="Përshkruaj çfarë përfshin ky plan..."
                            />
                        </Field>
                    </div>

                    <div className="mt-5">
                        <Field
                            label="Veçoritë e planit"
                            help="Shkruaj çdo veçori në rresht të veçantë."
                        >
                            <textarea
                                value={form.featuresText}
                                onChange={(e) => handleChange("featuresText", e.target.value)}
                                className={`${inputClass()} min-h-[170px] resize-none`}
                                placeholder={`Ngarkim foto dhe video\nShabllone premium\nStatistika të eventit\nMbështetje prioritare`}
                            />
                        </Field>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-2xl bg-[#7B61FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#7B61FF]/25 transition hover:bg-[#6A4DFF] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {submitting
                                ? "Duke ruajtur..."
                                : isEdit
                                ? "Ruaj ndryshimet"
                                : "Krijo planin"}
                        </button>

                        <a
                            href="/admin/plans"
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-6 py-3 text-sm font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Anulo
                        </a>
                    </div>
                </form>

                <aside className="space-y-5">
                    <div className="relative overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.12),transparent_32%)]" />

                        <div className="relative">
                            <div className="flex items-center justify-between gap-4">
                                <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-xs font-black text-[#7B61FF]">
                                    Preview
                                </span>

                                <StatusBadge active={form.is_active} />
                            </div>

                            <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[#1F1B2D]">
                                {form.name || "Emri i planit"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#7C7890]">
                                {form.description || "Përshkrimi i planit do të shfaqet këtu."}
                            </p>

                            <div className="mt-6 rounded-[24px] border border-[#F1EFF8] bg-[#FCFBFF] p-5">
                                <div className="text-4xl font-black tracking-[-0.04em] text-[#7B61FF]">
                                    {formatCurrency(form.price, form.currency)}
                                </div>
                                <p className="mt-1 text-sm font-medium text-[#7C7890]">
                                    {formatBillingCycle(form.billing_cycle_days)}
                                </p>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <MiniInfo label="Ditë aktive" value={form.active_days || 30} />
                                <MiniInfo label="Orë aktive" value={form.active_hours || 3} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
                        <h3 className="text-base font-black text-[#1F1B2D]">
                            Veçoritë
                        </h3>

                        <div className="mt-4 space-y-3">
                            {previewFeatures.length > 0 ? (
                                previewFeatures.map((feature, index) => (
                                    <div
                                        key={`${feature}-${index}`}
                                        className="flex items-start gap-3 rounded-2xl border border-[#F1EFF8] bg-[#FCFBFF] px-4 py-3"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7B61FF]" />
                                        <span className="text-sm leading-6 text-[#5F5A72]">
                                            {feature}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm leading-6 text-[#8A86A3]">
                                    Nuk ka veçori të shtuara ende.
                                </p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Field({ label, children, error, help, required = false }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-[#1F1B2D]">
                {label}
                {required ? <span className="text-[#D14D72]"> *</span> : null}
            </label>

            {children}

            {help ? <p className="mt-2 text-xs leading-5 text-[#8A86A3]">{help}</p> : null}
            {error ? <p className="mt-2 text-xs font-bold text-[#D14D72]">{error}</p> : null}
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

function inputClass(hasError) {
    return `w-full rounded-2xl border ${
        hasError ? "border-[#FFD1DC] bg-[#FFF8FA]" : "border-[#ECEAF4] bg-[#FCFBFF]"
    } px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition placeholder:text-[#AAA6B8] focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]`;
}

function parseFeaturesText(features) {
    if (Array.isArray(features)) return features.join("\n");

    if (typeof features === "string") {
        try {
            const parsed = JSON.parse(features);
            return Array.isArray(parsed) ? parsed.join("\n") : features;
        } catch {
            return features;
        }
    }

    return "";
}

function makeSlug(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/ë/g, "e")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatCurrency(price, currency = "EUR") {
    const value = Number(price || 0).toFixed(2);

    if (currency === "EUR") return `€${value}`;
    return `${currency} ${value}`;
}

function formatBillingCycle(days) {
    const value = Number(days || 30);

    if (value === 30) return "Pagesë mujore";
    if (value === 90) return "Pagesë çdo 3 muaj";
    if (value === 180) return "Pagesë çdo 6 muaj";
    if (value === 365) return "Pagesë vjetore";

    return `Çdo ${value} ditë`;
}

function flattenLaravelErrors(errors = {}) {
    return Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] : value,
        ])
    );
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