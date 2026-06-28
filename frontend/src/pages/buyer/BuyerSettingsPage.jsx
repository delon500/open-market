import { useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype notification preferences mirror the future settings API shape.
const initialNotificationSettings = [
    {
        id: "order-updates",
        title: "Order updates",
        description: "Delivery, tracking, and delivery confirmation reminders.",
        icon: "local_shipping",
        enabled: true,
    },
    {
        id: "buyer-protection",
        title: "Buyer Protection alerts",
        description: "Disputes, refunds, returns, and support review updates.",
        icon: "shield_locked",
        enabled: true,
        locked: true,
    },
    {
        id: "messages",
        title: "Seller and support messages",
        description: "Messages about your purchases, disputes, and returns.",
        icon: "chat_bubble",
        enabled: true,
    },
    {
        id: "promotions",
        title: "Promotions and offers",
        description: "Marketplace deals, seller discounts, and product updates.",
        icon: "sell",
        enabled: false,
    },
];

// Privacy preferences stay separate from notification settings so Save/Discard can reset each group cleanly.
const initialPrivacySettings = [
    {
        id: "show-first-name",
        title: "Show my first name on reviews",
        description: "Your public review can show your first name instead of full details.",
        icon: "reviews",
        enabled: true,
    },
    {
        id: "personalised-recommendations",
        title: "Personalised recommendations",
        description: "Use saved items and shopping activity to improve product suggestions.",
        icon: "auto_awesome",
        enabled: true,
    },
    {
        id: "seller-follow-ups",
        title: "Allow seller follow-up messages",
        description: "Sellers can contact you about orders you placed with them.",
        icon: "storefront",
        enabled: true,
    },
];

export default function BuyerSettingsPage() {
    // Keep editable preference state local until the account settings API is connected.
    const [notificationSettings, setNotificationSettings] = useState(
        initialNotificationSettings
    );
    const [privacySettings, setPrivacySettings] = useState(initialPrivacySettings);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [saved, setSaved] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    function toggleNotificationSetting(settingId) {
        setNotificationSettings((current) =>
            current.map((setting) => {
                // Buyer Protection alerts are locked so critical safety updates cannot be disabled.
                if (setting.id !== settingId || setting.locked) return setting;
                return { ...setting, enabled: !setting.enabled };
            })
        );
        setSaved(false);
        setHasChanges(true);
    }

    function togglePrivacySetting(settingId) {
        setPrivacySettings((current) =>
            current.map((setting) =>
                setting.id === settingId
                    ? { ...setting, enabled: !setting.enabled }
                    : setting
            )
        );
        setSaved(false);
        setHasChanges(true);
    }

    function saveSettings() {
        // Save is frontend-only for now, but the dirty state matches how an API save will behave.
        if (!hasChanges) return;
        setSaved(true);
        setHasChanges(false);
        window.setTimeout(() => setSaved(false), 2600);
    }

    function discardChanges() {
        // Reset every draft preference back to the original prototype defaults.
        setNotificationSettings(initialNotificationSettings);
        setPrivacySettings(initialPrivacySettings);
        setSmsEnabled(true);
        setEmailEnabled(true);
        setHasChanges(false);
        setSaved(false);
    }

    return (
        <div
            className={`space-y-8 ${
                hasChanges
                    ? "pb-[calc(var(--bottom-nav-height,77px)+96px)]"
                    : "pb-[calc(var(--bottom-nav-height,77px)+16px)]"
            } md:pb-12`}
        >
            <BuyerPageHeader
                eyebrow="Your account"
                title="Buyer settings"
                description="Manage notifications, privacy, communication channels, and Buyer Protection preferences."
                actions={
                    <Link
                        to="/account/notifications"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            notifications
                        </span>
                        Notifications
                    </Link>
                }
            />

            {saved && (
                <div
                    className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5"
                    role="status"
                    aria-live="polite"
                >
                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[24px] text-[#003527]">
                        check_circle
                    </span>

                    <div>
                        <h2 className="mb-1 font-black text-[#003527]">
                            Settings saved
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            Your buyer account preferences have been updated.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <section className="space-y-6 lg:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <div className="p-5 md:p-6">
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Notifications
                            </p>

                            <div className="space-y-3">
                                {notificationSettings.map((setting) => (
                                    <SettingRow
                                        key={setting.id}
                                        setting={setting}
                                        onToggle={() =>
                                            toggleNotificationSetting(setting.id)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-[#e5ece8]" />

                        <div className="p-5 md:p-6">
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Channels
                            </p>

                            <div className="space-y-3">
                                {[
                                    {
                                        icon: "sms",
                                        title: "SMS updates",
                                        description:
                                            "Delivery, dispute, refund, and return alerts by SMS.",
                                        enabled: smsEnabled,
                                        onToggle: () => {
                                            setSmsEnabled((current) => !current);
                                            setHasChanges(true);
                                            setSaved(false);
                                        },
                                    },
                                    {
                                        icon: "mail",
                                        title: "Email updates",
                                        description:
                                            "Account, order, and support updates by email.",
                                        enabled: emailEnabled,
                                        onToggle: () => {
                                            setEmailEnabled((current) => !current);
                                            setHasChanges(true);
                                            setSaved(false);
                                        },
                                    },
                                ].map((channel) => (
                                    <article
                                        key={channel.icon}
                                        className="rounded-[22px] border border-[#e5ece8] bg-[#f8fbf9] p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                                                <span className="material-symbols-outlined icon-fill text-[22px]">
                                                    {channel.icon}
                                                </span>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3 className="font-black text-[#121c2a]">
                                                            {channel.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm font-semibold leading-6 text-[#66736d]">
                                                            {channel.description}
                                                        </p>
                                                    </div>

                                                    <ToggleSwitch
                                                        enabled={channel.enabled}
                                                        onToggle={channel.onToggle}
                                                        label={`${channel.title} - currently ${
                                                            channel.enabled ? "on" : "off"
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-[#e5ece8]" />

                        <div className="p-5 md:p-6">
                            <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Privacy
                            </p>

                            <div className="space-y-3">
                                {privacySettings.map((setting) => (
                                    <SettingRow
                                        key={setting.id}
                                        setting={setting}
                                        onToggle={() => togglePrivacySetting(setting.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {hasChanges && (
                            <div className="flex items-center justify-between gap-4 border-t border-[#e5ece8] px-5 py-4 md:px-6">
                                <button
                                    type="button"
                                    onClick={discardChanges}
                                    className="text-sm font-black text-[#66736d] underline underline-offset-2 transition hover:text-[#003527]"
                                >
                                    Discard changes
                                </button>

                                <button
                                    type="button"
                                    onClick={saveSettings}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-[#003527] px-6 py-3 text-sm font-black text-white shadow-[0_6px_18px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                                >
                                    Save settings
                                    <span className="material-symbols-outlined text-[18px]">
                                        save
                                    </span>
                                </button>
                            </div>
                        )}
                    </section>

                    <section className="rounded-[28px] border border-[#efc5bd] bg-[#fff8f6] p-5 md:p-6">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#9f2d20]">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">
                                        lock
                                    </span>
                                </div>

                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Security and account access
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#66736d]">
                                    Change your password, review login details, or
                                    contact support if you notice suspicious account
                                    activity.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:min-w-52">
                                <Link
                                    to="/account/profile"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#7e241a]"
                                >
                                    Change password
                                    <span className="material-symbols-outlined text-[18px]">
                                        key
                                    </span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#efc5bd] bg-white px-5 py-3.5 text-sm font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                                >
                                    Contact support
                                </Link>
                            </div>
                        </div>
                    </section>
                </section>

                <aside className="hidden space-y-6 lg:col-span-4 lg:block">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] lg:sticky lg:top-24">
                        <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                            Account links
                        </h2>

                        <div className="space-y-2">
                            {[
                                {
                                    label: "Edit profile",
                                    icon: "person",
                                    to: "/account/profile",
                                },
                                {
                                    label: "Address book",
                                    icon: "home_pin",
                                    to: "/account/addresses",
                                },
                                {
                                    label: "Notifications",
                                    icon: "notifications",
                                    to: "/account/notifications",
                                },
                                {
                                    label: "My orders",
                                    icon: "shopping_bag",
                                    to: "/my-orders",
                                },
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className="flex items-center gap-3 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] px-4 py-3.5 text-sm font-black text-[#003527] transition hover:border-[#b7e4d1] hover:bg-[#f0faf6]"
                                >
                                    <span className="material-symbols-outlined icon-fill text-[20px]">
                                        {link.icon}
                                    </span>
                                    {link.label}
                                    <span className="material-symbols-outlined ml-auto text-[16px] text-[#66736d]">
                                        arrow_forward
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                        <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
                            tips_and_updates
                        </span>

                        <h2 className="mb-3 text-lg font-black text-[#121c2a]">
                            Account tips
                        </h2>

                        <ul className="space-y-3">
                            {[
                                "Turning off SMS means you may miss time-sensitive delivery and dispute alerts.",
                                "Seller follow-up messages are limited to topics related to orders you placed.",
                                "Personalised recommendations only use your activity on this marketplace.",
                            ].map((tip) => (
                                <li key={tip} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                                        check_circle
                                    </span>
                                    <span className="text-sm font-bold leading-6 text-[#405049]">
                                        {tip}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>
            </div>

            <MobileSettingsActions
                onSave={saveSettings}
                onDiscard={discardChanges}
                hasChanges={hasChanges}
            />

            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

// Setting rows keep the icon, explanatory copy, and switch behavior consistent across preference groups.
function SettingRow({ setting, onToggle }) {
    return (
        <article
            className={`rounded-[22px] border p-4 ${
                setting.locked
                    ? "border-[#c8ddd5] bg-[#f0faf6]"
                    : "border-[#e5ece8] bg-[#f8fbf9]"
            }`}
        >
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
                    <span className="material-symbols-outlined icon-fill text-[22px]">
                        {setting.icon}
                    </span>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-black text-[#121c2a]">
                                    {setting.title}
                                </h3>

                                {setting.locked && (
                                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#003527]">
                                        Required
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-sm font-semibold leading-6 text-[#66736d]">
                                {setting.description}
                            </p>
                        </div>

                        <ToggleSwitch
                            enabled={setting.enabled}
                            disabled={setting.locked}
                            onToggle={onToggle}
                            label={`${setting.title} - currently ${
                                setting.enabled ? "on" : "off"
                            }`}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}

// Shared switch component exposes proper switch semantics while keeping the visual control compact.
function ToggleSwitch({ enabled, disabled = false, onToggle, label }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className={`relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                enabled ? "bg-[#003527]" : "bg-[#dbe6e1]"
            } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            role="switch"
            aria-checked={enabled}
            aria-label={label}
        >
            <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                    enabled ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}

// Fixed mobile actions appear only when unsaved changes could otherwise be hidden below the fold.
function MobileSettingsActions({ onSave, onDiscard, hasChanges }) {
    if (!hasChanges) {
        return null;
    }

    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-4">
                <button
                    type="button"
                    onClick={onDiscard}
                    className="shrink-0 text-sm font-black text-[#66736d] underline underline-offset-2 transition hover:text-[#003527]"
                >
                    Discard
                </button>

                <button
                    type="button"
                    onClick={onSave}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.18)] transition hover:bg-[#064e3b]"
                >
                    Save settings
                    <span className="material-symbols-outlined text-[18px]">
                        save
                    </span>
                </button>
            </div>
        </div>
    );
}
