import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const benefits = [
    {
        icon: "storefront",
        title: "Create your online store",
        text: "Set up a seller profile, add your store details, and showcase products to buyers across South Africa.",
    },
    {
        icon: "auto_awesome",
        title: "AI-assisted listings",
        text: "Upload a product photo and get a ready-to-edit title, category, and description draft.",
        badge: "AI-powered",
        badgeIcon: "bolt",
        cardClass: "seller-card-ai",
        iconClass: "seller-icon-ai",
    },
    {
        icon: "shopping_bag",
        title: "Manage orders easily",
        text: "Track orders, update fulfilment progress, and communicate clearly with buyers.",
        cardClass: "seller-card-orders",
        iconClass: "seller-icon-orders",
    },
    {
        icon: "store",
        title: "Click & Collect option",
        text: "Let nearby buyers collect directly from your location, with no courier fee charged.",
        badge: "Buyer favourite",
        badgeIcon: "check_circle",
        cardClass: "seller-card-collect",
        iconClass: "seller-icon-collect",
    },
    {
        icon: "shield_locked",
        title: "Sell with protection",
        text: "Payments are held safely and released after delivery or collection is confirmed.",
        cardClass: "seller-card-protection",
        iconClass: "seller-icon-protection",
    },
    {
        icon: "support_agent",
        title: "Local support team",
        text: "Get support for seller setup, disputes, verification, and order management.",
        cardClass: "seller-card-support",
        iconClass: "seller-icon-support",
    },
];

const trustItems = [
    {
        icon: "public",
        title: "Built for South Africa",
        text: "Local sellers",
    },
    {
        icon: "shield_locked",
        title: "Protected payments",
        text: "Safer selling",
    },
    {
        icon: "verified_user",
        title: "Seller verification",
        text: "Trusted accounts",
    },
    {
        icon: "store",
        title: "Delivery or collection",
        text: "Flexible fulfilment",
    },
];

const steps = [
    {
        number: "01",
        title: "Create your seller account",
        text: "Register with your personal details and verify your email and phone number.",
    },
    {
        number: "02",
        title: "Set up your store",
        text: "Add your store name, category, location, profile details, and seller information.",
    },
    {
        number: "03",
        title: "List your products",
        text: "Upload product photos, write descriptions, or use AI-assisted listing drafts.",
    },
    {
        number: "04",
        title: "Fulfil orders",
        text: "Use delivery or Click & Collect, then confirm fulfilment so payouts can process.",
        soft: true,
    },
];

const pricingCards = [
    {
        badge: "Getting started",
        badgeIcon: "check_circle",
        price: "R0",
        summary: "to list products",
        text: "No monthly fee.",
        items: [
            "Create your store profile",
            "List products publicly",
            "Use seller onboarding tools",
        ],
    },
    {
        badge: "Only when you sell",
        badgeIcon: "star",
        price: "5%",
        summary: "platform commission",
        text: "Applied only on completed sales.",
        featured: true,
        items: [
            "Protected payment flow",
            "Order and fulfilment tracking",
            "Seller dashboard tools",
        ],
    },
    {
        badge: "Payout timing",
        badgeIcon: "payments",
        price: "On confirm",
        summary: "after delivery or collection",
        text: "Payout processes once fulfilment is confirmed by the buyer.",
        compactPrice: true,
        items: [
            "Delivery confirmation payout",
            "Click & Collect confirmation payout",
            "Dispute-aware payout handling",
        ],
    },
];

const faqs = [
    {
        question: "How long does seller setup take?",
        answer:
            "Most sellers can create an account and start setting up their store quickly. Verification may be required before listings go live.",
    },
    {
        question: "Do I pay before I sell?",
        answer:
            "No. The recommended seller model is free product listing with a commission only when a sale is completed.",
    },
    {
        question: "Can buyers collect from my store?",
        answer:
            "Yes. Click & Collect lets buyers pay online and collect directly from your store or collection location.",
    },
    {
        question: "Can I edit AI-generated listings?",
        answer:
            "Yes. AI should create a draft only. Sellers should always review, edit, price, and approve the final listing.",
    },
];

function formatRand(value) {
    return `R${Math.round(value).toLocaleString("en-ZA")}`;
}

function formatCompactRand(value) {
    return `R${Math.round(value / 1000)}k`;
}

