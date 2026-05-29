import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MinimalAuthHeader from "../../components/layout/MinimalAuthHeader";
import FormInput from "../../components/common/FormInput";
import PasswordInput from "../../components/auth/PasswordInput";
import ConsentCheckbox from "../../components/auth/ConsentCheckbox";

const storeCategories = [
    "Fashion and clothing",
    "Sneakers",
    "Perfumes and beauty",
    "Electronics",
    "Home goods",
    "Handmade items",
    "Mixed products",
];

const sellerTypes = [
    {
        value: "individual",
        icon: "person",
        label: "Individual",
    },
    {
        value: "small_business",
        icon: "store",
        label: "Small business",
    },
    {
        value: "brand",
        icon: "verified",
        label: "Brand / supplier",
    },
];

export default function RegisterSellerPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [sellerType, setSellerType] = useState("individual");

    function handleContinue(event) {
        event.preventDefault();

        const form = event.currentTarget.closest("form");
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleBack() {
        setStep(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity();
            return;
        }

        navigate("/email-verification");
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f8f9ff] text-[#121c2a]">
            <MinimalAuthHeader />

            <main className="mx-auto grid w-full max-w-[1280px] flex-grow grid-cols-1 items-start gap-8 px-4 py-8 md:px-10 md:py-16 lg:grid-cols-12">
                {/* Left column */}
                <aside className="space-y-8 lg:sticky lg:top-[116px] lg:col-span-5">
                    <div>
                        <h1 className="mb-3 text-[32px] font-extrabold leading-[38px] text-[#121c2a] md:text-5xl md:leading-[56px]">
                            Start selling on Open Market
                        </h1>

                        <p className="text-lg leading-8 text-[#404944]">
                            Create your seller account, set up your store, and reach local
                            buyers across South Africa.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <Benefit
                            icon="storefront"
                            title="Create your seller profile"
                            text="Set up your store name, location, and seller details."
                        />

                        <Benefit
                            icon="inventory_2"
                            title="List products for local buyers"
                            text="Add product photos, prices, descriptions, and stock."
                        />

                        <Benefit
                            icon="payments"
                            title="Get paid after delivery confirmation"
                            text="Eligible payouts are processed after the buyer confirms delivery."
                        />
                    </div>

                    <div className="hidden items-start gap-3 md:flex">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003527]/10">
              <span className="material-symbols-outlined text-[22px] text-[#003527]">
                verified_user
              </span>
                        </div>

                        <div>
                            <p className="font-semibold text-[#121c2a]">
                                Listings are reviewed for buyer safety
                            </p>
                            <p className="mt-1 max-w-sm text-sm leading-6 text-[#404944]">
                                Open Market reviews listings before they go live — so buyers
                                trust your store from day one.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Right column */}
                <section className="lg:col-span-7">
                    <div className="rounded-2xl border border-[#bfc9c3]/30 bg-white p-6 shadow-[0_4px_32px_rgba(0,53,39,0.06)] md:p-10">
                        {/* Step header */}
                        <div className="mb-8">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#bfc9c3]/40">
                                    <div
                                        className="h-full rounded-full bg-[#003527] transition-all duration-300"
                                        style={{ width: step === 1 ? "0%" : "100%" }}
                                    />
                                </div>

                                <span className="whitespace-nowrap text-xs font-medium text-[#404944]">
                  Step {step} of 2
                </span>
                            </div>

                            {step === 1 ? (
                                <div>
                                    <h2 className="mb-1 text-3xl font-bold text-[#121c2a]">
                                        Create your account
                                    </h2>
                                    <p className="text-[#404944]">
                                        Your personal login details for Open Market.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="mb-1 text-3xl font-bold text-[#121c2a]">
                                        Set up your store
                                    </h2>
                                    <p className="text-[#404944]">Tell us about your store.</p>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {step === 1 ? (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <FormInput
                                            id="ownerName"
                                            label="Owner full name"
                                            placeholder="e.g. John Doe"
                                            autoComplete="name"
                                        />

                                        <FormInput
                                            id="email"
                                            label="Email address"
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                        />
                                    </div>

                                    <FormInput
                                        id="phone"
                                        label="Phone number"
                                        type="tel"
                                        placeholder="082 123 4567"
                                        autoComplete="tel"
                                        helperText="For account security and order updates."
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
                                            label="Confirm password"
                                            placeholder="Repeat your password"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleContinue}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#003527] px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99]"
                                    >
                                        Continue to Store Setup
                                        <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-5 rounded-2xl border border-[#bfc9c3]/50 bg-[#f8f9ff] p-5">
                                        <FormInput
                                            id="storeName"
                                            label="Store name"
                                            placeholder="e.g. John's Local Store"
                                        />

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <SelectInput id="storeCategory" label="Store category">
                                                <option value="">Select category</option>
                                                {storeCategories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </SelectInput>

                                            <FormInput
                                                id="city"
                                                label="Store location / city"
                                                placeholder="Johannesburg"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-3 flex items-center gap-1">
                                            <h3 className="text-sm font-bold text-[#121c2a]">
                                                Seller type
                                            </h3>

                                            <Tooltip text="Choose the option that best describes you. You can update this from your seller dashboard later." />
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            {sellerTypes.map((type) => (
                                                <SellerTypeCard
                                                    key={type.value}
                                                    type={type}
                                                    checked={sellerType === type.value}
                                                    onChange={() => setSellerType(type.value)}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-[#bfc9c3]/50 pt-4">
                                        <ConsentCheckbox required>
                                            I agree to the{" "}
                                            <Link
                                                to="/terms"
                                                className="font-semibold text-[#003527] hover:underline"
                                            >
                                                Terms of Service
                                            </Link>
                                            ,{" "}
                                            <Link
                                                to="/privacy"
                                                className="font-semibold text-[#003527] hover:underline"
                                            >
                                                Privacy Policy
                                            </Link>
                                            , and{" "}
                                            <Link
                                                to="/seller-policy"
                                                className="font-semibold text-[#003527] hover:underline"
                                            >
                                                Seller Guidelines
                                            </Link>
                                            .
                                        </ConsentCheckbox>
                                    </div>

                                    <ConsentCheckbox>
                                        Send me seller tips, order updates, and marketplace
                                        announcements.
                                    </ConsentCheckbox>

                                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-4 text-sm font-semibold text-[#121c2a] transition hover:bg-[#eff4ff] active:scale-[0.99]"
                                        >
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                      </span>
                                            Back
                                        </button>

                                        <button
                                            type="submit"
                                            className="flex-1 rounded-xl bg-[#003527] px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99]"
                                        >
                                            Create Seller Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        <p className="mt-6 border-t border-[#bfc9c3]/50 pt-6 text-center text-[#404944]">
                            Want to shop instead?
                            <Link
                                to="/register-buyer"
                                className="ml-1 font-semibold text-[#003527] hover:underline"
                            >
                                Register as a Buyer
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

function SelectInput({ id, label, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#121c2a]">
                {label}
            </label>

            <select
                id={id}
                name={id}
                required
                className="w-full rounded-xl border border-[#bfc9c3] bg-white px-4 py-3 text-[#121c2a] outline-none transition focus:border-[#003527] focus:ring-2 focus:ring-[#003527]/10"
            >
                {children}
            </select>
        </div>
    );
}

function SellerTypeCard({ type, checked, onChange }) {
    return (
        <label className="cursor-pointer">
            <input
                type="radio"
                name="sellerType"
                value={type.value}
                checked={checked}
                onChange={onChange}
                required
                className="sr-only"
            />

            <div
                className={`flex h-full flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                    checked
                        ? "border-[#003527] bg-[#003527]/5 shadow-[0_0_0_3px_rgba(0,53,39,0.08)]"
                        : "border-[#bfc9c3] bg-white hover:border-[#003527]"
                }`}
            >
        <span className="material-symbols-outlined text-[24px] text-[#003527]">
          {type.icon}
        </span>

                <span className="text-sm font-semibold leading-tight text-[#121c2a]">
          {type.label}
        </span>
            </div>
        </label>
    );
}

function Tooltip({ text }) {
    return (
        <span className="group relative inline-flex">
      <span
          tabIndex={0}
          className="material-symbols-outlined cursor-help text-[17px] text-[#707974] transition hover:text-[#003527]"
      >
        help
      </span>

      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 hidden w-56 -translate-x-1/2 rounded-lg bg-[#121c2a] px-3 py-2 text-xs leading-5 text-[#f8f9ff] group-hover:block group-focus-within:block">
        {text}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#121c2a]" />
      </span>
    </span>
    );
}