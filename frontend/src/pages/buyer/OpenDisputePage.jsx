import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype order context links the dispute form back to a protected marketplace order.
const order = {
    id: "OM-24091",
    placedAt: "22 June 2026",
    paymentStatus: "Protected",
    total: 2773,
};

// Each seller package can become a separate dispute because multi-seller orders resolve independently.
const packages = [
    {
        id: "pkg-kasi-kicks",
        seller: "Kasi Kicks",
        status: "Delivered",
        itemCount: 1,
        product: "Classic white everyday sneakers",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&q=80",
    },
    {
        id: "pkg-urban-thread",
        seller: "Urban Thread",
        status: "In progress",
        itemCount: 2,
        product: "Oversized neutral cotton hoodie",
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=260&q=80",
    },
    {
        id: "pkg-local-carry",
        seller: "Local Carry",
        status: "In progress",
        itemCount: 1,
        product: "Canvas weekender bag",
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=260&q=80",
    },
];

// Issue choices are intentionally plain-language so buyers can self-select without legal wording.
const issueTypes = [
    {
        id: "not-received",
        title: "Item not received",
        description: "The package was marked delivered, but you did not receive it.",
        icon: "local_shipping",
    },
    {
        id: "damaged",
        title: "Damaged item",
        description: "The product arrived broken, torn, stained, or unusable.",
        icon: "broken_image",
    },
    {
        id: "not-as-described",
        title: "Not as described",
        description: "The item is different from the listing photos or description.",
        icon: "description",
    },
    {
        id: "missing-items",
        title: "Missing items",
        description: "Part of the package or order is missing.",
        icon: "inventory_2",
    },
];

// Resolution choices describe what the buyer wants support or the seller to do next.
const resolutionOptions = [
    {
        id: "refund",
        title: "Request refund",
        description: "Ask for a refund review for this package.",
        icon: "payments",
    },
    {
        id: "return",
        title: "Return item",
        description: "Request instructions to return the item.",
        icon: "assignment_return",
    },
    {
        id: "seller-help",
        title: "Seller to resolve",
        description: "Ask the seller to provide a replacement or explanation.",
        icon: "support_agent",
    },
];

// Support tips reinforce the evidence quality needed for a fair review.
const supportTips = [
    "Include clear photos if the item is damaged or different.",
    "Explain what happened using simple, specific details.",
    "Do not confirm receipt if you have not received or checked the item.",
    "Keep communication inside the platform for safety.",
];

