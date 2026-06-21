import { Link } from "react-router-dom";

// Shared marketplace product card with focused variants for browse and saved-item contexts.
export default function ProductCard({
    product,
    listView = false,
    saved = false,
    index = 0,
    variant = "shop",
    onToggleWishlist,
    onAddToCart,
}) {
    const isWishlist = variant === "wishlist";
    const badgeClass =
        product.condition === "New"
            ? "bg-[#e8f5ee] text-[#003527]"
            : product.condition === "Used" || product.condition === "Pre-owned"
              ? "bg-[#fff8e0] text-[#745c00]"
              : "bg-[#e8f2ff] text-[#1e40af]";

    const savedStatus = !product.inStock
        ? { label: "Out of stock", className: "bg-[#fff0ec] text-[#9f2d20]" }
        : product.wishlistBadge
          ? { label: product.wishlistBadge, className: "bg-[#fff8e5] text-[#8a5a00]" }
          : null;

    return (
        <article
            className={`group shop-card shop-au flex overflow-hidden rounded-[20px] border-[1.5px] border-[#e6eeff] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#c4e8da] hover:shadow-[0_18px_44px_rgba(0,53,39,.10)] ${
                listView ? "flex-col md:flex-row" : "flex-col"
            }`}
            style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
        >
            <div
                className={`relative overflow-hidden ${
                    listView
                        ? "h-[220px] md:h-auto md:w-[200px] md:min-w-[200px]"
                        : "h-[220px]"
                }`}
                style={{ background: product.imageBg }}
            >
                <Link to={`/products/${product.id}`} className="block h-full w-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => onToggleWishlist?.(product.id)}
                    className={`absolute right-2.5 top-2.5 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white ${
                        saved ? "text-[#ba1a1a]" : "text-[#9aada7] hover:text-[#ba1a1a]"
                    }`}
                    aria-label={
                        saved
                            ? `Remove ${product.title} from wishlist`
                            : `Save ${product.title} to wishlist`
                    }
                >
                    <span
                        className={`material-symbols-outlined text-[20px] ${saved ? "icon-fill" : ""}`}
                    >
                        favorite
                    </span>
                </button>

                <span className="absolute bottom-2.5 left-2.5 inline-flex max-w-[calc(100%-5.5rem)] items-center gap-1 rounded-md bg-[#e8f5ee] px-2 py-1 text-[11px] font-bold text-[#1e6b4a]">
                    <span className="material-symbols-outlined shrink-0 text-[13px]">
                        local_shipping
                    </span>
                    <span className="truncate">{product.delivery}</span>
                </span>

                {isWishlist && savedStatus ? (
                    <span
                        className={`absolute left-2.5 top-2.5 rounded-lg px-2.5 py-1 text-[11px] font-black shadow-[0_2px_8px_rgba(0,0,0,.06)] ${savedStatus.className}`}
                    >
                        {savedStatus.label}
                    </span>
                ) : null}
            </div>

            <div className="relative flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[.04em] text-[#003527]">
                        {product.category}
                    </span>
                    <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${badgeClass}`}
                    >
                        {product.condition}
                    </span>
                </div>

                <Link to={`/products/${product.id}`}>
                    <h3 className="mb-1 text-[15px] font-extrabold leading-snug text-[#121c2a] hover:text-[#003527]">
                        {product.title}
                    </h3>
                </Link>

                <div className="mb-1.5 flex items-center gap-1.5">
                    <div
                        className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                        style={{ background: product.sellerColor }}
                    >
                        {product.sellerInitial}
                    </div>
                    <span className="min-w-0 truncate text-xs font-semibold text-[#404944]">
                        {product.seller}
                    </span>
                    {product.verified !== false ? (
                        <span
                            className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#003527]"
                            aria-label="Verified seller"
                        >
                            <span className="material-symbols-outlined icon-fill text-[13px]">
                                verified
                            </span>
                        </span>
                    ) : null}
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined icon-fill text-[15px] text-[#f59e0b]">
                            star
                        </span>
                        <span className="text-[11px] font-semibold text-[#707974]">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>
                    <span className="flex min-w-0 items-center gap-1 text-[11px] text-[#707974]">
                        <span className="material-symbols-outlined shrink-0 text-[13px]">
                            location_on
                        </span>
                        <span className="truncate">{product.location}</span>
                    </span>
                </div>

                {isWishlist ? (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#707974]">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {product.savedLabel}
                    </div>
                ) : null}

                <div className="mt-auto pt-3.5">
                    <div className="mb-3 flex items-end justify-between gap-3">
                        <div>
                            {product.previousPrice ? (
                                <div className="text-[11px] font-semibold text-[#9aada7] line-through">
                                    {product.previousPrice}
                                </div>
                            ) : null}
                            <span className="text-xl font-black tracking-[-0.02em] text-[#003527]">
                                {product.price}
                            </span>
                        </div>

                        {!isWishlist ? (
                            <button
                                type="button"
                                onClick={() => onAddToCart?.(product)}
                                className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#003527] transition hover:opacity-80"
                                aria-label={`Add ${product.title} to bag`}
                            >
                                <span className="material-symbols-outlined icon-fill text-[18px] text-white">
                                    add
                                </span>
                            </button>
                        ) : null}
                    </div>

                    {isWishlist ? (
                        product.inStock ? (
                            <button
                                type="button"
                                onClick={() => onAddToCart?.(product)}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#003527] px-4 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                <span className="material-symbols-outlined icon-fill text-[17px]">
                                    shopping_bag
                                </span>
                                Add to bag
                            </button>
                        ) : (
                            <Link
                                to={`/products/${product.id}`}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3 text-sm font-black text-[#66736d] transition hover:border-[#003527] hover:text-[#003527]"
                            >
                                <span className="material-symbols-outlined text-[17px]">
                                    notifications
                                </span>
                                Check product
                            </Link>
                        )
                    ) : null}
                </div>
            </div>
        </article>
    );
}
