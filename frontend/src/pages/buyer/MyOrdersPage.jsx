import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype order data mirrors the shape this page can later receive from an orders API.
const orders = [
    {
        id: "OM-24091",
        placedAt: "22 June 2026",
        status: "processing",
        statusLabel: "Sellers preparing",
        paymentStatus: "Protected",
        total: 2601,
        items: 4,
        sellers: 3,
        deliveryMethod: "Courier delivery",
        estimatedArrival: "26–28 June 2026",
        nextAction: "Track order",
        nextActionTo: "/order-tracking",
        packages: [
            {
                seller: "Kasi Kicks",
                items: 1,
                status: "Preparing item",
                progress: 35,
                image:
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=180&q=80",
            },
            {
                seller: "Urban Thread",
                items: 2,
                status: "Seller confirmed",
                progress: 45,
                image:
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=180&q=80",
            },
            {
                seller: "Local Carry",
                items: 1,
                status: "Preparing item",
                progress: 30,
                image:
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=180&q=80",
            },
        ],
    },
    {
        id: "OM-24078",
        placedAt: "18 June 2026",
        status: "out-for-delivery",
        statusLabel: "Out for delivery",
        paymentStatus: "Protected",
        total: 1248,
        items: 2,
        sellers: 1,
        deliveryMethod: "Courier delivery",
        estimatedArrival: "Today",
        nextAction: "Track delivery",
        nextActionTo: "/order-tracking",
        packages: [
            {
                seller: "Soweto Leather Co.",
                items: 2,
                status: "Out for delivery",
                progress: 78,
                image:
                    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=180&q=80",
            },
        ],
    },
    {
        id: "OM-24063",
        placedAt: "12 June 2026",
        status: "delivered",
        statusLabel: "Delivered",
        paymentStatus: "Released after confirmation",
        total: 749,
        items: 1,
        sellers: 1,
        deliveryMethod: "Click & Collect",
        estimatedArrival: "Completed",
        nextAction: "Review order",
        nextActionTo: "/review-product",
        packages: [
            {
                seller: "Retro Rail",
                items: 1,
                status: "Delivered and confirmed",
                progress: 100,
                image:
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=180&q=80",
            },
        ],
    },
    {
        id: "OM-24052",
        placedAt: "08 June 2026",
        status: "attention",
        statusLabel: "Needs attention",
        paymentStatus: "Protected",
        total: 980,
        items: 2,
        sellers: 2,
        deliveryMethod: "Courier delivery",
        estimatedArrival: "Delayed",
        nextAction: "Open dispute",
        nextActionTo: "/open-dispute",
        packages: [
            {
                seller: "Local Carry",
                items: 1,
                status: "Delivery delayed",
                progress: 55,
                image:
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=180&q=80",
            },
            {
                seller: "Urban Thread",
                items: 1,
                status: "Seller confirmed",
                progress: 45,
                image:
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=180&q=80",
            },
        ],
    },
];

// Tab values double as filter keys; "active" intentionally groups in-progress statuses.
const statusTabs = [
    { label: "All orders", value: "all" },
    { label: "Active", value: "active" },
    { label: "Delivered", value: "delivered" },
    { label: "Needs attention", value: "attention" },
];

// Shared sort values keep the desktop select and mobile dropdown in sync.
const sortOptions = [
    { label: "Newest first", value: "newest" },
    { label: "Oldest first", value: "oldest" },
    { label: "Highest total", value: "highest" },
    { label: "Lowest total", value: "lowest" },
];

