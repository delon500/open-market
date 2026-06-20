import { Link } from "react-router-dom";

// Shared account header with responsive search, shopping, notifications, and profile access.
export default function BuyerHeader({ onOpenMenu }) {
    return (
        <header className="sticky top-0 z-30 border-b border-[#dbe6e1] bg-white/95 backdrop-blur">
            <div className="flex h-[76px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenMenu}
                        aria-label="Open account navigation"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dbe6e1] text-[#003527] transition hover:bg-[#f0faf6] lg:hidden"
                    >
            <span className="material-symbols-outlined">
              menu
            </span>
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-2 lg:hidden"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003527] text-white">
              <span className="material-symbols-outlined text-[20px]">
                storefront
              </span>
                        </div>

                        <span className="hidden font-black tracking-[-0.03em] text-[#003527] sm:block">
              Open Market
            </span>
                    </Link>

                    <label className="hidden w-full max-w-[420px] items-center gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3 md:flex">
            <span className="material-symbols-outlined text-[20px] text-[#66736d]">
              search
            </span>

                        <input
                            type="search"
                            placeholder="Search products and stores..."
                            className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                        />
                    </label>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <Link
                        to="/shop"
                        className="hidden items-center gap-2 rounded-2xl border border-[#dbe6e1] px-4 py-2.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6] sm:inline-flex"
                    >
            <span className="material-symbols-outlined text-[19px]">
              storefront
            </span>
                        Continue shopping
                    </Link>

                    <Link
                        to="/account/notifications"
                        aria-label="Notifications"
                        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dbe6e1] text-[#003527] transition hover:bg-[#f0faf6]"
                    >
            <span className="material-symbols-outlined">
              notifications
            </span>

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#d83b2d]" />
                    </Link>

                    <Link
                        to="/account/profile"
                        className="flex items-center gap-3 rounded-2xl p-1.5 transition hover:bg-[#f0faf6]"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#003527] text-sm font-black text-white">
                            DW
                        </div>

                        <div className="hidden text-left xl:block">
                            <p className="max-w-[140px] truncate text-sm font-black text-[#121c2a]">
                                Delon Wenyeve
                            </p>
                            <p className="text-xs font-semibold text-[#66736d]">
                                Buyer account
                            </p>
                        </div>

                        <span className="material-symbols-outlined hidden text-[18px] text-[#66736d] xl:block">
              keyboard_arrow_down
            </span>
                    </Link>
                </div>
            </div>

            <div className="border-t border-[#eef2f0] px-4 py-3 md:hidden">
                <label className="flex items-center gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-3">
          <span className="material-symbols-outlined text-[20px] text-[#66736d]">
            search
          </span>

                    <input
                        type="search"
                        placeholder="Search Open Market..."
                        className="min-w-0 flex-1 border-0 bg-transparent text-sm font-semibold text-[#121c2a] outline-none placeholder:text-[#9aada7]"
                    />
                </label>
            </div>
        </header>
    );
}