export default function OpenDisputePage() {
    // Form state stays local until dispute creation is connected to the backend.
    const [selectedPackageId, setSelectedPackageId] = useState(packages[0].id);
    const [selectedIssue, setSelectedIssue] = useState("");
    const [selectedResolution, setSelectedResolution] = useState("");
    const [details, setDetails] = useState("");
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [contactSellerFirst, setContactSellerFirst] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const selectedPackage = packages.find(
        (sellerPackage) => sellerPackage.id === selectedPackageId
    );

    // Require every decision point plus a meaningful description before enabling submit.
    const canSubmit = Boolean(
        selectedPackage &&
        selectedIssue &&
        selectedResolution &&
        details.trim().length >= 30 &&
        agreed
    );

    const selectedIssueLabel = useMemo(() => {
        return issueTypes.find((issue) => issue.id === selectedIssue)?.title;
    }, [selectedIssue]);

    const selectedResolutionLabel = useMemo(() => {
        return resolutionOptions.find((option) => option.id === selectedResolution)
            ?.title;
    }, [selectedResolution]);

    const progressItems = useMemo(
        // The same progress model drives the sidebar checklist and compact mobile guidance.
        () => [
            {
                label: "Package selected",
                complete: Boolean(selectedPackage),
            },
            {
                label: "Issue selected",
                complete: Boolean(selectedIssue),
            },
            {
                label: "Resolution selected",
                complete: Boolean(selectedResolution),
            },
            {
                label: "Details added",
                complete: details.trim().length >= 30,
                helper: `${Math.min(details.trim().length, 30)}/30 characters`,
            },
            {
                label: "Confirmation checked",
                complete: agreed,
            },
        ],
        [agreed, details, selectedIssue, selectedPackage, selectedResolution]
    );

    const completedSteps = progressItems.filter((item) => item.complete).length;

    function handleEvidenceUpload(event) {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (!selectedFiles.length) return;

        // Limit evidence to five files so the prototype mirrors a realistic upload cap.
        const availableSlots = 5 - evidenceFiles.length;

        const nextFiles = selectedFiles.slice(0, availableSlots).map((file) => ({
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
            size: file.size,
            type: file.type || "File",
        }));

        setEvidenceFiles((current) => [...current, ...nextFiles].slice(0, 5));
        event.target.value = "";
    }

    function removeEvidence(fileId) {
        setEvidenceFiles((current) => current.filter((file) => file.id !== fileId));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!canSubmit) return;

        // Keep the submitted state on-page for prototype review instead of navigating away.
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="space-y-6 pb-[calc(var(--bottom-nav-height,77px)+106px)] md:space-y-8 md:pb-12">
            <BuyerPageHeader
                eyebrow="Open dispute"
                title="Report a problem with an order"
                description="Tell us what went wrong so the issue can be reviewed fairly."
                actions={
                    <>
                        <Link
                            to="/order-details"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                arrow_back
                            </span>
                            Order details
                        </Link>

                        <Link
                            to="/disputes"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            View disputes
                            <span className="material-symbols-outlined text-[18px]">
                                gavel
                            </span>
                        </Link>
                    </>
                }
            />

            {submitted && (
                <div
                    className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5"
                    role="status"
                    aria-live="polite"
                >
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        check_circle
                    </span>

                    <div className="min-w-0 flex-1">
                        <h2 className="mb-1 font-black text-[#003527]">
                            Dispute draft submitted
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            In the full version, this dispute would be saved and reviewed by
                            support. You can track it from the disputes page.
                        </p>
                    </div>

                    <Link
                        to="/disputes"
                        className="hidden shrink-0 rounded-2xl bg-[#003527] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#064e3b] sm:inline-flex"
                    >
                        View disputes
                    </Link>
                </div>
            )}

            <section className="rounded-[28px] border border-[#efc5bd] bg-white p-5 shadow-[0_12px_36px_rgba(159,45,32,.08)] md:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff8f6] text-[#9f2d20] md:h-14 md:w-14">
                            <span className="material-symbols-outlined icon-fill text-[28px] md:text-[32px]">
                                report
                            </span>
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9f2d20]">
                                Buyer Protection case
                            </p>

                            <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[#121c2a] md:text-3xl">
                                Open dispute for order {order.id}
                            </h2>

                            <p className="mt-2 max-w-3xl text-sm leading-7 text-[#66736d]">
                                Use this when an item is missing, damaged, incorrect, or very
                                different from the listing. Payment stays protected while support
                                reviews the case.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4 lg:min-w-[280px]">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                            <span>{order.placedAt}</span>
                            <span className="h-1 w-1 rounded-full bg-[#bfc9c3]" />
                            <span>{packages.length} packages</span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">
                                    shield_locked
                                </span>
                                {order.paymentStatus} payment
                            </span>

                            <span className="text-sm font-black text-[#121c2a]">
                                {formatRand(order.total)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <form
                        id="open-dispute-form"
                        onSubmit={handleSubmit}
                        className="space-y-5 md:space-y-6"
                    >
                        <StepCard step="1" title="Which package has the problem?" description="Choose the seller package linked to the issue.">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                                {packages.map((sellerPackage) => (
                                    <PackageCard
                                        key={sellerPackage.id}
                                        sellerPackage={sellerPackage}
                                        selected={selectedPackageId === sellerPackage.id}
                                        onSelect={() => setSelectedPackageId(sellerPackage.id)}
                                    />
                                ))}
                            </div>
                        </StepCard>

                        <StepCard step="2" title="What went wrong?" description="Select the issue that best matches your problem.">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                                {issueTypes.map((issue) => (
                                    <IssueTypeCard
                                        key={issue.id}
                                        issue={issue}
                                        selected={selectedIssue === issue.id}
                                        onSelect={() => setSelectedIssue(issue.id)}
                                    />
                                ))}
                            </div>
                        </StepCard>

                        <StepCard step="3" title="What outcome do you want?" description="Choose the resolution you would like support to review.">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                                {resolutionOptions.map((option) => (
                                    <ResolutionCard
                                        key={option.id}
                                        option={option}
                                        selected={selectedResolution === option.id}
                                        onSelect={() => setSelectedResolution(option.id)}
                                    />
                                ))}
                            </div>
                        </StepCard>

                        <StepCard step="4" title="Explain the issue and add evidence" description="Clear details and photos help support understand the problem faster.">
                            <label className="block">
                                <span className="sr-only">Dispute details</span>
                                <textarea
                                    value={details}
                                    onChange={(event) =>
                                        setDetails(event.target.value.slice(0, 900))
                                    }
                                    rows={7}
                                    placeholder="Example: The sneakers arrived with visible damage on the side. The listing showed them as new and clean, but the package had..."
                                    className="w-full resize-none rounded-[22px] border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-4 text-sm font-semibold leading-7 text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                />
                            </label>

                            <div className="mt-3 flex flex-col gap-2 text-xs font-bold text-[#66736d] sm:flex-row sm:items-center sm:justify-between">
                                <span>Minimum 30 characters required.</span>
                                <span>{details.length}/900</span>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#bfc9c3] bg-[#f8fbf9] p-5 text-center transition hover:border-[#003527] hover:bg-[#f0faf6]">
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        multiple
                                        className="sr-only"
                                        onChange={handleEvidenceUpload}
                                        disabled={evidenceFiles.length >= 5}
                                    />

                                    <span className="material-symbols-outlined mb-3 text-[34px] text-[#003527]">
                                        upload_file
                                    </span>

                                    <span className="text-sm font-black text-[#003527]">
                                        Add up to 5 files
                                    </span>

                                    <span className="mt-1 text-xs font-bold text-[#66736d]">
                                        {evidenceFiles.length}/5 selected
                                    </span>
                                </label>

                                <div className="space-y-3">
                                    {evidenceFiles.length > 0 ? (
                                        evidenceFiles.map((file) => (
                                            <EvidenceFileRow
                                                key={file.id}
                                                file={file}
                                                onRemove={() => removeEvidence(file.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="rounded-[24px] border border-[#e5ece8] bg-white p-5">
                                            <p className="text-sm font-black text-[#121c2a]">
                                                No evidence added yet
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                                Evidence is optional in this prototype, but it helps
                                                support review the issue faster.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </StepCard>

                        <StepCard step="5" title="Confirm before submitting" description="Only submit accurate information. Support may review order details, messages, and evidence.">
                            <div className="grid gap-3">
                                <ToggleRow
                                    title="I contacted or tried to contact the seller first"
                                    description="Optional, but it may help resolve simple issues faster."
                                    checked={contactSellerFirst}
                                    onChange={setContactSellerFirst}
                                />

                                <label className="flex cursor-pointer items-start gap-3 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4 transition hover:border-[#95d3ba]">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(event) => setAgreed(event.target.checked)}
                                        className="mt-1 h-4 w-4 accent-[#003527]"
                                    />

                                    <span className="text-sm font-bold leading-6 text-[#404944]">
                                        I confirm the information is accurate and understand support
                                        may review order details, messages, and uploaded evidence.
                                    </span>
                                </label>
                            </div>

                            <div className="mt-5 rounded-[22px] border border-[#c8ddd5] bg-[#f0faf6] p-4 md:hidden">
                                <h3 className="mb-3 text-sm font-black text-[#121c2a]">
                                    Dispute progress
                                </h3>
                                <ProgressChecklist items={progressItems} compact />
                            </div>

                            <div className="mt-6 hidden flex-col gap-3 sm:flex-row sm:justify-end md:flex">
                                <Link
                                    to="/order-details"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black shadow-[0_8px_24px_rgba(159,45,32,.18)] transition ${
                                        canSubmit
                                            ? "bg-[#9f2d20] text-white hover:bg-[#7e241a]"
                                            : "cursor-not-allowed bg-[#eadedb] text-[#8f7c78]"
                                    }`}
                                >
                                    Submit dispute
                                    <span className="material-symbols-outlined text-[18px]">
                                        send
                                    </span>
                                </button>
                            </div>
                        </StepCard>
                    </form>
                </section>

                <aside className="hidden space-y-6 xl:col-span-4 xl:block">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                Dispute summary
                            </h2>

                            <span className="rounded-full bg-[#fff8f6] px-3 py-1.5 text-xs font-black text-[#9f2d20]">
                                {completedSteps}/5 complete
                            </span>
                        </div>

                        {selectedPackage && (
                            <div className="mb-5 overflow-hidden rounded-[24px] border border-[#e5ece8]">
                                <img
                                    src={selectedPackage.image}
                                    alt={`${selectedPackage.seller} package`}
                                    className="h-40 w-full object-cover"
                                />

                                <div className="p-4">
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <h3 className="font-black text-[#121c2a]">
                                            {selectedPackage.seller}
                                        </h3>

                                        <span className="rounded-full bg-[#f8fbf9] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#66736d]">
                                            {selectedPackage.status}
                                        </span>
                                    </div>

                                    <p className="text-sm font-bold leading-6 text-[#66736d]">
                                        {selectedPackage.product}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                            <SummaryRow label="Order" value={order.id} />
                            <SummaryRow
                                label="Package"
                                value={selectedPackage?.seller ?? "Not selected"}
                            />
                            <SummaryRow
                                label="Issue"
                                value={selectedIssueLabel ?? "Not selected"}
                            />
                            <SummaryRow
                                label="Resolution"
                                value={selectedResolutionLabel ?? "Not selected"}
                            />
                            <SummaryRow
                                label="Evidence"
                                value={`${evidenceFiles.length} file${
                                    evidenceFiles.length === 1 ? "" : "s"
                                }`}
                            />
                        </div>

                        <div className="mt-5 border-b border-[#e5ece8] pb-5">
                            <h3 className="mb-3 text-sm font-black text-[#121c2a]">
                                Case progress
                            </h3>
                            <ProgressChecklist items={progressItems} />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <button
                                type="submit"
                                form="open-dispute-form"
                                disabled={!canSubmit}
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black shadow-[0_8px_24px_rgba(159,45,32,.18)] transition ${
                                    canSubmit
                                        ? "bg-[#9f2d20] text-white hover:bg-[#7e241a]"
                                        : "cursor-not-allowed bg-[#eadedb] text-[#8f7c78]"
                                }`}
                            >
                                Submit dispute
                                <span className="material-symbols-outlined text-[18px]">
                                    gavel
                                </span>
                            </button>

                            <Link
                                to="/trust-safety"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Buyer Protection
                                <span className="material-symbols-outlined text-[18px]">
                                    shield_locked
                                </span>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
                            tips_and_updates
                        </span>

                        <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                            Dispute tips
                        </h2>

                        <ul className="space-y-3">
                            {supportTips.map((tip) => (
                                <li key={tip} className="flex items-start gap-3">
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
                </aside>
            </div>

            <MobileDisputeActions canSubmit={canSubmit} />

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

// Step cards split the dispute form into one decision per section.
function StepCard({ step, title, description, children }) {
    return (
        <section className="rounded-[24px] border border-[#dbe6e1] bg-white p-4 shadow-[0_8px_28px_rgba(0,53,39,.05)] md:rounded-[28px] md:p-6">
            <div className="mb-5 flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#fff8f6] text-sm font-black text-[#9f2d20] md:h-10 md:w-10">
                    {step}
                </div>

                <div className="min-w-0">
                    <h2 className="text-lg font-black text-[#121c2a] md:text-xl">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </section>
    );
}

// Package cards make the selected seller package explicit before the buyer describes the issue.
function PackageCard({ sellerPackage, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`flex overflow-hidden rounded-[22px] border text-left transition md:block ${
                selected
                    ? "border-[#003527] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.08)]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba]"
            }`}
            aria-pressed={selected}
        >
            <img
                src={sellerPackage.image}
                alt={`${sellerPackage.seller} package`}
                className="h-auto w-24 shrink-0 object-cover md:h-28 md:w-full"
            />

            <div className="min-w-0 flex-1 p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-black text-[#121c2a]">{sellerPackage.seller}</h3>

                    {selected && (
                        <span className="material-symbols-outlined icon-fill text-[20px] text-[#003527]">
                            check_circle
                        </span>
                    )}
                </div>

                <p className="line-clamp-2 text-sm font-bold leading-5 text-[#66736d]">
                    {sellerPackage.product}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f8fbf9] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-[#66736d]">
                        {sellerPackage.status}
                    </span>

                    <span className="text-xs font-bold text-[#66736d]">
                        {sellerPackage.itemCount} item{sellerPackage.itemCount === 1 ? "" : "s"}
                    </span>
                </div>
            </div>
        </button>
    );
}

// Issue type cards use radio semantics through buttons for a faster mobile selection flow.
function IssueTypeCard({ issue, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`rounded-[22px] border p-4 text-left transition md:p-5 ${
                selected
                    ? "border-[#9f2d20] bg-[#fff8f6] shadow-[0_8px_24px_rgba(159,45,32,.08)]"
                    : "border-[#dbe6e1] bg-white hover:border-[#efc5bd]"
            }`}
            aria-pressed={selected}
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff8f6] text-[#9f2d20]">
                    <span className="material-symbols-outlined icon-fill">
                        {issue.icon}
                    </span>
                </div>

                {selected && (
                    <span className="material-symbols-outlined icon-fill text-[22px] text-[#9f2d20]">
                        check_circle
                    </span>
                )}
            </div>

            <h3 className="font-black text-[#121c2a]">{issue.title}</h3>

            <p className="mt-2 text-sm leading-6 text-[#66736d]">
                {issue.description}
            </p>
        </button>
    );
}

// Resolution cards capture the preferred outcome separately from the issue category.
function ResolutionCard({ option, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`rounded-[22px] border p-4 text-left transition md:p-5 ${
                selected
                    ? "border-[#003527] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.08)]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba]"
            }`}
            aria-pressed={selected}
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                    <span className="material-symbols-outlined icon-fill">
                        {option.icon}
                    </span>
                </div>

                {selected && (
                    <span className="material-symbols-outlined icon-fill text-[22px] text-[#003527]">
                        check_circle
                    </span>
                )}
            </div>

            <h3 className="font-black text-[#121c2a]">{option.title}</h3>

            <p className="mt-2 text-sm leading-6 text-[#66736d]">
                {option.description}
            </p>
        </button>
    );
}

// Evidence rows show upload metadata while keeping removal available before submit.
function EvidenceFileRow({ file, onRemove }) {
    return (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#e5ece8] bg-white p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff8f6] text-[#9f2d20]">
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

// Toggle rows collect optional confirmations without turning them into primary actions.
function ToggleRow({ title, description, checked, onChange }) {
    return (
        <div className="flex items-start justify-between gap-4 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div>
                <h3 className="font-black text-[#121c2a]">{title}</h3>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {description}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    checked ? "bg-[#003527]" : "bg-[#dbe6e1]"
                }`}
                role="switch"
                aria-checked={checked}
                aria-label={title}
            >
                <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        checked ? "translate-x-5" : "translate-x-0"
                    }`}
                />
            </button>
        </div>
    );
}

// Summary rows keep the sidebar review compact and easy to scan.
function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// Progress checklist turns validation requirements into visible completion feedback.
function ProgressChecklist({ items, compact = false }) {
    return (
        <ul className={compact ? "grid gap-2" : "space-y-3"}>
            {items.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                    <span
                        className={`material-symbols-outlined icon-fill shrink-0 text-[19px] ${
                            item.complete ? "text-[#003527]" : "text-[#b6c4bd]"
                        }`}
                    >
                        {item.complete ? "check_circle" : "radio_button_unchecked"}
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-bold text-[#405049]">
                        {item.label}
                    </span>

                    {item.helper && !item.complete && (
                        <span className="text-xs font-black text-[#9f2d20]">
                            {item.helper}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}

// Mobile actions keep submit and the disputes list reachable below the long form.
function MobileDisputeActions({ canSubmit }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <button
                    type="submit"
                    form="open-dispute-form"
                    disabled={!canSubmit}
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(159,45,32,.18)] transition ${
                        canSubmit
                            ? "bg-[#9f2d20] text-white hover:bg-[#7e241a]"
                            : "cursor-not-allowed bg-[#eadedb] text-[#8f7c78]"
                    }`}
                >
                    Submit
                    <span className="material-symbols-outlined text-[18px]">send</span>
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

// File sizes are shown in friendly units so evidence uploads are easier to verify.
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
