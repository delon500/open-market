// Switches the mobile layout between products, reviews, and store information.
export default function StoreSectionTabs({ activeTab, setActiveTab, store }) {
    const tabs = [
        {
            value: "products",
            icon: "grid_view",
            label: "Products",
            count: store.productsCount,
        },
        {
            value: "reviews",
            icon: "star",
            label: "Reviews",
            count: store.reviewCount,
        },
        { value: "about", icon: "info", label: "About" },
    ];

    return (
        <div className="mb-5 grid grid-cols-3 border-b-2 border-[#e0e9e4] lg:hidden">
            {tabs.map((tab) => {
                const active = activeTab === tab.value;

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => setActiveTab(tab.value)}
                        className={`inline-flex h-[54px] min-w-0 items-center justify-center gap-1.5 border-b-[2.5px] px-1.5 text-xs font-black transition ${
                            active
                                ? "border-[#003527] text-[#003527]"
                                : "border-transparent text-[#66736d]"
                        }`}
                        aria-selected={active}
                    >
                        <span className="material-symbols-outlined icon-fill text-[16px]">
                            {tab.icon}
                        </span>
                        <span className="inline-flex min-w-0 items-center gap-1">
                            {tab.label}
                            {tab.count && (
                                <span className="text-[10px] opacity-70">({tab.count})</span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
