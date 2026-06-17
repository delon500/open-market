import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const sellerResponsibilities = [
    {
        icon: "verified_user",
        title: "Keep seller details accurate",
        text: "Maintain correct account, store, location, and verification information.",
    },
    {
        icon: "inventory_2",
        title: "Describe products honestly",
        text: "Show the real item and clearly state its price, condition, stock, and defects.",
    },
    {
        icon: "local_shipping",
        title: "Fulfil accepted orders reliably",
        text: "Prepare, deliver, or make orders available for collection within the stated time.",
    },
    {
        icon: "support_agent",
        title: "Cooperate with reviews and disputes",
        text: "Respond to support requests and provide accurate evidence when an order is reviewed.",
    },
];

const policySections = [
    {
        number: "01",
        group: "Setup",
        icon: "person_check",
        title: "Seller eligibility and verification",
        text: "Sellers must provide accurate information so Open Market can verify accounts and maintain marketplace trust.",
        points: [
            "Provide a valid name, email address, and phone number.",
            "Provide accurate store details, location, and selling category.",
            "Complete any identity, business, or account verification requested.",
            "Keep seller and contact information up to date.",
            "Do not create duplicate accounts to avoid restrictions or enforcement.",
        ],
    },
    {
        number: "02",
        group: "Setup",
        icon: "edit_note",
        title: "Product listing standards",
        text: "Listings must help buyers understand exactly what they are purchasing.",
        points: [
            "Use clear photos of the actual product being sold.",
            "Write an accurate title and product description.",
            "State the correct price, quantity, size, colour, and condition.",
            "Mention important defects, damage, missing parts, or signs of use.",
            "Place the product in the most appropriate category.",
            "Remove or update listings when stock is no longer available.",
        ],
    },
    {
        number: "03",
        group: "Setup",
        icon: "auto_awesome",
        title: "AI-assisted listings",
        text: "AI tools may help sellers create listing drafts, but sellers remain responsible for the final information.",
        points: [
            "Review every AI-generated title and description before publishing.",
            "Correct inaccurate categories, colours, condition, or product details.",
            "Set the final price, quantity, delivery options, and product condition.",
            "Do not publish misleading AI-generated information.",
        ],
    },
    {
        number: "04",
        group: "Rules",
        icon: "block",
        title: "Prohibited and restricted products",
        text: "Sellers must not list products that are illegal, unsafe, counterfeit, stolen, or prohibited by Open Market rules.",
        points: [
            "Stolen, counterfeit, or fraudulently obtained products.",
            "Illegal drugs, dangerous substances, or unlawful medication.",
            "Weapons, explosives, or products intended to cause harm.",
            "Unsafe, recalled, expired, or seriously damaged products.",
            "Products that violate another person’s copyright or trademark.",
            "Any product prohibited by South African law or platform policy.",
        ],
    },
    {
        number: "05",
        group: "Rules",
        icon: "sell",
        title: "Pricing, fees, and promotions",
        text: "Sellers must show buyers honest prices and understand the fees applied to completed sales.",
        points: [
            "Display the correct total product price.",
            "Do not use false discounts or misleading previous prices.",
            "Platform commission may be deducted from completed sales.",
            "Any applicable seller fees should be shown during onboarding or before publishing.",
            "Sellers are responsible for understanding their own tax obligations.",
        ],
    },
    {
        number: "06",
        group: "Fulfilment",
        icon: "shopping_bag",
        title: "Order acceptance and preparation",
        text: "Sellers should only accept orders they can fulfil properly and within the stated timeframe.",
        points: [
            "Confirm that the ordered product is available.",
            "Prepare and package the correct product carefully.",
            "Do not replace an item without the buyer’s agreement.",
            "Update the order if fulfilment is delayed.",
            "Cancel promptly if the product cannot be supplied.",
        ],
    },
    {
        number: "07",
        group: "Fulfilment",
        icon: "local_shipping",
        title: "Delivery responsibilities",
        text: "Sellers offering delivery must provide accurate information and keep the buyer informed.",
        points: [
            "Use the delivery method selected during checkout.",
            "Provide tracking or delivery updates where available.",
            "Package products appropriately for transport.",
            "Communicate unexpected delays clearly.",
            "Only mark an order delivered when delivery has actually occurred.",
        ],
    },
    {
        number: "08",
        group: "Fulfilment",
        icon: "storefront",
        title: "Click & Collect responsibilities",
        text: "Sellers offering collection must provide buyers with a safe, clear, and reliable collection process.",
        points: [
            "Provide an accurate approved collection location.",
            "Set realistic collection hours and availability.",
            "Confirm that the product is ready before asking the buyer to collect.",
            "Check the required collection code or confirmation details.",
            "Only complete the order after the correct buyer has collected it.",
        ],
    },
    {
        number: "09",
        group: "Fulfilment",
        icon: "payments",
        title: "Payment Protection and payouts",
        text: "Seller payout may remain pending while an order is being delivered, collected, or reviewed.",
        points: [
            "Payout can be processed after delivery or collection is confirmed.",
            "Platform fees may be deducted before the seller receives payout.",
            "Payout may be paused when an active dispute or payment review exists.",
            "Sellers must not ask buyers to bypass Open Market’s payment process.",
            "Payout timing may also depend on the payment provider.",
        ],
    },
    {
        number: "10",
        group: "Conduct",
        icon: "chat",
        title: "Buyer communication",
        text: "Sellers should communicate professionally and only use buyer information for order-related purposes.",
        points: [
            "Respond to reasonable buyer questions promptly.",
            "Do not threaten, harass, insult, or pressure buyers.",
            "Do not send spam or unrelated promotional messages.",
            "Do not misuse buyer contact, address, or order information.",
            "Keep important order communication inside the platform where possible.",
        ],
    },
    {
        number: "11",
        group: "Conduct",
        icon: "report",
        title: "Disputes, refunds, and evidence",
        text: "Sellers must cooperate when support reviews an order problem.",
        points: [
            "Respond to dispute requests within the stated timeframe.",
            "Provide relevant delivery, collection, product, or communication evidence.",
            "Do not alter or create false evidence.",
            "Follow the final dispute or refund decision communicated through the platform.",
            "Repeated unresolved order problems may affect seller account status.",
        ],
    },
    {
        number: "12",
        group: "Conduct",
        icon: "gavel",
        title: "Account restrictions and enforcement",
        text: "Open Market may restrict seller features when marketplace rules are broken.",
        points: [
            "Listings may be removed if they are inaccurate, unsafe, or prohibited.",
            "Selling or payout access may be temporarily restricted during an investigation.",
            "Accounts may be suspended for fraud, fake listings, abuse, or repeated violations.",
            "Serious or illegal activity may be reported to the appropriate authorities.",
            "Sellers may request a review if they believe enforcement was applied incorrectly.",
        ],
    },
];

