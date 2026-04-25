import OnboardingShell from "./OnboardingShell";

export default function EventNamePage({
    csrfToken,
    oldEventName = "",
    errors = {},
}) {
    return (
        <OnboardingShell
            step="01"
            title="Si quhet eventi yt?"
            description="Vendos një emër të bukur për eventin tënd që do të përdoret gjatë krijimit dhe menaxhimit të tij."
            sideText="Ky është hapi i parë i eksperiencës së user-it pas regjistrimit. Emri i eventit është baza mbi të cilën vazhdon onboarding-u dhe krijimi i eventit."
        >
            <form method="POST" action="/user/onboarding/event-name" className="space-y-5">
                <input type="hidden" name="_token" value={csrfToken} />

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Emri i eventit
                    </label>
                    <input
                        type="text"
                        name="event_name"
                        defaultValue={oldEventName}
                        placeholder="p.sh. Ardit & Sara Wedding"
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                    />
                    {errors.event_name && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.event_name[0]}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3.5 text-base font-semibold text-white shadow-[0_16px_40px_rgba(123,97,255,0.25)] transition hover:scale-[1.01]"
                >
                    Vazhdo
                </button>
            </form>
        </OnboardingShell>
    );
}