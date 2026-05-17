import "./bootstrap";
import "../css/app.css";

import React from "react";
import ReactDOM from "react-dom/client";

import PublicEventPage from "./pages/public/PublicEventPage";

const el = document.getElementById("event-public-root");

const parse = (value, fallback = null) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

if (el) {
    const page = el.dataset.page || "welcome";
    const event = parse(el.dataset.event, {});
    const templates = parse(el.dataset.templates, []);

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            <PublicEventPage page={page} event={event} templates={templates} />
        </React.StrictMode>
    );
}

const uploadUrl = el.dataset.uploadUrl;