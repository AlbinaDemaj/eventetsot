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

const el = document.getElementById("user-panel-root");

const safeParse = (value, fallback) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("JSON parse error:", error);
        return fallback;
    }
};

if (el) {
    const page = safeParse(el.dataset.page, "home");
    const user = safeParse(el.dataset.user, null);
    const selectedEvent = safeParse(el.dataset.selectedEvent, null);
    const events = safeParse(el.dataset.events, []);
    const extra = safeParse(el.dataset.extra, {});
    const media = safeParse(el.dataset.media, extra?.media || []);
    const eventData = safeParse(
        el.dataset.event,
        extra?.event || selectedEvent || null
    );

const pages = {
    home: UserHomePage,
    settings: UserSettingsPage,
    media: UserMediaPage,
    events: UserEventsPage,
    pricing: UserPricingPage,
};

    const CurrentPage = pages[page] || UserHomePage;

    ReactDOM.createRoot(el).render(
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