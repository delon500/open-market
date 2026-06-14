import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const termsSections = [
    {
        number: "01",
        title: "Using Open Market",
        text: "Open Market is a marketplace that connects buyers with local sellers. By using the platform, you agree to use it honestly, lawfully, and respectfully.",
        points: [
            "You must provide accurate account information.",
            "You must not use the platform for fraud, scams, or misleading listings.",
            "You are responsible for keeping your login details secure.",
        ],
    },
    {
        number: "02",
        title: "Buyer responsibilities",
        text: "Buyers should review product information carefully before placing an order.",
        points: [
            "Check product photos, descriptions, price, condition, and delivery details.",
            "Do not confirm delivery or collection until you have received the correct item.",
            "Raise a dispute or contact support if there is a serious problem with an order.",
        ],
    },
    {
        number: "03",
        title: "Seller responsibilities",
        text: "Sellers are responsible for listing products honestly and fulfilling orders properly.",
        points: [
            "Use clear product photos and accurate descriptions.",
            "Do not list fake, stolen, unsafe, or prohibited items.",
            "Update stock, prices, and delivery or collection details when needed.",
            "Fulfil orders within the stated timeframe.",
        ],
    },
    {
        number: "04",
        title: "Payment Protection",
        text: "Open Market uses a protected payment flow to help reduce risk for buyers and sellers.",
        points: [
            "Payment may be held while the order is being delivered or collected.",
            "Seller payout can be processed after delivery or collection is confirmed.",
            "If a dispute is opened, payout may be paused while the issue is reviewed.",
        ],
    },
    {
        number: "05",
        title: "Fees and payouts",
        text: "Open Market may charge sellers a platform commission on completed sales.",
        points: [
            "Seller fees should be shown clearly before or during seller onboarding.",
            "Payout timing may depend on delivery confirmation, collection confirmation, dispute checks, and payment provider processing times.",
            "Open Market may update fees, but sellers should be notified of important changes.",
        ],
    },
    {
        number: "06",
        title: "Disputes and refunds",
        text: "If there is a problem with an order, Open Market may help review the issue.",
        points: [
            "Buyers should raise issues before confirming receipt.",
            "Sellers may be asked to provide proof of delivery, collection, or communication.",
            "Refund decisions may depend on product condition, delivery evidence, seller response, and platform rules.",
        ],
    },
    {
        number: "07",
        title: "Account suspension",
        text: "Open Market may restrict or suspend accounts that break platform rules.",
        points: [
            "Examples include fraud, repeated disputes, abusive behaviour, fake listings, or prohibited product sales.",
            "Suspended users may lose access to selling, messaging, checkout, or payouts while an issue is reviewed.",
        ],
    },
    {
        number: "08",
        title: "Changes to these terms",
        text: "Open Market may update these terms as the platform grows.",
        points: [
            "Important updates should be communicated clearly.",
            "Continuing to use the platform after updates means you accept the updated terms.",
        ],
    },
];

export default function TermsPage() {
    return (
        <PublicLayout>
            <style>{`
        .terms-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }
      `}</style>

            <main className="bg-[#f6f9f7]">
                {/* Hero */}
                <section className="terms-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  contract
                </span>
                Terms and Conditions
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                Rules for using{" "}
                                <span className="text-[#fed65b]">Open Market.</span>
                            </h1>

                            <p className="max-w-[640px] text-[17px] leading-8 text-white/70">
                                These terms explain how buyers and sellers should use Open
                                Market, how protected payments work, and what happens when
                                orders, disputes, or account issues arise.
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
                                    Important note
                                </h2>
                                <p className="text-sm leading-7 text-[#854d0e]">
                                    This is starter website copy for your prototype. Before launch,
                                    have the final terms reviewed by a qualified legal professional.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terms content */}
                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 pb-16 md:px-10 lg:grid-cols-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-5">
                            <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
                  checklist
                </span>

                                <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                                    Terms summary
                                </h2>

                                <p className="mb-5 text-sm leading-7 text-[#404944]">
                                    These rules apply to buyers, sellers, account holders, and
                                    visitors using Open Market.
                                </p>

                                <div className="space-y-3">
                                    <SummaryItem icon="shopping_bag" text="Buy honestly" />
                                    <SummaryItem icon="storefront" text="Sell responsibly" />
                                    <SummaryItem icon="shield_locked" text="Use protected payments" />
                                    <SummaryItem icon="support_agent" text="Raise disputes early" />
                                </div>
                            </div>

                            <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
                  support_agent
                </span>

                                <h2 className="mb-2 text-xl font-black">Need help?</h2>

                                <p className="text-sm leading-7 text-white/70">
                                    Visit the Help Centre or contact support if you need help with
                                    an order, account, payment, or dispute.
                                </p>

                                <div className="mt-5 flex flex-col gap-3">
                                    <Link
                                        to="/help-centre"
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-5 py-3 text-sm font-black text-[#3a2e00] transition hover:opacity-90"
                                    >
                                        Help Centre
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                                    >
                                        Contact support
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main terms */}
                    <section className="lg:col-span-8">
                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8">
                            <div className="mb-8">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Platform terms
                                </p>

                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                    Terms of service
                                </h2>

                                <p className="text-sm leading-7 text-[#404944]">
                                    By accessing or using Open Market, you agree to follow these
                                    terms and any platform rules shown during registration,
                                    checkout, seller onboarding, or support processes.
                                </p>
                            </div>

                            <div className="space-y-5">
                                {termsSections.map((section) => (
                                    <TermsSection key={section.number} section={section} />
                                ))}
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </PublicLayout>
    );
}

function SummaryItem({ icon, text }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[19px]">
          {icon}
        </span>
            </div>

            <span className="text-sm font-black text-[#121c2a]">{text}</span>
        </div>
    );
}

function TermsSection({ section }) {
    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-[#f8fbf9] p-5">
            <div className="mb-4 flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white">
          {section.number}
        </span>

                <div>
                    <h3 className="mb-2 text-lg font-black text-[#121c2a]">
                        {section.title}
                    </h3>

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