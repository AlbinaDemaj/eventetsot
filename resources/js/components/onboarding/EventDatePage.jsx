import OnboardingShell from "./OnboardingShell";

export default function EventDatePage({
    csrfToken,
    oldEventDate = "",
    errors = {},
}) {
    return (
        <OnboardingShell
            step="02"
            title="Zgjedh datën e eventit"
            description="Vendos datën kur do të mbahet eventi. Pas këtij hapi, eventi krijohet dhe ti dërgohesh në dashboard."
            sideText="Ky është hapi i dytë dhe final i onboarding-ut. Sapo përdoruesi e zgjedh datën, sistemi krijon eventin automatikisht dhe e dërgon te pjesa e user-it."
        >
            <form method="POST" action="/user/onboarding/event-date" className="space-y-5">
                <input type="hidden" name="_token" value={csrfToken} />

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Data e eventit
                    </label>
                    <input
                        type="date"
                        name="event_date"
                        defaultValue={oldEventDate}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                    />
                    {errors.event_date && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.event_date[0]}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_40px_rgba(123,97,255,0.25)] transition hover:scale-[1.01]"
                >
                    Krijo eventin
                </button>
            </form>
        </OnboardingShell>
    );
}