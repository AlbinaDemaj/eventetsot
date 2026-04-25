import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const contactCards = [
    {
        title: "Email",
        value: "info@eventetsot.com",
        text: "Na shkruaj për pyetje, bashkëpunime ose informata rreth platformës.",
        tone: "bg-[#F8F5FF]",
    },
    {
        title: "Telefoni",
        value: "+383 44 123 456",
        text: "Na kontakto direkt për asistencë më të shpejtë dhe komunikim më të afërt.",
        tone: "bg-[#EEF8FF]",
    },
    {
        title: "Lokacioni",
        value: "Prishtinë, Kosovë",
        text: "Jemi gjithmonë afër për të sjellë një eksperiencë moderne dhe profesionale.",
        tone: "bg-[#FFF7FB]",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FCFBFF] text-slate-900">
            <Navbar />

            <section className="relative overflow-hidden border-b border-[#EEEAF8] bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(110,195,244,0.12),transparent_24%),linear-gradient(to_bottom,#ffffff,#fcfbff)]" />
                <div className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#7B61FF]/12 blur-3xl" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#6EC3F4]/12 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                Kontakt
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
                                Le të flasim për
                                <span className="block bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] bg-clip-text text-transparent">
                                    eventin, idenë apo pyetjen tënde
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                                Nëse ke pyetje rreth platformës, dëshiron
                                bashkëpunim apo thjesht kërkon më shumë
                                informata, na shkruaj. Ekipi ynë është këtu për
                                të të ndihmuar me qartësi, kujdes dhe një qasje
                                profesionale.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-[#F4F0FF] px-4 py-2 text-sm font-medium text-[#7B61FF]">
                                    Mbështetje e shpejtë
                                </span>
                                <span className="rounded-full bg-[#EEF8FF] px-4 py-2 text-sm font-medium text-[#3176A8]">
                                    Komunikim profesional
                                </span>
                                <span className="rounded-full bg-[#FFF2F7] px-4 py-2 text-sm font-medium text-[#C15C8A]">
                                    Bashkëpunime moderne
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[34px] bg-[linear-gradient(135deg,rgba(123,97,255,0.10),rgba(110,195,244,0.10))] blur-2xl" />

                            <div className="relative rounded-[34px] border border-[#EEEAF8] bg-white/85 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                                <span className="inline-flex rounded-full border border-[#E9E2FF] bg-white px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm">
                                    Pse të na shkruash
                                </span>

                                <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-900">
                                    Çdo mesazh trajtohet me kujdes dhe përgjigje të qartë
                                </h3>

                                <p className="mt-4 text-base leading-7 text-slate-600">
                                    Ne fokusohemi te një komunikim i thjeshtë,
                                    elegant dhe i besueshëm, që çdo përdorues të
                                    ndihet i kuptuar dhe i mbështetur.
                                </p>

                                <div className="mt-8 space-y-3">
                                    <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
                                        Përgjigje të shpejta për pyetje dhe ndihmë
                                    </div>
                                    <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
                                        Mundësi bashkëpunimi për evente dhe ide të reja
                                    </div>
                                    <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm font-medium text-slate-600 shadow-sm">
                                        Komunikim i pastër dhe përvojë profesionale
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[34px] border border-[#EEEAF8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                        <div className="mb-8">
                            <span className="inline-flex rounded-full bg-[#F4F0FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                                Na dërgo një mesazh
                            </span>

                            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-900">
                                Jemi gati të dëgjojmë nga ti
                            </h2>

                            <p className="mt-3 text-base leading-7 text-slate-600">
                                Plotëso formularin dhe na trego si mund të të
                                ndihmojmë. Ne do të kthehemi me një përgjigje të
                                qartë dhe sa më shpejt.
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Emri i plotë
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Shkruaj emrin tënd"
                                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 hover:border-slate-300"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-800">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Shkruaj email-in"
                                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 hover:border-slate-300"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-800">
                                    Subjekti
                                </label>
                                <input
                                    type="text"
                                    placeholder="Shkruaj subjektin"
                                    className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 hover:border-slate-300"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-800">
                                    Mesazhi
                                </label>
                                <textarea
                                    rows="6"
                                    placeholder="Shkruaj mesazhin tënd"
                                    className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFE] px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 hover:border-slate-300"
                                />
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                <p className="text-sm text-slate-500">
                                    Mundohemi të përgjigjemi brenda 24 orëve.
                                </p>

                                <button
                                    type="submit"
                                    className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-6 py-3.5 font-semibold text-white shadow-[0_16px_40px_rgba(123,97,255,0.25)] transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_20px_50px_rgba(123,97,255,0.32)]"
                                >
                                    Dërgo mesazhin
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-6">
                        {contactCards.map((card) => (
                            <div
                                key={card.title}
                                className="group relative overflow-hidden rounded-[30px] border border-[#EEEAF8] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(123,97,255,0.10)]"
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#7B61FF]/5 blur-2xl transition duration-300 group-hover:bg-[#7B61FF]/10" />

                                <div className="relative">
                                    <span
                                        className={`inline-flex rounded-full ${card.tone} px-3 py-1 text-xs font-semibold text-slate-700`}
                                    >
                                        {card.title}
                                    </span>

                                    <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-slate-900 transition group-hover:text-[#7B61FF]">
                                        {card.value}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600">
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="relative overflow-hidden rounded-[32px] border border-[#EDE7FF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] p-8 text-white shadow-[0_24px_70px_rgba(123,97,255,0.22)]">
                            <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative">
                                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                    Orari i përgjigjeve
                                </span>

                                <h3 className="mt-5 text-2xl font-black tracking-[-0.03em]">
                                    Ne jemi këtu për të të ndihmuar sa më shpejt
                                </h3>

                                <p className="mt-4 leading-7 text-white/90">
                                    Ekipi ynë mundohet të përgjigjet brenda 24
                                    orëve për çdo pyetje, kërkesë apo mundësi
                                    bashkëpunimi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}