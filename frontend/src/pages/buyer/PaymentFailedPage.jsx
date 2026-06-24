import { useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype payment attempt keeps failed-payment messaging tied to one checkout.
const paymentAttempt = {
    reference: "OM-24091",
    attemptedAt: "22 June 2026, 14:36",
    paymentMethod: "Card payment",
    deliveryMethod: "Courier delivery",
    total: 2601,
    items: 4,
    sellers: 3,
    status: "Payment not confirmed",
};

// Packages remain visible so buyers understand what has not moved forward yet.
const checkoutPackages = [
    {
        id: "pkg-1",
        seller: "Kasi Kicks",
        items: 1,
        total: 899,
        delivery: "Courier or Click & Collect",
        status: "Not sent to seller yet",
        trackingPath: "/order-tracking/pkg-1",
        storePath: "/stores/kasi-kicks",
        imageAlt: "White leather sneakers from Kasi Kicks",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
    },
    {
        id: "pkg-2",
        seller: "Urban Thread",
        items: 2,
        total: 1098,
        delivery: "Courier delivery",
        status: "Waiting for payment",
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
        status: "Not sent to seller yet",
        trackingPath: "/order-tracking/pkg-3",
        storePath: "/stores/local-carry",
        imageAlt: "Olive canvas weekender bag from Local Carry",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
    },
];

// Recovery steps explain what happened without claiming the card was not charged.
const recoverySteps = [
    {
        title: "Payment attempted",
        description: "The payment provider did not return a confirmed payment result.",
        icon: "error",
        failed: true,
    },
    {
        title: "Check your payment details",
        description: "Confirm card details, bank approval, or account limits.",
        icon: "credit_card",
        failed: false,
    },
    {
        title: "Retry or change method",
        description: "Try again or return to checkout to choose another payment option.",
        icon: "refresh",
        failed: false,
    },
    {
        title: "Order protection starts",
        description: "Buyer Protection starts once payment is successfully confirmed.",
        icon: "shield_locked",
        failed: false,
    },
];

// Recovery actions give buyers clear next paths instead of a dead-end error state.
const recoveryActions = [
    {
        title: "Try again",
        description: "Retry the payment while keeping the same checkout details.",
        icon: "refresh",
        to: "/payment-processing",
        primary: true,
    },
    {
        title: "Change payment method",
        description: "Return to checkout and choose another payment option.",
        icon: "payments",
        to: "/checkout",
        primary: false,
    },
    {
        title: "Review cart",
        description: "Check your items, sellers, quantities, and totals before paying.",
        icon: "shopping_bag",
        to: "/cart",
        primary: false,
    },
];

// Checklist helps support and buyers diagnose common payment failure causes.
const supportChecklist = [
    "Check that your card details are correct.",
    "Confirm that your bank approved the transaction.",
    "Avoid retrying many times if your banking app shows a pending payment.",
    "Contact support if the issue continues.",
];

export default function PaymentFailedPage() {
    const [copiedReference, setCopiedReference] = useState(false);

    function handleCopyReference() {
        // Reference copy is local feedback for support conversations.
        const copyPromise = navigator.clipboard?.writeText(paymentAttempt.reference);
        copyPromise?.catch(() => undefined);
        setCopiedReference(true);

        window.setTimeout(() => {
            setCopiedReference(false);
        }, 2200);
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            {copiedReference && (
                <div
                    role="status"
                    aria-live="polite"
                    className="no-print fixed right-4 top-20 z-50 flex items-center gap-3 rounded-2xl border border-[#efc5bd] bg-white px-5 py-3.5 shadow-lg"
                >
                    <span className="material-symbols-outlined icon-fill text-[20px] text-[#9f2d20]" aria-hidden="true">
                        check_circle
                    </span>
                    <span className="text-sm font-black text-[#121c2a]">
                        Payment reference copied
                    </span>
                </div>
            )}

            <BuyerPageHeader
                eyebrow="Payment not confirmed"
                title="We could not confirm your payment"
                description="Your checkout is still available. Retry payment, change payment method, or review your cart before trying again."
                actions={
                    <Link
                        to="/checkout"
                        className="no-print hidden items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6] md:inline-flex"
                    >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                            arrow_back
                        </span>
                        Back to checkout
                    </Link>
                }
            />

            <section
                className="overflow-hidden rounded-[32px] border border-[#efc5bd] bg-white shadow-[0_18px_50px_rgba(159,45,32,.08)]"
                aria-live="polite"
            >
                <div className="bg-[#9f2d20] p-6 text-white md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="rounded-[22px] bg-white/10 p-4 ring-1 ring-white/15 md:hidden">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                                        Reference
                                    </p>
                                    <p className="mt-1.5 text-2xl font-black text-white">
                                        {paymentAttempt.reference}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleCopyReference}
                                        className="no-print mt-3 inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                                        aria-label="Copy payment reference"
                                    >
                                        {copiedReference ? "Copied" : "Copy reference"}
                                        <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                            {copiedReference ? "check" : "content_copy"}
                                        </span>
                                    </button>
                                </div>
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white/15 text-white ring-1 ring-white/20">
                                    <span className="material-symbols-outlined icon-fill text-[28px]" aria-hidden="true">
                                        error
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-5 hidden h-16 w-16 items-center justify-center rounded-[24px] bg-white/12 text-white ring-1 ring-white/20 md:flex">
                                <span className="material-symbols-outlined icon-fill text-[38px]" aria-hidden="true">
                                    error
                                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-white/72">
                                Payment not confirmed
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                We could not confirm your payment
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
                                We could not confirm a completed payment yet. Please check your
                                payment details before retrying, especially if your banking app
                                shows a pending transaction.
                            </p>
                        </div>

                        <div className="hidden rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15 md:block">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Reference
                            </p>
                            <p className="mt-2 text-2xl font-black text-white">
                                {paymentAttempt.reference}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-white/65">
                                Attempted {paymentAttempt.attemptedAt}
                            </p>
                            <button
                                type="button"
                                onClick={handleCopyReference}
                                className="no-print mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                                aria-label="Copy payment reference"
                            >
                                {copiedReference ? "Copied" : "Copy reference"}
                                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                                    {copiedReference ? "check" : "content_copy"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4">
                    <FailedStat
                        icon="receipt_long"
                        label="Reference"
                        value={paymentAttempt.reference}
                        position="tl"
                    />
                    <FailedStat
                        icon="shopping_bag"
                        label="Items"
                        value={paymentAttempt.items}
                        position="tr"
                    />
                    <FailedStat
                        icon="storefront"
                        label="Sellers"
                        value={paymentAttempt.sellers}
                        position="bl"
                    />
                    <FailedStat
                        icon="payments"
                        label="Attempted total"
                        value={formatRand(paymentAttempt.total)}
                        position="br"
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                How to complete your order
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Your cart details are still available. Follow these steps to
                                complete payment safely.
                            </p>
                        </div>

                        <div className="flex flex-col md:hidden">
                            {recoverySteps.map((step, index) => (
                                <div key={step.title} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                                                step.failed
                                                    ? "bg-[#9f2d20] text-white"
                                                    : "bg-[#f8fbf9] text-[#66736d] ring-1 ring-[#dbe6e1]"
                                            }`}
                                        >
                                            <span className="material-symbols-outlined icon-fill text-[20px]" aria-hidden="true">
                                                {step.icon}
                                            </span>
                                        </div>
                                        {index < recoverySteps.length - 1 && (
                                            <div
                                                className={`mt-1 w-0.5 flex-1 rounded-full ${
                                                    step.failed ? "bg-[#9f2d20]" : "bg-[#dbe6e1]"
                                                }`}
                                                style={{ minHeight: "24px" }}
                                            />
                                        )}
                                    </div>
                                    <div className={`min-w-0 ${index === recoverySteps.length - 1 ? "pb-0" : "pb-6"}`}>
                                        <p className="mb-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#66736d]">
                                            Step {index + 1}
                                        </p>
                                        <h3 className={`text-sm font-black leading-5 ${step.failed ? "text-[#9f2d20]" : "text-[#121c2a]"}`}>
                                            {step.title}
                                        </h3>
                                        <p className="mt-1 text-xs font-semibold leading-5 text-[#66736d]">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden grid-cols-2 gap-4 md:grid xl:grid-cols-4">
                            {recoverySteps.map((step, index) => (
                                <RecoveryStepCard key={step.title} step={step} index={index} />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Recovery options
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Choose the safest next step for this payment attempt.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {recoveryActions.map((action) => (
                                <RecoveryActionCard key={action.title} action={action} />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Items still in your checkout
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    These items have not been sent to sellers yet because payment
                                    was not confirmed.
                                </p>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff8f6] px-3 py-1.5 text-xs font-black text-[#9f2d20]">
                                <span className="material-symbols-outlined icon-fill text-[15px]" aria-hidden="true">
                                    call_split
                                </span>
                                Multi-seller checkout
                            </span>
                        </div>

                        <div className="space-y-4">
                            {checkoutPackages.map((checkoutPackage) => (
                                <CheckoutPackageCard
                                    key={checkoutPackage.id}
                                    checkoutPackage={checkoutPackage}
                                />
                            ))}
                        </div>
                    </section>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <div className="space-y-6 xl:sticky xl:top-[88px]">
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                                Payment attempt summary
                            </h2>

                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Reference" value={paymentAttempt.reference} />
                                <SummaryRow label="Status" value={paymentAttempt.status} />
                                <SummaryRow label="Attempted at" value={paymentAttempt.attemptedAt} />
                                <SummaryRow label="Payment" value={paymentAttempt.paymentMethod} />
                                <SummaryRow label="Delivery" value={paymentAttempt.deliveryMethod} />
                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
                                <span className="text-base font-black text-[#121c2a]">
                                    Attempted total
                                </span>
                                <span className="text-3xl font-black tracking-[-0.04em] text-[#9f2d20]">
                                    {formatRand(paymentAttempt.total)}
                                </span>
                            </div>

                            <div className="no-print mt-5 grid grid-cols-1 gap-3">
                                <Link
                                    to="/payment-processing"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    Try again
                                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                                        refresh
                                    </span>
                                </Link>
                                <Link
                                    to="/checkout"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Change payment method
                                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                                        credit_card
                                    </span>
                                </Link>
                            </div>
                        </section>

                        <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]" aria-hidden="true">
                                shield_locked
                            </span>
                            <h2 className="mb-2 text-xl font-black">
                                Buyer Protection
                            </h2>
                            <p className="text-sm leading-7 text-white/70">
                                Buyer Protection starts after payment is successfully confirmed.
                                Since this payment was not confirmed, the order has not moved
                                into the protected order flow yet.
                            </p>
                            <Link
                                to="/trust-safety"
                                className="no-print mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                            >
                                Learn more
                                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                                    arrow_forward
                                </span>
                            </Link>
                        </section>

                        <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]" aria-hidden="true">
                                support_agent
                            </span>
                            <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                                Before contacting support
                            </h2>
                            <ul className="space-y-3">
                                {supportChecklist.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]" aria-hidden="true">
                                            check_circle
                                        </span>
                                        <span className="text-sm font-bold leading-6 text-[#405049]">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/contact"
                                className="no-print mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                            >
                                Contact support
                                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                                    arrow_forward
                                </span>
                            </Link>
                        </section>
                    </div>
                </aside>
            </div>

            <MobileFailedBar />

            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    body {
                        background-color: white !important;
                    }
                }
            `}</style>
        </div>
    );
}

// Stat tiles summarize the failed attempt before recovery actions.
function FailedStat({ icon, label, value, position }) {
    const borderClass = {
        tl: "border-b border-r border-[#f1ddd9]",
        tr: "border-b border-[#f1ddd9]",
        bl: "border-r border-[#f1ddd9]",
        br: "",
    }[position] || "border-r border-b border-[#f1ddd9]";

    return (
        <article className={`p-5 md:p-6 ${borderClass}`}>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff8f6] text-[#9f2d20]">
                <span className="material-symbols-outlined icon-fill text-[22px]" aria-hidden="true">
                    {icon}
                </span>
            </div>
            <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {value}
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
        </article>
    );
}

// Recovery steps keep the buyer oriented after a failed payment attempt.
function RecoveryStepCard({ step, index }) {
    return (
        <article
            className={`rounded-[22px] border p-4 ${
                step.failed ? "border-[#efc5bd] bg-[#fff8f6]" : "border-[#dbe6e1] bg-white"
            }`}
        >
            <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
                    step.failed ? "bg-[#9f2d20] text-white" : "bg-[#f8fbf9] text-[#66736d]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill text-[21px]" aria-hidden="true">
                    {step.icon}
                </span>
            </div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#66736d]">
                Step {index + 1}
            </p>
            <h3 className={`text-sm font-black leading-5 ${step.failed ? "text-[#9f2d20]" : "text-[#121c2a]"}`}>
                {step.title}
            </h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#66736d]">
                {step.description}
            </p>
        </article>
    );
}

// Recovery action cards separate retry, checkout, and cart-review choices.
function RecoveryActionCard({ action }) {
    return (
        <Link
            to={action.to}
            className={`rounded-[24px] border p-5 transition ${
                action.primary
                    ? "border-[#003527] bg-[#003527] text-white shadow-[0_12px_32px_rgba(0,53,39,.14)] hover:bg-[#064e3b]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba] hover:bg-[#f8fbf9]"
            }`}
        >
            <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                    action.primary ? "bg-white/10 text-[#fed65b]" : "bg-[#f0faf6] text-[#003527]"
                }`}
            >
                <span className="material-symbols-outlined icon-fill" aria-hidden="true">
                    {action.icon}
                </span>
            </div>
            <h3 className={`font-black ${action.primary ? "text-white" : "text-[#121c2a]"}`}>
                {action.title}
            </h3>
            <p className={`mt-2 text-sm leading-6 ${action.primary ? "text-white/72" : "text-[#66736d]"}`}>
                {action.description}
            </p>
            <span className={`mt-4 inline-flex items-center gap-2 text-sm font-black ${action.primary ? "text-[#fed65b]" : "text-[#003527]"}`}>
                Continue
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    arrow_forward
                </span>
            </span>
        </Link>
    );
}

// Checkout package cards show which seller packages are waiting on payment.
function CheckoutPackageCard({ checkoutPackage }) {
    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-white p-4">
            <div className="flex gap-4">
                <img
                    src={checkoutPackage.image}
                    alt={checkoutPackage.imageAlt}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h3 className="font-black text-[#121c2a]">
                                {checkoutPackage.seller}
                            </h3>
                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {checkoutPackage.items} item
                                {checkoutPackage.items === 1 ? "" : "s"} -{" "}
                                {checkoutPackage.delivery}
                            </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fff8f6] px-3 py-1.5 text-xs font-black text-[#9f2d20]">
                            <span className="material-symbols-outlined icon-fill text-[13px]" aria-hidden="true">
                                pending
                            </span>
                            {checkoutPackage.status}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 border-t border-[#f0f4f2] pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-base font-black text-[#121c2a]">
                            {formatRand(checkoutPackage.total)}
                        </span>
                        <div className="no-print flex flex-wrap items-center gap-2">
                            <Link
                                to={checkoutPackage.storePath}
                                className="flex items-center gap-1.5 rounded-xl border border-[#dbe6e1] px-3 py-2 text-xs font-black text-[#003527] hover:bg-[#f0faf6]"
                            >
                                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                    storefront
                                </span>
                                Store
                            </Link>
                            <Link
                                to={checkoutPackage.trackingPath}
                                className="flex items-center gap-1.5 rounded-xl border border-[#efc5bd] bg-[#fff8f6] px-3 py-2 text-xs font-black text-[#9f2d20] hover:bg-[#fff0ec]"
                            >
                                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                    local_shipping
                                </span>
                                Tracking pending
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
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

// Mobile bar keeps retry and checkout actions available after scrolling.
function MobileFailedBar() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/payment-processing"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Try again
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        refresh
                    </span>
                </Link>
                <Link
                    to="/checkout"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${Number(amount).toLocaleString("en-ZA")}`;
}
