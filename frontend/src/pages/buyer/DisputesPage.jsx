import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype dispute cases cover the main states buyers need to scan: open, waiting, and resolved.
const disputes = [
    {
        id: "DSP-10042",
        orderId: "OM-24091",
        seller: "Kasi Kicks",
        product: "Classic white everyday sneakers",
        issue: "Damaged item",
        requestedResolution: "Request refund",
        status: "under-review",
        statusLabel: "Under review",
        openedAt: "23 June 2026",
        updatedAt: "Today, 09:20",
        amount: 899,
        evidenceCount: 3,
        messageCount: 4,
        nextStep: "Support is reviewing the evidence",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
    },
    {
        id: "DSP-10037",
        orderId: "OM-24078",
        seller: "Soweto Leather Co.",
        product: "Brown leather crossbody bag",
        issue: "Not as described",
        requestedResolution: "Return item",
        status: "waiting-seller",
        statusLabel: "Waiting for seller",
        openedAt: "19 June 2026",
        updatedAt: "Yesterday, 15:10",
        amount: 1248,
        evidenceCount: 2,
        messageCount: 6,
        nextStep: "Seller has been asked to respond",
        image:
            "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=220&q=80",
    },
    {
        id: "DSP-10021",
        orderId: "OM-24052",
        seller: "Local Carry",
        product: "Canvas weekender bag",
        issue: "Item not received",
        requestedResolution: "Seller to resolve",
        status: "resolved",
        statusLabel: "Resolved",
        openedAt: "09 June 2026",
        updatedAt: "12 June 2026",
        amount: 499,
        evidenceCount: 1,
        messageCount: 8,
        nextStep: "Resolution completed",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
    },
];

// Status tabs use values that map directly to dispute.status or the derived "open" group.
const statusTabs = [
    { label: "All disputes", value: "all" },
    { label: "Open", value: "open" },
    { label: "Under review", value: "under-review" },
    { label: "Waiting seller", value: "waiting-seller" },
    { label: "Resolved", value: "resolved" },
];

// Sort options are intentionally small because disputes are usually triaged by recency or value.
const sortOptions = [
    { label: "Recently updated", value: "recent" },
    { label: "Newest opened", value: "newest" },
    { label: "Highest amount", value: "highest" },
    { label: "Lowest amount", value: "lowest" },
];

// Sequential steps that describe the dispute resolution process.
const helpSteps = [
    "Support reviews the order, seller package, messages, and evidence.",
    "The seller may be asked to respond or provide more information.",
    "A resolution can lead to a refund, return, replacement, or case closure.",
];

