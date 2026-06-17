import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const commonActions = [
    {
        icon: "receipt_long",
        title: "Track an active order",
        text: "Review fulfilment status, delivery progress, and buyer confirmation.",
        to: "/seller/orders",
        label: "View seller orders",
    },
    {
        icon: "payments",
        title: "Check payout status",
        text: "See whether confirmation, verification, or a dispute is delaying payout.",
        to: "/seller/payouts",
        label: "View payouts",
    },
    {
        icon: "local_shipping",
        title: "Report a delivery problem",
        text: "Get help with courier delays, collection handovers, or delivery evidence.",
        supportTopic: "delivery",
        label: "Report delivery issue",
    },
    {
        icon: "manage_accounts",
        title: "Review an account restriction",
        text: "Understand verification, policy-review, and account-access restrictions.",
        supportTopic: "account",
        label: "Get account help",
    },
];

const categories = [
    { value: "all", label: "All topics", icon: "help" },
    { value: "onboarding", label: "Getting started", icon: "person_add" },
    { value: "listings", label: "Listings", icon: "inventory_2" },
    { value: "orders", label: "Orders", icon: "shopping_bag" },
    { value: "delivery", label: "Delivery", icon: "local_shipping" },
    { value: "payouts", label: "Payouts", icon: "payments" },
    { value: "account", label: "Account", icon: "manage_accounts" },
];

const supportArticles = [
    {
        category: "onboarding",
        icon: "person_add",
        title: "How do I register as a seller?",
        text: "Create a seller account, verify your details, and complete your store profile.",
        to: "/register-seller",
        linkLabel: "Start seller registration",
    },
    {
        category: "onboarding",
        icon: "verified_user",
        title: "Why does my seller account need verification?",
        text: "Learn which details may be checked and how verification supports marketplace trust.",
        to: "/seller-policy#policy-01",
        linkLabel: "Read verification rules",
    },
    {
        category: "listings",
        icon: "add_photo_alternate",
        title: "How do I create a product listing?",
        text: "Review photo, description, price, condition, stock, and fulfilment requirements.",
        to: "/seller-policy#policy-02",
        linkLabel: "Read listing standards",
    },
    {
        category: "listings",
        icon: "auto_awesome",
        title: "How do AI-assisted listings work?",
        text: "Understand how generated listing drafts work and what sellers must review before publishing.",
        to: "/seller-policy#policy-03",
        linkLabel: "Review AI listing rules",
    },
    {
        category: "listings",
        icon: "edit_note",
        title: "Can I edit a published product?",
        text: "Update stock, pricing, descriptions, photos, and product availability when details change.",
        to: "/seller-policy#policy-02",
        linkLabel: "View listing requirements",
    },
    {
        category: "orders",
        icon: "shopping_bag",
        title: "What should I do when I receive an order?",
        text: "Confirm stock, accept the order, prepare the correct product, and update fulfilment status.",
        to: "/how-it-works",
        linkLabel: "See the seller order journey",
    },
    {
        category: "orders",
        icon: "cancel",
        title: "What if I cannot fulfil an order?",
        text: "Cancel or update the order promptly and explain the issue clearly to the buyer.",
        to: "/seller-policy#policy-06",
        linkLabel: "Read order rules",
    },
    {
        category: "delivery",
        icon: "local_shipping",
        title: "How does seller delivery work?",
        text: "Use the selected delivery option, package the item properly, and provide fulfilment updates.",
        to: "/shipping",
        linkLabel: "View delivery information",
    },
    {
        category: "delivery",
        icon: "storefront",
        title: "How does Click & Collect work?",
        text: "Prepare the item, provide approved collection details, and verify the buyer's collection code.",
        to: "/seller-policy#policy-08",
        linkLabel: "Read collection responsibilities",
    },
    {
        category: "payouts",
        icon: "payments",
        title: "When will I receive my payout?",
        text: "Payout can process after delivery or collection is confirmed and no unresolved review remains.",
        to: "/trust-safety",
        linkLabel: "View payment protection",
    },
    {
        category: "payouts",
        icon: "hourglass_top",
        title: "Why is my payout still pending?",
        text: "Check confirmation, verification, dispute review, and payment-provider processing status.",
        to: "/trust-safety",
        linkLabel: "Review payout information",
    },
    {
        category: "account",
        icon: "lock",
        title: "Why has my seller account been restricted?",
        text: "Restrictions may relate to verification, policy review, disputes, or suspicious activity checks.",
        to: "/seller-policy#policy-12",
        linkLabel: "Read enforcement rules",
    },
];

