import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype inbox items keep order, support, and account examples in one local data set.
const initialNotifications = [
    {
        id: "ntf-1",
        type: "dispute",
        title: "Dispute update available",
        message:
            "Support is reviewing your dispute DSP-10042. You may be asked for more evidence if needed.",
        time: "Today, 09:20",
        dateGroup: "Today",
        status: "unread",
        priority: "high",
        icon: "gavel",
        link: "/dispute-details",
        actionLabel: "View dispute",
    },
    {
        id: "ntf-2",
        type: "refund",
        title: "Refund is processing",
        message:
            "Refund RF-20491 has been approved and is processing back to your original payment method.",
        time: "Today, 08:45",
        dateGroup: "Today",
        status: "unread",
        priority: "medium",
        icon: "payments",
        link: "/refund-status",
        actionLabel: "Track refund",
    },
    {
        id: "ntf-3",
        type: "return",
        title: "Return proof needed",
        message:
            "Add your tracking number or handover proof for return RTN-30042 before the deadline.",
        time: "Yesterday, 16:10",
        dateGroup: "Yesterday",
        status: "read",
        priority: "high",
        icon: "assignment_return",
        link: "/returns",
        actionLabel: "Add proof",
    },
    {
        id: "ntf-4",
        type: "order",
        title: "Package is ready for confirmation",
        message:
            "Your Kasi Kicks package is ready. Only confirm delivery after you have checked the item.",
        time: "Yesterday, 11:35",
        dateGroup: "Yesterday",
        status: "read",
        priority: "medium",
        icon: "inventory_2",
        link: "/delivery-confirmation",
        actionLabel: "Confirm delivery",
    },
    {
        id: "ntf-5",
        type: "order",
        title: "Order status changed",
        message:
            "Order OM-24078 moved to out for delivery. Track the latest package movement.",
        time: "22 Jun, 14:20",
        dateGroup: "Earlier",
        status: "read",
        priority: "low",
        icon: "local_shipping",
        link: "/order-tracking",
        actionLabel: "Track order",
    },
    {
        id: "ntf-6",
        type: "account",
        title: "Profile updated",
        message:
            "Your buyer profile details were updated successfully.",
        time: "21 Jun, 10:05",
        dateGroup: "Earlier",
        status: "read",
        priority: "low",
        icon: "manage_accounts",
        link: "/account/profile",
        actionLabel: "View profile",
    },
];

// Filter ids map directly to notification type logic in filteredNotifications.
const filterTabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "orders", label: "Orders" },
    { id: "buyer-protection", label: "Protection" },
    { id: "account", label: "Account" },
];

// Settings are read here for summary context while the editable controls live on Buyer Settings.
const notificationSettings = [
    {
        id: "order-updates",
        title: "Order updates",
        description: "Delivery, tracking, and confirmation reminders.",
        icon: "local_shipping",
        enabled: true,
    },
    {
        id: "buyer-protection",
        title: "Buyer Protection",
        description: "Dispute, refund, and return updates.",
        icon: "shield_locked",
        enabled: true,
    },
    {
        id: "promotions",
        title: "Promotions",
        description: "Offers, seller discounts, and marketplace updates.",
        icon: "sell",
        enabled: false,
    },
];

