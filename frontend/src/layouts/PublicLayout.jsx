import AnnouncementBar from "../components/layout/AnnouncementBar.jsx";
import PublicHeader from "../components/layout/PublicHeader.jsx";
import PublicFooter from "../components/layout/PublicFooter.jsx";
import MobileBottomNav from "../components/layout/MobileBottomNav.jsx";

// Composes public marketplace chrome; account pages use their dedicated layouts instead.
export default function PublicLayout({ children, cartCount = 0 }){
    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9ff] text-[#121c2a]">
            <AnnouncementBar/>
            <PublicHeader cartCount={cartCount}/>
            <main className="flex-1">{children}</main>
            <PublicFooter/>
            <MobileBottomNav/>
        </div>
    );
}
