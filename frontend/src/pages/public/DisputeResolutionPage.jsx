import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const eligibilityOptions = [
    {
        value: "not-received",
        icon: "package_2",
        title: "Order not received",
        description: "The order is marked as delivered, but you have not received it.",
        tone: "eligible",
        guidance:
            "This may qualify for a dispute. Do not confirm receipt. Check the delivery details, contact the seller when appropriate, and open the affected order if the issue remains unresolved.",
    },
    {
        value: "wrong-item",
        icon: "wrong_location",
        title: "Wrong product received",
        description: "The delivered or collected product is different from what you ordered.",
        tone: "eligible",
        guidance:
            "This may qualify for a dispute. Keep the item and packaging, take clear photos, and avoid confirming receipt until the issue is addressed.",
    },
    {
        value: "damaged",
        icon: "broken_image",
        title: "Damaged or defective item",
        description: "The item arrived damaged, defective, or unusable and this was not disclosed.",
        tone: "eligible",
        guidance:
            "This may qualify for a dispute. Photograph the item, packaging, and visible damage before using, repairing, or disposing of anything.",
    },
    {
        value: "not-described",
        icon: "description",
        title: "Product not as described",
        description: "Important details such as condition, size, colour, or quantity do not match the listing.",
        tone: "eligible",
        guidance:
            "This may qualify for a dispute when the difference is significant. Save screenshots of the original listing and photograph what you received.",
    },
    {
        value: "missing",
        icon: "inventory",
        title: "Missing item or part",
        description: "Part of the order, an accessory, or an advertised component is missing.",
        tone: "eligible",
        guidance:
            "This may qualify for a dispute. Check the full package, photograph the contents, and contact the seller or report the issue from the order.",
    },
    {
        value: "collection",
        icon: "storefront",
        title: "Collection problem",
        description: "The item was unavailable, incorrect, or could not be collected as agreed.",
        tone: "eligible",
        guidance:
            "This may qualify for support. Keep the collection details, messages, location, time, and any confirmation code connected to the handover.",
    },
    {
        value: "changed-mind",
        icon: "change_circle",
        title: "I changed my mind",
        description: "The order is correct, but you no longer want the item.",
        tone: "return",
        guidance:
            "This is usually handled through the seller's return terms rather than the dispute process. Check the listing and return policy, then contact the seller.",
    },
];

const buyerSteps = [
    {
        number: "01",
        icon: "receipt_long",
        title: "Open the order",
        text: "Go to My Orders and select the purchase that has a problem.",
    },
    {
        number: "02",
        icon: "chat",
        title: "Contact the seller when appropriate",
        text: "Explain the problem clearly when it is safe to do so. For suspected fraud, account security concerns, or urgent payment issues, contact support immediately.",
    },
    {
        number: "03",
        icon: "report",
        title: "Open a dispute",
        text: "Choose the reason, describe what happened, and attach relevant evidence.",
    },
    {
        number: "04",
        icon: "fact_check",
        title: "Support reviews the case",
        text: "Open Market reviews the order, listing, messages, fulfilment records, and evidence from both parties.",
    },
    {
        number: "05",
        icon: "handshake",
        title: "Receive the next action",
        text: "Both parties are notified when more information, a return, a refund, payout, or another resolution is required.",
        accent: true,
    },
];

const sellerSteps = [
    {
        number: "01",
        icon: "notifications",
        title: "Receive notification",
        text: "You are notified when a buyer opens a dispute linked to one of your orders.",
    },
    {
        number: "02",
        icon: "visibility",
        title: "Review the complaint",
        text: "Read the buyer's explanation and check the order, listing, and fulfilment details.",
    },
    {
        number: "03",
        icon: "upload_file",
        title: "Provide evidence",
        text: "Submit genuine product, delivery, collection, tracking, or communication evidence before the stated deadline.",
    },
    {
        number: "04",
        icon: "support_agent",
        title: "Cooperate with support",
        text: "Answer questions and complete any requested steps while the order is under review.",
    },
    {
        number: "05",
        icon: "gavel",
        title: "Follow the resolution",
        text: "Complete any return, refund, replacement, payout, or other action communicated through the case.",
        accent: true,
    },
];

