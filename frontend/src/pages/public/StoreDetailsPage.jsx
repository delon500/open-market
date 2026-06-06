import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyerProtectionPanel from "../../components/store-details/BuyerProtectionPanel";
import MobileStoreActions from "../../components/store-details/MobileStoreActions";
import MobileStoreStrip from "../../components/store-details/MobileStoreStrip";
import SaveStoreButton from "../../components/store-details/SaveStoreButton";
import StoreBreadcrumb from "../../components/store-details/StoreBreadcrumb";
import StoreDetailsStyles from "../../components/store-details/StoreDetailsStyles";
import StoreEmptyState from "../../components/store-details/StoreEmptyState";
import StoreFilterChips from "../../components/store-details/StoreFilterChips";
import StoreHero from "../../components/store-details/StoreHero";
import StoreInfoCard from "../../components/store-details/StoreInfoCard";
import StoreProductCard from "../../components/store-details/StoreProductCard";
import StoreProductToolbar from "../../components/store-details/StoreProductToolbar";
import StoreReviewsPanel from "../../components/store-details/StoreReviewsPanel";
import StoreSectionTabs from "../../components/store-details/StoreSectionTabs";
import StoreToast from "../../components/store-details/StoreToast";
import { storeDetailsStores } from "../../data/storeDetails";
import PublicLayout from "../../layouts/PublicLayout";

// Coordinates store lookup, product filtering, and interaction state for the store details experience.
export default function StoreDetailsPage() {
    const { storeId } = useParams();
    const store = storeDetailsStores.find((item) => item.id === storeId) || storeDetailsStores[0];
    const toastTimerRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeSort, setActiveSort] = useState("newest");
    const [activeTab, setActiveTab] = useState("products");
    const [savedProducts, setSavedProducts] = useState([]);
    const [storeSaved, setStoreSaved] = useState(false);
    const [toast, setToast] = useState("");

    const visibleProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        const filteredProducts = store.products.filter((product) => {
            const matchesSearch =
                !query ||
                `${product.title} ${product.condition} ${product.category}`
                    .toLowerCase()
                    .includes(query);

            let matchesFilter = true;
            if (activeFilter === "New") matchesFilter = product.condition === "New";
            if (activeFilter === "Like New") {
                matchesFilter = product.condition === "Like New";
            }
            if (activeFilter === "under400") matchesFilter = product.price < 400;
            if (activeFilter === "over400") matchesFilter = product.price >= 400;

            return matchesSearch && matchesFilter;
        });

        if (activeSort === "low") {
            return [...filteredProducts].sort((a, b) => a.price - b.price);
        }

        if (activeSort === "high") {
            return [...filteredProducts].sort((a, b) => b.price - a.price);
        }

        if (activeSort === "rated") {
            return [...filteredProducts].sort((a, b) => b.rating - a.rating);
        }

        return filteredProducts;
    }, [activeFilter, activeSort, searchQuery, store.products]);

    function showToast(message) {
        setToast(message);
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast(""), 2000);
    }

    function handleAddToCart(productTitle) {
        showToast(`${productTitle} added to cart`);
    }

    function handleToggleWishlist(product) {
        if (savedProducts.includes(product.id)) {
            setSavedProducts((current) => current.filter((id) => id !== product.id));
            showToast("Removed from saved items");
            return;
        }

        setSavedProducts((current) => [...current, product.id]);
        showToast(`${product.title} saved`);
    }

    function handleSaveStore() {
        setStoreSaved((current) => {
            const next = !current;
            showToast(next ? `${store.name} saved` : "Store removed from saved");
            return next;
        });
    }

    function handleMessageSeller() {
        showToast("Sign in to message this seller");
    }

    return (
        <PublicLayout>
            <StoreDetailsStyles />

            <main className="mobile-pad bg-[#f0f4f2]">
                <StoreBreadcrumb store={store} />

                <StoreHero store={store} />

                <MobileStoreStrip store={store} />

                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 py-6 md:px-10 md:py-8 lg:grid-cols-12">
                    <aside className="fade-up order-1 lg:col-span-4">
                        <div className="sticky top-24 space-y-5">
                            <div className="mobile-sidebar-hide rounded-[24px] border border-[#d8e5df] bg-white p-6 shadow-[0_8px_32px_-8px_rgba(0,53,39,0.10)]">
                                <StoreInfoCard store={store} />

                                <div className="mt-6 space-y-3">
                                    <button
                                        type="button"
                                        onClick={handleMessageSeller}
                                        className="btn-primary-sidebar"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            chat
                                        </span>
                                        Sign in to message seller
                                    </button>

                                    <SaveStoreButton
                                        saved={storeSaved}
                                        onClick={handleSaveStore}
                                        className="btn-secondary-sidebar"
                                    />
                                </div>
                            </div>

                            <BuyerProtectionPanel className="mobile-sidebar-hide fade-up" />
                        </div>
                    </aside>

                    <section className="fade-up mobile-products-first lg:col-span-8">
                        <StoreSectionTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            store={store}
                        />

                        <div
                            className={`tab-panel ${
                                activeTab === "products" ? "block" : "hidden"
                            } lg:block`}
                        >
                            <StoreProductToolbar
                                store={store}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                activeSort={activeSort}
                                setActiveSort={setActiveSort}
                            />

                            <StoreFilterChips
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter}
                            />

                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-black text-[#121c2a] lg:text-xl">
                                        Products from {store.name}
                                    </h2>
                                    <p className="text-sm text-[#66736d]">
                                        Showing {visibleProducts.length} product
                                        {visibleProducts.length === 1 ? "" : "s"}
                                    </p>
                                </div>

                                <Link
                                    to="/shop"
                                    className="hidden text-sm font-black text-[#003527] underline-offset-4 hover:underline sm:inline"
                                >
                                    Browse all
                                    <span className="material-symbols-outlined align-middle text-[16px]">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>

                            {visibleProducts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                                    {visibleProducts.map((product) => (
                                        <StoreProductCard
                                            key={product.id}
                                            product={product}
                                            saved={savedProducts.includes(product.id)}
                                            onAddToCart={handleAddToCart}
                                            onToggleWishlist={handleToggleWishlist}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <StoreEmptyState />
                            )}
                        </div>

                        <div
                            className={`tab-panel ${
                                activeTab === "reviews" ? "block" : "hidden"
                            } lg:block`}
                        >
                            <StoreReviewsPanel store={store} />
                        </div>

                        <div
                            className={`tab-panel ${
                                activeTab === "about" ? "block" : "hidden"
                            } lg:hidden`}
                        >
                            <div className="rounded-[24px] border border-[#d8e5df] bg-white p-5 shadow-[0_4px_20px_rgba(0,53,39,0.05)]">
                                <StoreInfoCard store={store} />
                            </div>

                            <BuyerProtectionPanel className="mt-5" />
                        </div>
                    </section>
                </section>
            </main>

            <MobileStoreActions
                saved={storeSaved}
                onMessage={handleMessageSeller}
                onSave={handleSaveStore}
            />

            {toast && <StoreToast message={toast} />}
        </PublicLayout>
    );
}
