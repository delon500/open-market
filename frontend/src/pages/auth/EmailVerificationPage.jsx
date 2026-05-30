import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";

export default function EmailVerificationPage() {
    const [sent, setSent] = useState(false);
    const [remaining, setRemaining] = useState(0);

    function handleResend() {
        setSent(true);
        setRemaining(30);
    }

    useEffect(() => {
        if (remaining <= 0) {
            setSent(false);
            return;
        }

        const timer = setTimeout(() => {
            setRemaining((current) => current - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [remaining]);

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8f9ff] text-[#121c2a]">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,rgba(0,53,39,0.055)_1px,transparent_1px)] bg-[length:28px_28px]" />

            <div className="relative z-10">
                <MinimalAuthHeader />
            </div>

            <main className="relative z-10 flex flex-grow items-start justify-center px-4 py-8 md:items-center md:py-12">
                <section
                    className="w-full max-w-[430px] rounded-[24px] border border-[#bfc9c3]/45 bg-white p-6 shadow-[0_4px_32px_rgba(0,53,39,0.06)] md:p-8"
                    aria-labelledby="email-verification-title"
                >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#eff4ff] text-[#003527]">
            <span className="material-symbols-outlined icon-fill text-[30px]">
              mark_email_read
            </span>
                    </div>

                    <h1
                        id="email-verification-title"
                        className="mb-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#121c2a]"
                    >
                        Check your email
                    </h1>

                    <p className="mb-5 text-base leading-7 text-[#404944]">
                        We sent a verification link to your inbox. Click it to confirm your
                        Open Market account.
                    </p>

                    <div className="mb-4 rounded-2xl bg-[#eff4ff] px-4 py-3 text-center">
                        <p className="break-words text-sm font-extrabold text-[#003527]">
                            john@example.com
                        </p>
                    </div>

                    <p className="mb-6 text-center text-sm leading-6 text-[#404944]">
                        Can’t find it? Check your spam or promotions folder.
                    </p>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={sent}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-extrabold transition active:scale-[0.99] ${
                            sent
                                ? "border-[#bfc9c3]/70 bg-[#eff4ff] text-[#2b6954]"
                                : "border-[#bfc9c3]/70 bg-white text-[#003527] hover:bg-[#eff4ff]"
                        }`}
                    >
                        {sent ? (
                            <>
                <span className="material-symbols-outlined icon-fill text-[18px]">
                  check_circle
                </span>
                                Email sent
                            </>
                        ) : (
                            <>
                <span className="material-symbols-outlined text-[18px]">
                  refresh
                </span>
                                Resend verification email
                            </>
                        )}
                    </button>

                    <p className="mt-3 min-h-[18px] text-center text-xs text-[#707974]">
                        {remaining > 0 ? `Resend available in ${remaining}s` : ""}
                    </p>

                    <p className="mt-6 border-t border-[#bfc9c3]/45 pt-6 text-center text-sm text-[#404944]">
                        Wrong email address?
                        <Link
                            to="/register"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Change email
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-sm text-[#404944]">
                        Need help?
                        <Link
                            to="/contact"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Contact Support
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}