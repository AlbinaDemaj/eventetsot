import "./bootstrap";
import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import UserHomePage from "./components/user/UserHomePage";

const el = document.getElementById("user-root");

if (el) {
    const event = JSON.parse(el.dataset.event || "null");

    ReactDOM.createRoot(el).render(
        <React.StrictMode>
            <UserHomePage event={event} />
        </React.StrictMode>
    );
}