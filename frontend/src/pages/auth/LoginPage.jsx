import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back to Open Market"
            subtitle="Sign in to access your buyer or seller account securely."
        >
            <div className="mx-auto max-w-lg rounded-2xl border border-[#bfc9c3] bg-white p-8 shadow-sm">
                <h2 className="mb-2 text-3xl font-bold text-[#121c2a]">Sign in</h2>
                <p className="mb-8 text-[#404944]">Access your buyer or seller account.</p>

                <form className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Email address</label>
                        <input
                            type="email"
                            placeholder="delon@example.com"
                            className="w-full rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 outline-none focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 pr-12 outline-none focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                            />
                            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404944]">
                                <span className="material-symbols-outlined">visibility_off</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                        <label className="flex items-center gap-2 text-[#404944]">
                            <input type="checkbox" className="rounded border-[#bfc9c3] text-[#003527]" />
                            Remember me
                        </label>

                        <Link to="/forgot-password" className="font-semibold text-[#003527] hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Link
                        to="/buyer-dashboard"
                        className="flex w-full items-center justify-center rounded-xl bg-[#003527] px-4 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Sign In
                    </Link>
                </form>

                <div className="mt-8 border-t border-[#bfc9c3] pt-6 text-center text-sm text-[#404944]">
                    New to Open Market?{" "}
                    <Link to="/account-type" className="font-semibold text-[#003527] hover:underline">
                        Create account
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}