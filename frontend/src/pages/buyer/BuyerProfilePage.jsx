import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

const initialProfile = {
    firstName: "Delon",
    lastName: "Wenyeve",
    email: "delon@example.com",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
};

const activityItems = [
    { icon: "shopping_bag", label: "Orders placed", value: "12" },
    { icon: "calendar_month", label: "Member since", value: "Jan 2025" },
    { icon: "rate_review", label: "Reviews given", value: "8" },
];

const passwordStrengthConfig = [
    { color: "#d83b2d", label: "Weak" },
    { color: "#d6a52c", label: "Fair" },
    { color: "#4f9e6e", label: "Good" },
    { color: "#087052", label: "Strong" },
];

export default function BuyerProfilePage() {
    // Keep a saved snapshot separate from the editable draft so changes can be detected or discarded.
    const [profile, setProfile] = useState(initialProfile);
    const [savedProfile, setSavedProfile] = useState(initialProfile);
    const [saved, setSaved] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);
    const [deactivationOpen, setDeactivationOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

    const dirty = useMemo(
        () => Object.keys(profile).some((key) => profile[key] !== savedProfile[key]),
        [profile, savedProfile]
    );

    const completion = profile.phone.trim() ? 75 : 50;
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();
    const initials = `${profile.firstName[0] || ""}${profile.lastName[0] || ""}`.toUpperCase();
    const passwordStrength = getPasswordStrength(passwords.next);
    const passwordsMatch = passwords.confirm.length > 0 && passwords.confirm === passwords.next;
    const canUpdatePassword =
        passwords.current.length > 0 && passwords.next.length >= 8 && passwordsMatch;

    // Give users time to read the confirmation without leaving a permanent status banner on the page.
    useEffect(() => {
        if (!saved) return undefined;
        const timer = window.setTimeout(() => setSaved(false), 5000);
        return () => window.clearTimeout(timer);
    }, [saved]);

    // Protect in-progress edits when the browser tab is refreshed or closed.
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (!dirty) return;
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [dirty]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProfile((current) => ({ ...current, [name]: value }));
        setSaved(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSavedProfile(profile);
        setSaved(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function discardChanges() {
        setProfile(savedProfile);
        setSaved(false);
    }

    function handleAvatarChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        // The preview stays local until a backend upload endpoint is connected.
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(String(reader.result));
        reader.readAsDataURL(file);
    }

    function handlePasswordChange(event) {
        const { name, value } = event.target;
        setPasswords((current) => ({ ...current, [name]: value }));
    }

    return (
        <div className="buyer-profile-page space-y-8">
            <style>{`
                .buyer-input {
                    width: 100%; border-radius: 16px; border: 1px solid #dbe6e1;
                    background: #f8fbf9; padding: 14px 16px; color: #121c2a;
                    font-size: 14px; font-weight: 700; outline: none;
                    transition: border-color .18s, background .18s, box-shadow .18s;
                }
                .buyer-input:focus { border-color: #003527; background: white; box-shadow: 0 0 0 3px rgba(0,53,39,.1); }
                .buyer-input::placeholder { color: #9aada7; font-weight: 500; }
                select.buyer-input {
                    cursor: pointer; appearance: none; padding-right: 42px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%2366736d' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
                    background-repeat: no-repeat; background-position: right 14px center;
                }
                .dob-segment {
                    width: 100%; border-radius: 16px; border: 1px solid #dbe6e1;
                    background: #f8fbf9; padding: 14px 8px; color: #121c2a;
                    font-size: 14px; font-weight: 700; text-align: center; outline: none;
                    appearance: textfield; transition: border-color .18s, background .18s, box-shadow .18s;
                }
                .dob-segment::-webkit-inner-spin-button { appearance: none; }
                .dob-segment:focus { border-color: #003527; background: white; box-shadow: 0 0 0 3px rgba(0,53,39,.1); }
                .avatar-overlay { opacity: 0; transition: opacity .18s; }
                .avatar-wrapper:hover .avatar-overlay, .avatar-wrapper:focus-within .avatar-overlay { opacity: 1; }
                @keyframes buyer-profile-pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
                .unsaved-dot { animation: buyer-profile-pulse 1.5s infinite; }
            `}</style>

            <BuyerPageHeader
                eyebrow="Account profile"
                title="Manage your personal details"
                description="Keep your buyer profile accurate so checkout, delivery updates, support, and account recovery work smoothly."
            />

            {saved && (
                <div className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5" role="status">
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#003527]">check_circle</span>
                    <div className="min-w-0 flex-1">
                        <h2 className="mb-1 font-black text-[#003527]">Profile updated</h2>
                        <p className="text-sm leading-7 text-[#003527]">Your changes have been saved. Updated details will now be used for checkout, delivery, and account recovery.</p>
                    </div>
                    <button type="button" onClick={() => setSaved(false)} aria-label="Dismiss" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#003527] hover:bg-[#003527]/10">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            )}

            {dirty && (
                <div className="flex items-center gap-3 rounded-[24px] border border-[#f0dca0] bg-[#fffdf4] p-4">
                    <span className="unsaved-dot h-2 w-2 shrink-0 rounded-full bg-[#d6a52c]" />
                    <p className="flex-1 text-sm font-bold text-[#8a5a00]">You have unsaved changes</p>
                    <button type="button" onClick={() => document.querySelector("#profile-actions")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="text-xs font-black text-[#003527] hover:underline">Go to save</button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7 xl:col-span-8">
                    <SectionIntro eyebrow="Personal information" title="Basic details" text="These details help Open Market identify your account and support your orders." />

                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormField label="First name" id="firstName"><input id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} type="text" required autoComplete="given-name" className="buyer-input" /></FormField>
                            <FormField label="Last name" id="lastName"><input id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} type="text" required autoComplete="family-name" className="buyer-input" /></FormField>
                        </div>

                        <FormDivider label="Contact details" />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <FormField label="Email address" id="email">
                                <div className="relative">
                                    <input id="email" name="email" value={profile.email} onChange={handleChange} type="email" required autoComplete="email" className="buyer-input pr-28" />
                                    <span className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-[#f0faf6] px-2.5 py-1 text-[11px] font-black text-[#087052]"><span className="material-symbols-outlined icon-fill text-[14px]">verified</span>Verified</span>
                                </div>
                            </FormField>
                            <div id="phone-field" className="scroll-mt-28">
                                <FormField label="Phone number" id="phone">
                                    <div className="relative">
                                        <input id="phone" name="phone" value={profile.phone} onChange={handleChange} type="tel" placeholder="+27 00 000 0000" autoComplete="tel" className="buyer-input pr-24" />
                                        {/* Frontend-only placeholder until phone verification is connected. */}
                                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-[#003527] hover:underline">Verify</button>
                                    </div>
                                </FormField>
                            </div>
                        </div>

                        <FormDivider label="Optional" />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-black text-[#121c2a]">Date of birth <span className="font-semibold text-[#66736d]">optional</span></label>
                                <div className="grid grid-cols-3 gap-2">
                                    <DobInput
                                        id="dobDay"
                                        name="dobDay"
                                        value={profile.dobDay}
                                        onChange={handleChange}
                                        placeholder="DD"
                                        maxLength={2}
                                        nextId="dobMonth"
                                    />
                                    <DobInput
                                        id="dobMonth"
                                        name="dobMonth"
                                        value={profile.dobMonth}
                                        onChange={handleChange}
                                        placeholder="MM"
                                        maxLength={2}
                                        nextId="dobYear"
                                    />
                                    <DobInput
                                        id="dobYear"
                                        name="dobYear"
                                        value={profile.dobYear}
                                        onChange={handleChange}
                                        placeholder="YYYY"
                                        maxLength={4}
                                    />
                                </div>
                                <p className="mt-1.5 text-[11px] font-semibold text-[#9aada7]">Day / Month / Year</p>
                            </div>
                            <FormField label="Gender" id="gender" optional>
                                <select id="gender" name="gender" value={profile.gender} onChange={handleChange} className="buyer-input"><option value="">Prefer not to say</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select>
                            </FormField>
                        </div>

                        <div id="profile-actions" className="flex scroll-mt-24 flex-col gap-3 border-t border-[#e5ece8] pt-6 sm:flex-row">
                            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]">Save changes<span className="material-symbols-outlined text-[18px]">check</span></button>
                            {dirty && <button type="button" onClick={discardChanges} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#4d5953] transition hover:bg-[#f0faf6]">Discard changes</button>}
                        </div>
                    </form>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <div className="flex items-start justify-between gap-4">
                            <label className="avatar-wrapper relative inline-block cursor-pointer" title="Upload profile photo">
                                <Avatar preview={avatarPreview} initials={initials} className="h-16 w-16 rounded-[20px] text-xl" />
                                <span className="avatar-overlay absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[20px] bg-[#003527]/60"><span className="material-symbols-outlined text-[20px] text-white">photo_camera</span><span className="text-[9px] font-black uppercase tracking-wide text-white/80">Upload</span></span>
                                <input type="file" accept="image/*" onChange={handleAvatarChange} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Upload profile photo" />
                            </label>
                            <span className="rounded-full bg-[#fff8e5] px-3 py-1.5 text-xs font-black text-[#8a5a00]">{completion}% complete</span>
                        </div>
                        <h2 className="mt-5 text-xl font-black text-[#121c2a]">{fullName || "Buyer"}</h2>
                        <p className="mt-1 break-all text-sm font-semibold text-[#66736d]">{profile.email}</p>
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e5ece8]"><div className="h-full rounded-full bg-[#003527] transition-all duration-500" style={{ width: `${completion}%` }} /></div>
                        <div className="mt-5 space-y-2">
                            <ProfileCheck label="Email address verified" complete />
                            <ProfileCheck label="Basic profile completed" complete />
                            <a href="#phone-field" className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-[#f8fbf9]"><CheckIcon complete={Boolean(profile.phone.trim())} /><span className="flex-1 text-sm font-bold text-[#66736d] group-hover:text-[#003527]">Phone number added</span><span className="material-symbols-outlined text-[16px] text-[#9aada7] opacity-0 transition group-hover:opacity-100">arrow_forward</span></a>
                            <Link to="/account/addresses" className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-[#f8fbf9]"><CheckIcon complete={false} /><span className="flex-1 text-sm font-bold text-[#66736d] group-hover:text-[#003527]">Default delivery address added</span><span className="material-symbols-outlined text-[16px] text-[#9aada7] opacity-0 transition group-hover:opacity-100">arrow_forward</span></Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#8b9791]">Account activity</p>
                        <div className="space-y-4">{activityItems.map((item) => <ActivityRow key={item.label} item={item} />)}</div>
                    </section>
                </aside>
            </div>

            <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7">
                <SectionIntro eyebrow="Security" title="Login and account protection" text="Manage the settings that help protect your buyer account." />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <SecurityCard tone="green" icon="lock" title="Password" text="Use a strong password that you do not reuse on other websites." status="Last changed recently" />
                    <SecurityCard tone="amber" icon="phone_iphone" title="Phone verification" text="Verify your phone number to improve account recovery and delivery updates." status="Not verified" actionHref="#phone-field" />
                    <SecurityCard tone="green" icon="notifications" title="Account alerts" text="Receive important updates about orders, disputes, payments, and account security." status="Enabled" />
                </div>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-[#dbe6e1] bg-[#f8fbf9]">
                    <button type="button" onClick={() => setPasswordSectionOpen((open) => !open)} aria-expanded={passwordSectionOpen} className="flex w-full items-center justify-between rounded-[24px] p-4 text-left transition hover:bg-[#f0faf6]">
                        <span className="flex items-center gap-3"><span className="material-symbols-outlined text-[20px] text-[#66736d]">lock_reset</span><span className="text-sm font-black text-[#003527]">Change password</span></span>
                        <span className={`material-symbols-outlined text-[20px] text-[#66736d] transition ${passwordSectionOpen ? "rotate-180" : ""}`}>expand_more</span>
                    </button>
                    {passwordSectionOpen && (
                        <div className="border-t border-[#e5ece8] px-5 pb-5 pt-4">
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                <FormField label="Current password" id="currentPassword"><input id="currentPassword" name="current" value={passwords.current} onChange={handlePasswordChange} type="password" placeholder="Enter your current password" autoComplete="current-password" className="buyer-input" /></FormField>
                                <div className="hidden lg:block" />
                                <div>
                                    <FormField label="New password" id="newPassword"><div className="relative"><input id="newPassword" name="next" value={passwords.next} onChange={handlePasswordChange} type={passwordVisible ? "text" : "password"} placeholder="Enter a new password" autoComplete="new-password" className="buyer-input pr-14" /><button type="button" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#66736d] hover:bg-[#edf5f1] hover:text-[#003527]"><span className="material-symbols-outlined text-[20px]">{passwordVisible ? "visibility_off" : "visibility"}</span></button></div></FormField>
                                    <PasswordStrength score={passwordStrength} hasValue={Boolean(passwords.next)} />
                                </div>
                                <div>
                                    <FormField label="Confirm new password" id="confirmPassword"><input id="confirmPassword" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} type="password" placeholder="Re-enter the new password" autoComplete="new-password" className="buyer-input" /></FormField>
                                    {passwords.confirm && <p className={`mt-2 text-xs font-bold ${passwordsMatch ? "text-[#087052]" : "text-[#d83b2d]"}`}>{passwordsMatch ? "Passwords match" : "Passwords do not match"}</p>}
                                </div>
                            </div>
                            {/* Password validation is ready for the future account-security API. */}
                            <button type="button" disabled={!canUpdatePassword} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-4 text-sm font-black text-white transition hover:bg-[#064e3b] disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto">Update password<span className="material-symbols-outlined text-[18px]">lock_reset</span></button>
                        </div>
                    )}
                </div>
            </section>

            <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7">
                <button type="button" onClick={() => setDeactivationOpen((open) => !open)} aria-expanded={deactivationOpen} className="flex w-full items-center justify-between rounded-2xl py-1 text-left transition hover:opacity-80">
                    <span className="flex items-center gap-3"><span className="material-symbols-outlined text-[20px] text-[#9f2d20]">warning</span><span className="text-sm font-black text-[#9f2d20]">Deactivate account</span></span>
                    <span className={`material-symbols-outlined text-[20px] text-[#9f2d20] transition ${deactivationOpen ? "rotate-180" : ""}`}>expand_more</span>
                </button>
                {deactivationOpen && <div className="mt-5 rounded-[20px] border border-[#efc5bd] bg-[#fff8f6] p-5"><p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#9f2d20]">Danger zone</p><h3 className="mb-2 font-black text-[#121c2a]">Deactivate buyer account</h3><p className="mb-4 max-w-2xl text-sm leading-7 text-[#66736d]">You can only deactivate your account once all open orders, disputes, refunds, and payment issues have been resolved.</p>{/* Frontend-only placeholder until account deactivation is available. */}<button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#efc5bd] bg-white px-5 py-3.5 text-sm font-black text-[#9f2d20] transition hover:bg-[#fff0ec]">Request deactivation</button></div>}
            </section>
        </div>
    );
}

function SectionIntro({ eyebrow, title, text }) {
    return <div className="mb-7"><p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">{eyebrow}</p><h2 className="text-2xl font-black tracking-[-0.035em] text-[#121c2a]">{title}</h2><p className="mt-2 text-sm leading-7 text-[#66736d]">{text}</p></div>;
}

function FormDivider({ label }) {
    return <div><div className="border-t border-[#e5ece8]" /><p className="mt-4 text-[11px] font-black uppercase tracking-[0.16em] text-[#8b9791]">{label}</p></div>;
}

function FormField({ label, id, optional = false, children }) {
    return <div><label htmlFor={id} className="mb-2 block text-sm font-black text-[#121c2a]">{label}{optional && <span className="ml-1 font-semibold text-[#66736d]">optional</span>}</label>{children}</div>;
}

function DobInput({ id, name, value, onChange, placeholder, maxLength, nextId }) {
    function handleInput(event) {
        // Accept digits only and advance once this date segment is complete.
        const cleaned = event.target.value.replace(/\D/g, "").slice(0, maxLength);
        onChange({ target: { name, value: cleaned } });
        if (nextId && cleaned.length === maxLength) document.querySelector(`#${nextId}`)?.focus();
    }
    return <input id={id || name} name={name} value={value} onChange={handleInput} type="text" inputMode="numeric" placeholder={placeholder} className="dob-segment" />;
}

function Avatar({ preview, initials, className }) {
    return <span className={`flex items-center justify-center overflow-hidden bg-[#003527] font-black text-white ${className}`}>{preview ? <img src={preview} alt="Profile" className="h-full w-full object-cover" /> : initials || "DW"}</span>;
}

function CheckIcon({ complete }) {
    return <span className={`material-symbols-outlined icon-fill text-[19px] ${complete ? "text-[#087052]" : "text-[#9aada7]"}`}>{complete ? "check_circle" : "radio_button_unchecked"}</span>;
}

function ProfileCheck({ label, complete }) {
    return <div className="flex items-center gap-3 rounded-2xl p-2"><CheckIcon complete={complete} /><span className={`text-sm font-bold ${complete ? "text-[#405049]" : "text-[#66736d]"}`}>{label}</span></div>;
}

function ActivityRow({ item }) {
    return <div className="flex items-center justify-between gap-3"><span className="flex min-w-0 items-center gap-3"><span className="material-symbols-outlined text-[20px] text-[#66736d]">{item.icon}</span><span className="truncate text-sm font-bold text-[#405049]">{item.label}</span></span><span className="shrink-0 text-sm font-black text-[#121c2a]">{item.value}</span></div>;
}

function SecurityCard({ tone, icon, title, text, status, actionHref }) {
    const amber = tone === "amber";
    return <article className={`rounded-[22px] border p-5 ${amber ? "border-[#f0dca0] bg-[#fffdf4]" : "border-[#b7e4d1] bg-[#f0faf6]"}`}><div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white ${amber ? "text-[#8a5a00]" : "text-[#087052]"}`}><span className="material-symbols-outlined icon-fill text-[22px]">{icon}</span></div><h3 className="mb-2 font-black text-[#121c2a]">{title}</h3><p className="mb-4 text-sm leading-6 text-[#66736d]">{text}</p><span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${amber ? "bg-[#fff8e5] text-[#8a5a00]" : "bg-white text-[#087052]"}`}><span className="material-symbols-outlined icon-fill text-[12px]">{amber ? "warning" : "check_circle"}</span>{status}</span>{actionHref && <a href={actionHref} className="mt-3 block text-xs font-black text-[#8a5a00] hover:underline">Verify now -&gt;</a>}</article>;
}

function PasswordStrength({ score, hasValue }) {
    const active = passwordStrengthConfig[Math.max(score - 1, 0)];
    return <div className="mt-2.5 flex items-center gap-2"><div className="flex h-1.5 flex-1 gap-1">{[1, 2, 3, 4].map((level) => <span key={level} className="h-full flex-1 rounded-full transition-colors" style={{ backgroundColor: level <= score ? active.color : "#e5ece8" }} />)}</div><span className="shrink-0 text-xs font-black" style={{ color: hasValue ? active.color : "#9aada7" }}>{hasValue ? active.label : ""}</span></div>;
}

function getPasswordStrength(value) {
    if (!value) return 0;
    // Award one point for length and each character category, capped to the four display bars.
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return Math.min(score, 4);
}
