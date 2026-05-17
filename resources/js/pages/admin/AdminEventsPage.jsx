import { useMemo, useState } from "react";

const getCsrf = () =>
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

const formatDate = (value) => {
    if (!value) return "—";

    try {
        return new Date(value).toLocaleDateString("sq-AL", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return value;
    }
};

export default function AdminEventsPage({ extra = {} }) {
    const initialEvents = extra?.events || [];

    const [events, setEvents] = useState(initialEvents);
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const text = [
                event.name,
                event.title,
                event.code,
                event.user?.name,
                event.user?.email,
                event.event_date,
                event.date,
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [events, search]);

    const totalEvents = events.length;
    const totalUsers = new Set(events.map((event) => event.user_id).filter(Boolean)).size;
    const latestEvent = events?.[0];

    const handleDelete = async () => {
        if (!selectedEvent) return;

        setIsDeleting(true);

        try {
            const response = await fetch(`/admin/events/${selectedEvent.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": getCsrf(),
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Fshirja dështoi");
            }

            setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id));
            setSelectedEvent(null);
        } catch {
            alert("Eventi nuk u fshi. Kontrollo route/controller në backend.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[34px] border border-[#EEEAF8] bg-gradient-to-br from-white via-[#FBFAFF] to-[#F4F0FF] p-8 shadow-[0_24px_70px_rgba(33,28,53,0.08)]">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#7B61FF]/20 blur-3xl" />
                <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-[#6EC3F4]/25 blur-3xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full border border-[#EEEAF8] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#7B61FF] shadow-sm">
                            Menaxhimi i Eventeve
                        </span>

                        <h1 className="mt-5 text-4xl font-black tracking-tight text-[#211C35]">
                            Eventet e Platformës
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7E7896]">
                            Shiko, kërko, kontrollo dhe menaxho të gjitha eventet e krijuara nga përdoruesit në EventetSot.
                        </p>
                    </div>

                    <a
                        href="/admin/events/create"
                        className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#7B61FF]/25 transition hover:-translate-y-0.5 hover:bg-[#6A4DFF]"
                    >
                        Shto Event të Ri
                    </a>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <StatCard label="Totali i eventeve" value={totalEvents} />
                <StatCard label="Përdorues me evente" value={totalUsers} />
                <div className="rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-[0_18px_50px_rgba(33,28,53,0.06)]">
                    <p className="text-sm font-bold text-[#8A85A3]">Eventi më i fundit</p>
                    <h2 className="mt-3 truncate text-xl font-black text-[#211C35]">
                        {latestEvent?.name || latestEvent?.title || "—"}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-[#8A85A3]">
                        {formatDate(latestEvent?.event_date || latestEvent?.date || latestEvent?.created_at)}
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-[#EEEAF8] bg-white shadow-[0_24px_70px_rgba(33,28,53,0.07)]">
                <div className="flex flex-col gap-4 border-b border-[#EEEAF8] bg-[#FCFBFF] p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-xl font-black text-[#211C35]">Lista e eventeve</h2>
                        <p className="mt-1 text-sm font-semibold text-[#8A85A3]">
                            {filteredEvents.length} evente të gjetura
                        </p>
                    </div>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Kërko sipas eventit, përdoruesit ose kodit..."
                        className="w-full rounded-2xl border border-[#EEEAF8] bg-white px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition placeholder:text-[#A7A1BC] focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10 lg:w-96"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] text-left">
                        <thead className="bg-[#FAF8FF] text-xs uppercase tracking-[0.18em] text-[#8A85A3]">
                            <tr>
                                <th className="px-6 py-4">Eventi</th>
                                <th className="px-6 py-4">Përdoruesi</th>
                                <th className="px-6 py-4">Kodi</th>
                                <th className="px-6 py-4">Data e eventit</th>
                                <th className="px-6 py-4">Krijuar më</th>
                                <th className="px-6 py-4 text-right">Veprime</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EEEAF8]">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <tr key={event.id} className="transition hover:bg-[#FAF8FF]">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EAFF] text-lg font-black text-[#7B61FF]">
                                                    {(event.name || event.title || "E").charAt(0)}
                                                </div>

                                                <div>
                                                    <div className="font-black text-[#211C35]">
                                                        {event.name || event.title || "Event pa titull"}
                                                    </div>
                                                    <div className="text-xs font-semibold text-[#8A85A3]">
                                                        ID #{event.id}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="font-bold text-[#211C35]">
                                                {event.user?.name || "Pa përdorues"}
                                            </div>
                                            <div className="text-xs text-[#8A85A3]">
                                                {event.user?.email || "—"}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className="rounded-xl bg-[#F0EAFF] px-3 py-2 text-xs font-black text-[#7B61FF]">
                                                {event.code || "—"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-sm font-semibold text-[#6F6A86]">
                                            {formatDate(event.event_date || event.date)}
                                        </td>

                                        <td className="px-6 py-5 text-sm font-semibold text-[#6F6A86]">
                                            {formatDate(event.created_at)}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <a
                                                    href={`/admin/events/${event.id}`}
                                                    className="rounded-xl border border-[#EEEAF8] px-4 py-2 text-sm font-black text-[#7B61FF] transition hover:bg-[#F0EAFF]"
                                                >
                                                    Shiko
                                                </a>

                                                <a
                                                    href={`/admin/events/${event.id}/edit`}
                                                    className="rounded-xl bg-[#211C35] px-4 py-2 text-sm font-black text-white transition hover:bg-[#332A55]"
                                                >
                                                    Ndrysho
                                                </a>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedEvent(event)}
                                                    className="rounded-xl bg-red-50 px-4 py-2 text-sm font-black text-red-600 transition hover:bg-red-100"
                                                >
                                                    Fshi
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0EAFF] text-2xl font-black text-[#7B61FF]">
                                            E
                                        </div>
                                        <h3 className="mt-5 text-xl font-black text-[#211C35]">
                                            Nuk u gjet asnjë event
                                        </h3>
                                        <p className="mt-2 text-sm text-[#8A85A3]">
                                            Provo një kërkim tjetër ose shto një event të ri.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211C35]/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[32px] bg-white p-7 shadow-2xl">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-600">
                            !
                        </div>

                        <h3 className="mt-5 text-2xl font-black text-[#211C35]">
                            Konfirmo fshirjen
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-[#7E7896]">
                            Je duke fshirë eventin{" "}
                            <strong className="text-[#211C35]">
                                {selectedEvent.name || selectedEvent.title || "Event pa titull"}
                            </strong>
                            . Ky veprim nuk mund të kthehet mbrapa.
                        </p>

                        <div className="mt-7 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="flex-1 rounded-2xl border border-[#EEEAF8] px-5 py-3 text-sm font-black text-[#6F6A86] transition hover:bg-[#FAF8FF]"
                            >
                                Anulo
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 rounded-2xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isDeleting ? "Duke fshirë..." : "Fshi eventin"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-[0_18px_50px_rgba(33,28,53,0.06)]">
            <p className="text-sm font-bold text-[#8A85A3]">{label}</p>
            <h2 className="mt-3 text-4xl font-black text-[#211C35]">{value}</h2>
        </div>
    );
}