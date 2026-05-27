import { Link, useLocation } from "react-router-dom";

const items = [
    { label: "Shop", to: "/shop", icon: "storefront" },
    { label: "Categories", to: "/#categories", icon: "category" },
    { label: "Cart", to: "/cart", icon: "shopping_bag" },
    { label: "Account", to: "/login", icon: "person" },
];

export default function MobileBottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-[#bfc9c3] bg-white px-4 py-2 shadow-lg md:hidden">
            {items.map((item) => {
                const active =
                    location.pathname === item.to ||
                    (item.label === "Account" &&
                        ["/login", "/register", "/forgot-password", "/reset-password"].includes(location.pathname));

                return (
                    <Link
                        key={item.label}
                        to={item.to}
                        className={`flex w-16 flex-col items-center justify-center rounded-xl p-2 text-xs font-semibold transition ${
                            active ? "text-[#003527]" : "text-[#404944]"
                        }`}
                    >
            <span className={`material-symbols-outlined ${item.icon === "shopping_bag" ? "icon-fill" : ""}`}>
              {item.icon}
            </span>
                        <span className="mt-1">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}