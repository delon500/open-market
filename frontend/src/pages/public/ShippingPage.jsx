import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const deliveryOptions = [
    {
        icon: "local_shipping",
        title: "Courier delivery",
        text: "The seller prepares the order and a courier delivers it to the buyer's address.",
    },
    {
        icon: "delivery_truck_speed",
        title: "Local seller delivery",
        text: "Some sellers may offer local delivery in their area, depending on distance and availability.",
    },
    {
        icon: "storefront",
        title: "Click & Collect",
        text: "Buy online and collect directly from the seller's approved collection location.",
    },
];

const deliverySteps = [
    {
        number: "01",
        title: "Buyer places an order",
        text: "The buyer checks product details, delivery options, and completes checkout.",
        icon: "shopping_bag",
    },
    {
        number: "02",
        title: "Seller prepares the item",
        text: "The seller confirms the order, prepares the product, and updates fulfilment progress.",
        icon: "inventory_2",
    },
    {
        number: "03",
        title: "Delivery or collection happens",
        text: "The order is delivered by courier, delivered locally, or collected by the buyer.",
        icon: "local_shipping",
    },
    {
        number: "04",
        title: "Buyer confirms receipt",
        text: "The buyer confirms that the item was received or collected in the expected condition.",
        icon: "verified_user",
    },
];

const feeFactors = [
    "Seller location",
    "Buyer delivery address",
    "Product size or weight",
    "Delivery method selected",
    "Courier or local delivery availability",
];

const buyerTips = [
    "Check delivery or collection details before checkout.",
    "Do not confirm receipt until you have received the correct item.",
    "Use your order tracking page to follow updates.",
    "Contact support or open a dispute if something goes wrong.",
];

const sellerTips = [
    "Prepare orders within the stated timeframe.",
    "Use accurate delivery or collection details.",
    "Communicate delays clearly with the buyer.",
    "Only mark fulfilment complete when delivery or collection is done.",
];

const trackingPlaces = [
    {
        icon: "receipt_long",
        title: "My Orders",
        text: "View all your orders and their current status.",
    },
    {
        icon: "route",
        title: "Order Tracking",
        text: "Follow the order from checkout to delivery or collection confirmation.",
    },
    {
        icon: "notifications",
        title: "Notifications",
        text: "Get updates when the order status changes.",
    },
];

const faqs = [
    {
        question: "Are delivery fees shown before payment?",
        answer:
            "Yes. Delivery or collection fees should be shown at checkout before the buyer completes payment.",
    },
    {
        question: "Can I collect from a seller?",
        answer:
            "Yes. If the seller offers Click & Collect, buyers can pay online and collect from the seller's approved collection location.",
    },
    {
        question: "What should I do if my delivery does not arrive?",
        answer:
            "Do not confirm receipt. Go to your order details page and contact support or open a dispute so the issue can be reviewed.",
    },
    {
        question: "When can the seller receive payout?",
        answer:
            "Seller payout can be processed after delivery or collection is confirmed, and after any dispute checks are complete.",
    },
];

