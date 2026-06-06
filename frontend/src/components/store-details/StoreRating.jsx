// Provides compact Material Symbols star displays shared by product cards and reviews.
export default function StoreRating({ rating, sizeClass = "text-[12px]" }) {
    const rounded = Math.round(rating);

    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => {
                let icon = "star";
                if (rating < star && rating > star - 1) icon = "star_half";

                return (
                    <span
                        key={star}
                        className={`material-symbols-outlined ${
                            rounded >= star || icon === "star_half"
                                ? "icon-fill text-[#d4a800]"
                                : "text-[#dbe6e1]"
                        } ${sizeClass}`}
                    >
                        {icon}
                    </span>
                );
            })}
        </div>
    );
}
