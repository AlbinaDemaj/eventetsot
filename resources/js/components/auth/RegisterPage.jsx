import AuthShell from "./AuthShell";

export default function RegisterPage({
    csrfToken,
    oldEmail = "",
    oldName = "",
    errors = {},
}) {
    return (
        <AuthShell
            badge="Krijo llogari"
            title="Krijo llogarinë tënde"
            description="Regjistrohu dhe fillo menjëherë krijimin e eventit tënd me një eksperiencë të pastër dhe moderne."
            sideTitle="Një fillim i bukur për çdo event."
            sideText="Pas regjistrimit, përdoruesi hyn direkt në onboarding dhe nis personalizimin e eventit në pak hapa të thjeshtë."
            footerText="Ke tashmë një llogari?"
            footerLinkText="Kyçu"
            footerLinkHref="/login"
        >
            <form
                method="POST"
                action="/register"
                className="space-y-6 rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8"
            >
                <input type="hidden" name="_token" value={csrfToken} />

                {/* Emri */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Emri
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={oldName}
                        placeholder="Shkruaj emrin"
                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition duration-200 
                        focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 
                        hover:border-slate-300"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.name[0]}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={oldEmail}
                        placeholder="Shkruaj email-in"
                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition duration-200 
                        focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 
                        hover:border-slate-300"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                {/* Fjalëkalimi */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Fjalëkalimi
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Shkruaj fjalëkalimin"
                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition duration-200 
                        focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 
                        hover:border-slate-300"
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password[0]}
                        </p>
                    )}
                </div>

                {/* Konfirmo */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                        Konfirmo fjalëkalimin
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Rishkruaj fjalëkalimin"
                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition duration-200 
                        focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 
                        hover:border-slate-300"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="group relative w-full overflow-hidden rounded-2xl 
                    bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] 
                    px-5 py-3.5 text-base font-semibold text-white 
                    shadow-[0_16px_40px_rgba(123,97,255,0.25)] 
                    transition duration-300 
                    hover:-translate-y-[1px] hover:shadow-[0_20px_50px_rgba(123,97,255,0.35)]"
                >
                    <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.25),transparent)] translate-x-[-120%] transition duration-700 group-hover:translate-x-[120%]" />
                    <span className="relative">Regjistrohu</span>
                </button>
            </form>
        </AuthShell>
    );
}