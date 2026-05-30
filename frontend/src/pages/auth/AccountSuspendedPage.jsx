import { Link } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";

export default function AccountSuspendedPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8f9ff] text-[#121c2a]">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,rgba(0,53,39,0.055)_1px,transparent_1px)] bg-[length:28px_28px]" />

            <div className="relative z-10">
                <MinimalAuthHeader />
            </div>

            <main className="relative z-10 flex flex-grow items-start justify-center px-4 py-8 md:items-center md:py-12">
                <section
                    className="w-full max-w-[460px] rounded-[24px] border border-[#bfc9c3]/45 bg-white p-6 shadow-[0_4px_32px_rgba(0,53,39,0.06)] md:p-8"
                    aria-labelledby="page-title"
                >
                    <div
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5"
                        role="status"
                        aria-label="Account status: under review"
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                        <span className="text-xs font-bold text-amber-700">
              Account under review
            </span>
                    </div>

                    <h1
                        id="page-title"
                        className="mb-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#121c2a]"
                    >
                        Your account is temporarily restricted
                    </h1>

                    <p className="mb-6 text-base leading-7 text-[#404944]">
                        We&apos;ve paused access while our team completes a routine review.
                        Check your email for any steps needed from you — most reviews
                        resolve within 24–48 hours.
                    </p>

                    <div
                        className="mb-6 rounded-2xl bg-[#f8f9ff] p-5"
                        aria-label="Next steps"
                    >
                        <h2 className="mb-3 font-extrabold text-[#121c2a]">
                            What to do next
                        </h2>

                        <ul className="space-y-3 text-sm leading-6 text-[#404944]">
                            <NextStep
                                icon="mail"
                                text="Check your inbox for a notice from Open Market with any required next steps."
                            />
                            <NextStep
                                icon="support_agent"
                                text="If you haven’t heard from us, our support team can look into your account directly."
                            />
                        </ul>
                    </div>

                    <Link
                        to="/contact"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#003527] px-4 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#064e3b] active:scale-[0.99]"
                    >
                        Contact Support
                        <span className="material-symbols-outlined text-[18px]">
              support_agent
            </span>
                    </Link>

                    <Link
                        to="/login"
                        className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#bfc9c3]/70 bg-white px-4 py-3 text-sm font-extrabold text-[#003527] transition hover:bg-[#eff4ff]"
                    >
                        Back to Sign In
                    </Link>

                    <p className="mt-6 border-t border-[#bfc9c3]/45 pt-6 text-center text-sm leading-6 text-[#404944]">
                        Questions about your account?
                        <a
                            href="mailto:support@openmarket.co.za"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            support@openmarket.co.za
                        </a>
                    </p>
                </section>
            </main>
        </div>
    );
}

function NextStep({ icon, text }) {
    return (
        <li className="flex gap-3">
      <span className="material-symbols-outlined icon-fill mt-0.5 text-[18px] text-[#003527]">
        {icon}
      </span>
            <span>{text}</span>
        </li>
    );
}