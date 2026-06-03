import DeliveryInfo from "./DeliveryInfo";
import StarRating from "./StarRating";

// Contains the main buying controls: price, size, quantity, save, share, and add.
export default function PurchasePanel({
    product,
    sizes,
    outOfStockSizes,
    selectedSize,
    quantity,
    saved,
    added,
    instalment,
    onShare,
    onSelectSize,
    onQuantityChange,
    onAddToCart,
    onToggleSaved,
    onReviewClick,
}) {
    return (
        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_10px_40px_-10px_rgba(0,53,39,0.06)] md:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#e8f5ee] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#003527]">
                        {product.category}
                    </span>
                    <span className="rounded-full border border-[#dbe6e1] bg-white px-3 py-1 text-xs font-black text-[#404944]">
                        {product.condition}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={onShare}
                    aria-label="Share product"
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border border-[#dbe6e1] bg-white text-[#66736d] transition hover:border-[#003527] hover:text-[#003527]"
                >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
            </div>

            <h1 className="mb-2.5 text-[clamp(24px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.03em] text-[#121c2a]">
                {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-2">
                <StarRating rating={4.5} />
                <span className="text-[13px] font-extrabold text-[#121c2a]">
                    {product.rating}
                </span>
                <button
                    type="button"
                    onClick={onReviewClick}
                    className="text-[13px] font-semibold text-[#003527] underline underline-offset-2"
                >
                    {product.reviewCount} product reviews
                </button>
            </div>

            <div className="mb-5">
                <div className="mb-1 flex items-end gap-3">
                    <span className="text-4xl font-black leading-none tracking-[-0.04em] text-[#003527]">
                        R{product.price}
                    </span>
                    <span className="mb-1 text-base font-bold text-[#9aada7] line-through">
                        R{product.oldPrice}
                    </span>
                    <span className="mb-1 rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs font-extrabold text-[#b45309]">
                        {product.discount}
                    </span>
                </div>

                <p className="text-xs font-semibold text-[#66736d]">
                    or 3x <strong className="text-[#003527]">R{instalment}</strong>{" "}
                    interest-free with PayFlex
                </p>
            </div>

            <div className="mb-5">
                <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-[#121c2a]">
                        Size <span className="text-[#003527]">- {selectedSize}</span>
                    </span>

                    <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#003527] underline underline-offset-2"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            straighten
                        </span>
                        Size guide
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => {
                        const outOfStock = outOfStockSizes.includes(size);
                        const selected = selectedSize === size;

                        return (
                            <button
                                key={size}
                                type="button"
                                disabled={outOfStock}
                                onClick={() => onSelectSize(size)}
                                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-[13px] font-bold transition ${
                                    selected
                                        ? "border-[#003527] bg-[#003527] text-white"
                                        : "border-[#dbe6e1] bg-white text-[#121c2a] hover:border-[#003527] hover:text-[#003527]"
                                } ${
                                    outOfStock
                                        ? "cursor-not-allowed opacity-40 line-through"
                                        : ""
                                }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-5">
                <span className="mb-2 block text-[13px] font-extrabold text-[#121c2a]">
                    Quantity
                </span>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => onQuantityChange(-1)}
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#dbe6e1] bg-white text-lg font-bold text-[#003527] transition hover:border-[#003527] hover:bg-[#f0faf6]"
                    >
                        -
                    </button>

                    <span className="min-w-8 text-center text-sm font-extrabold text-[#121c2a]">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() => onQuantityChange(1)}
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#dbe6e1] bg-white text-lg font-bold text-[#003527] transition hover:border-[#003527] hover:bg-[#f0faf6]"
                    >
                        +
                    </button>

                    <span className="text-xs font-semibold text-[#9aada7]">
                        {product.stock} left in stock
                    </span>
                </div>
            </div>

            <div className="mb-4 flex items-center gap-3">
                <button
                    type="button"
                    onClick={onAddToCart}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black text-white transition active:scale-[0.98] ${
                        added ? "bg-[#064e3b]" : "bg-[#003527] hover:bg-[#064e3b]"
                    }`}
                >
                    <span className="material-symbols-outlined icon-fill text-[18px]">
                        {added ? "check_circle" : "shopping_bag"}
                    </span>
                    {added ? "Added!" : "Add to cart"}
                </button>

                <button
                    type="button"
                    onClick={onToggleSaved}
                    aria-label={saved ? "Remove from saved" : "Save item"}
                    className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border transition ${
                        saved
                            ? "border-[#ba1a1a] bg-[#fff5f5] text-[#ba1a1a]"
                            : "border-[#dbe6e1] bg-white text-[#9aada7] hover:border-[#003527]"
                    }`}
                >
                    <span
                        className={`material-symbols-outlined text-[20px] ${
                            saved ? "icon-fill" : ""
                        }`}
                    >
                        favorite
                    </span>
                </button>
            </div>

            <DeliveryInfo />
        </div>
    );
}
