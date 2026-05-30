import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";
import PasswordStrengthMeter from "../../components/auth/PasswordStrengthMeter";

export default function ResetPasswordPage() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updated, setUpdated] = useState(false);

    const passwordsDoNotMatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

    function handleSubmit(event) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity();
            return;
        }

        if (passwordsDoNotMatch) {
            return;
        }

        setUpdated(true);

        setTimeout(() => {
            navigate("/login");
        }, 1200);
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
                    aria-labelledby="reset-password-title"
                >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#eff4ff] text-[#003527]">
            <span className="material-symbols-outlined icon-fill text-[30px]">
              lock
            </span>
                    </div>

                    <h1
                        id="reset-password-title"
                        className="mb-3 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#121c2a]"
                    >
                        Reset password
                    </h1>

                    <p className="mb-6 text-base leading-7 text-[#404944]">
                        Create a new password for your Open Market account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-[18px]">
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="mb-2 block text-sm font-extrabold text-[#121c2a]"
                            >
                                New password
                            </label>

                            <div className="relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Create a new password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    className="w-full rounded-xl border border-[#bfc9c3]/70 bg-[#f8f9ff] px-4 py-[13px] pr-12 text-base text-[#121c2a] outline-none transition placeholder:text-[#707974] focus:border-[#003527] focus:bg-white focus:ring-2 focus:ring-[#003527]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword((current) => !current)}
                                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#404944] transition hover:text-[#003527]"
                                    aria-label={
                                        showNewPassword ? "Hide password" : "Show password"
                                    }
                                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showNewPassword ? "visibility" : "visibility_off"}
                  </span>
                                </button>
                            </div>

                            <PasswordStrengthMeter value={newPassword} />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-extrabold text-[#121c2a]"
                            >
                                Confirm password
                            </label>

                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Repeat your new password"
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className={`w-full rounded-xl border bg-[#f8f9ff] px-4 py-[13px] pr-12 text-base text-[#121c2a] outline-none transition placeholder:text-[#707974] focus:bg-white ${
                                        passwordsDoNotMatch
                                            ? "border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-2 focus:ring-[#ba1a1a]/10"
                                            : "border-[#bfc9c3]/70 focus:border-[#003527] focus:ring-2 focus:ring-[#003527]/10"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((current) => !current)
                                    }
                                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#404944] transition hover:text-[#003527]"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                  <span className="material-symbols-outlined text-[22px]">
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </span>
                                </button>
                            </div>

                            {passwordsDoNotMatch && (
                                <p className="mt-2 text-xs text-[#ba1a1a]">
                                    Passwords do not match.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={updated}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-extrabold text-white shadow-sm transition active:scale-[0.99] ${
                                updated
                                    ? "bg-[#064e3b]"
                                    : "bg-[#003527] hover:bg-[#064e3b]"
                            }`}
                        >
                            {updated ? (
                                <>
                  <span className="material-symbols-outlined text-[18px]">
                    check_circle
                  </span>
                                    Password updated
                                </>
                            ) : (
                                "Update password"
                            )}
                        </button>

                        <p className="text-sm leading-6 text-[#404944]">
                            After updating your password, sign in again with your new details.
                        </p>
                    </form>

                    <p className="mt-6 border-t border-[#bfc9c3]/45 pt-6 text-center text-sm text-[#404944]">
                        Reset link expired?
                        <Link
                            to="/forgot-password"
                            className="ml-1 font-extrabold text-[#003527] hover:underline"
                        >
                            Request a new one
                        </Link>
                    </p>
                </section>
            </main>
        </div>
    );
}