// Renders Material Symbols stars for product and review rating displays.
export default function StarRating({ rating, small = false }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center gap-0.5">
            {stars.map((star) => {
                let icon = "star";
                let filled = true;

                if (rating < star && rating > star - 1) {
                    icon = "star_half";
                } else if (rating < star) {
                    filled = false;
                }

                return (
                    <span
                        key={star}
                        className={`material-symbols-outlined ${
                            filled ? "icon-fill text-[#f59e0b]" : "text-[#dbe6e1]"
                        } ${small ? "text-[13px]" : "text-[16px]"}`}
                    >
                        {icon}
                    </span>
                );
            })}
        </div>
    );
}
