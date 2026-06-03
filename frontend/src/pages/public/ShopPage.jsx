import { useMemo, useState } from "react";
import EmptyState from "../../components/shop/EmptyState.jsx";
import FilterControls from "../../components/shop/FilterControls.jsx";
import FilterDrawer from "../../components/shop/FilterDrawer.jsx";
import ProductCard from "../../components/shop/ProductCard.jsx";
import ShopToolbar from "../../components/shop/ShopToolbar.jsx";
import { categories, products, totalProducts } from "../../data/shopProducts.js";
import PublicLayout from "../../layouts/PublicLayout";

// Public shop page coordinator: owns local UI state and composes shop sections.
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
                    categories={categories}
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
