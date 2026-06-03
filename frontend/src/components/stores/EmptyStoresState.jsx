// Empty result state shown when no store matches the current filters.
export default function EmptyStoresState({ onReset }) {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
            <span className="material-symbols-outlined mb-4 text-[52px] text-[#003527]">
                store_mall_directory
            </span>

            <h3 className="mb-2 text-xl font-black text-[#121c2a]">
                No stores found
            </h3>

            <p className="mb-6 max-w-[320px] text-sm leading-6 text-[#66736d]">
                Try another category or search term to find registered stores.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition-opacity hover:opacity-90"
            >
                Show all stores
            </button>
        </div>
    );
}
