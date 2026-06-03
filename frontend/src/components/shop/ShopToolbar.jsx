import { Link } from "react-router-dom";

// Sticky shop controls for breadcrumbs, active filters, sort, view mode, and category chips.
export default function ShopToolbar({
    activeCategory,
    activeFilters,
    categories,
    query,
    view,
    onCategoryChange,
    onClearFilters,
    onOpenFilters,
    onQueryChange,
    onRemoveFilter,
    onViewChange,
}) {
    return (
        <div className="sticky top-[65px] z-30 border-b-[1.5px] border-[#e6eeff] bg-white shadow-[0_4px_20px_rgba(0,53,39,.06)]">
            <div className="mx-auto max-w-[1280px] px-4 md:px-10">
                <div className="flex flex-wrap items-center gap-3 border-b border-[#f0f4f8] py-2.5">
                    <div className="mr-auto flex items-center gap-1.5 text-xs text-[#9aada7]">
                        <Link
                            to="/"
                            className="font-semibold text-[#003527] underline-offset-2 hover:underline"
                        >
                            Home
                        </Link>
                        <span className="material-symbols-outlined text-[14px]">
                            chevron_right
                        </span>
                        <span className="font-bold text-[#121c2a]">Shop</span>
                    </div>

                    {activeFilters.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#707974]">
                                Active:
                            </span>
                            {activeFilters.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => onRemoveFilter(filter)}
                                    className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#c4e8da] bg-[#e8f5ee] py-1 pl-3 pr-2 text-xs font-bold text-[#003527] transition hover:bg-[#c4e8da]"
                                >
                                    {filter}
                                    <span className="text-sm leading-none opacity-70">
                                        x
                                    </span>
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={onClearFilters}
                                className="whitespace-nowrap text-xs font-bold text-[#ba1a1a] underline underline-offset-2"
                            >
                                Clear all
                            </button>
                        </div>
                    ) : null}

                    <div className="relative flex items-center gap-1.5">
                        <label
                            htmlFor="shop-sort"
                            className="whitespace-nowrap text-xs font-semibold text-[#707974]"
                        >
                            Sort
                        </label>
                        <select
                            id="shop-sort"
                            className="cursor-pointer appearance-none rounded-xl border-[1.5px] border-[#bfc9c3] bg-white py-1.5 pl-3 pr-7 text-[13px] font-bold text-[#121c2a] outline-none transition focus:border-[#003527]"
                        >
                            <option>Newest first</option>
                            <option>Price: low to high</option>
                            <option>Price: high to low</option>
                            <option>Top rated</option>
                            <option>Most popular</option>
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[15px] text-[#707974]">
                            expand_more
                        </span>
                    </div>

                    <div className="hidden items-center gap-1.5 md:flex">
                        <ViewButton
                            active={view === "grid"}
                            icon="grid_view"
                            label="Grid view"
                            onClick={() => onViewChange("grid")}
                        />
                        <ViewButton
                            active={view === "list"}
                            icon="view_list"
                            label="List view"
                            onClick={() => onViewChange("list")}
                        />
                    </div>
                </div>

                <div className="shop-chip-row flex items-center gap-2 overflow-x-auto py-2.5">
                    <button
                        type="button"
                        onClick={onOpenFilters}
                        className="flex shrink-0 items-center gap-1.5 rounded-xl border-[1.5px] border-[#bfc9c3] bg-white px-3 py-1.5 text-xs font-bold text-[#003527] transition hover:border-[#003527] lg:hidden"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            tune
                        </span>
                        Filters
                    </button>

                    <div className="flex w-[150px] shrink-0 items-center gap-1.5 rounded-xl border border-[#bfc9c3] bg-white px-2.5 py-1.5 focus-within:border-[#003527] md:hidden">
                        <span className="material-symbols-outlined text-[15px] text-[#9aada7]">
                            search
                        </span>
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => onQueryChange(event.target.value)}
                            placeholder="Search..."
                            className="w-full border-none bg-transparent text-xs text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                        />
                    </div>

                    <div className="shop-chip-row flex flex-1 items-center gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => onCategoryChange(category)}
                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border-[1.5px] px-3 py-1.5 text-xs font-bold transition ${
                                    activeCategory === category
                                        ? "border-[#003527] bg-[#003527] text-white"
                                        : "border-[#bfc9c3] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ViewButton({ active, icon, label, onClick }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={`flex h-[34px] w-[34px] items-center justify-center rounded-[10px] border-[1.5px] transition ${
                active
                    ? "border-[#003527] bg-[#003527] text-white"
                    : "border-[#bfc9c3] bg-white text-[#707974] hover:border-[#003527]"
            }`}
        >
            <span className="material-symbols-outlined text-[17px]">{icon}</span>
        </button>
    );
}
