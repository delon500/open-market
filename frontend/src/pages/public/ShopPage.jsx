import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const categories = [
    "All",
    "Fashion",
    "Sneakers",
    "Electronics",
    "Beauty",
    "Home",
    "Accessories",
    "Handmade",
    "Local deals",
];

const products = [
    {
        id: 1,
        title: "Nike Air Max 270",
        category: "Sneakers",
        seller: "Kasi Kicks",
        sellerInitial: "K",
        sellerColor: "#003527",
        location: "Johannesburg",
        condition: "Used",
        previousPrice: "R 1,200",
        price: "R 850",
        rating: "4.9",
        reviews: 34,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        imageBg: "#f0faf6",
    },
    {
        id: 2,
        title: "Classic Silver Watch",
        category: "Accessories",
        seller: "Cape Time Co.",
        sellerInitial: "C",
        sellerColor: "#745c00",
        location: "Cape Town",
        condition: "New",
        previousPrice: null,
        price: "R 1,200",
        rating: "4.8",
        reviews: 22,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        imageBg: "#fff8e0",
    },
    {
        id: 3,
        title: "Chanel No.5 EDP",
        category: "Beauty",
        seller: "Bloom Beauty",
        sellerInitial: "B",
        sellerColor: "#ba1a1a",
        location: "Durban",
        condition: "New",
        previousPrice: null,
        price: "R 2,400",
        rating: "4.9",
        reviews: 41,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80",
        imageBg: "#fff1f4",
    },
    {
        id: 4,
        title: "Polaroid Now Camera",
        category: "Electronics",
        seller: "Sandton Gadgets",
        sellerInitial: "S",
        sellerColor: "#1e40af",
        location: "Sandton",
        condition: "New",
        previousPrice: "R 2,100",
        price: "R 1,750",
        rating: "4.7",
        reviews: 18,
        delivery: "Collect",
        image:
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        imageBg: "#e8f2ff",
    },
    {
        id: 5,
        title: "Women's Linen Shirt",
        category: "Fashion",
        seller: "Jozi Threads",
        sellerInitial: "J",
        sellerColor: "#003527",
        location: "Pretoria",
        condition: "New",
        previousPrice: null,
        price: "R 320",
        rating: "4.6",
        reviews: 12,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
        imageBg: "#f7f2ee",
    },
    {
        id: 6,
        title: "Ceramic Home Vase",
        category: "Home",
        seller: "Home Nest",
        sellerInitial: "H",
        sellerColor: "#745c00",
        location: "Cape Town",
        condition: "Like new",
        previousPrice: "R 390",
        price: "R 280",
        rating: "4.8",
        reviews: 27,
        delivery: "Collect",
        image:
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
        imageBg: "#f0faf6",
    },
    {
        id: 7,
        title: "Wireless Headphones",
        category: "Electronics",
        seller: "Tech Corner",
        sellerInitial: "T",
        sellerColor: "#121c2a",
        location: "Johannesburg",
        condition: "Used",
        previousPrice: "R 950",
        price: "R 690",
        rating: "4.5",
        reviews: 16,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        imageBg: "#f0f4f8",
    },
    {
        id: 8,
        title: "Leather Crossbody Bag",
        category: "Fashion",
        seller: "Local Craft Co.",
        sellerInitial: "L",
        sellerColor: "#003527",
        location: "Durban",
        condition: "New",
        previousPrice: null,
        price: "R 540",
        rating: "4.9",
        reviews: 31,
        delivery: "Courier",
        image:
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
        imageBg: "#fff8e0",
    },
];

