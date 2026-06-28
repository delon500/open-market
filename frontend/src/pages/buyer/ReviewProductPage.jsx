import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype review context ties the product review back to a confirmed seller package.
const reviewContext = {
    orderId: "OM-24091",
    packageId: "PKG-KK-01",
    seller: "Kasi Kicks",
    productId: "classic-white-sneakers",
    productTitle: "Classic white everyday sneakers",
    category: "Sneakers",
    condition: "New",
    size: "UK 8",
    color: "White",
    quantity: 1,
    price: 899,
    confirmedAt: "22 June 2026, 16:48",
    productTo: "/products/classic-white-sneakers",
    sellerReviewTo: "/review-seller",
    storeTo: "/stores/kasi-kicks",
    image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=320&q=80",
};

// Category ratings separate product quality from the overall star rating.
const ratingCategories = [
    {
        id: "quality",
        label: "Product quality",
        description: "How good does the product feel overall?",
    },
    {
        id: "accuracy",
        label: "Listing accuracy",
        description: "Did it match the photos and description?",
    },
    {
        id: "condition",
        label: "Item condition",
        description: "Was the condition as expected?",
    },
    {
        id: "value",
        label: "Value for money",
        description: "Was the price fair for what you received?",
    },
];

// Quick tags provide structured feedback for buyers who do not want to type everything manually.
const quickTags = [
    "Matched the photos",
    "Good quality",
    "Comfortable fit",
    "Clean condition",
    "Worth the price",
    "Would buy again",
    "Colour looked different",
    "Size felt different",
    "Condition could improve",
];

// Guidelines keep product reviews useful and safe for public display.
const reviewGuidelines = [
    "Focus on the product itself, not only the seller.",
    "Mention whether the item matched the listing photos and description.",
    "Do not include private contact details or delivery addresses.",
];

