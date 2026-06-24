import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype order context used by the confirmation flow and summary sidebar.
const order = {
    id: "OM-24091",
    placedAt: "22 June 2026, 14:32",
    paymentStatus: "Protected",
    deliveryAddress: "Home, Orlando West, Johannesburg",
};

// Packages stay separate because delivery confirmation happens per seller package.
const packages = [
    {
        id: "pkg-kasi-kicks",
        seller: "Kasi Kicks",
        status: "Ready for handover",
        statusType: "ready",
        items: 1,
        code: "482913",
        method: "Courier or Click & Collect",
        handoverLocation: "Soweto, Johannesburg",
        estimatedHandover: "Today, 14:00–17:00",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
        itemsList: [
            {
                title: "Classic white everyday sneakers",
                size: "UK 8",
                color: "White",
                quantity: 1,
            },
        ],
    },
    {
        id: "pkg-urban-thread",
        seller: "Urban Thread",
        status: "Preparing package",
        statusType: "preparing",
        items: 2,
        code: "739204",
        method: "Courier delivery",
        handoverLocation: "Braamfontein, Johannesburg",
        estimatedHandover: "26 June 2026",
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=220&q=80",
        itemsList: [
            {
                title: "Oversized neutral cotton hoodie",
                size: "Large",
                color: "Stone",
                quantity: 2,
            },
        ],
    },
    {
        id: "pkg-local-carry",
        seller: "Local Carry",
        status: "Preparing package",
        statusType: "preparing",
        items: 1,
        code: "615847",
        method: "Courier delivery",
        handoverLocation: "Pretoria, Gauteng",
        estimatedHandover: "27 June 2026",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
        itemsList: [
            {
                title: "Canvas weekender bag",
                size: "Standard",
                color: "Olive",
                quantity: 1,
            },
        ],
    },
];

// Checklist protects buyers from confirming receipt before checking the item.
const checklist = [
    {
        id: "checked-item",
        label: "I checked the item and it matches the listing.",
    },
    {
        id: "checked-condition",
        label: "The item condition is acceptable.",
    },
    {
        id: "understand-release",
        label:
            "I understand that confirming receipt allows the seller payout to continue.",
    },
];