const totalProducts = 48;

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeFilters, setActiveFilters] = useState([
        "Used",
        "Under R1,000",
        "Johannesburg",
    ]);
    const [query, setQuery] = useState("");
    const [view, setView] = useState("grid");
    const [wishlist, setWishlist] = useState(() => new Set());
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedCount, setLoadedCount] = useState(products.length);

    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return products.filter((product) => {
            const categoryMatches =
                activeCategory === "All" || product.category === activeCategory;
            const queryMatches =
                !normalizedQuery ||
                [product.title, product.seller, product.category, product.location]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);

            return categoryMatches && queryMatches;
        });
    }, [activeCategory, query]);

    function removeFilter(filter) {
        setActiveFilters((filters) => filters.filter((item) => item !== filter));
    }

    function clearFilters() {
        setActiveFilters([]);
        setActiveCategory("All");
        setQuery("");
    }

    function toggleWishlist(id) {
        setWishlist((current) => {
            const next = new Set(current);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    }

    function loadMore() {
        setLoadingMore(true);
        window.setTimeout(() => {
            setLoadedCount(totalProducts);
            setLoadingMore(false);
        }, 650);
    }

    return (
        <PublicLayout>
            <style>{`
                @keyframes shopFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes shopSpin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .shop-au {
                    animation: shopFadeUp .4s cubic-bezier(.22, 1, .36, 1) both;
                }

                .shop-spin {
                    animation: shopSpin .8s linear infinite;
                }

                .shop-chip-row::-webkit-scrollbar {
                    height: 0;
                }

                .shop-chip-row {
                    scrollbar-width: none;
                }

                .shop-card {
                    transition: transform .2s ease, box-shadow .2s ease, border-color .18s;
                }

                .shop-card:hover {
                    transform: translateY(-4px);
                    border-color: #c4e8da;
                    box-shadow: 0 18px 44px rgba(0, 53, 39, .10);
                }

                .shop-card img {
                    transition: transform .45s ease;
                }

                .shop-card:hover img {
                    transform: scale(1.05);
                }
            `}</style>

            <main className="bg-[#f8f9ff] pb-24 text-[#121c2a] md:pb-12">
                <ShopToolbar
                    activeCategory={activeCategory}
                    activeFilters={activeFilters}
                    query={query}
                    view={view}
                    onCategoryChange={setActiveCategory}
                    onClearFilters={clearFilters}
                    onOpenFilters={() => setFiltersOpen(true)}
                    onQueryChange={setQuery}
                    onRemoveFilter={removeFilter}
                    onViewChange={setView}
                />

                <FilterDrawer
                    open={filtersOpen}
                    onClose={() => setFiltersOpen(false)}
                    onClearFilters={clearFilters}
                />

                <div className="mx-auto max-w-[1280px] px-4 pt-6 md:px-10">
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                        <aside className="hidden lg:col-span-3 lg:block">
                            <div className="sticky top-[170px] rounded-[20px] border-[1.5px] border-[#e6eeff] bg-white p-5 shadow-[0_4px_20px_rgba(0,53,39,.05)]">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-[15px] font-black text-[#121c2a]">
                                        Filters
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="text-xs font-bold text-[#ba1a1a] underline-offset-2 hover:underline"
                                    >
                                        Clear all
                                    </button>
                                </div>

                                <FilterControls />
                            </div>
                        </aside>

                        <section className="lg:col-span-9">
                            <div className="mb-4 flex items-center justify-between">
                                <p
                                    aria-live="polite"
                                    className="text-[13px] font-medium text-[#707974]"
                                >
                                    Showing{" "}
                                    <strong className="text-[#121c2a]">
                                        {visibleProducts.length}
                                    </strong>{" "}
                                    of {totalProducts} products
                                </p>
                            </div>

                            {visibleProducts.length === 0 ? (
                                <EmptyState onClearFilters={clearFilters} />
                            ) : (
                                <div
                                    className={
                                        view === "grid"
                                            ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                                            : "grid grid-cols-1 gap-5"
                                    }
                                >
                                    {visibleProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            listView={view === "list"}
                                            saved={wishlist.has(product.id)}
                                            index={index}
                                            onToggleWishlist={toggleWishlist}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="mt-9 flex flex-col items-center gap-3">
                                <p className="text-xs font-semibold text-[#9aada7]">
                                    Showing {loadedCount} of {totalProducts} products
                                </p>
                                <button
                                    type="button"
                                    onClick={loadMore}
                                    disabled={loadingMore || loadedCount === totalProducts}
                                    className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[#bfc9c3] bg-white px-5 py-3 text-sm font-bold text-[#003527] transition hover:border-[#003527] disabled:cursor-default disabled:opacity-70"
                                >
                                    <span
                                        className={`material-symbols-outlined text-[18px] ${
                                            loadingMore ? "shop-spin" : ""
                                        }`}
                                    >
                                        {loadedCount === totalProducts
                                            ? "check"
                                            : loadingMore
                                              ? "progress_activity"
                                              : "expand_more"}
                                    </span>
                                    {loadedCount === totalProducts
                                        ? "All products loaded"
                                        : loadingMore
                                          ? "Loading..."
                                          : "Load more products"}
                                    {loadedCount !== totalProducts && !loadingMore ? (
                                        <span className="text-xs font-semibold text-[#9aada7]">
                                            ({totalProducts - loadedCount} remaining)
                                        </span>
                                    ) : null}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-20 right-5 z-40 flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#003527] text-white shadow-[0_8px_24px_rgba(0,53,39,.25)] md:bottom-8"
                    aria-label="Back to top"
                >
                    <span className="material-symbols-outlined text-[22px]">
                        keyboard_arrow_up
                    </span>
                </button>
            </main>
        </PublicLayout>
    );
}

function ShopToolbar({
    activeCategory,
    activeFilters,
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

function FilterDrawer({ open, onClose, onClearFilters }) {
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

function FilterControls({ mobile = false }) {
    const sectionClass = mobile
        ? "border-t-[1.5px] border-[#e6eeff] py-4"
        : "border-t-[1.5px] border-[#f0f4f8] py-3.5";
    const labelClass = mobile
        ? "mb-2.5 text-xs font-extrabold uppercase tracking-[.05em] text-[#121c2a]"
        : "mb-2.5 text-[11px] font-extrabold uppercase tracking-[.05em] text-[#121c2a]";

    return (
        <>
            <div className={sectionClass}>
                <p className={labelClass}>Location</p>
                <div className="relative">
                    <select className="w-full cursor-pointer appearance-none rounded-xl border-[1.5px] border-[#bfc9c3] bg-white px-3 py-2 text-[13px] font-bold text-[#121c2a] outline-none transition focus:border-[#003527]">
                        <option>All locations</option>
                        <option>Johannesburg</option>
                        <option>Cape Town</option>
                        <option>Durban</option>
                        <option>Pretoria</option>
                        <option>Port Elizabeth</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-[#707974]">
                        expand_more
                    </span>
                </div>
            </div>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Condition">
                <FilterCheckbox label="New" defaultChecked />
                <FilterCheckbox label="Used" defaultChecked />
                <FilterCheckbox label="Like new" />
            </FilterSection>

            <div className={sectionClass}>
                <p className={labelClass}>Price range (R)</p>
                <div className="mb-2 grid grid-cols-2 gap-2">
                    <PriceInput placeholder="Min" defaultValue={mobile ? "" : "0"} />
                    <PriceInput placeholder="Max" defaultValue={mobile ? "" : "1000"} />
                </div>
                <button
                    type="button"
                    className="w-full rounded-[10px] bg-[#003527] px-3 py-2.5 text-xs font-bold text-white transition hover:opacity-85"
                >
                    {mobile ? "Apply" : "Apply range"}
                </button>
            </div>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Seller">
                <FilterCheckbox label={mobile ? "Verified sellers" : "Verified only"} />
                <FilterCheckbox label="Top rated (4+)" />
                {!mobile ? <FilterCheckbox label="Local stores" /> : null}
            </FilterSection>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Delivery">
                <FilterCheckbox label="Courier delivery" />
                <FilterCheckbox label="Collection available" />
            </FilterSection>
        </>
    );
}

function FilterSection({ className, titleClass, title, children }) {
    return (
        <div className={className}>
            <p className={titleClass}>{title}</p>
            <div className="flex flex-col gap-2.5">{children}</div>
        </div>
    );
}

function FilterCheckbox({ label, defaultChecked = false }) {
    return (
        <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-[#404944]">
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="h-4 w-4 shrink-0 cursor-pointer rounded-[5px] border-[1.5px] border-[#bfc9c3] accent-[#003527]"
            />
            {label}
        </label>
    );
}

function PriceInput(props) {
    return (
        <input
            {...props}
            className="w-full rounded-[10px] border-[1.5px] border-[#bfc9c3] bg-[#f8f9ff] px-2.5 py-2 text-[13px] font-semibold text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527]"
        />
    );
}

function EmptyState({ onClearFilters }) {
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

function ProductCard({
    product,
    listView,
    saved,
    index,
    onToggleWishlist,
}) {
    const badgeClass =
        product.condition === "New"
            ? "bg-[#e8f5ee] text-[#003527]"
            : product.condition === "Used"
              ? "bg-[#fff8e0] text-[#745c00]"
              : "bg-[#e8f2ff] text-[#1e40af]";

    return (
        <article
            className={`shop-card shop-au flex overflow-hidden rounded-[20px] border-[1.5px] border-[#e6eeff] bg-white ${
                listView ? "flex-col md:flex-row" : "flex-col"
            }`}
            style={{ animationDelay: `${Math.min(index, 6) * 0.06}s` }}
        >
            <div
                className={`relative overflow-hidden ${
                    listView ? "h-[220px] md:h-auto md:w-[200px] md:min-w-[200px]" : "h-[220px]"
                }`}
                style={{ background: product.imageBg }}
            >
                <Link to={`/products/${product.id}`} className="block h-full w-full">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`absolute right-2.5 top-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-white ${
                        saved ? "text-[#ba1a1a]" : "text-[#9aada7] hover:text-[#ba1a1a]"
                    }`}
                    aria-label={`Save ${product.title} to wishlist`}
                >
                    <span className="material-symbols-outlined text-[19px]">
                        favorite
                    </span>
                </button>

                <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-[#e8f5ee] px-2 py-1 text-[11px] font-bold text-[#1e6b4a]">
                    <span className="material-symbols-outlined text-[13px]">
                        local_shipping
                    </span>
                    {product.delivery}
                </span>
            </div>

            <div className="relative flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-[.04em] text-[#003527]">
                        {product.category}
                    </span>
                    <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${badgeClass}`}
                    >
                        {product.condition}
                    </span>
                </div>

                <Link to={`/products/${product.id}`}>
                    <h3 className="mb-1 text-[15px] font-extrabold leading-snug text-[#121c2a] hover:text-[#003527]">
                        {product.title}
                    </h3>
                </Link>

                <div className="mb-1.5 flex items-center gap-1.5">
                    <div
                        className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                        style={{ background: product.sellerColor }}
                    >
                        {product.sellerInitial}
                    </div>
                    <span className="text-xs font-semibold text-[#404944]">
                        {product.seller}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#003527]">
                        <span className="material-symbols-outlined icon-fill text-[13px]">
                            verified
                        </span>
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined icon-fill text-[15px] text-[#f59e0b]">
                            star
                        </span>
                        <span className="text-[11px] font-semibold text-[#707974]">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#707974]">
                        <span className="material-symbols-outlined text-[13px]">
                            location_on
                        </span>
                        {product.location}
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3.5">
                    <div>
                        {product.previousPrice ? (
                            <div className="text-[11px] font-semibold text-[#9aada7] line-through">
                                {product.previousPrice}
                            </div>
                        ) : null}
                        <span className="text-xl font-black tracking-[-0.02em] text-[#003527]">
                            {product.price}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-[#003527] transition hover:opacity-80"
                        aria-label={`Add ${product.title} to cart`}
                    >
                        <span className="material-symbols-outlined icon-fill text-[18px] text-white">
                            add
                        </span>
                    </button>
                </div>
            </div>
        </article>
    );
}