const supportPreparation = [
    "Have your store name and seller email ready.",
    "Include the order, listing, or payout reference when relevant.",
    "Take screenshots of error messages or account notices.",
    "Check your inbox and spam folder for verification emails.",
];

const faqs = [
    {
        question: "Can I sell without having a physical shop?",
        answer:
            "Yes. Independent sellers can use Open Market if they provide accurate store information, sell permitted products, and offer clear delivery or collection details.",
    },
    {
        question: "How do I update an existing support request?",
        answer:
            "Reply to the support email connected to your request and include the request reference so the update stays attached to the same case.",
    },
    {
        question: "Where will support replies appear?",
        answer:
            "Support updates are sent to the email address submitted with the request. Important account notices may also appear in your seller notifications.",
    },
    {
        question: "Can I reopen a closed support request?",
        answer:
            "You can contact support again and include the previous request reference. The team can review whether the issue should be reopened or handled as a new request.",
    },
];

const topicsRequiringOrderReference = new Set([
    "order",
    "delivery",
    "payout",
    "dispute",
]);

export default function SellerSupportPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [requestReference, setRequestReference] = useState("");
    const [supportType, setSupportType] = useState("");
    const [attachmentError, setAttachmentError] = useState("");

    const filteredArticles = useMemo(() => {
        const normalizedSearch = searchQuery.trim().toLowerCase();

        return supportArticles.filter((article) => {
            const matchesCategory =
                activeCategory === "all" || article.category === activeCategory;

            const matchesSearch =
                !normalizedSearch ||
                article.title.toLowerCase().includes(normalizedSearch) ||
                article.text.toLowerCase().includes(normalizedSearch) ||
                article.category.toLowerCase().includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    function scrollToSupportForm(topic = "") {
        if (topic) setSupportType(topic);
        requestAnimationFrame(() => {
            document.querySelector("#support-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }

    function handleSupportSubmit(event) {
        event.preventDefault();
        setAttachmentError("");

        const formData = new FormData(event.currentTarget);
        const files = formData.getAll("attachments").filter((file) => file?.size);
        const oversizedFile = files.find((file) => file.size > 5 * 1024 * 1024);

        if (oversizedFile) {
            setAttachmentError("Each attachment must be 5 MB or smaller.");
            return;
        }

        const reference = `SUP-${Date.now().toString().slice(-6)}`;
        setRequestReference(reference);
        setSubmitted(true);
    }

    function resetSupportForm() {
        setSubmitted(false);
        setRequestReference("");
        setSupportType("");
        setAttachmentError("");
    }

    const orderReferenceRequired = topicsRequiringOrderReference.has(supportType);

    return (
        <PublicLayout>
            <style>{`
        html { scroll-behavior: smooth; }

        .seller-support-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149, 211, 186, 0.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254, 214, 91, 0.16), transparent 32%),
            radial-gradient(circle, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        .seller-support-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: #f8fbf9;
          padding: 14px 16px;
          color: #121c2a;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }

        .seller-support-input:focus {
          border-color: #003527;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 53, 39, 0.1);
        }

        .seller-support-input::placeholder { color: #9aada7; }
        #support-form { scroll-margin-top: 100px; }
      `}</style>

            <main className="bg-[#f6f9f7]">
                {/* Compact search-first hero */}
                <section className="seller-support-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-10 md:py-16">
                        <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  support_agent
                </span>
                Seller support
              </span>

                            <h1 className="my-5 text-[38px] font-black leading-[1.04] tracking-[-0.05em] text-white md:text-[54px]">
                                Seller support for <span className="text-[#fed65b]">your store.</span>
                            </h1>

                            <p className="mx-auto mb-7 max-w-[650px] text-[16px] leading-8 text-white/70">
                                Find help with verification, listings, orders, delivery, payouts,
                                disputes, and account access.
                            </p>

                            <div className="mx-auto max-w-[720px] rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                                <label htmlFor="seller-support-search" className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5">
                                    <span className="material-symbols-outlined text-[#66736d]">search</span>
                                    <input
                                        id="seller-support-search"
                                        type="search"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Search seller support topics..."
                                        className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common seller actions */}
                <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10">
                    <div className="mb-5">
                        <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                            Common seller actions
                        </p>
                        <h2 className="text-[24px] font-black tracking-[-0.035em] text-[#121c2a] md:text-[30px]">
                            Get to the right place quickly
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {commonActions.map((item) => (
                            <ActionCard
                                key={item.title}
                                item={item}
                                onSupportClick={scrollToSupportForm}
                            />
                        ))}
                    </div>
                </section>

                {/* Searchable support guides */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="mb-7">
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                            Seller help topics
                        </p>
                        <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">
                            Find the guidance you need
                        </h2>
                        <p className="max-w-2xl text-sm leading-7 text-[#404944] md:text-base">
                            Search by issue or choose a category to narrow the support guides.
                        </p>
                    </div>

                    <div className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => setActiveCategory(category.value)}
                                aria-pressed={activeCategory === category.value}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
                                    activeCategory === category.value
                                        ? "border-[#003527] bg-[#003527] text-white"
                                        : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                }`}
                            >
                <span className="material-symbols-outlined icon-fill text-[17px]">
                  {category.icon}
                </span>
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        <section className="lg:col-span-8">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <p className="text-sm font-bold text-[#66736d]">
                                    Showing <span className="font-black text-[#003527]">{filteredArticles.length}</span> of{" "}
                                    <span className="font-black text-[#003527]">{supportArticles.length}</span> topics
                                    {searchQuery.trim() && (
                                        <span>
                      {" "}for <span className="font-black text-[#121c2a]">“{searchQuery.trim()}”</span>
                    </span>
                                    )}
                                </p>

                                {(searchQuery || activeCategory !== "all") && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setActiveCategory("all");
                                        }}
                                        className="text-sm font-black text-[#003527] hover:underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            {filteredArticles.length > 0 ? (
                                <div className="overflow-hidden rounded-[28px] border border-[#dbe6e1] bg-white shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                                    {filteredArticles.map((article) => (
                                        <SupportGuideRow key={article.title} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    onReset={() => {
                                        setActiveCategory("all");
                                        setSearchQuery("");
                                    }}
                                />
                            )}
                        </section>

                        <aside className="hidden lg:col-span-4 lg:block">
                            <div className="sticky top-28 space-y-5">
                                <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                  <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
                    payments
                  </span>
                                    <h2 className="mb-2 text-xl font-black">Payout still pending?</h2>
                                    <p className="text-sm leading-7 text-white/70">
                                        Check delivery or collection confirmation, seller verification,
                                        active disputes, and payment processing status.
                                    </p>
                                    <Link
                                        to="/trust-safety"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                                    >
                                        Review payout information
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </Link>
                                </div>

                                <div className="rounded-[28px] border border-[#efc5bd] bg-[#fff8f6] p-6">
                  <span className="material-symbols-outlined icon-fill mb-3 block text-[28px] text-[#9f2d20]">
                    priority_high
                  </span>
                                    <h2 className="mb-2 text-lg font-black text-[#121c2a]">Need urgent help?</h2>
                                    <p className="mb-4 text-sm leading-6 text-[#404944]">
                                        Use the support form for an active dispute, account-security concern,
                                        payout error, or delivery problem.
                                    </p>
                                    <div className="grid gap-2">
                                        <button
                                            type="button"
                                            onClick={() => scrollToSupportForm("dispute")}
                                            className="text-left text-sm font-black text-[#9f2d20] hover:underline"
                                        >
                                            Open dispute support
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollToSupportForm("account")}
                                            className="text-left text-sm font-black text-[#9f2d20] hover:underline"
                                        >
                                            Report account concern
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Before contacting support */}
                <section className="mx-auto max-w-[1280px] px-4 pb-10 md:px-10">
                    <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <div className="lg:col-span-4">
                <span className="material-symbols-outlined icon-fill mb-3 block text-[32px] text-[#003527]">
                  checklist
                </span>
                                <h2 className="mb-2 text-xl font-black text-[#121c2a]">Before contacting support</h2>
                                <p className="text-sm leading-7 text-[#404944]">
                                    Include the details below so the support team can understand the issue faster.
                                </p>
                            </div>

                            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8 lg:content-center">
                                {supportPreparation.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                      check_circle
                    </span>
                                        <span className="text-sm font-semibold leading-6 text-[#404944]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Context-aware support form */}
                <section id="support-form" className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Personal support
                            </p>
                            <h2 className="mb-4 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                Still need seller assistance?
                            </h2>
                            <p className="text-sm leading-7 text-[#404944]">
                                Tell us what happened. The form will request the most useful details for the selected issue.
                            </p>

                            <div className="mt-6 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5">
                                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined icon-fill mt-0.5 text-[22px] text-[#003527]">
                    tips_and_updates
                  </span>
                                    <p className="text-sm leading-7 text-[#003527]">
                                        Never include passwords, card details, PINs, or one-time verification codes in a support request.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8 lg:col-span-8">
                            {submitted ? (
                                <SupportSuccess reference={requestReference} onReset={resetSupportForm} />
                            ) : (
                                <form onSubmit={handleSupportSubmit} className="grid gap-5">
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <FormField id="seller-name" label="Full name">
                                            <input
                                                id="seller-name"
                                                name="sellerName"
                                                type="text"
                                                required
                                                autoComplete="name"
                                                placeholder="Enter your full name"
                                                className="seller-support-input"
                                            />
                                        </FormField>

                                        <FormField id="seller-email" label="Email address">
                                            <input
                                                id="seller-email"
                                                name="sellerEmail"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                className="seller-support-input"
                                            />
                                        </FormField>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <FormField id="store-name" label="Store name">
                                            <input
                                                id="store-name"
                                                name="storeName"
                                                type="text"
                                                required
                                                placeholder="Enter your store name"
                                                className="seller-support-input"
                                            />
                                        </FormField>

                                        <FormField id="seller-support-type" label="Support topic">
                                            <select
                                                id="seller-support-type"
                                                name="supportType"
                                                required
                                                value={supportType}
                                                onChange={(event) => setSupportType(event.target.value)}
                                                className="seller-support-input"
                                            >
                                                <option value="" disabled>Select a support topic</option>
                                                <option value="verification">Seller verification</option>
                                                <option value="store">Store setup</option>
                                                <option value="listing">Product listing</option>
                                                <option value="order">Order issue</option>
                                                <option value="delivery">Delivery or collection</option>
                                                <option value="payout">Payout issue</option>
                                                <option value="dispute">Dispute or refund</option>
                                                <option value="account">Account restriction or security</option>
                                            </select>
                                        </FormField>
                                    </div>

                                    {topicsRequiringOrderReference.has(supportType) && (
                                        <FormField id="seller-order-number" label="Order or payout reference">
                                            <input
                                                id="seller-order-number"
                                                name="orderNumber"
                                                type="text"
                                                required={orderReferenceRequired}
                                                placeholder="Example: OM-1024"
                                                className="seller-support-input"
                                            />
                                        </FormField>
                                    )}

                                    {supportType === "listing" && (
                                        <FormField id="seller-listing-id" label="Listing or product ID" optional>
                                            <input
                                                id="seller-listing-id"
                                                name="listingId"
                                                type="text"
                                                placeholder="Example: LIST-2048"
                                                className="seller-support-input"
                                            />
                                        </FormField>
                                    )}

                                    {supportType === "verification" && (
                                        <FormField id="verification-stage" label="Verification stage">
                                            <select
                                                id="verification-stage"
                                                name="verificationStage"
                                                required
                                                defaultValue=""
                                                className="seller-support-input"
                                            >
                                                <option value="" disabled>Select the stage</option>
                                                <option value="email">Email verification</option>
                                                <option value="phone">Phone verification</option>
                                                <option value="identity">Identity verification</option>
                                                <option value="bank">Bank or payout verification</option>
                                            </select>
                                        </FormField>
                                    )}

                                    {supportType === "account" && (
                                        <FormField id="account-notice" label="Restriction or notice reference" optional>
                                            <input
                                                id="account-notice"
                                                name="accountNotice"
                                                type="text"
                                                placeholder="Enter the notice reference, if available"
                                                className="seller-support-input"
                                            />
                                        </FormField>
                                    )}

                                    <FormField id="seller-subject" label="Subject">
                                        <input
                                            id="seller-subject"
                                            name="subject"
                                            type="text"
                                            required
                                            placeholder="Briefly describe your issue"
                                            className="seller-support-input"
                                        />
                                    </FormField>

                                    <FormField id="seller-message" label="Message">
                    <textarea
                        id="seller-message"
                        name="message"
                        rows={6}
                        required
                        placeholder="Explain what happened, when it started, and what help you need..."
                        className="seller-support-input resize-none"
                    />
                                    </FormField>

                                    <FormField id="seller-attachments" label="Attachments" optional>
                                        <input
                                            id="seller-attachments"
                                            name="attachments"
                                            type="file"
                                            multiple
                                            accept=".png,.jpg,.jpeg,.pdf"
                                            className="seller-support-input file:mr-4 file:rounded-xl file:border-0 file:bg-[#003527] file:px-4 file:py-2 file:text-xs file:font-black file:text-white"
                                        />
                                        <p className="mt-2 text-xs leading-5 text-[#66736d]">
                                            Add screenshots, delivery evidence, product photos, or error messages. PNG, JPG, or PDF; maximum 5 MB per file.
                                        </p>
                                        {attachmentError && (
                                            <p className="mt-2 text-sm font-bold text-[#9f2d20]" role="alert">
                                                {attachmentError}
                                            </p>
                                        )}
                                    </FormField>

                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b] sm:w-fit"
                                    >
                                        Submit support request
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Reduced FAQ */}
                <section className="mx-auto max-w-[1280px] px-4 pb-20 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Seller questions
                            </p>
                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Support request questions
                            </h2>
                            <p className="text-sm leading-7 text-[#404944]">
                                Answers about requesting help and receiving support updates.
                            </p>
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

                {/* Mobile contact shortcut */}
                <button
                    type="button"
                    onClick={() => scrollToSupportForm()}
                    className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#003527] px-5 py-3 text-sm font-black text-white shadow-[0_12px_30px_rgba(0,53,39,.28)] md:hidden"
                >
                    <span className="material-symbols-outlined icon-fill text-[18px]">support_agent</span>
                    Contact support
                </button>
            </main>
        </PublicLayout>
    );
}

function ActionCard({ item, onSupportClick }) {
    const content = (
        <>
            <div className="mb-4 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[30px]">{item.icon}</span>
            </div>
            <h3 className="mb-1 text-base font-black text-[#121c2a]">{item.title}</h3>
            <p className="mb-4 text-sm leading-6 text-[#404944]">{item.text}</p>
            <span className="inline-flex items-center gap-2 text-sm font-black text-[#003527]">
        {item.label}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </span>
        </>
    );

    const className =
        "group rounded-[24px] border border-[#dbe6e1] bg-white p-5 text-left shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba] hover:shadow-[0_18px_42px_rgba(0,53,39,.09)]";

    if (item.to) {
        return (
            <Link to={item.to} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={() => onSupportClick(item.supportTopic)}
            className={className}
        >
            {content}
        </button>
    );
}

function SupportGuideRow({ article }) {
    return (
        <article className="group flex items-start gap-4 border-b border-[#dbe6e1] p-5 last:border-b-0 md:p-6">
            <div className="shrink-0 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[28px]">{article.icon}</span>
            </div>

            <div className="min-w-0 flex-1 md:flex md:items-center md:justify-between md:gap-6">
                <div>
                    <h3 className="mb-1 text-base font-black text-[#121c2a] md:text-[17px]">
                        {article.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#66736d]">{article.text}</p>
                </div>

                <Link
                    to={article.to}
                    className="mt-3 inline-flex shrink-0 items-center gap-2 text-sm font-black text-[#003527] hover:underline md:mt-0"
                >
                    {article.linkLabel}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
            </div>
        </article>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-10 text-center shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
            <span className="material-symbols-outlined mb-3 block text-[42px] text-[#9aada7]">search_off</span>
            <h3 className="mb-2 text-lg font-black text-[#121c2a]">No seller support topics found</h3>
            <p className="mb-5 text-sm text-[#66736d]">Try another keyword or choose a different category.</p>
            <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center justify-center rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Reset search
            </button>
        </div>
    );
}

function FormField({ id, label, optional = false, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-black text-[#121c2a]">
                {label}
                {optional && <span className="ml-1 font-semibold text-[#66736d]">(optional)</span>}
            </label>
            {children}
        </div>
    );
}

function SupportSuccess({ reference, onReset }) {
    return (
        <div className="rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-6" role="status">
      <span className="material-symbols-outlined icon-fill mb-3 block text-[36px] text-[#003527]">
        check_circle
      </span>
            <h3 className="mb-2 text-xl font-black text-[#121c2a]">Support request received</h3>
            <p className="max-w-xl text-sm leading-7 text-[#404944]">
                Your request has been received. Support updates will be sent to the email address you provided after the team reviews the issue.
            </p>
            <div className="mt-4 inline-flex rounded-xl border border-[#b7e4d1] bg-white px-4 py-2 text-sm font-black text-[#003527]">
                Request reference: {reference}
            </div>
            <button
                type="button"
                onClick={onReset}
                className="mt-5 block rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Submit another request
            </button>
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
