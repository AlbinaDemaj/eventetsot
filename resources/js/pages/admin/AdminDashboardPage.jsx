import { useMemo, useState } from "react";

export default function AdminDashboardPage({ user, extra = {} }) {
    const stats = extra.stats || {};
    const recentUsers = extra.recentUsers || [];
    const recentEvents = extra.recentEvents || [];
    const recentLogins = extra.recentLogins || [];
    const recentSubscriptions = extra.recentSubscriptions || [];
    const activities = extra.activities || [];
    const charts = extra.charts || {};

    const [activeSlide, setActiveSlide] = useState(0);

    const filledRecentLogins =
        recentLogins.length > 0
            ? recentLogins
            : recentUsers.slice(0, 5).map((item) => ({
                  id: `fallback-login-${item.id}`,
                  name: item.name,
                  email: item.email,
                  last_login_at: item.created_at,
                  isFallback: true,
              }));

    const eventSlides = recentEvents.length > 0 ? recentEvents : [];

    const overviewCards = [
        {
            title: "Përdorues",
            value: stats.totalUsers ?? 0,
            subtitle: "Llogari të regjistruara",
            tone: "purple",
            initials: "US",
        },
        {
            title: "Evente",
            value: stats.totalEvents ?? 0,
            subtitle: "Evente të krijuara",
            tone: "blue",
            initials: "EV",
        },
        {
            title: "Plane aktive",
            value: stats.activePlans ?? 0,
            subtitle: "Abonime aktive",
            tone: "green",
            initials: "PL",
        },
        {
            title: "Të ardhura",
            value: stats.totalRevenue ?? "€0.00",
            subtitle: "Vlerë e abonimeve aktive",
            tone: "gold",
            initials: "RV",
        },
    ];

    const quickInsights = [
        {
            label: "Media",
            value: stats.totalMedia ?? 0,
            help: "Foto dhe video të ngarkuara",
        },
        {
            label: "Përdorues të rinj",
            value: recentUsers.length,
            help: "Regjistrimet e fundit",
        },
        {
            label: "Evente të fundit",
            value: recentEvents.length,
            help: "Aktiviteti më i ri",
        },
        {
            label: "Abonime",
            value: recentSubscriptions.length,
            help: "Përditësime planesh",
        },
    ];

    const nextSlide = () => {
        if (!eventSlides.length) return;
        setActiveSlide((prev) => (prev + 1) % eventSlides.length);
    };

    const previousSlide = () => {
        if (!eventSlides.length) return;
        setActiveSlide((prev) =>
            prev === 0 ? eventSlides.length - 1 : prev - 1
        );
    };

    const totalRecentSignups = useMemo(() => {
        return (
            charts.monthlyUsers?.reduce(
                (sum, item) => sum + Number(item.value || 0),
                0
            ) || 0
        );
    }, [charts.monthlyUsers]);

    const totalRecentEvents = useMemo(() => {
        return (
            charts.monthlyEvents?.reduce(
                (sum, item) => sum + Number(item.value || 0),
                0
            ) || 0
        );
    }, [charts.monthlyEvents]);

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[32px] border border-[#EEEAF8] bg-white p-7 shadow-[0_18px_55px_rgba(33,28,53,0.06)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7B61FF] via-[#A78BFA] to-[#6EC3F4]" />
                <div className="absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#7B61FF]/10 blur-3xl" />
                <div className="absolute bottom-[-120px] left-[-120px] h-72 w-72 rounded-full bg-[#6EC3F4]/12 blur-3xl" />

                <div className="relative grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
                    <div>
                        <span className="inline-flex rounded-full border border-[#EEEAF8] bg-[#FBFAFF] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#7B61FF]">
                            Panel administrimi
                        </span>

                        <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.05em] text-[#211C35] sm:text-5xl">
                            Mirë se erdhe, {user?.name || "Admin"}
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#7E7896]">
                            Monitoro përdoruesit, eventet, abonimet dhe aktivitetin e
                            platformës nga një dashboard i pastër dhe profesional.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="/admin/events"
                                className="rounded-2xl bg-[#7B61FF] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#7B61FF]/20 transition hover:-translate-y-0.5 hover:bg-[#6A4DFF]"
                            >
                                Menaxho eventet
                            </a>

                            <a
                                href="/admin/users"
                                className="rounded-2xl border border-[#EEEAF8] bg-white px-5 py-3 text-sm font-black text-[#211C35] transition hover:-translate-y-0.5 hover:border-[#D8D0FF] hover:bg-[#F8F5FF]"
                            >
                                Shiko përdoruesit
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {quickInsights.map((item) => (
                            <MiniMetric key={item.label} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((card) => (
                    <StatCard key={card.title} {...card} />
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <PanelCard
                        title="Eventet e fundit"
                        description="Pamje e shpejtë e eventeve më të reja në platformë."
                    >
                        {eventSlides.length > 0 ? (
                            <div className="relative overflow-hidden rounded-[28px] border border-[#EEEAF8] bg-[#FBFAFF] p-6">
                                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#7B61FF]/8 blur-2xl" />

                                <div className="relative">
                                    <div className="flex items-start justify-between gap-5">
                                        <div>
                                            <span className="rounded-full border border-[#EEEAF8] bg-white px-3 py-1 text-xs font-black text-[#7B61FF]">
                                                Event #{eventSlides[activeSlide]?.id}
                                            </span>

                                            <h3 className="mt-4 text-2xl font-black text-[#211C35]">
                                                {eventSlides[activeSlide]?.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-[#7E7896]">
                                                Krijuar nga{" "}
                                                <strong className="text-[#211C35]">
                                                    {eventSlides[activeSlide]?.owner}
                                                </strong>
                                            </p>

                                            <p className="mt-2 text-sm text-[#7E7896]">
                                                {formatDateTime(eventSlides[activeSlide]?.date)}
                                            </p>
                                        </div>

                                        <StatusBadge
                                            status={
                                                eventSlides[activeSlide]?.status || "Publikuar"
                                            }
                                        />
                                    </div>

                                    <div className="mt-7 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {eventSlides.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveSlide(index)}
                                                    className={`h-2.5 rounded-full transition ${
                                                        activeSlide === index
                                                            ? "w-8 bg-[#7B61FF]"
                                                            : "w-2.5 bg-[#D8D3EF]"
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={previousSlide}
                                                className="rounded-xl border border-[#EEEAF8] bg-white px-4 py-2 text-sm font-black text-[#7B61FF] hover:bg-[#F0EAFF]"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                className="rounded-xl bg-[#7B61FF] px-4 py-2 text-sm font-black text-white hover:bg-[#6A4DFF]"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <EmptyBlock text="Ende nuk ka evente për t’u shfaqur." />
                        )}
                    </PanelCard>
                </div>

                <PanelCard
                    title="Veprime të shpejta"
                    description="Shkurtore për menaxhimin e platformës."
                >
                    <div className="space-y-3">
                        <QuickAction href="/admin/events" title="Menaxho eventet" text="Shiko, edito dhe kontrollo eventet." />
                        <QuickAction href="/admin/users" title="Menaxho përdoruesit" text="Kontrollo llogaritë e regjistruara." />
                        <QuickAction href="/admin/plans" title="Menaxho planet" text="Përditëso paketat dhe abonimet." />
                        <QuickAction href="/admin/settings" title="Settings" text="Ndrysho profilin dhe sigurinë e adminit." />
                    </div>
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <PanelCard title="Regjistrimet e përdoruesve" description="Përdorues të rinj në muajt e fundit.">
                    <BarChart data={charts.monthlyUsers || []} tone="purple" />
                </PanelCard>

                <PanelCard title="Eventet e krijuara" description="Aktiviteti i eventeve në platformë.">
                    <BarChart data={charts.monthlyEvents || []} tone="blue" />
                </PanelCard>

                <PanelCard title="Aktiviteti i kyçjeve" description="Hyrjet e përdoruesve gjatë ditëve të fundit.">
                    <LineChart
                        data={
                            charts.loginActivity?.length
                                ? charts.loginActivity
                                : filledRecentLogins.slice(0, 7).map((item, index) => ({
                                      label: `D${index + 1}`,
                                      value: index + 1,
                                  }))
                        }
                    />
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <PanelCard title="Ngarkimet e medias" description="Volumi i fotove dhe videove të ngarkuara.">
                    <BarChart data={charts.monthlyMedia || []} tone="green" />
                </PanelCard>

                <PanelCard title="Krahasimi i platformës" description="Raport i shpejtë mes moduleve kryesore.">
                    <ComparisonChart
                        data={[
                            { label: "Përdorues", value: Number(stats.totalUsers ?? 0) },
                            { label: "Evente", value: Number(stats.totalEvents ?? 0) },
                            { label: "Plane", value: Number(stats.activePlans ?? 0) },
                            { label: "Media", value: Number(stats.totalMedia ?? 0) },
                        ]}
                    />
                </PanelCard>

                <PanelCard title="Përmbledhje" description="Gjendja aktuale e platformës.">
                    <HighlightsList
                        items={[
                            {
                                label: "Rritja e përdoruesve",
                                value: `${totalRecentSignups} regjistrime të fundit`,
                            },
                            {
                                label: "Aktiviteti i eventeve",
                                value: `${totalRecentEvents} evente të fundit`,
                            },
                            {
                                label: "Abonimet",
                                value: `${recentSubscriptions.length} përditësime të fundit`,
                            },
                            {
                                label: "Aktivitete",
                                value: `${activities.length} aktivitete të gjurmuara`,
                            },
                        ]}
                    />
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <PanelCard title="Përdoruesit e fundit" description="Llogaritë më të reja të regjistruara.">
                        <div className="overflow-hidden rounded-2xl border border-[#EEEAF8]">
                            <table className="min-w-full divide-y divide-[#EEEAF8] text-sm">
                                <thead className="bg-[#FAF8FF] text-left text-[#6F6A86]">
                                    <tr>
                                        <th className="px-4 py-3 font-black">Emri</th>
                                        <th className="px-4 py-3 font-black">Email</th>
                                        <th className="px-4 py-3 font-black">Regjistruar</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#F1EFF8] bg-white">
                                    {recentUsers.length > 0 ? (
                                        recentUsers.map((item) => (
                                            <tr key={item.id} className="transition hover:bg-[#FCFBFF]">
                                                <td className="px-4 py-4 font-bold text-[#211C35]">{item.name}</td>
                                                <td className="px-4 py-4 text-[#6F6A86]">{item.email}</td>
                                                <td className="px-4 py-4 text-[#6F6A86]">
                                                    {formatDateTime(item.created_at)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <EmptyTableRow colSpan={3} text="Nuk ka përdorues të regjistruar." />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </PanelCard>
                </div>

                <PanelCard title="Kyçjet e fundit" description="Aktiviteti i hyrjeve në platformë.">
                    <div className="space-y-3">
                        {filledRecentLogins.length > 0 ? (
                            filledRecentLogins.map((item) => (
                                <UserActivityCard key={item.id} item={item} />
                            ))
                        ) : (
                            <EmptyBlock text="Nuk ka kyçje të fundit." />
                        )}
                    </div>
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <PanelCard title="Abonimet e fundit" description="Aktiviteti më i ri i planeve premium.">
                    <div className="space-y-3">
                        {recentSubscriptions.length > 0 ? (
                            recentSubscriptions.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-[#EEEAF8] bg-[#FCFBFF] p-4">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="font-black text-[#211C35]">{item.user_name}</h3>
                                            <p className="mt-1 text-sm text-[#6F6A86]">
                                                {item.plan_name} — €{Number(item.price || 0).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="text-sm text-[#6F6A86]">
                                            <div className="mb-2">
                                                <StatusBadge status={normalizeSubscriptionStatus(item.status)} />
                                            </div>
                                            <p>{formatDateTime(item.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="Nuk ka aktivitet abonimesh." />
                        )}
                    </div>
                </PanelCard>

                <PanelCard title="Aktiviteti i fundit" description="Feed i kombinuar i veprimeve në platformë.">
                    <div className="space-y-3">
                        {activities.length > 0 ? (
                            activities.map((activity) => (
                                <div key={activity.id} className="flex items-start justify-between gap-4 rounded-2xl border border-[#EEEAF8] bg-white p-4">
                                    <div className="flex items-start gap-3">
                                        <ActivityDot type={activity.type} />
                                        <p className="text-sm font-bold text-[#211C35]">
                                            {translateActivity(activity.text)}
                                        </p>
                                    </div>

                                    <span className="whitespace-nowrap text-xs text-[#8A85A3]">
                                        {timeAgo(activity.time)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="Ende nuk ka aktivitet." />
                        )}
                    </div>
                </PanelCard>
            </section>
        </div>
    );
}

function MiniMetric({ label, value, help }) {
    return (
        <div className="rounded-[22px] border border-[#EEEAF8] bg-white/85 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9A96B2]">{label}</p>
            <p className="mt-2 text-3xl font-black text-[#211C35]">{value}</p>
            <p className="mt-1 text-xs leading-5 text-[#7E7896]">{help}</p>
        </div>
    );
}

function StatCard({ title, value, subtitle, tone = "purple", initials = "ST" }) {
    const tones = {
        purple: "text-[#7B61FF] bg-[#F5F1FF] border-[#E6DDFF]",
        blue: "text-[#2E8FD6] bg-[#F1FAFF] border-[#DDEFFF]",
        green: "text-[#2E9B67] bg-[#F0FCF6] border-[#DDF5E8]",
        gold: "text-[#C98A12] bg-[#FFF8EA] border-[#F7E6BB]",
    };

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-[0_12px_38px_rgba(33,28,53,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(33,28,53,0.09)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#7B61FF] to-[#6EC3F4] opacity-0 transition group-hover:opacity-100" />

            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-bold text-[#7E7896]">{title}</p>
                    <h3 className="mt-3 text-3xl font-black text-[#211C35]">{value}</h3>
                    <p className="mt-2 text-sm text-[#9A96B2]">{subtitle}</p>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-xs font-black ${tones[tone] || tones.purple}`}>
                    {initials}
                </div>
            </div>
        </div>
    );
}

function PanelCard({ title, description, children }) {
    return (
        <div className="rounded-[30px] border border-[#EEEAF8] bg-white p-6 shadow-[0_12px_38px_rgba(33,28,53,0.045)] transition hover:shadow-[0_20px_55px_rgba(33,28,53,0.08)]">
            <div className="mb-5">
                <h2 className="text-xl font-black text-[#211C35]">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#7E7896]">{description}</p>
            </div>
            {children}
        </div>
    );
}

function QuickAction({ href, title, text }) {
    return (
        <a
            href={href}
            className="group block rounded-2xl border border-[#EEEAF8] bg-[#FCFBFF] p-4 transition hover:-translate-y-0.5 hover:border-[#D9D2FF] hover:bg-[#F8F5FF]"
        >
            <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-[#211C35]">{title}</h3>
                <span className="text-sm font-black text-[#7B61FF] transition group-hover:translate-x-1">
                    View
                </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-[#7E7896]">{text}</p>
        </a>
    );
}

function UserActivityCard({ item }) {
    return (
        <div className="rounded-2xl border border-[#EEEAF8] bg-white p-4 transition hover:-translate-y-0.5 hover:bg-[#FCFBFF]">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F1FF] text-xs font-black text-[#7B61FF]">
                        {getInitials(item.name)}
                    </div>

                    <div>
                        <p className="font-black text-[#211C35]">{item.name}</p>
                        <p className="mt-1 text-sm text-[#6F6A86]">{item.email}</p>

                        {item.isFallback && (
                            <p className="mt-2 text-xs text-[#A088D8]">
                                Shfaqur nga regjistrimet e fundit
                            </p>
                        )}
                    </div>
                </div>

                <span className="text-xs text-[#8A85A3]">
                    {formatDateTime(item.last_login_at)}
                </span>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const translated = translateStatus(status);

    const styles = {
        Aktiv: "bg-[#EAFBF1] text-[#1F8F55]",
        Nëpritje: "bg-[#FFF8E8] text-[#C58A16]",
        Joaktiv: "bg-[#FFF1F3] text-[#D14D72]",
        Publikuar: "bg-[#EEF4FF] text-[#4567D8]",
        Draft: "bg-[#F3F1FA] text-[#6B6880]",
        Anuluar: "bg-[#FFF1F3] text-[#D14D72]",
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${styles[translated] || "bg-[#F3F1FA] text-[#6B6880]"}`}>
            {translated}
        </span>
    );
}

function EmptyTableRow({ colSpan, text }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-4 py-7 text-center text-sm text-[#8A85A3]">
                {text}
            </td>
        </tr>
    );
}

function EmptyBlock({ text }) {
    return (
        <div className="rounded-2xl border border-dashed border-[#DCD7F1] bg-[#FCFBFF] p-7 text-center text-sm text-[#8A85A3]">
            {text}
        </div>
    );
}

function ActivityDot({ type }) {
    const colorClass =
        {
            user_registered: "bg-[#7B61FF]",
            event_created: "bg-[#4567D8]",
            subscription: "bg-[#1F8F55]",
            login: "bg-[#C58A16]",
        }[type] || "bg-[#9A96B2]";

    return <span className={`mt-1 h-2.5 w-2.5 rounded-full ${colorClass}`} />;
}

function BarChart({ data = [], tone = "purple" }) {
    if (!data.length) return <EmptyBlock text="Nuk ka të dhëna për grafik." />;

    const max = Math.max(...data.map((item) => Number(item.value || 0)), 1);

    const gradients = {
        purple: "from-[#7B61FF] to-[#A78BFA]",
        blue: "from-[#4C8DFF] to-[#6EC3F4]",
        green: "from-[#2FB67B] to-[#8DE0B5]",
    };

    return (
        <div className="rounded-2xl bg-[#FCFBFF] p-4">
            <div className="flex h-52 items-end gap-3">
                {data.map((item, index) => {
                    const value = Number(item.value || 0);
                    const height = Math.max((value / max) * 150, value > 0 ? 12 : 4);

                    return (
                        <div key={`${item.label}-${index}`} className="flex flex-1 flex-col items-center justify-end">
                            <div className="mb-2 text-xs font-black text-[#7B61FF]">{value}</div>

                            <div className="flex h-[150px] w-full items-end">
                                <div
                                    className={`w-full rounded-t-2xl bg-gradient-to-t ${gradients[tone] || gradients.purple}`}
                                    style={{ height: `${height}px` }}
                                />
                            </div>

                            <div className="mt-3 text-xs text-[#7E7896]">{item.label}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function LineChart({ data = [] }) {
    if (!data.length) return <EmptyBlock text="Nuk ka të dhëna për grafik." />;

    const width = 360;
    const height = 200;
    const padding = 28;
    const values = data.map((item) => Number(item.value || 0));
    const max = Math.max(...values, 1);

    const points = data
        .map((item, index) => {
            const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
            const y = height - padding - (Number(item.value || 0) / max) * (height - padding * 2);
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="rounded-2xl bg-[#FCFBFF] p-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full">
                <polyline
                    fill="none"
                    stroke="#7B61FF"
                    strokeWidth="3"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {data.map((item, index) => {
                    const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
                    const y = height - padding - (Number(item.value || 0) / max) * (height - padding * 2);

                    return (
                        <g key={`${item.label}-${index}`}>
                            <circle cx={x} cy={y} r="5" fill="#7B61FF" />
                            <text x={x} y={height - 8} textAnchor="middle" fontSize="10" fill="#7E7896">
                                {item.label}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function ComparisonChart({ data = [] }) {
    if (!data.length) return <EmptyBlock text="Nuk ka të dhëna për krahasim." />;

    const max = Math.max(...data.map((item) => Number(item.value || 0)), 1);

    return (
        <div className="space-y-4">
            {data.map((item) => {
                const width = `${Math.max((Number(item.value || 0) / max) * 100, 6)}%`;

                return (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-black text-[#211C35]">{item.label}</span>
                            <span className="text-[#7E7896]">{item.value}</span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-[#F1EEFB]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#7B61FF] to-[#A78BFA]"
                                style={{ width }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function HighlightsList({ items = [] }) {
    if (!items.length) return <EmptyBlock text="Nuk ka përmbledhje." />;

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#EEEAF8] bg-[#FCFBFF] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9A96B2]">
                        {item.label}
                    </p>
                    <p className="mt-2 text-sm font-black text-[#211C35]">
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

function formatDateTime(value) {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("sq-AL", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function timeAgo(value) {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s më parë`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m më parë`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h më parë`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ditë më parë`;

    return formatDateTime(value);
}

function normalizeSubscriptionStatus(status) {
    if (!status) return "Nëpritje";

    const value = String(status).toLowerCase();

    if (value === "active") return "Aktiv";
    if (value === "inactive") return "Joaktiv";
    if (value === "cancelled" || value === "canceled") return "Anuluar";

    return "Nëpritje";
}

function translateStatus(status) {
    const value = String(status || "").toLowerCase();

    if (value === "active") return "Aktiv";
    if (value === "inactive") return "Joaktiv";
    if (value === "pending") return "Nëpritje";
    if (value === "published") return "Publikuar";
    if (value === "draft") return "Draft";
    if (value === "cancelled" || value === "canceled") return "Anuluar";

    return status || "Publikuar";
}

function translateActivity(text) {
    if (!text) return "-";

    return String(text)
        .replace("registered on the platform", "u regjistrua në platformë")
        .replace("created event", "krijoi eventin")
        .replace("started", "aktivizoi planin")
        .replace("logged into the platform", "u kyç në platformë");
}

function getInitials(name) {
    if (!name) return "U";

    return String(name)
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}