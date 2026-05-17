import { useEffect, useMemo, useState } from "react";

export default function UserSettingsPage({ event, selectedEvent, extra = {} }) {
    const activeEvent = event || selectedEvent;

    const subscription = {
        name: extra?.subscription?.name || "Plani falas",
        used_uploads: Number(extra?.subscription?.used_uploads ?? 0),
        max_uploads: Number(extra?.subscription?.max_uploads ?? 100),
        is_premium: Boolean(extra?.subscription?.is_premium ?? false),
        price: Number(extra?.subscription?.price ?? 0),
        status: extra?.subscription?.status || "joaktiv",
        payment_method: extra?.subscription?.payment_method || "falas",
    };

    const initialForm = useMemo(
        () => ({
            name: activeEvent?.name || "",
            event_date: activeEvent?.event_date || "",
            locale: activeEvent?.locale || "sq",
            note: activeEvent?.note || "",
            code: activeEvent?.code || "",
            logo: null,
        }),
        [activeEvent]
    );

    const [form, setForm] = useState(initialForm);
    const [savingField, setSavingField] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const csrfToken =
        document.querySelector('meta[name="csrf-token"]')?.content || "";

    useEffect(() => {
        setForm(initialForm);
    }, [initialForm]);

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const clearAlerts = () => {
        setMessage("");
        setError("");
    };

    const saveField = async (field) => {
        if (!activeEvent?.id) return;

        setSavingField(field);
        clearAlerts();

        try {
            const formData = new FormData();
            formData.append("field", field);

            if (field === "logo") {
                if (!form.logo) {
                    setError("Ju lutem zgjidhni një logo për ta ngarkuar.");
                    setSavingField("");
                    return;
                }

                formData.append("value", form.logo);
            } else {
                formData.append("value", form[field] ?? "");
            }

            const response = await fetch("/user/settings", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(data?.message || "Ruajtja dështoi.");
            }

            setMessage(data?.message || "Ndryshimi u ruajt me sukses.");

            if (field === "logo") {
                setForm((prev) => ({
                    ...prev,
                    logo: null,
                }));
            }
        } catch (err) {
            setError(err.message || "Diçka shkoi gabim.");
        } finally {
            setSavingField("");
        }
    };

    const saveCode = async () => {
        if (!activeEvent?.id) return;

        setSavingField("code");
        clearAlerts();

        try {
            const formData = new FormData();
            formData.append("code", form.code);

            const response = await fetch(`/user/settings-code/${activeEvent.id}`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(data?.message || "Kodi nuk u ruajt.");
            }

            setMessage(data?.message || "Kodi i eventit u përditësua me sukses.");
            window.location.reload();
        } catch (err) {
            setError(err.message || "Diçka shkoi gabim.");
        } finally {
            setSavingField("");
        }
    };

    const goToPricing = () => {
        window.location.href = "/user/settings?page=pricing";
    };

    const usagePercent =
        subscription.max_uploads > 0
            ? Math.min(
                  100,
                  Math.round((subscription.used_uploads / subscription.max_uploads) * 100)
              )
            : 0;

    if (!activeEvent) {
        return (
            <div className="rounded-[34px] border border-dashed border-[#DDD7EE] bg-white p-10 text-center shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#EEE8FF] bg-white text-3xl font-black text-[#7B61FF] shadow-sm">
                    +
                </div>

                <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
                    Nuk ka event aktiv
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                    Zgjidh ose krijo një event për të ndryshuar cilësimet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(123,97,255,0.16),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(110,195,244,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#faf8ff_52%,#f8fbff_100%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <p className="inline-flex rounded-full border border-[#E8E1FF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7B61FF] shadow-sm">
                            Cilësimet e eventit
                        </p>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                            Personalizo eventin dhe menaxho planin tënd.
                        </h2>

                        <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[15px]">
                            Përditëso emrin, datën, gjuhën, kodin, logon dhe detajet e tjera të
                            eventit. Nga kjo faqe mund të kontrollosh edhe planin dhe limitin e
                            ngarkimeve.
                        </p>
                    </div>

                    <div className="rounded-[26px] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Event aktiv
                        </p>

                        <p className="mt-2 text-base font-black text-slate-950">
                            {activeEvent.name || "Pa emër"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {activeEvent.code ? `Kodi: ${activeEvent.code}` : "Pa kod eventi"}
                        </p>
                    </div>
                </div>

                {(message || error) && (
                    <div
                        className={`relative mt-6 rounded-2xl px-4 py-3 text-sm font-bold ${
                            error
                                ? "border border-red-200 bg-red-50 text-red-700"
                                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        }`}
                    >
                        {error || message}
                    </div>
                )}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                    <SettingsCard eyebrow="Informacion bazë" title="Detajet kryesore">
                        <div className="space-y-5">
                            <FieldGroup
                                label="Emri i eventit"
                                value={form.name}
                                onChange={(value) => handleChange("name", value)}
                                onSave={() => saveField("name")}
                                saving={savingField === "name"}
                            />

                            <FieldGroup
                                label="Data e eventit"
                                type="date"
                                value={form.event_date || ""}
                                onChange={(value) => handleChange("event_date", value)}
                                onSave={() => saveField("event_date")}
                                saving={savingField === "event_date"}
                            />

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Gjuha e eventit
                                </label>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <select
                                        value={form.locale}
                                        onChange={(e) => handleChange("locale", e.target.value)}
                                        className="flex-1 rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                                    >
                                        <option value="sq">Shqip</option>
                                        <option value="en">Anglisht</option>
                                    </select>

                                    <SaveButton
                                        onClick={() => saveField("locale")}
                                        loading={savingField === "locale"}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Shënim për eventin
                                </label>

                                <textarea
                                    value={form.note}
                                    onChange={(e) => handleChange("note", e.target.value)}
                                    rows={5}
                                    placeholder="Shkruaj një shënim të shkurtër për eventin..."
                                    className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                                />

                                <button
                                    onClick={() => saveField("note")}
                                    disabled={savingField === "note"}
                                    className="mt-3 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(123,97,255,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {savingField === "note"
                                        ? "Duke ruajtur..."
                                        : "Ruaj shënimin"}
                                </button>
                            </div>
                        </div>
                    </SettingsCard>

                    <SettingsCard eyebrow="Branding dhe qasje" title="Identiteti i eventit">
                        <div className="space-y-5">
                            <FieldGroup
                                label="Kodi i eventit"
                                value={form.code}
                                onChange={(value) => handleChange("code", value)}
                                onSave={saveCode}
                                saving={savingField === "code"}
                            />

                            <div>
                                <label className="mb-2 block text-sm font-bold text-slate-700">
                                    Logo e eventit
                                </label>

                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleChange("logo", e.target.files?.[0] || null)
                                        }
                                        className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-[#7B61FF] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#684DFF]"
                                    />

                                    <button
                                        onClick={() => saveField("logo")}
                                        disabled={savingField === "logo"}
                                        className="rounded-2xl border border-[#E6E1F0] bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#D8D0FF] hover:bg-[#FAF8FF] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {savingField === "logo"
                                            ? "Duke ngarkuar..."
                                            : "Ngarko logon"}
                                    </button>
                                </div>
                            </div>

                            {activeEvent?.qr_code && (
                                <div className="rounded-[28px] border border-[#F1ECFF] bg-[#FCFBFF] p-5 text-center">
                                    <p className="text-sm font-black text-slate-950">
                                        Kodi QR i eventit
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Përdore për ta ndarë eventin me mysafirët.
                                    </p>

                                    <img
                                        src={activeEvent.qr_code}
                                        alt="Kodi QR i eventit"
                                        className="mx-auto mt-5 w-full max-w-[180px]"
                                    />
                                </div>
                            )}
                        </div>
                    </SettingsCard>
                </div>

                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[34px] border border-[#E8DFFF] bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Plani aktual
                                </p>

                                <h3 className="mt-2 text-xl font-black text-slate-950">
                                    {subscription.name}
                                </h3>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-black ${
                                    subscription.is_premium
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-[#F3EEFF] text-[#7B61FF]"
                                }`}
                            >
                                {subscription.is_premium ? "Premium" : "Falas"}
                            </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <PlanInfo label="Statusi" value={subscription.status} />
                            <PlanInfo label="Pagesa" value={subscription.payment_method} />
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-500">
                                    Ngarkime të përdorura
                                </span>

                                <span className="font-black text-slate-950">
                                    {subscription.used_uploads} / {subscription.max_uploads}
                                </span>
                            </div>

                            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#EFEAFE]">
                                <div
                                    className="h-full rounded-full bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)]"
                                    style={{ width: `${usagePercent}%` }}
                                />
                            </div>
                        </div>

                        {!subscription.is_premium ? (
                            <button
                                onClick={goToPricing}
                                className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3.5 text-sm font-black text-white shadow-[0_16px_36px_rgba(123,97,255,0.24)] transition hover:-translate-y-0.5"
                            >
                                Përmirëso në Premium
                            </button>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                                Plani juaj Premium është aktiv.
                            </div>
                        )}
                    </div>

                    <SettingsCard eyebrow="Përfitimet Premium" title="Çfarë fiton me Premium">
                        <div className="space-y-3">
                            {[
                                "Më shumë hapësirë për foto dhe video",
                                "Shkarkim i plotë i medias në format ZIP",
                                "Branding më profesional për eventin",
                                "Përvojë më e pastër për mysafirët",
                                "Më shumë kontroll dhe fleksibilitet",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl border border-[#F1ECFF] bg-[#FCFBFF] px-4 py-3"
                                >
                                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDE7FF] text-xs font-black text-[#7B61FF]">
                                        ✓
                                    </span>

                                    <p className="text-sm font-semibold leading-6 text-slate-700">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SettingsCard>

                    <div className="rounded-[34px] border border-[#E8DFFF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] p-6 text-white shadow-[0_22px_55px_rgba(123,97,255,0.24)]">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                            Ofertë speciale
                        </p>

                        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
                            Jepi eventit pamje më premium
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-white/90">
                            Aktivizo më shumë funksione, më shumë hapësirë dhe një eksperiencë më
                            profesionale për mysafirët.
                        </p>

                        <button
                            onClick={goToPricing}
                            className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#7B61FF] transition hover:bg-white/90"
                        >
                            Shiko planet
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SettingsCard({ eyebrow, title, children }) {
    return (
        <div className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                {eyebrow}
            </p>

            <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-950">
                {title}
            </h3>

            <div className="mt-6">{children}</div>
        </div>
    );
}

function FieldGroup({ label, type = "text", value, onChange, onSave, saving }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
                {label}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                />

                <SaveButton onClick={onSave} loading={saving} />
            </div>
        </div>
    );
}

function SaveButton({ onClick, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(123,97,255,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? "Duke ruajtur..." : "Ruaj"}
        </button>
    );
}

function PlanInfo({ label, value }) {
    return (
        <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3 ring-1 ring-[#F1ECFF]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-black text-slate-950">
                {value}
            </p>
        </div>
    );
}