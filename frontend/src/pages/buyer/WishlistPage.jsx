import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";
import ProductCard from "../../components/shop/ProductCard";
import { createWishlistCardProduct } from "../../components/shop/productCardModel";

// ─── Data ────────────────────────────────────────────────────────────────────

const initialWishlistItems = [
    {
        id: "classic-white-sneakers",
        title: "Classic white everyday sneakers",
        seller: "Kasi Kicks",
        price: 899,
        oldPrice: 1099,
        category: "Shoes",
        condition: "New",
        location: "Soweto, Johannesburg",
        rating: 4.8,
        reviews: 42,
        delivery: "Courier or Click & Collect",
        savedAt: "2026-06-16",
        inStock: true,
        badge: "Price dropped",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "neutral-cotton-hoodie",
        title: "Oversized neutral cotton hoodie",
        seller: "Urban Thread",
        price: 549,
        oldPrice: 699,
        category: "Clothing",
        condition: "New",
        location: "Braamfontein, Johannesburg",
        rating: 4.7,
        reviews: 31,
        delivery: "Courier delivery",
        savedAt: "2026-06-15",
        inStock: true,
        badge: "Popular",
        image:
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "leather-crossbody-bag",
        title: "Handmade leather crossbody bag",
        seller: "Soweto Leather Co.",
        price: 1150,
        oldPrice: null,
        category: "Bags",
        condition: "New",
        location: "Soweto, Johannesburg",
        rating: 4.9,
        reviews: 56,
        delivery: "Courier or Click & Collect",
        savedAt: "2026-06-12",
        inStock: true,
        badge: "Verified seller",
        image:
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "canvas-weekender-bag",
        title: "Canvas weekender bag",
        seller: "Local Carry",
        price: 499,
        oldPrice: 650,
        category: "Bags",
        condition: "New",
        location: "Pretoria, Gauteng",
        rating: 4.6,
        reviews: 19,
        delivery: "Courier delivery",
        savedAt: "2026-06-08",
        inStock: true,
        badge: "Limited stock",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "vintage-denim-jacket",
        title: "Vintage denim jacket",
        seller: "Retro Rail",
        price: 380,
        oldPrice: null,
        category: "Clothing",
        condition: "Pre-owned",
        location: "Maboneng, Johannesburg",
        rating: 4.5,
        reviews: 14,
        delivery: "Click & Collect",
        savedAt: "2026-06-03",
        inStock: false,
        badge: "Out of stock",
        image:
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=600&q=80",
    },
];

const categories = ["All", "Clothing", "Shoes", "Bags", "Accessories"];

