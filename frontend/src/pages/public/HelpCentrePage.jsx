import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const categories = [
    { label: "All", value: "all", icon: "help" },
    { label: "Buying", value: "buying", icon: "shopping_bag" },
    { label: "Selling", value: "selling", icon: "storefront" },
    { label: "Payments", value: "payments", icon: "payments" },
    { label: "Delivery", value: "delivery", icon: "local_shipping" },
    { label: "Disputes", value: "disputes", icon: "support_agent" },
];

const articles = [
    {
        title: "How does Buyer Protection work?",
        category: "payments",
        icon: "shield_locked",
        text: "Payments are held safely until delivery or collection is confirmed.",
    },
    {
        title: "How do I track my order?",
        category: "delivery",
        icon: "local_shipping",
        text: "Check your order details page to follow delivery or collection progress.",
    },
    {
        title: "How do I register as a seller?",
        category: "selling",
        icon: "storefront",
        text: "Create a seller account, verify your details, and set up your store profile.",
    },
    {
        title: "When does a seller receive payout?",
        category: "payments",
        icon: "payments",
        text: "Seller payout is processed after delivery or collection is confirmed.",
    },
    {
        title: "What happens if my order has a problem?",
        category: "disputes",
        icon: "report",
        text: "You can contact support or open a dispute before confirming receipt.",
    },
    {
        title: "Can I collect from a seller?",
        category: "delivery",
        icon: "store",
        text: "Some sellers offer Click & Collect from an approved seller location.",
    },
];

const quickActions = [
    {
        title: "Track an order",
        text: "Check delivery, collection, or order confirmation progress.",
        icon: "receipt_long",
        to: "/my-orders",
    },
    {
        title: "Contact support",
        text: "Get help with accounts, payments, disputes, and seller issues.",
        icon: "support_agent",
        to: "/contact",
    },
    {
        title: "Buyer Protection",
        text: "Learn how held payments and dispute support work.",
        icon: "shield_locked",
        to: "/trust-safety",
    },
];

const faqs = [
    {
        question: "Is Open Market only for South African sellers?",
        answer:
            "Open Market is designed for South African local sellers and buyers. The platform focuses on local stores, local delivery, and Click & Collect options.",
    },
    {
        question: "Does Open Market charge sellers monthly fees?",
        answer:
            "The planned seller model is no monthly fee and no listing fee. Sellers only pay a platform commission when a sale is completed.",
    },
    {
        question: "What should I do if my product does not arrive?",
        answer:
            "Do not confirm delivery. Contact support or open a dispute from your order details page so the issue can be reviewed.",
    },
    {
        question: "Can sellers use AI to create product descriptions?",
        answer:
            "Yes. Open Market is planned to support AI-assisted listings where sellers can upload product photos and receive an editable listing draft.",
    },
];

export default function HelpCentrePage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(0);

    const filteredArticles = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return articles.filter((article) => {
            const matchesCategory =
                activeCategory === "all" || article.category === activeCategory;

            const matchesSearch =
                !query ||
                article.title.toLowerCase().includes(query) ||
                article.text.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <PublicLayout>
            <style>{`
        .help-hero {
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
                <section className="help-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  support_agent
                </span>
                Help Centre
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                How can we help you?
                            </h1>

                            <p className="mx-auto mb-8 max-w-[620px] text-[17px] leading-8 text-white/70">
                                Search guides for buying, selling, payments, delivery,
                                disputes, and account support.
                            </p>

                            <div className="mx-auto max-w-[720px] rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                  <span className="material-symbols-outlined text-[#66736d]">
                    search
                  </span>

                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Search help topics..."
                                        className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7] focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10">
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                to={action.to}
                                className="group rounded-[24px] border border-[#dbe6e1] bg-white p-5 shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba]"
                            >
                <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#003527]">
                  {action.icon}
                </span>
                                <h2 className="mb-1 font-black text-[#121c2a]">
                                    {action.title}
                                </h2>
                                <p className="text-sm leading-6 text-[#404944]">
                                    {action.text}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => setActiveCategory(category.value)}
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
                            <div className="mb-5">
                                <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Help articles
                                </p>
                                <h2 className="text-[28px] font-black tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                    Browse common support topics
                                </h2>
                            </div>

                            {filteredArticles.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {filteredArticles.map((article) => (
                                        <ArticleCard key={article.title} article={article} />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-10 text-center shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                  <span className="material-symbols-outlined mb-3 block text-[42px] text-[#9aada7]">
                    search_off
                  </span>
                                    <h3 className="mb-2 text-lg font-black text-[#121c2a]">
                                        No help topics found
                                    </h3>
                                    <p className="text-sm text-[#66736d]">
                                        Try another keyword or select a different category.
                                    </p>
                                </div>
                            )}
                        </section>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-28 space-y-5">
                                <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
                  <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
                    contact_support
                  </span>

                                    <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                                        Need personal help?
                                    </h2>

                                    <p className="mb-5 text-sm leading-7 text-[#404944]">
                                        Contact Open Market support for account, order, payment,
                                        seller, or dispute help.
                                    </p>

                                    <Link
                                        to="/contact"
                                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-4 text-sm font-black text-white transition hover:bg-[#064e3b]"
                                    >
                                        Contact support
                                        <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                                    </Link>
                                </div>

                                <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                  <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
                    shield_locked
                  </span>

                                    <h2 className="mb-2 text-xl font-black">
                                        Buyer Protection
                                    </h2>

                                    <p className="text-sm leading-7 text-white/70">
                                        Payments are protected until delivery or collection is
                                        confirmed. If something goes wrong, support can review the
                                        order before payout.
                                    </p>

                                    <Link
                                        to="/trust-safety"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                                    >
                                        Learn more
                                        <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                Frequently asked questions
                            </p>

                            <h2 className="mb-4 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                                Quick answers
                            </h2>

                            <p className="text-sm leading-7 text-[#404944]">
                                These are the questions buyers and sellers usually ask when
                                getting started.
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

function ArticleCard({ article }) {
    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-white p-6 shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba] hover:shadow-[0_18px_42px_rgba(0,53,39,.09)]">
            <div className="mb-4 text-[#003527]">
        <span className="material-symbols-outlined icon-fill">
          {article.icon}
        </span>
            </div>

            <h3 className="mb-2 text-lg font-black text-[#121c2a]">
                {article.title}
            </h3>

            <p className="mb-5 text-sm leading-7 text-[#404944]">{article.text}</p>

            <Link
                to="/help-centre"
                className="inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
            >
                Read article
                <span className="material-symbols-outlined text-[16px]">
          arrow_forward
        </span>
            </Link>
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
                    className={`flex h-7 w-7 shrink-0 items-center justify-center transition ${
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
