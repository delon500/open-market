import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function RegisterPage() {
    return (
        <PublicLayout>
            <main className="w-full bg-[#f8f9ff]">
                {/* Hero */}
                <section className="bg-[#003527] px-4 pb-16 pt-14 text-center md:px-10">
                    <div className="mx-auto max-w-[1280px]">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#95d3ba]/25 bg-[#95d3ba]/15 px-4 py-2 text-xs font-semibold text-[#95d3ba]">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              New account
            </span>

                        <h1 className="mb-5 text-4xl font-black leading-tight tracking-[-0.03em] text-white md:text-6xl">
                            Join Open Market.
                            <br />
                            <span className="text-[#fed65b]">Your way.</span>
                        </h1>

                        <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-white/70 md:text-lg">
                            Choose how you want to use Open Market — shop from local sellers,
                            or list your own products.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            <HeroPill icon="shield_locked" label="Buyer protection" />
                            <HeroPill icon="storefront" label="Local sellers" />
                            <HeroPill icon="lock" label="Secure account" />
                            <HeroPill icon="flag" label="South African marketplace" />
                        </div>
                    </div>
                </section>

                {/* Cards */}
                <section className="mx-auto max-w-[1280px] px-4 py-10 md:px-10">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Buyer Card */}
                        <article className="flex flex-col rounded-3xl bg-[#003527] p-7 text-white shadow-[0_20px_48px_rgba(0,53,39,0.18)] transition hover:-translate-y-1 md:p-9">
                            <div className="mb-6 flex items-start justify-between">
                <span className="material-symbols-outlined icon-fill text-[34px] text-[#95d3ba]">
                  shopping_bag
                </span>

                                <span className="rounded-full bg-[#fed65b]/20 px-3 py-1 text-xs font-bold text-[#fed65b]">
                  Most popular
                </span>
                            </div>

                            <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em]">
                                Register as Buyer
                            </h2>

                            <p className="mb-8 leading-7 text-white/65">
                                Shop from local sellers, track orders, open disputes, and access
                                buyer protection on every purchase.
                            </p>

                            <div className="mb-8 space-y-3">
                                <CheckItem dark>Shop from local sellers</CheckItem>
                                <CheckItem dark>Save wishlist items</CheckItem>
                                <CheckItem dark>Track orders in real time</CheckItem>
                                <CheckItem dark>Buyer protection on every order</CheckItem>
                            </div>

                            <Link
                                to="/register-buyer"
                                className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-6 py-4 text-sm font-bold text-[#3a2e00] transition active:scale-[0.98]"
                            >
                                Continue as Buyer
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </article>

                        {/* Seller Card */}
                        <article className="flex flex-col rounded-3xl border border-[#bfc9c3] bg-white p-7 shadow-[0_4px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#003527] hover:shadow-[0_20px_48px_rgba(0,53,39,0.10)] md:p-9">
                            <div className="mb-6">
                <span className="material-symbols-outlined icon-fill text-[34px] text-[#745c00]">
                  storefront
                </span>
                            </div>

                            <h2 className="mb-3 text-3xl font-extrabold tracking-[-0.02em] text-[#121c2a]">
                                Register as Seller
                            </h2>

                            <p className="mb-8 leading-7 text-[#404944]">
                                Start your seller profile, go through simple verification, and
                                begin listing your products today.
                            </p>

                            <div className="mb-8 space-y-3">
                                <CheckItem>List products immediately</CheckItem>
                                <CheckItem>Manage and fulfil orders</CheckItem>
                                <CheckItem>Build your seller reputation</CheckItem>
                                <CheckItem>Receive protected payouts</CheckItem>
                            </div>

                            <Link
                                to="/register-seller"
                                className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98]"
                            >
                                Continue as Seller
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Link>
                        </article>
                    </div>

                    {/* Bottom helper cards */}
                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-4 rounded-2xl border border-[#bfc9c3] bg-white p-6 transition hover:border-[#003527] hover:shadow-[0_8px_24px_rgba(0,53,39,0.08)] sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="mb-1 text-lg font-bold text-[#121c2a]">
                                    Already have an account?
                                </h3>
                                <p className="text-sm text-[#404944]">
                                    Sign in to your existing Open Market account.
                                </p>
                            </div>

                            <Link
                                to="/login"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#003527] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                            >
                                Sign In
                                <span className="material-symbols-outlined text-[16px]">login</span>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4 rounded-2xl border border-[#bfc9c3] bg-[#eff4ff] p-6 transition hover:border-[#003527] hover:shadow-[0_8px_24px_rgba(0,53,39,0.08)] sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="mb-1 text-lg font-bold text-[#121c2a]">
                                    Not sure which to choose?
                                </h3>
                                <p className="text-sm text-[#404944]">
                                    Compare buyer and seller features side by side.
                                </p>
                            </div>

                            <Link
                                to="/account-type"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#bfc9c3] bg-white px-5 py-3 text-sm font-bold text-[#003527] transition hover:bg-[#f8f9ff]"
                            >
                                Compare
                                <span className="material-symbols-outlined text-[16px]">
                  compare_arrows
                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Safety note */}
                    <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-[#707974]">
            <span className="material-symbols-outlined text-[16px] text-[#003527]">
              security
            </span>
                        Open Market will never ask for your password, card PIN, or banking
                        details in messages.
                        <Link
                            to="/trust-safety"
                            className="font-semibold text-[#003527] underline underline-offset-4"
                        >
                            Learn more
                        </Link>
                    </p>
                </section>
            </main>
        </PublicLayout>
    );
}

function HeroPill({ icon, label }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white/75">
      <span className="material-symbols-outlined text-[16px] text-[#95d3ba]">
        {icon}
      </span>
            {label}
    </span>
    );
}

function CheckItem({ children, dark = false }) {
    return (
        <div className={`flex items-center gap-3 text-sm ${dark ? "text-white/85" : "text-[#404944]"}`}>
      <span
          className={`material-symbols-outlined icon-fill text-[18px] ${
              dark ? "text-[#95d3ba]" : "text-[#003527]"
          }`}
      >
        check_circle
      </span>
            {children}
        </div>
    );
}