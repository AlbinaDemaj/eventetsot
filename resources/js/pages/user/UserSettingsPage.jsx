import { useEffect, useMemo, useState } from "react";

export default function UserSettingsPage({ event, selectedEvent, extra = {} }) {
    const activeEvent = event || selectedEvent;

    const subscription = {
        name: extra?.subscription?.name || "Free Plan",
        used_uploads: Number(extra?.subscription?.used_uploads ?? 0),
        max_uploads: Number(extra?.subscription?.max_uploads ?? 100),
        is_premium: Boolean(extra?.subscription?.is_premium ?? false),
        price: Number(extra?.subscription?.price ?? 0),
        status: extra?.subscription?.status || "inactive",
        payment_method: extra?.subscription?.payment_method || "free",
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
                    setError("Ju lutem zgjidhni një logo.");
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
            <div className="rounded-[30px] border border-[#ECE8F8] bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl">
                    ⚙️
                </div>

                <h3 className="mt-5 text-2xl font-black text-slate-900">
                    Nuk ka event aktiv
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                    Zgjidh ose krijo një event për të ndryshuar cilësimet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Settings
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">
                            Menaxhimi i eventit
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            Përditëso detajet e eventit dhe menaxho planin tënd për më
                            shumë funksione, storage dhe eksperiencë më profesionale.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#EEE8FF] bg-[#FAF8FF] px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Event aktiv
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {activeEvent.name || "Pa emër"}
                        </p>
                    </div>
                </div>

                {(message || error) && (
                    <div
                        className={`mt-5 rounded-2xl px-4 py-3 text-sm font-medium ${
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
                    <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Basic info
                        </p>
                        <h3 className="mt-2 text-xl font-black text-slate-900">
                            Informacioni bazë
                        </h3>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Emri i eventit
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    />
                                    <button
                                        onClick={() => saveField("name")}
                                        disabled={savingField === "name"}
                                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white"
                                    >
                                        {savingField === "name" ? "Duke ruajtur..." : "Ruaj"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Data e eventit
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="date"
                                        value={form.event_date || ""}
                                        onChange={(e) => handleChange("event_date", e.target.value)}
                                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    />
                                    <button
                                        onClick={() => saveField("event_date")}
                                        disabled={savingField === "event_date"}
                                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white"
                                    >
                                        {savingField === "event_date" ? "Duke ruajtur..." : "Ruaj"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Gjuha
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <select
                                        value={form.locale}
                                        onChange={(e) => handleChange("locale", e.target.value)}
                                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    >
                                        <option value="sq">Shqip</option>
                                        <option value="en">English</option>
                                    </select>
                                    <button
                                        onClick={() => saveField("locale")}
                                        disabled={savingField === "locale"}
                                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white"
                                    >
                                        {savingField === "locale" ? "Duke ruajtur..." : "Ruaj"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Shënim
                                </label>
                                <div className="space-y-3">
                                    <textarea
                                        value={form.note}
                                        onChange={(e) => handleChange("note", e.target.value)}
                                        rows={5}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    />
                                    <button
                                        onClick={() => saveField("note")}
                                        disabled={savingField === "note"}
                                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white"
                                    >
                                        {savingField === "note" ? "Duke ruajtur..." : "Ruaj shënimin"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Branding & access
                        </p>
                        <h3 className="mt-2 text-xl font-black text-slate-900">
                            Identiteti i eventit
                        </h3>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Kodi i eventit
                                </label>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        value={form.code}
                                        onChange={(e) => handleChange("code", e.target.value)}
                                        className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    />
                                    <button
                                        onClick={saveCode}
                                        disabled={savingField === "code"}
                                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white"
                                    >
                                        {savingField === "code" ? "Duke ruajtur..." : "Ruaj"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Logo e eventit
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleChange("logo", e.target.files?.[0] || null)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                                    />
                                    <button
                                        onClick={() => saveField("logo")}
                                        disabled={savingField === "logo"}
                                        className="rounded-2xl border border-[#EAE5FA] bg-[#FAF8FF] px-5 py-3 text-sm font-semibold text-slate-700"
                                    >
                                        {savingField === "logo" ? "Duke ruajtur..." : "Ngarko logon"}
                                    </button>
                                </div>
                            </div>

                            {activeEvent?.qr_code && (
                                <div className="rounded-[24px] border border-[#F1ECFF] bg-[#FCFBFF] p-4 text-center">
                                    <p className="text-sm font-semibold text-slate-800">
                                        QR Code i eventit
                                    </p>
                                    <img
                                        src={activeEvent.qr_code}
                                        alt="QR Code"
                                        className="mx-auto mt-4 w-full max-w-[180px]"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[30px] border border-[#E8DFFF] bg-[linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)] p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Current plan
                                </p>
                                <h3 className="mt-2 text-xl font-black text-slate-900">
                                    {subscription.name}
                                </h3>
                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                    subscription.is_premium
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-[#F3EEFF] text-[#7B61FF]"
                                }`}
                            >
                                {subscription.is_premium ? "Premium" : "Free"}
                            </span>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                    Status
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {subscription.status}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3">
                                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                    Payment
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {subscription.payment_method}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Uploads used</span>
                                <span className="font-semibold text-slate-900">
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
                                className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)]"
                            >
                                Upgrade to Premium
                            </button>
                        ) : (
                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                Plani juaj premium është aktiv.
                            </div>
                        )}
                    </div>

                    <div className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Premium benefits
                        </p>
                        <h3 className="mt-2 text-xl font-black text-slate-900">
                            Çfarë fiton me premium
                        </h3>

                        <div className="mt-5 space-y-3">
                            {[
                                "Më shumë hapësirë për foto dhe video",
                                "Shkarkim i plotë i medias në ZIP",
                                "Branding më profesional për eventin",
                                "Përvojë më e pastër për të ftuarit",
                                "Më shumë kontroll dhe fleksibilitet",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-2xl border border-[#F1ECFF] bg-[#FCFBFF] px-4 py-3"
                                >
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                    <p className="text-sm text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[30px] border border-[#E8DFFF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] p-6 text-white shadow-[0_18px_40px_rgba(123,97,255,0.20)]">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                            Special offer
                        </p>
                        <h3 className="mt-2 text-2xl font-black">
                            Bëje eventin tënd më premium
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/90">
                            Aktivizo më shumë funksione, më shumë storage dhe një
                            eksperiencë më profesionale për mysafirët e tu.
                        </p>

                        <button
                            onClick={goToPricing}
                            className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#7B61FF] transition hover:bg-white/90"
                        >
                            Shiko ofertat
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}