export default function ReviewProductPage() {
    // Review form state stays local until product review submission is backed by the API.
    const [overallRating, setOverallRating] = useState(0);
    const [categoryRatings, setCategoryRatings] = useState({
        quality: 0,
        accuracy: 0,
        condition: 0,
        value: 0,
    });
    const [selectedTags, setSelectedTags] = useState([]);
    const [reviewText, setReviewText] = useState("");
    const [photos, setPhotos] = useState([]);
    const [recommendProduct, setRecommendProduct] = useState(true);
    const [shareName, setShareName] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categoryRatingsComplete = Object.values(categoryRatings).every(
        (value) => value > 0
    );
    const reviewTextComplete = reviewText.trim().length >= 20;
    const hasOverallRating = overallRating > 0;

    const requiredProgress = [
        {
            id: "overall",
            label: "Overall rating selected",
            complete: hasOverallRating,
        },
        {
            id: "details",
            label: "Product detail ratings complete",
            complete: categoryRatingsComplete,
        },
        {
            id: "review",
            label: "Review has at least 20 characters",
            complete: reviewTextComplete,
        },
        {
            id: "agreement",
            label: "Confirmation checked",
            complete: agreed,
        },
    ];

    const progressCount = requiredProgress.filter((item) => item.complete).length;

    const averageCategoryRating = useMemo(() => {
        // Average only completed category ratings so empty rows do not drag the summary down.
        const values = Object.values(categoryRatings).filter(Boolean);
        if (!values.length) return 0;

        return values.reduce((total, value) => total + value, 0) / values.length;
    }, [categoryRatings]);

    const canSubmit =
        hasOverallRating && categoryRatingsComplete && reviewTextComplete && agreed;

    function updateCategoryRating(categoryId, value) {
        // Update one category while preserving the rest of the detailed rating breakdown.
        setCategoryRatings((current) => ({
            ...current,
            [categoryId]: value,
        }));
    }

    function toggleTag(tag) {
        // Tags behave like multi-select chips so buyers can add or remove quick context.
        setSelectedTags((current) =>
            current.includes(tag)
                ? current.filter((item) => item !== tag)
                : [...current, tag]
        );
    }

    function handlePhotoUpload(event) {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (!selectedFiles.length) return;

        // Limit review photos so the prototype matches a lightweight moderation workflow.
        const availableSlots = 4 - photos.length;

        const nextPhotos = selectedFiles.slice(0, availableSlots).map((file) => ({
            id: `${file.name}-${file.lastModified}`,
            name: file.name,
            size: file.size,
        }));

        setPhotos((current) => [...current, ...nextPhotos].slice(0, 4));
        event.target.value = "";
    }

    function removePhoto(photoId) {
        setPhotos((current) => current.filter((photo) => photo.id !== photoId));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!canSubmit) return;

        // Keep submission feedback on-page for the frontend prototype.
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="space-y-6 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:space-y-8 md:pb-12">
            <BuyerPageHeader
                eyebrow="Review product"
                title="Review your product"
                description="Share whether the item matched the listing, condition, quality, and value."
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
                            to="/review-seller"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Review seller
                            <span className="material-symbols-outlined text-[18px]">
                                storefront
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
                            Product review submitted
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            Thank you. In the full version, this review will appear on the
                            product after moderation checks.
                        </p>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                            <Link
                                to="/review-seller"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-4 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                Review seller next
                                <span className="material-symbols-outlined text-[17px]">
                                    storefront
                                </span>
                            </Link>

                            <Link
                                to="/order-details"
                                className="inline-flex items-center justify-center rounded-2xl border border-[#b7e4d1] bg-white px-4 py-3 text-sm font-black text-[#003527] transition hover:bg-[#f8fbf9]"
                            >
                                Back to order
                            </Link>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white"
                        aria-label="Dismiss product review submitted message"
                    >
                        <span className="material-symbols-outlined text-[19px]">
                            close
                        </span>
                    </button>
                </div>
            )}

            <ProductContextCard
                overallRating={overallRating}
                progressCount={progressCount}
                totalRequired={requiredProgress.length}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <form
                        id="product-review-form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <FormSection
                            step="1"
                            title="Rate the product"
                            description="Start with your overall rating, then rate the details other buyers care about most."
                        >
                            <div className="rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-4 md:rounded-[26px] md:p-5">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="font-black text-[#121c2a]">
                                            Overall product rating
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                            How would you rate the product overall?
                                        </p>
                                    </div>

                                    <StarRating
                                        name="overall-product-rating"
                                        value={overallRating}
                                        onChange={setOverallRating}
                                        size="large"
                                        label="Overall product rating"
                                    />
                                </div>

                                <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#66736d]">
                                    {getRatingHelperText(overallRating)}
                                </p>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="font-black text-[#121c2a]">
                                    Product detail ratings
                                </h3>

                                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                                    <span className="material-symbols-outlined icon-fill text-[15px]">
                                        analytics
                                    </span>
                                    Average {averageCategoryRating.toFixed(1)}/5
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
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
                        </FormSection>

                        <FormSection
                            step="2"
                            title="Describe your experience"
                            description="Use quick tags, then write a short review about quality, fit, condition, and listing accuracy."
                        >
                            <div>
                                <h3 className="mb-3 font-black text-[#121c2a]">
                                    What describes the product?
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {quickTags.map((tag) => {
                                        const selected = selectedTags.includes(tag);

                                        return (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleTag(tag)}
                                                className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
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
                            </div>

                            <div className="mt-6">
                                <label className="block">
                                    <span className="mb-3 block font-black text-[#121c2a]">
                                        Write your product review
                                    </span>

                                    <textarea
                                        value={reviewText}
                                        onChange={(event) =>
                                            setReviewText(event.target.value.slice(0, 600))
                                        }
                                        rows={7}
                                        placeholder="Example: The sneakers matched the photos, the size was correct, and the quality felt good for the price..."
                                        className="w-full resize-none rounded-[22px] border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-4 text-sm font-semibold leading-7 text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                                    />
                                </label>

                                <div className="mt-3 flex flex-col gap-2 text-xs font-bold text-[#66736d] sm:flex-row sm:items-center sm:justify-between">
                                    <span
                                        className={
                                            reviewTextComplete
                                                ? "text-[#003527]"
                                                : "text-[#66736d]"
                                        }
                                    >
                                        Minimum 20 characters required.
                                    </span>
                                    <span>{reviewText.length}/600</span>
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            step="3"
                            title="Add photos optional"
                            description="Photos are optional, but they help buyers see the real item condition."
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <label
                                    className={`flex min-h-36 flex-col items-center justify-center rounded-[24px] border border-dashed p-5 text-center transition ${
                                        photos.length >= 4
                                            ? "cursor-not-allowed border-[#dbe6e1] bg-[#f8fbf9] opacity-70"
                                            : "cursor-pointer border-[#bfc9c3] bg-[#f8fbf9] hover:border-[#003527] hover:bg-[#f0faf6]"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="sr-only"
                                        onChange={handlePhotoUpload}
                                        disabled={photos.length >= 4}
                                    />

                                    <span className="material-symbols-outlined mb-3 text-[34px] text-[#003527]">
                                        add_photo_alternate
                                    </span>

                                    <span className="text-sm font-black text-[#003527]">
                                        {photos.length >= 4 ? "Photo limit reached" : "Upload photos"}
                                    </span>

                                    <span className="mt-1 text-xs font-bold text-[#66736d]">
                                        {photos.length}/4 selected
                                    </span>
                                </label>

                                <div className="space-y-3">
                                    {photos.length > 0 ? (
                                        photos.map((photo) => (
                                            <PhotoUploadRow
                                                key={photo.id}
                                                photo={photo}
                                                onRemove={() => removePhoto(photo.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-5">
                                            <p className="text-sm font-black text-[#121c2a]">
                                                No photos added
                                            </p>

                                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                                You can submit without photos. Add images only if they
                                                make your review clearer.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            step="4"
                            title="Final options"
                            description="Choose how your review appears, then confirm it follows the review rules."
                        >
                            <div className="space-y-3">
                                <ToggleRow
                                    title="I would recommend this product"
                                    description="This helps us surface products buyers are happy with."
                                    checked={recommendProduct}
                                    onChange={setRecommendProduct}
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
                                    className={`hidden items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black shadow-[0_8px_24px_rgba(0,53,39,.18)] transition md:inline-flex ${
                                        canSubmit
                                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                                    }`}
                                >
                                    Submit product review
                                    <span className="material-symbols-outlined text-[18px]">
                                        send
                                    </span>
                                </button>
                            </div>
                        </FormSection>
                    </form>
                </section>

                <aside className="hidden space-y-6 xl:col-span-4 xl:block">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <ProductSummaryBlock overallRating={overallRating} />

                        <div className="mt-6 border-t border-[#e5ece8] pt-6">
                            <ReviewProgressPanel
                                progress={requiredProgress}
                                progressCount={progressCount}
                            />
                        </div>

                        <div className="mt-6 border-t border-[#e5ece8] pt-6">
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
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
                            verified_user
                        </span>

                        <h2 className="mb-2 text-xl font-black">
                            Verified product review
                        </h2>

                        <p className="text-sm leading-7 text-white/70">
                            This review is linked to a confirmed order, so buyers can trust
                            that it came from someone who received the item.
                        </p>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
                            support_agent
                        </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Serious product issue?
                        </h2>

                        <p className="text-sm leading-7 text-[#66736d]">
                            If the item is damaged, missing, fake, or very different from the
                            listing, open a dispute instead of only leaving a review.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/open-dispute"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                Open dispute
                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Contact support
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>

            <MobileReviewActions
                canSubmit={canSubmit}
                progressCount={progressCount}
                totalRequired={requiredProgress.length}
            />

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

// Context card anchors the review to the exact product and package being reviewed.
function ProductContextCard({ overallRating, progressCount, totalRequired }) {
    return (
        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-4 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                    <img
                        src={reviewContext.image}
                        alt={reviewContext.productTitle}
                        className="h-20 w-20 shrink-0 rounded-[22px] object-cover md:h-24 md:w-24"
                    />

                    <div className="min-w-0">
                        <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-[#003527]">
                            Product feedback
                        </p>

                        <h2 className="text-xl font-black tracking-[-0.04em] text-[#121c2a] md:text-2xl">
                            {reviewContext.productTitle}
                        </h2>

                        <p className="mt-2 text-sm font-bold leading-6 text-[#66736d]">
                            {reviewContext.seller} • Order {reviewContext.orderId} •
                            Confirmed {reviewContext.confirmedAt}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <MetaPill>{formatRand(reviewContext.price)}</MetaPill>
                            <MetaPill>{reviewContext.size}</MetaPill>
                            <MetaPill>{reviewContext.color}</MetaPill>
                            <MetaPill>{reviewContext.condition}</MetaPill>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:w-[280px]">
                    <CompactMetric
                        label="Rating"
                        value={overallRating ? `${overallRating}/5` : "Not set"}
                    />
                    <CompactMetric
                        label="Progress"
                        value={`${progressCount}/${totalRequired}`}
                    />
                </div>
            </div>
        </section>
    );
}

// Meta pills keep item attributes compact under the product summary.
function MetaPill({ children }) {
    return (
        <span className="rounded-full border border-[#dbe6e1] bg-[#f8fbf9] px-3 py-1 text-xs font-black text-[#405049]">
            {children}
        </span>
    );
}

// Compact metrics summarize review progress without making the sidebar feel heavy.
function CompactMetric({ label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
            <p className="mt-1 text-lg font-black tracking-[-0.03em] text-[#003527]">
                {value}
            </p>
        </div>
    );
}

// Form sections keep each review step focused on one type of input.
function FormSection({ step, title, description, children }) {
    return (
        <section className="rounded-[24px] border border-[#dbe6e1] bg-white p-4 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:rounded-[28px] md:p-6">
            <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-sm font-black text-[#003527]">
                    {step}
                </div>

                <div className="min-w-0">
                    <h2 className="text-xl font-black text-[#121c2a]">{title}</h2>

                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </section>
    );
}

// Product summary block repeats the current rating context near the detailed inputs.
function ProductSummaryBlock({ overallRating }) {
    return (
        <div>
            <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                Product summary
            </h2>

            <div className="mb-5 overflow-hidden rounded-[24px] border border-[#e5ece8]">
                <img
                    src={reviewContext.image}
                    alt={reviewContext.productTitle}
                    className="h-44 w-full object-cover"
                />

                <div className="p-4">
                    <h3 className="font-black text-[#121c2a]">
                        {reviewContext.productTitle}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-[#66736d]">
                        {reviewContext.size} • {reviewContext.color} • {reviewContext.condition}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <SummaryRow label="Order" value={reviewContext.orderId} />
                <SummaryRow label="Seller" value={reviewContext.seller} />
                <SummaryRow label="Category" value={reviewContext.category} />
                <SummaryRow
                    label="Product price"
                    value={formatRand(reviewContext.price)}
                />
                <SummaryRow
                    label="Overall rating"
                    value={overallRating ? `${overallRating}/5` : "Not set"}
                />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">
                <Link
                    to={reviewContext.productTo}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                >
                    View product
                    <span className="material-symbols-outlined text-[18px]">
                        inventory_2
                    </span>
                </Link>

                <Link
                    to={reviewContext.storeTo}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    View store
                    <span className="material-symbols-outlined text-[18px]">
                        storefront
                    </span>
                </Link>
            </div>
        </div>
    );
}

// Progress panel turns validation requirements into a visible completion checklist.
function ReviewProgressPanel({ progress, progressCount }) {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-[#121c2a]">
                    Review progress
                </h2>

                <span className="rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                    {progressCount}/{progress.length} done
                </span>
            </div>

            <div className="space-y-3">
                {progress.map((item) => (
                    <ProgressChecklistItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

// Progress checklist items mirror the submit requirements exactly.
function ProgressChecklistItem({ item }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-[#f8fbf9] p-3">
            <span
                className={`material-symbols-outlined icon-fill shrink-0 text-[20px] ${
                    item.complete ? "text-[#003527]" : "text-[#9aada7]"
                }`}
            >
                {item.complete ? "check_circle" : "radio_button_unchecked"}
            </span>

            <span
                className={`text-sm font-bold leading-5 ${
                    item.complete ? "text-[#003527]" : "text-[#66736d]"
                }`}
            >
                {item.label}
            </span>
        </div>
    );
}

// Category rows pair detailed rating labels with the reusable star input.
function CategoryRatingRow({ category, value, onChange }) {
    return (
        <div className="rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
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

// Star rating works for both the overall score and each detailed category score.
function StarRating({ name, value, onChange, label, size = "default" }) {
    const stars = [1, 2, 3, 4, 5];
    const iconSize = size === "large" ? "text-[36px] md:text-[38px]" : "text-[28px] md:text-[30px]";

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
                            className={`flex min-h-11 min-w-11 items-center justify-center rounded-xl p-1 transition ${
                                selected ? "text-[#f6b800]" : "text-[#c7d2cc]"
                            } hover:text-[#f6b800] focus:outline-none focus:ring-2 focus:ring-[#003527]/20`}
                            aria-label={`${star} star${star === 1 ? "" : "s"}`}
                            aria-pressed={value === star}
                            name={name}
                        >
                            <span
                                className={`material-symbols-outlined icon-fill ${iconSize}`}
                            >
                                star
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

// Photo rows represent uploads that can still be removed before submission.
function PhotoUploadRow({ photo, onRemove }) {
    return (
        <div className="flex items-center gap-3 rounded-[18px] border border-[#e5ece8] bg-white p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    image
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-[#121c2a]">
                    {photo.name}
                </p>

                <p className="text-xs font-bold text-[#66736d]">
                    {formatFileSize(photo.size)}
                </p>
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#9f2d20] transition hover:bg-[#fff0ec]"
                aria-label={`Remove ${photo.name}`}
            >
                <span className="material-symbols-outlined text-[19px]">close</span>
            </button>
        </div>
    );
}

// Toggle rows collect optional public-display preferences without leaving the form.
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
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#003527]/20 ${
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

// Summary rows keep review context readable in side panels.
function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// Mobile actions keep submit status visible after the long review form scrolls.
function MobileReviewActions({ canSubmit, progressCount, totalRequired }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#66736d]">
                        Progress
                    </p>
                    <p className="text-sm font-black text-[#121c2a]">
                        {progressCount}/{totalRequired} required steps complete
                    </p>
                </div>

                <button
                    type="submit"
                    form="product-review-form"
                    disabled={!canSubmit}
                    className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(0,53,39,.20)] transition ${
                        canSubmit
                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    Submit review
                    <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
            </div>
        </div>
    );
}

// Helper text gives immediate feedback as the buyer changes the overall rating.
function getRatingHelperText(rating) {
    if (rating === 5) return "Excellent product experience.";
    if (rating === 4) return "Good product with minor issues.";
    if (rating === 3) return "Average product experience.";
    if (rating === 2) return "Poor product experience.";
    if (rating === 1) return "Very poor product experience.";
    return "Select a rating to continue.";
}

// File sizes are shown in friendly units so photo uploads are easier to verify.
function formatFileSize(bytes) {
    if (!bytes) return "0 KB";

    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) return `${Math.round(kilobytes)} KB`;

    return `${(kilobytes / 1024).toFixed(1)} MB`;
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
