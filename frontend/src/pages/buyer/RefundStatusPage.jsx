import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype refund record keeps the dispute, package, seller, and payment context together.
const refund = {
    id: "RF-20491",
    disputeId: "DSP-10042",
    orderId: "OM-24091",
    packageId: "PKG-KK-01",
    seller: "Kasi Kicks",
    product: "Classic white everyday sneakers",
    status: "processing",
    statusLabel: "Refund processing",
    requestedAt: "23 June 2026, 08:45",
    approvedAt: "24 June 2026, 10:15",
    estimatedCompletion: "3–5 business days",
    refundMethod: "Original card payment",
    protectedAmount: 899,
    refundAmount: 899,
    serviceFeeRefunded: 0,
    deliveryRefunded: 0,
    reason: "Damaged item",
    resolution: "Refund approved",
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80",
};

// Timeline steps reflect the buyer-facing refund journey from dispute review to bank processing.
const timeline = [
    {
        title: "Dispute reviewed",
        description: "Support reviewed the dispute details, seller response, and evidence.",
        time: "24 Jun, 09:40",
        icon: "gavel",
        complete: true,
    },
    {
        title: "Refund approved",
        description: "The refund was approved for this seller package.",
        time: "24 Jun, 10:15",
        icon: "task_alt",
        complete: true,
    },
    {
        title: "Refund processing",
        description: "The refund is being processed back to the original payment method.",
        time: "In progress",
        icon: "payments",
        active: true,
    },
    {
        title: "Bank or card provider",
        description: "Your bank or card provider may need time to reflect the refund.",
        time: "Pending",
        icon: "account_balance",
        complete: false,
    },
    {
        title: "Refund completed",
        description: "The refund will be marked complete once processing is confirmed.",
        time: "Pending",
        icon: "verified",
        complete: false,
    },
];

// Refund notes explain what the buyer can expect without promising bank processing times.
const refundNotes = [
    "Refunds usually return to the original payment method.",
    "Your bank or card provider may take extra time to show the refund.",
    "Keep the refund and dispute references if you need to contact support.",
    "If a return is required, follow the return instructions before sending the item back.",
];

// Activity entries show the latest support-side events in a compact audit trail.
const activityLog = [
    {
        title: "Support approved the refund",
        description: "The evidence review was completed and the refund was approved.",
        time: "24 Jun, 10:15",
        icon: "task_alt",
    },
    {
        title: "Seller package marked for refund",
        description: "The disputed package was linked to the refund process.",
        time: "24 Jun, 10:18",
        icon: "inventory_2",
    },
    {
        title: "Refund sent for processing",
        description: "The refund was sent to the payment processor.",
        time: "24 Jun, 10:22",
        icon: "payments",
    },
];

