import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype dispute record keeps case, order, seller, package, and protected value context together.
const dispute = {
    id: "DSP-10042",
    orderId: "OM-24091",
    openedAt: "23 June 2026, 08:45",
    updatedAt: "Today, 09:20",
    status: "under-review",
    statusLabel: "Under review",
    issue: "Damaged item",
    requestedResolution: "Request refund",
    protectedAmount: 899,
    seller: "Kasi Kicks",
    product: "Classic white everyday sneakers",
    packageId: "PKG-KK-01",
    evidenceCount: 3,
    messageCount: 4,
    responseDue: "24 June 2026, 17:00",
    nextStep: "Support is reviewing the evidence and seller response.",
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80",
};

// Timeline steps show the review path from buyer report to final resolution.
const timeline = [
    {
        title: "Dispute opened",
        description: "You reported a problem with this package.",
        time: "23 Jun, 08:45",
        icon: "gavel",
        complete: true,
    },
    {
        title: "Evidence uploaded",
        description: "Photos and details were added to support the case.",
        time: "23 Jun, 08:52",
        icon: "attach_file",
        complete: true,
    },
    {
        title: "Seller asked to respond",
        description: "The seller has been asked to provide their response.",
        time: "23 Jun, 09:10",
        icon: "storefront",
        complete: true,
    },
    {
        title: "Support review",
        description: "Support is reviewing the order, messages, and evidence.",
        time: "In progress",
        icon: "support_agent",
        active: true,
    },
    {
        title: "Resolution decision",
        description: "A refund, return, replacement, or closure decision will follow.",
        time: "Pending",
        icon: "task_alt",
        complete: false,
    },
];

// Existing evidence files model what support and seller teams can review.
const evidenceFiles = [
    {
        id: "ev-1",
        name: "damaged-sneaker-side.jpg",
        type: "Photo",
        size: "1.4 MB",
        uploadedBy: "Buyer",
        uploadedAt: "23 Jun, 08:52",
    },
    {
        id: "ev-2",
        name: "package-condition.jpg",
        type: "Photo",
        size: "980 KB",
        uploadedBy: "Buyer",
        uploadedAt: "23 Jun, 08:53",
    },
    {
        id: "ev-3",
        name: "seller-listing-screenshot.png",
        type: "Screenshot",
        size: "760 KB",
        uploadedBy: "Buyer",
        uploadedAt: "23 Jun, 08:55",
    },
];

// Threaded messages keep buyer, seller, and support communication in one auditable stream.
const messages = [
    {
        id: "msg-1",
        author: "You",
        role: "Buyer",
        time: "23 Jun, 08:45",
        body: "The sneakers arrived with visible damage on the side. The listing showed the item as new and clean.",
        tone: "buyer",
    },
    {
        id: "msg-2",
        author: "Open Market Support",
        role: "Support",
        time: "23 Jun, 09:02",
        body: "Thanks for the details. Please keep the item and packaging while we review the evidence.",
        tone: "support",
    },
    {
        id: "msg-3",
        author: "Kasi Kicks",
        role: "Seller",
        time: "23 Jun, 09:16",
        body: "We are checking the package records and will respond with more information.",
        tone: "seller",
    },
    {
        id: "msg-4",
        author: "Open Market Support",
        role: "Support",
        time: "Today, 09:20",
        body: "This case is now under review. We may ask for more information if needed.",
        tone: "support",
    },
];

// Checklist explains what the buyer should do while the case is still open.
const reviewChecklist = [
    "Do not confirm receipt again for this package while the dispute is open.",
    "Keep the item and packaging until support gives the next step.",
    "Reply with clear details if support asks for more information.",
    "Keep all dispute communication inside Open Market.",
];

