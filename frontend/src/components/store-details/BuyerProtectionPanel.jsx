// Communicates the marketplace protection promise with approved public-facing wording.
export default function BuyerProtectionPanel({ className = "" }) {
    const items = [
        "Payment held until delivery is confirmed",
        "Open a dispute if your item does not arrive",
        "Secure checkout support",
        "Dedicated buyer support team",
    ];

    return (
        <div
            className={`rounded-[24px] bg-[#003527] p-6 text-white shadow-[0_12px_36px_rgba(0,53,39,.20)] ${className}`}
        >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill">shield_locked</span>
            </div>
            <h2 className="mb-4 text-lg font-black">Buyer Protection</h2>
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-white/75"
                    >
                        <span className="material-symbols-outlined icon-fill mt-0.5 text-[16px] text-[#95d3ba]">
                            check_circle
                        </span>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
