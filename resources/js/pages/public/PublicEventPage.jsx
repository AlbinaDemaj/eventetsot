import { useEffect, useMemo, useState } from "react";
import imageCompression from "browser-image-compression";

export default function PublicEventPage({ event = {}, uploadUrl = "" }) {
    const [media, setMedia] = useState(event?.media || []);
    const [selected, setSelected] = useState(null);

    const [guestName, setGuestName] = useState("");
    const [guestText, setGuestText] = useState("");
    const [uploadType, setUploadType] = useState("media");
    const [heroSlide, setHeroSlide] = useState(0);

    const FREE_LIMIT = 5;

    const getCsrfToken = () =>
        document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const guestUploadUrl =
        uploadUrl || (event?.code ? `/events/${event.code}/guest-media` : "");

    const cleanValue = (value) => {
        if (!value) return "";
        if (value === "null" || value === "undefined") return "";
        return value;
    };

    const mediaUrl = (item) =>
        cleanValue(item?.thumbnail_path || item?.thumbnail_url || item?.file_path || item?.url || "");

    const fullMediaUrl = (item) =>
        cleanValue(item?.file_path || item?.url || item?.thumbnail_path || item?.thumbnail_url || "");

    const getTextValue = (item) => {
        return String(
            item?.caption_text ||
                item?.text_content ||
                item?.message ||
                item?.body ||
                item?.text ||
                item?.content ||
                item?.note ||
                item?.description ||
                ""
        ).trim();
    };

    const getPersonName = (item) => {
        return String(
            item?.caption_name ||
                item?.author_name ||
                item?.guest_name ||
                item?.sender_name ||
                item?.name ||
                "I ftuar"
        ).trim();
    };

    const isVideo = (item) => {
        const fileType = String(item?.file_type || item?.type || "").toLowerCase();
        return fileType.startsWith("video");
    };

    const isText = (item) => {
        const type = String(item?.type || "").toLowerCase().trim();
        const fileType = String(item?.file_type || "").toLowerCase().trim();
        const url = mediaUrl(item);
        const text = getTextValue(item);

        if (
            type === "text" ||
            type === "message" ||
            type === "text/plain" ||
            fileType === "text/plain"
        ) {
            return true;
        }

        if (!url && text) return true;

        return false;
    };

    const isPremium =
        event?.is_premium ||
        event?.user?.active_subscription?.plan?.price > 0 ||
        event?.user?.active_subscription?.plan?.name === "Plus" ||
        event?.plan === "premium" ||
        event?.plan_name === "Premium" ||
        event?.plan_name === "Plus";

    const totalMemories = media.length;

    const remainingSlots = isPremium
        ? Infinity
        : Math.max(FREE_LIMIT - totalMemories, 0);

    const canAddMore = isPremium || totalMemories < FREE_LIMIT;

    const galleryMedia = useMemo(
        () => media.filter((item) => !isText(item) && mediaUrl(item)),
        [media]
    );

    const cover = useMemo(() => {
        return galleryMedia?.find((item) => !isVideo(item)) || galleryMedia?.[0] || null;
    }, [galleryMedia]);

    const heroSlides = useMemo(
        () => galleryMedia.filter((item) => !isVideo(item)),
        [galleryMedia]
    );

    const activeHero = heroSlides[heroSlide] || cover;

    const mediaCount = galleryMedia.length;
    const textCount = media.filter((item) => isText(item)).length;

    useEffect(() => {
        if (heroSlides.length <= 1) return;

        const interval = setInterval(() => {
            setHeroSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    useEffect(() => {
        if (heroSlide >= heroSlides.length) {
            setHeroSlide(0);
        }
    }, [heroSlides.length, heroSlide]);

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") setSelected(null);
        };

        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, []);

    const openNext = () => {
        if (selected === null || galleryMedia.length === 0) return;

        const currentItem = media[selected];
        const currentGalleryIndex = galleryMedia.findIndex(
            (item) => item.id === currentItem?.id
        );

        const nextGalleryItem =
            galleryMedia[(currentGalleryIndex + 1) % galleryMedia.length];

        setSelected(media.findIndex((item) => item.id === nextGalleryItem.id));
    };

    const openPrev = () => {
        if (selected === null || galleryMedia.length === 0) return;

        const currentItem = media[selected];
        const currentGalleryIndex = galleryMedia.findIndex(
            (item) => item.id === currentItem?.id
        );

        const prevGalleryItem =
            galleryMedia[
                (currentGalleryIndex - 1 + galleryMedia.length) %
                    galleryMedia.length
            ];

        setSelected(media.findIndex((item) => item.id === prevGalleryItem.id));
    };

    const compressImage = async (file) => {
        if (!file.type.startsWith("image/")) return file;

        try {
            return await imageCompression(file, {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1600,
                useWebWorker: true,
                initialQuality: 0.82,
            });
        } catch (error) {
            console.error("Image compression failed:", error);
            return file;
        }
    };

    const handleGuestUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        if (!canAddMore) {
            e.target.value = "";
            return;
        }

        const allowedFiles = isPremium ? files : files.slice(0, remainingSlots);

        for (let file of allowedFiles) {
            file = await compressImage(file);

            const formData = new FormData();

            const nameToSave = guestName.trim() || "I ftuar";
            const textToSave = guestText.trim();

            formData.append("file", file);
            formData.append("name", nameToSave);
            formData.append("text", textToSave);
            formData.append("caption_name", nameToSave);
            formData.append("caption_text", textToSave);

            const res = await fetch(guestUploadUrl, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                body: formData,
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message || "Nuk u ruajt kujtimi.");
                break;
            }

            const savedMedia = result.data || result;
            setMedia((prev) => [savedMedia, ...prev]);
        }

        setGuestText("");
        e.target.value = "";
    };

    const handleAddText = async () => {
        if (!guestText.trim()) return;
        if (!canAddMore) return;

        const textToSave = guestText.trim();
        const nameToSave = guestName.trim() || "I ftuar";

        const formData = new FormData();

        formData.append("type", "text");
        formData.append("file_type", "text/plain");
        formData.append("name", nameToSave);
        formData.append("text", textToSave);
        formData.append("caption_name", nameToSave);
        formData.append("caption_text", textToSave);
        formData.append("text_content", textToSave);

        const res = await fetch(guestUploadUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": getCsrfToken(),
            },
            body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.message || "Nuk u ruajt mesazhi.");
            return;
        }

        const savedMedia = result.data || result;

        const normalizedText = {
            ...savedMedia,
            type: "text",
            file_type: "text/plain",
            file_path: null,
            url: null,
            caption_name:
                savedMedia.caption_name ||
                savedMedia.name ||
                nameToSave,
            caption_text:
                savedMedia.caption_text ||
                savedMedia.text_content ||
                savedMedia.message ||
                savedMedia.text ||
                textToSave,
            text_content:
                savedMedia.text_content ||
                savedMedia.caption_text ||
                savedMedia.message ||
                savedMedia.text ||
                textToSave,
        };

        setMedia((prev) => [normalizedText, ...prev]);
        setGuestText("");
    };

    return (
        <main className="min-h-screen bg-white text-[#111827]">
            <section className="relative min-h-screen overflow-hidden bg-[#111827]">
                {activeHero ? (
                    <img
                        key={activeHero.id || mediaUrl(activeHero)}
                        src={mediaUrl(activeHero)}
                        alt={event?.name || "Event"}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 will-change-transform"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#7B61FF_0,transparent_32%),radial-gradient(circle_at_80%_10%,#F8A5C2_0,transparent_30%),radial-gradient(circle_at_60%_85%,#6EC3F4_0,transparent_35%),linear-gradient(135deg,#111827,#2b174f,#0f172a)]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-[#111827]/55 to-[#111827]/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/25" />

                <header className="relative z-10 flex items-center justify-between px-5 py-6 md:px-10">
                    <h1 className="logo-yellowtail text-[3rem] leading-none">
                        <span className="bg-[linear-gradient(135deg,#ffffff,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                            eventetsot.
                        </span>
                    </h1>
                </header>

                <div className="relative z-10 flex min-h-[calc(100vh-92px)] items-end px-5 pb-10 md:px-10 md:pb-16">
                    <div className="grid w-full items-end gap-8 lg:grid-cols-[1fr_420px]">
                        <div>
                            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl">
                                Galeri digjitale e eventit
                            </div>

                            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-white drop-shadow-2xl md:text-8xl">
                                {event?.name || "Event Album"}
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                                Shto foto, video ose një mesazh të bukur në albumin e
                                eventit. Nuk ke nevojë të kyçesh.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <span className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-sm font-black text-white backdrop-blur-xl">
                                    {mediaCount} foto/video
                                </span>

                                <span className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-sm font-black text-white backdrop-blur-xl">
                                    {textCount} mesazhe
                                </span>

                                <span className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-sm font-black text-white backdrop-blur-xl">
                                    {isPremium
                                        ? "Pa limit"
                                        : `${totalMemories}/${FREE_LIMIT} vendosje`}
                                </span>
                            </div>
                        </div>

                        <GuestAddCard
                            guestName={guestName}
                            setGuestName={setGuestName}
                            guestText={guestText}
                            setGuestText={setGuestText}
                            uploadType={uploadType}
                            setUploadType={setUploadType}
                            handleGuestUpload={handleGuestUpload}
                            handleAddText={handleAddText}
                            isPremium={isPremium}
                            canAddMore={canAddMore}
                            remainingSlots={remainingSlots}
                            totalMemories={totalMemories}
                            freeLimit={FREE_LIMIT}
                            eventName={event?.name}
                        />
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#F9FAFB] px-4 py-10 md:px-8 md:py-14">
                <div className="absolute left-[-120px] top-20 h-80 w-80 rounded-full bg-[#C4B5FD]/40 blur-3xl" />
                <div className="absolute right-[-120px] top-80 h-80 w-80 rounded-full bg-[#FBCFE8]/50 blur-3xl" />

                {media.length === 0 ? (
                    <EmptyAlbum isPremium={isPremium} freeLimit={FREE_LIMIT} />
                ) : (
                    <div className="relative mx-auto max-w-7xl">
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7B61FF]">
                                    Kujtimet
                                </p>

                                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#111827] md:text-5xl">
                                    Galeria e festës
                                </h2>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6B7280]">
                                    Çdo pjesëmarrës mund të shtojë kujtime direkt nga
                                    telefoni.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#C4B5FD]/70 bg-white px-5 py-3 text-sm font-black text-[#7B61FF] shadow-lg shadow-[#C4B5FD]/25">
                                {media.length} momente
                            </div>
                        </div>

                        {galleryMedia.length > 0 && (
                            <div className="mb-10 flex gap-4 overflow-x-auto pb-3">
                                {galleryMedia.slice(0, 14).map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            setSelected(
                                                media.findIndex((m) => m.id === item.id)
                                            )
                                        }
                                        className="group min-w-[92px]"
                                    >
                                        <div className="rounded-full bg-gradient-to-br from-[#7B61FF] via-[#F8A5C2] to-[#6EC3F4] p-[3px] shadow-lg shadow-[#C4B5FD]/40">
                                            <div className="h-[86px] w-[86px] overflow-hidden rounded-full border-4 border-white bg-[#F5F5F7]">
                                                <MediaThumb
                                                    item={item}
                                                    mediaUrl={mediaUrl}
                                                    isVideo={isVideo}
                                                />
                                            </div>
                                        </div>

                                        <p className="mt-2 truncate text-center text-xs font-bold text-[#6B7280]">
                                            {getPersonName(item)}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="grid auto-rows-min grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                            {media.map((item, index) => (
                                <ExploreCard
                                    key={item.id || index}
                                    item={item}
                                    index={index}
                                    mediaUrl={mediaUrl}
                                    isVideo={isVideo}
                                    isText={isText}
                                    getTextValue={getTextValue}
                                    getPersonName={getPersonName}
                                    onClick={() => !isText(item) && setSelected(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {selected !== null && media[selected] && !isText(media[selected]) && (
                <PreviewModal
                    media={galleryMedia}
                    selected={galleryMedia.findIndex(
                        (item) => item.id === media[selected]?.id
                    )}
                    item={media[selected]}
                    mediaUrl={fullMediaUrl}
                    isVideo={isVideo}
                    getTextValue={getTextValue}
                    getPersonName={getPersonName}
                    onClose={() => setSelected(null)}
                    onNext={openNext}
                    onPrev={openPrev}
                />
            )}
        </main>
    );
}

function GuestAddCard({
    guestName,
    setGuestName,
    guestText,
    setGuestText,
    uploadType,
    setUploadType,
    handleGuestUpload,
    handleAddText,
    isPremium,
    canAddMore,
    remainingSlots,
    totalMemories,
    freeLimit,
    eventName,
}) {
    const whatsappMessage = eventName
        ? `Pershendetje, dua te aktivizoj Premium per eventin: ${eventName}`
        : "Pershendetje, dua te aktivizoj Premium per eventin tim ne EventetSot.";

    const whatsappUrl = `https://wa.me/38348568568?text=${encodeURIComponent(
        whatsappMessage
    )}`;

    return (
        <div className="rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-2xl backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                Shto në album
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
                Ndaje kujtimin tënd
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/65">
                Shto foto, video ose vetëm një mesazh për eventin.
            </p>

            <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-white/55">
                            Plani aktual
                        </p>

                        <p className="mt-1 text-sm font-black text-white">
                            {isPremium
                                ? "Premium - pa limit"
                                : "Free - deri në 5 vendosje"}
                        </p>
                    </div>

                    {!isPremium && (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#7B61FF]">
                            {totalMemories}/{freeLimit}
                        </span>
                    )}
                </div>

                {!isPremium && (
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                        <div
                            className="h-full rounded-full bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] transition-all"
                            style={{
                                width: `${Math.min(
                                    (totalMemories / freeLimit) * 100,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                )}

                {!isPremium && canAddMore && (
                    <p className="mt-3 text-xs font-semibold text-white/60">
                        Mund të shtohen edhe {remainingSlots} kujtime.
                    </p>
                )}

                {!canAddMore && !isPremium && (
                    <div className="mt-4 rounded-2xl border border-white/20 bg-white p-4 shadow-xl">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                            Limiti Free u plotësua
                        </p>

                        <h3 className="mt-2 text-lg font-black text-[#111827]">
                            Ke arritur 5 vendosje
                        </h3>

                        <p className="mt-2 text-sm font-semibold leading-6 text-[#6B7280]">
                            Për të shtuar më shumë foto, video dhe mesazhe, aktivizo planin Premium.
                        </p>

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                        >
                            Kontakto në WhatsApp për Premium
                        </a>
                    </div>
                )}
            </div>

            {canAddMore && (
                <>
                    <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1">
                        <button
                            type="button"
                            onClick={() => setUploadType("media")}
                            className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                                uploadType === "media"
                                    ? "bg-white text-[#111827]"
                                    : "text-white/65 hover:bg-white/10"
                            }`}
                        >
                            Foto / Video
                        </button>

                        <button
                            type="button"
                            onClick={() => setUploadType("text")}
                            className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                                uploadType === "text"
                                    ? "bg-white text-[#111827]"
                                    : "text-white/65 hover:bg-white/10"
                            }`}
                        >
                            Vetëm tekst
                        </button>
                    </div>

                    <input
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Emri yt"
                        className="mt-4 w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-[#111827] outline-none"
                    />

                    <textarea
                        value={guestText}
                        onChange={(e) => setGuestText(e.target.value)}
                        placeholder={
                            uploadType === "text"
                                ? "Shkruaj një urim ose kujtim..."
                                : "Përshkrimi i fotos/videos..."
                        }
                        rows={4}
                        className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-[#111827] outline-none"
                    />

                    {uploadType === "media" ? (
                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/10 px-5 py-8 text-center transition hover:bg-white/15">
                            <span className="text-sm font-black text-white">
                                Zgjidh foto/video
                            </span>

                            <span className="mt-1 text-xs text-white/50">
                                {isPremium
                                    ? "Do të shfaqet menjëherë në galeri"
                                    : `Mund të shtosh edhe ${remainingSlots} kujtime`}
                            </span>

                            <input
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                onChange={handleGuestUpload}
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <button
                            type="button"
                            onClick={handleAddText}
                            disabled={!guestText.trim()}
                            className="mt-4 w-full rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-5 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Shto mesazhin
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

function MediaThumb({ item, mediaUrl, isVideo }) {
    if (isVideo(item)) {
        return (
            <video
                src={mediaUrl(item)}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
            />
        );
    }

    return (
        <img
            src={mediaUrl(item)}
            alt={item?.caption_text || "Event media"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
        />
    );
}

function ExploreCard({
    item,
    index,
    mediaUrl,
    isVideo,
    isText,
    getTextValue,
    getPersonName,
    onClick,
}) {
    const personName = getPersonName(item);
    const description = getTextValue(item);

    if (isText(item)) {
        return (
            <div className="group relative col-span-2 h-max overflow-hidden rounded-[1.5rem] border border-[#E9D5FF] bg-white p-[1px] shadow-lg shadow-[#C4B5FD]/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#A78BFA]/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.16),transparent_36%)]" />

                <div className="relative rounded-[1.45rem] bg-white/95 p-5 backdrop-blur-xl">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#F8A5C2)] text-sm font-black text-white shadow-md shadow-[#C4B5FD]/35">
                            {personName.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9CA3AF]">
                                Mesazh nga
                            </p>

                            <h3 className="mt-0.5 text-base font-black text-[#111827]">
                                {personName}
                            </h3>

                            <p className="mt-3 text-sm font-semibold leading-7 text-[#4B5563]">
                                {description || "Mesazhi nuk u ruajt si tekst."}
                            </p>

                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#F3E8FF] pt-3">
                                <span className="text-xs font-bold text-[#9CA3AF]">
                                    Shtuar në album
                                </span>

                                <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-[11px] font-black text-[#7B61FF]">
                                    Mesazh
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const size =
        index % 10 === 0
            ? "col-span-2 row-span-2"
            : index % 7 === 0
            ? "col-span-2"
            : index % 5 === 0
            ? "row-span-2"
            : "";

    return (
        <button
            onClick={onClick}
            className={`group relative min-h-[170px] overflow-hidden rounded-[1.5rem] bg-[#F5F5F7] text-left shadow-xl shadow-[#C4B5FD]/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#A78BFA]/35 md:min-h-[210px] ${size}`}
        >
            <MediaThumb item={item} mediaUrl={mediaUrl} isVideo={isVideo} />

            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/15 to-transparent opacity-70 transition group-hover:opacity-100" />

            {isVideo(item) && (
                <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#7B61FF] backdrop-blur">
                    Video
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs font-black backdrop-blur">
                        {personName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                            {personName}
                        </p>

                        {description && (
                            <p className="line-clamp-1 text-xs text-white/70">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
}

function PreviewModal({
    media,
    selected,
    item,
    mediaUrl,
    isVideo,
    getTextValue,
    getPersonName,
    onClose,
    onNext,
    onPrev,
}) {
    const personName = getPersonName(item);
    const description = getTextValue(item);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/95 p-3 backdrop-blur-xl">
            <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-black text-[#111827] shadow-xl"
            >
                ×
            </button>

            {media.length > 1 && (
                <>
                    <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-[#111827] shadow-xl md:flex"
                    >
                        ‹
                    </button>

                    <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-[#111827] shadow-xl md:flex"
                    >
                        ›
                    </button>
                </>
            )}

            <div className="grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1fr_380px]">
                <div className="flex max-h-[92vh] items-center justify-center bg-black">
                    {isVideo(item) ? (
                        <video
                            src={mediaUrl(item)}
                            controls
                            autoPlay
                            preload="metadata"
                            className="max-h-[92vh] w-full object-contain"
                        />
                    ) : (
                        <img
                            src={mediaUrl(item)}
                            alt={description || "Event media"}
                            loading="eager"
                            decoding="async"
                            className="max-h-[92vh] w-full object-contain"
                        />
                    )}
                </div>

                <aside className="flex flex-col bg-white p-5 text-[#111827]">
                    <div className="flex items-center gap-3 border-b border-[#F5F5F7] pb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7B61FF] to-[#F8A5C2] text-sm font-black text-white">
                            {personName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9CA3AF]">
                                Kujtim nga
                            </p>
                            <h3 className="text-lg font-black">{personName}</h3>
                        </div>
                    </div>

                    <div className="flex-1 py-5">
                        <p className="text-sm leading-7 text-[#6B7280]">
                            {description || "Pa përshkrim të shtuar."}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-[#F9FAFB] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                            Albumi
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#111827]">
                            {selected + 1} nga {media.length} momente
                        </p>
                    </div>

                    {media.length > 1 && (
                        <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
                            <button
                                onClick={onPrev}
                                className="rounded-2xl bg-[#F5F5F7] px-4 py-3 font-black text-[#7B61FF]"
                            >
                                ‹ Para
                            </button>

                            <button
                                onClick={onNext}
                                className="rounded-2xl bg-[#7B61FF] px-4 py-3 font-black text-white"
                            >
                                Pas ›
                            </button>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}

function EmptyAlbum({ isPremium, freeLimit }) {
    return (
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#C4B5FD]/60 bg-white p-10 text-center shadow-2xl shadow-[#C4B5FD]/25">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#FBCFE8] text-4xl font-black text-white">
                ♡
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#111827]">
                Albumi është ende bosh
            </h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-[#6B7280]">
                Fotot, videot dhe mesazhet e eventit do të shfaqen këtu sapo
                pjesëmarrësit t’i shtojnë.
            </p>

            {!isPremium && (
                <p className="mx-auto mt-4 max-w-md rounded-2xl bg-[#F5F3FF] px-4 py-3 text-sm font-black text-[#7B61FF]">
                    Plani Free lejon deri në {freeLimit} vendosje gjithsej.
                </p>
            )}
        </div>
    );
}