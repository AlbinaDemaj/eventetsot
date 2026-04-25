import AuthShell from "./AuthShell";

export default function LoginPage({ csrfToken, oldEmail = "", errors = {} }) {
    return (
        <AuthShell
            badge="Mirë se u ktheve"
            title="Kyçu në EventetSot"
            description="Hyr në llogarinë tënde për të menaxhuar eventet, median dhe përvojën tënde në platformë."
            sideTitle="Menaxho eventet e tua me një pamje moderne dhe elegante."
            sideText="Nga krijimi i eventit deri te ngarkimi i fotove dhe videove, gjithçka duhet të ndihet e thjeshtë, premium dhe e qartë për përdoruesin."
            footerText="Nuk ke ende llogari?"
            footerLinkText="Regjistrohu"
            footerLinkHref="/register"
        >
            <form
                method="POST"
                action="/login"
                className="space-y-6 rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8"
            >
                <input type="hidden" name="_token" value={csrfToken} />

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

                {/* Kujto + Forgot */}
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                        <input
                            type="checkbox"
                            name="remember"
                            className="h-4 w-4 rounded border-slate-300 text-[#7B61FF] focus:ring-[#7B61FF]/20"
                        />
                        Më kujto mua
                    </label>

                    <a
                        href="/forgot-password"
                        className="font-medium text-slate-500 transition hover:text-[#7B61FF]"
                    >
                        Ke harruar fjalëkalimin?
                    </a>
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
                    <span className="relative">Kyçu</span>
                </button>
            </form>
        </AuthShell>
    );
}