export default function MyOrdersPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [showMobileSort, setShowMobileSort] = useState(false);
    // Store expanded package rows by order id so each order card opens independently.
    const [expandedPackages, setExpandedPackages] = useState({});

    // Keep tab filtering, search, and sorting in one memoized list for predictable toolbar behavior.
    const filteredOrders = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return [...orders]
            .filter((order) => {
                const matchesTab =
                    activeTab === "all" ||
                    (activeTab === "active" &&
                        ["processing", "out-for-delivery"].includes(order.status)) ||
                    order.status === activeTab;

                const matchesSearch =
                    !query ||
                    order.id.toLowerCase().includes(query) ||
                    order.statusLabel.toLowerCase().includes(query) ||
                    order.deliveryMethod.toLowerCase().includes(query) ||
                    order.packages.some((item) =>
                        item.seller.toLowerCase().includes(query)
                    );

                return matchesTab && matchesSearch;
            })
            .sort((a, b) => {
                if (sortBy === "highest") return b.total - a.total;
                if (sortBy === "lowest") return a.total - b.total;
                if (sortBy === "oldest") return a.id.localeCompare(b.id);
                return b.id.localeCompare(a.id);
            });
    }, [activeTab, searchQuery, sortBy]);

    const activeOrders = orders.filter((order) =>
        ["processing", "out-for-delivery"].includes(order.status)
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "delivered"
    ).length;

    const attentionOrders = orders.filter(
        (order) => order.status === "attention"
    ).length;

    function resetFilters() {
        // Close the mobile sort menu too, otherwise the reset can leave stale UI open.
        setActiveTab("all");
        setSearchQuery("");
        setSortBy("newest");
        setShowMobileSort(false);
    }

    function togglePackages(orderId) {
        // Toggle only the selected order's package disclosure.
        setExpandedPackages((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    }

    return (
        <div className="space-y-5 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:space-y-8 md:pb-12">
            <BuyerPageHeader
                eyebrow="My orders"
                title="Track your purchases"
                description="View active orders, seller packages, protected payments, delivery progress, and completed purchases."
                actions={
                    <Link
                        to="/shop"
                        className="hidden shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b] md:inline-flex"
                    >
                        Continue shopping
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                        </span>
                    </Link>
                }
            />

            {/* Keep summary stats compact so buyers see order context before scrolling. */}
            <section className="grid grid-cols-3 gap-3 md:gap-4">
                <OrderSummaryCard
                    icon="local_shipping"
                    label="Active"
                    mobileLabel="Active"
                    desktopLabel="Active orders"
                    value={activeOrders}
                    description="Currently being prepared or delivered"
                />
                <OrderSummaryCard
                    icon="task_alt"
                    label="Delivered"
                    mobileLabel="Delivered"
                    desktopLabel="Delivered"
                    value={deliveredOrders}
                    description="Orders completed successfully"
                />
                <OrderSummaryCard
                    icon="warning"
                    label="Attention"
                    mobileLabel="Attention"
                    desktopLabel="Needs attention"
                    value={attentionOrders}
                    description="Orders with delays or support actions"
                    warning
                />
            </section>

            {/* Mobile trust strip replaces the larger desktop sidebar message. */}
            <div className="flex items-center gap-2 rounded-xl bg-[#f0faf6] px-3 py-2 xl:hidden">
                <span className="material-symbols-outlined icon-fill text-[16px] text-[#003527]">
          shield_locked
        </span>
                <p className="min-w-0 flex-1 text-xs font-bold text-[#003527]">
                    Payment protected until delivery confirmed
                </p>
                <Link
                    to="/trust-safety"
                    className="shrink-0 text-xs font-black text-[#003527] underline"
                >
                    Learn&nbsp;more
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-5 xl:col-span-8">
                    {/* Filter bar shares one state model across search, status tabs, and sorting. */}
                    <section className="rounded-2xl border border-[#dbe6e1] bg-white p-3 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:rounded-[28px] md:p-6">
                        {/* Search and sort stay in one row on mobile to preserve vertical space. */}
                        <div className="flex items-center gap-3">
                            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#dbe6e1] bg-[#f8fbf9] px-3 py-2.5 md:gap-3 md:rounded-2xl md:px-4 md:py-3">
                <span className="material-symbols-outlined text-[20px] text-[#66736d]">
                  search
                </span>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Search by order number, seller, or status..."
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                                />
                            </label>

                            {/* Desktop can show the sort select inline because there is enough width. */}
                            <div className="hidden md:block">
                                <select
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value)}
                                    className="buyer-input"
                                    aria-label="Sort orders"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Mobile exposes sorting as a collapsible control with ARIA state. */}
                            <button
                                type="button"
                                onClick={() => setShowMobileSort((current) => !current)}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dbe6e1] bg-[#f8fbf9] text-[#003527] transition hover:bg-[#f0faf6] md:hidden"
                                aria-label="Sort orders"
                                aria-expanded={showMobileSort}
                                aria-controls="mobile-orders-sort"
                            >
                <span className="material-symbols-outlined text-[22px]">
                  sort
                </span>
                            </button>

                            {/* Desktop reset is always visible; mobile reset appears in the empty state. */}
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="hidden items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6] md:inline-flex"
                            >
                                Reset filters
                            </button>
                        </div>

                        {/* This wrapper id is paired with the mobile sort button aria-controls. */}
                        {showMobileSort && (
                            <div id="mobile-orders-sort" className="mt-3 md:hidden">
                                <select
                                    value={sortBy}
                                    onChange={(event) => {
                                        setSortBy(event.target.value);
                                        setShowMobileSort(false);
                                    }}
                                    className="buyer-input"
                                    aria-label="Sort orders"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Status tabs use horizontal scroll on small screens to avoid cramped labels. */}
                        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 md:mt-4 md:gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {statusTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`inline-flex shrink-0 items-center justify-center rounded-full border px-3 py-1.5 text-xs font-black transition md:px-4 md:py-2 md:text-sm ${
                                        activeTab === tab.value
                                            ? "border-[#003527] bg-[#003527] text-white"
                                            : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {filteredOrders.length > 0 ? (
                        <div className="space-y-5">
                            {filteredOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    isExpanded={!!expandedPackages[order.id]}
                                    onTogglePackages={() => togglePackages(order.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyOrdersState hasOrders={orders.length > 0} onReset={resetFilters} />
                    )}
                </section>

                {/* Desktop sidebar keeps protection and support guidance close to the order list. */}
                <aside className="hidden space-y-6 xl:col-span-4 xl:block">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
              shield_locked
            </span>

                        <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                            Protected orders
                        </h2>

                        <p className="text-sm leading-7 text-[#66736d]">
                            Payment stays protected until delivery or collection is confirmed.
                            Check your order before confirming receipt.
                        </p>

                        <div className="mt-5 space-y-3">
                            <ProtectionPoint text="Track each seller package clearly." />
                            <ProtectionPoint text="Confirm receipt only after checking the item." />
                            <ProtectionPoint text="Open a dispute if there is a serious issue." />
                        </div>

                        <Link
                            to="/trust-safety"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            Learn about Buyer Protection
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              password
            </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Delivery confirmation code
                        </h2>

                        <p className="text-sm leading-7 text-[#405049]">
                            When an order is ready to hand over, use the delivery confirmation
                            code only after checking the item.
                        </p>

                        <Link
                            to="/delivery-confirmation"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            Learn how confirmation works
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              support_agent
            </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Need help with an order?
                        </h2>

                        <p className="text-sm leading-7 text-[#66736d]">
                            If an order is late, damaged, or different from the listing, you
                            can contact support or open a dispute.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/disputes"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                View disputes
                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Contact support
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>

            <style>{`
        .buyer-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: #f8fbf9;
          padding: 14px 16px;
          color: #121c2a;
          font-size: 14px;
          font-weight: 700;
          outline: none;
          transition: border-color .18s, background .18s, box-shadow .18s;
        }

        .buyer-input:focus {
          border-color: #003527;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 53, 39, .10);
        }
      `}</style>
        </div>
    );
}

// Summary cards use short mobile labels while keeping fuller copy available on desktop.
function OrderSummaryCard({ icon, mobileLabel, desktopLabel, label, value, description, warning = false }) {
    const displayLabel = desktopLabel || label;
    const shortLabel = mobileLabel || label;

    return (
        <article className="rounded-2xl border border-[#dbe6e1] bg-white p-3 shadow-[0_6px_24px_rgba(0,53,39,.04)] md:rounded-[24px] md:p-5">
            <div
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl md:mb-4 md:h-11 md:w-11 md:rounded-2xl ${
                    warning ? "bg-[#fff8e5] text-[#8a5a00]" : "bg-[#f0faf6] text-[#003527]"
                }`}
            >
        <span className="material-symbols-outlined icon-fill text-[18px] md:text-[22px]">
          {icon}
        </span>
            </div>

            <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a] md:text-3xl">
                {value}
            </p>

            <h2 className="mt-0.5 text-xs font-black text-[#121c2a] md:mt-1 md:text-sm">
                <span className="md:hidden">{shortLabel}</span>
                <span className="hidden md:inline">{displayLabel}</span>
            </h2>

            <p className="mt-1 hidden text-xs leading-5 text-[#66736d] md:block">{description}</p>
        </article>
    );
}


