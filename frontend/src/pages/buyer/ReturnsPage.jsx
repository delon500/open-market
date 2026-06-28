import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype return case links the return, refund, dispute, order, and seller package together.
const returnCase = {
    id: "RTN-30042",
    refundId: "RF-20491",
    disputeId: "DSP-10042",
    orderId: "OM-24091",
    packageId: "PKG-KK-01",
    seller: "Kasi Kicks",
    product: "Classic white everyday sneakers",
    status: "return-required",
    statusLabel: "Return required",
    requestedAt: "24 June 2026, 10:20",
    returnBy: "01 July 2026",
    method: "Courier drop-off",
    returnAddress: "Open Market Returns Hub, Johannesburg",
    refundAmount: 899,
    reason: "Damaged item",
    inspectionStatus: "Waiting for return",
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80",
};

// Timeline steps explain the return journey before the refund can be finalized.
const timeline = [
    {
        title: "Return approved",
        description: "Support approved this item for return after dispute review.",
        time: "24 Jun, 10:20",
        icon: "task_alt",
        complete: true,
    },
    {
        title: "Return details issued",
        description: "Return details are available for this package.",
        time: "24 Jun, 10:24",
        icon: "assignment_return",
        complete: true,
    },
    {
        title: "Prepare the item",
        description: "Pack the item safely and include all parts received.",
        time: "Current step",
        icon: "inventory_2",
        active: true,
    },
    {
        title: "Hand over return",
        description: "Drop off the return or hand it to the assigned courier.",
        time: "Pending",
        icon: "local_shipping",
        complete: false,
    },
    {
        title: "Return inspection",
        description: "The returned item will be checked before final completion.",
        time: "Pending",
        icon: "fact_check",
        complete: false,
    },
];

// Checklist protects both buyer and seller by confirming the item is ready for inspection.
const returnChecklist = [
    {
        id: "packed-item",
        label: "I packed the item securely to avoid further damage.",
    },
    {
        id: "included-parts",
        label: "I included all parts, accessories, and packaging I received.",
    },
    {
        id: "not-used",
        label: "I have not used or altered the item after opening the dispute.",
    },
    {
        id: "understand-inspection",
        label:
            "I understand the return may be inspected before the refund is completed.",
    },
];

// Short tips keep the return instructions practical without crowding the main form.
const returnTips = [
    "Keep proof of drop-off or courier collection.",
    "Use the return reference on the package.",
];

