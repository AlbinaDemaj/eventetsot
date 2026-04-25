import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

const el = document.getElementById("auth-root");

if (el) {
    const page = el.dataset.page;
    const csrfToken = el.dataset.csrf;
    const oldEmail = el.dataset.oldEmail || "";
    const oldName = el.dataset.oldName || "";
    const rawErrors = el.dataset.errors || "{}";

    let errors = {};
    try {
        errors = JSON.parse(rawErrors);
    } catch (e) {
        errors = {};
    }

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            {page === "login" ? (
                <LoginPage
                    csrfToken={csrfToken}
                    oldEmail={oldEmail}
                    errors={errors}
                />
            ) : (
                <RegisterPage
                    csrfToken={csrfToken}
                    oldEmail={oldEmail}
                    oldName={oldName}
                    errors={errors}
                />
            )}
        </React.StrictMode>
    );
}