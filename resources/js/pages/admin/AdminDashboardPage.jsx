export default function AdminDashboardPage({ user, extra = {} }) {
    const stats = extra.stats || {};
    const recentUsers = extra.recentUsers || [];
    const recentEvents = extra.recentEvents || [];
    const recentLogins = extra.recentLogins || [];
    const recentSubscriptions = extra.recentSubscriptions || [];
    const activities = extra.activities || [];
    const charts = extra.charts || {};

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

    const overviewCards = [
        {
            title: "Total Users",
            value: stats.totalUsers ?? 0,
            subtitle: "All registered accounts",
            tone: "purple",
        },
        {
            title: "Total Events",
            value: stats.totalEvents ?? 0,
            subtitle: "Events created on platform",
            tone: "blue",
        },
        {
            title: "Active Plans",
            value: stats.activePlans ?? 0,
            subtitle: "Currently active subscriptions",
            tone: "green",
        },
        {
            title: "Revenue",
            value: stats.totalRevenue ?? "€0.00",
            subtitle: "Estimated active subscriptions value",
            tone: "gold",
        },
    ];

    const quickInsights = [
        {
            label: "Media Uploads",
            value: stats.totalMedia ?? 0,
            help: "Total uploaded files",
        },
        {
            label: "Recent Users",
            value: recentUsers.length,
            help: "Latest registrations",
        },
        {
            label: "Recent Events",
            value: recentEvents.length,
            help: "Newest event activity",
        },
        {
            label: "Subscriptions",
            value: recentSubscriptions.length,
            help: "Latest plan updates",
        },
    ];

    return (
        <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[34px] border border-[#ECEAF4] bg-white p-6 shadow-[0_18px_60px_rgba(123,97,255,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,97,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(110,195,244,0.10),transparent_22%)]" />

                <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-[#7B61FF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                            Admin Analytics
                        </span>

                        <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#1F1B2D] sm:text-4xl">
                            Welcome back, {user?.name || "Admin"}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7C7890]">
                            Monitor user growth, subscriptions, event activity and recent
                            platform actions from one premium control center.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {quickInsights.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-[#ECEAF4] bg-white/80 px-4 py-4 shadow-sm backdrop-blur"
                            >
                                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9A96B2]">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-2xl font-bold text-[#1F1B2D]">
                                    {item.value}
                                </p>
                                <p className="mt-1 text-xs text-[#7C7890]">
                                    {item.help}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {overviewCards.map((card) => (
                    <StatCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        subtitle={card.subtitle}
                        tone={card.tone}
                    />
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <PanelCard
                    title="User Registrations"
                    description="New accounts in recent months."
                >
                    <BarChart data={charts.monthlyUsers || []} tone="purple" />
                </PanelCard>

                <PanelCard
                    title="Created Events"
                    description="Events created in recent months."
                >
                    <BarChart data={charts.monthlyEvents || []} tone="blue" />
                </PanelCard>

                <PanelCard
                    title="Login Activity"
                    description="Users signing in over the last 7 days."
                >
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
                <PanelCard
                    title="Media Upload Trends"
                    description="Media volume over recent months."
                >
                    <BarChart data={charts.monthlyMedia || []} tone="green" />
                </PanelCard>

                <PanelCard
                    title="Platform Split"
                    description="Quick comparison of key platform totals."
                >
                    <ComparisonChart
                        data={[
                            { label: "Users", value: Number(stats.totalUsers ?? 0) },
                            { label: "Events", value: Number(stats.totalEvents ?? 0) },
                            { label: "Plans", value: Number(stats.activePlans ?? 0) },
                            { label: "Media", value: Number(stats.totalMedia ?? 0) },
                        ]}
                    />
                </PanelCard>

                <PanelCard
                    title="Admin Highlights"
                    description="High-level platform health summary."
                >
                    <HighlightsList
                        items={[
                            {
                                label: "User growth",
                                value: `${charts.monthlyUsers?.reduce(
                                    (sum, item) => sum + Number(item.value || 0),
                                    0
                                ) || 0} recent signups`,
                            },
                            {
                                label: "Event activity",
                                value: `${charts.monthlyEvents?.reduce(
                                    (sum, item) => sum + Number(item.value || 0),
                                    0
                                ) || 0} recent events`,
                            },
                            {
                                label: "Subscriptions",
                                value: `${recentSubscriptions.length} latest updates`,
                            },
                            {
                                label: "Recent actions",
                                value: `${activities.length} tracked activities`,
                            },
                        ]}
                    />
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <PanelCard
                        title="Recent Users"
                        description="Accounts that registered most recently."
                    >
                        <div className="overflow-hidden rounded-2xl border border-[#ECEAF4]">
                            <table className="min-w-full divide-y divide-[#ECEAF4] text-sm">
                                <thead className="bg-[#FAF8FF] text-left text-[#6B6880]">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Name</th>
                                        <th className="px-4 py-3 font-semibold">Email</th>
                                        <th className="px-4 py-3 font-semibold">Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F1EFF8] bg-white">
                                    {recentUsers.length > 0 ? (
                                        recentUsers.map((item) => (
                                            <tr key={item.id} className="hover:bg-[#FCFBFF]">
                                                <td className="px-4 py-4 font-medium text-[#1F1B2D]">
                                                    {item.name}
                                                </td>
                                                <td className="px-4 py-4 text-[#6B6880]">
                                                    {item.email}
                                                </td>
                                                <td className="px-4 py-4 text-[#6B6880]">
                                                    {formatDateTime(item.created_at)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <EmptyTableRow colSpan={3} text="No users found." />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </PanelCard>
                </div>

                <div>
                    <PanelCard
                        title="Quick Actions"
                        description="Shortcuts for common admin tasks."
                    >
                        <div className="space-y-3">
                            <QuickAction
                                href="/admin/users"
                                title="Manage Users"
                                text="View and control registered accounts."
                            />
                            <QuickAction
                                href="/admin/dashboard"
                                title="Refresh Analytics"
                                text="Reload platform metrics and trends."
                            />
                        </div>
                    </PanelCard>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <PanelCard
                    title="Recent Events"
                    description="Latest event activity across the platform."
                >
                    <div className="space-y-3">
                        {recentEvents.length > 0 ? (
                            recentEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] p-4"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#1F1B2D]">
                                                {event.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-[#6B6880]">
                                                Owner: {event.owner}
                                            </p>
                                        </div>

                                        <div className="text-sm text-[#6B6880]">
                                            <p>{formatDateTime(event.date)}</p>
                                            <div className="mt-2">
                                                <StatusBadge
                                                    status={event.status || "Published"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="No events found yet." />
                        )}
                    </div>
                </PanelCard>

                <PanelCard
                    title="Recent Logins"
                    description="Latest user access activity."
                >
                    <div className="space-y-3">
                        {filledRecentLogins.length > 0 ? (
                            filledRecentLogins.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-[#ECEAF4] bg-white p-4"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B61FF]/10 font-semibold text-[#7B61FF]">
                                                {getInitials(item.name)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-[#1F1B2D]">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-sm text-[#6B6880]">
                                                    {item.email}
                                                </p>

                                                {item.isFallback && (
                                                    <p className="mt-2 text-xs text-[#A088D8]">
                                                        Showing fallback activity from recent
                                                        registrations
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <span className="text-xs text-[#8A86A3]">
                                            {formatDateTime(item.last_login_at)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="No recent logins available." />
                        )}
                    </div>
                </PanelCard>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <PanelCard
                    title="Recent Subscriptions"
                    description="Latest plan activity on the platform."
                >
                    <div className="space-y-3">
                        {recentSubscriptions.length > 0 ? (
                            recentSubscriptions.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] p-4"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="font-semibold text-[#1F1B2D]">
                                                {item.user_name}
                                            </h3>
                                            <p className="mt-1 text-sm text-[#6B6880]">
                                                {item.plan_name} — €
                                                {Number(item.price || 0).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="text-sm text-[#6B6880]">
                                            <div className="mb-2">
                                                <StatusBadge
                                                    status={normalizeSubscriptionStatus(
                                                        item.status
                                                    )}
                                                />
                                            </div>
                                            <p>{formatDateTime(item.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="No subscription activity found." />
                        )}
                    </div>
                </PanelCard>

                <PanelCard
                    title="Recent Activity"
                    description="Combined platform activity feed."
                >
                    <div className="space-y-3">
                        {activities.length > 0 ? (
                            activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start justify-between gap-4 rounded-2xl border border-[#ECEAF4] bg-white p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <ActivityDot type={activity.type} />
                                        <p className="text-sm font-medium text-[#1F1B2D]">
                                            {activity.text}
                                        </p>
                                    </div>

                                    <span className="whitespace-nowrap text-xs text-[#8A86A3]">
                                        {timeAgo(activity.time)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <EmptyBlock text="No activity yet." />
                        )}
                    </div>
                </PanelCard>
            </section>
        </div>
    );
}

function StatCard({ title, value, subtitle, tone = "purple" }) {
    const tones = {
        purple:
            "from-[#7B61FF]/14 to-transparent text-[#7B61FF] bg-[#F7F3FF]",
        blue: "from-[#6EC3F4]/14 to-transparent text-[#2E8FD6] bg-[#F2FAFF]",
        green:
            "from-[#52B788]/14 to-transparent text-[#2E9B67] bg-[#F1FCF6]",
        gold: "from-[#F0B44C]/14 to-transparent text-[#C98A12] bg-[#FFF9ED]",
    };

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_40px_rgba(123,97,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,97,255,0.14)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/6 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-[#7C7890]">{title}</p>
                    <h3 className="mt-3 text-3xl font-bold text-[#1F1B2D]">
                        {value}
                    </h3>
                    <p className="mt-2 text-sm text-[#9A96B2]">{subtitle}</p>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone] || tones.purple}`}
                >
                    <span className="h-3.5 w-3.5 rounded-full bg-current opacity-90" />
                </div>
            </div>
        </div>
    );
}

function PanelCard({ title, description, children }) {
    return (
        <div className="group relative overflow-hidden rounded-[30px] border border-[#ECEAF4] bg-white p-5 shadow-[0_12px_40px_rgba(123,97,255,0.06)] transition hover:shadow-[0_18px_50px_rgba(123,97,255,0.10)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/4 to-transparent opacity-0 transition group-hover:opacity-100" />

            <div className="relative z-10">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-[#1F1B2D]">{title}</h2>
                    <p className="mt-1 text-sm text-[#7C7890]">{description}</p>
                </div>
                {children}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Active: "bg-[#EAFBF1] text-[#1F8F55]",
        Pending: "bg-[#FFF8E8] text-[#C58A16]",
        Inactive: "bg-[#FFF1F3] text-[#D14D72]",
        Published: "bg-[#EEF4FF] text-[#4567D8]",
        Draft: "bg-[#F3F1FA] text-[#6B6880]",
        Cancelled: "bg-[#FFF1F3] text-[#D14D72]",
    };

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-[#F3F1FA] text-[#6B6880]"
            }`}
        >
            {status}
        </span>
    );
}

function QuickAction({ href, title, text }) {
    return (
        <a
            href={href}
            className="group block rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] p-4 transition hover:border-[#D9D2FF] hover:bg-[#F8F5FF]"
        >
            <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-[#1F1B2D]">{title}</h3>
                <span className="text-[#7B61FF] transition group-hover:translate-x-1">
                    →
                </span>
            </div>
            <p className="mt-1 text-sm text-[#7C7890]">{text}</p>
        </a>
    );
}

function EmptyTableRow({ colSpan, text }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-4 py-6 text-center text-sm text-[#8A86A3]">
                {text}
            </td>
        </tr>
    );
}

function EmptyBlock({ text }) {
    return (
        <div className="rounded-2xl border border-dashed border-[#DCD7F1] bg-[#FCFBFF] p-6 text-center text-sm text-[#8A86A3]">
            {text}
        </div>
    );
}

function ActivityDot({ type }) {
    const colorClass = {
        user_registered: "bg-[#7B61FF]",
        event_created: "bg-[#4567D8]",
        subscription: "bg-[#1F8F55]",
        login: "bg-[#C58A16]",
    }[type] || "bg-[#9A96B2]";

    return <span className={`mt-1 h-2.5 w-2.5 rounded-full ${colorClass}`} />;
}

function BarChart({ data = [], tone = "purple" }) {
    if (!data.length) {
        return <EmptyBlock text="No chart data available." />;
    }

    const max = Math.max(...data.map((item) => Number(item.value || 0)), 1);

    const gradients = {
        purple: "from-[#7B61FF] to-[#A78BFA]",
        blue: "from-[#4C8DFF] to-[#6EC3F4]",
        green: "from-[#2FB67B] to-[#8DE0B5]",
    };

    return (
        <div className="space-y-4">
            <div className="rounded-2xl bg-[#FCFBFF] p-4">
                <div className="flex h-52 items-end gap-3">
                    {data.map((item, index) => {
                        const value = Number(item.value || 0);
                        const height = Math.max((value / max) * 150, value > 0 ? 12 : 4);

                        return (
                            <div
                                key={`${item.label}-${index}`}
                                className="flex flex-1 flex-col items-center justify-end"
                            >
                                <div className="mb-2 text-xs font-semibold text-[#7B61FF]">
                                    {value}
                                </div>

                                <div className="flex h-[150px] w-full items-end">
                                    <div
                                        className={`w-full rounded-t-2xl bg-gradient-to-t ${gradients[tone] || gradients.purple} shadow-[0_10px_20px_rgba(123,97,255,0.12)]`}
                                        style={{ height: `${height}px` }}
                                    />
                                </div>

                                <div className="mt-3 text-xs text-[#7C7890]">
                                    {item.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function LineChart({ data = [] }) {
    if (!data.length) {
        return <EmptyBlock text="No chart data available." />;
    }

    const width = 360;
    const height = 200;
    const padding = 28;
    const values = data.map((item) => Number(item.value || 0));
    const max = Math.max(...values, 1);

    const points = data
        .map((item, index) => {
            const x =
                padding +
                (index * (width - padding * 2)) / Math.max(data.length - 1, 1);
            const y =
                height -
                padding -
                ((Number(item.value || 0) / max) * (height - padding * 2));
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="space-y-4">
            <div className="rounded-2xl bg-[#FCFBFF] p-4">
                <svg viewBox={`0 0 ${width} ${height}`} className="h-52 w-full">
                    <defs>
                        <linearGradient id="dashboardLineGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.03" />
                        </linearGradient>
                    </defs>

                    <polyline
                        fill="none"
                        stroke="#7B61FF"
                        strokeWidth="3"
                        points={points}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {data.map((item, index) => {
                        const x =
                            padding +
                            (index * (width - padding * 2)) /
                                Math.max(data.length - 1, 1);
                        const y =
                            height -
                            padding -
                            ((Number(item.value || 0) / max) * (height - padding * 2));

                        return (
                            <g key={`${item.label}-${index}`}>
                                <circle cx={x} cy={y} r="4.5" fill="#7B61FF" />
                                <text
                                    x={x}
                                    y={height - 8}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#7C7890"
                                >
                                    {item.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {data.map((item, index) => (
                    <div
                        key={`${item.label}-${index}-legend`}
                        className="rounded-2xl border border-[#ECEAF4] bg-white px-3 py-2 text-center"
                    >
                        <div className="text-xs text-[#7C7890]">{item.label}</div>
                        <div className="mt-1 text-sm font-semibold text-[#1F1B2D]">
                            {item.value || 0}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ComparisonChart({ data = [] }) {
    if (!data.length) {
        return <EmptyBlock text="No comparison data available." />;
    }

    const max = Math.max(...data.map((item) => Number(item.value || 0)), 1);

    return (
        <div className="space-y-4">
            {data.map((item) => {
                const width = `${Math.max((Number(item.value || 0) / max) * 100, 6)}%`;

                return (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-[#1F1B2D]">{item.label}</span>
                            <span className="text-[#7C7890]">{item.value}</span>
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
    if (!items.length) {
        return <EmptyBlock text="No highlights available." />;
    }

    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl border border-[#ECEAF4] bg-[#FCFBFF] p-4"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9A96B2]">
                        {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#1F1B2D]">
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
    return date.toLocaleString();
}

function timeAgo(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    return formatDateTime(value);
}

function normalizeSubscriptionStatus(status) {
    if (!status) return "Pending";

    const value = String(status).toLowerCase();
    if (value === "active") return "Active";
    if (value === "inactive") return "Inactive";
    if (value === "cancelled" || value === "canceled") return "Cancelled";

    return "Pending";
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