import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const trustPillars = [
    {
        icon: "shield_locked",
        title: "Buyer Protection",
        text: "Your payment is held by Open Market until delivery or collection is confirmed.",
    },
    {
        icon: "verified_user",
        title: "Verified stores",
        text: "Sellers pass identity, mobile, and bank checks before earning the verified mark.",
        badge: {
            initials: "KM",
            name: "Karabo M.",
            label: "Verified",
        },
    },
    {
        icon: "support_agent",
        title: "Dispute support",
        text: "If something goes wrong, support can review the order before payout is released.",
    },
    {
        icon: "rate_review",
        title: "Ratings & reviews",
        text: "Reviews come only from verified purchases, so the feedback you read reflects real orders.",
    },
];

const simulationSteps = {
    buyer: [
        {
            step: "01",
            title: "Checkout & secure payment",
            icon: "shopping_bag",
            desc: "You pay securely through Open Market. The payment is held by the platform, not sent straight to the seller.",
            badge: "Held by platform",
        },
        {
            step: "02",
            title: "Payment is held",
            icon: "shield_locked",
            desc: "Open Market holds the payment while the seller prepares the order for delivery or collection.",
            badge: "Payment held",
        },
        {
            step: "03",
            title: "Delivery & inspection",
            icon: "local_shipping",
            desc: "The seller delivers your order or sets up a Click & Collect point. You inspect the item when it arrives.",
            badge: "Inspect order",
        },
        {
            step: "04",
            title: "Confirm & release payment",
            icon: "verified",
            desc: "Once you are happy, confirm receipt in the app. Open Market then releases the payout to the seller.",
            badge: "Payout released",
        },
    ],
    seller: [
        {
            step: "01",
            title: "New order received",
            icon: "notifications_active",
            desc: "A buyer checks out your listing. Open Market confirms their payment was authorised.",
            badge: "Verifying funds",
        },
        {
            step: "02",
            title: "Payment is held",
            icon: "lock_clock",
            desc: "Open Market holds the buyer's payment while you prepare the order for delivery or collection.",
            badge: "Payment received",
        },
        {
            step: "03",
            title: "Dispatch & track",
            icon: "local_shipping",
            desc: "Ship with a tracked courier or arrange handover, then add your delivery proof to the order.",
            badge: "Fulfilment live",
        },
        {
            step: "04",
            title: "Payout released",
            icon: "payments",
            desc: "The buyer confirms delivery. Open Market releases the payout to your account.",
            badge: "Payout released",
        },
    ],
};

const buyerSafetyTips = [
    "Check seller ratings and reviews before placing an order.",
    "Read product descriptions, condition notes, and delivery details carefully.",
    "Do not confirm delivery until you have received the correct item.",
    "Open a dispute if something goes wrong with the order.",
];

const sellerSafetyTips = [
    "Use accurate product photos and honest descriptions.",
    "Keep buyers updated about delivery or collection status.",
    "Only mark orders as fulfilled when delivery or collection is complete.",
    "Respond to buyer questions quickly and professionally.",
];

const disputePoints = [
    {
        icon: "report",
        title: "Raise the issue",
        text: "Open a dispute from your order details page, or contact support.",
    },
    {
        icon: "fact_check",
        title: "We review the details",
        text: "Support checks order status, messages, delivery proof, and product details.",
    },
    {
        icon: "handshake",
        title: "It is resolved fairly",
        text: "Support guides the next step before any payout is released to the seller.",
    },
];

const actionCards = [
    {
        icon: "verified",
        title: "Explore verified businesses",
        text: "Browse stores that have completed our identity and background checks, so you can shop with confidence.",
        action: "Browse verified stores",
        to: "/stores",
        tone: "default",
    },
    {
        icon: "gavel",
        title: "Need to escalate a dispute?",
        text: "Delivery delays, payout errors, or an unresolved problem with an order? Open a dispute and our team will help.",
        action: "Open a dispute request",
        to: "/contact?topic=dispute",
        tone: "danger",
    },
];