export default function DisputesPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recent");
    const [sortDirection, setSortDirection] = useState("desc");

    // Derive whether any filter is active so Reset only appears when it has work to do.
    const isFiltered =
        activeTab !== "all" ||
        searchQuery.trim() !== "" ||
        sortBy !== "recent" ||
        sortDirection !== "desc";

    const filteredDisputes = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        // Keep filtering and sorting together so the list, empty state, and result count stay in sync.
        return [...disputes]
            .filter((dispute) => {
                const matchesTab =
                    activeTab === "all" ||
                    dispute.status === activeTab ||
                    (activeTab === "open" &&
                        ["under-review", "waiting-seller"].includes(dispute.status));

                const matchesSearch =
                    !query ||
                    dispute.id.toLowerCase().includes(query) ||
                    dispute.orderId.toLowerCase().includes(query) ||
                    dispute.seller.toLowerCase().includes(query) ||
                    dispute.product.toLowerCase().includes(query) ||
                    dispute.issue.toLowerCase().includes(query);

                return matchesTab && matchesSearch;
            })
            .sort((a, b) => {
                let comparison = b.id.localeCompare(a.id);

                if (sortBy === "highest") comparison = b.amount - a.amount;
                if (sortBy === "lowest") comparison = a.amount - b.amount;
                if (sortBy === "newest") comparison = b.id.localeCompare(a.id);

                return sortDirection === "asc" ? -comparison : comparison;
            });
    }, [activeTab, searchQuery, sortBy, sortDirection]);

    const openCount = disputes.filter((d) =>
        ["under-review", "waiting-seller"].includes(d.status)
    ).length;

    const resolvedCount = disputes.filter((d) => d.status === "resolved").length;

    const totalProtectedAmount = disputes.reduce((total, d) => total + d.amount, 0);

    function resetFilters() {
        setActiveTab("all");
        setSearchQuery("");
        setSortBy("recent");
        setSortDirection("desc");
    }

    // Summary cards act as filter shortcuts while also clearing search/sort noise.
    function handleStatCardClick(tabValue) {
        setActiveTab(tabValue);
        setSearchQuery("");
        setSortBy("recent");
        setSortDirection("desc");
    }

    function toggleSortDirection() {
        setSortDirection((current) => (current === "desc" ? "asc" : "desc"));
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Disputes"
                title="Track your dispute cases"
                description="View open cases, seller responses, support updates, and resolution progress."
                actions={
                    <>
                        <Link
                            to="/open-dispute"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(159,45,32,.18)] transition hover:bg-[#7e241a]"
                        >
                            Open dispute
                            <span className="material-symbols-outlined text-[18px]">add</span>
                        </Link>

                        <Link
                            to="/my-orders"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            My orders
                        </Link>
                    </>
                }
            />

            {/* Summary cards double as quick filters for the highest-level dispute states. */}
            <section
                aria-label="Dispute summary"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
                <DisputeSummaryCard
                    icon="gavel"
                    label="Open cases"
                    value={openCount}
                    description="Cases under review"
                    tone="danger"
                    isActive={activeTab === "open"}
                    onClick={() =>
                        activeTab === "open" ? handleStatCardClick("all") : handleStatCardClick("open")
                    }
                />

                <DisputeSummaryCard
                    icon="task_alt"
                    label="Resolved"
                    value={resolvedCount}
                    description="Completed cases"
                    isActive={activeTab === "resolved"}
                    onClick={() =>
                        activeTab === "resolved"
                            ? handleStatCardClick("all")
                            : handleStatCardClick("resolved")
                    }
                />
                <DisputeSummaryCard
                    icon="shield_locked"
                    label="Protected value"
                    value={formatRand(totalProtectedAmount)}
                    description="Total value linked to dispute cases"
                    className="col-span-2 sm:col-span-1"
                />
            </section>

            {/* Announce result count changes for screen reader users after filtering or sorting. */}
            <p aria-live="polite" className="sr-only">
                {filteredDisputes.length} dispute{filteredDisputes.length !== 1 ? "s" : ""} shown
            </p>

            <div className="space-y-6">
                <section className="space-y-5">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                            {/* Use inputMode search so mobile keyboards still show search controls. */}
                            <label className="flex items-center gap-3 rounded-full border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3 lg:col-span-7">
                                <span className="material-symbols-outlined text-[20px] text-[#66736d]">
                                    search
                                </span>
                                <input
                                    type="text"
                                    inputMode="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search dispute, order, seller, or issue..."
                                    className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                                />
                                {/* Controlled clear button keeps search reset local to this field. */}
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        aria-label="Clear search"
                                        className="shrink-0 text-[#9aada7] transition hover:text-[#003527]"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                )}
                            </label>

                            {/* Sort stays visible on mobile so buyers can reorder without opening another layer. */}
                            <div className="lg:col-span-3">
                                <div className="flex items-center gap-2">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="flex-1 appearance-none rounded-2xl border border-[#dbe6e1] bg-white py-2.5 pl-4 pr-3 text-sm font-black text-[#121c2a] outline-none transition focus:border-[#003527] focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                        aria-label="Sort disputes"
                                    >
                                        {sortOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        onClick={toggleSortDirection}
                                        aria-label="Toggle sort order"
                                        aria-pressed={sortDirection === "asc"}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#dbe6e1] bg-white text-[#003527] transition hover:bg-[#f0faf6]"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            swap_vert
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Reset only appears when the current list differs from the default view. */}
                            {isFiltered && (
                                <div className="lg:col-span-2">
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="mb-2 mt-5 text-[11px] font-black uppercase tracking-[0.1em] text-[#66736d]">
                            Filter by status
                        </p>

                        {/* Status filters wrap on mobile so every option stays visible. */}
                        <div className="grid grid-cols-3 gap-1.5 lg:flex lg:flex-wrap lg:gap-2">
                            {statusTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => setActiveTab(tab.value)}
                                    aria-pressed={activeTab === tab.value}
                                    className={`rounded-full px-3 py-2 text-center text-sm font-black transition whitespace-nowrap ${
                                        activeTab === tab.value
                                            ? "bg-[#003527] text-white"
                                            : "border border-[#cbd7d1] bg-white text-[#003527] hover:bg-[#f0faf6]"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {filteredDisputes.length > 0 ? (
                        <div className="space-y-5">
                            {filteredDisputes.map((dispute) => (
                                <DisputeCard key={dispute.id} dispute={dispute} />
                            ))}
                        </div>
                    ) : (
                        <EmptyDisputesState onReset={resetFilters} />
                    )}
                </section>

                <DisputeSupportPanel />
            </div>

            {/* FIX #5: Mobile bottom bar only renders when content is long enough to push the
                header CTA off screen (more than 1 dispute visible). Avoids duplication on short lists. */}
            {filteredDisputes.length > 1 && <MobileDisputesActions />}

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

        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}

// Support panel explains the review process without competing with the active case list.
function DisputeSupportPanel() {
    return (
        <section
            aria-label="Dispute help"
            className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]"
        >
            <article className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#9f2d20]">
                            support_agent
                        </span>

                        <h2 className="text-xl font-black text-[#121c2a]">
                            How dispute review works
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#66736d]">
                            Support reviews serious order issues using order details, seller
                            responses, and buyer evidence.
                        </p>
                    </div>

                    <Link
                        to="/trust-safety"
                        className="inline-flex w-fit items-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-4 py-3 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        Buyer Protection
                        <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                <ol className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {helpSteps.map((step, index) => (
                        <HelpStep key={step} step={index + 1} text={step} />
                    ))}
                </ol>
            </article>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <article className="rounded-[28px] bg-[#003527] p-5 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-6">
                    <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#fed65b]">
                        shield_locked
                    </span>

                    <h2 className="text-lg font-black">Protected payment</h2>

                    <p className="mt-2 text-sm leading-7 text-white/70">
                        Eligible disputes can use protected payment and order evidence to help
                        decide the next step.
                    </p>
                </article>

                <article className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-5 md:p-6">
                    <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#003527]">
                        tips_and_updates
                    </span>

                    <h2 className="text-lg font-black text-[#121c2a]">
                        Need to report an issue?
                    </h2>

                    <Link
                        to="/open-dispute"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#7e241a]"
                    >
                        Open dispute
                    </Link>
                </article>
            </div>
        </section>
    );
}

// Summary cards are reusable because two cards are clickable filters and one is informational.
function DisputeSummaryCard({
                                icon,
                                label,
                                value,
                                description,
                                tone = "default",
                                onClick,
                                isActive,
                                className = "",
                            }) {
    const isClickable = typeof onClick === "function";
    const Tag = isClickable ? "button" : "article";

    return (
        <Tag
            type={isClickable ? "button" : undefined}
            onClick={isClickable ? onClick : undefined}
            className={`flex min-w-0 items-center gap-4 rounded-[22px] border p-4 text-left transition ${className} ${
                isClickable
                    ? "cursor-pointer hover:border-[#95d3ba] hover:shadow-[0_8px_26px_rgba(0,53,39,.08)]"
                    : ""
            } ${
                isActive
                    ? "border-[#003527] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.07)]"
                    : "border-[#dbe6e1] bg-white shadow-[0_6px_20px_rgba(0,53,39,.04)]"
            }`}
            aria-pressed={isClickable ? isActive : undefined}
        >
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    tone === "danger"
                        ? "bg-[#fff8f6] text-[#9f2d20]"
                        : "bg-[#f0faf6] text-[#003527]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    {icon}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <h2 className="truncate text-sm font-black text-[#121c2a]">
                        {label}
                    </h2>

                    <p className="shrink-0 text-2xl font-black leading-none tracking-[-0.04em] text-[#121c2a]">
                        {value}
                    </p>
                </div>

                <p className="mt-1 truncate text-xs font-semibold text-[#66736d]">
                    {description}
                </p>

                {isClickable && (
                    <p className="mt-2 text-xs font-black text-[#003527]">
                        {isActive ? "Tap to clear" : "Tap to filter"}
                    </p>
                )}
            </div>
        </Tag>
    );
}

// Dispute cards prioritize next action, value, and latest update before secondary order context.
function DisputeCard({ dispute }) {
    return (
        <article className="overflow-hidden rounded-[28px] border border-[#dbe6e1] bg-white shadow-[0_8px_32px_rgba(0,53,39,.05)] transition hover:border-[#efc5bd]">
            <header className="flex flex-col gap-4 border-b border-[#e5ece8] bg-[#fbfdfc] p-5 md:flex-row md:items-start md:justify-between md:p-6">
                <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <StatusBadge status={dispute.status} label={dispute.statusLabel} />

                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                            <span className="material-symbols-outlined icon-fill text-[14px]">
                                shield_locked
                            </span>
                            Buyer Protection
                        </span>
                    </div>

                    <h2 className="text-xl font-black tracking-[-0.035em] text-[#121c2a]">
                        {dispute.id}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-[#66736d]">
                        Order {dispute.orderId} • Opened {dispute.openedAt}
                    </p>
                </div>

                <div className="shrink-0 text-left md:text-right">
                    <p className="text-xl font-black text-[#121c2a]">
                        {formatRand(dispute.amount)}
                    </p>

                    <p className="text-xs font-bold text-[#66736d]">
                        Dispute value
                    </p>
                </div>
            </header>

            <div className="p-5 md:p-6">
                <div className="flex flex-col gap-5 md:flex-row">
                    {/* FIX #8: Descriptive alt text per project convention */}
                    <img
                        src={dispute.image}
                        alt={`Product photo for ${dispute.product}`}
                        className="h-40 w-full rounded-[24px] object-cover md:h-32 md:w-32"
                    />

                    <div className="min-w-0 flex-1">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <DisputeInfo label="Seller" value={dispute.seller} />
                            <DisputeInfo label="Issue" value={dispute.issue} />
                            <DisputeInfo
                                label="Requested resolution"
                                value={dispute.requestedResolution}
                            />
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                    Next step
                                </p>
                                <p className="mt-1 text-sm font-black leading-6 text-[#003527]">
                                    {dispute.nextStep}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center gap-3 rounded-[14px] border border-[#e5ece8] bg-[#f8fbf9] px-3 py-2.5">
                            <p className="flex-1 truncate text-sm font-black text-[#121c2a]">
                                {dispute.product}
                            </p>

                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#66736d]">
                                <span className="material-symbols-outlined text-[14px]">
                                    attach_file
                                </span>
                                {dispute.evidenceCount}
                            </span>

                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#66736d]">
                                <span className="material-symbols-outlined text-[14px]">
                                    chat_bubble
                                </span>
                                {dispute.messageCount}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e5ece8] pt-4">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66736d]">
                        <span className="material-symbols-outlined text-[14px]">
                            schedule
                        </span>
                        {dispute.updatedAt}
                    </p>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/order-details"
                            className="inline-flex items-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            View order
                        </Link>

                        <Link
                            to="/dispute-details"
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white shadow-[0_6px_18px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                        >
                            View dispute
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

// Status badges normalize dispute state colors across summary cards and case cards.
function StatusBadge({ status, label }) {
    const styles = {
        "under-review": "bg-[#fff8e5] text-[#8a5a00]",
        "waiting-seller": "bg-[#eaf4ff] text-[#1d5b8f]",
        resolved: "bg-[#f0faf6] text-[#087052]",
        rejected: "bg-[#fff0ec] text-[#9f2d20]",
    };

    return (
        <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${
                styles[status] ?? "bg-[#f8fbf9] text-[#66736d]"
            }`}
        >
            <span className="material-symbols-outlined icon-fill text-[14px]">
                radio_button_checked
            </span>
            {label}
        </span>
    );
}

