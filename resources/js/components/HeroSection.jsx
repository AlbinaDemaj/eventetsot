import { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function HeroSection() {
    const images = [
        {
            src: "https://images.pexels.com/photos/13434417/pexels-photo-13434417.jpeg",
            alt: "Dasmë elegante",
            tag: "Kujtime dasme",
            title: "Dasma të paharrueshme në një galeri elegante",
            description:
                "Ruaj momentet më të bukura të dasmës me një eksperiencë moderne dhe të organizuar për të gjithë të ftuarit.",
        },
        {
            src: "https://images.pexels.com/photos/32333369/pexels-photo-32333369.jpeg",
            alt: "Festë ditëlindjeje",
            tag: "Festë ditëlindjeje",
            title: "Ditëlindje plot gëzim dhe kujtime të bukura",
            description:
                "Lejo miqtë dhe familjen të ndajnë foto, video dhe mesazhe menjëherë në një album të bukur.",
        },
        {
            src: "https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg",
            alt: "Party event",
            tag: "Momente feste",
            title: "Festat që meritojnë të ruhen me stil",
            description:
                "Nga momentet spontane te energjia e natës, çdo kujtim mblidhet në një vend elegant.",
        },
        {
            src: "https://images.pexels.com/photos/6405665/pexels-photo-6405665.jpeg",
            alt: "Event profesional",
            tag: "Evente profesionale",
            title: "Evente profesionale me prezantim premium",
            description:
                "Një mënyrë elegante për të mbledhur përmbajtje nga eventet korporative dhe organizimet profesionale.",
        },
    ];

    const starterMemories = [
        {
            id: "demo-1",
            url: "https://images.pexels.com/photos/13434417/pexels-photo-13434417.jpeg",
            type: "image/jpeg",
            owner: "EventetSot",
            description: "Momenti i parë i albumit demo.",
        },
        {
            id: "demo-text-1",
            type: "text/plain",
            owner: "Arta",
            description:
                "Një urim i bukur për këtë event. Le të mbetet kujtim për gjithmonë!",
        },
        {
            id: "demo-2",
            url: "https://images.pexels.com/photos/32333369/pexels-photo-32333369.jpeg",
            type: "image/jpeg",
            owner: "Sara",
            description: "Një kujtim i bukur nga festa.",
        },
        {
            id: "demo-3",
            url: "https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg",
            type: "image/jpeg",
            owner: "Ardi",
            description: "Energji, muzikë dhe shumë momente speciale.",
        },
        {
            id: "demo-text-2",
            type: "text/plain",
            owner: "Diona",
            description:
                "Faleminderit për këtë natë kaq të bukur. Çdo detaj ishte perfekt.",
        },
        {
            id: "demo-4",
            url: "https://images.pexels.com/photos/6405665/pexels-photo-6405665.jpeg",
            type: "image/jpeg",
            owner: "Elira",
            description: "Pamje elegante nga eventi.",
        },
        {
            id: "demo-5",
            url: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
            type: "image/jpeg",
            owner: "Lira",
            description: "Një natë që mbetet gjatë në kujtesë.",
        },
        {
            id: "demo-6",
            url: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
            type: "image/jpeg",
            owner: "Nora",
            description: "Atmosferë e bukur dhe shumë buzëqeshje.",
        },
    ];

    const [index, setIndex] = useState(0);
    const [showDemo, setShowDemo] = useState(false);
    const [demoStep, setDemoStep] = useState("event-name");
    const [demoEventName, setDemoEventName] = useState("");
    const [guestName, setGuestName] = useState("");
    const [guestDescription, setGuestDescription] = useState("");
    const [memoryType, setMemoryType] = useState("media");
    const [demoFiles, setDemoFiles] = useState(starterMemories);

    const demoLink = "/demo/eventetsot";

    const fullDemoLink =
        typeof window !== "undefined"
            ? `${window.location.origin}${demoLink}`
            : demoLink;

    const albumTitle = demoEventName || "Albumi Demo";

    const coverPhoto = useMemo(() => {
        return demoFiles.find((file) => file.type?.startsWith("image"));
    }, [demoFiles]);

    const mediaCount = demoFiles.filter((file) => file.type !== "text/plain").length;
    const textCount = demoFiles.filter((file) => file.type === "text/plain").length;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        if (!showDemo) return;

        document.body.style.overflow = "hidden";

        const handleEsc = (e) => {
            if (e.key === "Escape") closeDemo();
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [showDemo]);

    const openDemo = () => {
        setShowDemo(true);
        setDemoStep("event-name");
        setDemoEventName("");
        setGuestName("");
        setGuestDescription("");
        setMemoryType("media");
        setDemoFiles(starterMemories);
    };

    const closeDemo = () => {
        setShowDemo(false);
        setDemoStep("event-name");
    };

    const handleDemoUpload = (e) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        const previews = files.map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
            owner: guestName || "Vizitor",
            description: guestDescription || "Kujtim i shtuar në demo.",
        }));

        setDemoFiles((prev) => [...previews, ...prev]);
        setGuestDescription("");
        e.target.value = "";
    };

    const handleAddTextMemory = () => {
        if (!guestDescription.trim()) return;

        const textMemory = {
            id: `text-${Date.now()}-${Math.random()}`,
            type: "text/plain",
            owner: guestName || "Vizitor",
            description: guestDescription.trim(),
        };

        setDemoFiles((prev) => [textMemory, ...prev]);
        setGuestDescription("");
    };

    return (
        <>
            <section className="relative overflow-hidden bg-[#f9f8ff]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.13),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.13),transparent_24%),linear-gradient(to_bottom,#fcfcff,#f7f8ff)]" />
                <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#7B61FF]/15 blur-3xl" />
                <div className="absolute right-[-100px] bottom-[-80px] h-[260px] w-[260px] rounded-full bg-[#F8A5C2]/15 blur-3xl" />

                <div className="relative mx-auto grid min-h-[95vh] max-w-7xl items-center gap-14 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/90 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                            Përvojë moderne për ndarjen e eventeve
                        </div>

                        <h1 className="mt-7 text-5xl font-black leading-[0.96] tracking-[-0.04em] text-[#111827] sm:text-6xl lg:text-7xl">
                            Mblidh çdo
                            <br />
                            moment të bukur
                            <br />
                            në një{" "}
                            <span className="bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                                eksperiencë elegante
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">
                            Krijo një album modern për eventin tënd ku të ftuarit
                            ndajnë foto, video dhe mesazhe përmes linkut ose kodit QR.
                            E bukur në pamje, e thjeshtë në përdorim dhe perfekte për
                            kujtime që zgjasin përgjithmonë.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="/register"
                                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(123,97,255,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(123,97,255,0.30)]"
                            >
                                Krijo eventin
                                <span className="transition duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                            <button
                                type="button"
                                onClick={openDemo}
                                className="inline-flex items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#7B61FF]/40 hover:bg-[#f8fafc] hover:text-[#7B61FF]"
                            >
                                Shiko demonstrimin
                            </button>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#6B7280]">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                                Link + Kod QR
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                                Foto, video dhe tekst
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
                                Pa nevojë për aplikacion
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[560px]">
                        <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.14),transparent_40%)] blur-3xl" />

                        <div className="absolute left-8 top-8 z-20 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#7B61FF] shadow-[0_12px_30px_rgba(17,24,39,0.08)] backdrop-blur-xl">
                            EKSPERIENCË ELEGANTE PËR EVENTE
                        </div>

                        <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/70 p-3 shadow-[0_30px_80px_rgba(17,24,39,0.12)] backdrop-blur-2xl">
                            <div className="relative overflow-hidden rounded-[28px]">
                                <div className="relative h-[600px] w-full overflow-hidden">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.src}
                                            alt={img.alt}
                                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                                                i === index
                                                    ? "scale-100 opacity-100"
                                                    : "scale-105 opacity-0"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,24,39,0.60),rgba(17,24,39,0.16),transparent)]" />

                                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                                        {images[index].tag}
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-[2rem]">
                                        {images[index].title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-white/80 sm:text-[15px]">
                                        {images[index].description}
                                    </p>

                                    <div className="mt-5 flex items-center gap-2">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setIndex(i)}
                                                aria-label={`Shko te slajdi ${i + 1}`}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                                    i === index
                                                        ? "w-8 bg-white"
                                                        : "w-2.5 bg-white/45"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {["Dasma", "Ditëlindje", "Festa", "Korporata"].map(
                                    (item) => (
                                        <div
                                            key={item}
                                            className="rounded-[20px] border border-[#EEF2F6] bg-white px-4 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                        >
                                            <p className="text-sm font-semibold text-[#111827]">
                                                {item}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showDemo && (
                <div
                    className="fixed inset-0 z-[9999] bg-[#03020a]/80 px-3 py-4 backdrop-blur-xl md:px-6"
                    onClick={closeDemo}
                >
                    <div
                        className="relative mx-auto max-h-[94vh] w-full max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-[#07050c] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.25),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.18),transparent_35%)]" />

                        <button
                            type="button"
                            onClick={closeDemo}
                            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl font-black text-white backdrop-blur-xl transition hover:bg-white/20"
                        >
                            ×
                        </button>

                        <div className="relative max-h-[94vh] overflow-y-auto">
                            {demoStep !== "album" && (
                                <DemoWizard
                                    demoStep={demoStep}
                                    setDemoStep={setDemoStep}
                                    demoEventName={demoEventName}
                                    setDemoEventName={setDemoEventName}
                                    fullDemoLink={fullDemoLink}
                                    images={images}
                                />
                            )}

                            {demoStep === "album" && (
                                <DemoAlbum
                                    albumTitle={albumTitle}
                                    demoFiles={demoFiles}
                                    coverPhoto={coverPhoto}
                                    guestName={guestName}
                                    setGuestName={setGuestName}
                                    guestDescription={guestDescription}
                                    setGuestDescription={setGuestDescription}
                                    memoryType={memoryType}
                                    setMemoryType={setMemoryType}
                                    handleDemoUpload={handleDemoUpload}
                                    handleAddTextMemory={handleAddTextMemory}
                                    setDemoStep={setDemoStep}
                                    mediaCount={mediaCount}
                                    textCount={textCount}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function DemoWizard({
    demoStep,
    setDemoStep,
    demoEventName,
    setDemoEventName,
    fullDemoLink,
    images,
}) {
    return (
        <div className="grid min-h-[780px] grid-cols-1 bg-[#080611] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#ffffff,#f8f5ff,#eef6ff)] p-8 text-[#111827] md:p-12">
    
    {/* GLOW EFFECTS */}
    <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#7B61FF]/20 blur-3xl" />
    <div className="absolute bottom-[-140px] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#6EC3F4]/20 blur-3xl" />
    <div className="absolute top-[40%] left-[50%] h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-[#F8A5C2]/15 blur-3xl" />

    {/* GRID */}
    <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>

    <div className="relative flex min-h-full flex-col justify-between">
        
        <div>
            
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9DFFF] bg-white/80 px-5 py-2 shadow-lg backdrop-blur-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                
                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#7B61FF]">
                    Demo interaktive
                </span>
            </div>

            {/* TITLE */}
            <h2 className="mt-7 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111827] md:text-7xl">
                Shiko si
                <br />
                funksionon
                <br />
                <span className="bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                    eventi yt
                </span>
            </h2>

            {/* TEXT */}
            <p className="mt-7 max-w-xl text-[15px] leading-8 text-slate-600 md:text-base">
                Shkruaj emrin e eventit dhe provo menjëherë një eksperiencë reale.
                Vizitorët mund të shtojnë foto, video dhe mesazhe pa login,
                direkt nga telefoni i tyre.
            </p>

            {/* MINI CARDS */}
            <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                        Foto & Video
                    </p>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                        QR Code
                    </p>
                </div>

                <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                        Pa Login
                    </p>
                </div>
            </div>
        </div>

        {/* QR SECTION */}
        <div className="relative mt-12 overflow-hidden rounded-[34px] border border-white/70 bg-white/70 p-5 shadow-[0_25px_80px_rgba(123,97,255,0.15)] backdrop-blur-2xl">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.12),transparent_35%)]" />

            <div className="relative grid items-center gap-5 sm:grid-cols-[auto_1fr]">
                
                <div className="mx-auto rounded-[28px] bg-white p-4 shadow-[0_15px_35px_rgba(17,24,39,0.08)]">
                    <QRCodeCanvas
                        value={fullDemoLink}
                        size={135}
                        bgColor="#ffffff"
                        fgColor="#111827"
                        level="H"
                        includeMargin
                    />
                </div>

                <div>
                    <div className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#7B61FF]">
                        Scan & Join
                    </div>

                    <h3 className="mt-4 text-2xl font-black text-[#111827]">
                        QR Code Demo
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                        Skano kodin për të hyrë direkt në albumin demo dhe provo
                        eksperiencën që do të kenë pjesëmarrësit në eventin tënd.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

            <div className="relative flex items-center justify-center overflow-hidden bg-[#05030A] p-6 md:p-12">
    
    {/* BACKGROUND GLOWS */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.14),transparent_30%)]" />

    {/* GRID */}
    <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:42px_42px]" />
    </div>

    <div className="relative w-full max-w-xl">
        
        {/* FLOATING IMAGES */}
        <div className="relative mb-8 flex items-center justify-center gap-4">
            {images.slice(0, 3).map((img, i) => (
                <div
                    key={img.src}
                    className={`
                        relative overflow-hidden rounded-[2rem]
                        border border-white/10
                        bg-white/10
                        p-1.5
                        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                        backdrop-blur-xl
                        transition duration-500 hover:-translate-y-2
                        ${i === 0 ? "rotate-[-6deg]" : ""}
                        ${i === 1 ? "z-10 scale-110" : ""}
                        ${i === 2 ? "rotate-[6deg]" : ""}
                    `}
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="h-36 w-28 rounded-[1.5rem] object-cover md:h-44 md:w-36"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
            ))}
        </div>

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.08] p-7 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-9">
            
            {/* CARD GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.12),transparent_35%)]" />

            <div className="relative">
                {demoStep === "event-name" && (
                    <>
                        {/* BADGE */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-violet-300" />

                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-200">
                                Demo Experience
                            </span>
                        </div>

                        {/* TITLE */}
                        <h3 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-5xl">
                            Krijo
                            <br />
                            albumin tënd
                            <br />
                            <span className="bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                                demo
                            </span>
                        </h3>

                        {/* TEXT */}
                        <p className="mt-5 max-w-md text-sm leading-7 text-white/60 md:text-[15px]">
                            Shkruaj emrin e eventit dhe shiko menjëherë si do
                            të duket eksperienca për pjesëmarrësit e tu.
                        </p>

                        {/* INPUT */}
                        <div className="mt-7">
                            <label className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/40">
                                Emri i eventit
                            </label>

                            <input
                                value={demoEventName}
                                onChange={(e) => setDemoEventName(e.target.value)}
                                placeholder="p.sh. Dasma e Albës & Ardit"
                                className="
                                    w-full rounded-[1.4rem]
                                    border border-white/10
                                    bg-white
                                    px-5 py-4
                                    text-base font-bold text-[#111827]
                                    shadow-[0_15px_35px_rgba(255,255,255,0.08)]
                                    outline-none
                                    transition
                                    focus:border-violet-300
                                    focus:ring-4 focus:ring-violet-300/20
                                "
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="button"
                            onClick={() => setDemoStep("album")}
                            disabled={!demoEventName.trim()}
                            className="
                                group relative mt-6 w-full overflow-hidden
                                rounded-[1.4rem]
                                bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)]
                                px-6 py-4
                                text-sm font-black text-white
                                shadow-[0_20px_50px_rgba(123,97,255,0.35)]
                                transition duration-300
                                hover:-translate-y-1
                                hover:shadow-[0_25px_65px_rgba(123,97,255,0.45)]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Hap albumin demo
                                
                                <span className="transition duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>

                            <div className="absolute inset-0 bg-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                        </button>
                    </>
                )}
            </div>
        </div>
    </div>
