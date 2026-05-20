import { useEffect, useMemo, useState } from "react";
import imageCompression from "browser-image-compression";

export default function PublicEventPage({ event = {}, uploadUrl = "" }) {
    const [media, setMedia] = useState(event?.media || []);
    const [selected, setSelected] = useState(null);
    const [showUpload, setShowUpload] = useState(false);

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
        if (!value || value === "null" || value === "undefined") return "";
        return value;
    };

    const mediaUrl = (item) =>
        cleanValue(item?.thumbnail_path || item?.thumbnail_url || item?.file_path || item?.url || "");

    const fullMediaUrl = (item) =>
        cleanValue(item?.file_path || item?.url || item?.thumbnail_path || item?.thumbnail_url || "");

    const getTextValue = (item) =>
        String(item?.caption_text || item?.text_content || item?.message || item?.body || item?.text || item?.content || item?.note || item?.description || "").trim();

    const getPersonName = (item) =>
        String(item?.caption_name || item?.author_name || item?.guest_name || item?.sender_name || item?.name || "I ftuar").trim();

    const isVideo = (item) => {
        const fileType = String(item?.file_type || item?.type || "").toLowerCase();
        return fileType.startsWith("video");
    };

    const isText = (item) => {
        const type = String(item?.type || "").toLowerCase().trim();
        const fileType = String(item?.file_type || "").toLowerCase().trim();
        const url = mediaUrl(item);
        const text = getTextValue(item);

        return (
            type === "text" ||
            type === "message" ||
            type === "text/plain" ||
            fileType === "text/plain" ||
            (!url && !!text)
        );
    };

    const isPremium =
        event?.is_premium ||
        event?.user?.active_subscription?.plan?.price > 0 ||
        event?.user?.active_subscription?.plan?.name === "Plus" ||
        event?.plan === "premium" ||
        event?.plan_name === "Premium" ||
        event?.plan_name === "Plus";

    const totalMemories = media.length;
    const remainingSlots = isPremium ? Infinity : Math.max(FREE_LIMIT - totalMemories, 0);
    const canAddMore = isPremium || totalMemories < FREE_LIMIT;

    const galleryMedia = useMemo(
        () => media.filter((item) => !isText(item) && mediaUrl(item)),
        [media]
    );

    const cover = useMemo(
        () => galleryMedia?.find((item) => !isVideo(item)) || galleryMedia?.[0] || null,
        [galleryMedia]
    );

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
        }, 4200);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    useEffect(() => {
        if (heroSlide >= heroSlides.length) setHeroSlide(0);
    }, [heroSlides.length, heroSlide]);

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                setSelected(null);
                setShowUpload(false);
            }
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

            setMedia((prev) => [result.data || result, ...prev]);
        }

        setGuestText("");
        setShowUpload(false);
        e.target.value = "";
    };

    const handleAddText = async () => {
        if (!guestText.trim() || !canAddMore) return;

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

        setMedia((prev) => [
            {
                ...savedMedia,
                type: "text",
                file_type: "text/plain",
                file_path: null,
                url: null,
                caption_name: savedMedia.caption_name || savedMedia.name || nameToSave,
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
            },
            ...prev,
        ]);

        setGuestText("");
        setShowUpload(false);
    };

    return (
        <main className="min-h-screen bg-[#FBFAFF] pb-28 text-[#111827]">
            <section className="relative min-h-[88vh] overflow-hidden bg-[#070511] sm:min-h-screen">
    {activeHero ? (
        <img
            src={mediaUrl(activeHero)}
            alt={event?.name || "Event"}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
    ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(123,97,255,.85),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(248,165,194,.65),transparent_28%),radial-gradient(circle_at_55%_90%,rgba(110,195,244,.5),transparent_34%),linear-gradient(135deg,#070511,#17112d,#0f172a)]" />
    )}

    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#070511]/40 to-[#070511]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#070511]/85 via-[#070511]/35 to-transparent" />

    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-10">
        <h1 className="logo-yellowtail text-[2.6rem] leading-none sm:text-[3.3rem]">
            <span className="bg-[linear-gradient(135deg,#fff,#C4B5FD,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                eventetsot.
            </span>
        </h1>
    </header>

    <div className="relative z-10 mx-auto flex min-h-[calc(88vh-90px)] max-w-7xl items-end px-4 pb-12 sm:min-h-[calc(100vh-90px)] sm:px-6 sm:pb-16 lg:px-10">
        <div className="w-full max-w-5xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/75 backdrop-blur-xl">
                Albumi i eventit
            </p>

            <h2
    className="
        max-w-4xl
        text-[4.2rem]
        leading-[0.95]
        text-white
        drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]
        min-[390px]:text-[4.8rem]
        sm:text-6xl
        lg:text-7xl
    "
    style={{
        fontFamily: "'Imperial Script', cursive",
        fontWeight: 400,
    }}
