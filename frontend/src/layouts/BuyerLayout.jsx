import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BuyerHeader from "../components/buyer/BuyerHeader";
import BuyerMobileNav from "../components/buyer/BuyerMobileNav";
import BuyerSidebar from "../components/buyer/BuyerSidebar";

export default function BuyerLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close the drawer after route changes, including navigation triggered inside the sidebar.
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent the page behind the mobile drawer from scrolling while the drawer is open.
    useEffect(() => {
        if (!mobileMenuOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-[#f6f9f7]">
            <div className="flex min-h-screen">
                <BuyerSidebar />

                <div className="min-w-0 flex-1">
                    <BuyerHeader
                        onOpenMenu={() => setMobileMenuOpen(true)}
                    />

                    <main className="mx-auto w-full max-w-[1440px] px-4 py-7 pb-28 md:px-6 md:py-9 lg:px-8 lg:pb-10">
                        <Outlet />
                    </main>
                </div>
            </div>

            <BuyerMobileNav />

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close account navigation"
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute inset-0 bg-[#001a13]/55 backdrop-blur-[2px]"
                    />

                    <div className="absolute inset-y-0 left-0 w-[min(86vw,320px)] shadow-[20px_0_50px_rgba(0,0,0,.18)]">
                        <div className="absolute right-4 top-4 z-10">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Close menu"
                                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#dbe6e1] bg-white text-[#003527]"
                            >
                <span className="material-symbols-outlined">
                  close
                </span>
                            </button>
                        </div>

                        <BuyerSidebar
                            mobile
                            onNavigate={() => setMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
