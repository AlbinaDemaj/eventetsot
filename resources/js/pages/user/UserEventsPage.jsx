import React, { useMemo, useState } from "react";

const emptyForm = {
    name: "",
    type: "",
    location: "",
    event_date: "",
    guests: "",
    description: "",
};

const badgeStyles = {
    Wedding: "bg-pink-100 text-pink-700",
    Birthday: "bg-purple-100 text-purple-700",
    Party: "bg-blue-100 text-blue-700",
    Corporate: "bg-emerald-100 text-emerald-700",
    Engagement: "bg-amber-100 text-amber-700",
    Other: "bg-slate-100 text-slate-700",
};

function formatDate(dateString) {
    if (!dateString) return "No date selected";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

function getBadgeClass(type) {
    return badgeStyles[type] || badgeStyles.Other;
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
            alert("Please fill in event name and event date.");
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
                throw new Error("Failed to save event.");
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
            alert("Something went wrong while saving the event.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-6 shadow-sm sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.08),transparent_24%)]" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            My Events
                        </span>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F1A33] sm:text-4xl">
                            Manage your events in one place
                        </h1>

                        <p className="mt-3 text-sm leading-7 text-[#6E6A86] sm:text-base">
                            Here you can review your created events, check dates and details,
                            and quickly add a new event whenever you need.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowForm((prev) => !prev)}
                        className="inline-flex items-center justify-center rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/20 transition hover:-translate-y-0.5 hover:bg-[#684DFF]"
                    >
                        {showForm ? "Close form" : "+ Add New Event"}
                    </button>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-[24px] border border-[#ECEAF4] bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[#8A84A3]">Total events</p>
                    <h3 className="mt-3 text-3xl font-bold text-[#1F1A33]">{totalEvents}</h3>
                </div>

                <div className="rounded-[24px] border border-[#ECEAF4] bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[#8A84A3]">Upcoming events</p>
                    <h3 className="mt-3 text-3xl font-bold text-[#1F1A33]">{upcomingEvents}</h3>
                </div>

                <div className="rounded-[24px] border border-[#ECEAF4] bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[#8A84A3]">Total guests</p>
                    <h3 className="mt-3 text-3xl font-bold text-[#1F1A33]">{totalGuests}</h3>
                </div>
            </section>

            {showForm && (
                <section className="rounded-[28px] border border-[#ECEAF4] bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#1F1A33]">Create New Event</h2>
                        <p className="mt-2 text-sm text-[#7C7893]">
                            Fill in the details below to add a new event.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
                        <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Event name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter event name"
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Event type
                            </label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            >
                                <option value="">Select type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Party">Party</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Engagement">Engagement</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Event date
                            </label>
                            <input
                                type="date"
                                name="event_date"
                                value={form.event_date}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="md:col-span-1">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Number of guests
                            </label>
                            <input
                                type="number"
                                name="guests"
                                value={form.guests}
                                onChange={handleChange}
                                placeholder="e.g. 150"
                                min="0"
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-[#332E4A]">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Write a short description about the event"
                                className="w-full rounded-2xl border border-[#E6E1F0] bg-[#FCFBFF] px-4 py-3 text-sm outline-none transition focus:border-[#7B61FF] focus:ring-4 focus:ring-[#7B61FF]/10"
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7B61FF]/20 transition hover:bg-[#684DFF] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? "Saving..." : "Save Event"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setForm(emptyForm);
                                    setShowForm(false);
                                }}
                                className="rounded-2xl border border-[#E6E1F0] bg-white px-5 py-3 text-sm font-semibold text-[#4B4663] transition hover:bg-[#F8F6FF]"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="rounded-[28px] border border-[#ECEAF4] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1F1A33]">Your Event List</h2>
                        <p className="mt-2 text-sm text-[#7C7893]">
                            All events created by {user?.name || "you"} are shown here.
                        </p>
                    </div>
                </div>

                {eventList.length === 0 ? (
                    <div className="rounded-[24px] border border-dashed border-[#DDD7EE] bg-[#FCFBFF] px-6 py-12 text-center">
                        <h3 className="text-xl font-semibold text-[#2F2943]">No events yet</h3>
                        <p className="mt-2 text-sm text-[#7C7893]">
                            Start by creating your first event using the button above.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 xl:grid-cols-2">
                        {eventList.map((event) => (
                            <article
                                key={event.id}
                                className="group rounded-[24px] border border-[#ECEAF4] bg-[#FFFFFF] p-5 transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClass(
                                                event.type
                                            )}`}
                                        >
                                            {event.type || "Other"}
                                        </span>

                                        <h3 className="mt-3 text-xl font-bold text-[#1F1A33]">
                                            {event.name || "Untitled event"}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl bg-[#F8F6FF] px-3 py-2 text-right">
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A84A3]">
                                            Guests
                                        </p>
                                        <p className="text-lg font-bold text-[#2E2748]">
                                            {event.guests || 0}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3">
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A84A3]">
                                            Date
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-[#332E4A]">
                                            {formatDate(event.event_date)}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-[#FCFBFF] px-4 py-3">
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A84A3]">
                                            Location
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-[#332E4A]">
                                            {event.location || "No location"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-2xl bg-[#FCFBFF] px-4 py-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#8A84A3]">
                                        Description
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-[#5D5874]">
                                        {event.description || "No description added for this event."}
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