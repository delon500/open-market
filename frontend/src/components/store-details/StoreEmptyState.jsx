// Shows a calm empty state when no store products match the active search and filters.
export default function StoreEmptyState() {
    return (
        <div className="mt-4 rounded-[20px] border border-[#d8e5df] bg-white p-10 text-center">
            <span className="material-symbols-outlined mb-3 block text-[38px] text-[#9aada7]">
                search_off
            </span>
            <h3 className="text-lg font-black text-[#121c2a]">No products found</h3>
            <p className="mt-1 text-sm text-[#66736d]">
                Try a different search term or filter.
            </p>
        </div>
    );
}