export default function ReturnsPage() {
    // Return proof state stays local until tracking and upload endpoints are connected.
    const [checkedItems, setCheckedItems] = useState([]);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [proofFiles, setProofFiles] = useState([]);
    const [copiedReference, setCopiedReference] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [submittedAt, setSubmittedAt] = useState("");

    // Use a step count instead of a percentage because return progress is event-based.
    const currentStepIndex = useMemo(() => {
        const activeIndex = timeline.findIndex((step) => step.active);
        if (activeIndex !== -1) return activeIndex + 1;
        const completedCount = timeline.filter((step) => step.complete).length;
        return completedCount;
    }, []);

    const activeStepLabel = useMemo(() => {
        const activeStep = timeline.find((step) => step.active);

        if (activeStep) return activeStep.title;

        const allComplete = timeline.every((step) => step.complete);
        return allComplete ? "All steps complete" : "";
    }, []);

    // Warn only when the due date is close enough to require action soon.
    const isUrgent = useMemo(() => {
        const returnByDate = new Date(returnCase.returnBy);
        const now = new Date();
        const hoursUntilDue = (returnByDate - now) / (1000 * 60 * 60);
        return hoursUntilDue <= 48 && hoursUntilDue > 0;
    }, []);

    const checklistProgress = `${checkedItems.length}/${returnChecklist.length}`;

    const canSubmit = Boolean(
        checkedItems.length === returnChecklist.length &&
        (trackingNumber.trim().length >= 6 || proofFiles.length > 0)
    );

    function toggleChecklistItem(itemId) {
        // Checklist items are independent acknowledgements, not a single all-or-nothing toggle.
        setCheckedItems((current) =>
            current.includes(itemId)
                ? current.filter((id) => id !== itemId)
                : [...current, itemId]
        );
    }

    function copyReference() {
        // Return reference is the safest identifier to share with support or a courier.
        navigator.clipboard?.writeText(returnCase.id);
        setCopiedReference(true);

        window.setTimeout(() => {
            setCopiedReference(false);
        }, 2200);
    }

    function handleProofUpload(event) {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (!selectedFiles.length) return;

        // Keep proof uploads capped so the mobile form remains manageable.
        const availableSlots = 4 - proofFiles.length;

        const nextFiles = selectedFiles.slice(0, availableSlots).map((file) => ({
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
            size: file.size,
        }));

        setProofFiles((current) => [...current, ...nextFiles].slice(0, 4));
        event.target.value = "";
    }

    function removeProof(fileId) {
        setProofFiles((current) => current.filter((file) => file.id !== fileId));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!canSubmit) return;

        // Submitted state freezes the form into a confirmation view for the prototype.
        setSubmitted(true);
        setSubmittedAt(
            new Date().toLocaleTimeString("en-ZA", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Confirmation summary reuses the submitted proof state after the form is frozen.
    const submittedSummary = [
        { label: "Return reference", value: returnCase.id },
        { label: "Tracking / proof", value: trackingNumber.trim() || `${proofFiles.length} file(s) uploaded` },
        { label: "Checklist", value: `${checkedItems.length}/${returnChecklist.length} complete` },
        { label: "Submitted at", value: submittedAt || "Just now" },
    ];

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Returns"
                title={`Return ${returnCase.id}`}
                description="Follow return instructions, upload proof, and track the return linked to your refund."
                actions={
                    <>
                        <Link
                            to="/refund-status"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                arrow_back
                            </span>
                            Refund status
                        </Link>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Contact support
                            <span className="material-symbols-outlined text-[18px]">
                                support_agent
                            </span>
                        </Link>
                    </>
                }
            />

            {(copiedReference || submitted) && (
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
                            {copiedReference ? "Return reference copied" : "Return update saved"}
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            {copiedReference
                                ? "Use this reference when contacting support about the return."
                                : "In the full version, this update would be added to the return case."}
                        </p>
                    </div>
                </div>
            )}

            <section className="rounded-[30px] border border-[#c8ddd5] bg-white p-5 shadow-[0_14px_44px_rgba(0,53,39,.07)] md:p-6">
                <div className="flex flex-col gap-5">
                    <div className="min-w-0 flex-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <StatusBadge status={returnCase.status} label={returnCase.statusLabel} />
                        </div>

                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66736d]">
                            Return reference
                        </p>

                        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h2 className="text-3xl font-black tracking-[-0.05em] text-[#121c2a] md:text-4xl">
                                    Prepare this item for return
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#66736d] md:text-base">
                                    Pack the item, add the return reference, then upload tracking or handover proof so support can continue the refund process.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={copyReference}
                                className="no-print inline-flex w-fit shrink-0 items-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-4 py-2.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                {copiedReference ? "Copied" : "Copy reference"}
                                <span className="material-symbols-outlined text-[16px]">
                                    {copiedReference ? "check" : "content_copy"}
                                </span>
                            </button>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <HeaderMetric icon="event" label="Return by" value={returnCase.returnBy} />
                            <HeaderMetric icon="local_shipping" label="Method" value={returnCase.method} />
                            <HeaderMetric icon="payments" label="Linked refund" value={formatRand(returnCase.refundAmount)} />
                            <HeaderMetric icon="pin_drop" label="Return hub" value="Johannesburg" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <section className="space-y-6 lg:col-span-8">

                    {/* Fix #9: Urgency deadline banner — only shown if return is due within 48 hours */}
                    {isUrgent && (
                        <div className="flex items-start gap-3 rounded-[24px] border border-[#f5c842] bg-[#fff8e5] p-5">
                            <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#8a5a00]">
                                schedule
                            </span>
                            <div>
                                <p className="font-black text-[#8a5a00]">Return deadline approaching</p>
                                <p className="mt-1 text-sm leading-6 text-[#8a5a00]">
                                    This return is due by <span className="font-black">{returnCase.returnBy}</span>. Complete and submit your return update as soon as possible.
                                </p>
                            </div>
                        </div>
                    )}

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-5 md:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[24px]">
                                    inventory_2
                                </span>
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#003527]">
                                            Next step
                                        </p>
                                        <h2 className="mt-1 text-xl font-black text-[#121c2a]">
                                            Prepare the item before handover
                                        </h2>
                                    </div>
                                    <span className="inline-flex w-fit rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#003527]">
                                        Due {returnCase.returnBy}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm leading-7 text-[#405049]">
                                    Pack the item securely, include all parts and packaging, then upload a tracking number or proof once the courier drop-off or handover is done.
                                </p>
                            </div>
                        </div>
                    </section>

                    {submitted ? (
                        /* Fix #5: Post-submit frozen confirmation replaces the form */
                        <section className="rounded-[28px] border border-[#b7e4d1] bg-[#f0faf6] p-5 md:p-6">
                            <div className="mb-5 flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-white">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">check</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[#003527]">Return update submitted</h2>
                                    <p className="mt-1 text-sm leading-6 text-[#405049]">
                                        Your return update has been recorded. Support will review your proof and update the refund status.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3 rounded-[22px] border border-[#c8ddd5] bg-white p-4">
                                {submittedSummary.map((row) => (
                                    <SummaryRow key={row.label} label={row.label} value={row.value} />
                                ))}
                            </div>
                        </section>
                    ) : (
                        <form
                            id="return-update-form"
                            onSubmit={handleSubmit}
                            className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6"
                        >
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-[#121c2a]">
                                        Submit return update
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                        Confirm the item is ready, then add tracking or handover proof.
                                    </p>
                                </div>

                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">
                                    checklist
                                </span>
                                    {checklistProgress} checked
                            </span>
                            </div>

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                <section>
                                    <h3 className="mb-3 text-sm font-black text-[#121c2a]">
                                        Before handover checklist
                                    </h3>

                                    <div className="space-y-3">
                                        {returnChecklist.map((item) => {
                                            const checked = checkedItems.includes(item.id);

                                            return (
                                                <label
                                                    key={item.id}
                                                    className={`flex cursor-pointer items-start gap-3 rounded-[20px] border p-4 transition ${
                                                        checked
                                                            ? "border-[#b7e4d1] bg-[#f0faf6]"
                                                            : "border-[#e5ece8] bg-[#f8fbf9] hover:border-[#95d3ba]"
                                                    }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleChecklistItem(item.id)}
                                                        className="mt-1 h-4 w-4 accent-[#003527]"
                                                    />

                                                    <span className="text-sm font-bold leading-6 text-[#404944]">
                                                    {item.label}
                                                </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </section>

                                <section>
                                    <h3 className="mb-3 text-sm font-black text-[#121c2a]">
                                        Tracking or proof
                                    </h3>

                                    <label className="block">
                                    <span className="mb-2 block text-sm font-black text-[#121c2a]">
                                        Tracking or handover reference
                                    </span>

                                        <input
                                            type="text"
                                            value={trackingNumber}
                                            onChange={(event) => setTrackingNumber(event.target.value)}
                                            placeholder="Example: OM-RETURN-482913"
                                            className="w-full rounded-[20px] border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-4 text-sm font-semibold text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                        />
                                    </label>

                                    <label className="mt-4 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#bfc9c3] bg-[#f8fbf9] p-5 text-center transition hover:border-[#003527] hover:bg-[#f0faf6]">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            multiple
                                            className="sr-only"
                                            onChange={handleProofUpload}
                                            disabled={proofFiles.length >= 4}
                                        />

                                        <span className="material-symbols-outlined mb-3 text-[34px] text-[#003527]">
                                        upload_file
                                    </span>

                                        <span className="text-sm font-black text-[#003527]">
                                        Upload courier receipt or proof
                                    </span>

                                        <span className="mt-1 text-xs font-bold text-[#66736d]">
                                        {proofFiles.length}/4 selected
                                    </span>
                                    </label>

                                    {proofFiles.length > 0 ? (
                                        <div className="mt-4 space-y-3">
                                            {proofFiles.map((file) => (
                                                <ProofFileRow
                                                    key={file.id}
                                                    file={file}
                                                    onRemove={() => removeProof(file.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-4 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
                                            <p className="text-sm font-black text-[#121c2a]">
                                                No proof uploaded yet
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                                Add proof after drop-off or courier handover.
                                            </p>
                                        </div>
                                    )}
                                </section>
                            </div>

                            {/* Fix #4: in-form buttons hidden on mobile — bottom bar handles it there */}
                            <div className="mt-6 hidden flex-col gap-3 sm:flex-row sm:justify-end md:flex">
                                <Link
                                    to="/refund-status"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black shadow-[0_8px_24px_rgba(0,53,39,.18)] transition ${
                                        canSubmit
                                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                                    }`}
                                >
                                    Submit return update
                                    <span className="material-symbols-outlined text-[18px]">
                                    send
                                </span>
                                </button>
                            </div>

                            {/* Fix #8: explain disabled state */}
                            {!canSubmit && (
                                <p className="mt-3 hidden text-right text-xs font-bold text-[#66736d] md:block">
                                    Complete the checklist and add tracking or proof to submit.
                                </p>
                            )}
                        </form>
                    )} {/* end submitted ternary */}

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Return progress
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Track the return from approval to final inspection.
                                </p>
                            </div>

                            <StatusBadge
                                status={returnCase.status}
                                label={returnCase.statusLabel}
                            />
                        </div>

                        {/* Fix #6: Step indicator instead of misleading percentage bar */}
                        <div className="mb-6 rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
                            <div className="mb-3 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                <span>Return progress</span>
                                <span>Step {currentStepIndex} of {timeline.length}</span>
                            </div>

                            <div className="flex gap-2">
                                {timeline.map((step) => (
                                    <div
                                        key={step.title}
                                        className={`h-2 flex-1 rounded-full transition-all ${
                                            step.complete
                                                ? "bg-[#003527]"
                                                : step.active
                                                    ? "bg-[#fed65b]"
                                                    : "bg-[#e5ece8]"
                                        }`}
                                        title={step.title}
                                    />
                                ))}
                            </div>

                            <p className="mt-2 text-xs font-bold text-[#66736d]">
                                {activeStepLabel}
                            </p>
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
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Item to return
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                This seller package is linked to the return and refund.
                            </p>
                        </div>

                        <article className="rounded-[26px] border border-[#dbe6e1] bg-white p-4">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <img
                                    src={returnCase.image}
                                    alt={`Product photo for ${returnCase.product}`}
                                    className="h-24 w-full rounded-[22px] object-cover sm:h-28 sm:w-32"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className="text-xl font-black tracking-[-0.035em] text-[#121c2a]">
                                                {returnCase.product}
                                            </h3>

                                            <p className="mt-1 text-sm font-bold text-[#66736d]">
                                                {returnCase.seller} • Package {returnCase.packageId}
                                            </p>
                                        </div>

                                        <Link
                                            to="/order-details"
                                            className="inline-flex w-fit items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">
                                                receipt_long
                                            </span>
                                            View order
                                        </Link>
                                    </div>

                                    <div className="mt-4">
                                        <InfoPill icon="report" label="Reason" value={returnCase.reason} />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>

                </section>

                {/* Fix #10: sidebar activates at lg (1024px) not xl (1280px) to close the layout gap */}
                <aside className="hidden lg:col-span-4 lg:block">
                    <div className="space-y-6 lg:sticky lg:top-[88px] lg:pb-6">
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                                Return summary
                            </h2>

                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Return" value={returnCase.id} />
                                <SummaryRow label="Refund" value={returnCase.refundId} />
                                <SummaryRow label="Return by" value={returnCase.returnBy} />
                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
                                <span className="text-base font-black text-[#121c2a]">
                                    Linked refund
                                </span>
                                <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                                    {formatRand(returnCase.refundAmount)}
                                </span>
                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-3">
                                <Link
                                    to="/refund-status"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    View refund status
                                    <span className="material-symbols-outlined text-[18px]">
                                        payments
                                    </span>
                                </Link>
                            </div>
                        </section>

                    </div>
                </aside>
            </div>

            <ReturnSupportRows
                smsEnabled={smsEnabled}
                onToggleSms={() => setSmsEnabled((current) => !current)}
            />

            <MobileReturnActions canSubmit={canSubmit} />

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

// Header metrics surface deadline and refund context before the buyer reaches the form.
function HeaderMetric({ icon, label, value }) {
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
            <p className="truncate text-sm font-black text-[#121c2a]">{value}</p>
        </div>
    );
}

// Timeline rows show completed, active, and pending return stages in one shared pattern.
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

// Info pills keep package metadata compact inside the returned item section.
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

// Status badge keeps return state styling consistent with refund and dispute pages.
function StatusBadge({ status, label }) {
    const styles = {
        "return-required": "bg-[#fff8e5] text-[#8a5a00]",
        "in-transit": "bg-[#eaf4ff] text-[#1d5b8f]",
        inspecting: "bg-[#fff8e5] text-[#8a5a00]",
        completed: "bg-[#f0faf6] text-[#087052]",
        issue: "bg-[#fff0ec] text-[#9f2d20]",
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

// Proof file rows represent uploads that can still be removed before submission.
function ProofFileRow({ file, onRemove }) {
    return (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#e5ece8] bg-white p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    attach_file
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#121c2a]">
                    {file.name}
                </p>

                <p className="text-xs font-bold text-[#66736d]">
                    {formatFileSize(file.size)}
                </p>
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

// Summary rows keep return and refund references easy to scan in side panels.
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

// Support rows pair SMS status with help links without bringing back a heavy sidebar.
function ReturnSupportRows({ smsEnabled, onToggleSms }) {
    return (
        <section className="grid gap-4 lg:grid-cols-2">
            <section className="flex items-start justify-between gap-4 rounded-[24px] border border-[#c8ddd5] bg-[#f0faf6] p-5">
                <div className="flex min-w-0 items-start gap-3">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        sms
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-base font-black text-[#121c2a]">
                            Return updates
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#405049]">
                            {smsEnabled
                                ? "SMS updates are enabled for important return changes."
                                : "SMS updates are off. You can still check return progress here."}
                        </p>
                    </div>
                </div>

                <ToggleSwitch
                    checked={smsEnabled}
                    onChange={onToggleSms}
                    label={`Return SMS updates — currently ${smsEnabled ? "on" : "off"}`}
                />
            </section>

            <section className="rounded-[24px] border border-[#c8ddd5] bg-white p-5">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        shield_locked
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-base font-black text-[#121c2a]">
                            Buyer Protection return
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-[#405049]">
                            Open Market tracks handover proof, inspection, and refund progress.
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
                            Need to know
                        </h2>
                    </div>

                    <ul className="grid flex-1 gap-2 sm:grid-cols-2">
                        {returnTips.map((tip) => (
                            <li key={tip} className="flex items-start gap-2">
                                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[16px] text-[#003527]">
                                    check_circle
                                </span>
                                <span className="text-sm font-bold leading-6 text-[#405049]">
                                    {tip}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </section>
    );
}

// Mobile actions keep submit and refund status reachable after long return instructions.
function MobileReturnActions({ canSubmit }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <button
                    type="submit"
                    form="return-update-form"
                    disabled={!canSubmit}
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(0,53,39,.18)] transition ${
                        canSubmit
                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    Submit
                    <span className="material-symbols-outlined text-[18px]">
                        send
                    </span>
                </button>

                <Link
                    to="/refund-status"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Refund
                </Link>
            </div>
        </div>
    );
}

// File sizes are shown in friendly units so proof uploads are easier to verify.
function formatFileSize(bytes) {
    if (!bytes) return "0 KB";

    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) return `${Math.round(kilobytes)} KB`;

    return `${(kilobytes / 1024).toFixed(1)} MB`;
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