const faqs = [
    {
        question: "When does the seller receive payment?",
        answer:
            "Payout is processed after you confirm delivery or collection, and once any dispute checks are complete.",
    },
    {
        question: "What if my item does not arrive?",
        answer:
            "Do not confirm delivery. Contact support or open a dispute from your order details page so we can review it.",
    },
    {
        question: "Can I collect from a seller in person?",
        answer:
            "Yes. Sellers can offer Click & Collect, where you pay online and collect from an approved seller location.",
    },
    {
        question: "How does Open Market build trust?",
        answer:
            "Through seller verification, protected payments, order tracking, dispute support, and reviews from real buyers.",
    },
];

export default function TrustSafetyPage() {
    const [openFaq, setOpenFaq] = useState(0);
    const [activeSimulation, setActiveSimulation] = useState("buyer");

    function handleSimulationKeyDown(event, nextType) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
            return;
        }

        event.preventDefault();
        setActiveSimulation(nextType);
    }

    return (
        <PublicLayout>
            <style>{`
        .trust-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        .timeline-item:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 23px;
          top: 48px;
          width: 2px;
          bottom: 0;
          background: linear-gradient(to bottom, #003527, #95d3ba);
          opacity: 0.35;
        }

        .skip-link {
          position: absolute;
          left: 16px;
          top: -60px;
          z-index: 60;
          border-radius: 12px;
          background: #003527;
          color: white;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 800;
          transition: top .18s ease;
        }

        .skip-link:focus {
          top: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <main id="main-content" className="bg-[#f6f9f7]">
                <section className="trust-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  shield_locked
                </span>
                Trust & Safety
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                Safer buying and selling{" "}
                                <span className="text-[#fed65b]">for local orders.</span>
                            </h1>

                            <p className="max-w-[620px] text-[17px] leading-8 text-white/70">
                                Protected payments, delivery confirmation, verified sellers,
                                real reviews, and dispute support - so every order has a
                                clearer process from checkout to handover.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/shop"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#fed65b] px-7 py-[18px] text-[15px] font-black text-[#3a2e00] shadow-[0_12px_32px_rgba(254,214,91,.4)] transition hover:opacity-90"
                                >
                                    Start shopping
                                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                                </Link>

                                <Link
                                    to="/help-centre"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/25 px-7 py-[18px] text-[15px] font-black text-white transition hover:bg-white/10"
                                >
                                    Visit Help Centre
                                    <span className="material-symbols-outlined text-[18px]">
                    support_agent
                  </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-10 md:py-14">
                    <div className="mb-8 max-w-3xl">
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                            Protection built in
                        </p>

                        <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[42px]">
                            What makes Open Market safer?
                        </h2>

                        <p className="text-sm leading-7 text-[#404944] md:text-base">
                            Trust comes from clear order steps, seller accountability,
                            protected payments, and real support when something goes wrong.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {trustPillars.map((item) => (
                            <TrustCard key={item.title} item={item} />
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                        <div className="flex flex-col justify-between rounded-[32px] bg-[#003527] p-8 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-10 lg:col-span-5">
                            <div>
                <span className="material-symbols-outlined icon-fill mb-4 block text-[38px] text-[#fed65b]">
                  shield_locked
                </span>

                                <h2 className="mb-4 text-[30px] font-black leading-tight tracking-[-0.04em] md:text-[38px]">
                                    How Buyer Protection works
                                </h2>

                                <p className="mb-6 text-sm leading-7 text-white/70 md:text-base">
                                    Sellers are never paid at checkout. Your money stays protected
                                    until delivery is confirmed. Switch the view below to see your
                                    side of the process.
                                </p>
                            </div>

                            <div
                                role="tablist"
                                aria-label="View Buyer Protection steps as a buyer or a seller"
                                className="flex max-w-xs rounded-xl border border-white/10 bg-white/10 p-1"
                            >
                                <SimulationTab
                                    label="I am a Buyer"
                                    selected={activeSimulation === "buyer"}
                                    controls="buyer-protection-pipeline"
                                    onClick={() => setActiveSimulation("buyer")}
                                    onKeyDown={(event) =>
                                        handleSimulationKeyDown(event, "seller")
                                    }
                                />
                                <SimulationTab
                                    label="I am a Seller"
                                    selected={activeSimulation === "seller"}
                                    controls="buyer-protection-pipeline"
                                    onClick={() => setActiveSimulation("seller")}
                                    onKeyDown={(event) =>
                                        handleSimulationKeyDown(event, "buyer")
                                    }
                                />
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-10 lg:col-span-7">
                            <div
                                id="buyer-protection-pipeline"
                                role="tabpanel"
                                aria-live="polite"
                                tabIndex={0}
                                className="space-y-0 outline-none"
                            >
                                {simulationSteps[activeSimulation].map((step, index) => (
                                    <SimulationStep
                                        key={`${activeSimulation}-${step.step}`}
                                        step={step}
                                        last={index === simulationSteps[activeSimulation].length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 pb-14 md:px-10 md:pb-16 lg:grid-cols-2">
                    <SafetyPanel
                        icon="shopping_bag"
                        title="Buyer safety tips"
                        text="Before you confirm an order, make sure the item and delivery details match what you expected."
                        items={buyerSafetyTips}
                    />

                    <SafetyPanel
                        icon="storefront"
                        title="Seller safety tips"
                        text="Build trust by being clear, responsive, and accurate from listing to delivery confirmation."
                        items={sellerSafetyTips}
                    />
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] border border-[#c8ddd5] bg-[#f0faf6] p-8 md:p-12">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[36px] text-[#003527]">
                  support_agent
                </span>

                                <h2 className="mb-4 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[40px]">
                                    If something goes wrong, support can review the order.
                                </h2>

                                <p className="text-sm leading-7 text-[#404944] md:text-base">
                                    Do not confirm receipt if the item has not arrived or there is
                                    a serious problem. You can raise a dispute any time before the
                                    seller payout is released.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 lg:col-span-7">
                                {disputePoints.map((point) => (
                                    <DisputePoint key={point.title} point={point} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-12 md:px-10">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {actionCards.map((card) => (
                            <ActionCard key={card.title} card={card} />
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Common questions
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Trust & Safety questions
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                Quick answers about Buyer Protection, payout timing,
                                collection, and support.
                            </p>
                        </div>

                        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)] md:p-8 lg:col-span-8">
                            {faqs.map((faq, index) => (
                                <FaqItem
                                    key={faq.question}
                                    id={`trust-faq-${index + 1}`}
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

function TrustCard({ item }) {
    return (
        <article className="flex flex-col justify-between rounded-[24px] border border-[#dbe6e1] bg-white p-6 shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba] hover:shadow-[0_18px_42px_rgba(0,53,39,.09)]">
            <div>
                <div className="mb-4 text-[#003527]">
          <span className="material-symbols-outlined icon-fill">
            {item.icon}
          </span>
                </div>

                <h3 className="mb-2 text-lg font-black text-[#121c2a]">
                    {item.title}
                </h3>

                <p className="text-sm leading-6 text-[#404944]">{item.text}</p>
            </div>

            {item.badge && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#b7e4d1] bg-[#f0faf6] p-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#003527] text-[10px] font-black text-white">
                        {item.badge.initials}
                    </div>
                    <span className="max-w-[80px] truncate text-xs font-black text-[#121c2a]">
            {item.badge.name}
          </span>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-[#003527] px-1.5 py-0.5 text-[9px] font-black uppercase text-[#fed65b]">
            <span className="material-symbols-outlined icon-fill text-[10px]">
              verified
            </span>
                        {item.badge.label}
          </span>
                </div>
            )}
        </article>
    );
}

function SimulationTab({ label, selected, controls, onClick, onKeyDown }) {
    return (
        <button
            role="tab"
            aria-selected={selected}
            aria-controls={controls}
            tabIndex={selected ? 0 : -1}
            type="button"
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wider transition ${
                selected
                    ? "bg-[#fed65b] text-[#3a2e00]"
                    : "text-white hover:text-[#fed65b]"
            }`}
        >
            {label}
        </button>
    );
}

