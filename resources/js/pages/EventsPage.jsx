import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const events = [
    {
        id: 1,
        title: "Dasmë Elegante",
        category: "Dasmë",
        location: "Prishtinë",
        date: "24 Qershor 2026",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        description:
            "Atmosferë romantike, dekor i sofistikuar dhe përjetime të paharrueshme për çiftin dhe të ftuarit.",
    },
    {
        id: 2,
        title: "Festë Ditëlindjeje Premium",
        category: "Ditëlindje",
        location: "Prizren",
        date: "12 Korrik 2026",
        image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=80",
        description:
            "Ngjyra, energji dhe një organizim modern për ta kthyer ditëlindjen në një kujtim special.",
    },
    {
        id: 3,
        title: "Mbrëmje Familjare",
        category: "Familjare",
        location: "Pejë",
        date: "05 Gusht 2026",
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
        description:
            "Momente të ngrohta me familjen, ambient i kuruar dhe organizim që sjell rehati dhe elegancë.",
    },
    {
        id: 4,
        title: "Event Korporativ",
        category: "Biznes",
        location: "Tiranë",
        date: "18 Shtator 2026",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        description:
            "Event profesional me prezencë serioze, stil modern dhe hapësirë ideale për networking dhe prezantime.",
    },
];

const highlights = [
    "Dasma moderne",
    "Ditëlindje unike",
    "Mbrëmje familjare",
    "Evente korporative",
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-[#FCFBFF] text-slate-900">
            <Navbar />

            <section className="relative overflow-hidden border-b border-[#EEEAF8] bg-white">
    {/* Background effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.16),transparent_28%),linear-gradient(to_bottom,#ffffff,#fcfbff)]" />
    <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#7B61FF]/20 blur-3xl" />
    <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#6EC3F4]/20 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
            
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/80 px-5 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                Platformë për evente moderne
            </span>

            {/* Title */}
            <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-[-0.05em] text-slate-900 sm:text-6xl lg:text-7xl">
                Krijo dhe prezanto
                <span className="block bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] bg-clip-text text-transparent">
                    evente që duken magjike
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
                Nga dasmat elegante te eventet korporative, çdo moment mund të
                shndërrohet në një përvojë vizuale që tërheq vëmendje dhe mbetet
                gjatë në kujtesë.
            </p>

            {/* Highlights */}
            <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                    Dizajn modern & premium
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6EC3F4]" />
                    Evente të kuruara me stil
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8F7DFF]" />
                    Përvoja që mbetet në mendje
                </div>
            </div>

            {/* Decorative small CTA feel (pa butona) */}
            <div className="mt-12 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#7B61FF]/10 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-[#7B61FF]" />
                </div>
                <p className="text-sm font-medium text-slate-500">
                    Shfleto eventet dhe gjej inspirimin tënd
                </p>
            </div>
        </div>
    </div>
</section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7B61FF]">
                            Koleksioni ynë
                        </span>
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">
                            Evente që tërheqin vëmendje
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600">
                            Çdo event paraqitet me një stil vizual të kuruar për
                            të reflektuar emocionin, elegancën dhe identitetin e
                            tij.
                        </p>
                    </div>

                    <div className="rounded-full border border-[#E9E2FF] bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
                        4 kategori të kuruara
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {events.map((event) => (
                        <article
                            key={event.id}
                            className="group overflow-hidden rounded-[32px] border border-[#EEEAF8] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(123,97,255,0.12)]"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                                <span className="absolute left-4 top-4 inline-flex rounded-full border border-white/40 bg-white/85 px-3 py-1 text-xs font-semibold text-[#7B61FF] backdrop-blur">
                                    {event.category}
                                </span>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="rounded-2xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">
                                        <p className="text-sm font-medium text-white/95">
                                            Organizim modern dhe atmosferë premium
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-[#7B61FF]">
                                        {event.title}
                                    </h3>

                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7B61FF] shadow-[0_0_0_6px_rgba(123,97,255,0.10)]" />
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    {event.description}
                                </p>

                                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-400">
                                            Lokacioni
                                        </span>
                                        <span className="font-semibold text-slate-800">
                                            {event.location}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-400">
                                            Data
                                        </span>
                                        <span className="font-semibold text-slate-800">
                                            {event.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="relative overflow-hidden rounded-[36px] border border-[#EDE7FF] bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-8 py-12 text-white shadow-[0_30px_80px_rgba(123,97,255,0.22)]">
                    <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative max-w-3xl">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                            Përvoja që mbetet në mendje
                        </span>

                        <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                            Çdo event meriton prezantim që duket luksoz dhe i
                            kuruar në çdo detaj.
                        </h3>

                        <p className="mt-4 text-base leading-7 text-white/90">
                            Krijo një përshtypje të fortë që në shikimin e parë
                            me evente të paraqitura bukur, pastër dhe me stil
                            premium.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}