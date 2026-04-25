import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
    {
        title: "Dasma",
        text: "Krijo një eksperiencë elegante për ditën më të rëndësishme, me organizim të kuruar dhe prezantim që lë mbresë.",
        count: "120+ evente",
        accent: "from-[#7B61FF] to-[#9D8BFF]",
        label: "Romantike & elegante",
    },
    {
        title: "Ditëlindje",
        text: "Festime moderne dhe kreative për çdo moshë, me energji, ngjyra dhe atmosferë që e bën çdo moment të paharrueshëm.",
        count: "80+ evente",
        accent: "from-[#6EC3F4] to-[#8ED8FF]",
        label: "Moderne & festive",
    },
    {
        title: "Fejesa",
        text: "Momente intime dhe të bukura me një prezantim premium, të dizajnuara për emocion, stil dhe kujtime të veçanta.",
        count: "40+ evente",
        accent: "from-[#F59BC7] to-[#FFC2DD]",
        label: "Intime & premium",
    },
    {
        title: "Evente Biznesi",
        text: "Zgjidhje profesionale për evente korporative, prezantime dhe networking, me një paraqitje serioze dhe moderne.",
        count: "65+ evente",
        accent: "from-[#111827] to-[#374151]",
        label: "Profesionale & serioze",
    },
    {
        title: "Baby Shower",
        text: "Dekor i ëmbël, momente të ngrohta dhe organizim i menduar me kujdes për të krijuar një kujtim të bukur familjar.",
        count: "30+ evente",
        accent: "from-[#FFB5D2] to-[#FFD4E5]",
        label: "E ëmbël & familjare",
    },
    {
        title: "Mbrëmje Familjare",
        text: "Evente të ngrohta për të afërmit dhe miqtë më të dashur, me atmosferë komode dhe stil të rafinuar.",
        count: "50+ evente",
        accent: "from-[#A78BFA] to-[#C4B5FD]",
        label: "Ngrohtësi & kujtime",
    },
];

const stats = [
    { value: 385, suffix: "+", label: "Evente të kuruara" },
    { value: 6, suffix: "", label: "Kategori premium" },
    { value: 24, suffix: "/7", label: "Inspirim për çdo event" },
];

function CountUp({ end, duration = 1400 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const stepTime = 16;
        const totalSteps = Math.ceil(duration / stepTime);
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;

            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count}</span>;
}

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-[#FCFBFF] text-slate-900">
            <Navbar />

            <section className="relative overflow-hidden border-b border-[#EEEAF8] bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(110,195,244,0.12),transparent_24%),linear-gradient(to_bottom,#ffffff,#fcfbff)]" />
                <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-[#7B61FF]/12 blur-3xl" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#6EC3F4]/12 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                Kategori të kuruara me stil
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
                                Zgjidh kategorinë ideale për
                                <span className="block bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] bg-clip-text text-transparent">
                                    eventin tënd të ardhshëm
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                                Çdo event ka karakterin e vet. Eksploro kategori
                                të ndryshme dhe gjej stilin, atmosferën dhe
                                frymëzimin e duhur për një prezantim modern,
                                elegant dhe premium.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-[#F4F0FF] px-4 py-2 text-sm font-medium text-[#7B61FF]">
                                    Dasma elegante
                                </span>
                                <span className="rounded-full bg-[#EEF8FF] px-4 py-2 text-sm font-medium text-[#3176A8]">
                                    Evente moderne
                                </span>
                                <span className="rounded-full bg-[#FFF2F7] px-4 py-2 text-sm font-medium text-[#C15C8A]">
                                    Përvoja premium
                                </span>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur"
                                >
                                    <div className="text-3xl font-black tracking-[-0.04em] text-slate-900">
                                        <CountUp end={stat.value} />
                                        {stat.suffix}
                                    </div>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7B61FF]">
                            Kategoritë
                        </span>
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">
                            Eksploro stile të ndryshme eventesh
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                            Nga eventet intime te organizimet elegante dhe
                            profesionale, çdo kategori është ndërtuar për të
                            sjellë qartësi vizuale, estetikë të bukur dhe ndjesi
                            premium.
                        </p>
                    </div>

                    <div className="rounded-full border border-[#E9E2FF] bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
                        6 kategori të përzgjedhura
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {categories.map((item) => (
                        <article
                            key={item.title}
                            className="group relative overflow-hidden rounded-[30px] border border-[#EEEAF8] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(123,97,255,0.12)]"
                        >
                            <div
                                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.accent}`}
                            />

                            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#7B61FF]/5 blur-3xl transition duration-300 group-hover:bg-[#7B61FF]/10" />

                            <div className="relative">
                                <div className="flex items-center justify-between gap-4">
                                    <span
                                        className={`inline-flex rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-semibold text-white shadow-sm`}
                                    >
                                        {item.label}
                                    </span>

                                    <span className="text-xs font-semibold text-slate-400">
                                        {item.count}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-2xl font-bold tracking-[-0.03em] text-slate-900 transition group-hover:text-[#7B61FF]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-slate-600">
                                        {item.text}
                                    </p>
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-400">
                                            Kategori eventesh
                                        </span>

                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7B61FF]">
                                            Eksploro
                                            <span className="transition group-hover:translate-x-1">
                                                →
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="relative overflow-hidden rounded-[36px] border border-[#EDE7FF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-8 py-12 text-white shadow-[0_30px_80px_rgba(123,97,255,0.22)] lg:px-12">
                    <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative max-w-3xl">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                            Krijo evente me identitet
                        </span>

                        <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                            Çdo kategori sjell një histori, një energji dhe një
                            stil unik për mënyrën si prezantohet eventi yt.
                        </h3>

                        <p className="mt-4 text-base leading-7 text-white/90">
                            Nga eventet intime te organizimet elegante dhe
                            profesionale, çdo përvojë meriton të paraqitet me
                            klas, qartësi dhe estetikë premium.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                Dizajn modern
                            </span>
                            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                Kategori të kuruara
                            </span>
                            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                Pamje elegante
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}