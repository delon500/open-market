// Displays product thumbnails, carousel controls, and the main product image.
export default function ProductGallery({
    product,
    activeImageIndex,
    setActiveImageIndex,
    moveImage,
    openLightbox,
}) {
    return (
        <div className="overflow-hidden rounded-[32px] border border-[#dbe6e1] bg-white p-3 shadow-[0_10px_40px_-10px_rgba(0,53,39,0.06)] lg:flex lg:gap-3">
            <div className="order-2 mt-3 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-1 lg:mt-0 lg:w-[72px] lg:flex-col lg:overflow-y-auto">
                {product.images.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`View image ${index + 1}`}
                        className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[#eff4ff] transition ${
                            activeImageIndex === index
                                ? "border-[#003527] shadow-[0_0_0_3px_rgba(0,53,39,.12)]"
                                : "border-[#dbe6e1] hover:border-[#003527]"
                        }`}
                    >
                        <img
                            src={image}
                            alt=""
                            className={`h-full w-full object-cover ${
                                index === 3 ? "hue-rotate-180 saturate-50" : ""
                            }`}
                        />
                    </button>
                ))}
            </div>

            <div className="order-1 flex-1 lg:order-2">
                <div className="relative overflow-hidden rounded-[22px] bg-[#eff4ff]">
                    <button
                        type="button"
                        onClick={openLightbox}
                        aria-label="Zoom image"
                        className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#dbe6e1] bg-white/90 text-[#003527] backdrop-blur transition hover:border-[#003527]"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            zoom_in
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => moveImage(-1)}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/45 text-[#003527] shadow-sm backdrop-blur-sm transition hover:bg-white/75 hover:text-[#064e3b]"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            chevron_left
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => moveImage(1)}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/45 text-[#003527] shadow-sm backdrop-blur-sm transition hover:bg-white/75 hover:text-[#064e3b]"
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            chevron_right
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={openLightbox}
                        className="block w-full"
                        aria-label="Open image viewer"
                    >
                        <img
                            src={product.images[activeImageIndex]}
                            alt={`${product.title} view ${activeImageIndex + 1}`}
                            className={`aspect-square w-full cursor-zoom-in object-cover md:aspect-[4/3] ${
                                activeImageIndex === 3 ? "hue-rotate-180 saturate-50" : ""
                            }`}
                        />
                    </button>

                    <div className="absolute bottom-3 right-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                        {activeImageIndex + 1} / {product.images.length}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 py-3">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                            className={`h-[7px] rounded-full transition ${
                                activeImageIndex === index
                                    ? "w-[22px] bg-[#003527]"
                                    : "w-[7px] bg-[#dbe6e1] hover:bg-[#95d3ba]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
