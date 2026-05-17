import { useMemo, useState } from "react";

export default function AdminUserFormPage({ extra = {}, mode = "create" }) {
    const selectedUser = extra?.selectedUser || null;
    const isEdit = mode === "edit";

    const [form, setForm] = useState({
        name: selectedUser?.name || "",
        email: selectedUser?.email || "",
        password: "",
        status: selectedUser?.status || "active",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const pageTitle = isEdit ? "Përditëso përdoruesin" : "Krijo përdorues të ri";
    const pageDescription = isEdit
        ? "Ndrysho të dhënat kryesore të llogarisë, statusin dhe fjalëkalimin nëse është e nevojshme."
        : "Shto një përdorues të ri në platformë dhe cakto statusin fillestar të llogarisë.";

    const passwordHelp = useMemo(() => {
        if (isEdit) {
            return "Lëre bosh nëse nuk dëshiron ta ndryshosh fjalëkalimin aktual.";
        }

        return "Fjalëkalimi duhet të jetë i sigurt dhe i lehtë për t’u menaxhuar nga përdoruesi.";
    }, [isEdit]);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: null,
            general: null,
        }));
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Emri i plotë është i detyrueshëm.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email-i është i detyrueshëm.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = "Shkruaj një email të vlefshëm.";
        }

        if (!isEdit && !form.password.trim()) {
            nextErrors.password = "Fjalëkalimi është i detyrueshëm për përdorues të rinj.";
        }

        if (form.password && form.password.length < 6) {
            nextErrors.password = "Fjalëkalimi duhet të ketë të paktën 6 karaktere.";
        }

        if (!["active", "inactive", "pending"].includes(form.status)) {
            nextErrors.status = "Zgjidh një status të vlefshëm.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);

        try {
            const url = isEdit ? `/admin/users/${selectedUser.id}` : "/admin/users";
            const method = isEdit ? "PUT" : "POST";

            const payload = {
                name: form.name.trim(),
                email: form.email.trim(),
                status: form.status,
            };

            if (form.password.trim()) {
                payload.password = form.password;
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

            const data = await safeJson(response);

            if (!response.ok) {
                if (data?.errors) {
                    setErrors(flattenLaravelErrors(data.errors));
                } else {
                    setErrors({
                        general:
                            data?.message ||
                            "Ruajtja dështoi. Kontrollo të dhënat dhe provo përsëri.",
                    });
                }

                setSubmitting(false);
                return;
            }

            window.location.href = data?.redirect || "/admin/users";
        } catch (error) {
            console.error(error);

            setErrors({
                general: "Ndodhi një gabim gjatë ruajtjes së përdoruesit.",
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
                            {isEdit ? "Ndryshim llogarie" : "Llogari e re"}
                        </span>

                        <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] md:text-4xl">
                            {pageTitle}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            {pageDescription}
                        </p>
                    </div>

                    <a
                        href="/admin/users"
                        className="inline-flex items-center justify-center rounded-2xl border border-[#E6E0FF] bg-white px-5 py-3 text-sm font-bold text-[#7B61FF] transition hover:bg-[#F8F5FF]"
                    >
                        Kthehu te përdoruesit
                    </a>
                </div>
            </section>

            <form
                onSubmit={handleSubmit}
                className="grid gap-6 xl:grid-cols-[1fr_360px]"
            >
                <section className="rounded-[30px] border border-[#ECEAF4] bg-white p-6 shadow-[0_14px_44px_rgba(32,24,64,0.06)]">
                    <div className="mb-6">
                        <h2 className="text-lg font-black text-[#1F1B2D]">
                            Të dhënat e përdoruesit
                        </h2>
                        <p className="mt-1 text-sm text-[#7C7890]">
                            Plotëso informacionin kryesor për këtë llogari.
                        </p>
                    </div>

                    {errors.general ? (
                        <div className="mb-5 rounded-2xl border border-[#FFE3E8] bg-[#FFF1F3] px-4 py-3 text-sm font-semibold text-[#D14D72]">
                            {errors.general}
                        </div>
                    ) : null}

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Emri i plotë" error={errors.name} required>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="p.sh. Albina Krasniqi"
                                className={inputClass(errors.name)}
                            />
                        </Field>

                        <Field label="Adresa e email-it" error={errors.email} required>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                placeholder="p.sh. user@email.com"
                                className={inputClass(errors.email)}
                            />
                        </Field>

                        <Field
                            label={isEdit ? "Fjalëkalim i ri" : "Fjalëkalimi"}
                            error={errors.password}
                            help={passwordHelp}
                            required={!isEdit}
                        >
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) =>
                                        handleChange("password", e.target.value)
                                    }
                                    placeholder={
                                        isEdit
                                            ? "Lëre bosh për ta ruajtur aktualin"
                                            : "Shkruaj fjalëkalimin"
                                    }
                                    className={`${inputClass(errors.password)} pr-24`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-1.5 text-xs font-bold text-[#7B61FF] transition hover:bg-[#F1ECFF]"
                                >
                                    {showPassword ? "Fshihe" : "Shfaqe"}
                                </button>
                            </div>
                        </Field>

                        <Field label="Statusi i llogarisë" error={errors.status} required>
                            <select
                                value={form.status}
                                onChange={(e) => handleChange("status", e.target.value)}
                                className={inputClass(errors.status)}
                            >
                                <option value="active">Aktiv</option>
                                <option value="inactive">Jo aktiv</option>
                                <option value="pending">Në pritje</option>
                            </select>
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
                                : "Krijo përdoruesin"}
                        </button>

                        <a
                            href={
                                isEdit && selectedUser?.id
                                    ? `/admin/users/${selectedUser.id}`
                                    : "/admin/users"
                            }
                            className="rounded-2xl border border-[#ECEAF4] bg-white px-6 py-3 text-sm font-bold text-[#5F5A72] transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
                        >
                            Anulo
                        </a>
                    </div>
                </section>

                <aside className="space-y-4">
                    <InfoCard
                        title="Kontroll i shpejtë"
                        items={[
                            "Emri dhe email-i duhet të jenë të sakta.",
                            "Për përdorues të rinj, fjalëkalimi është i detyrueshëm.",
                            "Në editim, fjalëkalimi ndryshohet vetëm nëse e plotëson fushën.",
                        ]}
                    />

                    <div className="rounded-[28px] border border-[#ECEAF4] bg-[#FCFBFF] p-5">
                        <p className="text-sm font-black text-[#1F1B2D]">
                            Statusi aktual
                        </p>

                        <div className="mt-4">
                            <StatusPreview status={form.status} />
                        </div>

                        <p className="mt-4 text-sm leading-6 text-[#7C7890]">
                            Statusi përcakton nëse përdoruesi mund të jetë aktiv,
                            jo aktiv ose në pritje për verifikim.
                        </p>
                    </div>
                </aside>
            </form>
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

            {help ? (
                <p className="mt-2 text-xs leading-5 text-[#8A86A3]">{help}</p>
            ) : null}

            {error ? (
                <p className="mt-2 text-xs font-semibold text-[#D14D72]">{error}</p>
            ) : null}
        </div>
    );
}

function InfoCard({ title, items = [] }) {
    return (
        <div className="rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_14px_40px_rgba(32,24,64,0.05)]">
            <h3 className="text-sm font-black text-[#1F1B2D]">{title}</h3>

            <div className="mt-4 space-y-3">
                {items.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-[#7C7890]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7B61FF]" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatusPreview({ status }) {
    const labels = {
        active: "Aktiv",
        inactive: "Jo aktiv",
        pending: "Në pritje",
    };

    const styles = {
        active: "bg-[#EAFBF1] text-[#1F8F55] ring-[#BFEBD2]",
        inactive: "bg-[#FFF1F3] text-[#D14D72] ring-[#FFD1DC]",
        pending: "bg-[#FFF8E8] text-[#C58A16] ring-[#FFE8A8]",
    };

    return (
        <span
            className={`inline-flex rounded-full px-4 py-2 text-xs font-black ring-1 ${
                styles[status] || styles.pending
            }`}
        >
            {labels[status] || "Në pritje"}
        </span>
    );
}

function inputClass(hasError) {
    return `w-full rounded-2xl border ${
        hasError ? "border-[#FFD1DC] bg-[#FFF8FA]" : "border-[#ECEAF4] bg-[#FCFBFF]"
    } px-4 py-3 text-sm font-medium text-[#1F1B2D] outline-none transition placeholder:text-[#AAA6B8] focus:border-[#7B61FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(123,97,255,0.10)]`;
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

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
}