</div>
        </div>
    );
}

function DemoAlbum({
    albumTitle,
    demoFiles,
    coverPhoto,
    guestName,
    setGuestName,
    guestDescription,
    setGuestDescription,
    memoryType,
    setMemoryType,
    handleDemoUpload,
    handleAddTextMemory,
    setDemoStep,
    mediaCount,
    textCount,
}) {
    const albumImages = useMemo(() => {
        return demoFiles.filter((file) => file.type?.startsWith("image"));
    }, [demoFiles]);

    const [coverIndex, setCoverIndex] = useState(0);

    useEffect(() => {
        if (!albumImages.length) return;

        const interval = setInterval(() => {
            setCoverIndex((prev) => (prev + 1) % albumImages.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [albumImages.length]);

    useEffect(() => {
        if (coverIndex > albumImages.length - 1) {
            setCoverIndex(0);
        }
    }, [albumImages.length, coverIndex]);

    const activeCover = albumImages[coverIndex] || coverPhoto;

    return (
        <main className="min-h-[94vh] bg-[#07050c] text-white">
            <section className="relative min-h-[700px] overflow-hidden">
                {activeCover ? (
                    <img
                        key={activeCover.id}
                        src={activeCover.url}
                        alt={albumTitle}
                        className="absolute inset-0 h-full w-full animate-[fadeCover_1s_ease-in-out] object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-700 to-pink-500" />
                )}

                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07050c] via-[#07050c]/20 to-black/40" />

                <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
                    <button
                        type="button"
                        onClick={() => setDemoStep("event-name")}
                        className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-black backdrop-blur-xl transition hover:bg-white/20"
                    >
                        ← Ndrysho emrin
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-black backdrop-blur-xl">
                            Demo Album
                        </span>
                    </div>
                </header>

                <div className="relative z-10 grid min-h-[640px] items-end gap-10 px-5 pb-12 md:px-10 lg:grid-cols-[1fr_0.85fr]">
    
    {/* LEFT CONTENT */}
    <div className="max-w-5xl">
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-violet-100 backdrop-blur-xl">
            Album Highlight
        </span>

        <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] md:text-8xl">
            {albumTitle}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            Kjo është pamja demo e albumit që pjesëmarrësit do ta
            shohin nga linku ose QR code. Ata mund të shtojnë foto,
            video ose mesazhe pa u kyçur.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur-xl">
                {mediaCount} foto/video
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur-xl">
                {textCount} mesazhe
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-black backdrop-blur-xl">
                Pa login
            </div>
        </div>
    </div>

    {/* RIGHT HIGHLIGHT */}
    {albumImages.length > 0 && (
        <div className="hidden lg:block">
            <div className="relative">
                
                {/* GLOW */}
                <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.35),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.25),transparent_40%)] blur-3xl" />

                <div className="relative rounded-[36px] border border-white/15 bg-white/10 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                    
                    {/* MAIN IMAGE */}
                    <div className="overflow-hidden rounded-[28px]">
                        <img
                            src={activeCover?.url}
                            alt="Highlight"
                            className="h-[360px] w-full object-cover transition duration-700"
                        />
                    </div>

                    {/* THUMBNAILS */}
                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {albumImages.slice(0, 4).map((image, i) => (
                            <button
                                key={image.id}
                                type="button"
                                onClick={() => setCoverIndex(i)}
                                className={`group overflow-hidden rounded-2xl border p-1 transition duration-300 ${
                                    coverIndex === i
                                        ? "border-white bg-white shadow-[0_15px_40px_rgba(255,255,255,0.18)]"
                                        : "border-white/15 bg-white/10 hover:-translate-y-1 hover:bg-white/20"
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt="Foto highlight"
                                    className="h-20 w-full rounded-xl object-cover transition duration-500 group-hover:scale-110"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )}
</div>
            </section>

            <section className="px-4 py-8 md:px-8 md:py-12">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                    <div className="h-max rounded-[32px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-200">
                            Shto kujtimin tënd
                        </p>

                        <h2 className="mt-3 text-2xl font-black">
                            Foto, video ose vetëm tekst
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-white/60">
                            Vizitorët mund të shtojnë foto, video ose një mesazh të
                            shkurtër pa pasur nevojë të kyçen.
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white/5 p-1">
                            <button
                                type="button"
                                onClick={() => setMemoryType("media")}
                                className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                                    memoryType === "media"
                                        ? "bg-white text-[#111827]"
                                        : "text-white/60 hover:bg-white/10"
                                }`}
                            >
                                Foto / Video
                            </button>

                            <button
                                type="button"
                                onClick={() => setMemoryType("text")}
                                className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                                    memoryType === "text"
                                        ? "bg-white text-[#111827]"
                                        : "text-white/60 hover:bg-white/10"
                                }`}
                            >
                                Vetëm tekst
                            </button>
                        </div>

                        <input
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Emri yt"
                            className="mt-5 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-[#111827] outline-none"
                        />

                        <textarea
                            value={guestDescription}
                            onChange={(e) => setGuestDescription(e.target.value)}
                            placeholder={
                                memoryType === "text"
                                    ? "Shkruaj një urim, kujtim ose mesazh..."
                                    : "Përshkrimi i fotos/videos"
                            }
                            rows={4}
                            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-[#111827] outline-none"
                        />

                        {memoryType === "media" ? (
                            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300/35 bg-violet-400/10 px-5 py-8 text-center transition hover:bg-violet-400/15">
                                <span className="text-sm font-black text-violet-100">
                                    Zgjidh foto/video
                                </span>

                                <span className="mt-1 text-xs text-white/45">
                                    Shtohet menjëherë në albumin demo
                                </span>

                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    multiple
                                    onChange={handleDemoUpload}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAddTextMemory}
                                disabled={!guestDescription.trim()}
                                className="mt-4 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-5 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Shto mesazhin në album
                            </button>
                        )}
                    </div>

                    <div>
                        <div className="mb-6">
                            <p className="text-sm font-black uppercase tracking-[0.22em] text-pink-300">
                                Galeria demo
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-5xl">
                                Si do të duket eventi
                            </h2>
                        </div>

                        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
                            {demoFiles.map((file, index) => (
                                <DemoMemoryCard
                                    key={file.id}
                                    file={file}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function DemoMemoryCard({ file, index }) {
    const sizes = [
        "aspect-[4/5]",
        "aspect-square",
        "aspect-[3/4]",
        "aspect-[5/4]",
        "aspect-[4/3]",
    ];

    if (file.type === "text/plain") {
        return (
            <article className="mb-4 break-inside-avoid overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.16),transparent_36%),rgba(255,255,255,0.07)] p-6 shadow-2xl shadow-black/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                    “
                </div>

                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-200/70">
                    Mesazh nga
                </p>

                <h3 className="mt-1 text-lg font-black text-white">
                    {file.owner || "Vizitor"}
                </h3>

                <p className="mt-4 text-base leading-8 text-white/75">
                    “{file.description}”
                </p>
            </article>
        );
    }

    return (
        <article className="group mb-4 break-inside-avoid overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30">
            <div className={`relative ${sizes[index % sizes.length]}`}>
                {file.type?.startsWith("video") ? (
                    <video
                        src={file.url}
                        controls
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <img
                        src={file.url}
                        alt={file.description || file.name || "Demo"}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
                        Nga
                    </p>

                    <h3 className="text-base font-black">
                        {file.owner || "Vizitor"}
                    </h3>

                    {file.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
                            {file.description}
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}