const policyGroups = [
    {
        name: "Setup",
        description: "Account verification, listings, and AI-assisted content.",
        sections: policySections.filter((section) => section.group === "Setup"),
    },
    {
        name: "Rules",
        description: "Restricted products, pricing, fees, and promotions.",
        sections: policySections.filter((section) => section.group === "Rules"),
    },
    {
        name: "Fulfilment",
        description: "Orders, delivery, collection, payments, and payouts.",
        sections: policySections.filter((section) => section.group === "Fulfilment"),
    },
    {
        name: "Conduct",
        description: "Communication, disputes, evidence, and enforcement.",
        sections: policySections.filter((section) => section.group === "Conduct"),
    },
];

const prohibitedExamples = [
    {
        icon: "dangerous",
        title: "Illegal or dangerous goods",
        text: "Products that are unlawful, unsafe, explosive, poisonous, or intended to cause harm.",
    },
    {
        icon: "copyright",
        title: "Counterfeit products",
        text: "Fake branded products or listings that misuse trademarks, logos, or protected content.",
    },
    {
        icon: "report",
        title: "Stolen products",
        text: "Any item the seller does not legally own or have permission to sell.",
    },
    {
        icon: "medical_services",
        title: "Restricted health products",
        text: "Medication or health products that require approval, a prescription, or special authorisation.",
    },
];

const faqs = [
    {
        question: "Can I sell second-hand products?",
        answer:
            "Yes, provided the product is legal, safe, accurately described, and its condition is clearly stated in the listing.",
    },
    {
        question: "What should I do if a product becomes unavailable?",
        answer:
            "Update or remove the listing immediately. If an order has already been placed, cancel it promptly and explain the issue to the buyer. Repeated cancellations may affect seller account standing.",
    },
    {
        question: "Can I appeal an account or listing restriction?",
        answer:
            "Yes. Contact Seller Support using the email linked to your seller account and include the affected listing, order, or restriction details so the decision can be reviewed.",
    },
    {
        question: "How do I report a prohibited listing?",
        answer:
            "Use the report option on the product page or contact support with the listing link and a short explanation. Do not attempt to purchase or confront the seller.",
    },
];

