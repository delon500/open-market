import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";

const OTP_LENGTH = 6;

export default function PhoneVerificationPage() {
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [verified, setVerified] = useState(false);
    const [sent, setSent] = useState(false);
    const [remaining, setRemaining] = useState(0);

    const otpValue = otp.join("");
    const isComplete = otpValue.length === OTP_LENGTH;

    function handleChange(index, value) {
        const digit = value.replace(/\D/g, "").slice(-1);

        const nextOtp = [...otp];
        nextOtp[index] = digit;
        setOtp(nextOtp);

        if (digit && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, event) {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handlePaste(event) {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const nextOtp = Array(OTP_LENGTH).fill("");

        pasted.split("").forEach((digit, index) => {
            nextOtp[index] = digit;
        });

        setOtp(nextOtp);

        const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
        inputRefs.current[focusIndex]?.focus();
    }

    function handleVerify(event) {
        event.preventDefault();

        if (!isComplete) {
            const firstEmptyIndex = otp.findIndex((digit) => !digit);
            inputRefs.current[firstEmptyIndex]?.focus();
            return;
        }

        setVerified(true);

        setTimeout(() => {
            navigate("/buyer-dashboard");
        }, 1000);
    }

    function handleResend() {
        setSent(true);
        setRemaining(30);
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
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
                    aria-labelledby="phone-verification-title"
                >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#eff4ff] text-[#003527]">
            <span className="material-symbols-outlined icon-fill text-[30px]">
              smartphone
            </span>
                    </div>

                    <h1
                        id="phone-verification-title"
                        className="mb-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#121c2a]"
                    >
                        Verify your phone
                    </h1>

                    <p className="mb-5 text-base leading-7 text-[#404944]">
                        Enter the 6-digit code we sent to your phone number.
                    </p>

                    <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#eff4ff] px-4 py-3">
                        <p className="text-sm font-extrabold text-[#003527]">
                            082 123 4567
                        </p>

                        <Link
                            to="/register"
                            aria-label="Change phone number"
                            className="inline-flex items-center gap-1 text-sm font-bold text-[#003527] opacity-70 transition hover:opacity-100"
                        >
              <span className="material-symbols-outlined text-[16px]">
                edit
              </span>
                            Change
                        </Link>
                    </div>

                    <form onSubmit={handleVerify}>
                        <div
                            className="mb-5 grid grid-cols-6 gap-2"
                            aria-label="One-time password input"
                        >
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(element) => {
                                        inputRefs.current[index] = element;
                                    }}
                                    value={digit}
                                    onChange={(event) => handleChange(index, event.target.value)}
                                    onKeyDown={(event) => handleKeyDown(index, event)}
                                    onPaste={handlePaste}
                                    inputMode="numeric"
                                    maxLength={1}
                                    aria-label={`OTP digit ${index + 1}`}
                                    className="h-12 w-full rounded-xl border border-[#bfc9c3]/70 bg-[#f8f9ff] text-center text-xl font-extrabold text-[#121c2a] outline-none transition focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#003527]/10 max-[480px]:h-11 max-[480px]:rounded-[10px] max-[480px]:text-lg"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={verified}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.99] ${
                                verified
                                    ? "bg-[#064e3b]"
                                    : "bg-[#003527] hover:bg-[#064e3b]"
                            }`}
                        >
                            {verified ? (
                                <>
                  <span className="material-symbols-outlined icon-fill text-[18px]">
                    check_circle
                  </span>
                                    Phone verified
                                </>
                            ) : (
                                "Verify phone number"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 rounded-2xl bg-[#f8f9ff] p-5">
                        <h2 className="mb-2 text-base font-extrabold text-[#121c2a]">
                            Didn&apos;t receive the code?
                        </h2>

                        <p className="mb-4 text-sm leading-6 text-[#404944]">
                            Wait a few seconds, check that your number is correct, then
                            request a new code.
                        </p>

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={sent}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition active:scale-[0.99] ${
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
                                    Code sent
                                </>
                            ) : (
                                <>
                  <span className="material-symbols-outlined text-[18px]">
                    refresh
                  </span>
                                    Resend OTP
                                </>
                            )}
                        </button>

                        <p className="mt-3 min-h-[18px] text-center text-xs text-[#707974]">
                            {remaining > 0 ? `Resend available in ${remaining}s` : ""}
                        </p>
                    </div>

                    <p className="mt-6 border-t border-[#bfc9c3]/45 pt-6 text-center text-sm text-[#404944]">
                        Need help?
                        <Link
                            to="/contact"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Contact support
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}