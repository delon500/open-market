import { Link } from "react-router-dom";

// Shows the public marketplace path above the product details content.
export default function ProductBreadcrumb({ product }) {
    return (
        <div className="border-b border-[#e6eeff] bg-white">
            <div className="mx-auto max-w-[1280px] px-4 py-3 md:px-10">
                <nav className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-[#9aada7]">
                    <Link to="/" className="transition hover:text-[#003527]">
                        Home
                    </Link>
                    <span className="material-symbols-outlined text-[15px]">
                        chevron_right
                    </span>
                    <Link to="/shop" className="transition hover:text-[#003527]">
                        Shop
                    </Link>
                    <span className="material-symbols-outlined text-[15px]">
                        chevron_right
                    </span>
                    <Link
                        to="/shop?cat=sneakers"
                        className="transition hover:text-[#003527]"
                    >
                        {product.category}
                    </Link>
                    <span className="material-symbols-outlined text-[15px]">
                        chevron_right
                    </span>
                    <span className="text-[#121c2a]">{product.title}</span>
                </nav>
            </div>
        </div>
    );
}