// FIX 7: Fixed toast component — renders in a portal-like fixed position,
// always visible regardless of scroll depth.
function CopiedToast({ visible }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`no-print fixed bottom-[calc(var(--bottom-nav-height,77px)+80px)] left-1/2 z-50 -translate-x-1/2 transition-all duration-300 md:bottom-8 ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            }`}
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-[#b7e4d1] bg-white px-5 py-3.5 shadow-[0_12px_40px_rgba(0,53,39,.18)]">
                <span className="material-symbols-outlined icon-fill text-[20px] text-[#003527]">
                    check_circle
                </span>
                <div>
                    <p className="text-sm font-black text-[#003527]">Code copied</p>
                    <p className="text-xs font-bold text-[#66736d]">
                        Share only after checking the item.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function DeliveryConfirmationPage() {
    // Active package state keeps the confirmation code and checklist scoped to one seller.
    const [activePackageId, setActivePackageId] = useState(packages[0].id);
    const [checkedItems, setCheckedItems] = useState([]);
    const [copiedCode, setCopiedCode] = useState(false);
    // FIX 2: showCode is now a toggle — users can hide the code after revealing it.
    const [showCode, setShowCode] = useState(false);

    const activePackage = packages.find((item) => item.id === activePackageId);

    const readyPackages = packages.filter(
        (item) => item.statusType === "ready"
    ).length;

    const canConfirm =
        activePackage?.statusType === "ready" &&
        checkedItems.length === checklist.length;

    // Decorate checklist rows with checked state for the active package panel.
    const selectedChecklist = useMemo(
        () =>
            checklist.map((item) => ({
                ...item,
                checked: checkedItems.includes(item.id),
            })),
        [checkedItems]
    );

    function toggleChecklistItem(itemId) {
        // Checklist items are independent so buyers can confirm each condition explicitly.
        setCheckedItems((current) =>
            current.includes(itemId)
                ? current.filter((id) => id !== itemId)
                : [...current, itemId]
        );
    }

    function handlePackageChange(packageId) {
        // Switching packages resets sensitive package-specific confirmation state.
        setActivePackageId(packageId);
        setCheckedItems([]);
        setCopiedCode(false);
        setShowCode(false);
    }

    function copyConfirmationCode() {
        if (!activePackage) return;

        navigator.clipboard?.writeText(activePackage.code);
        setCopiedCode(true);

        window.setTimeout(() => {
            setCopiedCode(false);
        }, 2200);
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Delivery confirmation"
                title="Confirm package handover"
                description="Use the confirmation code only after checking the item. This protects both the buyer and seller."
                actions={
                    <>
                        <Link
                            to="/order-tracking"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                arrow_back
                            </span>
                            Tracking
                        </Link>

                        <Link
                            to="/order-details"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Order details
                            <span className="material-symbols-outlined text-[18px]">
                                receipt_long
                            </span>
                        </Link>
                    </>
                }
            />

            <section className="overflow-hidden rounded-[32px] border border-[#dbe6e1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                <div className="bg-[#003527] p-6 text-white md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#fed65b] text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[38px]">
                                    password
                                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                Protected handover
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                Share the code only after checking the item
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                The confirmation code proves the package was handed over. Do not
                                share it before receiving and inspecting the item.
                            </p>
                        </div>

                        <div className="rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Order number
                            </p>

                            <p className="mt-2 text-2xl font-black text-[#fed65b]">
                                {order.id}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-white/65">
                                {readyPackages} of {packages.length} packages ready
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ece8] md:grid-cols-4 md:divide-y-0">
                    <ConfirmationStat
                        icon="inventory_2"
                        label="Packages"
                        value={packages.length}
                    />
                    <ConfirmationStat
                        icon="task_alt"
                        label="Ready"
                        value={readyPackages}
                    />
                    <ConfirmationStat
                        icon="shield_locked"
                        label="Payment"
                        value={order.paymentStatus}
                    />
                    <ConfirmationStat
                        icon="pin_drop"
                        label="Address"
                        value="Home"
                    />
                </div>
            </section>

            {/* FIX 7: Replaced inline mid-page banner with fixed CopiedToast */}
            <CopiedToast visible={copiedCode} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Select package
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Each seller package has its own confirmation code.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">
                                    call_split
                                </span>
                                Multi-seller order
                            </span>
                        </div>

                        {/* FIX 3: Package selector tabs now include inline status dots */}
                        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {packages.map((sellerPackage) => {
                                const isActive = activePackageId === sellerPackage.id;
                                const dotColor =
                                    sellerPackage.statusType === "ready"
                                        ? "bg-[#22c55e]"
                                        : sellerPackage.statusType === "delayed"
                                            ? "bg-[#ef4444]"
                                            : "bg-[#f59e0b]";

                                return (
                                    <button
                                        key={sellerPackage.id}
                                        type="button"
                                        onClick={() => handlePackageChange(sellerPackage.id)}
                                        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
                                            isActive
                                                ? "border-[#003527] bg-[#003527] text-white"
                                                : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                        }`}
                                    >
                                        <span
                                            className={`h-2 w-2 shrink-0 rounded-full ${
                                                isActive ? "bg-[#fed65b]" : dotColor
                                            }`}
                                            aria-hidden="true"
                                        />
                                        {sellerPackage.seller}
                                    </button>
                                );
                            })}
                        </div>

                        {activePackage && (
                            <PackageConfirmationCard
                                sellerPackage={activePackage}
                                showCode={showCode}
                                copiedCode={copiedCode}
                                onToggleCode={() => setShowCode((v) => !v)}
                                onCopyCode={copyConfirmationCode}
                            />
                        )}
                    </section>

                    {/* FIX 5: Checklist header now anchors to the active seller by name */}
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Before confirming{activePackage ? ` ${activePackage.seller}` : ""}
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Complete this checklist before sharing the confirmation code.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {selectedChecklist.map((item) => (
                                <label
                                    key={item.id}
                                    className={`flex cursor-pointer items-start gap-3 rounded-[20px] border p-4 transition ${
                                        item.checked
                                            ? "border-[#b7e4d1] bg-[#f0faf6]"
                                            : "border-[#e5ece8] bg-white hover:border-[#95d3ba]"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => toggleChecklistItem(item.id)}
                                        className="mt-1 h-4 w-4 accent-[#003527]"
                                    />

                                    <span className="text-sm font-bold leading-6 text-[#404944]">
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {activePackage?.statusType !== "ready" && (
                            <div className="mt-5 rounded-[22px] border border-[#fff0bd] bg-[#fff8e5] p-4">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#8a5a00]">
                                        schedule
                                    </span>

                                    <div>
                                        <h3 className="font-black text-[#121c2a]">
                                            This package is not ready yet
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                            The confirmation code should only be used once the package
                                            is ready for delivery or collection.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="rounded-[28px] border border-[#efc5bd] bg-[#fff8f6] p-5 md:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#9f2d20]">
                                <span className="material-symbols-outlined icon-fill text-[24px]">
                                    warning
                                </span>
                            </div>

                            <div>
                                <h2 className="text-lg font-black text-[#121c2a]">
                                    Do not share the code early
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-[#66736d]">
                                    Sharing the code early may mark the package as received before
                                    you have checked it. Only share it when the item is physically
                                    handed over and acceptable.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Confirmation summary
                        </h2>

                        {activePackage && (
                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Order" value={order.id} />
                                <SummaryRow label="Seller" value={activePackage.seller} />
                                <SummaryRow label="Status" value={activePackage.status} />
                                <SummaryRow label="Method" value={activePackage.method} />
                                <SummaryRow
                                    label="Estimated"
                                    value={activePackage.estimatedHandover}
                                />
                            </div>
                        )}

                        {/* FIX 8: Show full delivery address instead of truncated "Home" */}
                        <div className="border-b border-[#e5ece8] py-5">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Delivery address
                            </p>

                            <p className="text-sm font-black text-[#121c2a]">
                                {order.deliveryAddress}
                            </p>
                        </div>

                        <Link
                            to={canConfirm ? "/delivery-confirmation-success" : "#"}
                            aria-disabled={!canConfirm}
                            onClick={(event) => {
                                if (!canConfirm) event.preventDefault();
                            }}
                            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black shadow-[0_8px_24px_rgba(0,53,39,.22)] transition ${
                                canConfirm
                                    ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                    : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                            }`}
                        >
                            Confirm received
                            <span className="material-symbols-outlined text-[18px]">
                                verified
                            </span>
                        </Link>

                        {/* FIX 1: Removed prototype disclaimer. Replaced with genuine trust copy. */}
                        <p className="mt-4 text-center text-xs leading-5 text-[#66736d]">
                            Your payment stays protected until you confirm receipt.
                        </p>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
                            shield_locked
                        </span>

                        <h2 className="mb-2 text-xl font-black">
                            Buyer Protection active
                        </h2>

                        <p className="text-sm leading-7 text-white/70">
                            Protected payment is only released after delivery or collection is
                            confirmed. Check the item before confirming.
                        </p>

                        <Link
                            to="/trust-safety"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                        >
                            Learn more
                            <span className="material-symbols-outlined text-[16px]">
                                arrow_forward
                            </span>
                        </Link>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
                            support_agent
                        </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Something wrong?
                        </h2>

                        <p className="text-sm leading-7 text-[#405049]">
                            Do not confirm receipt if the item is missing, damaged, or
                            different from the listing.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/open-dispute"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                Open dispute
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

            <MobileConfirmationActions canConfirm={canConfirm} />

            <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}

// Package cards expose the confirmation code only after the buyer chooses to reveal it.
function PackageConfirmationCard({
                                     sellerPackage,
                                     showCode,
                                     copiedCode,
                                     onToggleCode,
                                     onCopyCode,
                                 }) {
    const isReady = sellerPackage.statusType === "ready";

    return (
        <article className="overflow-hidden rounded-[26px] border border-[#dbe6e1]">
            {/* FIX 4: Image replaced with compact thumbnail alongside seller info.
                No more 208px tall full-width image that buries content on mobile. */}
            <div className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                        <img
                            src={sellerPackage.image}
                            alt={`${sellerPackage.seller} package`}
                            className="h-14 w-14 shrink-0 rounded-[14px] object-cover"
                        />

                        <div>
                            <StatusBadge
                                statusType={sellerPackage.statusType}
                                label={sellerPackage.status}
                            />

                            <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#121c2a]">
                                {sellerPackage.seller}
                            </h3>

                            <p className="mt-0.5 text-sm font-bold text-[#66736d]">
                                {sellerPackage.items} item
                                {sellerPackage.items === 1 ? "" : "s"} · {sellerPackage.method}
                            </p>
                        </div>
                    </div>

                    <Link
                        to={`/stores/${sellerPackage.seller
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            storefront
                        </span>
                        View store
                    </Link>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoPill
                        icon="event"
                        label="Estimated handover"
                        value={sellerPackage.estimatedHandover}
                    />
                    <InfoPill
                        icon="pin_drop"
                        label="Location"
                        value={sellerPackage.handoverLocation}
                    />
                </div>

                <div className="rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-5">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                        Confirmation code
                    </p>

                    {isReady ? (
                        <>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="font-mono text-3xl font-black tracking-[0.22em] text-[#121c2a]">
                                    {showCode ? sellerPackage.code : "••••••"}
                                </p>

                                {/* FIX 2: Show / Hide / Copy are now always-present controls.
                                    Users can re-hide the code after revealing it. */}
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={onToggleCode}
                                        className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-[#cbd7d1] bg-white px-4 py-2.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">
                                            {showCode ? "visibility_off" : "visibility"}
                                        </span>
                                        {showCode ? "Hide" : "Show"}
                                    </button>

                                    {showCode && (
                                        <button
                                            type="button"
                                            onClick={onCopyCode}
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                                        >
                                            {copiedCode ? "Copied" : "Copy"}
                                            <span className="material-symbols-outlined text-[16px]">
                                                {copiedCode ? "check" : "content_copy"}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <p className="mt-3 text-xs font-bold leading-5 text-[#66736d]">
                                Show or copy this code only when the package is physically
                                handed over and checked.
                            </p>
                        </>
                    ) : (
                        <p className="text-sm font-bold leading-6 text-[#66736d]">
                            This code will become available once the package is ready for
                            delivery or collection.
                        </p>
                    )}
                </div>

                <div className="mt-5 divide-y divide-[#e5ece8] rounded-[22px] border border-[#e5ece8]">
                    {sellerPackage.itemsList.map((item) => (
                        <div key={item.title} className="p-4">
                            <p className="font-black text-[#121c2a]">{item.title}</p>
                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {item.size} · {item.color} · Qty {item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

// Confirmation stats summarize readiness before the buyer reveals a code.
function ConfirmationStat({ icon, label, value }) {
    return (
        <article className="p-5 md:p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[22px]">
                    {icon}
                </span>
            </div>

            <p className="truncate text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {value}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
        </article>
    );
}

// Info pills keep handover details readable inside package cards.
function InfoPill({ icon, label, value }) {
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

// Status badges distinguish ready packages from packages still being prepared.
function StatusBadge({ statusType, label }) {
    const styles = {
        ready: "bg-[#f0faf6] text-[#087052]",
        preparing: "bg-[#fff8e5] text-[#8a5a00]",
        delayed: "bg-[#fff0ec] text-[#9f2d20]",
    };

    return (
        <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${
                styles[statusType] ?? "bg-[#f8fbf9] text-[#66736d]"
            }`}
        >
            <span className="material-symbols-outlined icon-fill text-[14px]">
                radio_button_checked
            </span>
            {label}
        </span>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// FIX 6: Dispute is now secondary — smaller text link, not a full equal-weight button.
// Confirm takes full width; Dispute is a quiet text link beneath it.
// Mobile action bar keeps the confirm CTA available after long checklist content.
function MobileConfirmationActions({ canConfirm }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto max-w-lg space-y-2">
                <Link
                    to={canConfirm ? "/delivery-confirmation-success" : "#"}
                    aria-disabled={!canConfirm}
                    onClick={(event) => {
                        if (!canConfirm) event.preventDefault();
                    }}
                    className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(0,53,39,.20)] transition ${
                        canConfirm
                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    Confirm received
                    <span className="material-symbols-outlined text-[18px]">
                        verified
                    </span>
                </Link>

                <div className="flex justify-center">
                    <Link
                        to="/open-dispute"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black text-[#9f2d20] transition hover:underline"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            flag
                        </span>
                        Something's wrong — open a dispute
                    </Link>
                </div>
            </div>
        </div>
    );
}
