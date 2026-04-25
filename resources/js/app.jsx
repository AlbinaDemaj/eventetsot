import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const el = document.getElementById("app");

if (el) {
    const page = el.dataset.page || "home";

    const renderPage = () => {
        switch (page) {
            case "events":
                return <EventsPage />;
            case "categories":
                return <CategoriesPage />;
            case "about":
                return <AboutPage />;
            case "contact":
                return <ContactPage />;
            case "home":
            default:
                return <HomePage />;
        }
    };

    ReactDOM.createRoot(el).render(
        <React.StrictMode>{renderPage()}</React.StrictMode>
    );
}