import { Link } from "react-router-dom";

// Product listing card used by both the grid and list shop views.
export default function ProductCard({
    product,
    listView,
    saved,
    index,
    onToggleWishlist,
}) {
    const badgeClass =
        product.condition === "New"
            ? "bg-[#e8f5ee] text-[#003527]"
            : product.condition === "Used"
              ? "bg-[#fff8e0] text-[#745c00]"
              : "bg-[#e8f2ff] text-[#1e40af]";

    return (
        <article
            className={`shop-card shop-au flex overflow-hidden rounded-[20px] border-[1.5px] border-[#e6eeff] bg-white ${
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
                        className="h-full w-full object-cover"
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute right-2.5 top-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white ${
                        saved ? "text-[#ba1a1a]" : "text-[#9aada7] hover:text-[#ba1a1a]"
                    }`}
                    aria-label={`Save ${product.title} to wishlist`}
                >
                    <span className="material-symbols-outlined text-[19px]">
                        favorite
                    </span>
                </button>

                <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-[#e8f5ee] px-2 py-1 text-[11px] font-bold text-[#1e6b4a]">
                    <span className="material-symbols-outlined text-[13px]">
                        local_shipping
                    </span>
                    {product.delivery}
                </span>
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
                    <span className="text-xs font-semibold text-[#404944]">
                        {product.seller}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#003527]">
                        <span className="material-symbols-outlined icon-fill text-[13px]">
                            verified
                        </span>
                    </span>
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
                    <span className="flex items-center gap-1 text-[11px] text-[#707974]">
                        <span className="material-symbols-outlined text-[13px]">
                            location_on
                        </span>
                        {product.location}
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3.5">
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

                    <button
                        type="button"
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#003527] transition hover:opacity-80"
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <span className="material-symbols-outlined icon-fill text-[18px] text-white">
                            add
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
}
