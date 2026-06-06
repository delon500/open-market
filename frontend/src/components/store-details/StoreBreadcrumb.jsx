import { Link } from "react-router-dom";

// Shows the user's location in the public store browsing flow.
export default function StoreBreadcrumb({ store }) {
    return (
        <section className="border-b border-[#e6eeff] bg-white">
            <div className="mx-auto max-w-[1280px] px-4 py-3.5 md:px-10">
                <nav className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-[#9aada7]">
                    <Link to="/" className="transition hover:text-[#003527]">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-[15px]">
                        chevron_right
                    </span>
                    <Link to="/stores" className="transition hover:text-[#003527]">
                        Stores
                    </Link>
                    <span className="material-symbols-outlined text-[15px]">
                        chevron_right
                    </span>
                    <span className="text-[#121c2a]">{store.name}</span>
                </nav>
            </div>
        </section>
    );
}
