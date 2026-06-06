// Presents the store identity, verification signal, and high-level trust stats.
export default function StoreHero({ store }) {
    return (
        <section className="store-hero">
            <div className="absolute inset-0">
                <img
                    src={store.coverImage}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover opacity-20"
                />
            </div>

            <div className="hero-inner relative mx-auto max-w-[1280px] px-4 py-7 md:px-10">
                <div className="max-w-3xl">
                    <div className="mb-4 hidden items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b] sm:inline-flex">
                        <span className="material-symbols-outlined icon-fill text-[15px]">
                            store
                        </span>
                        {store.category} store
                    </div>

                    <div className="mb-4 flex items-center gap-3 sm:gap-4">
                        <div
                            className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] text-base font-black shadow-[0_4px_20px_rgba(0,0,0,0.22),0_0_0_3px_rgba(255,255,255,0.15)] sm:h-[60px] sm:w-[60px] sm:rounded-2xl sm:text-xl ${store.avatarClass}`}
                        >
                            {store.initials}
                        </div>

                        <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                                <h1 className="text-[28px] font-black leading-tight tracking-[-0.04em] text-white sm:text-[32px]">
                                    {store.name}
                                </h1>

                                {store.verified && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5ee]/95 py-1 pl-1.5 pr-2.5 text-[11px] font-black text-[#003527]">
                                        <span className="material-symbols-outlined icon-fill text-[14px]">
                                            verified
                                        </span>
                                        Verified
                                    </span>
                                )}
                            </div>

                            <p className="text-sm font-semibold text-white/60">
                                {store.location} - {store.joined}
                            </p>
                        </div>
                    </div>

                    <p className="mb-5 hidden max-w-xl text-sm leading-7 text-white/70 sm:block sm:text-base sm:leading-8">
                        {store.description}
                    </p>

                    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap sm:gap-2.5 [&::-webkit-scrollbar]:hidden">
                        <HeroPill icon="star" value={store.rating} label="rating" />
                        <HeroPill
                            icon="inventory_2"
                            value={store.productsCount}
                            label="products"
                        />
                        {store.verified && (
                            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur">
                                <span className="material-symbols-outlined icon-fill text-[15px] text-[#95d3ba]">
                                    verified
                                </span>
                                <span className="text-[13px] font-black text-white/95">
                                    Verified seller
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroPill({ icon, value, label }) {
    return (
        <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur">
            <span className="material-symbols-outlined icon-fill text-[15px] text-[#fed65b]">
                {icon}
            </span>
            <span className="text-[13px] font-black text-[#fed65b]">{value}</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[11px] font-bold text-white/70">{label}</span>
        </div>
    );
}
