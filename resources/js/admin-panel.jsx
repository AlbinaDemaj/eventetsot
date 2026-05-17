import "./bootstrap";
import "../css/app.css";

import React from "react";
import ReactDOM from "react-dom/client";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminUserShowPage from "./pages/admin/AdminUserShowPage";
import AdminUserFormPage from "./pages/admin/AdminUserFormPage";

import AdminPlansPage from "./pages/admin/AdminPlansPage";
import AdminPlanFormPage from "./pages/admin/AdminPlanFormPage";

import AdminEventsPage from "./pages/admin/AdminEventsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const el = document.getElementById("admin-panel-root");

const safeParse = (value, fallback = null) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("Admin panel JSON parse error:", error);
        return fallback;
    }
};

const adminPages = {
    dashboard: AdminDashboardPage,

    users: AdminUsersPage,
    "users-show": AdminUserShowPage,
    "users-create": (props) => <AdminUserFormPage {...props} mode="create" />,
    "users-edit": (props) => <AdminUserFormPage {...props} mode="edit" />,

    plans: AdminPlansPage,
    "plans-create": (props) => <AdminPlanFormPage {...props} mode="create" />,
    "plans-edit": (props) => <AdminPlanFormPage {...props} mode="edit" />,

    events: AdminEventsPage,

    settings: AdminSettingsPage,
};

function AdminRouter({ page, user, extra }) {
    const PageComponent = adminPages[page] || AdminDashboardPage;

    return <PageComponent user={user} extra={extra} />;
}

if (el) {
    const page = safeParse(el.dataset.page, "dashboard");
    const user = safeParse(el.dataset.user, null);
    const extra = safeParse(el.dataset.extra, {});

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            <AdminLayout user={user} page={page}>
                <AdminRouter page={page} user={user} extra={extra} />
            </AdminLayout>
        </React.StrictMode>
    );
}