// Category, result count, and sort controls for the public stores page.
export default function StoreToolbar({
    activeCategory,
    categories,
    resultCount,
    sortBy,
    onCategoryChange,
    onSortChange,
}) {
    return (
        <section className="border-b border-[#e6eeff] bg-white">
            <div className="mx-auto max-w-[1280px] px-4 py-4 md:px-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => onCategoryChange(category.value)}
                                className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-extrabold transition ${
                                    activeCategory === category.value
                                        ? "border-[#003527] bg-[#003527] text-white"
                                        : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#95d3ba] hover:text-[#003527]"
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 lg:justify-end">
                        <p className="text-sm font-bold text-[#66736d]">
                            Showing{" "}
                            <strong className="text-[#121c2a]">{resultCount}</strong>{" "}
                            {resultCount === 1 ? "store" : "stores"}
                        </p>

                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(event) => onSortChange(event.target.value)}
                                className="appearance-none rounded-[14px] border border-[#dbe6e1] bg-white py-2.5 pl-3.5 pr-10 text-[13px] font-extrabold text-[#121c2a] outline-none transition focus:border-[#003527] focus:ring-4 focus:ring-[#003527]/10"
                            >
                                <option value="top-rated">Top rated</option>
                                <option value="most-products">Most products</option>
                                <option value="newest">Newest stores</option>
                                <option value="verified-first">Verified first</option>
                            </select>

                            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#7b8781]">
                                expand_more
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
