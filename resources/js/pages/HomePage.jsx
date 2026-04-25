import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PreviewSection from "../components/PreviewSection";
import EventTypesSection from "../components/EventTypesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import FAQSection from "../components/FAQSection";
import FinalCTASection from "../components/FinalCTASection";
import Footer from "../components/Footer";

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-800">
            <Navbar />
            <HeroSection />
            <PreviewSection events={events} loading={loading} />
            <HowItWorksSection />
            <EventTypesSection />
            <WhyChooseUsSection />
            <FAQSection />
            <FinalCTASection />
            <Footer />
        </div>
    );
}