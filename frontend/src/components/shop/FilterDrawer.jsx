import FilterControls from "./FilterControls.jsx";

// Mobile slide-out wrapper for the same filter controls used in the desktop sidebar.
export default function FilterDrawer({ open, onClose, onClearFilters }) {
    return (
        <>
            <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <div
                className={`fixed bottom-0 left-0 top-0 z-50 w-[300px] overflow-y-auto bg-white px-5 py-6 transition-transform duration-300 lg:hidden ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[17px] font-black text-[#121c2a]">
                        Filters
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#bfc9c3] text-[#404944] hover:border-[#003527]"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            close
                        </span>
                    </button>
                </div>

                <FilterControls mobile />

                <div className="mt-2 flex gap-2.5 border-t-[1.5px] border-[#e6eeff] pt-5">
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="flex-1 rounded-xl border-[1.5px] border-[#bfc9c3] bg-white px-3 py-3 text-[13px] font-bold text-[#404944]"
                    >
                        Clear all
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-xl bg-[#003527] px-3 py-3 text-[13px] font-bold text-white"
                    >
                        Show results
                    </button>
                </div>
            </div>
        </>
    );
}
