import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import EventNamePage from "./components/onboarding/EventNamePage";
import EventDatePage from "./components/onboarding/EventDatePage";

const el = document.getElementById("onboarding-root");

if (el) {
    const page = el.dataset.page;
    const csrfToken = el.dataset.csrf;
    const oldEventName = el.dataset.oldEventName || "";
    const oldEventDate = el.dataset.oldEventDate || "";
    const rawErrors = el.dataset.errors || "{}";

    let errors = {};
    try {
        errors = JSON.parse(rawErrors);
    } catch (e) {
        errors = {};
    }

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            {page === "event-name" ? (
                <EventNamePage
                    csrfToken={csrfToken}
                    oldEventName={oldEventName}
                    errors={errors}
                />
            ) : (
                <EventDatePage
                    csrfToken={csrfToken}
                    oldEventDate={oldEventDate}
                    errors={errors}
                />
            )}
        </React.StrictMode>
    );
}