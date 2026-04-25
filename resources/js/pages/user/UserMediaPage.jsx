import { useEffect, useMemo, useState } from "react";

export default function UserMediaPage({ selectedEvent, media = [] }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState("all");

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);

        const mappedFiles = selectedFiles.map((file) => ({
            file,
            note: "",
            authorName: "",
            previewUrl: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...mappedFiles]);

        // lejon rizgjedhje të të njëjtit file
        e.target.value = "";
    };

    const handleNoteChange = (index, value) => {
        setFiles((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, note: value } : item
            )
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
            if (item.previewUrl) {
                URL.revokeObjectURL(item.previewUrl);
            }
        });
        setFiles([]);
    };

    useEffect(() => {
        return () => {
            files.forEach((item) => {
                if (item.previewUrl) {
                    URL.revokeObjectURL(item.previewUrl);
                }
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
            formData.append(
                `items[${index}][caption][text]`,
                item.note || ""
            );
            formData.append(
                `items[${index}][caption][name]`,
                item.authorName || ""
            );
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
                console.error("Upload error:", data);
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
        if (!confirm("A dëshiron ta fshish këtë media?")) return;
        window.location.href = `/user/media/${id}`;
    };

    const getPreviewType = (file) => {
        if (file?.type?.startsWith("video/")) return "video";
        if (file?.type?.startsWith("image/")) return "image";
        return "file";
    };

    const detectMediaType = (item) => {
        const path = item?.file_path || "";
        const fileType = item?.file_type || "";

        if (
            fileType.startsWith("video/") ||
            path.match(/\.(mp4|mov|webm|avi|mkv)$/i) ||
            item?.type === "video" ||
            item?.mime_type?.startsWith?.("video/")
        ) {
            return "video";
        }

        return "image";
    };

    const filteredMedia = useMemo(() => {
        if (filter === "all") return media;
        return media.filter((item) => detectMediaType(item) === filter);
    }, [media, filter]);

    return (
        <div className="space-y-6">
            <section className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Foto & Video
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-900">
                            Menaxho mediat e eventit tënd
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            Ngarko foto dhe video, shto përshkrime për secilën dhe
                            menaxho gjithçka direkt nga paneli yt.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#EEE8FF] bg-[#FAF8FF] px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Event aktiv
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900">
                            {selectedEvent?.name || "Asnjë event aktiv"}
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <button
                        type="button"
                        onClick={downloadAll}
                        className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)] transition hover:opacity-95"
                    >
                        Shkarko të gjitha
                    </button>

                    <button
                        type="button"
                        onClick={clearSelection}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#EAE5FA] bg-[#FAF8FF] px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#F2EEFF]"
                    >
                        Pastro përzgjedhjen
                    </button>
                </div>
            </section>

            <section className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                <div className="text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                        Ngarkim i ri
                    </p>

                    <h3 className="mt-2 text-2xl font-black text-slate-900">
                        Ngarko foto & video
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                        Zgjidh një ose më shumë skedarë dhe shto një shënim për secilin.
                    </p>
                </div>

                <div className="mt-6 rounded-[28px] border border-dashed border-[#D8D0F4] bg-[#FCFBFF] p-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl">
                            ⬆️
                        </div>

                        <div className="text-center">
                            <h4 className="text-lg font-bold text-slate-900">
                                Zgjidh skedarët që dëshiron të ngarkosh
                            </h4>
                            <p className="mt-2 text-sm text-slate-500">
                                Mbështeten foto dhe video.
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
                            file:text-sm file:font-semibold file:text-white
                            hover:file:bg-[#684DFF]"
                        />

                        {files.length > 0 && (
                            <div className="mt-2 rounded-2xl border border-[#EEE8FF] bg-white p-4 text-sm text-slate-600">
                                {files.length} skedarë të zgjedhur
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading || !files.length}
                            className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(123,97,255,0.20)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {uploading ? "Duke u ngarkuar..." : "Ngarko tani"}
                        </button>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mt-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                                    Preview
                                </p>
                                <h4 className="mt-2 text-lg font-black text-slate-900">
                                    Skedarët e zgjedhur
                                </h4>
                            </div>

                            <span className="rounded-full border border-[#ECE7FA] bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                                {files.length} skedarë
                            </span>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {files.map((item, index) => {
                                const fileType = getPreviewType(item.file);

                                return (
                                    <div
                                        key={`${item.file.name}-${index}`}
                                        className="overflow-hidden rounded-[24px] border border-[#F0ECFB] bg-[#FCFBFF] shadow-sm"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                            <button
                                                type="button"
                                                onClick={() => removeSelectedFile(index)}
                                                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm shadow-md backdrop-blur transition hover:bg-red-50"
                                            >
                                                ✕
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
                                                <div className="flex h-full items-center justify-center text-4xl">
                                                    📄
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3 p-4">
                                            <div>
                                                <p className="truncate text-sm font-bold text-slate-900">
                                                    {item.file.name}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                    Emri i dërguesit
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.authorName}
                                                    onChange={(e) =>
                                                        handleAuthorChange(index, e.target.value)
                                                    }
                                                    placeholder="P.sh. Albina"
                                                    className="w-full rounded-2xl border border-[#E8E2FA] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                    Shënim
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={item.note}
                                                    onChange={(e) =>
                                                        handleNoteChange(index, e.target.value)
                                                    }
                                                    placeholder="Shkruaj një shënim për këtë foto ose video..."
                                                    className="w-full rounded-2xl border border-[#E8E2FA] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-2 focus:ring-[#7B61FF]/10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </section>

            <section className="rounded-[30px] border border-white/70 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Galeria
                        </p>
                        <h3 className="mt-2 text-xl font-black text-slate-900">
                            Media e ngarkuar
                        </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setFilter("all")}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                filter === "all"
                                    ? "bg-[#7B61FF] text-white"
                                    : "border border-[#ECE7FA] bg-white text-slate-600"
                            }`}
                        >
                            Të gjitha
                        </button>

                        <button
                            type="button"
                            onClick={() => setFilter("image")}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                filter === "image"
                                    ? "bg-[#7B61FF] text-white"
                                    : "border border-[#ECE7FA] bg-white text-slate-600"
                            }`}
                        >
                            Foto
                        </button>

                        <button
                            type="button"
                            onClick={() => setFilter("video")}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                                filter === "video"
                                    ? "bg-[#7B61FF] text-white"
                                    : "border border-[#ECE7FA] bg-white text-slate-600"
                            }`}
                        >
                            Video
                        </button>

                        <span className="rounded-full border border-[#ECE7FA] bg-white px-3 py-2 text-xs font-semibold text-slate-500">
                            {filteredMedia.length} items
                        </span>
                    </div>
                </div>

                {filteredMedia.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredMedia.map((item) => {
                            const mediaType = detectMediaType(item);

                            return (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-[24px] border border-[#F0ECFB] bg-[#FCFBFF] shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => deleteMedia(item.id)}
                                            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm shadow-md backdrop-blur transition hover:bg-red-50"
                                        >
                                            🗑️
                                        </button>

                                        {mediaType === "video" ? (
                                            <video
                                                src={item.file_path}
                                                controls
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={item.file_path}
                                                alt="Media"
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                            />
                                        )}
                                    </div>

                                    <div className="space-y-3 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-slate-900">
                                                    {mediaType === "video" ? "Video" : "Foto"}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {item.created_at || "Pa datë"}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-[#F7F4FF] px-3 py-1 text-[11px] font-bold text-[#7B61FF]">
                                                {mediaType === "video" ? "Video" : "Foto"}
                                            </span>
                                        </div>

                                        {(item.caption_name || item.caption_text) && (
                                            <div className="rounded-2xl border border-[#EEE8FF] bg-white px-4 py-3">
                                                {item.caption_name && (
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {item.caption_name}
                                                    </p>
                                                )}

                                                {item.caption_text && (
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                                        {item.caption_text}
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
                    <div className="mt-6 rounded-[28px] border border-[#ECE8F8] bg-[#FCFBFF] p-10 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#F4F1FF,#FDF7FB)] text-4xl">
                            🖼️
                        </div>

                        <h3 className="mt-5 text-2xl font-black text-slate-900">
                            Nuk ka ende media
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            Kur të ngarkosh foto ose video, ato do të shfaqen këtu.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}