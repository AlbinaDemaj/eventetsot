import "./bootstrap";
import "../css/app.css";

import React from "react";
import ReactDOM from "react-dom/client";

import UserLayout from "./layouts/UserLayout";

import UserHomePage from "./pages/user/UserHomePage";
import UserSettingsPage from "./pages/user/UserSettingsPage";
import UserMediaPage from "./pages/user/UserMediaPage";
import UserEventsPage from "./pages/user/UserEventsPage";
import UserPricingPage from "./pages/user/UserPricingPage";

const rootElement = document.getElementById("user-panel-root");

const safeParse = (value, fallback = null) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("Gabim gjatë leximit të të dhënave:", error);
        return fallback;
    }
};

const pages = {
    home: UserHomePage,
    settings: UserSettingsPage,
    media: UserMediaPage,
    events: UserEventsPage,
    pricing: UserPricingPage,
};

if (rootElement) {
    const page = safeParse(rootElement.dataset.page, "home");
    const user = safeParse(rootElement.dataset.user, null);
    const selectedEvent = safeParse(rootElement.dataset.selectedEvent, null);
    const events = safeParse(rootElement.dataset.events, []);
    const extra = safeParse(rootElement.dataset.extra, {});
    const media = safeParse(rootElement.dataset.media, extra?.media || []);

    const eventData = safeParse(
        rootElement.dataset.event,
        extra?.event || selectedEvent || null
    );

    const CurrentPage = pages[page] || UserHomePage;

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <UserLayout
                user={user}
                selectedEvent={selectedEvent}
                events={events}
                currentPage={page}
            >
                <CurrentPage
                    user={user}
                    selectedEvent={selectedEvent}
                    events={events}
                    extra={extra}
                    media={media}
                    event={eventData}
                    currentPage={page}
                />
            </UserLayout>
        </React.StrictMode>
    );
}