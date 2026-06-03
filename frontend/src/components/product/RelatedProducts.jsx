import { Link } from "react-router-dom";

// Lists related products from the same seller below the main product content.
export default function RelatedProducts({ product, items }) {
    return (
        <section className="mx-auto mb-8 mt-4 max-w-[1280px] px-4 md:px-10">
            <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,53,39,0.05)]">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-black tracking-[-0.02em] text-[#121c2a]">
                        More from {product.seller.name}
                    </h2>

                    <Link
                        to={`/stores/${product.seller.slug}`}
                        className="text-[13px] font-bold text-[#003527] underline underline-offset-4"
                    >
                        View all
                        <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                <div className="flex gap-3.5 overflow-x-auto pb-2">
                    {items.map((item) => (
                        <article
                            key={item.title}
                            className="w-[210px] shrink-0 overflow-hidden rounded-[18px] border border-[#e6eeff] bg-white transition hover:-translate-y-1 hover:border-[#c4e8da] hover:shadow-[0_14px_36px_rgba(0,53,39,.09)]"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-[140px] w-full object-cover"
                            />

                            <div className="p-3">
                                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-wide text-[#003527]">
                                    {product.category}
                                </p>

                                <h3 className="mb-2 text-[13px] font-extrabold leading-tight text-[#121c2a]">
                                    {item.title}
                                </h3>

                                <div className="flex items-center justify-between">
                                    <span className="text-base font-black text-[#003527]">
                                        {item.price}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={`Add ${item.title} to cart`}
                                        className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#003527]"
                                    >
                                        <span className="material-symbols-outlined icon-fill text-[15px] text-white">
                                            add
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
