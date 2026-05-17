import { useEffect, useMemo, useState } from "react";

export default function UserMediaPage({ selectedEvent, media = [] }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState("all");

    const getValue = (...values) => {
        return values.find((value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === "object") return false;
            return String(value).trim();
        }) || "";
    };

    const getMediaText = (item) => {
        const captionAsText =
            typeof item?.caption === "string" ? item.caption : "";

        return String(
            getValue(
                item?.caption_text,
                item?.text_content,
                item?.message,
                item?.body,
                item?.text,
                item?.content,
                item?.note,
                item?.description,
                item?.caption?.text,
                item?.caption?.message,
                captionAsText
            )
        ).trim();
    };

    const getMediaAuthor = (item) => {
        return String(
            getValue(
                item?.caption_name,
                item?.author_name,
                item?.guest_name,
                item?.sender_name,
                item?.name,
                item?.caption?.name
            ) || "I ftuar"
        ).trim();
    };

    const getMediaPath = (item) => {
        return String(
            getValue(item?.file_path, item?.url, item?.path, item?.media_url)
        ).trim();
    };

    const hasRealFile = (item) => {
        const path = getMediaPath(item);

        return (
            path &&
            path !== "null" &&
            path !== "undefined" &&
            path !== "#" &&
            !path.endsWith("/null") &&
            !path.endsWith("/undefined")
        );
    };

    const detectMediaType = (item) => {
    const path = getMediaPath(item).toLowerCase();
    const fileType = String(item?.file_type || item?.mime_type || "")
        .toLowerCase()
        .trim();
    const type = String(item?.type || "").toLowerCase().trim();
    const text = getMediaText(item);

    if (
        hasRealFile(item) &&
        (fileType.startsWith("video/") ||
            type === "video" ||
            path.match(/\.(mp4|mov|webm|avi|mkv)$/i))
    ) {
        return "video";
    }

    if (
        hasRealFile(item) &&
        (fileType.startsWith("image/") ||
            type === "image" ||
            type === "photo" ||
            type === "file" ||
            path.match(/\.(jpg|jpeg|png|webp|gif|heic|heif)$/i))
    ) {
        return "image";
    }

    if (
        type === "text" ||
        type === "message" ||
        type === "text/plain" ||
        fileType === "text/plain" ||
        text
    ) {
        return "text";
    }

    return "text";
};

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);

        const mappedFiles = selectedFiles.map((file) => ({
            file,
            note: "",
            authorName: "",
            previewUrl: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...mappedFiles]);
        e.target.value = "";
    };

    const handleNoteChange = (index, value) => {
        setFiles((prev) =>
            prev.map((item, i) => (i === index ? { ...item, note: value } : item))
        );
    };

    const handleAuthorChange = (index, value) => {
        setFiles((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, authorName: value } : item
            )
        );
    };

    const removeSelectedFile = (index) => {
        setFiles((prev) => {
            const updated = [...prev];
            const removed = updated[index];

            if (removed?.previewUrl) {
                URL.revokeObjectURL(removed.previewUrl);
            }

            updated.splice(index, 1);
            return updated;
        });
    };

    const clearSelection = () => {
        files.forEach((item) => {
            if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        });

        setFiles([]);
    };

    useEffect(() => {
        return () => {
            files.forEach((item) => {
                if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
            });
        };
    }, [files]);

    const handleUpload = async () => {
        if (!selectedEvent?.code) {
            alert("Nuk ka event aktiv.");
            return;
        }

        if (!files.length) {
            alert("Zgjidh të paktën një foto ose video.");
            return;
        }

        const csrfToken =
            document.querySelector('meta[name="csrf-token"]')?.content || "";

        const formData = new FormData();

        files.forEach((item, index) => {
            formData.append(`items[${index}][type]`, "file");
            formData.append(`items[${index}][file]`, item.file);
            formData.append(`items[${index}][caption][text]`, item.note || "");
            formData.append(`items[${index}][caption][name]`, item.authorName || "");
        });

        formData.append("code", selectedEvent.code);
        setUploading(true);

        try {
            const response = await fetch("/media", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Ndodhi një gabim gjatë ngarkimit të mediave.");
                return;
            }

            clearSelection();
            alert("Media u ngarkua me sukses.");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë ngarkimit të mediave.");
        } finally {
            setUploading(false);
        }
    };

    const downloadAll = () => {
        if (!selectedEvent?.id) return;
        window.location.href = `/user/media/${selectedEvent.id}/download-media`;
    };

    const deleteMedia = (id) => {
        if (!confirm("A je i/e sigurt që dëshiron ta fshish këtë kujtim?")) return;
        window.location.href = `/user/media/${id}`;
    };

    const getPreviewType = (file) => {
        if (file?.type?.startsWith("video/")) return "video";
        if (file?.type?.startsWith("image/")) return "image";
        return "file";
    };

    const filteredMedia = useMemo(() => {
        if (filter === "all") return media;
        return media.filter((item) => detectMediaType(item) === filter);
    }, [media, filter]);

    const stats = useMemo(() => {
        return {
            all: media.length,
            image: media.filter((item) => detectMediaType(item) === "image").length,
            video: media.filter((item) => detectMediaType(item) === "video").length,
            text: media.filter((item) => detectMediaType(item) === "text").length,
        };
    }, [media]);

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(123,97,255,0.16),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(110,195,244,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#faf8ff_52%,#f8fbff_100%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <p className="inline-flex rounded-full border border-[#E8E1FF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7B61FF] shadow-sm">
                            Galeria e eventit
                        </p>

                        <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                            Menaxho fotot, videot dhe mesazhet.
                        </h2>

                        <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[15px]">
                            Këtu shfaqen të gjitha kujtimet e eventit: foto, video dhe
                            mesazhet që kanë lënë mysafirët nga QR code.
                        </p>
                    </div>

                    <div className="rounded-[26px] border border-white/80 bg-white/85 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Event aktiv
                        </p>

                        <p className="mt-2 text-base font-black text-slate-950">
                            {selectedEvent?.name || "Asnjë event aktiv"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {selectedEvent?.code ? `Kodi: ${selectedEvent.code}` : "Pa kod eventi"}
                        </p>
                    </div>
                </div>

                <div className="relative mt-7 grid gap-3 md:grid-cols-2">
                    <button
                        type="button"
                        onClick={downloadAll}
                        disabled={!selectedEvent?.id}
                        className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(123,97,255,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Shkarko të gjitha mediat
                    </button>

                    <button
                        type="button"
                        onClick={clearSelection}
                        disabled={!files.length}
                        className="rounded-2xl border border-[#E6E1F0] bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#D8D0FF] hover:bg-[#FAF8FF] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Pastro përzgjedhjen
                    </button>
                </div>
            </section>

            <section className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] lg:p-8">
                <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                        Ngarkim i ri
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                        Shto foto dhe video
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                        Zgjidh një ose më shumë skedarë, kontrollo pamjen paraprake dhe shto
                        shënime përpara se t’i ruash në galeri.
                    </p>
                </div>

                <div className="mt-7 rounded-[30px] border border-dashed border-[#D8D0F4] bg-[#FCFBFF] p-6">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#EEE8FF] bg-white text-3xl font-black text-[#7B61FF] shadow-sm">
                            ↑
                        </div>

                        <div>
                            <h4 className="text-lg font-black text-slate-950">
                                Zgjidh skedarët për ngarkim
                            </h4>

                            <p className="mt-2 text-sm text-slate-500">
                                Mund të ngarkosh foto dhe video nga pajisja jote.
                            </p>
                        </div>

                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="block w-full max-w-xl text-sm text-slate-500
                            file:mr-4 file:rounded-2xl file:border-0
                            file:bg-[#7B61FF] file:px-5 file:py-3
                            file:text-sm file:font-bold file:text-white
                            hover:file:bg-[#684DFF]"
                        />

                        {files.length > 0 && (
                            <div className="rounded-2xl border border-[#EEE8FF] bg-white px-5 py-3 text-sm font-bold text-slate-700">
                                {files.length} skedarë të zgjedhur
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading || !files.length}
                            className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(123,97,255,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {uploading ? "Duke u ngarkuar..." : "Ngarko mediat"}
                        </button>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Pamje paraprake
                                </p>

                                <h4 className="mt-2 text-lg font-black text-slate-950">
                                    Skedarët e zgjedhur
                                </h4>
                            </div>

                            <span className="rounded-full border border-[#ECE7FA] bg-white px-4 py-2 text-xs font-bold text-slate-500">
                                {files.length} skedarë
                            </span>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {files.map((item, index) => {
                                const fileType = getPreviewType(item.file);

                                return (
                                    <div
                                        key={`${item.file.name}-${index}`}
                                        className="overflow-hidden rounded-[28px] border border-[#F0ECFB] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                            <button
                                                type="button"
                                                onClick={() => removeSelectedFile(index)}
                                                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-black text-slate-700 shadow-md backdrop-blur transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                ×
                                            </button>

                                            {fileType === "image" ? (
                                                <img
                                                    src={item.previewUrl}
                                                    alt={item.file.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : fileType === "video" ? (
                                                <video
                                                    src={item.previewUrl}
                                                    className="h-full w-full object-cover"
                                                    controls
                                                    muted
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                                                    Skedar
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3 p-4">
                                            <div>
                                                <p className="truncate text-sm font-black text-slate-950">
                                                    {item.file.name}
                                                </p>

                                                <p className="mt-1 text-xs font-semibold text-slate-400">
                                                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>

                                            <InputBox
                                                label="Emri i dërguesit"
                                                value={item.authorName}
                                                onChange={(e) =>
                                                    handleAuthorChange(index, e.target.value)
                                                }
                                                placeholder="P.sh. Albina"
                                            />

                                            <TextareaBox
                                                label="Shënim"
                                                value={item.note}
                                                onChange={(e) =>
                                                    handleNoteChange(index, e.target.value)
                                                }
                                                placeholder="Shkruaj një shënim për këtë media..."
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>

            <section className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Galeria
                        </p>

                        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                            Kujtimet e ngarkuara
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Shfaq, filtro dhe menaxho fotot, videot dhe mesazhet e ruajtura për këtë event.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                            Të gjitha ({stats.all})
                        </FilterButton>

                        <FilterButton active={filter === "image"} onClick={() => setFilter("image")}>
                            Foto ({stats.image})
                        </FilterButton>

                        <FilterButton active={filter === "video"} onClick={() => setFilter("video")}>
                            Video ({stats.video})
                        </FilterButton>

                        <FilterButton active={filter === "text"} onClick={() => setFilter("text")}>
                            Mesazhe ({stats.text})
                        </FilterButton>
                    </div>
                </div>

                {filteredMedia.length ? (
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredMedia.map((item, index) => {
                            const mediaType = detectMediaType(item);
                            const mediaPath = getMediaPath(item);
                            const mediaText = getMediaText(item);
                            const mediaAuthor = getMediaAuthor(item);

                            const label =
                                mediaType === "text"
                                    ? "Mesazh"
                                    : mediaType === "video"
                                    ? "Video"
                                    : "Foto";

                            return (
                                <div
                                    key={item.id || `${mediaType}-${index}`}
                                    className="group overflow-hidden rounded-[28px] border border-[#F0ECFB] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#D8D0FF] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                        {item?.id && (
                                            <button
                                                type="button"
                                                onClick={() => deleteMedia(item.id)}
                                                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-black text-slate-700 shadow-md backdrop-blur transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        )}

                                        {mediaType === "text" ? (
                                            <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.18),transparent_40%),#ffffff] p-6">
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7B61FF]">
                                                        Mesazh nga mysafiri
                                                    </p>

                                                    <h4 className="mt-2 text-xl font-black text-slate-950">
                                                        {mediaAuthor}
                                                    </h4>

                                                    <p className="mt-4 line-clamp-6 text-sm font-semibold leading-7 text-slate-600">
                                                        {mediaText
                                                            ? `“${mediaText}”`
                                                            : "Mesazhi nuk u ruajt si tekst."}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : mediaType === "video" ? (
                                            <video
                                                src={mediaPath}
                                                controls
                                                className="h-full w-full object-cover"
                                            />
                                        ) : mediaPath ? (
                                            <img
                                                src={mediaPath}
                                                alt="Media e eventit"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-white p-6 text-center text-sm font-bold text-slate-500">
                                                Nuk ka media të vlefshme.
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-black text-slate-950">
                                                    {label}
                                                </p>

                                                <p className="mt-1 text-xs font-semibold text-slate-400">
                                                    {item.created_at || "Pa datë"}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-[#F7F4FF] px-3 py-1 text-[11px] font-bold text-[#7B61FF]">
                                                {label}
                                            </span>
                                        </div>

                                        {(mediaAuthor || mediaText) && (
                                            <div className="rounded-2xl border border-[#EEE8FF] bg-[#FCFBFF] px-4 py-3">
                                                <p className="text-sm font-black text-slate-800">
                                                    {mediaAuthor}
                                                </p>

                                                {mediaText && (
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                                        {mediaText}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-6 rounded-[30px] border border-dashed border-[#DDD7EE] bg-[#FCFBFF] p-10 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#EEE8FF] bg-white text-3xl font-black text-[#7B61FF] shadow-sm">
                            +
                        </div>

                        <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-slate-950">
                            Nuk ka ende kujtime
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                            Kur të ngarkohen foto, video ose mesazhe, ato do të shfaqen këtu.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

function FilterButton({ active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                active
                    ? "bg-[#7B61FF] text-white shadow-[0_10px_24px_rgba(123,97,255,0.22)]"
                    : "border border-[#ECE7FA] bg-white text-slate-600 hover:border-[#D8D0FF] hover:bg-[#FAF8FF]"
            }`}
        >
            {children}
        </button>
    );
}

function InputBox({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {label}
            </label>

            <input
                {...props}
                type="text"
                className="w-full rounded-2xl border border-[#E8E2FA] bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/10"
            />
        </div>
    );
}

function TextareaBox({ label, ...props }) {
    return (
        <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {label}
            </label>

            <textarea
                {...props}
                rows={3}
                className="w-full rounded-2xl border border-[#E8E2FA] bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/10"
            />
        </div>
    );
}