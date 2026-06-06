import { storeRatingBreakdown } from "../../data/storeDetails";
import StoreRating from "./StoreRating";

// Displays the store review summary, rating distribution, and recent buyer reviews.
export default function StoreReviewsPanel({ store }) {
    return (
        <div className="rounded-[24px] border border-[#d8e5df] bg-white p-5 shadow-[0_4px_20px_rgba(0,53,39,0.05)] lg:mt-8 lg:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 className="text-xl font-black text-[#121c2a]">Store reviews</h2>
                    <p className="text-sm text-[#66736d]">
                        What buyers say about {store.name}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-black leading-none text-[#003527]">
                            {store.rating}
                        </div>
                        <div className="mt-1.5 flex justify-center gap-0.5">
                            <StoreRating rating={store.rating} sizeClass="text-[15px]" />
                        </div>
                        <p className="mt-1 text-xs font-semibold text-[#66736d]">
                            {store.reviewCount} reviews
                        </p>
                    </div>

                    <div className="min-w-[140px] space-y-1.5">
                        {storeRatingBreakdown.map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center gap-2 text-xs font-semibold text-[#66736d]"
                            >
                                <span className="w-10 text-right">{row.label}</span>
                                <div className="rating-bar-track">
                                    <div
                                        className="rating-bar-fill"
                                        style={{
                                            width: `${row.percent}%`,
                                            backgroundColor: row.color,
                                        }}
                                    />
                                </div>
                                <span className="w-7">{row.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                {store.reviews.map((review) => (
                    <ReviewCard key={`${review.name}-${review.product}`} review={review} />
                ))}
            </div>

            <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#d8e5df] bg-[#f0f4f2] py-3.5 text-sm font-black text-[#003527] transition hover:border-[#95d3ba] hover:bg-[#e4ede8]"
            >
                Load more reviews
                <span className="material-symbols-outlined text-[17px]">
                    expand_more
                </span>
            </button>
        </div>
    );
}

function ReviewCard({ review }) {
    return (
        <div className="rounded-2xl bg-[#f5f8f6] p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-black ${review.avatarClass}`}
                    >
                        {review.initials}
                    </div>
                    <div>
                        <p className="text-sm font-black text-[#121c2a]">
                            {review.name}
                        </p>
                        <div className="mt-0.5 flex gap-0.5">
                            <StoreRating rating={review.stars} sizeClass="text-[15px]" />
                        </div>
                    </div>
                </div>

                <span className="whitespace-nowrap text-xs font-semibold text-[#9aada7]">
                    {review.date}
                </span>
            </div>

            <p className="text-sm leading-6 text-[#404944]">{review.text}</p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-bold text-[#66736d]">
                <span className="material-symbols-outlined icon-fill text-[14px] text-[#003527]">
                    inventory_2
                </span>
                Bought: {review.product}
            </div>
        </div>
    );
}
