import UserSidebar from "../components/user/UserSidebar";
import UserTopbar from "../components/user/UserTopbar";

export default function UserLayout({
    user,
    selectedEvent,
    events,
    currentPage,
    children,
}) {
    return (
        <main className="min-h-screen bg-[#F6F7FB] text-slate-900">
            <div className="grid min-h-screen lg:grid-cols-[290px_1fr]">
                <UserSidebar
                    user={user}
                    selectedEvent={selectedEvent}
                    events={events}
                    currentPage={currentPage}
                />

                <div className="min-w-0">
                    <UserTopbar user={user} />
                    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}