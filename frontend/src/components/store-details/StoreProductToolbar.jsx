// Owns the sticky product search and sort controls inside a store.
export default function StoreProductToolbar({
    store,
    searchQuery,
    setSearchQuery,
    activeSort,
    setActiveSort,
}) {
    return (
        <div className="sticky-toolbar">
            <div className="flex items-center gap-2.5 rounded-2xl border border-[#d8e5df] bg-white py-2 pl-3.5 pr-3 shadow-[0_4px_16px_rgba(0,53,39,0.07)]">
                <span className="material-symbols-outlined shrink-0 text-[20px] text-[#66736d]">
                    search
                </span>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={`Search products in ${store.name}...`}
                    className="min-w-0 flex-1 border-none bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                />
                <div className="h-5 w-px shrink-0 bg-[#e0e9e4]" />
                <div className="relative shrink-0">
                    <select
                        value={activeSort}
                        onChange={(event) => setActiveSort(event.target.value)}
                        className="cursor-pointer appearance-none border-none bg-transparent py-0 pl-1 pr-5 text-[13px] font-extrabold text-[#003527] outline-none"
                    >
                        <option value="newest">Newest</option>
                        <option value="low">Price low</option>
                        <option value="high">Price high</option>
                        <option value="rated">Top rated</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[16px] text-[#003527]">
                        expand_more
                    </span>
                </div>
            </div>
        </div>
    );
}
