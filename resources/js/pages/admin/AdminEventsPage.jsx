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

const isEventActive = (event) => {
    return !(event.is_active === false || event.is_active === 0 || event.is_active === "0");
};

const isEventPremium = (event) => {
    return event.is_premium === true || event.is_premium === 1 || event.is_premium === "1";
};

export default function AdminEventsPage({ extra = {} }) {
    const initialEvents = extra?.events || [];

    const [events, setEvents] = useState(initialEvents);
    const [search, setSearch] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loadingAction, setLoadingAction] = useState(null);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const active = isEventActive(event);
            const premium = isEventPremium(event);

            const text = [
                event.name,
                event.title,
                event.code,
                event.user?.name,
                event.user?.email,
                event.event_date,
                event.date,
                active ? "aktiv" : "ndalur",
                premium ? "premium" : "free",
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(search.toLowerCase());
        });
    }, [events, search]);

    const totalEvents = events.length;
    const totalUsers = new Set(events.map((event) => event.user_id).filter(Boolean)).size;
    const premiumEvents = events.filter((event) => isEventPremium(event)).length;
    const latestEvent = events?.[0];

    const updateEvent = async (eventId, endpoint) => {
        setLoadingAction(`${endpoint}-${eventId}`);

        try {
            const response = await fetch(`/admin/events/${eventId}/${endpoint}`, {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": getCsrf(),
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Ndryshimi dështoi");
            }

            const data = await response.json();

            setEvents((prev) =>
                prev.map((event) =>
                    event.id === eventId
                        ? { ...event, ...data.event }
                        : event
                )
            );
        } catch {
            alert("Ndryshimi nuk u krye. Kontrollo routes/controller.");
        } finally {
            setLoadingAction(null);
        }
    };

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
                            Menaxho eventet, statusin dhe Premium direkt nga admin paneli.
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

            <div className="grid gap-5 md:grid-cols-4">
                <StatCard label="Totali i eventeve" value={totalEvents} />
                <StatCard label="Përdorues me evente" value={totalUsers} />
                <StatCard label="Evente Premium" value={premiumEvents} />

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
                    <table className="w-full min-w-[1150px] text-left">
                        <thead className="bg-[#FAF8FF] text-xs uppercase tracking-[0.18em] text-[#8A85A3]">
                            <tr>
                                <th className="px-6 py-4">Eventi</th>
                                <th className="px-6 py-4">Përdoruesi</th>
                                <th className="px-6 py-4">Kodi</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Krijuar më</th>
                                <th className="px-6 py-4 text-right">Veprime</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#EEEAF8]">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => {
                                    const active = isEventActive(event);
                                    const premium = isEventPremium(event);

                                    const isStatusLoading =
                                        loadingAction === `toggle-status-${event.id}`;

                                    const isPremiumLoading =
                                        loadingAction === `toggle-premium-${event.id}`;

                                    return (
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

                                                        <div className="mt-1 text-xs font-semibold text-[#8A85A3]">
                                                            ID #{event.id}
                                                        </div>

                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-[11px] font-black ${
                                                                    active
                                                                        ? "bg-emerald-50 text-emerald-600"
                                                                        : "bg-red-50 text-red-600"
                                                                }`}
                                                            >
                                                                {active ? "Aktiv" : "I ndalur"}
                                                            </span>

                                                            <span
                                                                className={`rounded-full px-3 py-1 text-[11px] font-black ${
                                                                    premium
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : "bg-slate-100 text-slate-500"
                                                                }`}
                                                            >
                                                                {premium ? "Premium" : "Free"}
                                                            </span>

                                                            {premium && event.premium_until && (
                                                                <span className="rounded-full bg-[#F0EAFF] px-3 py-1 text-[11px] font-black text-[#7B61FF]">
                                                                    Deri {formatDate(event.premium_until)}
                                                                </span>
                                                            )}
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
                                                <div className="flex flex-wrap justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateEvent(event.id, "toggle-status")}
                                                        disabled={isStatusLoading}
                                                        className={`rounded-xl px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                                            active
                                                                ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                                                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                        }`}
                                                    >
                                                        {isStatusLoading ? "..." : active ? "Ndalo" : "Aktivizo"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => updateEvent(event.id, "toggle-premium")}
                                                        disabled={isPremiumLoading}
                                                        className={`rounded-xl px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                                            premium
                                                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                                : "bg-[#F0EAFF] text-[#7B61FF] hover:bg-[#E6DCFF]"
                                                        }`}
                                                    >
                                                        {isPremiumLoading ? "..." : premium ? "Hiq Premium" : "Jep Premium"}
                                                    </button>

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
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <h3 className="text-xl font-black text-[#211C35]">
                                            Nuk u gjet asnjë event
                                        </h3>
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
                        <h3 className="text-2xl font-black text-[#211C35]">
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