const evidenceChecklist = [
    {
        id: "photos",
        icon: "photo_camera",
        title: "Photos or video",
        text: "Show the item, packaging, damage, missing parts, or incorrect product clearly.",
    },
    {
        id: "order",
        icon: "receipt",
        title: "Order number and dates",
        text: "Include the affected order and important delivery or collection dates.",
    },
    {
        id: "messages",
        icon: "chat",
        title: "Relevant messages",
        text: "Include communication that shows what was agreed and how the issue was handled.",
    },
    {
        id: "delivery",
        icon: "local_shipping",
        title: "Delivery or collection evidence",
        text: "Add tracking, courier records, collection details, codes, or handover information.",
    },
    {
        id: "listing",
        icon: "description",
        title: "Original listing details",
        text: "Save the product photos, description, condition, size, colour, and quantity shown when you ordered.",
    },
    {
        id: "summary",
        icon: "edit_note",
        title: "A clear issue summary",
        text: "Explain what you expected, what happened, and the resolution you are requesting.",
    },
];

const resolutionActions = [
    {
        icon: "currency_exchange",
        title: "Full refund",
        text: "A full refund may be approved when the evidence and policy support it.",
    },
    {
        icon: "percent",
        title: "Partial refund",
        text: "A partial refund may be considered when the buyer keeps an item with a supported issue.",
    },
    {
        icon: "undo",
        title: "Return and refund",
        text: "The buyer may need to return the item before an approved refund is completed.",
    },
    {
        icon: "swap_horiz",
        title: "Replacement",
        text: "The seller and buyer may agree to replace a damaged, incorrect, or missing item.",
    },
];

const reviewDecisions = [
    {
        icon: "payments",
        title: "Seller payout proceeds",
        text: "Payout may continue when the order was fulfilled correctly and the dispute is not upheld.",
    },
    {
        icon: "cancel",
        title: "Dispute declined",
        text: "A claim may be declined when it falls outside policy or the evidence does not support it.",
    },
    {
        icon: "more_time",
        title: "More information requested",
        text: "Support may ask either party for more evidence before deciding the next action.",
    },
];

const disputeStatuses = [
    {
        icon: "send",
        title: "Submitted",
        text: "The dispute has been created and linked to the affected order.",
    },
    {
        icon: "hourglass_top",
        title: "Awaiting response",
        text: "The other party or support team is expected to provide information.",
    },
    {
        icon: "manage_search",
        title: "Under review",
        text: "Order details and evidence are being assessed.",
    },
    {
        icon: "upload_file",
        title: "More information needed",
        text: "Additional evidence or clarification is required before review continues.",
    },
    {
        icon: "task_alt",
        title: "Resolved",
        text: "A decision or required next action has been communicated.",
    },
    {
        icon: "lock",
        title: "Closed",
        text: "The case is complete and no further action is currently pending.",
    },
];

const faqs = [
    {
        question: "Can I open a dispute after confirming receipt?",
        answer:
            "The available options may depend on the order status and applicable platform rules. Open the issue as soon as possible and contact support if the dispute option is no longer available.",
    },
    {
        question: "Can a seller ask for a resolution review?",
        answer:
            "A seller should follow any review or appeal instructions shown in the dispute decision. Include the case reference and any new, relevant evidence when contacting support.",
    },
    {
        question: "Can I add evidence after submitting?",
        answer:
            "Additional evidence may be requested or accepted while the case is still open. Use the dispute page or follow the instructions sent with the case update.",
    },
    {
        question: "What happens if the other party does not respond?",
        answer:
            "Support may continue using the information available and any applicable platform rules. Missing a requested response can affect the review, but it does not automatically guarantee an outcome.",
    },
    {
        question: "Can I cancel a dispute after opening it?",
        answer:
            "You may be able to close the dispute if the issue has been resolved. Only close it after the agreed solution has actually been completed.",
    },
];

