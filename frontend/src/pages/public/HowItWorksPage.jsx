import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const quickFacts = [
    {
        icon: "shield_locked",
        title: "Payment protection",
        text: "Payment is held until delivery or collection is confirmed.",
    },
    {
        icon: "route",
        title: "Clear order journey",
        text: "Buyers and sellers can follow each step after checkout.",
    },
    {
        icon: "storefront",
        title: "Click & Collect",
        text: "Buyers can collect directly from eligible local sellers.",
    },
    {
        icon: "payments",
        title: "No monthly fee",
        text: "Sellers only pay a platform commission when a sale completes.",
    },
];

const buyerSteps = [
    {
        number: "01",
        icon: "search",
        title: "Browse products",
        text: "Search products, explore stores, compare prices and check seller ratings.",
    },
    {
        number: "02",
        icon: "shopping_bag",
        title: "Checkout securely",
        text: "Place your order through Open Market using a protected payment flow.",
    },
    {
        number: "03",
        icon: "local_shipping",
        title: "Track or collect",
        text: "Follow delivery updates, or collect from the seller with Click & Collect.",
    },
    {
        number: "04",
        icon: "verified_user",
        title: "Confirm & review",
        text: "Confirm delivery, rate the seller, and help other buyers shop with confidence.",
        accent: true,
    },
];

const sellerSteps = [
    {
        number: "01",
        icon: "person_add",
        title: "Register as seller",
        text: "Create a seller account and complete your email and phone verification.",
    },
    {
        number: "02",
        icon: "storefront",
        title: "Set up your store",
        text: "Add your store name, category, location, and seller profile details.",
    },
    {
        number: "03",
        icon: "inventory_2",
        title: "List your products",
        text: "Upload photos, add prices, set stock, and use AI-assisted listing drafts.",
    },
    {
        number: "04",
        icon: "payments",
        title: "Fulfil & get paid",
        text: "Deliver or arrange collection. Payouts process after confirmation - no monthly fee.",
        accent: true,
    },
];

const protectionItems = [
    {
        icon: "shield_locked",
        title: "Protected payments",
        text: "Payments are held securely by Open Market until delivery or collection is confirmed by the buyer.",
        accent: "gold",
    },
    {
        icon: "support_agent",
        title: "Dispute support",
        text: "If something goes wrong, buyers and sellers can open a dispute. Open Market reviews and helps resolve it.",
        accent: "sage",
    },
    {
        icon: "verified_user",
        title: "Verified sellers",
        text: "Seller verification and buyer reviews help build trust and confidence across the marketplace.",
        accent: "sage",
    },
];

const timeline = [
    {
        number: "1",
        title: "Order placed",
        text: "Buyer completes checkout. Payment is held securely by Open Market.",
    },
    {
        number: "2",
        title: "Seller accepts the order",
        text: "The seller is notified and accepts the order, then prepares for delivery or collection.",
    },
    {
        number: "3",
        title: "Delivery or Click & Collect",
        text: "The seller arranges delivery via courier, or the buyer collects directly from the seller's location.",
    },
    {
        number: "4",
        title: "Buyer confirms receipt",
        text: "The buyer confirms the order was received in the expected condition. Disputes can be raised here if needed.",
    },
    {
        number: "5",
        title: "Seller payout released",
        text: "Once confirmed, the seller's payout is processed - minus the 5% platform commission only.",
        accent: true,
    },
];

const faqs = [
    {
        question: "When is the seller paid?",
        answer:
            "Seller payout happens after delivery or collection has been confirmed by the buyer, and after any applicable dispute window has passed. The payout amount is the sale price minus the 5% platform commission.",
    },
    {
        question: "Can buyers collect from a seller?",
        answer:
            "Yes. Sellers can enable Click & Collect, which lets buyers pay online and collect from an approved seller location. No courier fee is charged for collection orders.",
    },
    {
        question: "What happens if there is a problem with an order?",
        answer:
            "The buyer can contact support or open a dispute before confirming receipt. Open Market reviews the issue and, if valid, can hold or reverse the payout before it reaches the seller.",
    },
    {
        question: "Does it cost anything to list products?",
        answer:
            "No. Listing products and setting up your store is completely free. Open Market only charges a 5% commission on completed sales - there are no monthly fees or listing costs.",
    },
    {
        question: "How do I know a seller is trustworthy?",
        answer:
            "Sellers go through phone and email verification. Buyers can also check their store rating, read buyer reviews, and view order history before making a purchase.",
    },
];

