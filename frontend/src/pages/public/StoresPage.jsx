import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyStoresState from "../../components/stores/EmptyStoresState.jsx";
import StoreCard from "../../components/stores/StoreCard.jsx";
import StoreToolbar from "../../components/stores/StoreToolbar.jsx";
import { storeCategories, stores } from "../../data/stores.js";
import PublicLayout from "../../layouts/PublicLayout";

// Public stores page coordinator: owns filters/search state and composes store sections.
export default function StoresPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("top-rated");
    const [savedStores, setSavedStores] = useState(
        stores.filter((store) => store.saved).map((store) => store.id)
    );

    const filteredStores = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return stores
            .filter((store) => {
                const matchesCategory =
                    activeCategory === "all" || store.category === activeCategory;

                const matchesSearch =
                    !query ||
                    store.name.toLowerCase().includes(query) ||
                    store.location.toLowerCase().includes(query) ||
                    store.categoryLabel.toLowerCase().includes(query) ||
                    store.searchTerms.includes(query);

                return matchesCategory && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === "top-rated") return b.rating - a.rating;
                if (sortBy === "most-products") return b.products - a.products;
                if (sortBy === "newest") return b.newest - a.newest;
                if (sortBy === "verified-first") {
                    return Number(b.verified) - Number(a.verified);
                }
                return 0;
            });
    }, [activeCategory, searchTerm, sortBy]);

    function handleResetFilters() {
        setSearchTerm("");
        setActiveCategory("all");
        setSortBy("top-rated");
    }

    function toggleSavedStore(storeId) {
        setSavedStores((current) =>
            current.includes(storeId)
                ? current.filter((id) => id !== storeId)
                : [...current, storeId]
        );
    }

    return (
        <PublicLayout>
            <style>{`
                .stores-hero-bg {
                    position: relative;
                    overflow: hidden;
                    background-color: #003527;
                    background-image:
                        radial-gradient(circle at top left, rgba(149,211,186,.16), transparent 32%),
                        radial-gradient(circle at 85% 20%, rgba(254,214,91,.12), transparent 30%),
                        radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px);
                    background-size: auto, auto, 28px 28px;
                }

                .seller-cta-bg {
                    position: relative;
                    overflow: hidden;
                    background-color: #003527;
                    background-image:
                        radial-gradient(circle at 88% 14%, rgba(149,211,186,.20), transparent 32%),
                        radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px);
                    background-size: auto, 24px 24px;
                }
            `}</style>

            <main className="bg-[#f8f9ff]">
                <section className="stores-hero-bg">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-18">
                        <div className="max-w-[720px]">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">
                                    store
                                </span>
                                Registered local sellers
                            </div>

                            <h1
                                className="mb-4 text-white"
                                style={{
                                    fontSize: "clamp(38px, 5.2vw, 62px)",
                                    fontWeight: 900,
                                    lineHeight: 1.04,
                                    letterSpacing: "-0.05em",
                                }}
                            >
                                Explore local stores on{" "}
                                <span className="text-[#fed65b]">Open Market.</span>
                            </h1>

                            <p className="mb-8 max-w-[560px] text-[16px] leading-8 text-white/70">
                                Discover registered South African sellers, browse what they
                                sell, and visit stores you can trust.
                            </p>

                            <div className="max-w-[620px]">
                                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#95d3ba] focus-within:bg-white/[0.13] focus-within:ring-4 focus-within:ring-[#95d3ba]/20">
                                    <span className="material-symbols-outlined text-[#95d3ba]">
                                        search
                                    </span>

                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(event) =>
                                            setSearchTerm(event.target.value)
                                        }
                                        placeholder="Search stores, categories, or locations..."
                                        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/45 focus:ring-0"
                                    />

                                    <button
                                        type="button"
                                        className="rounded-xl bg-[#fed65b] px-4 py-2 text-sm font-black text-[#3a2e00] transition-opacity hover:opacity-90"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <StoreToolbar
                    activeCategory={activeCategory}
                    categories={storeCategories}
                    resultCount={filteredStores.length}
                    sortBy={sortBy}
                    onCategoryChange={setActiveCategory}
                    onSortChange={setSortBy}
                />

                <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-10 md:py-12">
                    {filteredStores.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filteredStores.map((store) => (
                                <StoreCard
                                    key={store.id}
                                    store={store}
                                    saved={savedStores.includes(store.id)}
                                    onToggleSaved={() => toggleSavedStore(store.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyStoresState onReset={handleResetFilters} />
                    )}
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="seller-cta-bg rounded-[32px] p-8 shadow-[0_24px_56px_rgba(0,53,39,.18)] md:p-12">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                                    <span className="material-symbols-outlined icon-fill text-[15px]">
                                        storefront
                                    </span>
                                    For sellers
                                </span>

                                <h2
                                    className="mb-4 max-w-[650px] text-white"
                                    style={{
                                        fontSize: "clamp(30px, 4vw, 46px)",
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.045em",
                                    }}
                                >
                                    Want your store listed{" "}
                                    <span className="text-[#fed65b]">
                                        on Open Market?
                                    </span>
                                </h2>

                                <p className="max-w-[560px] text-[15px] leading-7 text-white/70">
                                    Create a seller account, set up your store profile, list your
                                    products, and start reaching local buyers across South Africa.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 lg:col-span-4">
                                <Link
                                    to="/register-seller"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-6 py-4 text-sm font-black text-[#3a2e00] transition-opacity hover:opacity-90"
                                >
                                    Register as seller
                                    <span className="material-symbols-outlined text-[18px]">
                                        arrow_forward
                                    </span>
                                </Link>

                                <Link
                                    to="/become-seller"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white transition-colors hover:bg-white/10"
                                >
                                    Learn about selling
                                    <span className="material-symbols-outlined text-[18px]">
                                        open_in_new
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}
