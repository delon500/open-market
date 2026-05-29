import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import PasswordField from "../../components/auth/PasswordField";

export default function LoginPage() {
    return (
        <PublicLayout>
            <section className="mx-auto grid min-h-[calc(100vh-220px)] max-w-[1280px] grid-cols-1 gap-0 px-4 py-10 md:px-10 lg:grid-cols-2 lg:py-16">
                {/* Left brand panel */}
                <div className="hidden overflow-hidden rounded-l-2xl bg-[#003527] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <div className="mb-16 flex items-center gap-3 text-2xl font-bold">
              <span className="material-symbols-outlined icon-fill text-[#ffe088]">
                shopping_bag
              </span>
                            <span>Open Market</span>
                        </div>

                        <div className="max-w-md">
                            <h1 className="mb-6 text-5xl font-extrabold leading-tight">
                                Hello
                                <br />
                                Open Market!
                            </h1>

                            <p className="text-lg leading-8 text-white/80">
                                Buy and sell locally with confidence. Protected payments,
                                verified sellers, and secure account access.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-white/60">
                        © 2026 Open Market. Proudly South African.
                    </p>
                </div>

                {/* Right login form */}
                <div className="flex items-center justify-center rounded-2xl border border-[#bfc9c3] bg-white p-6 shadow-[0_4px_24px_rgba(0,53,39,0.04)] lg:rounded-l-none lg:border-l-0 md:p-12">
                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-[#003527] lg:hidden">
                <span className="material-symbols-outlined icon-fill">
                  shopping_bag
                </span>
                                <span>Open Market</span>
                            </div>

                            <h2 className="mb-3 text-4xl font-extrabold text-[#121c2a]">
                                Welcome Back!
                            </h2>

                            <p className="text-sm text-[#404944]">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/account-type"
                                    className="font-semibold text-[#003527] underline underline-offset-4"
                                >
                                    Create a new account
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#121c2a]"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full border-0 border-b border-[#707974] bg-transparent px-0 py-3 text-[#121c2a] outline-none transition placeholder:text-[#707974] focus:border-[#003527] focus:ring-0"
                                />
                            </div>

                            <PasswordField
                                id="password"
                                label="Password"
                                placeholder="Enter your password"
                            />

                            <div className="flex items-center justify-between gap-4 text-sm">
                                <label className="flex items-center gap-2 text-[#404944]">
                                    <input
                                        type="checkbox"
                                        className="rounded border-[#bfc9c3] text-[#003527] focus:ring-[#003527]"
                                    />
                                    Remember me
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="font-semibold text-[#003527] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Link
                                to="/buyer-dashboard"
                                className="flex w-full items-center justify-center rounded-lg bg-[#121212] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                Login Now
                            </Link>

                            <Link
                                to="/phone-verification"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#bfc9c3] bg-white px-4 py-3 text-sm font-semibold text-[#121c2a] transition hover:bg-[#eff4ff]"
                            >
                <span className="material-symbols-outlined text-[18px]">
                  smartphone
                </span>
                                Login with phone OTP
                            </Link>

                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#bfc9c3] bg-white px-4 py-3 text-sm font-semibold text-[#121c2a] transition hover:bg-[#eff4ff]"
                            >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                                Login with Google
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#707974]">
                            Need help?{" "}
                            <Link
                                to="/help-centre"
                                className="font-semibold text-[#003527] hover:underline"
                            >
                                Visit Help Centre
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}