export default function HowItWorksPage() {
    const [activeJourney, setActiveJourney] = useState("buyer");
    const [openFaq, setOpenFaq] = useState(0);

    const activeSteps = activeJourney === "buyer" ? buyerSteps : sellerSteps;

    useEffect(() => {
        const revealElements = document.querySelectorAll("[data-how-reveal]");

        if (!("IntersectionObserver" in window)) {
            revealElements.forEach((element) => element.classList.add("is-visible"));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -40px 0px", threshold: 0.08 },
        );

        revealElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [activeJourney]);

    return (
        <PublicLayout>
            <style>{`
        .how-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,0.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,0.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        .how-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.55s cubic-bezier(.22,1,.36,1),
            transform 0.55s cubic-bezier(.22,1,.36,1);
        }

        .how-reveal.is-visible {
          opacity: 1;
          transform: none;
        }

        .stepper {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .stepper-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          position: relative;
          padding-bottom: 32px;
        }

        .stepper-item:last-child {
          padding-bottom: 0;
        }

        .stepper-item:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 19px;
          top: 42px;
          width: 2px;
          bottom: 0;
          background: linear-gradient(to bottom, #95d3ba, rgba(149,211,186,0.2));
        }

        .timeline-item:not(:last-child)::before {
          content: "";
          position: absolute;
          left: 21px;
          top: 44px;
          width: 2px;
          bottom: 0;
          background: linear-gradient(to bottom, #003527, #95d3ba);
          opacity: 0.5;
          z-index: 0;
        }

        .timeline-item > div:first-child {
          position: relative;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .stepper {
            flex-direction: row;
            align-items: flex-start;
            background: white;
            border: 1px solid #dbe6e1;
            border-radius: 28px;
            padding: 32px 36px;
            box-shadow: 0 6px 28px rgba(0,53,39,0.05);
            position: relative;
          }

          .stepper::before {
            content: "";
            position: absolute;
            top: 51px;
            left: 72px;
            right: 72px;
            height: 2px;
            background: linear-gradient(to right, #95d3ba, rgba(149,211,186,0.25));
            z-index: 0;
          }

          .stepper-item {
            flex: 1;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-bottom: 0;
            gap: 14px;
          }

          .stepper-item:not(:last-child)::before {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .how-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

            <main className="bg-[#f8f9ff]">
                {/* Hero */}
                <section className="how-hero pb-5">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  route
                </span>
                How Open Market works
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                Simple local shopping{" "}
                                <span className="text-[#fed65b]">
                  with protection built in.
                </span>
                            </h1>

                            <p className="max-w-[600px] text-[17px] leading-8 text-white/70">
                                See how buying, selling, delivery, collection, and payouts work
                                on Open Market.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/shop"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-[#fed65b] px-7 py-[18px] text-[15px] font-black text-[#3a2e00] shadow-[0_12px_32px_rgba(254,214,91,.4)] transition hover:opacity-90 sm:w-auto"
                                >
                                    Start shopping
                                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                                </Link>

                                <Link
                                    to="/become-seller"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] border border-white/25 px-7 py-[18px] text-[15px] font-black text-white transition hover:bg-white/10 sm:w-auto"
                                >
                                    Become a seller
                                    <span className="material-symbols-outlined text-[18px]">
                    storefront
                  </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick facts */}
                <section className="how-reveal py-8" data-how-reveal>
                    <div className="mx-auto max-w-[1280px] px-4 md:px-10">
                        <div>
                            <div className="mb-6">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Quick facts
                                </p>

                                <h2 className="mb-2 text-[24px] font-black leading-tight tracking-[-0.035em] text-[#121c2a]">
                                    Built for safer local buying and selling
                                </h2>

                                <p className="max-w-xl text-sm leading-7 text-[#404944]">
                                    A simple order flow with payment protection, collection
                                    support, and clear seller fees.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {quickFacts.map((fact, index) => (
                                    <QuickFact
                                        key={fact.title}
                                        fact={fact}
                                        hasBorder={index !== quickFacts.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    aria-hidden="true"
                    className="mx-auto h-px max-w-[640px] bg-[linear-gradient(to_right,transparent_0%,#95d3ba_30%,#003527_50%,#95d3ba_70%,transparent_100%)] opacity-35"
                />

                {/* Buyer / Seller journey */}
                <section
                    className="how-reveal mx-auto max-w-[1280px] px-4 py-14 md:px-10"
                    data-how-reveal
                >
                    <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Step-by-step journey
                            </p>
                            <h2 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                How does it work?
                            </h2>
                        </div>

                        <div
                            className="flex w-fit gap-2 rounded-[20px] border border-[#dbe6e1] bg-white p-1.5"
                            role="tablist"
                            aria-label="Journey view"
                        >
                            <JourneyTab
                                active={activeJourney === "buyer"}
                                icon="shopping_bag"
                                label="I'm a Buyer"
                                onClick={() => setActiveJourney("buyer")}
                            />
                            <JourneyTab
                                active={activeJourney === "seller"}
                                icon="storefront"
                                label="I'm a Seller"
                                onClick={() => setActiveJourney("seller")}
                            />
                        </div>
                    </div>

                    <div className="stepper">
                        {activeSteps.map((step) => (
                            <StepperItem key={step.number} step={step} />
                        ))}
                    </div>

                    {activeJourney === "buyer" ? (
                        <TipBox
                            tone="buyer"
                            text={
                                <>
                                    <strong>Payment protection:</strong> Your payment is held
                                    safely until delivery or collection is confirmed. If something
                                    goes wrong, contact support to open a dispute before funds
                                    release.
                                </>
                            }
                        />
                    ) : (
                        <TipBox
                            tone="seller"
                            text={
                                <>
                                    <strong>Only pay when you sell:</strong> There are no monthly
                                    fees. You only pay a 5% platform commission when a sale
                                    completes, so listing and setting up your store is always
                                    free.
                                </>
                            }
                        />
                    )}
                </section>

                {/* Payment Protection */}
                <section
                    className="how-reveal mx-auto max-w-[1280px] px-4 pb-16 md:px-10"
                    data-how-reveal
                >
                    <div className="rounded-[32px] bg-[#003527] p-8 md:p-12 [background-image:radial-gradient(circle_at_90%_10%,rgba(149,211,186,0.18),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(254,214,91,0.1),transparent_40%)]">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-5 lg:pr-8">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[36px] text-[#fed65b]">
                  shield_locked
                </span>

                                <h2 className="mb-4 text-[28px] font-black leading-tight tracking-[-0.04em] text-white md:text-[38px]">
                                    Payment Protection keeps every order safer.
                                </h2>

                                <p className="mb-6 text-sm leading-7 text-white/70 md:text-base">
                                    Payments are held during checkout and released after delivery
                                    or collection is confirmed. Buyers get protection if something
                                    goes wrong, and sellers get paid after completed orders.
                                </p>

                                <Link
                                    to="/how-protection-works"
                                    className="inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                                >
                                    Learn about Payment Protection
                                    <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:col-span-7">
                                {protectionItems.map((item) => (
                                    <ProtectionCard key={item.title} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Timeline */}
                <section
                    className="how-reveal mx-auto max-w-[1280px] px-4 pb-16 md:px-10"
                    data-how-reveal
                >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Order timeline
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                What happens after checkout?
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                A clear order status helps both buyers and sellers know exactly
                                what to do at every stage.
                            </p>
                        </div>

                        <div className="lg:col-span-8">
                            <div>
                                <div>
                                    {timeline.map((item) => (
                                        <TimelineItem key={item.number} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section
                    className="how-reveal mx-auto max-w-[1280px] px-4 pb-16 md:px-10"
                    data-how-reveal
                >
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Common questions
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Questions about how it works
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                Quick answers to the most important parts of the buying and
                                selling process.
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

                {/* Final CTA */}
                <section
                    className="how-reveal mx-auto max-w-[1280px] px-4 pb-16 md:px-10"
                    data-how-reveal
                >
                    <div className="rounded-[32px] bg-[#003527] p-8 text-center text-white shadow-[0_24px_56px_rgba(0,53,39,.20)] [background-image:radial-gradient(circle_at_90%_10%,rgba(149,211,186,0.18),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(254,214,91,0.1),transparent_40%)] md:p-14">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                            <span className="material-symbols-outlined icon-fill text-[15px]">
                                shopping_bag
                            </span>
                            Ready to get started
                        </div>

                        <h2 className="mx-auto mb-4 max-w-2xl text-[28px] font-black leading-tight tracking-[-0.04em] md:text-[42px]">
                            Ready to use Open Market?
                        </h2>

                        <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                            Start as a buyer today, or register as a seller and open your
                            local online store - no monthly fees.
                        </p>

                        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center gap-2 rounded-[18px] bg-[#fed65b] px-7 py-[18px] text-[15px] font-black text-[#3a2e00] shadow-[0_8px_24px_rgba(254,214,91,0.3)] transition hover:opacity-90"
                            >
                                Browse products
                                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
                            </Link>

                            <Link
                                to="/register-seller"
                                className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/25 px-7 py-[18px] text-[15px] font-black text-white transition hover:bg-white/10"
                            >
                                Register as seller
                                <span className="material-symbols-outlined text-[18px]">
                  storefront
                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}

function QuickFact({ fact, hasBorder }) {
    return (
        <div
            className={`flex items-start gap-3 ${
                hasBorder ? "lg:border-r lg:border-[#dbe6e1] lg:pr-5" : ""
            }`}
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[22px]">
          {fact.icon}
        </span>
            </div>

            <div>
                <strong className="mb-1 block text-sm font-black leading-tight text-[#121c2a]">
                    {fact.title}
                </strong>
                <span className="block text-[13px] font-semibold leading-6 text-[#66736d]">
          {fact.text}
        </span>
            </div>
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
            className={`inline-flex items-center gap-2 rounded-[14px] px-5 py-2.5 text-[13px] font-black transition ${
                active
                    ? "bg-[#003527] text-white shadow-[0_4px_14px_rgba(0,53,39,.25)]"
                    : "text-[#66736d] hover:bg-[#f0faf6] hover:text-[#003527]"
            }`}
        >
      <span className="material-symbols-outlined icon-fill text-[18px]">
        {icon}
      </span>
            {label}
        </button>
    );
}

function StepperItem({ step }) {
    return (
        <div className="stepper-item">
            <div
                className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-[13px] font-black transition ${
                    step.accent
                        ? "bg-[#fed65b] text-[#3a2e00] shadow-[0_4px_14px_rgba(254,214,91,.35)]"
                        : "bg-[#003527] text-white"
                }`}
            >
                {step.number}
            </div>

            <div className="flex-1 pt-1.5 md:pt-0">
                <h3 className="mb-1 flex items-center gap-2 text-[15px] font-black text-[#121c2a] md:justify-center md:text-sm">
                    {step.title}
                    <span className="material-symbols-outlined icon-fill text-[18px] text-[#003527]/70 md:hidden">
            {step.icon}
          </span>
                </h3>

                <p className="text-[13px] leading-7 text-[#66736d] md:text-xs">
                    {step.text}
                </p>
            </div>
        </div>
    );
}

function TipBox({ text, tone }) {
    const seller = tone === "seller";

    return (
        <div
            className={`mt-6 flex items-start gap-3 rounded-[18px] border p-5 ${
                seller
                    ? "border-[#fde68a] bg-[#fffdf4] text-[#854d0e]"
                    : "border-[#b7e4d1] bg-[#f0faf6] text-[#003527]"
            }`}
        >
      <span className="material-symbols-outlined icon-fill mt-0.5 text-[22px]">
        tips_and_updates
      </span>
            <p className="text-sm leading-7">{text}</p>
        </div>
    );
}

function ProtectionCard({ item }) {
    const gold = item.accent === "gold";

    return (
        <article className="flex items-start gap-4">
            <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center ${
                    gold ? "text-[#fed65b]" : "text-[#95d3ba]"
                }`}
            >
        <span className="material-symbols-outlined icon-fill">
          {item.icon}
        </span>
            </div>

            <div>
                <h3 className="mb-1 font-black text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-white/60">{item.text}</p>
            </div>
        </article>
    );
}

function TimelineItem({ item }) {
    return (
        <div className="timeline-item relative flex items-start gap-5 pb-7 last:pb-0">
            <div
                className={`relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[13px] font-black shadow-[0_4px_14px_rgba(0,53,39,.3)] ${
                    item.accent
                        ? "bg-[#fed65b] text-[#3a2e00] shadow-[0_4px_14px_rgba(254,214,91,.4)]"
                        : "bg-[#003527] text-white"
                }`}
            >
                {item.number}
            </div>

            <div className="pt-2">
                <h3 className="mb-1 text-[15px] font-black text-[#121c2a]">
                    {item.title}
                </h3>
                <p className="text-[13px] leading-7 text-[#66736d]">{item.text}</p>
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

                <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center transition ${
                        open ? "rotate-180 text-[#003527]" : "text-[#003527]"
                    }`}
                >
          <span className="material-symbols-outlined text-[16px]">
            keyboard_arrow_down
          </span>
        </span>
            </button>

            {open && (
                <p className="pb-5 text-sm leading-7 text-[#404944]">{faq.answer}</p>
            )}
        </div>
    );
}