export default function SellerPolicyPage() {
    const [openFaq, setOpenFaq] = useState(0);
    const [activeSection, setActiveSection] = useState("01");
    const [mobileTocOpen, setMobileTocOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll(".policy-anchor");
        if (!sections.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id.replace("policy-", ""));
                    }
                });
            },
            { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 900);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobileToc = () => setMobileTocOpen(false);

    return (
        <PublicLayout>
            <style>{`
                html { scroll-behavior: smooth; }

                .seller-policy-hero {
                    position: relative;
                    overflow: hidden;
                    background-color: #003527;
                    background-image:
                        radial-gradient(circle at top left, rgba(149,211,186,.2), transparent 38%),
                        radial-gradient(circle at 88% 16%, rgba(254,214,91,.14), transparent 32%),
                        radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px);
                    background-size: auto, auto, 28px 28px;
                }

                .policy-anchor { scroll-margin-top: 112px; }

                @media print {
                    body * { visibility: hidden !important; }
                    #seller-policy-document,
                    #seller-policy-document * { visibility: visible !important; }
                    #seller-policy-document {
                        position: absolute;
                        inset: 0 auto auto 0;
                        width: 100%;
                        background: white !important;
                    }
                    .print-hidden { display: none !important; }
                    .seller-policy-hero {
                        background: white !important;
                        color: #121c2a !important;
                    }
                    .seller-policy-hero * { color: #121c2a !important; }
                    .policy-layout { display: block !important; }
                    .policy-sidebar { display: none !important; }
                    .policy-document-card {
                        border: 0 !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                    .policy-anchor { break-inside: avoid; }
                }
            `}</style>

            <main id="seller-policy-document" className="bg-[#f6f9f7]">
                {/* Compact policy header */}
                <section className="seller-policy-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-10 md:py-16">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                                <span className="material-symbols-outlined icon-fill text-[15px]">policy</span>
                                Seller Policy
                            </span>

                            <h1 className="my-5 text-[38px] font-black leading-[1.04] tracking-[-0.05em] text-white md:text-[52px]">
                                Standards for <span className="text-[#fed65b]">trusted selling.</span>
                            </h1>

                            <p className="max-w-[680px] text-[16px] leading-8 text-white/75 md:text-[17px]">
                                Rules for listing products, fulfilling orders, communicating with buyers,
                                receiving payouts, and operating an Open Market seller account.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black">
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/80">
                                    Effective June 2026
                                </span>
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/80">
                                    Policy version 1.0
                                </span>
                            </div>

                            <div className="print-hidden mt-7 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#fed65b] px-6 py-4 text-sm font-black text-[#3a2e00] shadow-[0_10px_28px_rgba(254,214,91,.3)] transition hover:opacity-90"
                                >
                                    <span className="material-symbols-outlined text-[18px]">print</span>
                                    Print policy
                                </button>

                                <Link
                                    to="/seller-support"
                                    className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-white/25 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
                                >
                                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                    Seller support
                                </Link>
                            </div>

                            <p className="print-hidden mt-5 text-sm font-semibold text-white/55">
                                New to selling?{" "}
                                <Link to="/become-seller" className="text-[#fed65b] underline-offset-4 hover:underline">
                                    Learn how selling works
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Responsibilities at a glance */}
                <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10 md:py-10">
                    <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_6px_28px_rgba(0,53,39,.05)] md:p-8">
                        <div className="mb-6 max-w-2xl">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                At a glance
                            </p>
                            <h2 className="text-[24px] font-black tracking-[-0.035em] text-[#121c2a] md:text-[30px]">
                                Core seller responsibilities
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                            {sellerResponsibilities.map((item) => (
                                <ResponsibilityItem key={item.title} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mobile table of contents */}
                <section className="print-hidden mx-auto max-w-[1280px] px-4 pb-6 md:px-10 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileTocOpen((open) => !open)}
                        aria-expanded={mobileTocOpen}
                        aria-controls="mobile-policy-toc"
                        className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#dbe6e1] bg-white px-5 py-4 text-left shadow-[0_4px_18px_rgba(0,53,39,.04)]"
                    >
                        <span>
                            <span className="block text-xs font-black uppercase tracking-[0.15em] text-[#003527]">
                                On this page
                            </span>
                            <span className="mt-1 block text-sm font-bold text-[#404944]">
                                Jump to a policy section
                            </span>
                        </span>
                        <span
                            className={`material-symbols-outlined text-[#003527] transition ${
                                mobileTocOpen ? "rotate-180" : ""
                            }`}
                        >
                            keyboard_arrow_down
                        </span>
                    </button>

                    {mobileTocOpen && (
                        <nav
                            id="mobile-policy-toc"
                            aria-label="Mobile seller policy sections"
                            className="mt-3 rounded-2xl border border-[#dbe6e1] bg-white p-3 shadow-[0_8px_30px_rgba(0,53,39,.06)]"
                        >
                            {policyGroups.map((group) => (
                                <div key={group.name} className="mb-3 last:mb-0">
                                    <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#74847c]">
                                        {group.name}
                                    </p>
                                    {group.sections.map((section) => (
                                        <TocLink
                                            key={section.number}
                                            num={section.number}
                                            label={section.title}
                                            active={activeSection === section.number}
                                            onClick={closeMobileToc}
                                        />
                                    ))}
                                </div>
                            ))}
                        </nav>
                    )}
                </section>

                {/* Main policy reader */}
                <section className="policy-layout mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 pb-16 md:px-10 lg:grid-cols-12">
                    <aside className="policy-sidebar print-hidden hidden lg:col-span-4 lg:block">
                        <div className="sticky top-28 space-y-5">
                            <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.05)]">
                                <h2 className="mb-1 text-xl font-black text-[#121c2a]">On this page</h2>
                                <p className="mb-5 text-sm leading-6 text-[#404944]">
                                    Jump directly to the section you need.
                                </p>

                                <nav aria-label="Seller policy sections">
                                    {policyGroups.map((group) => (
                                        <div key={group.name} className="mb-4 last:mb-0">
                                            <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#74847c]">
                                                {group.name}
                                            </p>
                                            <div className="space-y-0.5">
                                                {group.sections.map((section) => (
                                                    <TocLink
                                                        key={section.number}
                                                        num={section.number}
                                                        label={section.title}
                                                        active={activeSection === section.number}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                                <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
                                    support_agent
                                </span>
                                <h2 className="mb-2 text-xl font-black">Need seller assistance?</h2>
                                <p className="text-sm leading-7 text-white/70">
                                    Get help with verification, listings, orders, delivery, payouts, disputes, or restrictions.
                                </p>
                                <Link
                                    to="/seller-support"
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-5 py-3 text-sm font-black text-[#3a2e00] transition hover:opacity-90"
                                >
                                    Seller support
                                </Link>
                            </div>
                        </div>
                    </aside>

                    <section className="lg:col-span-8">
                        <div className="policy-document-card rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.06)] md:p-9">
                            <div className="mb-4 border-b border-[#dbe6e1] pb-8">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Marketplace standards
                                </p>
                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                    Open Market seller policy
                                </h2>
                                <p className="text-sm leading-7 text-[#404944]">
                                    By registering or operating a seller account, sellers agree to follow this policy together with the platform Terms and Conditions.
                                </p>
                            </div>

                            {policyGroups.map((group, groupIndex) => (
                                <div
                                    key={group.name}
                                    className={groupIndex === 0 ? "" : "border-t border-[#dbe6e1] pt-8"}
                                >
                                    <div className="mb-2 pt-5">
                                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#003527]">
                                            {group.name}
                                        </p>
                                        <p className="mt-1 text-sm text-[#66736d]">{group.description}</p>
                                    </div>

                                    <div>
                                        {group.sections.map((section) => (
                                            <PolicySection key={section.number} section={section} />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Enforcement review callout */}
                            <div className="mt-8 rounded-[22px] border border-[#c8ddd5] bg-[#f0faf6] p-5 md:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 text-[#003527]">
                                        <span className="material-symbols-outlined icon-fill text-[28px]">rate_review</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-black text-[#121c2a]">
                                            Think a restriction was applied incorrectly?
                                        </h3>
                                        <p className="text-sm leading-7 text-[#404944]">
                                            Contact Seller Support using the email connected to your seller account. Include the affected listing, order number, or restriction notice so the decision can be reviewed.
                                        </p>
                                        <Link
                                            to="/seller-support"
                                            className="print-hidden mt-4 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                                        >
                                            Request a review
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Production policy note */}
                            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-4">
                                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[17px] text-[#003527]">
                                    info
                                </span>
                                <p className="text-xs leading-6 text-[#404944]">
                                    This policy should be read together with the{" "}
                                    <Link to="/terms" className="font-black text-[#003527] hover:underline">
                                        Terms and Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="font-black text-[#003527] hover:underline">
                                        Privacy Policy
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                {/* Prohibited products */}
                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_6px_28px_rgba(0,53,39,.05)] md:p-8">
                        <div className="mb-6 max-w-3xl">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#9f2d20]">
                                Not allowed
                            </p>
                            <h2 className="text-[24px] font-black tracking-[-0.035em] text-[#121c2a] md:text-[30px]">
                                Examples of prohibited products
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-[#404944]">
                                This is not a complete list. Open Market may remove listings that are unlawful, dangerous, misleading, or harmful to users.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                            {prohibitedExamples.map((item) => (
                                <ProhibitedCard key={item.title} item={item} />
                            ))}
                        </div>

                        <div className="print-hidden mt-7 border-t border-[#dbe6e1] pt-5">
                            <Link
                                to="/restricted-items"
                                className="inline-flex items-center gap-2 text-sm font-black text-[#9f2d20] hover:underline"
                            >
                                View the complete restricted-items policy
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Clarification FAQ */}
                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Clarifications
                            </p>
                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Common policy questions
                            </h2>
                            <p className="text-sm leading-7 text-[#404944]">
                                Answers for situations that are not always obvious from the main rules.
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,.05)] md:p-8 lg:col-span-8">
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

                {/* Support-focused closing panel */}
                <section className="print-hidden mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="rounded-[32px] border border-[#c8ddd5] bg-[#f0faf6] p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center">
                            <div className="lg:col-span-8">
                                <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
                                    support_agent
                                </span>
                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">
                                    Need help understanding this policy?
                                </h2>
                                <p className="max-w-2xl text-sm leading-7 text-[#404944] md:text-base">
                                    Contact Seller Support for help with listings, orders, payouts, verification, disputes, or account restrictions.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
                                <Link
                                    to="/seller-support"
                                    className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-[#003527] px-6 py-4 text-sm font-black text-white transition hover:bg-[#064e3b]"
                                >
                                    Seller support
                                    <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                                </Link>
                                <Link
                                    to="/register-seller"
                                    className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-[#bfc9c3] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#e8f5ef]"
                                >
                                    Return to seller registration
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {showBackToTop && (
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        aria-label="Back to top"
                        className="print-hidden fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#003527] text-white shadow-[0_10px_28px_rgba(0,53,39,.24)] transition hover:bg-[#064e3b] md:bottom-6 md:right-6"
                    >
                        <span className="material-symbols-outlined">arrow_upward</span>
                    </button>
                )}
            </main>
        </PublicLayout>
    );
}

function TocLink({ num, label, active, onClick }) {
    return (
        <a
            href={`#policy-${num}`}
            onClick={onClick}
            aria-current={active ? "location" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition ${
                active
                    ? "bg-[#f0faf6] text-[#003527]"
                    : "text-[#404944] hover:bg-[#f6f9f7] hover:text-[#003527]"
            }`}
        >
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition ${
                    active ? "bg-[#003527] text-white" : "bg-[#f6f9f7] text-[#003527]"
                }`}
            >
                {num}
            </span>
            <span className="line-clamp-2">{label}</span>
        </a>
    );
}

function ResponsibilityItem({ item }) {
    return (
        <article className="flex items-start gap-4">
            <div className="shrink-0 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[28px]">{item.icon}</span>
            </div>
            <div>
                <h3 className="mb-1 font-black text-[#121c2a]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#66736d]">{item.text}</p>
            </div>
        </article>
    );
}

function PolicySection({ section }) {
    return (
        <article
            id={`policy-${section.number}`}
            className="policy-anchor border-b border-[#dbe6e1] py-7 last:border-b-0"
        >
            <div className="mb-4 flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white">
                    {section.number}
                </span>

                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-[#121c2a] md:text-xl">{section.title}</h3>
                        <span className="material-symbols-outlined icon-fill text-[19px] text-[#003527]">
                            {section.icon}
                        </span>
                    </div>
                    <p className="text-sm leading-7 text-[#404944]">{section.text}</p>
                </div>
            </div>

            <ul className="space-y-2.5 sm:ml-[60px]">
                {section.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-6 text-[#404944]">
                        <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[17px] text-[#003527]">
                            check_circle
                        </span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function ProhibitedCard({ item }) {
    return (
        <article className="flex items-start gap-4">
            <div className="shrink-0 text-[#9f2d20]">
                <span className="material-symbols-outlined icon-fill text-[28px]">{item.icon}</span>
            </div>
            <div>
                <h3 className="mb-1 font-black text-[#121c2a]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#66736d]">{item.text}</p>
            </div>
        </article>
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
                <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        open ? "rotate-180 text-[#003527]" : "text-[#003527]"
                    }`}
                >
                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                </span>
            </button>

            {open && <p className="pb-5 text-sm leading-7 text-[#404944]">{faq.answer}</p>}
        </div>
    );
}