export default function DisputeResolutionPage() {
    const [activeJourney, setActiveJourney] = useState("buyer");
    const [selectedIssue, setSelectedIssue] = useState("not-received");
    const [checkedEvidence, setCheckedEvidence] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);

    const activeSteps = activeJourney === "buyer" ? buyerSteps : sellerSteps;

    const selectedIssueData = useMemo(
        () => eligibilityOptions.find((item) => item.value === selectedIssue),
        [selectedIssue]
    );

    function toggleEvidence(id) {
        setCheckedEvidence((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    return (
        <PublicLayout>
            <style>{`
        .dispute-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        /* Icon font fallback — hide broken placeholder box if Material Symbols fails */
        .material-symbols-outlined {
          font-display: swap;
        }
        @supports not (font-variation-settings: normal) {
          .material-symbols-outlined { display: none; }
        }
        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Step badge — fixed width so text never overlaps at narrow viewports */
        .dispute-step-badge {
          min-width: 44px;
          width: 44px;
        }

        .dispute-step:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 23px;
          top: 48px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #003527, rgba(149,211,186,.3));
        }

        /* Mobile eligibility select */
        .eligibility-select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23003527' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center;
          padding: 14px 44px 14px 16px;
          font-size: 14px;
          font-weight: 700;
          color: #121c2a;
          cursor: pointer;
          outline: none;
          transition: border-color .18s, box-shadow .18s;
          box-shadow: 0 2px 8px rgba(0,53,39,.06);
        }
        .eligibility-select:focus {
          border-color: #003527;
          box-shadow: 0 0 0 3px rgba(0,53,39,.1);
        }

        @media (min-width: 768px) {
          .dispute-steps {
            position: relative;
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }

          .dispute-steps::before {
            content: "";
            position: absolute;
            left: 55px;
            right: 55px;
            top: 23px;
            height: 2px;
            background: linear-gradient(to right, #95d3ba, rgba(149,211,186,.25));
          }

          .dispute-step {
            display: block;
            padding: 0 12px;
            text-align: center;
          }

          .dispute-step:not(:last-child)::before { display: none; }
        }
      `}</style>

            <main className="bg-[#f6f9f7]">
                {/* Compact hero */}
                <section className="dispute-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-10 md:py-16">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">handshake</span>
                                Dispute resolution
                            </span>

                            <h1 className="my-5 text-[38px] font-black leading-[1.04] tracking-[-0.05em] text-white md:text-[54px]">
                                Get help with an <span className="text-[#fed65b]">order problem.</span>
                            </h1>

                            <p className="max-w-[660px] text-[16px] leading-8 text-white/70 md:text-[17px]">
                                Learn when to open a dispute, what evidence to provide, and what happens while Open Market reviews the case.
                            </p>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/my-orders"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#fed65b] px-7 py-4 text-[15px] font-black text-[#3a2e00] shadow-[0_12px_32px_rgba(254,214,91,.35)] transition hover:opacity-90"
                                >
                                    Open My Orders
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/25 px-7 py-4 text-[15px] font-black text-white transition hover:bg-white/10"
                                >
                                    Contact support
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                </Link>
                            </div>

                            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#fed65b]/40 bg-[#fed65b]/10 p-4">
                                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[20px] text-[#fed65b]">warning</span>
                                <p className="text-sm font-bold leading-6 text-white/90">
                                    <strong className="text-white">Do not confirm receipt</strong> when there is a serious problem. Report the issue before confirming delivery or collection — any applicable deadline is shown in the order.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility decision tool */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.05)] md:p-8">
                        <div className="mb-7 max-w-3xl">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Check your issue</p>
                            <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">Is this a dispute issue?</h2>
                            <p className="text-sm leading-7 text-[#404944] md:text-base">
                                Select the problem that best matches your order. This guidance helps you choose the correct next step.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                            {/* Mobile: native select dropdown */}
                            <div className="lg:col-span-7 sm:hidden">
                                <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-[#003527]">
                                    Select your issue
                                </label>
                                <select
                                    className="eligibility-select"
                                    value={selectedIssue}
                                    onChange={(e) => setSelectedIssue(e.target.value)}
                                    aria-label="Select dispute issue type"
                                >
                                    {eligibilityOptions.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-2 text-xs text-[#66736d]">
                                    {eligibilityOptions.find(o => o.value === selectedIssue)?.description}
                                </p>
                            </div>

                            {/* Tablet/Desktop: card grid */}
                            <div className="hidden sm:grid sm:grid-cols-2 gap-2 lg:col-span-7">
                                {eligibilityOptions.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => setSelectedIssue(item.value)}
                                        aria-pressed={selectedIssue === item.value}
                                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                                            selectedIssue === item.value
                                                ? "border-[#003527] bg-[#f0faf6] shadow-[0_4px_18px_rgba(0,53,39,.08)]"
                                                : "border-[#dbe6e1] bg-white hover:border-[#95d3ba] hover:bg-[#f8fbf9]"
                                        }`}
                                    >
                                        <span className="shrink-0 text-[#003527]">
                                            <span className="material-symbols-outlined icon-fill text-[28px]">{item.icon}</span>
                                        </span>
                                        <span>
                                            <span className="block text-sm font-black text-[#121c2a]">{item.title}</span>
                                            <span className="mt-1 block text-xs leading-5 text-[#66736d]">{item.description}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className={`rounded-[24px] border p-6 lg:col-span-5 ${
                                selectedIssueData?.tone === "return"
                                    ? "border-[#fde68a] bg-[#fffdf4]"
                                    : "border-[#b7e4d1] bg-[#f0faf6]"
                            }`}>
                                <span className={`material-symbols-outlined icon-fill mb-4 block text-[32px] ${
                                    selectedIssueData?.tone === "return" ? "text-[#854d0e]" : "text-[#003527]"
                                }`}>
                                    {selectedIssueData?.tone === "return" ? "assignment_return" : "verified_user"}
                                </span>
                                <p className={`mb-2 text-xs font-black uppercase tracking-[0.16em] ${
                                    selectedIssueData?.tone === "return" ? "text-[#854d0e]" : "text-[#003527]"
                                }`}>
                                    Recommended next step
                                </p>
                                <h3 className="mb-3 text-xl font-black text-[#121c2a]">{selectedIssueData?.title}</h3>
                                <p className="text-sm leading-7 text-[#404944]">{selectedIssueData?.guidance}</p>

                                {selectedIssueData?.tone === "eligible" ? (
                                    <div className="mt-6 space-y-3">
                                        <Link
                                            to="/my-orders"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                        >
                                            Open affected order
                                            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                                        </Link>
                                        <p className="text-center text-xs text-[#66736d]">Report from the order to link it to the correct case</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 space-y-3">
                                        <Link
                                            to="/help-centre"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d6a52c] bg-white px-5 py-4 text-sm font-black text-[#854d0e] transition hover:bg-[#fff8dd]"
                                        >
                                            Review return guidance
                                            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                                        </Link>
                                        <p className="text-center text-xs text-[#66736d]">Contact the seller about their return terms first</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Buyer / seller process */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.06)] md:p-10">
                        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <div className="max-w-2xl">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Step-by-step process</p>
                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">What happens during a dispute?</h2>
                                <p className="text-sm leading-7 text-[#404944] md:text-base">Choose the journey that applies to you.</p>
                            </div>

                            <div className="flex w-fit gap-2 rounded-[18px] border border-[#dbe6e1] bg-[#f6f9f7] p-1.5" role="tablist" aria-label="Dispute journey">
                                <JourneyTab
                                    active={activeJourney === "buyer"}
                                    icon="shopping_bag"
                                    label="Buyer"
                                    onClick={() => setActiveJourney("buyer")}
                                />
                                <JourneyTab
                                    active={activeJourney === "seller"}
                                    icon="storefront"
                                    label="Seller"
                                    onClick={() => setActiveJourney("seller")}
                                />
                            </div>
                        </div>

                        <div className="dispute-steps">
                            {activeSteps.map((step) => (
                                <DisputeStep key={step.number} step={step} />
                            ))}
                        </div>

                        <div className={`mt-8 flex items-start gap-3 rounded-[18px] border p-5 ${
                            activeJourney === "buyer"
                                ? "border-[#b7e4d1] bg-[#f0faf6] text-[#003527]"
                                : "border-[#fde68a] bg-[#fffdf4] text-[#854d0e]"
                        }`}>
                            <span className="material-symbols-outlined icon-fill mt-0.5 text-[22px]">tips_and_updates</span>
                            <p className="text-sm leading-7">
                                {activeJourney === "buyer" ? (
                                    <><strong>Buyer tip:</strong> Explain the issue clearly and upload evidence that directly shows how the order differs from what was promised.</>
                                ) : (
                                    <><strong>Seller tip:</strong> Respond before the stated deadline and submit genuine delivery, product, collection, or communication evidence.</>
                                )}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive evidence checklist */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="rounded-[32px] bg-[#003527] p-8 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-10 lg:col-span-4">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[38px] text-[#fed65b]">fact_check</span>
                            <h2 className="mb-4 text-[30px] font-black leading-tight tracking-[-0.04em] md:text-[40px]">Prepare useful evidence before submitting.</h2>
                            <p className="text-sm leading-7 text-white/70 md:text-base">
                                Clear, relevant, and unedited information helps support understand the issue. False or misleading evidence may affect the case and account status.
                            </p>
                            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
                                <p className="text-sm font-black text-[#fed65b]">Checklist progress</p>
                                <p className="mt-1 text-sm text-white/70">{checkedEvidence.length} of {evidenceChecklist.length} items ready</p>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.05)] md:p-8 lg:col-span-8">
                            <div className="mb-5">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Before submitting</p>
                                <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#121c2a]">Have you included these details?</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {evidenceChecklist.map((item) => {
                                    const checked = checkedEvidence.includes(item.id);
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => toggleEvidence(item.id)}
                                            aria-pressed={checked}
                                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                                                checked
                                                    ? "border-[#95d3ba] bg-[#f0faf6]"
                                                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba] hover:bg-[#f8fbf9]"
                                            }`}
                                        >
                                                    <span className="shrink-0 text-[#003527]">
                                                        <span className="material-symbols-outlined icon-fill text-[28px]">{checked ? "check" : item.icon}</span>
                                                    </span>
                                            <span>
                                                        <span className="block text-sm font-black text-[#121c2a]">{item.title}</span>
                                                        <span className="mt-1 block text-xs leading-5 text-[#66736d]">{item.text}</span>
                                                    </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {checkedEvidence.length === evidenceChecklist.length && (
                                <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-[#b7e4d1] bg-[#f0faf6] p-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                                <span className="shrink-0 text-[#003527]">
                                                    <span className="material-symbols-outlined icon-fill text-[28px]">task_alt</span>
                                                </span>
                                        <div>
                                            <p className="text-sm font-black text-[#003527]">You're ready to submit</p>
                                            <p className="text-xs text-[#66736d]">All evidence items checked — open your order to report the issue.</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/my-orders"
                                        className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white shadow-[0_6px_18px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                                    >
                                        Open My Orders
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Payment during review */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#c8ddd5] bg-[#f0faf6] p-7 shadow-[0_8px_38px_rgba(0,53,39,.05)] md:p-10">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                                <span className="material-symbols-outlined icon-fill mb-4 block text-[36px] text-[#003527]">shield_locked</span>
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Payment during review</p>
                                <h2 className="mb-4 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">What happens to the payment?</h2>
                                <p className="text-sm leading-7 text-[#404944] md:text-base">
                                    Opening a dispute places the order under review. Seller payout may remain pending while Open Market checks the order information and evidence.
                                </p>
                            </div>

                            <div className="lg:col-span-7">
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <ProtectionPoint icon="pause_circle" text="The order is placed under review." />
                                    <ProtectionPoint icon="payments" text="Seller payout may remain pending." />
                                    <ProtectionPoint icon="upload_file" text="Either party may be asked for evidence." />
                                    <ProtectionPoint icon="notifications" text="Support communicates the next action." />
                                </div>

                                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#fde68a] bg-[#fffdf4] p-4 text-[#854d0e]">
                                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[19px]">info</span>
                                    <p className="text-sm leading-6">
                                        <strong>Important:</strong> Opening a dispute does not guarantee a refund. The outcome depends on the order details, platform rules, and evidence from both parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grouped outcomes */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <SectionHeading
                        eyebrow="Possible resolutions"
                        title="What can happen after the review?"
                        text="The next action depends on the order, applicable rules, fulfilment records, communication, and evidence submitted by both parties."
                    />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <OutcomeGroup
                            eyebrow="Resolution actions"
                            title="Refund, return, or replacement"
                            items={resolutionActions}
                        />
                        <OutcomeGroup
                            eyebrow="Review decisions"
                            title="Other case outcomes"
                            items={reviewDecisions}
                        />
                    </div>
                </section>

                {/* Status guide */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.05)] md:p-8">
                        <div className="mb-7 max-w-3xl">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Case status guide</p>
                            <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">What do dispute statuses mean?</h2>
                            <p className="text-sm leading-7 text-[#404944]">Use the status shown on the order to understand what is happening and whether you need to act.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
                            {disputeStatuses.map((status, index) => (
                                <div
                                    key={status.title}
                                    className={`flex gap-3 py-5 ${index % 3 !== 2 ? "lg:border-r lg:border-[#dbe6e1] lg:pr-5" : ""} ${index >= 3 ? "lg:border-t lg:border-[#dbe6e1]" : ""} ${index % 3 !== 0 ? "lg:pl-5" : ""}`}
                                >
                                    <span className="shrink-0 text-[#003527]">
                                        <span className="material-symbols-outlined icon-fill text-[28px]">{status.icon}</span>
                                    </span>
                                    <div>
                                        <h3 className="text-sm font-black text-[#121c2a]">{status.title}</h3>
                                        <p className="mt-1 text-xs leading-5 text-[#66736d]">{status.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Action CTA */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#c8ddd5] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,.06)] md:p-10">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <span className="material-symbols-outlined icon-fill mb-4 block text-[36px] text-[#003527]">report</span>
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Active order problem</p>
                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">Open the affected order to report the issue.</h2>
                                <p className="max-w-2xl text-sm leading-7 text-[#404944] md:text-base">
                                    Reporting from My Orders links the case to the correct purchase, seller, messages, fulfilment history, and payment status.
                                </p>
                                <p className="mt-3 text-sm font-bold text-[#66736d]">
                                    Use the order's dispute option instead of creating a general support request when that option is available.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 lg:col-span-4">
                                <Link
                                    to="/my-orders"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#003527] px-6 py-4 text-sm font-black text-white transition hover:bg-[#064e3b]"
                                >
                                    Open My Orders
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[#bfc9c3] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Contact support
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Focused FAQ */}
                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Common questions</p>
                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">Dispute questions</h2>
                            <p className="text-sm leading-7 text-[#404944]">Answers about adding evidence, responses, reviews, and closing a case.</p>
                        </div>

                        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)] md:p-8 lg:col-span-8">
                            {faqs.map((faq, index) => (
                                <FaqItem
                                    key={faq.question}
                                    faq={faq}
                                    open={openFaq === index}
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}

function SectionHeading({ eyebrow, title, text }) {
    return (
        <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">{eyebrow}</p>
            <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[42px]">{title}</h2>
            <p className="text-sm leading-7 text-[#404944] md:text-base">{text}</p>
        </div>
    );
}

function JourneyTab({ active, icon, label, onClick }) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-[13px] px-5 py-2.5 text-sm font-black transition ${
                active
                    ? "bg-[#003527] text-white shadow-[0_4px_14px_rgba(0,53,39,.24)]"
                    : "text-[#66736d] hover:bg-white hover:text-[#003527]"
            }`}
        >
            <span className="material-symbols-outlined icon-fill text-[18px]">{icon}</span>
            {label}
        </button>
    );
}

function DisputeStep({ step }) {
    return (
        <article className="dispute-step relative flex gap-4 pb-8 last:pb-0 md:pb-0">
            <div className={`dispute-step-badge relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                step.accent
                    ? "bg-[#fed65b] text-[#3a2e00] shadow-[0_4px_14px_rgba(254,214,91,.35)]"
                    : "bg-[#003527] text-white shadow-[0_4px_14px_rgba(0,53,39,.25)]"
            } md:mx-auto md:mb-4`}>
                {step.number}
            </div>

            <div className="pt-1 md:pt-0">
                <div className="mb-2 flex items-center gap-2 md:justify-center">
                    <h3 className="text-[15px] font-black text-[#121c2a]">{step.title}</h3>
                    <span className="material-symbols-outlined icon-fill text-[18px] text-[#003527] md:hidden">{step.icon}</span>
                </div>
                <p className="text-[13px] leading-6 text-[#66736d]">{step.text}</p>
            </div>
        </article>
    );
}

function ProtectionPoint({ icon, text }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-[#c8ddd5] bg-white p-4">
            <span className="material-symbols-outlined icon-fill text-[22px] text-[#003527]">{icon}</span>
            <span className="text-sm font-black text-[#121c2a]">{text}</span>
        </div>
    );
}

function OutcomeGroup({ eyebrow, title, items }) {
    return (
        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.04)] md:p-8">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#003527]">{eyebrow}</p>
            <h3 className="mb-5 text-xl font-black text-[#121c2a]">{title}</h3>
            <div className="divide-y divide-[#dbe6e1]">
                {items.map((item) => (
                    <div key={item.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="shrink-0 text-[#003527]">
                            <span className="material-symbols-outlined icon-fill text-[28px]">{item.icon}</span>
                        </span>
                        <div>
                            <h4 className="text-sm font-black text-[#121c2a]">{item.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-[#66736d]">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FaqItem({ faq, open, onClick }) {
    return (
        <div className="border-b border-[#dbe6e1] last:border-b-0">
            <button
                type="button"
                onClick={onClick}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-black text-[#121c2a]"
            >
                {faq.question}
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                    open
                        ? "rotate-180 text-[#003527]"
                        : "text-[#003527]"
                }`}>
                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                </span>
            </button>
            {open && <p className="pb-5 text-sm leading-7 text-[#404944]">{faq.answer}</p>}
        </div>
    );
}
