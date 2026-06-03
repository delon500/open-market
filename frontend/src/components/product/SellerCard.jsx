import { Link } from "react-router-dom";

// Summarizes the seller behind the listing and links to their public store.
export default function SellerCard({ seller }) {
    const stats = [
        ["Rating", seller.rating],
        ["Items", seller.items],
        ["Sales", seller.sales],
        ["Response", seller.response],
    ];

    return (
        <div className="rounded-[24px] border border-[#dbe6e1] bg-white p-5 shadow-[0_6px_24px_-4px_rgba(0,53,39,0.06)]">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[#003527] text-lg font-black text-white">
                    {seller.initial}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                        <p className="text-sm font-black text-[#121c2a]">{seller.name}</p>

                        {seller.verified && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[10px] font-extrabold text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[10px]">
                                    verified
                                </span>
                                Verified
                            </span>
                        )}
                    </div>

                    <p className="text-xs font-semibold text-[#9aada7]">
                        {seller.location}
                    </p>
                </div>
            </div>

            <div className="mb-3.5 grid grid-cols-4 gap-1 overflow-hidden rounded-xl">
                {stats.map(([label, value]) => (
                    <div key={label} className="bg-[#f8f9ff] px-1 py-2 text-center">
                        <div className="text-sm font-black text-[#121c2a]">{value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wide text-[#9aada7]">
                            {label}
                        </div>
                    </div>
                ))}
            </div>

            <Link
                to={`/stores/${seller.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#dbe6e1] bg-[#f8f9ff] px-5 py-2.5 text-sm font-black text-[#003527] transition hover:bg-[#eff4ff]"
            >
                Visit store
                <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                </span>
            </Link>
        </div>
    );
}