export default function ShippingPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <PublicLayout>
            <style>{`
        .shipping-hero {
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
      `}</style>

            <main className="bg-[#f6f9f7]">
                {/* Hero */}
                <section className="shipping-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  local_shipping
                </span>
                Shipping Info
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                Delivery & Collection{" "}
                                <span className="text-[#fed65b]">made simple.</span>
                            </h1>

                            <p className="max-w-[640px] text-[17px] leading-8 text-white/70">
                                Open Market supports courier delivery, local seller delivery,
                                and Click & Collect, with protected payment until delivery or
                                collection is confirmed.
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
                                    to="/how-it-works"
                                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/25 px-7 py-[18px] text-[15px] font-black text-white transition hover:bg-white/10"
                                >
                                    How it works
                                    <span className="material-symbols-outlined text-[18px]">
                    route
                  </span>
                                </Link>
                            </div>

                            <Link
                                to="/my-orders"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
                            >
                                <span className="material-symbols-outlined icon-fill text-[18px] text-[#fed65b]">
                                    local_shipping
                                </span>
                                Already placed an order? Track your delivery
                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Delivery options */}
                <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-10 md:py-14">
                    <SectionHeading
                        eyebrow="Delivery options"
                        title="Choose the fulfilment method that works best"
                        text="Available options may depend on the seller, product type, buyer location, and seller location."
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {deliveryOptions.map((option) => (
                            <OptionCard key={option.title} option={option} />
                        ))}
                    </div>
                </section>

                {/* How delivery works */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="rounded-[32px] bg-[#003527] p-8 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-10 lg:col-span-5">
              <span className="material-symbols-outlined icon-fill mb-4 block text-[38px] text-[#fed65b]">
                route
              </span>

                            <h2 className="mb-4 text-[30px] font-black leading-tight tracking-[-0.04em] md:text-[42px]">
                                How delivery and collection work
                            </h2>

                            <p className="text-sm leading-7 text-white/70 md:text-base">
                                Every order has a clear journey. Buyers can follow progress, and
                                sellers can update fulfilment until the order is delivered or
                                collected.
                            </p>

                            <Link
                                to="/my-orders"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                            >
                                Track your orders
                                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
                            </Link>
                        </div>

                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-10 lg:col-span-7">
                            {deliverySteps.map((step) => (
                                <DeliveryStep key={step.number} step={step} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Click and collect */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="overflow-hidden rounded-[32px] border border-[#95d3ba] bg-[#f0faf6] shadow-[0_8px_38px_rgba(0,53,39,0.06)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#95d3ba] bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#003527]">
                  <span className="material-symbols-outlined icon-fill text-[15px]">
                    storefront
                  </span>
                  Click & Collect
                </span>

                                <h2 className="mt-5 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[42px]">
                                    Buy online and collect from the seller.
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-[#404944] md:text-base">
                                    Click & Collect lets nearby buyers collect directly from an
                                    approved seller location. It can be faster and may remove
                                    courier delivery costs.
                                </p>

                                <ul className="mt-6 space-y-3">
                                    <CheckItem text="Buyer pays online before collection." />
                                    <CheckItem text="No courier fee for collection orders." />
                                    <CheckItem text="Seller provides a collection location and available times." />
                                    <CheckItem text="Buyer confirms collection before seller payout can process." />
                                </ul>
                            </div>

                            <div className="bg-[#003527] p-8 text-white md:p-10">
                                <div className="rounded-[28px] border border-white/15 bg-white/10 p-6">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-black text-[#95d3ba]">
                                                Example collection
                                            </p>
                                            <h3 className="text-2xl font-black">Kasi Kicks</h3>
                                        </div>

                                        <span className="material-symbols-outlined icon-fill text-[34px] text-[#fed65b]">
                      store
                    </span>
                                    </div>

                                    <div className="space-y-3">
                                        <CollectionRow icon="location_on" label="Soweto, Johannesburg" />
                                        <CollectionRow icon="schedule" label="Ready in 1-2 hours" />
                                        <CollectionRow icon="confirmation_number" label="Collection code required" />
                                        <CollectionRow icon="shield_locked" label="Payment protected until confirmed" />
                                    </div>

                                    <Link
                                        to="/shop"
                                        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-5 py-4 text-sm font-black text-[#3a2e00] transition hover:opacity-90"
                                    >
                                        Browse collection items
                                        <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fees and tracking */}
                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 pb-14 md:px-10 md:pb-16 lg:grid-cols-12">
                    <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8 lg:col-span-5">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
              payments
            </span>

                        <h2 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#121c2a]">
                            Delivery fees
                        </h2>

                        <p className="mb-6 text-sm leading-7 text-[#404944]">
                            Delivery fees are shown at checkout before payment. The final cost
                            may depend on:
                        </p>

                        <ul className="space-y-3">
                            {feeFactors.map((item) => (
                                <CheckItem key={item} text={item} />
                            ))}
                        </ul>

                        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#95d3ba] bg-[#f0faf6] p-4">
                            <span className="material-symbols-outlined icon-fill mt-0.5 text-[20px] text-[#003527]">
                                verified
                            </span>
                            <p className="text-sm font-bold leading-6 text-[#121c2a]">
                                No surprises at checkout. Whatever the combination, your exact
                                delivery fee is calculated automatically and shown clearly
                                before you pay.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8 lg:col-span-7">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
              track_changes
            </span>

                        <h2 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#121c2a]">
                            Track delivery updates
                        </h2>

                        <p className="mb-6 text-sm leading-7 text-[#404944]">
                            Buyers can follow delivery and collection progress from their
                            account.
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {trackingPlaces.map((item) => (
                                <TrackingCard key={item.title} item={item} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Safety responsibilities */}
                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 pb-14 md:px-10 md:pb-16 lg:grid-cols-2">
                    <SafetyPanel
                        icon="shopping_bag"
                        title="Buyer delivery tips"
                        text="Buyers should check the item before confirming receipt."
                        items={buyerTips}
                    />

                    <SafetyPanel
                        icon="storefront"
                        title="Seller delivery responsibilities"
                        text="Sellers should keep fulfilment clear, accurate, and on time."
                        items={sellerTips}
                    />
                </section>

                {/* Protection notice */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] bg-[#003527] p-8 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)] md:p-12">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[36px] text-[#fed65b]">
                  shield_locked
                </span>

                                <h2 className="mb-4 text-[28px] font-black leading-tight tracking-[-0.04em] md:text-[40px]">
                                    Payment stays protected until confirmation.
                                </h2>

                                <p className="text-sm leading-7 text-white/70 md:text-base">
                                    Buyers should only confirm delivery or collection after
                                    receiving the correct item. If something is wrong, support can
                                    review the issue before payout is completed.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 lg:col-span-7">
                                <ProtectionPoint
                                    icon="warning"
                                    title="Do not confirm too early"
                                    text="Only confirm after you have received or collected the correct product."
                                />
                                <ProtectionPoint
                                    icon="support_agent"
                                    title="Contact support"
                                    text="If delivery fails or the item is wrong, contact support or open a dispute."
                                />
                                <ProtectionPoint
                                    icon="payments"
                                    title="Seller payout follows confirmation"
                                    text="Payout can be processed after the order is confirmed and no dispute is active."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Common questions
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Delivery & Collection questions
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                Quick answers about delivery fees, collection, tracking, and
                                confirmation.
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
            </main>
        </PublicLayout>
    );
}

function SectionHeading({ eyebrow, title, text }) {
    return (
        <div className="mb-8 max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                {eyebrow}
            </p>

            <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[42px]">
                {title}
            </h2>

            <p className="text-sm leading-7 text-[#404944] md:text-base">{text}</p>
        </div>
    );
}

function OptionCard({ option }) {
    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-white p-6 shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba] hover:shadow-[0_18px_42px_rgba(0,53,39,.09)]">
            <div className="mb-4 text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[34px]">
          {option.icon}
        </span>
            </div>

            <h3 className="mb-2 text-lg font-black text-[#121c2a]">
                {option.title}
            </h3>

            <p className="text-sm leading-7 text-[#404944]">{option.text}</p>
        </article>
    );
}

function DeliveryStep({ step }) {
    return (
        <div className="timeline-item relative flex items-start gap-5 pb-7 last:pb-0">
            <div className="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white shadow-[0_4px_14px_rgba(0,53,39,.3)]">
                {step.number}
            </div>

            <div className="pt-1">
                <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-[15px] font-black text-[#121c2a]">
                        {step.title}
                    </h3>

                    <span className="material-symbols-outlined icon-fill text-[18px] text-[#003527]">
            {step.icon}
          </span>
                </div>

                <p className="text-sm leading-7 text-[#66736d]">{step.text}</p>
            </div>
        </div>
    );
}

function CheckItem({ text }) {
    return (
        <li className="flex items-start gap-3">
      <span className="material-symbols-outlined icon-fill mt-0.5 text-[18px] text-[#003527]">
        check_circle
      </span>
            <span className="text-sm font-semibold leading-6 text-[#404944]">
        {text}
      </span>
        </li>
    );
}

function CollectionRow({ icon, label }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
      <span className="material-symbols-outlined icon-fill text-[#fed65b]">
        {icon}
      </span>
            <span className="text-sm font-bold text-white/80">{label}</span>
        </div>
    );
}

function TrackingCard({ item }) {
    return (
        <article className="rounded-[22px] border border-[#dbe6e1] bg-[#f8fbf9] p-5">
      <span className="material-symbols-outlined icon-fill mb-3 block text-[28px] text-[#003527]">
        {item.icon}
      </span>

            <h3 className="mb-2 font-black text-[#121c2a]">{item.title}</h3>

            <p className="text-sm leading-6 text-[#66736d]">{item.text}</p>
        </article>
    );
}

function SafetyPanel({ icon, title, text, items }) {
    return (
        <article className="rounded-[32px] border border-[#dbe6e1] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8">
            <div className="mb-5 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[34px]">{icon}</span>
            </div>

            <h2 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#121c2a]">
                {title}
            </h2>

            <p className="mb-6 text-sm leading-7 text-[#404944]">{text}</p>

            <ul className="space-y-3">
                {items.map((item) => (
                    <CheckItem key={item} text={item} />
                ))}
            </ul>
        </article>
    );
}

function ProtectionPoint({ icon, title, text }) {
    return (
        <div className="flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
            <div className="shrink-0 text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[28px]">{icon}</span>
            </div>

            <div>
                <h3 className="mb-1 font-black text-white">{title}</h3>
                <p className="text-sm leading-7 text-white/60">{text}</p>
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
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        open
                            ? "rotate-180 text-[#003527]"
                            : "text-[#003527]"
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
