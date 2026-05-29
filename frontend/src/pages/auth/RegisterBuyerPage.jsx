import { Link, useNavigate } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialButton from "../../components/auth/SocialButton";
import ConsentCheckbox from "../../components/auth/ConsentCheckbox";

export default function RegisterBuyerPage() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/email-verification");
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9ff] text-[#121c2a]">
            <MinimalAuthHeader />

            <main className="mx-auto grid w-full max-w-[1280px] flex-grow grid-cols-1 items-start gap-8 px-4 py-8 md:px-10 md:py-16 lg:grid-cols-12">
                {/* Left Column */}
                <aside className="space-y-8 lg:sticky lg:top-[116px] lg:col-span-5">
                    <div>
                        <h1 className="mb-3 text-[32px] font-extrabold leading-[38px] text-[#121c2a] md:text-5xl md:leading-[56px]">
                            Shop South Africa&apos;s best sellers
                        </h1>

                        <p className="text-lg leading-8 text-[#404944]">
                            Create a free buyer account and start shopping securely from local
                            sellers across the country.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <Benefit
                            icon="storefront"
                            title="Shop from local South African sellers"
                            text="Thousands of products from verified merchants."
                        />

                        <Benefit
                            icon="favorite"
                            title="Save items and track orders"
                            text="Your wishlist and delivery status in one place."
                        />

                        <Benefit
                            icon="verified_user"
                            title="Buyer protection on every order"
                            text="Payment held until you confirm delivery."
                        />
                    </div>

                    <div className="hidden items-start gap-3 md:flex">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003527]/10">
              <span className="material-symbols-outlined text-[22px] text-[#003527]">
                shield_locked
              </span>
                        </div>

                        <div>
                            <p className="font-semibold text-[#121c2a]">
                                Buyer protection included
                            </p>
                            <p className="mt-1 max-w-sm text-sm leading-6 text-[#404944]">
                                Payments are protected until delivery is confirmed, helping
                                buyers shop with confidence.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Right Column */}
                <section className="lg:col-span-7">
                    <div className="rounded-2xl border border-[#bfc9c3]/30 bg-white p-6 shadow-[0_4px_32px_rgba(0,53,39,0.06)] md:p-10">
                        <div className="mb-8">
                            <h2 className="mb-1 text-3xl font-bold text-[#121c2a]">
                                Create your account
                            </h2>

                            <p className="text-[#404944]">Free to join. No hidden fees.</p>
                        </div>

                        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <SocialButton icon="google" label="Continue with Google" dark />

                            <SocialButton
                                icon="smartphone"
                                label="Use phone number"
                                to="/phone-verification"
                            />
                        </div>

                        <div className="relative mb-6 flex items-center">
                            <div className="flex-grow border-t border-[#bfc9c3]" />
                            <span className="mx-4 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-[#404944]">
                or register with email
              </span>
                            <div className="flex-grow border-t border-[#bfc9c3]" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <FormInput
                                    id="fullName"
                                    label="Full Name"
                                    placeholder="e.g. John Doe"
                                    autoComplete="name"
                                />

                                <FormInput
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                            </div>

                            <FormInput
                                id="phone"
                                label="Phone Number"
                                type="tel"
                                placeholder="082 123 4567"
                                autoComplete="tel"
                                helperText="Used for order notifications and account security."
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <PasswordInput
                                    id="password"
                                    label="Password"
                                    placeholder="Create a password"
                                    showStrength
                                />

                                <PasswordInput
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    placeholder="Repeat your password"
                                />
                            </div>

                            <div className="space-y-3 border-t border-[#bfc9c3]/50 pt-4">
                                <ConsentCheckbox required>
                                    I agree to the{" "}
                                    <Link
                                        to="/terms"
                                        className="font-semibold text-[#003527] hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/privacy"
                                        className="font-semibold text-[#003527] hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </ConsentCheckbox>

                                <ConsentCheckbox>
                                    Send me order, delivery, and marketplace updates.
                                </ConsentCheckbox>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-[#003527] px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99]"
                                >
                                    Create Buyer Account
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 border-t border-[#bfc9c3]/50 pt-6 text-center text-[#404944]">
                            Want to sell on Open Market?
                            <Link
                                to="/register-seller"
                                className="ml-1 font-semibold text-[#003527] hover:underline"
                            >
                                Register as a Seller
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

function Benefit({ icon, title, text }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9e3f6]">
        <span className="material-symbols-outlined text-[20px] text-[#003527]">
          {icon}
        </span>
            </div>

            <div>
                <p className="font-semibold text-[#121c2a]">{title}</p>
                <p className="mt-0.5 text-sm text-[#404944]">{text}</p>
            </div>
        </div>
    );
}