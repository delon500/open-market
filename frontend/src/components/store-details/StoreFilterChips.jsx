import { storeProductFilters } from "../../data/storeDetails";

// Renders condition and price filter chips for the store product grid.
export default function StoreFilterChips({ activeFilter, setActiveFilter }) {
    return (
        <div
            className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter products"
        >
            {storeProductFilters.map((filter) => (
                <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={`filter-chip ${
                        activeFilter === filter.value ? "active" : ""
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
