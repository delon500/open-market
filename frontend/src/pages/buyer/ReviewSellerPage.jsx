import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype review context ties the seller review back to a confirmed package.
const reviewContext = {
    orderId: "OM-24091",
    packageId: "PKG-KK-01",
    seller: "Kasi Kicks",
    sellerInitial: "K",
    itemCount: 1,
    confirmedAt: "22 June 2026, 16:48",
    packageTotal: 899,
    storeTo: "/stores/kasi-kicks",
    productReviewTo: "/review-product",
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&q=80",
    items: [
        {
            title: "Classic white everyday sneakers",
            size: "UK 8",
            color: "White",
            quantity: 1,
        },
    ],
};

// Category ratings separate seller experience from the overall star rating.
const ratingCategories = [
    {
        id: "communication",
        label: "Communication",
        description: "Was the seller clear and helpful?",
    },
    {
        id: "packaging",
        label: "Packaging",
        description: "Was the item packaged safely?",
    },
    {
        id: "handover",
        label: "Handover experience",
        description: "Was delivery or collection smooth?",
    },
    {
        id: "accuracy",
        label: "Seller accuracy",
        description: "Did the seller match what was promised?",
    },
];

// Quick tags give buyers structured feedback options without forcing long typing.
const quickTags = [
    "Friendly seller",
    "Good communication",
    "Packed well",
    "Fast handover",
    "Item matched listing",
    "Would buy again",
    "Needs better updates",
    "Packaging could improve",
];

// Guidelines keep reviews useful while discouraging private information.
const reviewGuidelines = [
    "Keep your review honest and based on your own experience.",
    "Do not include phone numbers, addresses, or private messages.",
    "Review the seller separately from the product condition.",
];

