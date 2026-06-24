import { useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// ─── Data ─────────────────────────────────────────────────────────────────────

// Prototype order receipt mirrors the shape expected from a future order API.
const order = {
    orderNumber: "OM-24091",
    placedAt: "22 June 2026, 14:32",
    paymentMethod: "Card payment",
    deliveryMethod: "Courier delivery",
    total: 2601,
    items: 4,
    sellers: 3,
    buyerProtection: "Active",
    // FIX #3: Phone number context for SMS toggle
    phoneNumber: "+27 82 *** 4821",
};

// Seller packages remain separate so buyers understand multi-seller fulfilment.
const sellerPackages = [
    {
        id: "pkg-1",
        seller: "Kasi Kicks",
        items: 1,
        total: 899,
        delivery: "Courier or Click & Collect",
        // FIX #13: estimated dispatch copy
        estimatedDispatch: "Usually ships within 1–2 business days",
        status: "Seller notified",
        // FIX #2: forward path links
        trackingPath: "/order-tracking/pkg-1",
        storePath: "/stores/kasi-kicks",
        // FIX #4: descriptive alt text
        imageAlt: "White leather sneakers from Kasi Kicks",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
    },
    {
        id: "pkg-2",
        seller: "Urban Thread",
        items: 2,
        total: 1098,
        delivery: "Courier delivery",
        estimatedDispatch: "Usually ships within 2–3 business days",
        status: "Seller notified",
        trackingPath: "/order-tracking/pkg-2",
        storePath: "/stores/urban-thread",
        imageAlt: "Stone-coloured oversized hoodie from Urban Thread",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=220&q=80",
    },
    {
        id: "pkg-3",
        seller: "Local Carry",
        items: 1,
        total: 499,
        delivery: "Courier delivery",
        estimatedDispatch: "Usually ships within 2–4 business days",
        status: "Seller notified",
        trackingPath: "/order-tracking/pkg-3",
        storePath: "/stores/local-carry",
        imageAlt: "Olive canvas weekender bag from Local Carry",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
    },
];

// Next steps explain the post-payment journey from seller prep to confirmation.
const nextSteps = [
    {
        title: "Order created",
        description: "Your order has been created and payment has been received.",
        icon: "receipt_long",
        complete: true,
    },
    {
        title: "Sellers prepare items",
        description: "Each seller will confirm and prepare their package for dispatch.",
        icon: "inventory_2",
        complete: false,
    },
    {
        title: "Delivery or collection",
        description: "You will receive updates when each package is on its way.",
        icon: "local_shipping",
        complete: false,
    },
    {
        title: "Confirm received",
        description: "Payment is released to sellers only after you confirm receipt.",
        icon: "verified",
        complete: false,
    },
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PaymentSuccessPage() {
    const [smsEnabled, setSmsEnabled] = useState(true);
    // FIX #3: toast feedback for SMS toggle
    const [smsToast, setSmsToast] = useState(null);

    function handleSmsToggle() {
        // SMS feedback is local prototype state until notification preferences are connected.
        const next = !smsEnabled;
        setSmsEnabled(next);
        setSmsToast(next ? "SMS updates turned on" : "SMS updates turned off");
        setTimeout(() => setSmsToast(null), 3000);
    }

    return (
        // FIX #10: consistent bottom-nav-height fallback (77px everywhere)
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">

            {/* FIX #1: Print-only receipt header — invisible on screen */}
            <div className="hidden print:block print:mb-8">
                <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                    <div>
                        <p className="text-2xl font-black text-[#003527]">Open Market</p>
                        <p className="text-sm text-gray-500 mt-1">openmarket.co.za</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Order receipt</p>
                        <p className="text-xl font-black text-[#003527]">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.placedAt}</p>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-6 text-sm border-b border-gray-200 pb-6">
                    <div><p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Payment</p><p className="font-bold">{order.paymentMethod}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Delivery</p><p className="font-bold">{order.deliveryMethod}</p></div>
                    <div><p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Buyer Protection</p><p className="font-bold text-[#003527]">{order.buyerProtection}</p></div>
                </div>
                <div className="mt-6 border-b border-gray-200 pb-6">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Seller packages</p>
                    {sellerPackages.map((pkg) => (
                        <div key={pkg.id} className="flex justify-between py-2 text-sm">
                            <div>
                                <p className="font-bold">{pkg.seller}</p>
                                <p className="text-gray-500">{pkg.items} item{pkg.items !== 1 ? "s" : ""} · {pkg.delivery}</p>
                            </div>
                            <p className="font-black">{formatRand(pkg.total)}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between text-base">
                    <p className="font-black">Total paid</p>
                    <p className="font-black text-[#003527]">{formatRand(order.total)}</p>
                </div>
            </div>

            {/* FIX #3: SMS toast */}
            {smsToast && (
                <div
                    role="status"
                    aria-live="polite"
                    className="no-print fixed right-4 top-20 z-50 flex items-center gap-3 rounded-2xl border border-[#b7e4d1] bg-white px-5 py-3.5 shadow-lg"
                >
                    <span className="material-symbols-outlined icon-fill text-[20px] text-[#003527]">check_circle</span>
                    <span className="text-sm font-black text-[#121c2a]">{smsToast}</span>
                </div>
            )}

            {/* FIX #15: header action hidden on mobile — mobile bar handles it */}
            <BuyerPageHeader
                eyebrow="Payment successful"
                title="Your order has been placed"
                description="Payment has been received and your order is now protected until delivery or collection is confirmed."
                actions={
                    <Link
                        to="/shop"
                        className="no-print hidden md:inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        Continue shopping
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                    </Link>
                }
            />

            {/* Hero confirmation card */}
            <section className="overflow-hidden rounded-[32px] border border-[#b7e4d1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                <div className="bg-[#003527] p-6 text-white md:p-8">
                    {/* FIX #5: On mobile, order number is first — most important info up top */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* Mobile: order number box first */}
                        <div className="rounded-[22px] bg-white/10 p-4 ring-1 ring-white/15 md:hidden">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Order number</p>
                                    <p className="mt-1.5 text-2xl font-black text-[#fed65b]">{order.orderNumber}</p>
                                    <p className="mt-1 text-xs font-semibold text-white/65">Placed {order.placedAt}</p>
                                </div>
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-[#fed65b] text-[#003527]">
                                    <span className="material-symbols-outlined icon-fill text-[28px]" aria-hidden="true">check_circle</span>
                                </div>
                            </div>
                        </div>

                        {/* Heading + copy — always visible */}
                        <div>
                            {/* Desktop-only check icon above heading */}
                            <div className="mb-5 hidden h-16 w-16 items-center justify-center rounded-[24px] bg-[#fed65b] text-[#003527] md:flex">
                                <span className="material-symbols-outlined icon-fill text-[38px]" aria-hidden="true">check_circle</span>
                            </div>
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">Order confirmed</p>
                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">Thank you for your order</h2>
                            <div className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                <p>Your payment is protected. Sellers will now prepare the order, and you will receive updates as each package moves forward.</p>
                                <p className="mt-2 font-semibold text-white/95">A detailed confirmation receipt will be sent to your email.</p>
                            </div>
                        </div>

                        {/* Desktop-only order number box */}
                        <div className="hidden rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15 md:block">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">Order number</p>
                            <p className="mt-2 text-2xl font-black text-[#fed65b]">{order.orderNumber}</p>
                            <p className="mt-2 text-sm font-semibold text-white/65">Placed {order.placedAt}</p>
                        </div>
                    </div>
                </div>

                {/* FIX #12: Explicit borders instead of divide utilities to avoid mobile grid issues */}
                <div className="grid grid-cols-2 md:grid-cols-4">
                    <SuccessStat icon="shopping_bag" label="Items" value={order.items} position="tl" />
                    <SuccessStat icon="storefront" label="Sellers" value={order.sellers} position="tr" />
                    <SuccessStat icon="shield_locked" label="Protection" value={order.buyerProtection} position="bl" />
                    <SuccessStat icon="payments" label="Total paid" value={formatRand(order.total)} position="br" />
                </div>
            </section>

            {/* Main content grid */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    {/* What happens next */}
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">What happens next?</h2>
                                <p className="mt-1 text-sm leading-6 text-[#66736d]">Track the order as sellers prepare, dispatch, and complete each package.</p>
                            </div>
                            <Link
                                to="/my-orders"
                                className="no-print inline-flex w-fit items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                            >
                                View all orders
                                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Mobile: vertical step track */}
                        <div className="flex flex-col md:hidden">
                            {nextSteps.map((step, index) => (
                                <div key={step.title} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${step.complete ? "bg-[#003527] text-white" : "bg-[#f8fbf9] text-[#66736d] ring-1 ring-[#dbe6e1]"}`}>
                                            <span className="material-symbols-outlined icon-fill text-[20px]" aria-hidden="true">
                                                {step.complete ? "check" : step.icon}
                                            </span>
                                        </div>
                                        {index < nextSteps.length - 1 && (
                                            <div className={`mt-1 w-0.5 flex-1 rounded-full ${step.complete ? "bg-[#003527]" : "bg-[#dbe6e1]"}`} style={{ minHeight: "24px" }} />
                                        )}
                                    </div>
                                    <div className={`min-w-0 ${index === nextSteps.length - 1 ? "pb-0" : "pb-6"}`}>
                                        <p className="mb-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#66736d]">Step {index + 1}</p>
                                        <h3 className={`text-sm font-black leading-5 ${step.complete ? "text-[#003527]" : "text-[#121c2a]"}`}>{step.title}</h3>
                                        <p className="mt-1 text-xs font-semibold leading-5 text-[#66736d]">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FIX #6: 2×2 at md, 4-col at xl — not 4-col at md */}
                        <div className="hidden grid-cols-2 gap-4 md:grid xl:grid-cols-4">
                            {nextSteps.map((step, index) => (
                                <NextStepCard key={step.title} step={step} index={index} />
                            ))}
                        </div>
                    </section>

                    {/* Seller packages */}
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">Seller packages</h2>
                                <p className="mt-1 text-sm leading-6 text-[#66736d]">Your order is split by seller so each package can be tracked clearly.</p>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]" aria-hidden="true">call_split</span>
                                Multi-seller order
                            </span>
                        </div>
                        <div className="space-y-4">
                            {sellerPackages.map((pkg) => (
                                <SellerPackageCard key={pkg.id} pkg={pkg} />
                            ))}
                        </div>
                    </section>
                </section>

                {/* ── Sidebar ── */}
                {/* FIX #7: consistent top offset with rest of app */}
                <aside className="space-y-6 xl:col-span-4">
                    <div className="space-y-6 xl:sticky xl:top-[88px]">
                        {/* Order summary */}
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-xl font-black text-[#121c2a]">Order summary</h2>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="no-print flex items-center gap-1.5 rounded-xl border border-[#dbe6e1] px-3 py-2 text-xs font-black text-[#66736d] hover:bg-[#f8fbf9]"
                                    aria-label="Print receipt"
                                >
                                    <span className="material-symbols-outlined text-[16px]">print</span>
                                    Print
                                </button>
                            </div>

                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Order number" value={order.orderNumber} />
                                <SummaryRow label="Payment" value={order.paymentMethod} />
                                <SummaryRow label="Delivery" value={order.deliveryMethod} />
                                <SummaryRow label="Items" value={`${order.items}`} />
                                <SummaryRow label="Sellers" value={`${order.sellers}`} />
                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
                                <span className="text-base font-black text-[#121c2a]">Total paid</span>
                                <span className="text-3xl font-black tracking-[-0.04em] text-[#003527]">{formatRand(order.total)}</span>
                            </div>

                            <div className="no-print mt-5 grid grid-cols-1 gap-3">
                                <Link
                                    to="/my-orders"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    View order
                                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">receipt_long</span>
                                </Link>
                                <Link
                                    to="/order-tracking"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Track order
                                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">local_shipping</span>
                                </Link>
                            </div>
                        </section>

                        {/* FIX #3: SMS toggle with phone number context + confirmation feedback */}
                        <section className="no-print rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <h3 className="text-sm font-black text-[#121c2a]">SMS delivery updates</h3>
                                    <p className="mt-1 text-xs leading-5 text-[#66736d]">
                                        Sent to <span className="font-black text-[#121c2a]">{order.phoneNumber}</span>
                                    </p>
                                    <Link to="/profile/notifications" className="mt-1 inline-block text-xs font-black text-[#003527] hover:underline">
                                        Change number
                                    </Link>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSmsToggle}
                                    className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003527] focus-visible:ring-offset-2 ${smsEnabled ? "bg-[#003527]" : "bg-[#dbe6e1]"}`}
                                    role="switch"
                                    aria-checked={smsEnabled}
                                    aria-label={`SMS delivery updates — currently ${smsEnabled ? "on" : "off"}`}
                                >
                                    <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${smsEnabled ? "translate-x-5" : "translate-x-0"}`} />
                                </button>
                            </div>
                        </section>

                        {/* Buyer Protection */}
                        <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]" aria-hidden="true">shield_locked</span>
                            <h2 className="mb-2 text-xl font-black">Buyer Protection active</h2>
                            <p className="text-sm leading-7 text-white/70">
                                The seller payout is only released after delivery or collection is confirmed. Check your item carefully before confirming receipt.
                            </p>
                            <Link
                                to="/trust-safety"
                                className="no-print mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                            >
                                Learn more
                                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
                            </Link>
                        </section>

                        {/* Delivery confirmation code */}
                        <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]" aria-hidden="true">password</span>
                            <h2 className="mb-2 text-lg font-black text-[#121c2a]">Delivery confirmation code</h2>
                            <p className="text-sm leading-7 text-[#405049]">
                                When the seller marks your package as ready, a confirmation code will appear in{" "}
                                <Link to="/my-orders" className="no-print font-black text-[#003527] hover:underline">My Orders</Link>
                                <span className="hidden font-black text-[#003527] print:inline">My Orders</span>
                                . Only share the code after you have checked the item carefully.
                            </p>
                        </section>
                    </div>
                </aside>
            </div>

            {/* FIX #8: better CTA labels on mobile bar */}
            <MobileSuccessBar />

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    body { background-color: white !important; }
                }
            `}</style>
        </div>
    );
}

// ─── Stat tile ────────────────────────────────────────────────────────────────

// FIX #12: explicit border classes per position instead of divide utilities
// Stat tiles summarize the confirmed order while preserving a print-friendly receipt.
function SuccessStat({ icon, label, value, position }) {
    const borderClass = {
        tl: "border-b border-r border-[#e5ece8]",
        tr: "border-b border-[#e5ece8]",
        bl: "border-r border-[#e5ece8]",
        br: "",
    }[position] || "border-r border-b border-[#e5ece8]";

    return (
        <article className={`p-5 md:p-6 ${borderClass}`}>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[22px]" aria-hidden="true">{icon}</span>
            </div>
            <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">{value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">{label}</p>
        </article>
    );
}

// ─── Next step card ───────────────────────────────────────────────────────────

// Next-step cards help buyers understand what happens after payment confirmation.
function NextStepCard({ step, index }) {
    return (
        <article className={`rounded-[22px] border p-4 ${step.complete ? "border-[#b7e4d1] bg-[#f0faf6]" : "border-[#dbe6e1] bg-white"}`}>
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${step.complete ? "bg-[#003527] text-white" : "bg-[#f8fbf9] text-[#66736d]"}`}>
                <span className="material-symbols-outlined icon-fill text-[21px]" aria-hidden="true">
                    {step.complete ? "check" : step.icon}
                </span>
            </div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#66736d]">Step {index + 1}</p>
            <h3 className="text-sm font-black leading-5 text-[#121c2a]">{step.title}</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#66736d]">{step.description}</p>
        </article>
    );
}

// ─── Seller package card ──────────────────────────────────────────────────────

// FIX #2: forward path CTAs on each card
// FIX #4: descriptive alt text from data
// FIX #13: estimated dispatch copy
// Seller package cards keep store, tracking, and dispatch context together.
function SellerPackageCard({ pkg }) {
    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-white p-4">
            <div className="flex gap-4">
                <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="font-black text-[#121c2a]">{pkg.seller}</h3>
                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {pkg.items} item{pkg.items === 1 ? "" : "s"} · {pkg.delivery}
                            </p>
                            {/* FIX #13: dispatch estimate */}
                            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#087052]">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {pkg.estimatedDispatch}
                            </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                            <span className="material-symbols-outlined icon-fill text-[13px]">notifications_active</span>
                            {pkg.status}
                        </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#f0f4f2] pt-3">
                        <span className="text-base font-black text-[#121c2a]">{formatRand(pkg.total)}</span>
                        {/* FIX #2: CTA actions */}
                        <div className="no-print flex items-center gap-2">
                            <Link
                                to={pkg.storePath}
                                className="flex items-center gap-1.5 rounded-xl border border-[#dbe6e1] px-3 py-2 text-xs font-black text-[#003527] hover:bg-[#f0faf6]"
                            >
                                <span className="material-symbols-outlined text-[15px]">storefront</span>
                                Store
                            </Link>
                            <Link
                                to={pkg.trackingPath}
                                className="flex items-center gap-1.5 rounded-xl bg-[#003527] px-3 py-2 text-xs font-black text-white hover:bg-[#064e3b]"
                            >
                                <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                                Track
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

// ─── Summary row ──────────────────────────────────────────────────────────────

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// ─── Mobile success bar ───────────────────────────────────────────────────────

// FIX #8: improved CTA labels; FIX #10: consistent 77px fallback
// Mobile success bar keeps the main post-payment actions reachable after scrolling.
function MobileSuccessBar() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/my-orders"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Track my order
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">local_shipping</span>
                </Link>
                <Link
                    to="/shop"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Keep shopping
                </Link>
            </div>
        </div>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${Number(amount).toLocaleString("en-ZA")}`;
}
