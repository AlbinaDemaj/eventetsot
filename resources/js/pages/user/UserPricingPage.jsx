export default function UserPricingPage({ extra = {} }) {
    const plans = extra?.subscriptionPlans || [];
    const subscription = extra?.subscription || {};
    const activePlanId = subscription?.plan_id || null;

    const activePlan = plans.find((plan) => plan.id === activePlanId);

    const whatsappMessage =
        "Pershendetje, dua te aktivizoj planin Premium per EventetSot.";

    const whatsappUrl = `https://wa.me/38348568568?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    const subscribeToPlan = (planId) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `/subscriptions/${planId}/subscribe`;

        const csrfToken =
            document.querySelector('meta[name="csrf-token"]')?.content || "";

        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = csrfToken;

        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
    };

    const isFreePlan = (plan) => {
        const name = (plan?.name || "").toLowerCase();
        const price = Number(plan?.price || 0);

        return (
            price === 0 ||
            name.includes("free") ||
            name.includes("falas") ||
            name.includes("basic")
        );
    };

    const getPlanTitle = (plan) => (isFreePlan(plan) ? "Plani Falas" : "Plani Premium");
    const getPlanPrice = (plan) => (isFreePlan(plan) ? 0 : 200);

    const getPlanFeatures = (plan) => {
        if (isFreePlan(plan)) {
            return [
                "1 event aktiv",
                "5 foto maksimum",
                "Pa video",
                "Aktiv për 1 javë",
                "Link publik + QR",
            ];
        }

        return [
            "1 event Premium",
            "Foto pa limit",
            "Video të aktivizuara",
            "Aktiv për 6 muaj",
            "Shkarkim i mediave",
        ];
    };

    return (
        <div className="space-y-6">
            <section className="relative overflow-hidden rounded-[30px] border border-white bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(123,97,255,0.13),transparent_28%),linear-gradient(135deg,#ffffff_0%,#faf8ff_60%,#f7fbff_100%)]" />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full border border-[#E8E1FF] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#7B61FF]">
                            Planet
                        </span>

                        <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl">
                            Zgjidh planin për eventin tënd.
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                            Falas për testim. Premium për evente të plota me foto pa limit,
                            video dhe kohëzgjatje më të gjatë.
                        </p>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                        >
                            Kontakto në WhatsApp për Premium
                        </a>
                    </div>

                    <div className="rounded-[22px] border border-[#EFE9FF] bg-[#FAF8FF] px-4 py-3">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                            Plani aktual
                        </p>

                        <p className="mt-1 text-sm font-black text-slate-950">
                            {activePlan ? getPlanTitle(activePlan) : "Asnjë plan aktiv"}
                        </p>
                    </div>
                </div>
            </section>

            {plans.length === 0 ? (
                <section className="rounded-[28px] border border-dashed border-[#DDD7EE] bg-white px-6 py-10 text-center shadow-sm">
                    <h3 className="text-xl font-black text-slate-950">
                        Nuk ka plane të disponueshme
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Për momentin nuk ka plane aktive për t’u zgjedhur.
                    </p>
                </section>
            ) : (
                <section className="grid gap-5 xl:grid-cols-2">
                    {plans.map((plan) => {
                        const free = isFreePlan(plan);
                        const isActive = activePlanId === plan.id;
                        const price = getPlanPrice(plan);
                        const features = getPlanFeatures(plan);

                        return (
                            <article
                                key={plan.id}
                                className={`relative overflow-hidden rounded-[28px] border p-5 transition hover:-translate-y-1 ${
                                    free
                                        ? "border-[#E8E3F5] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]"
                                        : "border-[#7B61FF] bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] shadow-[0_18px_46px_rgba(123,97,255,0.16)]"
                                }`}
                            >
                                <div
                                    className={`absolute inset-x-0 top-0 h-1 ${
                                        free
                                            ? "bg-slate-200"
                                            : "bg-[linear-gradient(90deg,#7B61FF,#6EC3F4)]"
                                    }`}
                                />

                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                                            {free ? "Për testim" : "Më i rekomanduar"}
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">
                                            {getPlanTitle(plan)}
                                        </h3>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-[11px] font-black ${
                                            free
                                                ? "bg-slate-100 text-slate-600"
                                                : "bg-[#7B61FF] text-white"
                                        }`}
                                    >
                                        {isActive ? "Aktiv" : free ? "Falas" : "Premium"}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-end gap-2">
                                    <span className="text-4xl font-black tracking-[-0.06em] text-slate-950">
                                        €{price}
                                    </span>

                                    <span className="pb-1 text-xs font-black text-slate-400">
                                        / {free ? "1 javë" : "6 muaj"}
                                    </span>
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    {free
                                        ? "Plan bazik për të provuar eventin."
                                        : "Plan i plotë për eksperiencë profesionale."}
                                </p>

                                <div className="mt-5 grid gap-2">
                                    {features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 rounded-2xl bg-[#FCFBFF] px-3 py-2.5 ring-1 ring-[#F1ECFF]"
                                        >
                                            <span
                                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                                                    free
                                                        ? "bg-slate-100 text-slate-600"
                                                        : "bg-[#EDE7FF] text-[#7B61FF]"
                                                }`}
                                            >
                                                ✓
                                            </span>

                                            <span className="text-sm font-semibold text-slate-700">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-5 space-y-3">
                                    {isActive ? (
                                        <button
                                            disabled
                                            className="w-full rounded-2xl border border-[#DDD3FF] bg-[#F4F0FF] px-4 py-3 text-sm font-black text-[#7B61FF]"
                                        >
                                            Plani aktual
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => subscribeToPlan(plan.id)}
                                            className={`w-full rounded-2xl px-4 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                                                free
                                                    ? "border border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50"
                                                    : "bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] text-white shadow-[0_14px_32px_rgba(123,97,255,0.22)]"
                                            }`}
                                        >
                                            {free ? "Vazhdo falas" : "Zgjidh Premium"}
                                        </button>
                                    )}

                                    {!free && !isActive && (
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                                        >
                                            Kontakto në WhatsApp
                                        </a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            )}
        </div>
    );
}