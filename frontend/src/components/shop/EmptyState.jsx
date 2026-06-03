// Empty result message shown when search/category filters hide every product.
export default function EmptyState({ onClearFilters }) {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] bg-[#e8f5ee]">
                <span className="material-symbols-outlined text-[36px] text-[#003527]">
                    search_off
                </span>
            </div>
            <h3 className="mb-2 text-xl font-black text-[#121c2a]">
                No products found
            </h3>
            <p className="mb-6 max-w-[300px] text-sm leading-6 text-[#707974]">
                Try adjusting your filters or browse all categories.
            </p>
            <button
                type="button"
                onClick={onClearFilters}
                className="rounded-xl bg-[#003527] px-6 py-3 text-sm font-bold text-white"
            >
                Clear all filters
            </button>
        </div>
    );
}