>
    {event?.name || "Event Album"}
</h2>
        </div>
    </div>
</section>

            <section className="relative -mt- overflow-hidden rounded-t-[2.5rem] bg-[#FBFAFF] px-4 pt-6 sm:px-6 lg:px-10">
                <div className="pointer-events-none absolute left-[-140px] top-16 h-80 w-80 rounded-full bg-[#C4B5FD]/35 blur-3xl" />
                <div className="pointer-events-none absolute right-[-140px] top-72 h-80 w-80 rounded-full bg-[#FBCFE8]/45 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <AlbumHeader
                        totalMemories={totalMemories}
                        mediaCount={mediaCount}
                        textCount={textCount}
                        isPremium={isPremium}
                    />

                    {galleryMedia.length > 0 && (
                        <HighlightStories
                            galleryMedia={galleryMedia}
                            media={media}
                            mediaUrl={mediaUrl}
                            isVideo={isVideo}
                            getPersonName={getPersonName}
                            setSelected={setSelected}
                        />
                    )}

                    {media.length === 0 ? (
                        <EmptyAlbum
                            isPremium={isPremium}
                            freeLimit={FREE_LIMIT}
                            onOpenUpload={() => setShowUpload(true)}
                        />
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
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
                    )}
                </div>
            </section>

            <FooterPlus
                totalMemories={totalMemories}
                isPremium={isPremium}
                canAddMore={canAddMore}
                onOpenUpload={() => setShowUpload(true)}
            />

            {showUpload && (
                <GuestUploadSheet
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
                    onClose={() => setShowUpload(false)}
                />
            )}

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

function AlbumHeader({ totalMemories, mediaCount, textCount, isPremium }) {
    return (
        <div className="mb-6 rounded-[2rem] border border-white bg-white/90 p-4 shadow-2xl shadow-[#C4B5FD]/20 backdrop-blur-xl sm:p-5">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#7B61FF]">
                        Kujtimet
                    </p>
                    <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#111827] sm:text-4xl">
                        Galeria e festës
                    </h2>
                </div>

                
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
                <MiniStat label="Momente" value={totalMemories} />
                <MiniStat label="Media" value={mediaCount} />
                <MiniStat label="Mesazhe" value={textCount} />
            </div>
        </div>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="rounded-2xl bg-[#FBFAFF] px-3 py-3 text-center ring-1 ring-[#E9D5FF]">
            <p className="text-lg font-black text-[#111827]">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#9CA3AF]">
                {label}
            </p>
        </div>
    );
}

