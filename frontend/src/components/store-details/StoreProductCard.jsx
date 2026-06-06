import { Link } from "react-router-dom";
import StoreRating from "./StoreRating";

// Displays a single store product with price, rating, wishlist, and add-to-bag actions.
export default function StoreProductCard({
    product,
    saved,
    onAddToCart,
    onToggleWishlist,
}) {
    const discount = product.oldPrice
        ? Math.round((1 - product.price / product.oldPrice) * 100)
        : null;

    return (
        <article className="product-card">
            <Link to={`/products/${product.id}`} className="block">
                <div className="relative h-[170px] overflow-hidden bg-[#edf3f0] min-[380px]:h-[140px] sm:h-[170px]">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-lg bg-white/95 px-2.5 py-1 text-[11px] font-black text-[#2d4438] shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur">
                        {product.condition}
                    </span>
                    {discount && (
                        <span className="absolute right-2.5 top-2.5 rounded-lg bg-[#fed65b] px-2 py-1 text-[11px] font-black text-[#745c00]">
                            -{discount}%
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-3">
                <p className="mb-1 text-[10px] font-black uppercase tracking-wide text-[#003527]">
                    {product.category}
                </p>

                <Link to={`/products/${product.id}`}>
                    <h3 className="mb-1.5 truncate text-sm font-black text-[#121c2a] hover:text-[#003527]">
                        {product.title}
                    </h3>
                </Link>

                <div className="mb-3 flex items-center gap-1">
                    <StoreRating rating={product.rating} />
                    <span className="text-[11px] font-extrabold text-[#121c2a]">
                        {product.rating.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-[#9aada7]">
                        ({product.reviews})
                    </span>
                </div>

                <div className="mb-3 flex items-end gap-1.5">
                    <span className="text-[17px] font-black text-[#003527]">
                        R{product.price}
                    </span>
                    {product.oldPrice && (
                        <span className="mb-px text-[11px] font-semibold text-[#9aada7] line-through">
                            R{product.oldPrice}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => onToggleWishlist(product)}
                        aria-label={saved ? "Remove saved item" : `Save ${product.title}`}
                        className={`wishlist-btn ${saved ? "saved" : ""}`}
                    >
                        <span
                            className={`material-symbols-outlined text-[18px] ${
                                saved ? "icon-fill text-[#e53e3e]" : ""
                            }`}
                        >
                            {saved ? "favorite" : "favorite_border"}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onAddToCart(product.title)}
                        className="card-cart-btn"
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <span className="material-symbols-outlined icon-fill text-[16px]">
                            shopping_bag
                        </span>
                        Add
                    </button>
                </div>
            </div>
        </article>
    );
}
