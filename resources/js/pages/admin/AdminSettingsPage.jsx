import { useState } from "react";

const getCsrf = () =>
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

export default function AdminSettingsPage({ user }) {
    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [passwords, setPasswords] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [saving, setSaving] = useState(false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        alert("Profile update backend-in do ta lidhim në hapin tjetër.");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwords.password !== passwords.password_confirmation) {
            alert("Password confirmation nuk përputhet.");
            return;
        }

        alert("Password update backend-in do ta lidhim në hapin tjetër.");
    };

    return (
        <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[32px] border border-[#EEEAF8] bg-[#FBFAFF] p-8 shadow-sm">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#7B61FF]/10 blur-3xl" />
                <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-[#6EC3F4]/20 blur-3xl" />

                <div className="relative">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#7B61FF] shadow-sm">
                        Admin Settings
                    </span>

                    <h1 className="mt-5 text-4xl font-black tracking-tight text-[#211C35]">
                        Settings
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#7E7896]">
                        Manage admin profile, security preferences and platform information.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EAFF] text-2xl">
                        👤
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#211C35]">
                        Admin Profile
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A85A3]">
                        Keep your admin identity updated for dashboard activity and ownership.
                    </p>

                    <div className="mt-6 rounded-2xl bg-[#FBFAFF] p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A85A3]">
                            Current Admin
                        </p>
                        <p className="mt-2 font-black text-[#211C35]">
                            {user?.name || "Admin"}
                        </p>
                        <p className="mt-1 text-sm text-[#8A85A3]">
                            {user?.email || "-"}
                        </p>
                    </div>
                </div>

                <div className="rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                        🛡️
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#211C35]">
                        Security Status
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A85A3]">
                        Password protection is enabled for the admin dashboard.
                    </p>

                    <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                        Protected Admin Account
                    </div>
                </div>

                <div className="rounded-[28px] border border-[#EEEAF8] bg-white p-6 shadow-sm">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0EAFF] text-2xl">
                        ⚙️
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#211C35]">
                        Platform
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#8A85A3]">
                        EventetSot admin panel is configured for platform management.
                    </p>

                    <div className="mt-6 rounded-2xl bg-[#FBFAFF] px-4 py-3 text-sm font-black text-[#7B61FF]">
                        Local Development
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <form
                    onSubmit={handleProfileSubmit}
                    className="rounded-[32px] border border-[#EEEAF8] bg-white p-7 shadow-sm"
                >
                    <div>
                        <h2 className="text-2xl font-black text-[#211C35]">
                            Profile Information
                        </h2>
                        <p className="mt-2 text-sm text-[#8A85A3]">
                            Update admin name and email address.
                        </p>
                    </div>

                    <div className="mt-7 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-black text-[#211C35]">
                                Admin Name
                            </label>
                            <input
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({ ...profile, name: e.target.value })
                                }
                                className="w-full rounded-2xl border border-[#EEEAF8] bg-[#FBFAFF] px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:ring-4 focus:ring-[#7B61FF]/10"
                                placeholder="Admin name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-black text-[#211C35]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({ ...profile, email: e.target.value })
                                }
                                className="w-full rounded-2xl border border-[#EEEAF8] bg-[#FBFAFF] px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:ring-4 focus:ring-[#7B61FF]/10"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-2xl bg-[#7B61FF] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#7B61FF]/25 transition hover:-translate-y-0.5 hover:bg-[#6A4DFF] disabled:opacity-60"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>

                <form
                    onSubmit={handlePasswordSubmit}
                    className="rounded-[32px] border border-[#EEEAF8] bg-white p-7 shadow-sm"
                >
                    <div>
                        <h2 className="text-2xl font-black text-[#211C35]">
                            Change Password
                        </h2>
                        <p className="mt-2 text-sm text-[#8A85A3]">
                            Use a strong password to protect the admin panel.
                        </p>
                    </div>

                    <div className="mt-7 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-black text-[#211C35]">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwords.current_password}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        current_password: e.target.value,
                                    })
                                }
                                className="w-full rounded-2xl border border-[#EEEAF8] bg-[#FBFAFF] px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:ring-4 focus:ring-[#7B61FF]/10"
                                placeholder="Current password"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-black text-[#211C35]">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwords.password}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full rounded-2xl border border-[#EEEAF8] bg-[#FBFAFF] px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:ring-4 focus:ring-[#7B61FF]/10"
                                placeholder="New password"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-black text-[#211C35]">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwords.password_confirmation}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        password_confirmation: e.target.value,
                                    })
                                }
                                className="w-full rounded-2xl border border-[#EEEAF8] bg-[#FBFAFF] px-5 py-4 text-sm font-semibold text-[#211C35] outline-none transition focus:border-[#7B61FF] focus:bg-white focus:ring-4 focus:ring-[#7B61FF]/10"
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-2xl bg-[#211C35] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#211C35]/15 transition hover:-translate-y-0.5 hover:bg-[#332A55]"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            <div className="rounded-[32px] border border-[#EEEAF8] bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-black text-[#211C35]">
                    Platform Preferences
                </h2>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                        ["Public Events", "Enabled", "Users can create public event pages."],
                        ["Media Uploads", "Enabled", "Photos and videos are allowed."],
                        ["Subscriptions", "Enabled", "Premium plans are available."],
                    ].map(([title, status, desc]) => (
                        <div
                            key={title}
                            className="rounded-[24px] border border-[#EEEAF8] bg-[#FBFAFF] p-5"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-black text-[#211C35]">{title}</h3>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                                    {status}
                                </span>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-[#8A85A3]">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}