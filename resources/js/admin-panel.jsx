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

const el = document.getElementById("admin-panel-root");

const safeParse = (value, fallback) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("JSON parse error:", error);
        return fallback;
    }
};

function AdminRouter({ page, user, extra }) {
    switch (page) {

        // ================= USERS =================
        case "users":
            return <AdminUsersPage user={user} extra={extra} />;

        case "users-show":
            return <AdminUserShowPage user={user} extra={extra} />;

        case "users-edit":
            return <AdminUserFormPage user={user} extra={extra} mode="edit" />;

        case "users-create":
            return <AdminUserFormPage user={user} extra={extra} mode="create" />;


        // ================= PLANS =================
        case "plans":
            return <AdminPlansPage user={user} extra={extra} />;

        case "plans-create":
            return <AdminPlanFormPage user={user} extra={extra} mode="create" />;

        case "plans-edit":
            return <AdminPlanFormPage user={user} extra={extra} mode="edit" />;


        // ================= DASHBOARD =================
        case "dashboard":
        default:
            return <AdminDashboardPage user={user} extra={extra} />;
    }
}

if (el) {
    const page = safeParse(el.dataset.page, "dashboard");
    const user = safeParse(el.dataset.user, null);
    const extra = safeParse(el.dataset.extra, {});

    const root = ReactDOM.createRoot(el);

    root.render(
        <React.StrictMode>
            <AdminLayout user={user} page={page}>
                <AdminRouter page={page} user={user} extra={extra} />
            </AdminLayout>
        </React.StrictMode>
    );
}