// Provides the fullscreen product image viewer and its carousel controls.
export default function ProductLightbox({
    product,
    activeImageIndex,
    setActiveImageIndex,
    onClose,
}) {
    function move(direction) {
        setActiveImageIndex((current) => {
            const next = current + direction;
            if (next < 0) return product.images.length - 1;
            if (next >= product.images.length) return 0;
            return next;
        });
    }

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
                <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous"
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
                <span className="material-symbols-outlined text-[24px]">
                    chevron_left
                </span>
            </button>

            <img
                src={product.images[activeImageIndex]}
                alt={`${product.title} enlarged`}
                className={`max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-[0_32px_80px_rgba(0,0,0,.6)] ${
                    activeImageIndex === 3 ? "hue-rotate-180 saturate-50" : ""
                }`}
            />

            <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
                <span className="material-symbols-outlined text-[24px]">
                    chevron_right
                </span>
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-bold text-white/60">
                {activeImageIndex + 1} / {product.images.length}
            </div>
        </div>
    );
}