export default function RefundStatusPage() {
    const [copiedReference, setCopiedReference] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);

    const progress = useMemo(() => {
        // Count the active step as half complete so progress reflects "in progress" honestly.
        const completedSteps = timeline.filter((step) => step.complete).length;
        const activeStep = timeline.some((step) => step.active) ? 0.5 : 0;

        return Math.round(((completedSteps + activeStep) / timeline.length) * 100);
    }, []);

    function copyReference() {
        // Copy both refund and dispute ids because support may need either reference.
        navigator.clipboard?.writeText(`${refund.id} / ${refund.disputeId}`);
        setCopiedReference(true);

        window.setTimeout(() => {
            setCopiedReference(false);
        }, 2200);
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Refund status"
                title={`Refund ${refund.id}`}
                description="Track the refund amount, payment method, estimated timing, and dispute resolution details."
                actions={
                    <>
                        <Link
                            to="/dispute-details"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Dispute details
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Contact support
                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                        </Link>
                    </>
                }
            />

            {copiedReference && (
                <div
                    className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5"
                    role="status"
                    aria-live="polite"
                >
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        check_circle
                    </span>

                    <div>
                        <h2 className="mb-1 font-black text-[#003527]">
                            Refund reference copied
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            Use this reference when contacting support about the refund.
                        </p>
                    </div>
                </div>
            )}

            <section className="rounded-[28px] border border-[#b7e4d1] bg-white p-5 shadow-[0_14px_42px_rgba(0,53,39,.07)] md:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <StatusBadge status={refund.status} label={refund.statusLabel} />

                            <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[14px]">
                                    shield_locked
                                </span>
                                Buyer Protection outcome
                            </span>
                        </div>

                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66736d]">
                            Refund approved
                        </p>

                        <h2 className="mt-2 text-2xl font-black tracking-[-0.045em] text-[#121c2a] md:text-3xl">
                            Your refund is being processed
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#66736d] md:text-base">
                            The refund has been approved for this package and is being returned to your original payment method.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <QuickFact label="Method" value={refund.refundMethod} />
                            <QuickFact label="Estimated" value={refund.estimatedCompletion} />
                            <QuickFact label="Approved" value={refund.approvedAt} />
                        </div>
                    </div>

                    <div className="rounded-[26px] border border-[#c8ddd5] bg-[#f0faf6] p-5 lg:w-[320px]">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                            Total refund
                        </p>

                        <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-[#003527]">
                            {formatRand(refund.refundAmount)}
                        </p>

                        <p className="mt-2 text-sm font-bold leading-6 text-[#405049]">
                            Reference {refund.id} • Dispute {refund.disputeId}
                        </p>

                        <button
                            type="button"
                            onClick={copyReference}
                            className="no-print mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#003527] transition hover:bg-[#fbfdfc]"
                        >
                            {copiedReference ? "Copied" : "Copy reference"}
                            <span className="material-symbols-outlined text-[17px]">
                                {copiedReference ? "check" : "content_copy"}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <section className="space-y-6 lg:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Refund progress
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Follow the refund from dispute approval to final completion.
                                </p>
                            </div>

                            <StatusBadge status={refund.status} label={refund.statusLabel} />
                        </div>

                        <div className="mb-6 rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
                            <div className="mb-2 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                <span>Refund progress</span>
                                <span>{progress}%</span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-[#e5ece8]">
                                <div
                                    className="h-full rounded-full bg-[#003527]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {timeline.map((step, index) => (
                                <TimelineItem
                                    key={step.title}
                                    step={step}
                                    isLast={index === timeline.length - 1}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Refund activity
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Recent actions connected to this refund.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {activityLog.map((activity) => (
                                <ActivityRow key={activity.title} activity={activity} />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Refunded package
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                The seller package linked to this refund.
                            </p>
                        </div>

                        <article className="rounded-[24px] border border-[#dbe6e1] bg-[#fbfdfc] p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <img
                                    src={refund.image}
                                    alt={`Product photo for ${refund.product}`}
                                    className="h-24 w-full rounded-[20px] object-cover sm:h-28 sm:w-28"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0">
                                            <StatusBadge status={refund.status} label={refund.statusLabel} />

                                            <h3 className="mt-3 text-xl font-black tracking-[-0.04em] text-[#121c2a]">
                                                {refund.product}
                                            </h3>

                                            <p className="mt-1 text-sm font-bold text-[#66736d]">
                                                {refund.seller} • Package {refund.packageId}
                                            </p>
                                        </div>

                                        <Link
                                            to="/order-details"
                                            className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">
                                                receipt_long
                                            </span>
                                            View order
                                        </Link>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <InfoPill icon="report" label="Reason" value={refund.reason} />
                                        <InfoPill icon="task_alt" label="Resolution" value={refund.resolution} />
                                        <InfoPill icon="payments" label="Refund method" value={refund.refundMethod} />
                                        <InfoPill icon="event" label="Approved" value={refund.approvedAt} />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-5 md:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[24px]">
                                    info
                                </span>
                            </div>

                            <div>
                                <h2 className="text-lg font-black text-[#121c2a]">
                                    Refund timing
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-[#405049]">
                                    The refund has been approved, but your bank or card provider may take additional time to display the money in your account.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                <aside className="hidden lg:col-span-4 lg:block">
                    <div className="space-y-6 lg:sticky lg:top-[88px] lg:pb-6">
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                        Refund receipt
                                    </p>

                                    <h2 className="mt-1 text-xl font-black text-[#121c2a]">
                                        Refund summary
                                    </h2>
                                </div>

                                <StatusBadge status={refund.status} label={refund.statusLabel} />
                            </div>

                            <div className="rounded-[24px] bg-[#f0faf6] p-5">
                                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                    Total refund
                                </p>

                                <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-[#003527]">
                                    {formatRand(refund.refundAmount)}
                                </p>

                                <p className="mt-2 text-sm font-bold text-[#405049]">
                                    {refund.refundMethod}
                                </p>
                            </div>

                            <div className="space-y-3 border-b border-[#e5ece8] py-5">
                                <SummaryRow label="Product refund" value={formatRand(refund.refundAmount)} />
                                <SummaryRow label="Delivery refund" value={formatRand(refund.deliveryRefunded)} />
                                <SummaryRow label="Service fee refund" value={formatRand(refund.serviceFeeRefunded)} />
                                <SummaryRow label="Protected amount" value={formatRand(refund.protectedAmount)} />
                            </div>

                            <div className="space-y-3 border-b border-[#e5ece8] py-5">
                                <SummaryRow label="Refund" value={refund.id} />
                                <SummaryRow label="Dispute" value={refund.disputeId} />
                                <SummaryRow label="Order" value={refund.orderId} />
                                <SummaryRow label="Estimated" value={refund.estimatedCompletion} />
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-3">
                                <button
                                    type="button"
                                    onClick={copyReference}
                                    className="no-print inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    {copiedReference ? "Reference copied" : "Copy reference"}
                                    <span className="material-symbols-outlined text-[18px]">
                                        {copiedReference ? "check" : "content_copy"}
                                    </span>
                                </button>

                                <Link
                                    to="/dispute-details"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    View dispute
                                    <span className="material-symbols-outlined text-[18px]">
                                        gavel
                                    </span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Contact support
                                    <span className="material-symbols-outlined text-[18px]">
                                        support_agent
                                    </span>
                                </Link>
                            </div>
                        </section>
                    </div>
                </aside>
            </div>

            <RefundSupportRows
                smsEnabled={smsEnabled}
                onToggleSms={() => setSmsEnabled((current) => !current)}
            />

            <MobileRefundActions />

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

// Quick facts summarize timing and method without forcing buyers into the sidebar.
function QuickFact({ label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                {label}
            </p>

            <p className="mt-1 text-sm font-black leading-6 text-[#121c2a]">
                {value}
            </p>
        </div>
    );
}

// Timeline rows separate completed, active, and pending refund stages.
function TimelineItem({ step, isLast }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        step.complete
                            ? "bg-[#003527] text-white"
                            : step.active
                                ? "bg-[#fff8e5] text-[#8a5a00]"
                                : "bg-[#f8fbf9] text-[#8b9791]"
                    }`}
                >
                    <span className="material-symbols-outlined icon-fill text-[22px]">
                        {step.complete ? "check" : step.icon}
                    </span>
                </span>

                {!isLast && <span className="mt-2 h-full w-px bg-[#dbe6e1]" />}
            </div>

            <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-black text-[#121c2a]">{step.title}</h3>

                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                        {step.time}
                    </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

// Activity rows show support events after the main progress timeline.
function ActivityRow({ activity }) {
    return (
        <article className="flex items-start gap-4 rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[22px]">
                    {activity.icon}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-black text-[#121c2a]">{activity.title}</h3>

                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                        {activity.time}
                    </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {activity.description}
                </p>
            </div>
        </article>
    );
}

// Info pills keep package metadata compact inside the refunded item section.
function InfoPill({ icon, label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[18px]">
                    {icon}
                </span>

                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                    {label}
                </p>
            </div>

            <p className="text-sm font-black leading-6 text-[#121c2a]">{value}</p>
        </div>
    );
}

// Status badge keeps refund state colors consistent with other buyer resolution pages.
function StatusBadge({ status, label }) {
    const styles = {
        requested: "bg-[#fff8e5] text-[#8a5a00]",
        approved: "bg-[#f0faf6] text-[#087052]",
        processing: "bg-[#eaf4ff] text-[#1d5b8f]",
        completed: "bg-[#f0faf6] text-[#087052]",
        failed: "bg-[#fff0ec] text-[#9f2d20]",
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

// Summary rows keep refund math easy to scan in the sidebar.
function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// Shared switch preserves accessible switch semantics for SMS updates.
function ToggleSwitch({ checked, onChange, label }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                checked ? "bg-[#003527]" : "bg-[#dbe6e1]"
            }`}
            role="switch"
            aria-checked={checked}
            aria-label={label}
        >
            <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    checked ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}

// Support rows keep SMS and help actions together without a separate sidebar card.
function RefundSupportRows({ smsEnabled, onToggleSms }) {
    return (
        <section className="grid gap-4 lg:grid-cols-2">
            <section className="flex items-start justify-between gap-4 rounded-[24px] border border-[#c8ddd5] bg-[#f0faf6] p-5">
                <div className="flex min-w-0 items-start gap-3">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        sms
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-base font-black text-[#121c2a]">
                            Refund updates
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#405049]">
                            {smsEnabled
                                ? "SMS updates are enabled for important refund changes."
                                : "SMS updates are off. You can still check refund progress here."}
                        </p>
                    </div>
                </div>

                <ToggleSwitch
                    checked={smsEnabled}
                    onChange={onToggleSms}
                    label={`Refund SMS updates - currently ${smsEnabled ? "on" : "off"}`}
                />
            </section>

            <section className="rounded-[24px] border border-[#c8ddd5] bg-white p-5">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        shield_locked
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-base font-black text-[#121c2a]">
                            Buyer Protection outcome
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#405049]">
                            Open Market tracks dispute decisions, seller package details, and refund progress.
                        </p>
                        <Link
                            to="/trust-safety"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-black text-[#003527] hover:underline"
                        >
                            Learn more
                            <span className="material-symbols-outlined text-[16px]">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="rounded-[24px] border border-[#dbe6e1] bg-white p-5 lg:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined icon-fill shrink-0 text-[24px] text-[#003527]">
                            tips_and_updates
                        </span>
                        <h2 className="text-base font-black text-[#121c2a]">
                            What to know
                        </h2>
                    </div>

                    <ul className="grid flex-1 gap-2 sm:grid-cols-2">
                        {refundNotes.map((note) => (
                            <li key={note} className="flex items-start gap-2">
                                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[16px] text-[#003527]">
                                    check_circle
                                </span>
                                <span className="text-sm font-bold leading-6 text-[#405049]">
                                    {note}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </section>
    );
}

// Mobile actions prioritize returning to the dispute while keeping support one tap away.
function MobileRefundActions() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/dispute-details"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                >
                    View dispute
                    <span className="material-symbols-outlined text-[18px]">
                        gavel
                    </span>
                </Link>

                <Link
                    to="/contact"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Support
                </Link>
            </div>
        </div>
    );
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R\u00A0${amount.toLocaleString("en-ZA")}`;
}
