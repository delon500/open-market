// Keeps the primary add-to-cart action reachable on small screens.
export default function MobileAddToCart({
    product,
    selectedSize,
    quantity,
    added,
    onAddToCart,
}) {
    return (
        <div className="fixed bottom-[64px] left-0 right-0 z-40 flex items-center gap-3 border-t border-[#e6eeff] bg-white px-4 py-3 shadow-[0_-4px_20px_rgba(0,53,39,.08)] md:hidden">
            <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-[#9aada7] line-through">
                    R{product.oldPrice}
                </div>
                <div className="text-xl font-black leading-none tracking-[-0.03em] text-[#003527]">
                    R{product.price}
                </div>
            </div>

            <div className="text-[11px] font-semibold text-[#66736d]">
                {selectedSize} - Qty {quantity}
            </div>

            <button
                type="button"
                onClick={onAddToCart}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-[14px] px-5 py-3 text-[13px] font-extrabold text-white ${
                    added ? "bg-[#064e3b]" : "bg-[#003527]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill text-[17px]">
                    {added ? "check_circle" : "shopping_bag"}
                </span>
                {added ? "Added" : "Add to cart"}
            </button>
        </div>
    );
}
