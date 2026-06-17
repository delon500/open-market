import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const privacySections = [
    {
        id: "collect",
        number: "01",
        icon: "person",
        navTitle: "Information we collect",
        title: "Information we collect",
        text: "Open Market may collect information needed to create accounts, process orders, support sellers, and keep the marketplace safe.",
        points: [
            "Account details such as name, email address, and phone number.",
            "Delivery or collection details needed to fulfil orders.",
            "Seller store details, product listings, and verification information.",
            "Messages, support requests, reviews, and dispute information.",
        ],
    },
    {
        id: "order-payment",
        number: "02",
        icon: "shopping_bag",
        navTitle: "Order & payment info",
        title: "Order and payment information",
        text: "Open Market uses order and payment information to manage checkout, delivery confirmation, seller payouts, disputes, and refunds.",
        points: [
            "Order history, product details, prices, and order status.",
            "Payment status and payout status.",
            "Delivery, collection, and confirmation details.",
            "Refund or dispute records when something goes wrong.",
        ],
    },
    {
        id: "how-we-use",
        number: "03",
        icon: "settings",
        navTitle: "How we use information",
        title: "How we use information",
        text: "We use information to operate the marketplace, improve the user experience, and protect buyers and sellers.",
        points: [
            "To create and manage user accounts.",
            "To process orders, delivery, collection, refunds, and payouts.",
            "To verify sellers and reduce suspicious activity.",
            "To provide customer support and resolve disputes.",
            "To improve product discovery, search, and marketplace features.",
        ],
    },
    {
        id: "sharing",
        number: "04",
        icon: "share",
        navTitle: "When info may be shared",
        title: "When information may be shared",
        text: "Some information may need to be shared between buyers, sellers, delivery partners, payment providers, and support teams so orders can be completed.",
        points: [
            "Buyers and sellers may receive order-related details needed for fulfilment.",
            "Payment providers may process payment or payout details.",
            "Support teams may review order, message, and dispute details.",
            "Information may be shared where required by law or platform safety rules.",
        ],
    },
    {
        id: "protection",
        number: "05",
        icon: "shield_locked",
        navTitle: "How we protect information",
        title: "How we protect information",
        text: "Open Market should use reasonable technical and organisational measures to protect personal information.",
        points: [
            "Account access should be protected with secure login controls.",
            "Sensitive information should only be accessible to authorised users.",
            "Payment details should be handled through trusted payment providers.",
            "Suspicious activity may be reviewed to protect the marketplace.",
        ],
    },
    {
        id: "cookies",
        number: "06",
        icon: "cookie",
        navTitle: "Cookies & similar tech",
        title: "Cookies and similar technologies",
        text: "Open Market may use cookies or similar tools to remember preferences, keep users signed in, improve performance, and understand platform usage.",
        points: [
            "Essential cookies may be needed for login and checkout.",
            "Analytics may help improve pages, search, and marketplace features.",
            "Users may be able to manage cookies through browser settings.",
        ],
    },
    {
        id: "rights",
        number: "07",
        icon: "manage_accounts",
        navTitle: "Your choices & rights",
        title: "User choices and rights",
        text: "Users should be able to update certain account details and contact support about privacy-related requests.",
        points: [
            "You can update basic account information from your profile where available.",
            "You can contact support to request help with account or privacy questions.",
            "Some information may need to be kept for orders, disputes, security, or legal reasons.",
        ],
    },
    {
        id: "changes",
        number: "08",
        icon: "update",
        navTitle: "Changes to this policy",
        title: "Changes to this policy",
        text: "Open Market may update this Privacy Policy as the platform grows or when features change.",
        points: [
            "Important privacy updates should be communicated clearly.",
            "The latest version should always be available on this page.",
            "Continuing to use the platform after updates means the updated policy applies.",
        ],
    },
];

const tocItems = [
    ...privacySections.map((section) => ({
        id: section.id,
        label: section.navTitle,
        badge: section.number,
    })),
    {
        id: "faq",
        label: "Quick answers",
        icon: "help",
    },
];

const faqs = [
    {
        question: "Does Open Market sell personal information?",
        answer:
            "Open Market should not sell user personal information. Information should only be used to operate the marketplace, support orders, improve safety, and provide support.",
    },
    {
        question: "Why do sellers see buyer details?",
        answer:
            "Sellers may need limited buyer details to fulfil an order, arrange delivery, support Click & Collect, or communicate about the purchase.",
    },
    {
        question: "Why does Open Market need seller verification information?",
        answer:
            "Seller verification helps improve marketplace trust, reduce fake stores, and protect buyers from suspicious activity.",
    },
    {
        question: "Can I ask for privacy help?",
        answer:
            "Yes. Users should contact Open Market support for privacy-related questions, account updates, or concerns about how information is used.",
    },
];

