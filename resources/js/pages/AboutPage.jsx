import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
    {
        title: "Misioni Ynë",
        text: "Të krijojmë një platformë moderne dhe elegante që i ndihmon njerëzit të organizojnë, prezantojnë dhe përjetojnë eventet e tyre me më shumë stil, qartësi dhe lehtësi.",
        tone: "bg-[#F8F5FF]",
    },
    {
        title: "Vizioni Ynë",
        text: "Të sjellim një standard të ri në mënyrën si eventet menaxhohen dhe prezantohen, duke bashkuar estetikën premium me funksionalitetin praktik.",
        tone: "bg-[#F4FAFF]",
    },
    {
        title: "Përvoja",
        text: "Çdo element është menduar për ta bërë përdorimin të thjeshtë, të qartë dhe vizualisht të bukur, në mënyrë që çdo event të duket dhe të ndihet më i veçantë.",
        tone: "bg-[#FFF7FB]",
    },
    {
        title: "Përkushtimi",
        text: "Ne fokusohemi te detajet që bëjnë diferencën, sepse besojmë se një event i bukur meriton një platformë po aq të bukur dhe të menduar mirë.",
        tone: "bg-[#F6FFFB]",
    },
];

const pillars = [
    "Dizajn modern dhe premium",
    "Përdorim i thjeshtë dhe i qartë",
    "Përvojë elegante për çdo event",
];

function useParallax() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;
            setOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return offset;
}

export default function AboutPage() {
    const { x, y } = useParallax();

    return (
        <div className="min-h-screen bg-[#FCFBFF] text-slate-900">
            <Navbar />

            <section className="relative overflow-hidden border-b border-[#EEEAF8] bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(110,195,244,0.12),transparent_24%),linear-gradient(to_bottom,#ffffff,#fcfbff)]" />

                <div
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute -left-16 top-6 h-72 w-72 rounded-full bg-[#7B61FF]/18 blur-3xl transition-transform duration-300"
                />

                <div
                    style={{ transform: `translate(${-x}px, ${-y}px)` }}
                    className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#6EC3F4]/16 blur-3xl transition-transform duration-300"
                />

                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                                Rreth EventetSot
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-5xl lg:text-6xl">
                                EventetSot është krijuar për t’i dhënë çdo eventi
                                <span className="block bg-[linear-gradient(120deg,#7B61FF,#8F7DFF,#6EC3F4,#7B61FF)] bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite] bg-clip-text text-transparent">
                                    një prezencë që lë mbresë
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                                Për ne, një event nuk është vetëm organizim. Është
                                emocion, kujtim dhe identitet. Pikërisht për këtë,
                                ndërtuam një platformë që e bën çdo moment të
                                duket më elegant, më i qartë dhe më i veçantë.
                            </p>

                            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                                Nga eventet familjare deri te ato profesionale,
                                EventetSot bashkon estetikën moderne me
                                funksionalitetin praktik, për t’i bërë eventet
                                më të bukura për t’u menaxhuar dhe më të forta
                                për t’u prezantuar.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-[#F4F0FF] px-4 py-2 text-sm font-medium text-[#7B61FF]">
                                    Menaxhim elegant
                                </span>
                                <span className="rounded-full bg-[#EEF8FF] px-4 py-2 text-sm font-medium text-[#3176A8]">
                                    Përvojë moderne
                                </span>
                                <span className="rounded-full bg-[#FFF2F7] px-4 py-2 text-sm font-medium text-[#C15C8A]">
                                    Evente me identitet
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[36px] bg-[linear-gradient(135deg,rgba(123,97,255,0.10),rgba(110,195,244,0.10))] blur-2xl" />

                            <div className="relative overflow-hidden rounded-[36px] border border-[#EEEAF8] bg-white/85 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.08),transparent_30%)]" />

                                <div className="relative">
                                    <span className="inline-flex rounded-full border border-[#E9E2FF] bg-white px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm">
                                        Thelbi ynë
                                    </span>

                                    <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-900">
                                        Të krijojmë evente që duken bukur dhe
                                        ndihen premium
                                    </h3>

                                    <p className="mt-4 text-base leading-7 text-slate-600">
                                        Platforma jonë është menduar për ata që
                                        duan më shumë se thjesht organizim. Duan
                                        rregull, estetikë dhe një mënyrë më të
                                        bukur për të paraqitur momentet që kanë
                                        rëndësi.
                                    </p>

                                    <div className="mt-8 space-y-3">
                                        {pillars.map((item) => (
                                            <div
                                                key={item}
                                                className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm font-medium text-slate-600 shadow-sm"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-10 max-w-2xl">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7B61FF]">
                        Çfarë na dallon
                    </span>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">
                        Një platformë e ndërtuar me ndjesi premium
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                        EventetSot është krijuar për të sjellë më shumë bukuri,
                        qartësi dhe përvojë në mënyrën si eventet organizohen
                        dhe prezantohen.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {values.map((item) => (
                        <article
                            key={item.title}
                            className="group relative overflow-hidden rounded-[30px] border border-[#EEEAF8] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(123,97,255,0.12)]"
                        >
                            <div className="absolute left-0 top-0 h-1 w-full bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)]" />
                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-[#7B61FF]/5 blur-2xl transition duration-300 group-hover:bg-[#7B61FF]/10" />

                            <div className="relative">
                                <span
                                    className={`inline-flex rounded-full ${item.tone} px-3 py-1 text-xs font-semibold text-slate-700`}
                                >
                                    Vlerë kryesore
                                </span>

                                <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-slate-900 transition group-hover:text-[#7B61FF]">
                                    {item.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {item.text}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[32px] border border-[#EEEAF8] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                        <span className="inline-flex rounded-full bg-[#F4F0FF] px-4 py-2 text-sm font-semibold text-[#7B61FF]">
                            Për kë është EventetSot
                        </span>

                        <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-900">
                            Për këdo që dëshiron ta bëjë organizimin më të bukur
                            dhe më të lehtë
                        </h3>

                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Qoftë për një dasmë elegante, një ditëlindje të
                            paharrueshme, një event familjar apo një organizim
                            profesional, platforma jonë është ndërtuar për të
                            sjellë rregull, estetikë dhe siguri në çdo hap.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm text-slate-600">
                                Organizim i thjeshtë dhe intuitiv
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm text-slate-600">
                                Pamje që reflekton elegancë dhe profesionalizëm
                            </div>
                            <div className="rounded-2xl border border-slate-100 bg-[#FCFBFF] px-5 py-4 text-sm text-slate-600">
                                Përvojë që i jep vlerë çdo momenti
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[36px] border border-[#EDE7FF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-8 py-12 text-white shadow-[0_30px_80px_rgba(123,97,255,0.22)] lg:px-12">
                        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative max-w-2xl">
                            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                Premtimi ynë
                            </span>

                            <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                                Të kthejmë çdo event në një eksperiencë që
                                duket bukur dhe ndihet e paharrueshme
                            </h3>

                            <p className="mt-4 text-base leading-7 text-white/90">
                                Ne nuk ndërtojmë vetëm një platformë. Ne
                                krijojmë një mënyrë më elegante për të menduar,
                                menaxhuar dhe përjetuar eventet që kanë më shumë
                                rëndësi.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                    Elegancë
                                </span>
                                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                    Qartësi
                                </span>
                                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                    Përkushtim
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}