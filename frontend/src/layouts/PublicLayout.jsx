import AnnouncementBar from "../components/layout/AnnouncementBar.jsx";
import PublicHeader from "../components/layout/PublicHeader.jsx";
import PublicFooter from "../components/layout/PublicFooter.jsx";
import MobileBottomNav from "../components/layout/MobileBottomNav.jsx";

export default function PublicLayout({ children }){
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9ff] text-[#121c2a]">
            <AnnouncementBar/>
            <PublicHeader/>
            <main className="flex-1">{children}</main>
            <PublicFooter/>
            <MobileBottomNav/>
        </div>
    );
}