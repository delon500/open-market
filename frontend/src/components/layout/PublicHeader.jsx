import { Link } from "react-router-dom";

const navLinks = [
    { label: "Shop", to: "/shop" },
    { label: "Stores", to: "/stores" },
    { label: "Categories", to: "/#categories" },
    { label: "How it works", to: "/how-it-works" },
    { label: "Become a seller", to: "/become-seller" },
    { label: "Help", to: "/help-centre" },
];

export default function PublicHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-[#bfc9c3] bg-white">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-4 py-4 md:px-10">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#003527]">
                    <span className="material-symbols-outlined icon-fill">shopping_bag</span>
                    <span>Open Market</span>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className="text-sm font-semibold text-[#404944] transition hover:text-[#003527]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden flex-1 justify-end lg:flex">
                    <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#404944]">
              search
            </span>
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="w-full rounded-full border border-[#bfc9c3] bg-[#f8f9ff] py-2 pl-10 pr-4 text-sm outline-none transition focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/cart" aria-label="Cart" className="relative text-[#003527]">
                        <span className="material-symbols-outlined icon-fill">shopping_bag</span>
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#fed65b] text-[10px] font-bold text-[#745c00]">
              0
            </span>
                    </Link>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link to="/login" className="text-sm font-semibold text-[#003527]">
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-xl bg-[#003527] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                            Join Now
                        </Link>
                    </div>

                    <button className="text-[#003527] md:hidden" aria-label="Open menu">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
}