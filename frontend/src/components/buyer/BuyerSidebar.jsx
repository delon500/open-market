import { Link, NavLink } from "react-router-dom";

// Navigation stays data-driven so desktop and mobile drawers render the same account links.
const primaryNavigation = [
    {
        label: "Overview",
        icon: "dashboard",
        to: "/account",
        end: true,
    },
    {
        label: "My orders",
        icon: "shopping_bag",
        to: "/my-orders",
    },
    {
        label: "Saved items",
        icon: "favorite",
        to: "/wishlist",
    },
    {
        label: "Addresses",
        icon: "location_on",
        to: "/account/addresses",
    },
    {
        label: "Disputes",
        icon: "report",
        to: "/disputes",
    },
];

const accountNavigation = [
    {
        label: "Notifications",
        icon: "notifications",
        to: "/account/notifications",
    },
    {
        label: "Profile",
        icon: "person",
        to: "/account/profile",
    },
    {
        label: "Settings",
        icon: "settings",
        to: "/account/settings",
    },
];

export default function BuyerSidebar({
                                         mobile = false,
                                         onNavigate,
                                     }) {
    // The mobile variant fills its drawer; the desktop variant remains fixed beside account pages.
    return (
        <aside
            className={
                mobile
                    ? "flex h-full w-full flex-col bg-white"
                    : "sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-[#dbe6e1] bg-white lg:flex"
            }
        >
            <div className="flex h-[76px] items-center border-b border-[#dbe6e1] px-6">
                <Link
                    to="/"
                    onClick={onNavigate}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#003527] text-white">
            <span className="material-symbols-outlined text-[23px]">
              storefront
            </span>
                    </div>

                    <div>
                        <p className="text-lg font-black leading-none tracking-[-0.03em] text-[#003527]">
                            Open Market
                        </p>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#66736d]">
                            Buyer account
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">
                <NavigationGroup
                    label="Shopping"
                    items={primaryNavigation}
                    onNavigate={onNavigate}
                />

                <div className="my-6 border-t border-[#e5ece8]" />

                <NavigationGroup
                    label="Account"
                    items={accountNavigation}
                    onNavigate={onNavigate}
                />
            </nav>

            <div className="border-t border-[#dbe6e1] p-4">
                <div className="rounded-[22px] bg-[#f0faf6] p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#003527]">
            <span className="material-symbols-outlined text-[21px]">
              shield_locked
            </span>
                    </div>

                    <h2 className="mb-1 text-sm font-black text-[#121c2a]">
                        Buyer Protection
                    </h2>

                    <p className="text-xs leading-5 text-[#66736d]">
                        Payment stays protected until delivery or collection is confirmed.
                    </p>

                    <Link
                        to="/trust-safety"
                        onClick={onNavigate}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#003527] hover:underline"
                    >
                        Learn more
                        <span className="material-symbols-outlined text-[15px]">
              arrow_forward
            </span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}

function NavigationGroup({ label, items, onNavigate }) {
    return (
        <div>
            <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#8b9791]">
                {label}
            </p>

            <div className="space-y-1.5">
                {items.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.end}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-black transition ${
                                isActive
                                    ? "bg-[#003527] text-white shadow-[0_6px_18px_rgba(0,53,39,.18)]"
                                    : "text-[#4d5953] hover:bg-[#f0faf6] hover:text-[#003527]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                <span
                    className={`material-symbols-outlined text-[21px] ${
                        isActive
                            ? "text-[#fed65b]"
                            : "text-[#66736d] group-hover:text-[#003527]"
                    }`}
                >
                  {item.icon}
                </span>

                                <span className="flex-1">{item.label}</span>

                                <span
                                    className={`material-symbols-outlined text-[16px] ${
                                        isActive
                                            ? "text-white/70"
                                            : "text-[#a0aaa5] opacity-0 transition group-hover:opacity-100"
                                    }`}
                                >
                  chevron_right
                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