// Order cards keep mobile scanning short by revealing extra seller packages on demand.
function OrderCard({ order, isExpanded, onTogglePackages }) {
    const hasMultiplePackages = order.packages.length > 1;
    const visiblePackages = isExpanded ? order.packages : order.packages.slice(0, 1);
    const hiddenCount = order.packages.length - 1;

    return (
        <article className="overflow-hidden rounded-[28px] border border-[#dbe6e1] bg-white shadow-[0_8px_32px_rgba(0,53,39,.05)] transition-all duration-200 hover:border-[#95d3ba] hover:shadow-[0_12px_40px_rgba(0,53,39,.08)]">
            <header className="flex flex-col gap-4 border-b border-[#e5ece8] bg-[#fbfdfc] p-5 md:flex-row md:items-start md:justify-between md:p-6">
                <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <StatusBadge status={order.status} label={order.statusLabel} />

                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
              <span className="material-symbols-outlined icon-fill text-[14px]">
                shield_locked
              </span>
                            {order.paymentStatus}
            </span>
                    </div>

                    <h2 className="text-xl font-black tracking-[-0.035em] text-[#121c2a]">
                        Order {order.id}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-[#66736d]">
                        Placed {order.placedAt} • {order.items} item
                        {order.items === 1 ? "" : "s"} • {order.sellers} seller
                        {order.sellers === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="text-left md:text-right">
                    <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                        {formatRand(order.total)}
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#66736d]">
                        {order.deliveryMethod}
                    </p>
                </div>
            </header>

            <div className="p-5 md:p-6">
                {/* Mobile compresses the order facts into one wrapping row; desktop uses full pills. */}
                <div className="mb-5 flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
                    {/* The row wraps so longer payment labels do not overflow on narrow phones. */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-[#e5ece8] bg-[#f8fbf9] px-4 py-3 md:hidden">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined icon-fill text-[16px] text-[#003527]">
                event
              </span>
                            <span className="text-sm font-black text-[#121c2a]">
                {order.estimatedArrival}
              </span>
                        </div>
                        <span className="text-[#bfc9c3]">•</span>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined icon-fill text-[16px] text-[#003527]">
                storefront
              </span>
                            <span className="text-sm font-black text-[#121c2a]">
                {order.packages.length} pkg{order.packages.length === 1 ? "" : "s"}
              </span>
                        </div>
                        <span className="text-[#bfc9c3]">•</span>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined icon-fill text-[14px] text-[#003527]">
                shield_locked
              </span>
                            <span className="text-xs font-bold text-[#003527]">
                {order.paymentStatus}
              </span>
                        </div>
                    </div>

                    {/* Desktop has enough room to keep each fact labelled and separated. */}
                    <div className="hidden md:contents">
                        <OrderInfoPill
                            icon="event"
                            label="Estimated arrival"
                            value={order.estimatedArrival}
                        />
                        <OrderInfoPill
                            icon="storefront"
                            label="Seller packages"
                            value={`${order.packages.length}`}
                        />
                        <OrderInfoPill
                            icon="payments"
                            label="Payment status"
                            value={order.paymentStatus}
                        />
                    </div>
                </div>

                {/* The id gives the expand/collapse buttons a stable aria-controls target. */}
                <div id={`order-${order.id}-packages`} className="space-y-3">
                    {visiblePackages.map((item) => (
                        <OrderPackageRow key={`${order.id}-${item.seller}`} item={item} />
                    ))}
                </div>

                {/* Multi-seller mobile orders start collapsed to keep the card height manageable. */}
                {hasMultiplePackages && (
                    <div className="md:hidden">
                        {!isExpanded ? (
                            <button
                                type="button"
                                onClick={onTogglePackages}
                                aria-expanded={isExpanded}
                                aria-controls={`order-${order.id}-packages`}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c8ddd5] bg-[#f8fbf9] px-4 py-3 text-sm font-bold text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                  expand_more
                </span>
                                + {hiddenCount} more package{hiddenCount === 1 ? "" : "s"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={onTogglePackages}
                                aria-expanded={isExpanded}
                                aria-controls={`order-${order.id}-packages`}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c8ddd5] bg-[#f8fbf9] px-4 py-3 text-sm font-bold text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                  expand_less
                </span>
                                Show less
                            </button>
                        )}
                    </div>
                )}

                {/* Desktop renders the remaining packages immediately because there is more space. */}
                {hasMultiplePackages && !isExpanded && (
                    <div className="hidden space-y-3 md:block">
                        {order.packages.slice(1).map((item) => (
                            <OrderPackageRow key={`${order.id}-${item.seller}-desktop`} item={item} />
                        ))}
                    </div>
                )}

                {/* Actions stack on phones for tap comfort, then align right on wider screens. */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Link
                        to="/order-details"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6] sm:py-3.5"
                    >
                        View details
                    </Link>

                    <Link
                        to={order.nextActionTo}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-4 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b] sm:py-3.5"
                    >
                        {order.nextAction}
                        <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}

// Centralize status badge colors so new order states can be added in one place.
function StatusBadge({ status, label }) {
    const config = {
        processing: { bg: "bg-[#fff8e5] text-[#8a5a00]", icon: "schedule" },
        "out-for-delivery": { bg: "bg-[#eaf4ff] text-[#1d5b8f]", icon: "local_shipping" },
        delivered: { bg: "bg-[#f0faf6] text-[#087052]", icon: "task_alt" },
        attention: { bg: "bg-[#fff0ec] text-[#9f2d20]", icon: "warning" },
    };

    const { bg, icon } = config[status] ?? { bg: "bg-[#f8fbf9] text-[#66736d]", icon: "info" };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${bg}`}
        >
      <span className="material-symbols-outlined icon-fill text-[14px]">
        {icon}
      </span>
      {label}
    </span>
    );
}

// Desktop-only fact pills give each order detail a clear label/value pairing.
function OrderInfoPill({ icon, label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[18px]">
          {icon}
        </span>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                    {label}
                </p>
            </div>

            <p className="text-sm font-black text-[#121c2a]">{value}</p>
        </div>
    );
}

// Package rows represent seller-level fulfilment progress inside one order.
function OrderPackageRow({ item }) {
    return (
        <div className="rounded-[22px] border border-[#e5ece8] p-4">
            <div className="flex gap-4">
                <img
                    src={item.image}
                    alt={`${item.seller} package`}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="font-black text-[#121c2a]">{item.seller}</p>

                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {item.items} item{item.items === 1 ? "" : "s"} • {item.status}
                            </p>
                        </div>

                        <span className="rounded-full bg-[#f8fbf9] px-3 py-1.5 text-xs font-black text-[#003527]">
              {item.progress}%
            </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5ece8]">
                        <div
                            className="h-full rounded-full bg-[#003527] transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reuse one empty state for both "no orders yet" and "filters returned no matches".
function EmptyOrdersState({ hasOrders, onReset }) {
    return (
        <section className="rounded-[28px] border border-dashed border-[#bfc9c3] bg-white p-10 text-center">
      <span className="material-symbols-outlined mb-3 block text-[48px] text-[#9aada7]">
        receipt_long
      </span>

            <h2 className="mb-2 text-2xl font-black tracking-[-0.035em] text-[#121c2a]">
                {hasOrders ? "No orders match your filters" : "No orders yet"}
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-[#66736d]">
                {hasOrders
                    ? "Try changing your search, status tab, or sort option."
                    : "When you place your first order, it will appear here."}
            </p>

            {hasOrders ? (
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                >
                    Reset filters
                </button>
            ) : (
                <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                >
                    Browse products
                    <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
                </Link>
            )}
        </section>
    );
}

// Small checklist row used by the desktop Buyer Protection sidebar.
function ProtectionPoint({ text }) {
    return (
        <div className="flex items-start gap-3">
      <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
        check_circle
      </span>
            <span className="text-sm font-bold leading-6 text-[#405049]">
        {text}
      </span>
        </div>
    );
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