const sortOptions = [
    { label: "Recently saved", value: "recent" },
    { label: "Price: low to high", value: "price-low" },
    { label: "Price: high to low", value: "price-high" },
    { label: "Highest rated", value: "rating" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
    const saved = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.round((now - saved) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Saved today";
    if (diffDays === 1) return "Saved yesterday";
    if (diffDays < 7) return `Saved ${diffDays} days ago`;
    if (diffDays < 14) return "Saved last week";
    const diffWeeks = Math.round(diffDays / 7);
    return `Saved ${diffWeeks} weeks ago`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [quickFilter, setQuickFilter] = useState("all");
    const [successMessage, setSuccessMessage] = useState("");
    const [itemToRemove, setItemToRemove] = useState(null);
    const successTimerRef = useRef(null);

    // FIX 1: Clean success toast — no dev notes, auto-dismiss
    function showSuccess(message) {
        clearTimeout(successTimerRef.current);
        setSuccessMessage(message);
        successTimerRef.current = setTimeout(() => setSuccessMessage(""), 4500);
    }

    useEffect(() => () => clearTimeout(successTimerRef.current), []);

    // FIX 7: Category counts derived from wishlist
    const categoryCounts = useMemo(() => {
        const counts = { All: wishlistItems.length };
        wishlistItems.forEach((item) => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return counts;
    }, [wishlistItems]);

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return [...wishlistItems]
            .filter((item) => {
                const matchesCategory =
                    activeCategory === "All" || item.category === activeCategory;
                const matchesSearch =
                    !query ||
                    item.title.toLowerCase().includes(query) ||
                    item.seller.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query) ||
                    item.location.toLowerCase().includes(query);
                const matchesQuickFilter =
                    quickFilter === "all" ||
                    (quickFilter === "in-stock" && item.inStock) ||
                    (quickFilter === "price-drops" && item.oldPrice);

                return matchesCategory && matchesSearch && matchesQuickFilter;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "rating") return b.rating - a.rating;
                return new Date(b.savedAt) - new Date(a.savedAt);
            });
    }, [activeCategory, quickFilter, searchQuery, sortBy, wishlistItems]);

    const inStockCount = wishlistItems.filter((i) => i.inStock).length;
    const priceDropCount = wishlistItems.filter((i) => i.oldPrice).length;

    // FIX 6: Only show "dirty" state when filters are actually applied
    const filtersActive =
        activeCategory !== "All" ||
        quickFilter !== "all" ||
        searchQuery.trim() !== "" ||
        sortBy !== "recent";

    const allSavedActive =
        quickFilter === "all" &&
        activeCategory === "All" &&
        searchQuery.trim() === "" &&
        sortBy === "recent";

    function handleAddToCart(item) {
        showSuccess(`${item.title} added to cart.`);
    }

    function confirmRemove() {
        if (!itemToRemove) return;
        setWishlistItems((prev) => prev.filter((i) => i.id !== itemToRemove.id));
        showSuccess(`${itemToRemove.title} removed from saved items.`);
        setItemToRemove(null);
    }

    function resetFilters() {
        setActiveCategory("All");
        setSearchQuery("");
        setSortBy("recent");
        setQuickFilter("all");
    }

    // FIX 5: Summary cards filter the list when clicked
    function handleSummaryCardClick(type) {
        if (type === "inStock") {
            setQuickFilter("in-stock");
            setActiveCategory("All");
            setSearchQuery("");
            setSortBy("recent");
        } else if (type === "priceDrops") {
            setQuickFilter("price-drops");
            setActiveCategory("All");
            setSearchQuery("");
            setSortBy("recent");
        }
    }

    return (
        <div className="space-y-8">
            <BuyerPageHeader
                eyebrow="Saved items"
                title="Your wishlist"
                description="Keep track of products you like, compare prices, and quickly continue shopping when you're ready to buy."
                actions={
                    <>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Continue shopping
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                        <Link
                            to="/cart"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                            View cart
                        </Link>
                    </>
                }
            />

            {/* FIX 1: Lean one-line success toast, no dev notes */}
            {successMessage && (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] px-5 py-4"
                >
                    <span className="material-symbols-outlined icon-fill shrink-0 text-[20px] text-[#003527]">
                        check_circle
                    </span>
                    <p className="flex-1 text-sm font-black text-[#003527]">{successMessage}</p>
                    <button
                        type="button"
                        onClick={() => setSuccessMessage("")}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white"
                        aria-label="Dismiss message"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            )}

            {/* FIX 5: Summary cards are clickable filters */}
            <section aria-label="Wishlist summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SummaryCard
                    icon="favorite"
                    label="Saved items"
                    value={wishlistItems.length}
                    text="Products you saved"
                    active={allSavedActive}
                    clickable
                    onClick={resetFilters}
                    hint="Show all saved items"
                />
                <SummaryCard
                    icon="inventory_2"
                    label="In stock"
                    value={inStockCount}
                    text="Available to buy"
                    active={quickFilter === "in-stock"}
                    clickable
                    onClick={() => handleSummaryCardClick("inStock")}
                    hint="Show in-stock items"
                />
                <SummaryCard
                    icon="sell"
                    label="Price drops"
                    value={priceDropCount}
                    text="Items with lower prices"
                    active={quickFilter === "price-drops"}
                    clickable
                    onClick={() => handleSummaryCardClick("priceDrops")}
                    hint="Show price-drop items"
                />
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                {/* Main list */}
                <section className="space-y-5 xl:col-span-8">
                    {/* Filter toolbar */}
                    <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                            <label className="flex items-center gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3 lg:col-span-7">
                                <span className="material-symbols-outlined text-[20px] text-[#66736d]">search</span>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search saved products..."
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                                />
                            </label>

                            <div className="lg:col-span-5">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    aria-label="Sort saved items"
                                    className="w-full rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3.5 text-sm font-bold text-[#121c2a] outline-none transition focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#003527]/10"
                                >
                                    {sortOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {/* FIX 7: Category chips show item counts */}
                            {categories.map((cat) => {
                                const count = categoryCounts[cat] ?? 0;
                                const isActive = activeCategory === cat;
                                if (cat !== "All" && count === 0) return null;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setActiveCategory(cat)}
                                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-black transition ${
                                            isActive
                                                ? "border-[#003527] bg-[#003527] text-white"
                                                : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                        }`}
                                    >
                                        {cat}
                                        {/* FIX 7: count badge */}
                                        <span
                                            className={`rounded-full px-1.5 py-0.5 text-[11px] font-black ${
                                                isActive ? "bg-white/20 text-white" : "bg-[#f0faf6] text-[#003527]"
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}

                            {/* FIX 6: Only show Reset when filters are active */}
                            {filtersActive && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#dbe6e1] bg-white px-4 py-2 text-sm font-black text-[#66736d] transition hover:border-[#003527] hover:text-[#003527]"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {filteredItems.map((item, index) => {
                                const product = createWishlistCardProduct(
                                    item,
                                    timeAgo(item.savedAt)
                                );

                                return (
                                    <ProductCard
                                        key={item.id}
                                        product={product}
                                        saved
                                        index={index}
                                        variant="wishlist"
                                        onAddToCart={() => handleAddToCart(item)}
                                        onToggleWishlist={() => setItemToRemove(item)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyWishlistState
                            hasItems={wishlistItems.length > 0}
                            onReset={resetFilters}
                        />
                    )}
                </section>

                {/* Sidebar */}
                <aside className="space-y-6 xl:col-span-4">
                    {/* Shopping tip — real utility first */}
                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
                            tips_and_updates
                        </span>
                        <h2 className="mb-2 text-xl font-black text-[#121c2a]">Shopping tip</h2>
                        <p className="text-sm leading-7 text-[#405049]">
                            Saved items are not reserved. Add an item to cart and complete checkout
                            before it sells out or the price changes.
                        </p>
                    </section>

                    {/* FIX 8: Alerts panel moved below real utility content, marked Coming soon */}
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <span className="material-symbols-outlined icon-fill text-[34px] text-[#003527]">
                                notifications_active
                            </span>
                            <span className="rounded-full border border-[#dbe6e1] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#8b9791]">
                                Coming soon
                            </span>
                        </div>
                        <h2 className="mb-2 text-xl font-black text-[#121c2a]">Saved item alerts</h2>
                        <p className="text-sm leading-7 text-[#66736d]">
                            We'll notify you when a saved product drops in price, sells out, or comes back in stock.
                        </p>
                        <div className="mt-5 space-y-3 border-t border-[#e5ece8] pt-5">
                            <SidebarCheck label="Price drop alerts" />
                            <SidebarCheck label="Back-in-stock alerts" />
                            <SidebarCheck label="Seller update alerts" />
                        </div>
                    </section>

                    {/* Buyer Protection */}
                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
                            shield_locked
                        </span>
                        <h2 className="mb-2 text-xl font-black">Buyer Protection</h2>
                        <p className="text-sm leading-7 text-white/70">
                            When you checkout, payment stays protected until delivery or
                            collection is confirmed.
                        </p>
                        <Link
                            to="/trust-safety"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                        >
                            Learn more
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                    </section>
                </aside>
            </div>

            {itemToRemove && (
                <RemoveItemModal
                    item={itemToRemove}
                    onCancel={() => setItemToRemove(null)}
                    onConfirm={confirmRemove}
                />
            )}
        </div>
    );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

// FIX 5: Clickable summary cards that act as filter shortcuts
function SummaryCard({
    icon,
    label,
    value,
    text,
    clickable,
    onClick,
    hint,
    active = false,
}) {
    const base =
        "group flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition";

    const stateStyles = active
        ? "border-[#95d3ba] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.07)]"
        : "border-[#dbe6e1] bg-white shadow-[0_6px_20px_rgba(0,53,39,.04)] hover:border-[#95d3ba] hover:bg-[#fbfdfc] hover:shadow-[0_8px_26px_rgba(0,53,39,.08)]";

    const content = (
        <>
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    active ? "bg-white text-[#003527]" : "bg-[#f0faf6] text-[#003527]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill text-[22px]">
                    {icon}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <h2 className="truncate text-sm font-black text-[#121c2a]">
                        {label}
                    </h2>

                    <p className="shrink-0 text-2xl font-black leading-none tracking-[-0.04em] text-[#003527]">
                        {value}
                    </p>
                </div>

                <p className="mt-1 truncate text-xs font-semibold text-[#66736d]">
                    {text}
                </p>

                {clickable && hint && (
                    <p className="mt-2 hidden text-[11px] font-black text-[#003527] sm:block">
                        {hint}
                    </p>
                )}
            </div>
        </>
    );

    if (clickable) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${base} ${stateStyles}`}
                aria-label={hint || label}
                aria-pressed={active}
            >
                {content}
            </button>
        );
    }

    return <article className={`${base} ${stateStyles}`}>{content}</article>;
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyWishlistState({ hasItems, onReset }) {
    return (
        <div className="rounded-[28px] border border-dashed border-[#bfc9c3] bg-white p-10 text-center">
            <span className="material-symbols-outlined mb-3 block text-[46px] text-[#9aada7]">favorite</span>
            <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                {hasItems ? "No saved items match your filters" : "Your wishlist is empty"}
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-[#66736d]">
                {hasItems
                    ? "Try adjusting your category or search to find what you're looking for."
                    : "Save products while shopping so you can compare them and return when you're ready to buy."}
            </p>
            {hasItems ? (
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                    Clear filters
                </button>
            ) : (
                <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                >
                    Browse products
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
            )}
        </div>
    );
}

// ─── Sidebar Check ─────────────────────────────────────────────────────────────

function SidebarCheck({ label }) {
    return (
        <div className="flex items-center gap-3">
            <span className="material-symbols-outlined icon-fill text-[19px] text-[#003527]">check_circle</span>
            <span className="text-sm font-bold text-[#405049]">{label}</span>
        </div>
    );
}

// ─── Remove Modal ─────────────────────────────────────────────────────────────

function RemoveItemModal({ item, onCancel, onConfirm }) {
    // Focus cancel button on mount for keyboard accessibility
    const cancelRef = useRef(null);
    useEffect(() => {
        cancelRef.current?.focus();
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#001a13]/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-dialog-title"
        >
            <button
                type="button"
                aria-label="Cancel removing item"
                className="absolute inset-0"
                onClick={onCancel}
            />
            <section className="relative w-full rounded-t-[30px] bg-white p-6 shadow-[0_-20px_60px_rgba(0,0,0,.2)] sm:max-w-md sm:rounded-[30px]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#9f2d20]">
                    <span className="material-symbols-outlined icon-fill text-[24px]">favorite</span>
                </div>
                <h2 id="remove-dialog-title" className="text-xl font-black text-[#121c2a]">
                    Remove saved item?
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#66736d]">
                    <strong className="font-black text-[#121c2a]">{item.title}</strong> will be removed from your wishlist. You can save it again from the product page.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        ref={cancelRef}
                        type="button"
                        onClick={onCancel}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        Keep saved
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#842318]"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Remove item
                    </button>
                </div>
            </section>
        </div>
    );
}