export default function ReviewSellerPage() {
    // Review form state stays local until the seller-review API is connected.
    const [overallRating, setOverallRating] = useState(0);
    const [categoryRatings, setCategoryRatings] = useState({
        communication: 0,
        packaging: 0,
        handover: 0,
        accuracy: 0,
    });
    const [selectedTags, setSelectedTags] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [recommendSeller, setRecommendSeller] = useState(true);
    const [shareName, setShareName] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Average category rating powers the live summary panel beside the form.
    const averageCategoryRating = useMemo(() => {
        const values = Object.values(categoryRatings).filter(Boolean);
        if (!values.length) return 0;

        return values.reduce((total, value) => total + value, 0) / values.length;
    }, [categoryRatings]);

    // Require a complete review before enabling the frontend-only submit action.
    const canSubmit =
        overallRating > 0 &&
        Object.values(categoryRatings).every((value) => value > 0) &&
        reviewText.trim().length >= 20 &&
        agreed;

    function updateCategoryRating(categoryId, value) {
        // Update one category while preserving the rest of the rating breakdown.
        setCategoryRatings((current) => ({
            ...current,
            [categoryId]: value,
        }));
    }

    function toggleTag(tag) {
        // Tags behave like multi-select chips so buyers can add or remove context quickly.
        setSelectedTags((current) =>
            current.includes(tag)
                ? current.filter((item) => item !== tag)
                : [...current, tag]
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!canSubmit) return;

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Review seller"
                title={`Review ${reviewContext.seller}`}
                description="Share your seller experience to help other buyers make confident decisions."
                actions={
                    <>
                        <Link
                            to="/delivery-confirmation-success"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
                            Confirmation
                        </Link>

                        <Link
                            to="/review-product"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Review product
                            <span className="material-symbols-outlined text-[18px]">
                inventory_2
              </span>
                        </Link>
                    </>
                }
            />

            {submitted && (
                <div
                    className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5"
                    role="status"
                    aria-live="polite"
                >
          <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
            check_circle
          </span>

                    <div className="min-w-0 flex-1">
                        <h2 className="mb-1 font-black text-[#003527]">
                            Seller review submitted
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            Thank you. In the full version, this review will be saved to the
                            seller profile after moderation checks.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white"
                        aria-label="Dismiss review submitted message"
                    >
            <span className="material-symbols-outlined text-[19px]">
              close
            </span>
                    </button>
                </div>
            )}

            <section className="overflow-hidden rounded-[32px] border border-[#dbe6e1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                <div className="bg-[#003527] p-6 text-white md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#fed65b] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[38px]">
                  rate_review
                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                Seller feedback
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                Rate your seller experience
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                Focus on communication, packaging, handover, and whether the
                                seller fulfilled the order clearly and professionally.
                            </p>
                        </div>

                        <div className="rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Seller
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fed65b] text-lg font-black text-[#003527]">
                  {reviewContext.sellerInitial}
                </span>

                                <div>
                                    <p className="text-xl font-black text-white">
                                        {reviewContext.seller}
                                    </p>

                                    <p className="text-sm font-semibold text-white/65">
                                        Confirmed {reviewContext.confirmedAt}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ece8] md:grid-cols-4 md:divide-y-0">
                    <ReviewStat
                        icon="receipt_long"
                        label="Order"
                        value={reviewContext.orderId}
                    />
                    <ReviewStat
                        icon="inventory_2"
                        label="Items"
                        value={reviewContext.itemCount}
                    />
                    <ReviewStat
                        icon="payments"
                        label="Package"
                        value={formatRand(reviewContext.packageTotal)}
                    />
                    <ReviewStat
                        icon="star"
                        label="Rating"
                        value={overallRating ? `${overallRating}/5` : "Not set"}
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <form
                        id="seller-review-form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Overall seller rating
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    How was your overall experience with this seller?
                                </p>
                            </div>

                            <div className="rounded-[26px] border border-[#e5ece8] bg-[#f8fbf9] p-5">
                                <StarRating
                                    name="overall-rating"
                                    value={overallRating}
                                    onChange={setOverallRating}
                                    size="large"
                                    label="Overall seller rating"
                                />

                                <p className="mt-4 text-sm font-bold text-[#66736d]">
                                    {getRatingHelperText(overallRating)}
                                </p>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-[#121c2a]">
                                        Rate the seller details
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                        These ratings help buyers understand what the seller is good
                                        at.
                                    </p>
                                </div>

                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                  <span className="material-symbols-outlined icon-fill text-[15px]">
                    analytics
                  </span>
                  Average {averageCategoryRating.toFixed(1)}/5
                </span>
                            </div>

                            <div className="space-y-4">
                                {ratingCategories.map((category) => (
                                    <CategoryRatingRow
                                        key={category.id}
                                        category={category}
                                        value={categoryRatings[category.id]}
                                        onChange={(value) =>
                                            updateCategoryRating(category.id, value)
                                        }
                                    />
                                ))}
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    What stood out?
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Choose quick tags that describe your seller experience.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {quickTags.map((tag) => {
                                    const selected = selectedTags.includes(tag);

                                    return (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => toggleTag(tag)}
                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
                                                selected
                                                    ? "border-[#003527] bg-[#003527] text-white"
                                                    : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                            }`}
                                            aria-pressed={selected}
                                        >
                                            {selected && (
                                                <span className="material-symbols-outlined text-[15px]">
                          check
                        </span>
                                            )}
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Write your review
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Mention the seller’s communication, packaging, and handover
                                    experience.
                                </p>
                            </div>

                            <label className="block">
                                <span className="sr-only">Seller review</span>
                                <textarea
                                    value={reviewText}
                                    onChange={(event) =>
                                        setReviewText(event.target.value.slice(0, 600))
                                    }
                                    rows={7}
                                    placeholder="Example: The seller communicated clearly, packaged the sneakers well, and the handover was smooth..."
                                    className="w-full resize-none rounded-[22px] border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-4 text-sm font-semibold leading-7 text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                />
                            </label>

                            <div className="mt-3 flex flex-col gap-2 text-xs font-bold text-[#66736d] sm:flex-row sm:items-center sm:justify-between">
                                <span>Minimum 20 characters required.</span>
                                <span>{reviewText.length}/600</span>
                            </div>
                        </section>

                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                                Review options
                            </h2>

                            <div className="space-y-3">
                                <ToggleRow
                                    title="I would buy from this seller again"
                                    description="This helps us recommend reliable sellers to buyers."
                                    checked={recommendSeller}
                                    onChange={setRecommendSeller}
                                />

                                <ToggleRow
                                    title="Show my first name on this review"
                                    description="Turn this off if you want the review to appear more private."
                                    checked={shareName}
                                    onChange={setShareName}
                                />

                                <label className="flex cursor-pointer items-start gap-3 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4 transition hover:border-[#95d3ba]">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(event) => setAgreed(event.target.checked)}
                                        className="mt-1 h-4 w-4 accent-[#003527]"
                                    />

                                    <span className="text-sm font-bold leading-6 text-[#404944]">
                    I confirm this review is honest, based on my own order, and
                    does not include private contact information.
                  </span>
                                </label>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <Link
                                    to="/order-details"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black shadow-[0_8px_24px_rgba(0,53,39,.18)] transition ${
                                        canSubmit
                                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                                    }`}
                                >
                                    Submit seller review
                                    <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                                </button>
                            </div>
                        </section>
                    </form>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Review summary
                        </h2>

                        <div className="mb-5 overflow-hidden rounded-[24px] border border-[#e5ece8]">
                            <img
                                src={reviewContext.image}
                                alt={`${reviewContext.seller} confirmed package`}
                                className="h-44 w-full object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-black text-[#121c2a]">
                                    {reviewContext.seller}
                                </h3>

                                <p className="mt-1 text-sm font-bold text-[#66736d]">
                                    Order {reviewContext.orderId} • {reviewContext.itemCount} item
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                            <SummaryRow label="Package" value={reviewContext.packageId} />
                            <SummaryRow label="Confirmed" value={reviewContext.confirmedAt} />
                            <SummaryRow
                                label="Package total"
                                value={formatRand(reviewContext.packageTotal)}
                            />
                            <SummaryRow
                                label="Overall rating"
                                value={overallRating ? `${overallRating}/5` : "Not set"}
                            />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to={reviewContext.storeTo}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                            >
                                View store
                                <span className="material-symbols-outlined text-[18px]">
                  storefront
                </span>
                            </Link>

                            <Link
                                to={reviewContext.productReviewTo}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Review product
                                <span className="material-symbols-outlined text-[18px]">
                  inventory_2
                </span>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
              verified_user
            </span>

                        <h2 className="mb-2 text-xl font-black">Verified buyer review</h2>

                        <p className="text-sm leading-7 text-white/70">
                            This review is linked to a confirmed order, so buyers can trust
                            that it came from a real purchase.
                        </p>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              tips_and_updates
            </span>

                        <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                            Review guidelines
                        </h2>

                        <ul className="space-y-3">
                            {reviewGuidelines.map((tip) => (
                                <li key={tip} className="flex items-start gap-3">
                  <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                    check_circle
                  </span>
                                    <span className="text-sm font-bold leading-6 text-[#405049]">
                    {tip}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              support_agent
            </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Need help instead?
                        </h2>

                        <p className="text-sm leading-7 text-[#66736d]">
                            If there is a serious issue with the seller or handover, contact
                            support instead of only leaving a review.
                        </p>

                        <Link
                            to="/contact"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            Contact support
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>
                </aside>
            </div>

            <MobileReviewActions canSubmit={canSubmit} />

            <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}

// Summary stat tiles make the review context scannable before the form.
function ReviewStat({ icon, label, value }) {
    return (
        <article className="p-5 md:p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[22px]">
          {icon}
        </span>
            </div>

            <p className="truncate text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {value}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
        </article>
    );
}

// Category rows keep each detailed rating paired with its helper description.
function CategoryRatingRow({ category, value, onChange }) {
    return (
        <div className="rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-black text-[#121c2a]">{category.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                        {category.description}
                    </p>
                </div>

                <StarRating
                    name={`rating-${category.id}`}
                    value={value}
                    onChange={onChange}
                    label={`${category.label} rating`}
                />
            </div>
        </div>
    );
}

// StarRating is reused for overall and category ratings with accessible labels.
function StarRating({ name, value, onChange, label, size = "default" }) {
    const stars = [1, 2, 3, 4, 5];
    const iconSize = size === "large" ? "text-[38px]" : "text-[30px]";

    return (
        <fieldset>
            <legend className="sr-only">{label}</legend>

            <div className="flex items-center gap-1">
                {stars.map((star) => {
                    const selected = star <= value;

                    return (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onChange(star)}
                            className={`rounded-xl p-1 transition ${
                                selected ? "text-[#f6b800]" : "text-[#c7d2cc]"
                            } hover:text-[#f6b800] focus:outline-none focus:ring-2 focus:ring-[#003527]/20`}
                            aria-label={`${star} star${star === 1 ? "" : "s"}`}
                            aria-pressed={value === star}
                            name={name}
                        >
              <span className={`material-symbols-outlined icon-fill ${iconSize}`}>
                star
              </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

// Toggle rows group preference copy with its switch-like control.
function ToggleRow({ title, description, checked, onChange }) {
    return (
        <div className="flex items-start justify-between gap-4 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div>
                <h3 className="font-black text-[#121c2a]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {description}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    checked ? "bg-[#003527]" : "bg-[#dbe6e1]"
                }`}
                role="switch"
                aria-checked={checked}
                aria-label={title}
            >
        <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
            </button>
        </div>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// Fixed mobile action keeps the submit CTA available after long review guidance.
function MobileReviewActions({ canSubmit }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <button
                    type="submit"
                    form="seller-review-form"
                    disabled={!canSubmit}
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(0,53,39,.20)] transition ${
                        canSubmit
                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    Submit
                    <span className="material-symbols-outlined text-[18px]">
            send
          </span>
                </button>

                <Link
                    to="/review-product"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Product
                </Link>
            </div>
        </div>
    );
}

// Helper text gives immediate feedback as the overall star rating changes.
function getRatingHelperText(rating) {
    if (rating === 5) return "Excellent seller experience.";
    if (rating === 4) return "Good seller experience with minor issues.";
    if (rating === 3) return "Average seller experience.";
    if (rating === 2) return "Poor seller experience.";
    if (rating === 1) return "Very poor seller experience.";
    return "Select a rating to continue.";
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
