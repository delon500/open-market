import { Link } from "react-router-dom";
import StoreStats from "./StoreStats.jsx";

// Store preview card for the public stores grid, including save state and store stats.
export default function StoreCard({ store, saved, onToggleSaved }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-[28px] border border-[#e6eeff] bg-white transition hover:-translate-y-1 hover:border-[#95d3ba] hover:shadow-[0_20px_50px_rgba(0,53,39,.10)]">
            <div className="relative">
                <div
                    className="grid h-[174px] gap-[5px] px-3 pt-3"
                    style={{ gridTemplateColumns: "1.15fr 1fr 1fr" }}
                >
                    {store.images.map((image) => (
                        <div
                            key={image}
                            className="overflow-hidden rounded-[14px] bg-[#f0faf6]"
                        >
                            <img
                                src={image}
                                alt={`${store.name} preview`}
                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onToggleSaved}
                    aria-label={saved ? `Unsave ${store.name}` : `Save ${store.name}`}
                    className={`absolute right-[18px] top-[18px] flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#7b8781] backdrop-blur transition hover:scale-[1.03] hover:text-[#003527] ${
                        saved ? "text-[#003527]" : ""
                    }`}
                >
                    <span
                        className={`material-symbols-outlined ${
                            saved ? "icon-fill" : ""
                        }`}
                    >
                        bookmark
                    </span>
                </button>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-black tracking-[-0.02em] text-[#121c2a]">
                            {store.name}
                        </h2>

                        {store.verified ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5ee] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#003527]">
                                <span className="material-symbols-outlined icon-fill text-[11px]">
                                    verified
                                </span>
                                Verified
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8e0] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#745c00]">
                                New store
                            </span>
                        )}
                    </div>

                    <p className="text-sm font-bold text-[#66736d]">
                        {store.location} - {store.categoryLabel}
                    </p>
                </div>

                <p className="mb-5 text-sm leading-6 text-[#404944]">
                    {store.description}
                </p>

                <div className="mb-4 mt-auto grid grid-cols-2 gap-2">
                    <StoreStats value={`${store.rating} star`} label="Rating" highlight />
                    <StoreStats value={store.products} label="Products" />
                </div>

                <Link
                    to={`/stores/${store.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition-opacity hover:opacity-90"
                >
                    Visit store
                    <span className="material-symbols-outlined text-[17px]">
                        arrow_forward
                    </span>
                </Link>
            </div>
        </article>
    );
}