export default function PrivacyPage() {
    const [openFaq, setOpenFaq] = useState(0);
    const [activeSection, setActiveSection] = useState(privacySections[0].id);

    useEffect(() => {
        if (!("IntersectionObserver" in window)) {
            return undefined;
        }

        const sections = document.querySelectorAll(".policy-section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-150px 0px -65% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <PublicLayout>
            <style>{`
        .privacy-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        html {
          scroll-behavior: smooth;
        }

        .policy-section {
          scroll-margin-top: 150px;
        }
      `}</style>

            <main className="bg-[#f6f9f7]">
                {/* Hero */}
                <section className="privacy-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  privacy_tip
                </span>
                Privacy Policy
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                How Open Market handles{" "}
                                <span className="text-[#fed65b]">your information.</span>
                            </h1>

                            <p className="max-w-[640px] text-[17px] leading-8 text-white/70">
                                This policy explains what information Open Market may collect,
                                how it may be used, and how privacy is handled across buying,
                                selling, payments, delivery, support, and disputes.
                            </p>

                            <p className="mt-5 text-sm font-semibold text-white/55">
                                Last updated: 10 June 2026
                            </p>
                        </div>
                    </div>
                </section>

                {/* Notice */}
                <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10">
                    <div className="rounded-[24px] border border-[#fde68a] bg-[#fffdf4] p-5">
                        <div className="flex gap-3">
              <span className="material-symbols-outlined icon-fill mt-0.5 text-[22px] text-[#854d0e]">
                info
              </span>

                            <div>
                                <h2 className="mb-1 font-black text-[#854d0e]">
                                    Prototype privacy copy
                                </h2>
                                <p className="text-sm leading-7 text-[#854d0e]">
                                    This is starter website copy for your project. Before launch,
                                    the final Privacy Policy should be reviewed by a qualified
                                    legal professional.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 pb-16 md:px-10 lg:grid-cols-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-5">
                            <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                                <h2 className="mb-1 text-xl font-black text-[#121c2a]">
                                    On this page
                                </h2>

                                <p className="mb-4 text-sm leading-6 text-[#404944]">
                                    Jump straight to the section you need.
                                </p>

                                <nav
                                    className="space-y-1"
                                    aria-label="Privacy policy sections"
                                >
                                    {tocItems.map((item) => (
                                        <TocLink
                                            key={item.id}
                                            item={item}
                                            active={activeSection === item.id}
                                            onClick={() => setActiveSection(item.id)}
                                        />
                                    ))}
                                </nav>
                            </div>

                            <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
                  contact_support
                </span>

                                <h2 className="mb-2 text-xl font-black">
                                    Privacy question?
                                </h2>

                                <p className="text-sm leading-7 text-white/70">
                                    Contact support if you have questions about your account,
                                    information, order records, or privacy choices.
                                </p>

                                <Link
                                    to="/contact"
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                                >
                                    Contact support
                                    <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Policy sections */}
                    <section className="lg:col-span-8">
                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8">
                            <div className="mb-8">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Privacy details
                                </p>

                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                    What this policy covers
                                </h2>

                                <p className="text-sm leading-7 text-[#404944]">
                                    This Privacy Policy applies to buyers, sellers, account
                                    holders, and visitors using Open Market services.
                                </p>
                            </div>

                            <div className="space-y-5">
                                {privacySections.map((section) => (
                                    <PrivacySection key={section.number} section={section} />
                                ))}
                            </div>
                        </div>
                    </section>
                </section>

                {/* FAQ */}
                <section
                    id="faq"
                    className="policy-section mx-auto max-w-[1280px] px-4 pb-16 md:px-10"
                >
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Privacy questions
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Quick answers
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                Common questions about how user information may be handled on
                                Open Market.
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

function TocLink({ item, active, onClick }) {
    return (
        <a
            href={`#${item.id}`}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                active
                    ? "bg-[#f6f9f7] text-[#003527]"
                    : "text-[#404944] hover:bg-[#f6f9f7] hover:text-[#003527]"
            }`}
        >
            <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-black transition ${
                    active ? "bg-[#003527] text-white" : "bg-[#f6f9f7] text-[#003527]"
                }`}
            >
                {item.icon ? (
                    <span className="material-symbols-outlined icon-fill text-[15px]">
                        {item.icon}
                    </span>
                ) : (
                    item.badge
                )}
            </span>
            {item.label}
        </a>
    );
}

function PrivacySection({ section }) {
    return (
        <article
            id={section.id}
            className="policy-section rounded-[24px] border border-[#dbe6e1] bg-[#f8fbf9] p-5"
        >
            <div className="mb-4 flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white">
          {section.number}
        </span>

                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-black text-[#121c2a]">
                            {section.title}
                        </h3>

                        <span className="material-symbols-outlined icon-fill text-[19px] text-[#003527]">
              {section.icon}
            </span>
                    </div>

                    <p className="text-sm leading-7 text-[#404944]">{section.text}</p>
                </div>
            </div>

            <ul className="ml-[60px] space-y-2 max-sm:ml-0">
                {section.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-6 text-[#404944]">
            <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[17px] text-[#003527]">
              check_circle
            </span>
                        {point}
                    </li>
                ))}
            </ul>
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
                <p className="pb-5 text-sm leading-7 text-[#404944]">{faq.answer}</p>
            )}
        </div>
    );
}