export default function BecomeSellerPage() {
    const [productsListed, setProductsListed] = useState(20);
    const [averagePrice, setAveragePrice] = useState(350);
    const [monthlySales, setMonthlySales] = useState(15);
    const [fulfilment, setFulfilment] = useState("collect");
    const [openFaq, setOpenFaq] = useState(0);

    const earnings = useMemo(() => {
        const monthlyRevenue = averagePrice * monthlySales;
        const commission = monthlyRevenue * 0.05;
        const netMonthly = monthlyRevenue - commission;
        const netAnnual = netMonthly * 12;

        return {
            monthlyRevenue,
            netMonthly,
            netAnnual,
        };
    }, [averagePrice, monthlySales]);

    return (
        <PublicLayout>
            <BecomeSellerStyles />

            <main className="become-seller-page">
                <section className="seller-hero">
                    <div className="seller-container hero-grid">
                        <div>
                            <span className="eyebrow">
                                <span className="material-symbols-outlined icon-fill">
                                    storefront
                                </span>
                                Sell on Open Market
                            </span>

                            <h1 className="hero-title">
                                Start selling to local buyers{" "}
                                <span>with confidence.</span>
                            </h1>

                            <p className="hero-copy">
                                Open Market helps South African entrepreneurs create online
                                stores, list products, manage orders, and build trust through
                                protected payments and delivery confirmation.
                            </p>

                            <div className="hero-actions">
                                <Link to="/register-seller" className="seller-btn btn-accent">
                                    Register as seller
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>

                                <Link to="/stores" className="seller-btn btn-outline">
                                    Explore stores
                                    <span className="material-symbols-outlined">store</span>
                                </Link>
                            </div>

                            <div className="hero-pills" aria-label="Seller benefits">
                                <HeroPill icon="shield_locked" label="Protected payments" />
                                <HeroPill icon="auto_awesome" label="AI-assisted listings" />
                                <HeroPill icon="payments" label="No monthly fees" />
                            </div>
                        </div>

                        <RevenueCalculator
                            productsListed={productsListed}
                            setProductsListed={setProductsListed}
                            averagePrice={averagePrice}
                            setAveragePrice={setAveragePrice}
                            monthlySales={monthlySales}
                            setMonthlySales={setMonthlySales}
                            earnings={earnings}
                        />
                    </div>
                </section>

                <section className="trust-bar" aria-label="Seller trust points">
                    <div className="seller-container trust-grid">
                        {trustItems.map((item) => (
                            <TrustItem key={item.title} item={item} />
                        ))}
                    </div>
                </section>

                <section className="seller-section" id="why-sell">
                    <div className="seller-container">
                        <SectionHeading
                            eyebrow="Why sell here"
                            title="Everything you need to start selling online"
                            text="A focused set of tools for sellers who want to list products, manage orders, and build buyer trust without unnecessary complexity."
                        />

                        <div className="card-grid">
                            {benefits.map((benefit) => (
                                <BenefitCard key={benefit.title} benefit={benefit} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="seller-section seller-section-tight" id="ai-listings">
                    <div className="seller-container">
                        <div className="spotlight spotlight-ai">
                            <div className="spotlight-grid">
                                <div className="spotlight-copy">
                                    <span className="eyebrow eyebrow-ai">
                                        <span className="material-symbols-outlined icon-fill">
                                            auto_awesome
                                        </span>
                                        AI-powered feature
                                    </span>

                                    <h2 className="section-title section-title-spaced">
                                        List products faster with AI-assisted descriptions.
                                    </h2>

                                    <p className="section-copy spotlight-text">
                                        Writing listings can slow sellers down. Open Market
                                        helps by generating a clean draft from your product
                                        photo, then you review and edit before publishing.
                                    </p>

                                    <CheckList
                                        items={[
                                            "Upload one or more product photos.",
                                            "AI drafts title, description, category, and condition.",
                                            "Edit the draft, adjust price, and publish in minutes.",
                                            "No writing experience needed.",
                                        ]}
                                    />

                                    <Link to="/register-seller" className="seller-btn btn-primary">
                                        Try it when you register
                                        <span className="material-symbols-outlined">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>

                                <AiListingMockup />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="seller-section seller-section-tight" id="click-collect">
                    <div className="seller-container">
                        <div className="spotlight spotlight-collect reverse">
                            <div className="spotlight-grid">
                                <div className="spotlight-copy">
                                    <span className="eyebrow eyebrow-collect">
                                        <span className="material-symbols-outlined icon-fill">
                                            store
                                        </span>
                                        Fulfilment option
                                    </span>

                                    <h2 className="section-title section-title-spaced">
                                        Offer Click & Collect - buyers collect from your store.
                                    </h2>

                                    <p className="section-copy spotlight-text">
                                        Let buyers purchase online and collect directly from
                                        your location. It is useful for local shoppers who want
                                        faster fulfilment and no delivery fee.
                                    </p>

                                    <CheckList
                                        items={[
                                            "Buyers pay online and payment remains protected.",
                                            "No courier coordination or delivery cost required.",
                                            "You set your available collection hours.",
                                            "Buyers get a collection confirmation code.",
                                        ]}
                                    />

                                    <Link to="/register-seller" className="seller-btn btn-primary">
                                        Enable Click & Collect
                                        <span className="material-symbols-outlined">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>

                                <FulfilmentMockup
                                    fulfilment={fulfilment}
                                    setFulfilment={setFulfilment}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="seller-section" id="how-it-works">
                    <div className="seller-container">
                        <div className="steps-box">
                            <SectionHeading
                                eyebrow="How it works"
                                title="From registration to first order"
                                text="The seller journey is simple and focused on getting your store live."
                            />

                            <div className="steps-grid">
                                {steps.map((step) => (
                                    <StepItem key={step.number} step={step} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="seller-section seller-section-tight" id="pricing">
                    <div className="seller-container">
                        <SectionHeading
                            eyebrow="Transparent pricing"
                            title="Simple, honest fees - no surprises"
                            text="No monthly subscription and no listing fees. You only pay a small platform commission when a sale is completed."
                        />

                        <div className="pricing-grid">
                            {pricingCards.map((card) => (
                                <PricingCard key={card.badge} card={card} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="seller-section seller-section-tight" id="faq">
                    <div className="seller-container faq-wrap">
                        <SectionHeading
                            centered
                            eyebrow="FAQ"
                            title="Questions sellers usually ask"
                            text="Everything you need to know before opening your store on Open Market."
                        />

                        <div>
                            {faqs.map((faq, index) => (
                                <FaqItem
                                    key={faq.question}
                                    faq={faq}
                                    open={openFaq === index}
                                    onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="seller-section seller-section-final">
                    <div className="seller-container">
                        <div className="final-cta">
                            <span className="eyebrow">
                                <span className="material-symbols-outlined icon-fill">
                                    storefront
                                </span>
                                Start today
                            </span>

                            <h2>Ready to open your store on Open Market?</h2>

                            <p>
                                Free to list. Commission only on completed sales. Protected
                                payments, delivery support, Click & Collect, and AI-assisted
                                listing tools.
                            </p>

                            <div className="final-actions">
                                <Link to="/register-seller" className="seller-btn btn-accent">
                                    Start seller registration
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>
                                <Link to="/stores" className="seller-btn btn-outline">
                                    Explore existing stores
                                </Link>
                            </div>

                            <p className="seller-dashboard-link">
                                Already registered?{" "}
                                <Link to="/seller-dashboard">
                                    Go to your seller dashboard
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}

function RevenueCalculator({
    productsListed,
    setProductsListed,
    averagePrice,
    setAveragePrice,
    monthlySales,
    setMonthlySales,
    earnings,
}) {
    return (
        <aside className="calculator" aria-labelledby="calculator-title">
            <div className="calculator-header">
                <div>
                    <p className="calculator-label">Estimate only</p>
                    <h2 id="calculator-title">Possible monthly revenue</h2>
                </div>
                <span className="material-symbols-outlined icon-fill">calculate</span>
            </div>

            <CalculatorSlider
                label="Products listed"
                value={`${productsListed} products`}
                min="1"
                max="200"
                currentValue={productsListed}
                onChange={setProductsListed}
            />
            <CalculatorSlider
                label="Average product price"
                value={formatRand(averagePrice)}
                min="50"
                max="2000"
                step="50"
                currentValue={averagePrice}
                onChange={setAveragePrice}
            />
            <CalculatorSlider
                label="Expected monthly sales"
                value={`${monthlySales} sales`}
                min="1"
                max="200"
                currentValue={monthlySales}
                onChange={setMonthlySales}
            />

            <div className="result-box">
                <small>Estimated monthly revenue</small>
                <strong>{formatRand(earnings.monthlyRevenue)}</strong>
                <div className="result-net">
                    <span>After 5% platform fee</span>
                    <strong>{formatRand(earnings.netMonthly)} take-home</strong>
                </div>
                <p>
                    Estimate only. Actual earnings depend on your products, pricing,
                    demand, and fulfilment.
                </p>
            </div>

            <div className="result-stats">
                <div className="mini-stat">
                    <strong>{formatCompactRand(earnings.netAnnual)}</strong>
                    <p>Net annual potential</p>
                </div>
                <div className="mini-stat">
                    <strong>0%</strong>
                    <p>Monthly fee</p>
                </div>
            </div>
        </aside>
    );
}

function CalculatorSlider({
    label,
    value,
    min,
    max,
    step = "1",
    currentValue,
    onChange,
}) {
    return (
        <div className="calc-row">
            <div className="calc-meta">
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <input
                className="calc-slider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={currentValue}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </div>
    );
}

function HeroPill({ icon, label }) {
    return (
        <span className="hero-pill">
            <span className="material-symbols-outlined icon-fill">{icon}</span>
            {label}
        </span>
    );
}

function TrustItem({ item }) {
    return (
        <div className="trust-item">
            <span className="material-symbols-outlined icon-fill">{item.icon}</span>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
        </div>
    );
}

function SectionHeading({ eyebrow, title, text, centered = false }) {
    return (
        <div className={`section-header ${centered ? "section-header-centered" : ""}`}>
            <span className="section-label">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-copy">{text}</p>
        </div>
    );
}

function BenefitCard({ benefit }) {
    const hasBadge = benefit.badge && benefit.badgeIcon;

    return (
        <article className={`soft-card ${benefit.cardClass || ""}`}>
            {hasBadge ? (
                <div className="benefit-top">
                    <div className={`feature-icon ${benefit.iconClass || ""}`}>
                        <span className="material-symbols-outlined icon-fill">
                            {benefit.icon}
                        </span>
                    </div>
                    <span className="badge">
                        <span className="material-symbols-outlined icon-fill">
                            {benefit.badgeIcon}
                        </span>
                        {benefit.badge}
                    </span>
                </div>
            ) : (
                <div className={`feature-icon ${benefit.iconClass || ""}`}>
                    <span className="material-symbols-outlined icon-fill">
                        {benefit.icon}
                    </span>
                </div>
            )}
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
        </article>
    );
}

function CheckList({ items }) {
    return (
        <ul>
            {items.map((item) => (
                <li key={item}>
                    <span className="material-symbols-outlined icon-fill">
                        check_circle
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function AiListingMockup() {
    return (
        <div className="spotlight-visual">
            <div className="visual-stack">
                <div className="mock-card">
                    <div className="mock-row">
                        <span className="mock-step">1</span>
                        Upload your product photo
                    </div>
                    <div className="mock-upload">
                        <span className="material-symbols-outlined icon-fill">
                            add_photo_alternate
                        </span>
                        <span>Tap to upload photo</span>
                    </div>
                </div>

                <div className="mock-card mock-card-ai">
                    <div className="mock-row">
                        <span className="mock-step">2</span>
                        AI generates your listing
                    </div>
                    <div className="pulse-grid">
                        <span className="pulse-line pulse-short" />
                        <span className="pulse-line" />
                        <span className="pulse-line pulse-mid" />
                    </div>
                </div>

                <div className="mock-card mock-card-result">
                    <div className="mock-row">
                        <span className="mock-step mock-step-sage">3</span>
                        Review & publish
                    </div>
                    <div className="listing-result">
                        <p className="listing-title">Black Casual Sneakers - Size 9</p>
                        <p className="listing-desc">
                            Lightweight EVA sole, breathable mesh upper. Perfect everyday
                            streetwear shoe.
                        </p>
                        <div className="chips">
                            <span className="chip">Sneakers</span>
                            <span className="chip chip-muted">New</span>
                            <span className="price">R350</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FulfilmentMockup({ fulfilment, setFulfilment }) {
    return (
        <div className="spotlight-visual">
            <div className="choice-card">
                <h3>How would you like your order?</h3>

                <FulfilmentOption
                    active={fulfilment === "delivery"}
                    onClick={() => setFulfilment("delivery")}
                    icon="local_shipping"
                    title="Standard delivery"
                    text="3-5 business days - R65 shipping"
                />
                <FulfilmentOption
                    active={fulfilment === "collect"}
                    onClick={() => setFulfilment("collect")}
                    icon="store"
                    title="Collect from store"
                    badge="FREE"
                    text="Ready within 1-2 hours - No delivery fee"
                    note="Kasi Kicks - Soweto"
                />

                <button type="button" className="seller-btn btn-primary choice-pay">
                    Confirm & pay - R350
                </button>
            </div>
        </div>
    );
}

function FulfilmentOption({ active, onClick, icon, title, badge, text, note }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`choice-option ${active ? "selected" : ""}`}
        >
            <span className="radio" aria-hidden="true">
                <span />
            </span>
            <span className="choice-text">
                <strong>
                    <span className="material-symbols-outlined icon-fill">{icon}</span>
                    {title}
                    {badge && <span className="free">{badge}</span>}
                </strong>
                <span className="choice-copy">
                    {text}
                    {note && (
                        <>
                            <br />
                            <b>{note}</b>
                        </>
                    )}
                </span>
            </span>
        </button>
    );
}

function StepItem({ step }) {
    return (
        <div className="step-item">
            <div className={`step-number ${step.soft ? "step-number-soft" : ""}`}>
                {step.number}
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
        </div>
    );
}

function PricingCard({ card }) {
    return (
        <article className={`pricing-card ${card.featured ? "featured" : ""}`}>
            <span className="badge">
                <span className="material-symbols-outlined icon-fill">
                    {card.badgeIcon}
                </span>
                {card.badge}
            </span>
            <div className={`price-big ${card.compactPrice ? "price-compact" : ""}`}>
                {card.price}
            </div>
            <p>
                <b>{card.summary}</b>
                <br />
                {card.text}
            </p>
            <ul>
                {card.items.map((item) => (
                    <li key={item}>
                        <span className="material-symbols-outlined icon-fill">
                            check_circle
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function FaqItem({ faq, open, onToggle }) {
    return (
        <div className={`faq-item ${open ? "open" : ""}`}>
            <button
                className="faq-trigger"
                type="button"
                aria-expanded={open}
                onClick={onToggle}
            >
                {faq.question}
                <span className="material-symbols-outlined faq-chevron">
                    expand_more
                </span>
            </button>
            <div className="faq-body">
                <p>{faq.answer}</p>
            </div>
        </div>
    );
}

function BecomeSellerStyles() {
    return (
        <style>{`
            .become-seller-page {
                --primary: #003527;
                --primary-hover: #064e3b;
                --accent: #fed65b;
                --accent-text: #745c00;
                --text: #121c2a;
                --muted: #404944;
                --soft-muted: #66736d;
                --border: #bfc9c3;
                --border-soft: #dbe6e1;
                --bg: #f8f9ff;
                --sage: #95d3ba;
                --shadow: 0 8px 38px rgba(0, 53, 39, 0.06);
                background: var(--bg);
            }

            .become-seller-page .seller-container {
                width: min(1280px, calc(100% - 32px));
                margin-inline: auto;
            }

            @media (min-width: 768px) {
                .become-seller-page .seller-container {
                    width: min(1280px, calc(100% - 80px));
                }
            }

            .become-seller-page .seller-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                border-radius: 18px;
                padding: 16px 24px;
                font-size: 14px;
                font-weight: 900;
                transition: transform .12s, background .18s, opacity .18s;
            }

            .become-seller-page .seller-btn:active {
                transform: scale(.99);
            }

            .become-seller-page .btn-primary {
                background: var(--primary);
                color: white;
                box-shadow: 0 8px 24px rgba(0,53,39,.22);
            }

            .become-seller-page .btn-primary:hover {
                background: var(--primary-hover);
            }

            .become-seller-page .btn-accent {
                background: var(--accent);
                color: #3a2e00;
                box-shadow: 0 8px 24px rgba(254,214,91,.3);
            }

            .become-seller-page .btn-accent:hover {
                opacity: .92;
            }

            .become-seller-page .btn-outline {
                border: 1px solid rgba(255,255,255,.25);
                color: white;
            }

            .become-seller-page .btn-outline:hover {
                background: rgba(255,255,255,.1);
            }

            .become-seller-page .seller-hero {
                position: relative;
                overflow: hidden;
                background-color: var(--primary);
                background-image:
                    radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 36%),
                    radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 34%),
                    radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
                background-size: auto, auto, 28px 28px;
            }

            .become-seller-page .hero-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 40px;
                align-items: center;
                padding-block: 56px;
            }

            @media (min-width: 1024px) {
                .become-seller-page .hero-grid {
                    grid-template-columns: 7fr 5fr;
                    padding-block: 80px;
                }
            }

            .become-seller-page .eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                border: 1px solid rgba(254,214,91,.3);
                background: rgba(254,214,91,.15);
                border-radius: 999px;
                color: var(--accent);
                padding: 9px 16px;
                font-size: 12px;
                font-weight: 900;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .become-seller-page .hero-title {
                max-width: 660px;
                margin: 20px 0;
                color: white;
                font-size: clamp(40px, 7vw, 68px);
                line-height: 1.02;
                letter-spacing: -.055em;
                font-weight: 900;
            }

            .become-seller-page .hero-title span {
                color: var(--accent);
            }

            .become-seller-page .hero-copy {
                max-width: 580px;
                color: rgba(255,255,255,.72);
                font-size: 17px;
                line-height: 1.85;
                margin: 0 0 32px;
            }

            .become-seller-page .hero-actions {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .become-seller-page .hero-actions .seller-btn {
                width: 100%;
            }

            .become-seller-page .hero-actions .btn-accent {
                padding: 18px 32px;
                font-size: 16px;
                box-shadow: 0 12px 32px rgba(254,214,91,.4);
            }

            .become-seller-page .hero-actions .btn-outline {
                padding: 18px 24px;
                font-size: 15px;
            }

            @media (min-width: 640px) {
                .become-seller-page .hero-actions {
                    flex-direction: row;
                }

                .become-seller-page .hero-actions .seller-btn {
                    width: auto;
                }
            }

            .become-seller-page .hero-pills {
                margin-top: 28px;
                display: flex;
                flex-wrap: nowrap;
                gap: 10px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                padding-bottom: 4px;
            }

            .become-seller-page .hero-pills::-webkit-scrollbar {
                display: none;
            }

            .become-seller-page .hero-pill {
                flex-shrink: 0;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                border-radius: 999px;
                background: rgba(255,255,255,.1);
                color: rgba(255,255,255,.78);
                padding: 7px 12px;
                font-size: 12px;
                font-weight: 800;
            }

            .become-seller-page .hero-pill .material-symbols-outlined {
                color: var(--sage);
                font-size: 15px;
            }

            .become-seller-page .calculator {
                border: 1px solid rgba(255,255,255,.15);
                border-radius: 28px;
                background: rgba(255,255,255,.12);
                color: white;
                padding: 20px;
                box-shadow: 0 28px 80px rgba(0,0,0,.24);
                backdrop-filter: blur(10px);
            }

            @media (min-width: 1024px) {
                .become-seller-page .calculator {
                    border-radius: 32px;
                    padding: 24px;
                }
            }

            .become-seller-page .calculator-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                margin-bottom: 24px;
            }

            .become-seller-page .calculator-label {
                color: var(--sage);
                font-size: 14px;
                font-weight: 800;
                margin: 0 0 4px;
            }

            .become-seller-page .calculator h2 {
                margin: 0;
                font-size: 22px;
                font-weight: 900;
            }

            .become-seller-page .calculator-header .material-symbols-outlined {
                color: var(--accent);
                font-size: 34px;
            }

            .become-seller-page .calc-row {
                margin-bottom: 20px;
            }

            .become-seller-page .calc-meta {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 8px;
                font-size: 12px;
                font-weight: 800;
            }

            .become-seller-page .calc-meta span:first-child {
                color: rgba(255,255,255,.68);
            }

            .become-seller-page .calc-meta span:last-child {
                color: var(--accent);
            }

            .become-seller-page .calc-slider {
                appearance: none;
                width: 100%;
                height: 5px;
                border-radius: 999px;
                background: rgba(255,255,255,.22);
                outline: 0;
                cursor: pointer;
            }

            .become-seller-page .calc-slider::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 999px;
                background: var(--accent);
                box-shadow: 0 2px 8px rgba(0,0,0,.22);
            }

            .become-seller-page .calc-slider::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border: 0;
                border-radius: 999px;
                background: var(--accent);
            }

            .become-seller-page .result-box {
                margin-top: 20px;
                border-radius: 20px;
                background: rgba(255,255,255,.1);
                padding: 16px;
            }

            .become-seller-page .result-box small {
                display: block;
                margin-bottom: 4px;
                color: rgba(255,255,255,.55);
                font-size: 11px;
                font-weight: 900;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .become-seller-page .result-box strong {
                display: block;
                color: var(--accent);
                font-size: 30px;
                font-weight: 900;
                letter-spacing: -.04em;
            }

            @media (min-width: 1024px) {
                .become-seller-page .result-box strong {
                    font-size: 40px;
                }
            }

            .become-seller-page .result-box p {
                margin: 6px 0 0;
                color: rgba(255,255,255,.58);
                font-size: 12px;
                line-height: 1.5;
            }

            .become-seller-page .result-net {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid rgba(255,255,255,.15);
            }

            .become-seller-page .result-net span {
                color: rgba(255,255,255,.6);
                font-size: 11px;
                font-weight: 800;
            }

            .become-seller-page .result-net strong {
                color: #95d3ba;
                font-size: 15px;
                font-weight: 900;
            }

            .become-seller-page .result-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-top: 14px;
            }

            .become-seller-page .mini-stat {
                border-radius: 16px;
                background: rgba(255,255,255,.1);
                padding: 12px;
                text-align: center;
            }

            .become-seller-page .mini-stat strong {
                color: var(--accent);
                font-size: 20px;
                font-weight: 900;
            }

            .become-seller-page .mini-stat p {
                margin: 4px 0 0;
                color: rgba(255,255,255,.52);
                font-size: 10px;
                font-weight: 900;
                letter-spacing: .06em;
                text-transform: uppercase;
            }

            .become-seller-page .trust-bar {
                background: white;
                border-block: 1px solid #e8f0eb;
            }

            .become-seller-page .trust-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 18px;
                padding-block: 24px;
            }

            .become-seller-page .trust-item {
                text-align: center;
            }

            .become-seller-page .trust-item .material-symbols-outlined {
                display: block;
                margin: 0 auto 8px;
                color: var(--primary);
                font-size: 24px;
            }

            .become-seller-page .trust-item strong {
                display: block;
                color: var(--primary);
                font-size: 13px;
                font-weight: 900;
            }

            .become-seller-page .trust-item span:last-child {
                display: block;
                margin-top: 3px;
                color: var(--soft-muted);
                font-size: 11px;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: .06em;
            }

            @media (min-width: 768px) {
                .become-seller-page .trust-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }

            .become-seller-page .seller-section {
                padding-block: 40px;
            }

            .become-seller-page .seller-section-tight {
                padding-top: 0;
            }

            .become-seller-page .seller-section-final {
                padding-top: 0;
                padding-bottom: 64px;
            }

            @media (min-width: 768px) {
                .become-seller-page .seller-section {
                    padding-block: 64px;
                }

                .become-seller-page .seller-section-tight {
                    padding-top: 0;
                }
            }

            .become-seller-page .section-header {
                max-width: 760px;
                margin-bottom: 32px;
            }

            .become-seller-page .section-header-centered {
                margin-inline: auto;
                text-align: center;
            }

            .become-seller-page .section-label {
                display: inline-block;
                margin-bottom: 8px;
                color: var(--primary);
                font-size: 11px;
                font-weight: 900;
                letter-spacing: .18em;
                text-transform: uppercase;
            }

            .become-seller-page .section-title {
                margin: 0 0 12px;
                color: var(--text);
                font-size: clamp(26px, 4vw, 42px);
                line-height: 1.1;
                font-weight: 900;
                letter-spacing: -.04em;
            }

            .become-seller-page .section-title-spaced {
                margin-top: 18px;
            }

            .become-seller-page .section-copy {
                margin: 0;
                color: var(--muted);
                font-size: 15px;
                line-height: 1.75;
            }

            .become-seller-page .spotlight-text {
                margin-bottom: 24px;
            }

            .become-seller-page .card-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 16px;
            }

            @media (min-width: 640px) {
                .become-seller-page .card-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (min-width: 1024px) {
                .become-seller-page .card-grid {
                    grid-template-columns: repeat(3, 1fr);
                }
            }

            .become-seller-page .soft-card {
                border: 1px solid var(--border-soft);
                border-radius: 24px;
                background: white;
                padding: 22px;
                box-shadow: 0 6px 24px rgba(0,53,39,.04);
                transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
            }

            .become-seller-page .soft-card:hover {
                transform: translateY(-4px);
                border-color: var(--sage);
                box-shadow: 0 18px 42px rgba(0,53,39,.09);
            }

            .become-seller-page .seller-card-ai {
                background: linear-gradient(145deg,#fffdf4,#fff 60%);
                border-color: #fde68a;
            }

            .become-seller-page .seller-card-orders {
                background: linear-gradient(145deg,#eff6ff,#fff 60%);
                border-color: #bfdbfe;
            }

            .become-seller-page .seller-card-collect {
                background: linear-gradient(145deg,#f4fbf8,#fff 60%);
                border-color: #95d3ba;
            }

            .become-seller-page .seller-card-protection {
                background: linear-gradient(145deg,#f0fdfb,#fff 60%);
                border-color: #99f6e4;
            }

            .become-seller-page .seller-card-support {
                background: linear-gradient(145deg,#f5f3ff,#fff 60%);
                border-color: #ddd6fe;
            }

            .become-seller-page .feature-icon {
                display: grid;
                place-items: center;
                width: 48px;
                height: 48px;
                border-radius: 16px;
                margin-bottom: 18px;
                color: var(--primary);
                background: #dcfce7;
            }

            .become-seller-page .benefit-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 14px;
            }

            .become-seller-page .benefit-top .feature-icon {
                margin-bottom: 0;
            }

            .become-seller-page .seller-icon-ai {
                background: #fef9c3;
                color: #854d0e;
            }

            .become-seller-page .seller-icon-orders {
                background: #dbeafe;
                color: #1e40af;
            }

            .become-seller-page .seller-icon-collect {
                background: #dcfce7;
            }

            .become-seller-page .seller-icon-protection {
                background: #ccfbf1;
                color: #0f766e;
            }

            .become-seller-page .seller-icon-support {
                background: #ede9fe;
                color: #4c1d95;
            }

            .become-seller-page .soft-card h3 {
                margin: 0 0 8px;
                color: var(--text);
                font-size: 17px;
                font-weight: 900;
            }

            .become-seller-page .soft-card p {
                margin: 0;
                color: var(--muted);
                font-size: 14px;
                line-height: 1.7;
            }

            .become-seller-page .badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                border-radius: 999px;
                padding: 5px 10px;
                font-size: 10px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: .06em;
                background: #fef9c3;
                color: #854d0e;
            }

            .become-seller-page .badge .material-symbols-outlined {
                font-size: 12px;
            }

            .become-seller-page .spotlight {
                overflow: hidden;
                border-radius: 28px;
                border: 1px solid var(--border-soft);
                background: white;
                box-shadow: var(--shadow);
            }

            .become-seller-page .spotlight-ai {
                border-color: #fde68a;
                background: linear-gradient(135deg,#fffdf2,#f8f9ff);
            }

            .become-seller-page .spotlight-collect {
                border-color: #95d3ba;
                background: linear-gradient(135deg,#f4fbf8,#f8f9ff);
            }

            .become-seller-page .spotlight-grid {
                display: grid;
                grid-template-columns: 1fr;
            }

            @media (min-width: 1024px) {
                .become-seller-page .spotlight-grid {
                    grid-template-columns: 1fr 1fr;
                }

                .become-seller-page .spotlight.reverse .spotlight-visual {
                    order: -1;
                }
            }

            .become-seller-page .spotlight-copy {
                padding: 28px;
            }

            @media (min-width: 1024px) {
                .become-seller-page .spotlight-copy {
                    padding: 48px;
                }
            }

            .become-seller-page .eyebrow-ai {
                background: #fef9c3;
                color: #854d0e;
                border-color: #fde68a;
            }

            .become-seller-page .eyebrow-collect {
                background: #f0faf6;
                color: #003527;
                border-color: #95d3ba;
            }

            .become-seller-page .spotlight-copy ul {
                margin: 0 0 24px;
                padding: 0;
                list-style: none;
                display: grid;
                gap: 12px;
            }

            .become-seller-page .spotlight-copy li {
                display: flex;
                gap: 10px;
                color: var(--muted);
                font-size: 14px;
                line-height: 1.6;
                font-weight: 700;
            }

            .become-seller-page .spotlight-copy li .material-symbols-outlined {
                flex: 0 0 auto;
                margin-top: 2px;
                color: var(--primary);
                font-size: 18px;
            }

            .become-seller-page .spotlight-visual {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 0;
                padding: 28px;
                background: linear-gradient(135deg, var(--primary), var(--primary-hover));
                color: white;
            }

            .become-seller-page .spotlight-visual::before {
                content: "";
                position: absolute;
                inset: 0;
                opacity: .1;
                background-image: radial-gradient(circle, rgba(255,255,255,.6) 1px, transparent 1px);
                background-size: 22px 22px;
            }

            @media (min-width: 1024px) {
                .become-seller-page .spotlight-visual {
                    min-height: 360px;
                }
            }

            .become-seller-page .visual-stack {
                position: relative;
                z-index: 1;
                width: 100%;
                max-width: 380px;
                display: grid;
                gap: 14px;
            }

            .become-seller-page .mock-card {
                border: 1px solid rgba(255,255,255,.15);
                border-radius: 20px;
                background: rgba(255,255,255,.1);
                backdrop-filter: blur(8px);
                padding: 16px;
            }

            .become-seller-page .mock-card-ai {
                border-color: rgba(254,214,91,.42);
                background: rgba(254,214,91,.1);
            }

            .become-seller-page .mock-card-result {
                border-color: rgba(149,211,186,.42);
            }

            .become-seller-page .mock-row {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
                color: white;
                font-size: 14px;
                font-weight: 900;
            }

            .become-seller-page .mock-step {
                display: grid;
                place-items: center;
                width: 28px;
                height: 28px;
                border-radius: 999px;
                background: var(--accent);
                color: #3a2e00;
                font-size: 11px;
                font-weight: 900;
            }

            .become-seller-page .mock-step-sage {
                background: #95d3ba;
                color: #003527;
            }

            .become-seller-page .mock-upload {
                display: grid;
                place-items: center;
                border: 2px dashed rgba(255,255,255,.25);
                border-radius: 14px;
                padding: 22px;
                text-align: center;
                color: rgba(255,255,255,.62);
            }

            .become-seller-page .mock-upload .material-symbols-outlined {
                display: block;
                margin-bottom: 6px;
                color: var(--sage);
                font-size: 32px;
            }

            .become-seller-page .pulse-grid {
                display: grid;
                gap: 8px;
            }

            .become-seller-page .pulse-line {
                height: 12px;
                border-radius: 999px;
                background: rgba(255,255,255,.18);
                animation: sellerPulse 1.2s infinite ease-in-out;
            }

            .become-seller-page .pulse-short {
                width: 78%;
            }

            .become-seller-page .pulse-mid {
                width: 84%;
            }

            @keyframes sellerPulse {
                50% {
                    opacity: .45;
                }
            }

            .become-seller-page .listing-result {
                border-radius: 14px;
                background: rgba(255,255,255,.1);
                padding: 12px;
            }

            .become-seller-page .listing-result p {
                margin: 0 0 6px;
            }

            .become-seller-page .listing-title {
                color: white;
                font-size: 13px;
                font-weight: 900;
            }

            .become-seller-page .listing-desc {
                color: rgba(255,255,255,.62);
                font-size: 12px;
                line-height: 1.55;
            }

            .become-seller-page .chips {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 8px;
                margin-top: 10px;
            }

            .become-seller-page .chip {
                border-radius: 10px;
                background: rgba(254,214,91,.2);
                color: var(--accent);
                padding: 6px 8px;
                font-size: 10px;
                font-weight: 800;
            }

            .become-seller-page .chip-muted {
                background: rgba(255,255,255,.12);
                color: rgba(255,255,255,.7);
            }

            .become-seller-page .price {
                margin-left: auto;
                color: var(--accent);
                font-size: 16px;
                font-weight: 900;
            }

            .become-seller-page .choice-card {
                position: relative;
                z-index: 1;
                width: 100%;
                max-width: 360px;
                border: 1px solid var(--border-soft);
                border-radius: 22px;
                background: white;
                color: var(--text);
                padding: 20px;
                box-shadow: 0 4px 16px rgba(0,53,39,.08);
            }

            .become-seller-page .choice-card h3 {
                margin: 0 0 16px;
                font-size: 15px;
                font-weight: 900;
            }

            .become-seller-page .choice-option {
                width: 100%;
                display: flex;
                gap: 12px;
                border: 2px solid var(--border-soft);
                border-radius: 14px;
                padding: 14px;
                cursor: pointer;
                background: white;
                text-align: left;
                transition: border-color .15s, background .15s;
            }

            .become-seller-page .choice-option + .choice-option {
                margin-top: 12px;
            }

            .become-seller-page .choice-option.selected {
                border-color: var(--primary);
                background: #f0faf6;
            }

            .become-seller-page .radio {
                margin-top: 2px;
                display: grid;
                place-items: center;
                width: 20px;
                height: 20px;
                border: 2px solid var(--border-soft);
                border-radius: 999px;
                flex: 0 0 auto;
            }

            .become-seller-page .choice-option.selected .radio {
                border-color: var(--primary);
            }

            .become-seller-page .radio span {
                width: 10px;
                height: 10px;
                border-radius: 999px;
                background: transparent;
            }

            .become-seller-page .choice-option.selected .radio span {
                background: var(--primary);
            }

            .become-seller-page .choice-text strong {
                display: flex;
                align-items: center;
                gap: 7px;
                margin-bottom: 4px;
                font-size: 14px;
                font-weight: 900;
            }

            .become-seller-page .choice-text .material-symbols-outlined {
                font-size: 16px;
                color: var(--primary);
            }

            .become-seller-page .choice-copy {
                display: block;
                color: var(--soft-muted);
                font-size: 12px;
                line-height: 1.5;
            }

            .become-seller-page .choice-copy b {
                color: var(--primary);
            }

            .become-seller-page .free {
                display: inline-flex;
                margin-left: 5px;
                border-radius: 999px;
                background: var(--accent);
                color: var(--accent-text);
                padding: 3px 7px;
                font-size: 10px;
                font-weight: 900;
            }

            .become-seller-page .choice-pay {
                width: 100%;
                margin-top: 16px;
                border-radius: 14px;
                box-shadow: none;
            }

            .become-seller-page .steps-box {
                border: 1px solid var(--border-soft);
                border-radius: 28px;
                background: white;
                padding: 24px;
                box-shadow: var(--shadow);
            }

            .become-seller-page .steps-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 22px;
            }

            .become-seller-page .step-item {
                position: relative;
                padding-left: 76px;
            }

            .become-seller-page .step-item:not(:last-child)::after {
                content: "";
                position: absolute;
                left: 27px;
                top: 56px;
                width: 2px;
                height: calc(100% + 22px);
                background: linear-gradient(to bottom, var(--primary), var(--sage));
            }

            .become-seller-page .step-number {
                position: absolute;
                left: 0;
                top: 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                border-radius: 18px;
                background: var(--primary);
                color: white;
                font-size: 18px;
                font-weight: 900;
                box-shadow: 0 4px 14px rgba(0,53,39,.35);
                margin-bottom: 16px;
            }

            .become-seller-page .step-number-soft {
                background: #95d3ba;
                color: #003527;
            }

            .become-seller-page .step-item h3 {
                margin: 0 0 8px;
                font-size: 17px;
                font-weight: 900;
                padding-top: 10px;
            }

            .become-seller-page .step-item p {
                margin: 0;
                color: var(--muted);
                font-size: 14px;
                line-height: 1.65;
            }

            @media (min-width: 768px) {
                .become-seller-page .steps-box {
                    padding: 40px;
                }

                .become-seller-page .steps-grid {
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0;
                }

                .become-seller-page .step-item {
                    padding-left: 0;
                    padding-right: 22px;
                }

                .become-seller-page .step-item:not(:last-child)::after {
                    left: 56px;
                    top: 28px;
                    z-index: 0;
                    width: calc(100% - 56px);
                    height: 2px;
                    background: linear-gradient(to right, var(--primary), var(--sage));
                }

                .become-seller-page .step-number {
                    position: relative;
                    left: auto;
                    top: auto;
                    margin-bottom: 16px;
                    z-index: 1;
                }

                .become-seller-page .step-item h3 {
                    padding-top: 0;
                }
            }

            .become-seller-page .pricing-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 16px;
            }

            @media (min-width: 768px) {
                .become-seller-page .pricing-grid {
                    grid-template-columns: repeat(3, 1fr);
                    align-items: stretch;
                }
            }

            .become-seller-page .pricing-card {
                border: 1px solid var(--border-soft);
                border-radius: 24px;
                background: white;
                padding: 24px;
                box-shadow: 0 4px 20px rgba(0,53,39,.05);
            }

            .become-seller-page .pricing-card.featured {
                background: var(--primary);
                color: white;
                border-color: var(--primary);
            }

            .become-seller-page .pricing-card .price-big {
                margin: 16px 0 0;
                color: var(--primary);
                font-size: 42px;
                font-weight: 900;
                letter-spacing: -.04em;
            }

            .become-seller-page .pricing-card.featured .price-big {
                color: var(--accent);
            }

            .become-seller-page .pricing-card .price-compact {
                font-size: 28px;
                letter-spacing: -.02em;
                margin-top: 12px;
            }

            .become-seller-page .pricing-card p {
                color: var(--muted);
                font-size: 14px;
                line-height: 1.6;
            }

            .become-seller-page .pricing-card.featured p {
                color: rgba(255,255,255,.68);
            }

            .become-seller-page .pricing-card ul {
                margin: 20px 0 0;
                padding: 0;
                list-style: none;
                display: grid;
                gap: 12px;
            }

            .become-seller-page .pricing-card li {
                display: flex;
                gap: 10px;
                color: var(--muted);
                font-size: 14px;
                line-height: 1.5;
            }

            .become-seller-page .pricing-card.featured li {
                color: rgba(255,255,255,.82);
            }

            .become-seller-page .pricing-card li .material-symbols-outlined {
                color: var(--primary);
                font-size: 18px;
                flex-shrink: 0;
            }

            .become-seller-page .pricing-card.featured li .material-symbols-outlined {
                color: var(--accent);
            }

            .become-seller-page .faq-wrap {
                max-width: 820px;
            }

            .become-seller-page .faq-item {
                border-bottom: 1px solid #e8f0eb;
            }

            .become-seller-page .faq-item:first-child {
                border-top: 1px solid #e8f0eb;
            }

            .become-seller-page .faq-trigger {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 18px 0;
                border: 0;
                background: transparent;
                color: var(--text);
                cursor: pointer;
                text-align: left;
                font-size: 15px;
                font-weight: 900;
            }

            .become-seller-page .faq-trigger:hover {
                color: var(--primary);
            }

            .become-seller-page .faq-body {
                max-height: 0;
                overflow: hidden;
                transition: max-height .25s ease;
            }

            .become-seller-page .faq-body p {
                margin: 0;
                padding: 0 0 18px;
                color: var(--muted);
                font-size: 14px;
                line-height: 1.8;
            }

            .become-seller-page .faq-item.open .faq-body {
                max-height: 240px;
            }

            .become-seller-page .faq-chevron {
                color: var(--primary);
                transition: transform .2s;
                flex-shrink: 0;
            }

            .become-seller-page .faq-item.open .faq-chevron {
                transform: rotate(180deg);
            }

            .become-seller-page .final-cta {
                border-radius: 28px;
                background: var(--primary);
                color: white;
                text-align: center;
                padding: 36px 20px;
                box-shadow: 0 24px 56px rgba(0,53,39,.2);
            }

            @media (min-width: 640px) {
                .become-seller-page .final-cta {
                    padding: 56px 32px;
                }
            }

            .become-seller-page .final-cta h2 {
                max-width: 680px;
                margin: 16px auto 14px;
                font-size: clamp(26px, 4vw, 44px);
                line-height: 1.12;
                font-weight: 900;
                letter-spacing: -.04em;
            }

            .become-seller-page .final-cta p {
                max-width: 590px;
                margin: 0 auto 28px;
                color: rgba(255,255,255,.68);
                font-size: 15px;
                line-height: 1.75;
            }

            .become-seller-page .final-actions {
                display: flex;
                flex-direction: column;
                gap: 12px;
                align-items: stretch;
                justify-content: center;
            }

            .become-seller-page .final-actions .seller-btn {
                width: 100%;
            }

            @media (min-width: 640px) {
                .become-seller-page .final-actions {
                    flex-direction: row;
                    align-items: center;
                }

                .become-seller-page .final-actions .seller-btn {
                    width: auto;
                }
            }

            .become-seller-page .seller-dashboard-link {
                margin: 20px 0 0;
                font-size: 13px;
                color: rgba(255,255,255,.5);
            }

            .become-seller-page .seller-dashboard-link a {
                color: rgba(255,255,255,.8);
                font-weight: 800;
                text-decoration: underline;
                text-underline-offset: 3px;
            }
        `}</style>
    );
}
