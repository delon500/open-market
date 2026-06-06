// Gives mobile buyers a compact, horizontally scrollable store summary below the hero.
export default function MobileStoreStrip({ store }) {
    const stats = [
        {
            icon: "star",
            label: `${store.rating} - ${store.reviewCount} reviews`,
            iconClass: "text-[#d4a800]",
        },
        {
            icon: "inventory_2",
            label: `${store.productsCount} products`,
            iconClass: "text-[#003527]",
        },
        {
            icon: "location_on",
            label: store.shortLocation,
            iconClass: "text-[#003527]",
        },
        {
            icon: "local_shipping",
            label: store.shortDelivery,
            iconClass: "text-[#003527]",
        },
    ];

    return (
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#e0e9e4] bg-white px-4 py-2.5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e0e9e4] bg-[#f0f4f2] px-3 py-1.5 text-xs font-extrabold text-[#2d4438]"
                >
                    <span
                        className={`material-symbols-outlined icon-fill text-[14px] ${stat.iconClass}`}
                    >
                        {stat.icon}
                    </span>
                    {stat.label}
                </div>
            ))}
        </div>
    );
}
