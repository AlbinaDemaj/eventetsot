import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import UserHomeContent from "./components/user/UserHomeContent";

const el = document.getElementById("user-home-root");

if (el) {
    const event = JSON.parse(el.dataset.event || "null");

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            <UserHomeContent event={event} />
        </React.StrictMode>
    );
}