function SimulationStep({ step, last }) {
    return (
        <div
            className={`timeline-item relative flex items-start gap-5 ${
                last ? "pb-0" : "pb-7"
            }`}
        >
            <div className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white shadow-[0_4px_14px_rgba(0,53,39,.3)]">
                {step.step}
            </div>

            <div className="flex-1 pt-1">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-black text-[#121c2a]">
                            {step.title}
                        </h3>
                        <span className="material-symbols-outlined icon-fill text-[18px] text-[#003527]">
              {step.icon}
            </span>
                    </div>
                    <span className="inline-block rounded-full border border-[#b7e4d1] bg-[#f0faf6] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#003527]">
            {step.badge}
          </span>
                </div>

                <p className="text-sm leading-7 text-[#66736d]">{step.desc}</p>
            </div>
        </div>
    );
}

function SafetyPanel({ icon, title, text, items }) {
    return (
        <article className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8">
            <div className="mb-5 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[32px]">
                    {icon}
                </span>
            </div>

            <h2 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#121c2a]">
                {title}
            </h2>

            <p className="mb-6 text-sm leading-7 text-[#404944]">{text}</p>

            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
            <span className="material-symbols-outlined icon-fill mt-0.5 text-[18px] text-[#003527]">
              check_circle
            </span>
                        <span className="text-sm font-semibold leading-6 text-[#404944]">
              {item}
            </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function DisputePoint({ point }) {
    return (
        <div className="flex gap-4 rounded-[24px] border border-[#c8ddd5] bg-white p-5 shadow-[0_4px_18px_rgba(0,53,39,.04)]">
            <div className="shrink-0 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[28px]">
                    {point.icon}
                </span>
            </div>

            <div>
                <h3 className="mb-1 font-black text-[#121c2a]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#404944]">{point.text}</p>
            </div>
        </div>
    );
}

function ActionCard({ card }) {
    const danger = card.tone === "danger";

    return (
        <div
            className={`flex flex-col items-start justify-between rounded-3xl border p-6 shadow-sm ${
                danger
                    ? "border-[#fee2e2] bg-[#fdf2f2]"
                    : "border-[#dbe6e1] bg-white"
            }`}
        >
            <div>
                <div className={`mb-4 ${danger ? "text-red-700" : "text-[#003527]"}`}>
                    <span className="material-symbols-outlined icon-fill text-[28px]">
            {card.icon}
          </span>
                </div>
                <h3 className="mb-2 text-xl font-black text-[#121c2a]">
                    {card.title}
                </h3>
                <p className="mb-6 text-sm leading-6 text-[#404944]">{card.text}</p>
            </div>

            <Link
                to={card.to}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black text-white transition ${
                    danger ? "bg-red-700 hover:bg-red-800" : "bg-[#003527] hover:bg-[#064e3b]"
                }`}
            >
                {card.action}
                <span className="material-symbols-outlined text-[14px]">
          arrow_forward
        </span>
            </Link>
        </div>
    );
}

function FaqItem({ id, faq, open, onClick }) {
    return (
        <div className="border-b border-[#dbe6e1] last:border-b-0">
            <button
                type="button"
                onClick={onClick}
                aria-expanded={open}
                aria-controls={id}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-black text-[#121c2a]"
            >
                {faq.question}

                <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        open
                            ? "rotate-180 bg-[#003527] text-white"
                            : "bg-[#f6f9f7] text-[#003527]"
                    }`}
                >
          <span className="material-symbols-outlined text-[16px]">
            keyboard_arrow_down
          </span>
        </span>
            </button>

            {open && (
                <p id={id} className="pb-5 text-sm leading-7 text-[#404944]">
                    {faq.answer}
                </p>
            )}
        </div>
    );
}
