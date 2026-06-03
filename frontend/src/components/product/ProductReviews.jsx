import StarRating from "./StarRating";

// Renders the product review summary and sample buyer reviews.
export default function ProductReviews() {
    const reviews = [
        {
            initial: "T",
            name: "Thabo M.",
            date: "May 2026",
            stars: 5,
            text: "Great quality for the price. Very comfortable right out of the box - wore them the whole day without any discomfort. Fast delivery too.",
            color: "#003527",
        },
        {
            initial: "L",
            name: "Lerato K.",
            date: "Apr 2026",
            stars: 4,
            text: "Looks exactly like the pictures. Runs true to size - ordered my usual UK 8 and it fits perfectly. Good seller, quick to respond.",
            color: "#5a3e7a",
        },
        {
            initial: "S",
            name: "Sipho D.",
            date: "Apr 2026",
            stars: 5,
            text: "Solid everyday sneaker. The sole is thicker than expected - extra cushioning. Would definitely buy again.",
            color: "#c2410c",
        },
    ];

    return (
        <div>
            <div className="mb-6 flex items-center gap-6 border-b border-[#f0f4f8] pb-6">
                <div className="text-center">
                    <div className="text-[42px] font-black leading-none tracking-[-0.04em] text-[#121c2a]">
                        4.8
                    </div>
                    <StarRating rating={4.5} />
                    <div className="text-[11px] font-semibold text-[#9aada7]">
                        3 reviews
                    </div>
                </div>

                <div className="flex-1 space-y-1.5">
                    <ReviewBar stars="5" percent="66%" count="2" />
                    <ReviewBar stars="4" percent="33%" count="1" muted />
                    <ReviewBar stars="3" percent="0%" count="0" muted />
                    <ReviewBar stars="2" percent="0%" count="0" muted />
                    <ReviewBar stars="1" percent="0%" count="0" muted />
                </div>
            </div>

            <div className="space-y-5">
                {reviews.map((review, index) => (
                    <div
                        key={review.name}
                        className={
                            index !== reviews.length - 1
                                ? "border-b border-[#f0f4f8] pb-5"
                                : ""
                        }
                    >
                        <div className="mb-2 flex items-center gap-3">
                            <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                                style={{ backgroundColor: review.color }}
                            >
                                {review.initial}
                            </div>

                            <div>
                                <div className="text-sm font-extrabold text-[#121c2a]">
                                    {review.name}
                                </div>
                                <div className="flex items-center gap-1">
                                    <StarRating rating={review.stars} small />
                                    <span className="ml-1 text-[11px] font-semibold text-[#9aada7]">
                                        {review.date}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[13px] leading-6 text-[#404944]">
                            {review.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReviewBar({ stars, percent, count, muted = false }) {
    return (
        <div className="flex items-center gap-2">
            <span className="w-4 text-[11px] font-bold text-[#9aada7]">{stars}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e6eeff]">
                <div
                    className={`h-full rounded-full ${
                        muted ? "bg-[#95d3ba]" : "bg-[#003527]"
                    }`}
                    style={{ width: percent }}
                />
            </div>
            <span className="w-3 text-[11px] font-semibold text-[#9aada7]">
                {count}
            </span>
        </div>
    );
}