// Meta rows keep the dispute details scannable without making every field look like a CTA.
function DisputeInfo({ label, value }) {
    return (
        <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
            <p className="mt-1 text-sm font-black leading-6 text-[#121c2a]">{value}</p>
        </div>
    );
}

// Number badges make the support review process read as an ordered sequence.
function HelpStep({ step, text }) {
    return (
        <li className="flex items-start gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#003527] text-[10px] font-black text-white mt-0.5">
                {step}
            </span>
            <span className="text-sm font-bold leading-6 text-[#405049]">{text}</span>
        </li>
    );
}

// Empty state keeps filter recovery close to the no-results message.
function EmptyDisputesState({ onReset }) {
    return (
        <section className="rounded-[28px] border border-dashed border-[#bfc9c3] bg-white p-10 text-center">
            <span className="material-symbols-outlined mb-3 block text-[48px] text-[#9aada7]">
                find_in_page
            </span>

            <h2 className="mb-2 text-2xl font-black tracking-[-0.035em] text-[#121c2a]">
                No disputes match your filters
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-[#66736d]">
                Try changing your search, status tab, or sort option.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Reset filters
            </button>
        </section>
    );
}

// Mobile actions keep dispute creation reachable after the header CTA scrolls away.
function MobileDisputesActions() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/open-dispute"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(159,45,32,.18)] transition hover:bg-[#7e241a]"
                >
                    Open dispute
                    <span className="material-symbols-outlined text-[18px]">add</span>
                </Link>

                <Link
                    to="/my-orders"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Orders
                </Link>
            </div>
        </div>
    );
}

// Keep Rand values together so the currency symbol does not wrap away from the amount.
function formatRand(amount) {
    return `R\u00A0${amount.toLocaleString("en-ZA")}`;
}
