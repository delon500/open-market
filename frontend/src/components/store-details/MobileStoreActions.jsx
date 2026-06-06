// Keeps message and save actions reachable above the mobile bottom navigation.
export default function MobileStoreActions({ saved, onMessage, onSave }) {
    return (
        <div
            className="fixed left-0 right-0 z-40 flex gap-2.5 border-t border-[#e0e9e4] bg-white px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,53,39,0.10)] lg:hidden"
            style={{ bottom: "58px" }}
            role="region"
            aria-label="Store actions"
        >
            <button
                type="button"
                onClick={onMessage}
                className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#003527] px-4 py-3.5 text-sm font-black text-white shadow-[0_4px_14px_rgba(0,53,39,.22)]"
            >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message Seller
            </button>
            <button
                type="button"
                onClick={onSave}
                aria-label={saved ? "Remove saved store" : "Save store"}
                className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center transition ${
                    saved ? "text-[#e53e3e]" : "text-[#003527]"
                }`}
            >
                <span
                    className={`material-symbols-outlined text-[22px] ${
                        saved ? "icon-fill" : ""
                    }`}
                >
                    bookmark
                </span>
            </button>
        </div>
    );
}