export default function DisputeDetailsPage() {
    // Reply state stays local for now while the dispute messaging API is still a prototype.
    const [replyText, setReplyText] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [copiedReference, setCopiedReference] = useState(false);
    const [replySent, setReplySent] = useState(false);

    const canSendReply = Boolean(replyText.trim().length >= 10);

    const progress = useMemo(() => {
        // Count the active review stage as half complete so the progress bar is not misleading.
        const completedSteps = timeline.filter((step) => step.complete).length;
        const activeStep = timeline.some((step) => step.active) ? 0.5 : 0;
        return Math.round(((completedSteps + activeStep) / timeline.length) * 100);
    }, []);

    function copyReference() {
        // Copying only the dispute id keeps support conversations concise.
        navigator.clipboard?.writeText(dispute.id);
        setCopiedReference(true);

        window.setTimeout(() => {
            setCopiedReference(false);
        }, 2200);
    }

    function handleFileUpload(event) {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (!selectedFiles.length) return;

        // Keep attachments capped to four so the reply form remains lightweight on mobile.
        const availableSlots = 4 - attachedFiles.length;

        const nextFiles = selectedFiles.slice(0, availableSlots).map((file) => ({
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
            size: file.size,
        }));

        setAttachedFiles((current) => [...current, ...nextFiles].slice(0, 4));
        event.target.value = "";
    }

    function removeAttachment(fileId) {
        setAttachedFiles((current) => current.filter((file) => file.id !== fileId));
    }

    function scrollToReplyForm() {
        // Mobile and sidebar CTAs share this target so there is only one reply entry point.
        document
            .getElementById("dispute-reply-form")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function sendReply(event) {
        event.preventDefault();

        if (!canSendReply) return;

        // Keep the reply submission on-page for the frontend prototype.
        setReplySent(true);
        setReplyText("");
        setAttachedFiles([]);

        window.setTimeout(() => {
            setReplySent(false);
        }, 2600);
    }

    return (
        <div className="space-y-6 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:space-y-8 md:pb-12">
            <BuyerPageHeader
                eyebrow="Dispute details"
                title={`Dispute ${dispute.id}`}
                description="Track support review, seller responses, evidence, and the next step for this case."
                actions={
                    <>
                        <Link
                            to="/disputes"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Disputes
                        </Link>

                        <Link
                            to="/refund-status"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                        >
                            Refund status
                            <span className="material-symbols-outlined text-[18px]">payments</span>
                        </Link>
                    </>
                }
            />

            {(copiedReference || replySent) && (
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
                            {copiedReference ? "Dispute reference copied" : "Reply added"}
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            {copiedReference
                                ? "Use this reference when contacting support about the case."
                                : "In the full version, this reply would be added to the dispute thread."}
                        </p>
                    </div>
                </div>
            )}

            <section className="rounded-[30px] border border-[#dbe6e1] bg-white p-5 shadow-[0_12px_36px_rgba(0,53,39,.06)] md:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <StatusBadge status={dispute.status} label={dispute.statusLabel} />
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[14px]">shield_locked</span>
                                Buyer Protection case
                            </span>
                        </div>

                        <h2 className="text-2xl font-black tracking-[-0.045em] text-[#121c2a] md:text-3xl">
                            {dispute.id}: {dispute.statusLabel}
                        </h2>

                        <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-[#66736d] md:text-base">
                            {dispute.nextStep}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                            <CaseMeta icon="receipt_long" text={`Order ${dispute.orderId}`} />
                            <CaseMeta icon="report" text={dispute.issue} />
                            <CaseMeta icon="payments" text={`${formatRand(dispute.protectedAmount)} protected`} />
                            <CaseMeta icon="schedule" text={`Response due ${dispute.responseDue}`} />
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 rounded-[24px] border border-[#dbe6e1] bg-[#f8fbf9] p-4 lg:min-w-[240px]">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#003527]">
                                Case reference
                            </p>
                            <p className="mt-1 text-xl font-black tracking-[-0.035em] text-[#121c2a]">
                                {dispute.id}
                            </p>
                            <p className="mt-1 text-sm font-bold text-[#66736d]">
                                Updated {dispute.updatedAt}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={copyReference}
                            className="no-print inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-[#003527] ring-1 ring-[#cbd7d1] transition hover:bg-[#f0faf6]"
                        >
                            {copiedReference ? "Copied" : "Copy reference"}
                            <span className="material-symbols-outlined text-[16px]">
                                {copiedReference ? "check" : "content_copy"}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            <div className="space-y-6">
                <NextStepCard />

                <ReviewChecklistPanel />

                <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-black text-[#121c2a]">Case progress</h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Follow the dispute from opening to final resolution.
                            </p>
                        </div>

                        <StatusBadge status={dispute.status} label={dispute.statusLabel} />
                    </div>

                    <div className="mb-6 rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
                        <div className="mb-2 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                            <span>Review progress</span>
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
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">Messages</h2>
                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Keep all dispute communication inside the platform.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">chat_bubble</span>
                                {messages.length} messages
                            </span>
                        </div>

                        <div className="space-y-4">
                            {messages.map((message) => (
                                <MessageCard key={message.id} message={message} />
                            ))}
                        </div>

                        <form
                            id="dispute-reply-form"
                            onSubmit={sendReply}
                            className="mt-6 rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-4"
                        >
                            <label className="block">
                                <span className="mb-2 block text-sm font-black text-[#121c2a]">
                                    Add a reply
                                </span>

                                <textarea
                                    value={replyText}
                                    onChange={(event) =>
                                        setReplyText(event.target.value.slice(0, 700))
                                    }
                                    rows={5}
                                    placeholder="Write a clear update for support or the seller..."
                                    className="w-full resize-none rounded-[20px] border border-[#dbe6e1] bg-white px-4 py-4 text-sm font-semibold leading-7 text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                />
                            </label>

                            <div className="mt-3 flex flex-col gap-2 text-xs font-bold text-[#66736d] sm:flex-row sm:items-center sm:justify-between">
                                <span>Minimum 10 characters required.</span>
                                <span>{replyText.length}/700</span>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[#bfc9c3] bg-white px-4 py-3 text-sm font-black text-[#003527] transition hover:border-[#003527] hover:bg-[#f0faf6]">
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        multiple
                                        className="sr-only"
                                        onChange={handleFileUpload}
                                        disabled={attachedFiles.length >= 4}
                                    />
                                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                                    Attach files
                                </label>

                                <button
                                    type="submit"
                                    disabled={!canSendReply}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${
                                        canSendReply
                                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                                    }`}
                                >
                                    Send reply
                                    <span className="material-symbols-outlined text-[18px]">send</span>
                                </button>
                            </div>

                            {attachedFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {attachedFiles.map((file) => (
                                        <AttachmentRow
                                            key={file.id}
                                            file={file}
                                            onRemove={() => removeAttachment(file.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </form>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-black text-[#121c2a]">Evidence</h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                Files uploaded to support the dispute review.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {evidenceFiles.map((file) => (
                                <EvidenceRow key={file.id} file={file} />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">Disputed package</h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                The package and seller linked to this case.
                            </p>
                        </div>

                        <article className="rounded-[26px] border border-[#dbe6e1] bg-[#fbfdfc] p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <img
                                    src={dispute.image}
                                    alt={`Product photo for ${dispute.product}`}
                                    className="h-24 w-full rounded-[22px] object-cover sm:h-28 sm:w-28"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <StatusBadge status={dispute.status} label={dispute.statusLabel} />
                                            <h3 className="mt-3 text-xl font-black tracking-[-0.035em] text-[#121c2a] md:text-2xl">
                                                {dispute.product}
                                            </h3>
                                            <p className="mt-1 text-sm font-bold text-[#66736d]">
                                                {dispute.seller} • Package {dispute.packageId}
                                            </p>
                                        </div>

                                        <Link
                                            to="/order-details"
                                            className="inline-flex w-fit items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                                            View order
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        <InfoPill icon="report" label="Issue" value={dispute.issue} />
                                        <InfoPill
                                            icon="payments"
                                            label="Requested resolution"
                                            value={dispute.requestedResolution}
                                        />
                                        <InfoPill icon="event" label="Opened" value={dispute.openedAt} />
                                        <InfoPill
                                            icon="schedule"
                                            label="Response due"
                                            value={dispute.responseDue}
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                <BuyerProtectionPanel />
            </div>

            <MobileDisputeDetailsActions onReplyClick={scrollToReplyForm} />

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

// Next step card gives the buyer one clear action above the detailed case history.
function NextStepCard() {
    return (
        <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-5 shadow-[0_8px_32px_rgba(0,53,39,.04)] md:p-6">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                    <span className="material-symbols-outlined icon-fill text-[24px]">info</span>
                </div>

                <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#003527]">
                        Next step
                    </p>
                    <h2 className="text-xl font-black tracking-[-0.035em] text-[#121c2a]">
                        Support is reviewing the evidence and seller response.
                    </h2>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[#405049]">
                        You do not need to do anything right now unless support asks for more information. Keep the item and packaging until the case is resolved.
                    </p>
                </div>
            </div>
        </section>
    );
}

// Checklist panel repeats the safest behavior while the dispute remains under review.
function ReviewChecklistPanel() {
    return (
        <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-5 md:p-6">
            <div className="mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined icon-fill text-[28px] text-[#003527]">
                    tips_and_updates
                </span>

                <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#003527]">
                        What to do now
                    </p>
                    <h2 className="text-lg font-black text-[#121c2a]">
                        Keep the case easy to review
                    </h2>
                </div>
            </div>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {reviewChecklist.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3">
                        <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                            check_circle
                        </span>
                        <span className="text-sm font-bold leading-6 text-[#405049]">
                            {tip}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// Buyer Protection panel explains why support keeps payment and case details inside Open Market.
function BuyerProtectionPanel() {
    return (
        <section className="rounded-[28px] bg-[#003527] p-5 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined icon-fill shrink-0 text-[32px] text-[#fed65b]">
                        shield_locked
                    </span>

                    <div>
                        <h2 className="text-xl font-black">Buyer Protection review</h2>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/70">
                            Support can use the protected payment, order details, messages,
                            and evidence to decide the next step.
                        </p>
                    </div>
                </div>

                <Link
                    to="/trust-safety"
                    className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/20 px-4 py-3 text-sm font-black text-[#fed65b] transition hover:bg-white/10"
                >
                    Learn more
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
            </div>
        </section>
    );
}

// Case meta pills keep core identifiers visible without overwhelming the hero card.
function CaseMeta({ icon, text }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5ece8] bg-[#f8fbf9] px-3 py-1.5 text-xs font-black text-[#404944]">
            <span className="material-symbols-outlined icon-fill text-[14px] text-[#003527]">
                {icon}
            </span>
            {text}
        </span>
    );
}

// Timeline rows separate complete, active, and pending dispute stages.
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

                <p className="mt-1 text-sm leading-6 text-[#66736d]">{step.description}</p>
            </div>
        </div>
    );
}

// Message cards use author tone to distinguish buyer, seller, and support responses.
function MessageCard({ message }) {
    const styles = {
        buyer: "bg-[#f0faf6] text-[#003527]",
        seller: "bg-[#eaf4ff] text-[#1d5b8f]",
        support: "bg-[#fff8e5] text-[#8a5a00]",
    };

    return (
        <article className="rounded-[24px] border border-[#e5ece8] bg-white p-4">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="font-black text-[#121c2a]">{message.author}</h3>
                    <p className="mt-1 text-xs font-bold text-[#66736d]">{message.time}</p>
                </div>

                <span
                    className={`rounded-full px-3 py-1.5 text-xs font-black ${
                        styles[message.tone] ?? "bg-[#f8fbf9] text-[#66736d]"
                    }`}
                >
                    {message.role}
                </span>
            </div>

            <p className="text-sm font-semibold leading-7 text-[#404944]">{message.body}</p>
        </article>
    );
}

// Evidence rows show uploaded files as read-only case material.
function EvidenceRow({ file }) {
    return (
        <article className="flex items-center gap-3 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[21px]">attach_file</span>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-black text-[#121c2a]">{file.name}</h3>
                <p className="mt-1 text-xs font-bold text-[#66736d]">
                    {file.type} • {file.size}
                </p>
            </div>

            <p className="hidden shrink-0 text-right text-xs font-black uppercase tracking-[0.12em] text-[#66736d] sm:block">
                {file.uploadedBy}
                <br />
                {file.uploadedAt}
            </p>
        </article>
    );
}

// Attachment rows represent new reply uploads that can still be removed before sending.
function AttachmentRow({ file, onRemove }) {
    return (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#e5ece8] bg-white p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#fff8f6] text-[#9f2d20]">
                <span className="material-symbols-outlined icon-fill text-[20px]">attach_file</span>
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#121c2a]">{file.name}</p>
                <p className="text-xs font-bold text-[#66736d]">{formatFileSize(file.size)}</p>
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#9f2d20] transition hover:bg-[#fff0ec]"
                aria-label={`Remove ${file.name}`}
            >
                <span className="material-symbols-outlined text-[19px]">close</span>
            </button>
        </div>
    );
}

// Info pills keep package and case metadata compact inside summary sections.
function InfoPill({ icon, label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[18px]">{icon}</span>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                    {label}
                </p>
            </div>

            <p className="text-sm font-black text-[#121c2a]">{value}</p>
        </div>
    );
}

// Status badge keeps dispute state colors consistent with the disputes list.
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

// Mobile actions keep reply and refund paths reachable after the timeline scrolls.
function MobileDisputeDetailsActions({ onReplyClick }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <button
                    type="button"
                    onClick={onReplyClick}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                >
                    Add reply
                    <span className="material-symbols-outlined text-[18px]">
                        chat_bubble
                    </span>
                </button>

                <Link
                    to="/disputes"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Disputes
                </Link>
            </div>
        </div>
    );
}

// File sizes are shown in friendly units so attachments are easier to review.
function formatFileSize(bytes) {
    if (!bytes) return "0 KB";

    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) return `${Math.round(kilobytes)} KB`;

    return `${(kilobytes / 1024).toFixed(1)} MB`;
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R\u00A0${amount.toLocaleString("en-ZA")}`;
}