function HighlightStories({
    galleryMedia,
    media,
    mediaUrl,
    isVideo,
    getPersonName,
    setSelected,
}) {
    return (
        <div className="mb-7 overflow-hidden rounded-[2rem] border border-[#E9D5FF] bg-white/90 p-4 shadow-2xl shadow-[#C4B5FD]/20 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#7B61FF]">
                        Highlights
                    </p>
                    <h3 className="text-lg font-black tracking-[-0.03em] text-[#111827]">
                        Momentet më të bukura
                    </h3>
                </div>

                <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-[11px] font-black text-[#7B61FF]">
                    {galleryMedia.length}
                </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {galleryMedia.slice(0, 16).map((item) => (
                    <button
                        key={item.id}
                        onClick={() =>
                            setSelected(media.findIndex((m) => m.id === item.id))
                        }
                        className="group min-w-[78px] text-center sm:min-w-[92px]"
                    >
                        <div className="rounded-full bg-[linear-gradient(135deg,#7B61FF,#F8A5C2,#6EC3F4)] p-[3px] shadow-lg shadow-[#C4B5FD]/40 transition group-hover:scale-105">
                            <div className="h-[76px] w-[76px] overflow-hidden rounded-full border-4 border-white bg-[#F5F5F7] sm:h-[88px] sm:w-[88px]">
                                <MediaThumb item={item} mediaUrl={mediaUrl} isVideo={isVideo} />
                            </div>
                        </div>

                        <p className="mt-2 truncate text-[11px] font-black text-[#6B7280]">
                            {getPersonName(item)}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}

function FooterPlus({ totalMemories, isPremium, canAddMore, onOpenUpload }) {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:bottom-6">
            <div className="mx-auto max-w-3xl">
                <div
                    className="
                        relative overflow-hidden
                        rounded-[2.2rem]
                        border border-white/60
                        bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,245,255,0.92))]
                        px-5 py-4
                        shadow-[0_15px_50px_rgba(123,97,255,0.18)]
                        backdrop-blur-2xl
                    "
                >
                    <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#C4B5FD]/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-10 left-10 h-24 w-24 rounded-full bg-[#FBCFE8]/30 blur-3xl" />

                    <div className="relative flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={onOpenUpload}
                            disabled={!canAddMore}
                            className="min-w-0 flex-1 text-left disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <h3 className="truncate text-sm font-black text-[#111827] sm:text-base">
                                Ndaj kujtimet e eventit
                            </h3>

                            <p className="mt-1 text-xs font-medium text-[#6B7280]">
                                Foto, video dhe mesazhe
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-[11px] font-black text-[#7B61FF]">
                                    {totalMemories} kujtime
                                </span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={onOpenUpload}
                            disabled={!canAddMore}
                            className="
                                group relative
                                flex h-16 w-16 shrink-0 items-center justify-center
                                rounded-full
                                bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)]
                                text-[2rem] font-black text-white
                                shadow-[0_12px_35px_rgba(123,97,255,0.38)]
                                transition duration-300
                                hover:scale-105
                                active:scale-95
                                disabled:opacity-50
                            "
                        >
                            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 blur-md transition group-hover:opacity-100" />
                            <span className="absolute inset-[-6px] rounded-full border border-[#7B61FF]/15" />
                            <span className="relative -mt-1">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
function GuestUploadSheet({
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
    onClose,
}) {
    const whatsappMessage = eventName
        ? `Pershendetje, dua te aktivizoj Premium per eventin: ${eventName}`
        : "Pershendetje, dua te aktivizoj Premium per eventin tim ne EventetSot.";

    const whatsappUrl = `https://wa.me/38348568568?text=${encodeURIComponent(
        whatsappMessage
    )}`;

   return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-3 backdrop-blur-sm">
        <div className="w-full max-w-lg overflow-hidden rounded-[1.7rem] bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 bg-[#7B61FF] p-5 text-white">
                <div>
                    <h2 className="text-xl font-black">Shto kujtim</h2>
                    <p className="mt-1 text-sm text-white/80">
                        Foto, video ose mesazh nga eventi
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xl font-black"
                >
                    ×
                </button>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F5F3FF] p-1">
                    <button
                        type="button"
                        onClick={() => setUploadType("media")}
                        className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                            uploadType === "media"
                                ? "bg-white text-[#111827] shadow"
                                : "text-[#7B61FF]"
                        }`}
                    >
                        Foto / Video
                    </button>

                    <button
                        type="button"
                        onClick={() => setUploadType("text")}
                        className={`rounded-xl px-4 py-3 text-sm font-black transition ${
                            uploadType === "text"
                                ? "bg-white text-[#111827] shadow"
                                : "text-[#7B61FF]"
                        }`}
                    >
                        Tekst
                    </button>
                </div>

                <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Emri yt"
                    className="mt-4 w-full rounded-2xl border border-[#E9D5FF] px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#C4B5FD]/35"
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
                    className="mt-3 w-full resize-none rounded-2xl border border-[#E9D5FF] px-4 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#C4B5FD]/35"
                />

                {uploadType === "media" ? (
                    <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C4B5FD] bg-[#FBFAFF] px-5 py-7 text-center transition hover:bg-[#F5F3FF]">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7B61FF] text-3xl font-black text-white">
                            +
                        </span>

                        <span className="mt-3 text-sm font-black text-[#111827]">
                            Zgjidh foto/video
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
                        className="mt-4 w-full rounded-2xl bg-[#7B61FF] px-5 py-4 text-sm font-black text-white shadow-lg disabled:opacity-50"
                    >
                        Shto mesazhin
                    </button>
                )}
            </div>
        </div>
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
            <div className="col-span-2 overflow-hidden rounded-[1.5rem] border border-[#E9D5FF] bg-white p-5 shadow-xl shadow-[#C4B5FD]/20">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#F8A5C2)] text-sm font-black text-white">
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

                        <div className="mt-4 flex items-center justify-between border-t border-[#F3E8FF] pt-3">
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
        );
    }

    const size =
        index % 10 === 0
            ? "sm:col-span-2 sm:row-span-2"
            : index % 7 === 0
            ? "sm:col-span-2"
            : index % 5 === 0
            ? "sm:row-span-2"
            : "";

    return (
        <button
            onClick={onClick}
            className={`group relative min-h-[185px] overflow-hidden rounded-[1.35rem] bg-[#F5F5F7] text-left shadow-xl shadow-[#C4B5FD]/20 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#A78BFA]/30 sm:min-h-[220px] sm:rounded-[1.8rem] ${size}`}
        >
            <MediaThumb item={item} mediaUrl={mediaUrl} isVideo={isVideo} />

            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/20 to-transparent opacity-75" />

            {isVideo(item) && (
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#7B61FF] shadow-lg">
                    Video
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs font-black backdrop-blur">
                        {personName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-black">{personName}</p>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080711]/95 p-3 backdrop-blur-xl">
            <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-black text-[#111827] shadow-xl"
            >
                ×
            </button>

            <div className="grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-[1fr_380px]">
                <div className="flex max-h-[62vh] items-center justify-center bg-black md:max-h-[92vh]">
                    {isVideo(item) ? (
                        <video
                            src={mediaUrl(item)}
                            controls
                            autoPlay
                            preload="metadata"
                            className="max-h-[62vh] w-full object-contain md:max-h-[92vh]"
                        />
                    ) : (
                        <img
                            src={mediaUrl(item)}
                            alt={description || "Event media"}
                            loading="eager"
                            decoding="async"
                            className="max-h-[62vh] w-full object-contain md:max-h-[92vh]"
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
                        <div className="mt-4 grid grid-cols-2 gap-3">
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

function EmptyAlbum({ isPremium, freeLimit, onOpenUpload }) {
    return (
        <div className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-[#E9D5FF] bg-white p-8 text-center shadow-2xl shadow-[#C4B5FD]/25 sm:p-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#FBCFE8] text-4xl font-black text-white shadow-xl">
                ♡
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] text-[#111827]">
                Albumi është ende bosh
            </h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-[#6B7280]">
                Fotot, videot dhe mesazhet e eventit do të shfaqen këtu sapo pjesëmarrësit t’i shtojnë.
            </p>

            {!isPremium && (
                <p className="mx-auto mt-5 max-w-md rounded-2xl bg-[#F5F3FF] px-4 py-3 text-sm font-black text-[#7B61FF]">
                    Plani Free lejon deri në {freeLimit} vendosje gjithsej.
                </p>
            )}

            <button
                type="button"
                onClick={onOpenUpload}
                className="mt-6 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-6 py-4 text-sm font-black text-white shadow-xl"
            >
                + Shto kujtimin e parë
            </button>
        </div>
    );
}