export default function BuyerNotificationsPage() {
    // The inbox remains fully interactive before backend notification endpoints are connected.
    const [notifications, setNotifications] = useState(initialNotifications);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [settings, setSettings] = useState(notificationSettings);
    const [recentlyClearedNotification, setRecentlyClearedNotification] =
        useState(null);

    const unreadCount = notifications.filter(
        (notification) => notification.status === "unread"
    ).length;

    // Attention count focuses on buyer-protection items that may require action.
    const buyerProtectionAttentionCount = notifications.filter(
        (notification) =>
            ["dispute", "refund", "return"].includes(notification.type) &&
            (notification.status === "unread" || notification.priority === "high")
    ).length;

    // Today count helps buyers understand whether the inbox has fresh activity.
    const todayCount = notifications.filter(
        (notification) => notification.dateGroup === "Today"
    ).length;

    // Badge counts focus on items that may need attention without making every filter noisy.
    const filterCounts = {
        all: notifications.length,
        unread: unreadCount,
        orders: notifications.filter(
            (notification) =>
                notification.type === "order" &&
                notification.status === "unread"
        ).length,
        "buyer-protection": buyerProtectionAttentionCount,
        account: notifications.filter(
            (notification) =>
                notification.type === "account" &&
                notification.status === "unread"
        ).length,
    };

    // Keep date groups in a stable order even after filtering.
    const GROUP_ORDER = ["Today", "Yesterday", "Earlier"];

    const filteredNotifications = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return notifications.filter((notification) => {
            const matchesSearch =
                !query ||
                notification.title.toLowerCase().includes(query) ||
                notification.message.toLowerCase().includes(query) ||
                notification.type.toLowerCase().includes(query);

            const matchesFilter =
                activeFilter === "all" ||
                (activeFilter === "unread" &&
                    notification.status === "unread") ||
                (activeFilter === "orders" && notification.type === "order") ||
                (activeFilter === "buyer-protection" &&
                    ["dispute", "refund", "return"].includes(notification.type)) ||
                (activeFilter === "account" && notification.type === "account");

            return matchesSearch && matchesFilter;
        });
    }, [activeFilter, notifications, searchQuery]);

    const groupedNotifications = useMemo(() => {
        return filteredNotifications.reduce((groups, notification) => {
            if (!groups[notification.dateGroup]) {
                groups[notification.dateGroup] = [];
            }

            groups[notification.dateGroup].push(notification);
            return groups;
        }, {});
    }, [filteredNotifications]);

    function markAsRead(notificationId) {
        // Marking a card as read should not disturb its position inside the grouped timeline.
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === notificationId
                    ? { ...notification, status: "read" }
                    : notification
            )
        );
    }

    function markAllAsRead() {
        setNotifications((current) =>
            current.map((notification) => ({ ...notification, status: "read" }))
        );
    }

    function clearNotification(notificationId) {
        // Keep a short-lived copy so the toast can undo a clear without losing original ordering.
        const notificationToClear = notifications.find(
            (notification) => notification.id === notificationId
        );

        if (!notificationToClear) return;

        setNotifications((current) =>
            current.filter((notification) => notification.id !== notificationId)
        );
        setRecentlyClearedNotification(notificationToClear);

        window.setTimeout(() => {
            setRecentlyClearedNotification((current) =>
                current?.id === notificationToClear.id ? null : current
            );
        }, 5000);
    }

    function undoClearNotification() {
        if (!recentlyClearedNotification) return;

        setNotifications((current) => {
            if (
                current.some(
                    (notification) =>
                        notification.id === recentlyClearedNotification.id
                )
            ) {
                return current;
            }

            const restoredNotifications = [
                ...current,
                recentlyClearedNotification,
            ];

            // Restore according to the original prototype order so date groups stay predictable.
            return initialNotifications
                .filter((notification) =>
                    restoredNotifications.some(
                        (restored) => restored.id === notification.id
                    )
                )
                .map((notification) =>
                    restoredNotifications.find(
                        (restored) => restored.id === notification.id
                    )
                );
        });

        setRecentlyClearedNotification(null);
    }

    function resetFilters() {
        setActiveFilter("all");
        setSearchQuery("");
    }

    function toggleSetting(settingId) {
        setSettings((current) =>
            current.map((setting) =>
                setting.id === settingId
                    ? { ...setting, enabled: !setting.enabled }
                    : setting
            )
        );
    }

    // Keep the existing settings handler available while settings controls live on the settings page.
    void toggleSetting;

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Notifications"
                title="Buyer notifications"
                description="Stay updated on orders, disputes, refunds, returns, and account activity."
                actions={
                    <>
                        <button
                            type="button"
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black transition shadow-[0_8px_22px_rgba(0,53,39,.2)] ${
                                unreadCount > 0
                                    ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                    : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                done_all
                            </span>
                            Mark all read
                        </button>

                        <Link
                            to="/account/settings"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            Settings
                            <span className="material-symbols-outlined text-[18px]">
                                tune
                            </span>
                        </Link>
                    </>
                }
            />

            <p className="sr-only">
                {unreadCount} unread notifications. {buyerProtectionAttentionCount} buyer protection notifications need attention. {todayCount} notifications today. {settings.length} notification settings available in account settings.
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <section className="space-y-6 lg:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search notifications..."
                            className="w-full rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-5 py-3.5 text-sm font-semibold text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,53,39,.10)]"
                        />

                        <div className="-mx-5 mt-4 h-px bg-[#e5ece8] md:-mx-6" />

                        <div
                            className="mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            role="group"
                            aria-label="Filter notifications by type"
                        >
                            {filterTabs.map((tab) => (
                                <FilterButton
                                    key={tab.id}
                                    tab={tab}
                                    count={filterCounts[tab.id]}
                                    active={activeFilter === tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                />
                            ))}

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="inline-flex shrink-0 items-center justify-center rounded-full border border-dashed border-[#c9473d] bg-white px-5 py-2.5 text-sm font-black text-[#9f2d20] transition hover:bg-[#fff5f2]"
                                aria-label="Clear notification filters"
                            >
                                Clear
                            </button>
                        </div>
                    </section>

                    {filteredNotifications.length > 0 ? (
                        <section className="space-y-6">
                            {GROUP_ORDER.filter((group) => groupedNotifications[group]).map(
                                (group) => (
                                    <div key={group} className="space-y-3">
                                        <p className="px-1 text-xs font-black uppercase tracking-[0.16em] text-[#66736d]">
                                            {group}
                                        </p>

                                        <div className="space-y-3">
                                            {groupedNotifications[group].map((notification) => (
                                                <NotificationCard
                                                    key={notification.id}
                                                    notification={notification}
                                                    onMarkRead={() =>
                                                        markAsRead(notification.id)
                                                    }
                                                    onClear={() =>
                                                        clearNotification(
                                                            notification.id
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </section>
                    ) : (
                        <EmptyNotificationsState onReset={resetFilters} />
                    )}
                </section>

                <aside className="hidden space-y-6 lg:col-span-4 lg:block">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] lg:sticky lg:top-24">
                        <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                            Quick actions
                        </h2>

                        <div className="space-y-2">
                            {[
                                {
                                    label: "Open a dispute",
                                    icon: "gavel",
                                    to: "/open-dispute",
                                },
                                {
                                    label: "Track a refund",
                                    icon: "payments",
                                    to: "/refund-status",
                                },
                                {
                                    label: "View my returns",
                                    icon: "assignment_return",
                                    to: "/returns",
                                },
                                {
                                    label: "All settings",
                                    icon: "settings",
                                    to: "/account/settings",
                                },
                            ].map((action) => (
                                <Link
                                    key={action.label}
                                    to={action.to}
                                    className="flex items-center gap-3 rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] px-4 py-3.5 text-sm font-black text-[#003527] transition hover:border-[#b7e4d1] hover:bg-[#f0faf6]"
                                >
                                    <span className="material-symbols-outlined icon-fill text-[20px]">
                                        {action.icon}
                                    </span>
                                    {action.label}
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
                            Buyer tips
                        </h2>

                        <ul className="space-y-3">
                            {[
                                "Return and dispute deadlines are time-sensitive - act within 48 hours of the notification.",
                                "Only confirm delivery after physically inspecting the item - this releases funds to the seller.",
                                "You can open a dispute on any order up to 7 days after the confirmed delivery date.",
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

            <MobileNotificationActions
                unreadCount={unreadCount}
                onMarkAllRead={markAllAsRead}
                activeFilter={activeFilter}
                onResetFilter={resetFilters}
            />

            {recentlyClearedNotification && (
                <UndoClearToast
                    notification={recentlyClearedNotification}
                    onUndo={undoClearNotification}
                    onDismiss={() => setRecentlyClearedNotification(null)}
                />
            )}

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

// Filter chips stay shrink-wrapped so the filter row scrolls horizontally without orphaned labels.
function FilterButton({ tab, count, active, onClick }) {
    const showCount = count > 0;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-black transition ${
                active
                    ? "border-[#003527] bg-[#003527] text-white shadow-[0_8px_18px_rgba(0,53,39,.18)]"
                    : "border-[#dbe6e1] bg-white text-[#404944] hover:bg-[#f0faf6] hover:text-[#003527]"
            }`}
        >
            <span>{tab.label}</span>
            {showCount && (
                <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-black ${
                        active
                            ? "bg-white/20 text-white"
                            : "bg-[#e5ece8] text-[#66736d]"
                    }`}
                >
                    {count}
                </span>
            )}
        </button>
    );
}

// Notification cards separate priority styling from read state so important unread items stand out.
function NotificationCard({ notification, onMarkRead, onClear }) {
    const isUnread = notification.status === "unread";
    const isPrimaryAction = isUnread || notification.priority === "high";

    return (
        <article
            className={`relative overflow-hidden rounded-[18px] border bg-white p-4 shadow-[0_8px_32px_rgba(0,53,39,.05)] transition md:p-5 ${
                isUnread
                    ? "border-[#b7e4d1]"
                    : "border-[#dbe6e1]"
            }`}
        >
            <button
                type="button"
                onClick={onClear}
                className="no-print absolute right-3 top-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#66736d] transition hover:bg-[#fff0ec] hover:text-[#9f2d20]"
                aria-label={`Clear notification: ${notification.title}`}
            >
                <span className="material-symbols-outlined text-[18px]">
                    close
                </span>
            </button>

            <div className="flex items-center gap-3 pr-10">
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]"
                >
                    <span className="material-symbols-outlined icon-fill text-[22px]">
                        {notification.icon}
                    </span>
                </div>

                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <StatusPill
                        status={notification.status}
                        priority={notification.priority}
                    />

                    <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#66736d]">
                        {notification.time}
                    </span>
                </div>
            </div>

            <h3 className="mt-3 text-base font-black tracking-[-0.02em] text-[#121c2a]">
                {notification.title}
            </h3>

            <p className="mt-3 text-sm font-semibold leading-6 text-[#66736d]">
                {notification.message}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                {isPrimaryAction ? (
                    <Link
                        to={notification.link}
                        onClick={onMarkRead}
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#003527] px-4 text-sm font-black text-white transition hover:bg-[#064e3b]"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                        </span>
                        {notification.actionLabel}
                    </Link>
                ) : (
                    <Link
                        to={notification.link}
                        onClick={onMarkRead}
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#cbd7d1] bg-white px-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                        </span>
                        View details
                    </Link>
                )}

                {isUnread && (
                    <button
                        type="button"
                        onClick={onMarkRead}
                        className="no-print inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#cbd7d1] bg-white px-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            done
                        </span>
                        Mark read
                    </button>
                )}
            </div>
        </article>
    );
}

// Status pills use priority only for unread cards; read cards stay visually quiet.
function StatusPill({ status, priority }) {
    if (status === "unread") {
        // Unread: show priority-aware colouring
        const unreadStyles = {
            high: "bg-[#fff0ec] text-[#9f2d20]",
            medium: "bg-[#fff8e5] text-[#8a5a00]",
            low: "bg-[#003527] text-white",
        };

        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${unreadStyles[priority] ?? "bg-[#003527] text-white"}`}>
                <span className="material-symbols-outlined icon-fill text-[14px]">
                    radio_button_checked
                </span>
                {priority === "high" ? "Important" : priority === "medium" ? "Unread" : "Unread"}
            </span>
        );
    }

    // Read items stay neutral so priority color only signals current attention.
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f2f1] px-3 py-1.5 text-xs font-black text-[#66736d]">
            <span className="material-symbols-outlined icon-fill text-[14px]">
                done
            </span>
            Read
        </span>
    );
}

// Mobile actions keep notification settings reachable after the long inbox list scrolls.
function MobileNotificationActions({
                                       unreadCount,
                                       onMarkAllRead,
                                       activeFilter,
                                       onResetFilter,
                                   }) {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <button
                    type="button"
                    onClick={onMarkAllRead}
                    disabled={unreadCount === 0}
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition ${
                        unreadCount > 0
                            ? "bg-[#003527] text-white shadow-[0_8px_20px_rgba(0,53,39,.18)] hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        done_all
                    </span>
                    {unreadCount > 0 ? `Mark ${unreadCount} read` : "All read"}
                </button>

                <button
                    type="button"
                    onClick={onResetFilter}
                    className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl border px-5 text-sm font-black transition ${
                        activeFilter !== "all"
                            ? "border-[#003527] bg-[#003527] text-white"
                            : "border-[#cbd7d1] bg-white text-[#003527] hover:bg-[#f0faf6]"
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">
                        tune
                    </span>
                    {activeFilter !== "all" ? "Filtered" : "Filter"}
                </button>
            </div>
        </div>
    );
}

// Undo toast is fixed so the recovery action remains available even after the list reflows.
function UndoClearToast({ notification, onUndo, onDismiss }) {
    return (
        <div
            className="no-print fixed inset-x-4 bottom-[calc(var(--bottom-nav-height,77px)+16px)] z-40 mx-auto max-w-md rounded-[24px] border border-[#cbd7d1] bg-white p-4 shadow-[0_16px_44px_rgba(18,28,42,.18)] md:bottom-6"
            role="status"
            aria-live="polite"
        >
            <div className="flex items-start gap-3">
                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#003527]">
                    notifications_off
                </span>

                <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-black text-[#121c2a]">
                        Notification cleared
                    </h2>
                    <p className="mt-1 truncate text-xs font-semibold text-[#66736d]">
                        {notification.title}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onUndo}
                    className="shrink-0 rounded-xl bg-[#f0faf6] px-3 py-2 text-xs font-black text-[#003527] transition hover:bg-[#dcefe7]"
                >
                    Undo
                </button>

                <button
                    type="button"
                    onClick={onDismiss}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#66736d] transition hover:bg-[#f8fbf9]"
                    aria-label="Dismiss notification cleared message"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        close
                    </span>
                </button>
            </div>
        </div>
    );
}

// Empty state shares the same reset behavior as the filter bar.
function EmptyNotificationsState({ onReset }) {
    return (
        <section className="rounded-[28px] border border-dashed border-[#cbd7d1] bg-white p-8 text-center shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#f0faf6] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[34px]">
                    notifications_off
                </span>
            </div>

            <h2 className="text-xl font-black text-[#121c2a]">
                No notifications found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#66736d]">
                Try clearing the search or changing the selected filter.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Reset filters
                <span className="material-symbols-outlined text-[18px]">
                    refresh
                </span>
            </button>
        </section>
    );
}
