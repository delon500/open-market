import { NavLink } from "react-router-dom";

// Compact primary navigation shown only below the desktop account breakpoint.
const navigationItems = [
    {
        label: "Home",
        icon: "home",
        to: "/",
    },
    {
        label: "Shop",
        icon: "storefront",
        to: "/shop",
    },
    {
        label: "Saved",
        icon: "favorite",
        to: "/wishlist",
    },
    {
        label: "Orders",
        icon: "shopping_bag",
        to: "/my-orders",
    },
    {
        label: "Account",
        icon: "person",
        to: "/account",
    },
];

export default function BuyerMobileNav() {
    return (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#dbe6e1] bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(0,53,39,.08)] backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-lg grid-cols-5">
                {navigationItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        end={item.to === "/account"}
                        className={({ isActive }) =>
                            `flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-black transition ${
                                isActive
                                    ? "bg-[#f0faf6] text-[#003527]"
                                    : "text-[#78837e]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                <span
                    className={`material-symbols-outlined text-[22px] ${
                        isActive ? "text-[#003527]" : ""
                    }`}
                >
                  {item.icon}
                </span>

                                <span className="truncate">
                  {item.label}
                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
