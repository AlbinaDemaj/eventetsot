import React, { useMemo, useState } from "react";

const emptyForm = {
    name: "",
    type: "",
    location: "",
    event_date: "",
    guests: "",
    description: "",
};

const eventTypes = {
    Wedding: "Dasmë",
    Birthday: "Ditëlindje",
    Party: "Festë",
    Corporate: "Biznes",
    Engagement: "Fejesë",
    Other: "Tjetër",
};

const badgeStyles = {
    Wedding: "bg-pink-50 text-pink-700 border-pink-100",
    Birthday: "bg-purple-50 text-purple-700 border-purple-100",
    Party: "bg-blue-50 text-blue-700 border-blue-100",
    Corporate: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Engagement: "bg-amber-50 text-amber-700 border-amber-100",
    Other: "bg-slate-50 text-slate-700 border-slate-100",
};

function formatDate(dateString) {
    if (!dateString) return "Pa datë";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("sq-AL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}

function getBadgeClass(type) {
    return badgeStyles[type] || badgeStyles.Other;
}

function getEventTypeLabel(type) {
    return eventTypes[type] || "Tjetër";
}

export default function UserEventsPage({ user, events = [] }) {
    const [eventList, setEventList] = useState(Array.isArray(events) ? events : []);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalEvents = eventList.length;

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return eventList.filter((event) => {
            if (!event.event_date) return false;
            const eventDate = new Date(event.event_date);
            return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
        }).length;
    }, [eventList]);

    const totalGuests = useMemo(() => {
        return eventList.reduce((sum, event) => sum + Number(event.guests || 0), 0);
    }, [eventList]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.event_date) {
            alert("Ju lutem plotësoni emrin dhe datën e eventit.");
            return;
        }

        const csrfToken =
            document.querySelector('meta[name="csrf-token"]')?.content || "";

        const payload = {
            name: form.name.trim(),
            event_date: form.event_date,
        };

        setIsSubmitting(true);

        try {
            const response = await fetch("/user/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Eventi nuk u ruajt.");
            }

            const newEvent = {
                id: Date.now(),
                name: form.name.trim(),
                type: form.type.trim() || "Other",
                location: form.location.trim(),
                event_date: form.event_date,
                guests: form.guests ? Number(form.guests) : 0,
                description: form.description.trim(),
            };

            setEventList((prev) => [newEvent, ...prev]);
            setForm(emptyForm);
            setShowForm(false);

            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Ndodhi një gabim gjatë ruajtjes së eventit.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(123,97,255,0.16),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(110,195,244,0.16),transparent_28%),linear-gradient(135deg,#ffffff_0%,#faf8ff_52%,#f8fbff_100%)]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full border border-[#E8E1FF] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7B61FF] shadow-sm">
                            Eventet e mia
                        </span>

                        <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                            Menaxho të gjitha eventet në një vend.
                        </h1>

                        <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[15px]">
                            Shiko eventet e krijuara, kontrollo datat, vendndodhjen dhe detajet
                            kryesore. Nga këtu mund të shtosh shpejt një event të ri dhe ta mbash
                            çdo gjë të organizuar.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowForm((prev) => !prev)}
                        className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(123,97,255,0.25)] transition hover:-translate-y-0.5"
                    >
                        {showForm ? "Mbyll formularin" : "+ Shto event të ri"}
                    </button>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatBox label="Totali i eventeve" value={totalEvents} />
                <StatBox label="Evente të ardhshme" value={upcomingEvents} />
                <StatBox label="Totali i mysafirëve" value={totalGuests} />
            </section>

            {showForm && (
                <section className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Event i ri
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                            Krijo një event të ri
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-slate-500">
                            Plotëso të dhënat kryesore të eventit. Emri dhe data janë të
                            detyrueshme.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                        <FormInput
                            label="Emri i eventit"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="P.sh. Dasma e Ardit dhe Elës"
                        />

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                Lloji i eventit
                            </label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            >
                                <option value="">Zgjidh llojin</option>
                                <option value="Wedding">Dasmë</option>
                                <option value="Birthday">Ditëlindje</option>
                                <option value="Party">Festë</option>
                                <option value="Corporate">Event biznesi</option>
                                <option value="Engagement">Fejesë</option>
                                <option value="Other">Tjetër</option>
                            </select>
                        </div>

                        <FormInput
                            label="Vendndodhja"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="P.sh. Prishtinë"
                        />

                        <FormInput
                            label="Data e eventit"
                            type="date"
                            name="event_date"
                            value={form.event_date}
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Numri i mysafirëve"
                            type="number"
                            name="guests"
                            value={form.guests}
                            onChange={handleChange}
                            placeholder="P.sh. 150"
                            min="0"
                        />

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-bold text-slate-700">
                                Përshkrimi
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Shkruaj një përshkrim të shkurtër për eventin..."
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 md:col-span-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(123,97,255,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? "Duke u ruajtur..." : "Ruaj eventin"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm(emptyForm);
                                    setShowForm(false);
                                }}
                                className="rounded-2xl border border-[#E6E1F0] bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-[#D8D0FF] hover:bg-[#FAF8FF]"
                            >
                                Anulo
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="rounded-[34px] border border-white/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Lista e eventeve
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                            Eventet e krijuara
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Të gjitha eventet e {user?.name || "llogarisë suaj"} shfaqen këtu.
                        </p>
                    </div>
                </div>

                {eventList.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-[#DDD7EE] bg-[#FCFBFF] px-6 py-12 text-center">
                        <h3 className="text-xl font-black text-slate-950">
                            Ende nuk ka evente
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                            Fillo duke krijuar eventin e parë nga butoni “Shto event të ri”.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 xl:grid-cols-2">
                        {eventList.map((event) => (
                            <article
                                key={event.id}
                                className="group rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D8D0FF] hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <span
                                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getBadgeClass(
                                                event.type
                                            )}`}
                                        >
                                            {getEventTypeLabel(event.type)}
                                        </span>

                                        <h3 className="mt-3 text-xl font-black tracking-[-0.02em] text-slate-950">
                                            {event.name || "Event pa emër"}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-[#F8F6FF] px-4 py-3 text-right">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                            Mysafirë
                                        </p>

                                        <p className="text-lg font-black text-slate-950">
                                            {event.guests || 0}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <EventInfo label="Data" value={formatDate(event.event_date)} />
                                    <EventInfo
                                        label="Vendndodhja"
                                        value={event.location || "Pa vendndodhje"}
                                    />
                                </div>

                                <div className="mt-4 rounded-2xl bg-[#FCFBFF] px-4 py-4 ring-1 ring-[#F1EDFF]">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                        Përshkrimi
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {event.description ||
                                            "Nuk është shtuar ende përshkrim për këtë event."}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function StatBox({ label, value }) {
    return (
        <div className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold text-slate-400">{label}</p>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                {value}
            </h3>
        </div>
    );
}

function FormInput({ label, className = "", ...props }) {
    return (
        <div className={className}>
            <label className="mb-2 block text-sm font-bold text-slate-700">
                {label}
            </label>

            <input
                {...props}
                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
            />
        </div>
    );
}

function EventInfo({ label, value }) {
    return (
        <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3 ring-1 ring-[#F1EDFF]">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800">
                {value}
            </p>
        </div>
    );
}