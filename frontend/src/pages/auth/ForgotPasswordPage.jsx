import { useState } from "react";
import { Link } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";
import FormInput from "../../components/common/FormInput";

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity();
            return;
        }

        setSent(true);

        setTimeout(() => {
            setSent(false);
        }, 3500);
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8f9ff] text-[#121c2a]">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,rgba(0,53,39,0.055)_1px,transparent_1px)] bg-[length:28px_28px]" />

            <div className="relative z-10">
                <MinimalAuthHeader />
            </div>

            <main className="relative z-10 flex flex-grow items-start justify-center px-4 py-8 md:items-center md:py-12">
                <section
                    className="w-full max-w-[430px] rounded-[24px] border border-[#bfc9c3]/45 bg-white p-6 shadow-[0_4px_32px_rgba(0,53,39,0.06)] md:p-8"
                    aria-labelledby="forgot-password-title"
                >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#eff4ff] text-[#003527]">
            <span className="material-symbols-outlined icon-fill text-[30px]">
              lock_reset
            </span>
                    </div>

                    <h1
                        id="forgot-password-title"
                        className="mb-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#121c2a]"
                    >
                        Forgot password?
                    </h1>

                    <p className="mb-6 text-base leading-7 text-[#404944]">
                        Enter your account email and we’ll send you a secure reset link.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <FormInput
                            id="email"
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />

                        <button
                            type="submit"
                            disabled={sent}
                            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.99] ${
                                sent
                                    ? "bg-[#064e3b]"
                                    : "bg-[#003527] hover:bg-[#064e3b]"
                            }`}
                        >
                            {sent ? (
                                <>
                  <span className="material-symbols-outlined text-[18px]">
                    check_circle
                  </span>
                                    Link sent
                                </>
                            ) : (
                                "Send reset link"
                            )}
                        </button>

                        <p className="mt-4 text-sm leading-6 text-[#404944]">
                            If an account exists for this email, we’ll send password reset
                            instructions. Reset links expire after a short time.
                        </p>
                    </form>

                    <p className="mt-6 border-t border-[#bfc9c3]/45 pt-6 text-center text-sm text-[#404944]">
                        Can’t access your email?
                        <Link
                            to="/contact"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Contact Support
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-sm text-[#404944]">
                        Remembered it?
                        <Link
                            to="/login"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Back to sign in
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}