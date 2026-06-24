import { useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype confirmation receipt for one seller package after delivery is confirmed.
const confirmation = {
    orderId: "OM-24091",
    packageId: "PKG-KK-01",
    seller: "Kasi Kicks",
    confirmedAt: "22 June 2026, 16:48",
    method: "Courier or Click & Collect",
    confirmationCode: "482913",
    payoutStatus: "Seller payout process started",
    packageTotal: 899,
    remainingPackages: 2,
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&q=80",
    items: [
        {
            title: "Classic white everyday sneakers",
            size: "UK 8",
            color: "White",
            quantity: 1,
            condition: "New",
        },
    ],
};

// Next steps explain what changed and where the buyer can go next.
const nextSteps = [
    {
        title: "Package confirmed",
        description: "You confirmed that this package was received and checked.",
        icon: "task_alt",
        complete: true,
    },
    {
        title: "Seller payout process",
        description: "The seller payout process can now continue for this package.",
        icon: "payments",
        complete: true,
    },
    {
        title: "Review seller",
        description: "Leave a review to help other buyers shop confidently.",
        icon: "rate_review",
        complete: false,
    },
    {
        title: "Track remaining packages",
        description: "Continue tracking any seller packages that are still active.",
        icon: "local_shipping",
        complete: false,
    },
];

// FIX 6: Fixed toast — always visible above the mobile nav regardless of scroll position.
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
                    <p className="text-sm font-black text-[#003527]">Reference copied</p>
                    <p className="text-xs font-bold text-[#66736d]">
                        Use this if you need support for this package.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function DeliveryConfirmationSuccessPage() {
    // Copy feedback is local UI state for support/reference sharing.
    const [copiedReference, setCopiedReference] = useState(false);

    // FIX 1: showReceiptNote state removed entirely — prototype banner is gone.

    function copyReference() {
        // Copy both order and package ids because support may need package-level context.
        navigator.clipboard?.writeText(
            `${confirmation.orderId} / ${confirmation.packageId}`
        );
        setCopiedReference(true);
        window.setTimeout(() => {
            setCopiedReference(false);
        }, 2200);
    }

    function printConfirmation() {
        // Print uses the page's print styles to create a lightweight receipt.
        window.print();
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Delivery confirmed"
                title="Package received successfully"
                description="This package has been marked as received. The seller payout process can now continue for this confirmed package."
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

                        <button
                            type="button"
                            onClick={printConfirmation}
                            className="no-print inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Print receipt
                            <span className="material-symbols-outlined text-[18px]">
                                print
                            </span>
                        </button>
                    </>
                }
            />

            {/*
              FIX 2: Distinct visual success moment.
              The hero banner shifts to a sage/green celebration state — a clear
              emotional step-change from the warning-toned confirmation page.
              Amber tick icon, "Handover complete" eyebrow, and a sage ring
              reinforce that this is a done state, not an action state.
            */}
            <section className="overflow-hidden rounded-[32px] border border-[#b7e4d1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                <div className="relative bg-[#003527] p-6 text-white md:p-8">
                    {/* Decorative success ring — subtle ambient pulse behind the icon */}
                    <div className="pointer-events-none absolute right-8 top-8 hidden h-40 w-40 rounded-full bg-[#fed65b]/5 ring-1 ring-[#fed65b]/10 md:block" />
                    <div className="pointer-events-none absolute right-14 top-14 hidden h-28 w-28 rounded-full bg-[#fed65b]/5 ring-1 ring-[#fed65b]/10 md:block" />

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            {/* Success icon in amber — visually distinct from the password icon on the prior page */}
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#fed65b] text-[#003527] shadow-[0_0_0_6px_rgba(254,214,91,0.18)]">
                                <span className="material-symbols-outlined icon-fill text-[38px]">
                                    verified
                                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                Handover complete
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                Package confirmed — you're all set
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                This package has been confirmed as received. Keep tracking any
                                remaining packages before confirming those separately.
                            </p>
                        </div>

                        <div className="shrink-0 rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Confirmation reference
                            </p>

                            <p className="mt-2 text-2xl font-black text-[#fed65b]">
                                {confirmation.packageId}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-white/65">
                                Confirmed {confirmation.confirmedAt}
                            </p>

                            <button
                                type="button"
                                onClick={copyReference}
                                className="no-print mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                {copiedReference ? "Copied" : "Copy reference"}
                                <span className="material-symbols-outlined text-[16px]">
                                    {copiedReference ? "check" : "content_copy"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ece8] md:grid-cols-4 md:divide-y-0">
                    <SuccessStat
                        icon="receipt_long"
                        label="Order"
                        value={confirmation.orderId}
                    />
                    <SuccessStat
                        icon="storefront"
                        label="Seller"
                        value={confirmation.seller}
                    />
                    <SuccessStat
                        icon="payments"
                        label="Package total"
                        value={formatRand(confirmation.packageTotal)}
                    />
                    <SuccessStat
                        icon="local_shipping"
                        label="Remaining"
                        value={confirmation.remainingPackages}
                    />
                </div>
            </section>

            {/* FIX 6: Fixed toast replaces inline mid-page banner */}
            <CopiedToast visible={copiedReference} />

            {/* FIX 1: Prototype email receipt banner removed entirely. */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    What happens next?
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    This package is confirmed. You can now review the seller or
                                    continue tracking the rest of the order.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">
                                    shield_locked
                                </span>
                                Buyer Protection updated
                            </span>
                        </div>

                        {/* FIX 4: NextStepCard now shows "Done" for complete steps, "Step N" only for pending */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {nextSteps.map((step) => (
                                <NextStepCard key={step.title} step={step} />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Confirmed package
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                This is the package you confirmed as received.
                            </p>
                        </div>

                        {/* FIX 3: Replaced h-52 full-width image with compact thumbnail layout */}
                        <article className="overflow-hidden rounded-[26px] border border-[#dbe6e1]">
                            <div className="p-5">
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={confirmation.image}
                                            alt={`${confirmation.seller} confirmed package`}
                                            className="h-14 w-14 shrink-0 rounded-[14px] object-cover"
                                        />

                                        <div>
                                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#087052]">
                                                <span className="material-symbols-outlined icon-fill text-[14px]">
                                                    check_circle
                                                </span>
                                                Received and confirmed
                                            </span>

                                            <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-[#121c2a]">
                                                {confirmation.seller}
                                            </h3>

                                            <p className="mt-0.5 text-sm font-bold text-[#66736d]">
                                                {confirmation.items.length} item · {confirmation.method}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/stores/${confirmation.seller
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
                                        icon="verified"
                                        label="Confirmed at"
                                        value={confirmation.confirmedAt}
                                    />
                                    <InfoPill
                                        icon="payments"
                                        label="Payout status"
                                        value={confirmation.payoutStatus}
                                    />
                                </div>

                                <div className="divide-y divide-[#e5ece8] rounded-[22px] border border-[#e5ece8]">
                                    {confirmation.items.map((item) => (
                                        <div key={item.title} className="p-4">
                                            <p className="font-black text-[#121c2a]">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                                {item.size} · {item.color} · {item.condition} · Qty{" "}
                                                {item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Help other buyers
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Reviews help buyers understand seller quality, item accuracy,
                                and delivery experience.
                            </p>
                        </div>

                        {/* FIX 5: ReviewActionCard now receives an explicit ctaLabel prop */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <ReviewActionCard
                                icon="storefront"
                                title="Review seller"
                                description="Rate communication, packaging, and overall seller experience."
                                ctaLabel="Leave a review"
                                to="/review-seller"
                                primary
                            />

                            <ReviewActionCard
                                icon="inventory_2"
                                title="Review product"
                                description="Rate the product quality, condition, and accuracy."
                                ctaLabel="Rate this product"
                                to="/review-product"
                            />
                        </div>
                    </section>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Confirmation summary
                        </h2>

                        {/* FIX 8: "Code used" row removed — code served its purpose at handover */}
                        <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                            <SummaryRow label="Order" value={confirmation.orderId} />
                            <SummaryRow label="Package" value={confirmation.packageId} />
                            <SummaryRow label="Seller" value={confirmation.seller} />
                            <SummaryRow label="Method" value={confirmation.method} />
                            <SummaryRow label="Confirmed" value={confirmation.confirmedAt} />
                        </div>

                        <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
                            <span className="text-base font-black text-[#121c2a]">
                                Package total
                            </span>

                            <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                                {formatRand(confirmation.packageTotal)}
                            </span>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/order-details"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                            >
                                View order details
                                <span className="material-symbols-outlined text-[18px]">
                                    receipt_long
                                </span>
                            </Link>

                            <Link
                                to="/order-tracking"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Track remaining packages
                                <span className="material-symbols-outlined text-[18px]">
                                    local_shipping
                                </span>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
                            shield_locked
                        </span>

                        <h2 className="mb-2 text-xl font-black">
                            Buyer Protection updated
                        </h2>

                        <p className="text-sm leading-7 text-white/70">
                            This confirmed package can move into the seller payout process.
                            Any unconfirmed packages in the order remain protected until their
                            own handover is confirmed.
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
                            Problem after confirmation?
                        </h2>

                        <p className="text-sm leading-7 text-[#405049]">
                            If you confirmed by mistake or later discover a serious issue,
                            contact support as soon as possible.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                Contact support
                            </Link>

                            <Link
                                to="/open-dispute"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Open dispute
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>

            {/* FIX 7: Mobile bottom bar — Review is full-width primary; Tracking is a quiet text link */}
            <MobileSuccessActions />

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

// Success stats summarize the completed confirmation before the receipt details.
function SuccessStat({ icon, label, value }) {
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

// FIX 4: Complete steps show "Done" label; only pending steps show "Step N".
// Next-step cards separate completed confirmation actions from remaining buyer tasks.
function NextStepCard({ step }) {
    // Count only incomplete steps to get the correct step number for pending items
    const pendingIndex = nextSteps
        .filter((s) => !s.complete)
        .findIndex((s) => s.title === step.title);

    return (
        <article
            className={`rounded-[22px] border p-4 ${
                step.complete
                    ? "border-[#b7e4d1] bg-[#f0faf6]"
                    : "border-[#dbe6e1] bg-white"
            }`}
        >
            <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
                    step.complete
                        ? "bg-[#003527] text-white"
                        : "bg-[#f8fbf9] text-[#66736d]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    {step.complete ? "check" : step.icon}
                </span>
            </div>

            <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {step.complete ? "Done" : `Step ${pendingIndex + 1}`}
            </p>

            <h3 className="text-sm font-black leading-5 text-[#121c2a]">
                {step.title}
            </h3>

            <p className="mt-2 text-xs font-semibold leading-5 text-[#66736d]">
                {step.description}
            </p>
        </article>
    );
}

// Info pills keep receipt metadata compact and easy to scan.
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

// FIX 5: ctaLabel prop replaces the generic "Continue" label.
// Review action cards guide the buyer to seller/product review flows after confirmation.
function ReviewActionCard({ icon, title, description, ctaLabel, to, primary = false }) {
    return (
        <Link
            to={to}
            className={`rounded-[24px] border p-5 transition ${
                primary
                    ? "border-[#003527] bg-[#003527] text-white shadow-[0_12px_32px_rgba(0,53,39,.14)] hover:bg-[#064e3b]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba] hover:bg-[#f8fbf9]"
            }`}
        >
            <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    primary ? "bg-white/10 text-[#fed65b]" : "bg-[#f0faf6] text-[#003527]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill">{icon}</span>
            </div>

            <h3 className={`font-black ${primary ? "text-white" : "text-[#121c2a]"}`}>
                {title}
            </h3>

            <p
                className={`mt-2 text-sm leading-6 ${
                    primary ? "text-white/72" : "text-[#66736d]"
                }`}
            >
                {description}
            </p>

            <span
                className={`mt-4 inline-flex items-center gap-2 text-sm font-black ${
                    primary ? "text-[#fed65b]" : "text-[#003527]"
                }`}
            >
                {ctaLabel}
                <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                </span>
            </span>
        </Link>
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

// FIX 7: Review is full-width primary CTA. Tracking is a demoted text link below.
// Mobile success actions keep review and tracking paths reachable after scrolling.
function MobileSuccessActions() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto max-w-lg space-y-2">
                <Link
                    to="/review-seller"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Leave a review
                    <span className="material-symbols-outlined text-[18px]">
                        rate_review
                    </span>
                </Link>

                <div className="flex justify-center">
                    <Link
                        to="/order-tracking"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black text-[#003527] transition hover:underline"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            local_shipping
                        </span>
                        Track remaining packages
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
