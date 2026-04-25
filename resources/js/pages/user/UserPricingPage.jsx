export default function UserPricingPage({ extra = {} }) {
    const plans = extra?.subscriptionPlans || [];
    const subscription = extra?.subscription || {};
    const activePlanId = subscription?.plan_id || null;

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

    const getPlanFeatures = (plan) => {
        const name = (plan?.name || "").toLowerCase();

        if (name.includes("basic")) {
            return [
                "1 event aktiv",
                "Galeria foto & video",
                "Link për ndarjen me mysafirë",
                "Mbështetje bazike",
            ];
        }

        if (name.includes("standard")) {
            return [
                "Mjete të avancuara për evente",
                "Galeria foto & video",
                "Cilësime të personalizuara",
                "Mbështetje prioritare",
            ];
        }

        if (name.includes("premium")) {
            return [
                "Të gjitha nga Standard",
                "Personalizim i avancuar",
                "Akses prioritar në media",
                "Mbështetje premium",
            ];
        }

        return [
            "Menaxhim modern i eventeve",
            "Foto & video të organizuara",
            "Aktivizim i shpejtë",
            "Pagesa e sigurt",
        ];
    };

    return (
        <div className="space-y-8">
            {/* HERO */}
            <section className="relative overflow-hidden rounded-[32px] border border-[#ECEAF4] bg-white p-6 shadow-sm sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.10),transparent_26%),linear-gradient(to_bottom,#ffffff,#fbf9ff)]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Planet & Abonimi
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#1F1A33] sm:text-4xl">
                            Zgjidh planin e duhur për eventin tënd
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#6E6A86] sm:text-base">
                            Zgjidh planin që i përshtatet më mirë nevojave të tua dhe
                            përfito një eksperiencë më profesionale në menaxhimin e eventeve.
                        </p>
                    </div>

                    <div className="rounded-[24px] border border-[#EEE8FF] bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A84A3]">
                            Plani aktual
                        </p>
                        <p className="mt-2 text-lg font-bold text-[#1F1A33]">
                            {plans.find((plan) => plan.id === activePlanId)?.name || "Asnjë plan aktiv"}
                        </p>
                    </div>
                </div>
            </section>

            {/* NO PLANS */}
            {plans.length === 0 ? (
                <section className="rounded-[30px] border border-dashed border-[#DDD7EE] bg-white px-6 py-14 text-center shadow-sm">
                    <h3 className="text-2xl font-bold text-[#1F1A33]">
                        Nuk ka plane të disponueshme
                    </h3>
                    <p className="mt-3 text-sm text-[#7C7893]">
                        Për momentin nuk ka plane aktive për t’u zgjedhur.
                    </p>
                </section>
            ) : (
                <section className="grid gap-6 xl:grid-cols-3">
                    {plans.map((plan, index) => {
                        const isActive = activePlanId === plan.id;
                        const isFeatured = index === 1 && !isActive;
                        const features = getPlanFeatures(plan);

                        return (
                            <article
                                key={plan.id}
                                className={`relative overflow-hidden rounded-[30px] border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                    isActive
                                        ? "border-[#7B61FF] bg-[linear-gradient(180deg,#ffffff_0%,#f8f5ff_100%)] shadow-[0_18px_45px_rgba(123,97,255,0.14)]"
                                        : "border-[#ECEAF4] bg-white"
                                }`}
                            >
                                {(isActive || isFeatured) && (
                                    <div className="absolute right-5 top-5">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                                                isActive
                                                    ? "bg-[#7B61FF] text-white"
                                                    : "bg-[#F3EDFF] text-[#7B61FF]"
                                            }`}
                                        >
                                            {isActive ? "Plani aktiv" : "Më i preferuari"}
                                        </span>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8A84A3]">
                                        Plan abonimi
                                    </p>

                                    <h3 className="mt-3 text-2xl font-black text-[#1F1A33]">
                                        {plan.name}
                                    </h3>

                                    <div className="mt-5 flex items-end gap-2">
                                        <span className="text-4xl font-black tracking-tight text-[#1F1A33]">
                                            €{Number(plan.price || 0).toFixed(0)}
                                        </span>
                                        <span className="pb-1 text-sm font-medium text-[#8A84A3]">
                                            / plan
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-[#6E6A86]">
                                        I përshtatshëm për përdorues që kërkojnë një eksperiencë më të avancuar dhe profesionale.
                                    </p>
                                </div>

                                <div className="rounded-[24px] border border-[#F1ECFF] bg-[#FCFBFF] p-4">
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A84A3]">
                                        Çfarë përfshihet
                                    </p>

                                    <div className="mt-4 space-y-3">
                                        {features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE7FF] text-xs font-bold text-[#7B61FF]">
                                                    ✓
                                                </span>
                                                <span className="text-sm font-medium text-[#332E4A]">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {isActive ? (
                                        <button
                                            disabled
                                            className="w-full rounded-2xl border border-[#DDD3FF] bg-[#F4F0FF] px-4 py-3 text-sm font-bold text-[#7B61FF]"
                                        >
                                            Plani aktual
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => subscribeToPlan(plan.id)}
                                            className="w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-4 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(123,97,255,0.20)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(123,97,255,0.28)]"
                                        >
                                            Zgjidh këtë plan
                                        </button>
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