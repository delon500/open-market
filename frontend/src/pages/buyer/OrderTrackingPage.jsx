import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype order shell used by the tracking header and support context.
const order = {
    id: "OM-24091",
    placedAt: "22 June 2026, 14:32",
    status: "in-progress",
    statusLabel: "Packages being prepared",
    paymentStatus: "Protected",
    deliveryAddress: {
        label: "Home",
        recipient: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        line1: "24 Vilakazi Street",
        line2: "Orlando West",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "1804",
    },
};

// Each seller package tracks independently because one marketplace order can ship in parts.
const packages = [
    {
        id: "pkg-kasi-kicks",
        seller: "Kasi Kicks",
        status: "preparing",
        statusLabel: "Preparing item",
        progress: 35,
        trackingNumber: "KK-OM24091-01",
        courier: "Open Market Courier",
        estimatedArrival: "26–28 June 2026",
        currentLocation: "Soweto, Johannesburg",
        deliveryMethod: "Courier or Click & Collect",
        storeTo: "/stores/kasi-kicks",
        items: 1,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
        events: [
            {
                title: "Order placed",
                description: "Payment confirmed and package created.",
                time: "22 Jun, 14:32",
                complete: true,
                icon: "receipt_long",
            },
            {
                title: "Seller notified",
                description: "Kasi Kicks received the order details.",
                time: "22 Jun, 14:35",
                complete: true,
                icon: "storefront",
            },
            {
                title: "Preparing item",
                description: "The seller is preparing this item for handover.",
                time: "In progress",
                active: true,
                icon: "inventory_2",
            },
            {
                title: "Handed to courier",
                description: "Tracking updates will appear once handed over.",
                time: "Pending",
                complete: false,
                icon: "local_shipping",
            },
            {
                title: "Delivered",
                description: "Confirm receipt only after checking the item.",
                time: "Pending",
                complete: false,
                icon: "verified",
            },
        ],
    },
    {
        id: "pkg-urban-thread",
        seller: "Urban Thread",
        status: "confirmed",
        statusLabel: "Seller confirmed",
        progress: 45,
        trackingNumber: "UT-OM24091-02",
        courier: "Open Market Courier",
        estimatedArrival: "26–28 June 2026",
        currentLocation: "Braamfontein, Johannesburg",
        deliveryMethod: "Courier delivery",
        storeTo: "/stores/urban-thread",
        items: 2,
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=220&q=80",
        events: [
            {
                title: "Order placed",
                description: "Payment confirmed and package created.",
                time: "22 Jun, 14:32",
                complete: true,
                icon: "receipt_long",
            },
            {
                title: "Seller notified",
                description: "Urban Thread received the order details.",
                time: "22 Jun, 14:35",
                complete: true,
                icon: "storefront",
            },
            {
                title: "Seller confirmed",
                description: "The seller confirmed they can fulfil the package.",
                time: "22 Jun, 16:10",
                active: true,
                icon: "task_alt",
            },
            {
                title: "Preparing package",
                description: "The package will be prepared before handover.",
                time: "Pending",
                complete: false,
                icon: "inventory_2",
            },
            {
                title: "Delivered",
                description: "Confirm receipt only after checking the item.",
                time: "Pending",
                complete: false,
                icon: "verified",
            },
        ],
    },
    {
        id: "pkg-local-carry",
        seller: "Local Carry",
        status: "preparing",
        statusLabel: "Preparing item",
        progress: 30,
        trackingNumber: "LC-OM24091-03",
        courier: "Open Market Courier",
        estimatedArrival: "27–29 June 2026",
        currentLocation: "Pretoria, Gauteng",
        deliveryMethod: "Courier delivery",
        storeTo: "/stores/local-carry",
        items: 1,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
        events: [
            {
                title: "Order placed",
                description: "Payment confirmed and package created.",
                time: "22 Jun, 14:32",
                complete: true,
                icon: "receipt_long",
            },
            {
                title: "Seller notified",
                description: "Local Carry received the order details.",
                time: "22 Jun, 14:35",
                complete: true,
                icon: "storefront",
            },
            {
                title: "Preparing item",
                description: "The seller is preparing this item for courier handover.",
                time: "In progress",
                active: true,
                icon: "inventory_2",
            },
            {
                title: "Courier pickup",
                description: "Courier pickup will be scheduled by the seller.",
                time: "Pending",
                complete: false,
                icon: "local_shipping",
            },
            {
                title: "Delivered",
                description: "Confirm receipt only after checking the item.",
                time: "Pending",
                complete: false,
                icon: "verified",
            },
        ],
    },
];

// Guidance copy keeps buyers from confirming receipt too early.
const trackingTips = [
    "Track each seller package separately.",
    "Do not confirm receipt before checking the item.",
    "Use the delivery confirmation code only when the item is handed over.",
];

export default function OrderTrackingPage() {
    const [activePackageId, setActivePackageId] = useState(packages[0].id);
    const [copiedTracking, setCopiedTracking] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);

    // The selected package controls the hero tracker, timeline, and copied tracking number.
    const activePackage = packages.find((item) => item.id === activePackageId);

    // Overall progress averages seller package progress for the order-level summary.
    const overallProgress = useMemo(() => {
        const total = packages.reduce((sum, item) => sum + item.progress, 0);
        return Math.round(total / packages.length);
    }, []);

    function copyTrackingNumber() {
        if (!activePackage) return;

        // Clipboard feedback is temporary so repeated copies still feel responsive.
        navigator.clipboard?.writeText(activePackage.trackingNumber);
        setCopiedTracking(true);

        window.setTimeout(() => {
            setCopiedTracking(false);
        }, 2200);
    }

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Order tracking"
                title={`Track order ${order.id}`}
                description="Follow each seller package from preparation to delivery or collection confirmation."
                actions={
                    <>
                        <Link
                            to="/order-details"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
                            Order details
                        </Link>

                        <Link
                            to="/delivery-confirmation"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Confirmation code
                            <span className="material-symbols-outlined text-[18px]">
                password
              </span>
                        </Link>
                    </>
                }
            />

            <section className="overflow-hidden rounded-[32px] border border-[#dbe6e1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                <div className="bg-[#003527] p-6 text-white md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#fed65b] text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[38px]">
                  local_shipping
                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                Protected delivery
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                Your packages are moving forward
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                Your order is split by seller. Each package has its own
                                preparation, courier handover, and delivery confirmation status.
                            </p>
                        </div>

                        <div className="rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Overall progress
                            </p>

                            <p className="mt-2 text-3xl font-black text-[#fed65b]">
                                {overallProgress}%
                            </p>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/14">
                                <div
                                    className="h-full rounded-full bg-[#fed65b]"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>

                            <p className="mt-3 text-sm font-semibold text-white/65">
                                {packages.length} seller packages
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ece8] md:grid-cols-4 md:divide-y-0">
                    <TrackingStat
                        icon="receipt_long"
                        label="Order"
                        value={order.id}
                    />
                    <TrackingStat
                        icon="storefront"
                        label="Packages"
                        value={packages.length}
                    />
                    <TrackingStat
                        icon="shield_locked"
                        label="Payment"
                        value={order.paymentStatus}
                    />
                    <TrackingStat
                        icon="event"
                        label="Status"
                        value={order.statusLabel}
                    />
                </div>
            </section>

            {copiedTracking && (
                <div
                    className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5"
                    role="status"
                    aria-live="polite"
                >
          <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#003527]">
            check_circle
          </span>

                    <div>
                        <h2 className="mb-1 font-black text-[#003527]">
                            Tracking number copied
                        </h2>

                        <p className="text-sm leading-7 text-[#003527]">
                            Use this tracking number when contacting support or the seller.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Seller packages
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Select a seller package to view its latest tracking updates.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  call_split
                </span>
                Multi-seller tracking
              </span>
                        </div>

                        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {packages.map((sellerPackage) => (
                                <button
                                    key={sellerPackage.id}
                                    type="button"
                                    onClick={() => setActivePackageId(sellerPackage.id)}
                                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition ${
                                        activePackageId === sellerPackage.id
                                            ? "border-[#003527] bg-[#003527] text-white"
                                            : "border-[#dbe6e1] bg-white text-[#404944] hover:border-[#003527] hover:text-[#003527]"
                                    }`}
                                >
                                    {sellerPackage.seller}
                                </button>
                            ))}
                        </div>

                        {activePackage && (
                            <ActiveTrackingPackage
                                sellerPackage={activePackage}
                                onCopy={copyTrackingNumber}
                                copied={copiedTracking}
                            />
                        )}
                    </section>

                    {activePackage && (
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                            <div className="mb-6">
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Tracking timeline
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Latest updates for {activePackage.seller}.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {activePackage.events.map((event, index) => (
                                    <TrackingTimelineItem
                                        key={event.title}
                                        event={event}
                                        isLast={index === activePackage.events.length - 1}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-[#121c2a]">
                                All package progress
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                A quick overview of every seller package in this order.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {packages.map((sellerPackage) => (
                                <PackageProgressRow
                                    key={sellerPackage.id}
                                    sellerPackage={sellerPackage}
                                    active={activePackageId === sellerPackage.id}
                                    onSelect={() => setActivePackageId(sellerPackage.id)}
                                />
                            ))}
                        </div>
                    </section>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Delivery details
                        </h2>

                        {activePackage && (
                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Seller" value={activePackage.seller} />
                                <SummaryRow label="Status" value={activePackage.statusLabel} />
                                <SummaryRow label="Courier" value={activePackage.courier} />
                                <SummaryRow
                                    label="Tracking"
                                    value={activePackage.trackingNumber}
                                />
                                <SummaryRow
                                    label="Estimate"
                                    value={activePackage.estimatedArrival}
                                />
                            </div>
                        )}

                        <div className="border-b border-[#e5ece8] py-5">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Delivery address
                            </p>

                            <p className="text-sm font-black text-[#121c2a]">
                                {order.deliveryAddress.label}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-[#66736d]">
                                {order.deliveryAddress.line1},{" "}
                                {order.deliveryAddress.line2}
                                <br />
                                {order.deliveryAddress.city},{" "}
                                {order.deliveryAddress.province},{" "}
                                {order.deliveryAddress.postalCode}
                            </p>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3">
                            <Link
                                to="/delivery-confirmation"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                            >
                                Delivery confirmation
                                <span className="material-symbols-outlined text-[18px]">
                  password
                </span>
                            </Link>

                            <Link
                                to="/order-details"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                View order details
                                <span className="material-symbols-outlined text-[18px]">
                  receipt_long
                </span>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
              shield_locked
            </span>

                        <h2 className="mb-2 text-xl font-black">
                            Buyer Protection active
                        </h2>

                        <p className="text-sm leading-7 text-white/70">
                            Seller payout is released after delivery or collection is
                            confirmed. Only confirm after checking the item.
                        </p>

                        <Link
                            to="/trust-safety"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                        >
                            Learn more
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>

                    <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6">
                        <div className="mb-4 flex items-center justify-between gap-4">
              <span className="material-symbols-outlined icon-fill block text-[32px] text-[#003527]">
                sms
              </span>

                            <button
                                type="button"
                                onClick={() => setSmsEnabled((current) => !current)}
                                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    smsEnabled ? "bg-[#003527]" : "bg-[#dbe6e1]"
                                }`}
                                role="switch"
                                aria-checked={smsEnabled}
                                aria-label={`SMS tracking updates — currently ${
                                    smsEnabled ? "on" : "off"
                                }`}
                            >
                <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        smsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                />
                            </button>
                        </div>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            SMS tracking updates
                        </h2>

                        <p className="text-sm leading-7 text-[#405049]">
                            {smsEnabled
                                ? "SMS updates are enabled for important delivery changes."
                                : "SMS updates are off. You can still track updates on this page."}
                        </p>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              support_agent
            </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Tracking help
                        </h2>

                        <ul className="space-y-3">
                            {trackingTips.map((tip) => (
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

                        <Link
                            to="/contact"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            Contact support
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>
                </aside>
            </div>

            <MobileTrackingActions />

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

// Stat cards surface the current order state before package-specific details.
function TrackingStat({ icon, label, value }) {
    return (
        <article className="p-5 md:p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[22px]">
          {icon}
        </span>
            </div>

            <p className="truncate text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {value}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
        </article>
    );
}

// Active package panel owns the copy action and detailed timeline for one seller.
function ActiveTrackingPackage({ sellerPackage, onCopy, copied }) {
    return (
        <article className="overflow-hidden rounded-[26px] border border-[#dbe6e1]">
            <div className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)]">
                <img
                    src={sellerPackage.image}
                    alt={`${sellerPackage.seller} package`}
                    className="h-52 w-full object-cover md:h-full"
                />

                <div className="p-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <StatusBadge
                                status={sellerPackage.status}
                                label={sellerPackage.statusLabel}
                            />

                            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                                {sellerPackage.seller}
                            </h3>

                            <p className="mt-1 text-sm font-bold text-[#66736d]">
                                {sellerPackage.items} item
                                {sellerPackage.items === 1 ? "" : "s"} •{" "}
                                {sellerPackage.deliveryMethod}
                            </p>
                        </div>

                        <Link
                            to={sellerPackage.storeTo}
                            className="inline-flex w-fit items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
              <span className="material-symbols-outlined text-[14px]">
                storefront
              </span>
                            View store
                        </Link>
                    </div>

                    <div className="mb-5">
                        <div className="mb-2 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                            <span>Package progress</span>
                            <span>{sellerPackage.progress}%</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#e5ece8]">
                            <div
                                className="h-full rounded-full bg-[#003527]"
                                style={{ width: `${sellerPackage.progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <InfoPill
                            icon="pin_drop"
                            label="Current location"
                            value={sellerPackage.currentLocation}
                        />
                        <InfoPill
                            icon="event"
                            label="Estimated arrival"
                            value={sellerPackage.estimatedArrival}
                        />
                        <InfoPill
                            icon="local_shipping"
                            label="Courier"
                            value={sellerPackage.courier}
                        />

                        <div className="rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
                            <div className="mb-2 flex items-center gap-2 text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[18px]">
                  tag
                </span>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                                    Tracking number
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <p className="truncate text-sm font-black text-[#121c2a]">
                                    {sellerPackage.trackingNumber}
                                </p>

                                <button
                                    type="button"
                                    onClick={onCopy}
                                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#003527] transition hover:bg-[#f0faf6]"
                                    aria-label={`Copy tracking number ${sellerPackage.trackingNumber}`}
                                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

// Timeline rows separate completed, active, and pending fulfilment moments.
function TrackingTimelineItem({ event, isLast }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
        <span
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                event.complete
                    ? "bg-[#003527] text-white"
                    : event.active
                        ? "bg-[#fff8e5] text-[#8a5a00]"
                        : "bg-[#f8fbf9] text-[#8b9791]"
            }`}
        >
          <span className="material-symbols-outlined icon-fill text-[22px]">
            {event.complete ? "check" : event.icon}
          </span>
        </span>

                {!isLast && <span className="mt-2 h-full w-px bg-[#dbe6e1]" />}
            </div>

            <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-black text-[#121c2a]">{event.title}</h3>

                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
            {event.time}
          </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {event.description}
                </p>
            </div>
        </div>
    );
}

// Package rows act as tabs for switching between seller-level tracking streams.
function PackageProgressRow({ sellerPackage, active, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`w-full rounded-[24px] border p-4 text-left transition ${
                active
                    ? "border-[#003527] bg-[#f0faf6]"
                    : "border-[#e5ece8] bg-white hover:border-[#95d3ba]"
            }`}
        >
            <div className="flex gap-4">
                <img
                    src={sellerPackage.image}
                    alt={`${sellerPackage.seller} package`}
                    className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="font-black text-[#121c2a]">
                                {sellerPackage.seller}
                            </p>

                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {sellerPackage.statusLabel} • {sellerPackage.items} item
                                {sellerPackage.items === 1 ? "" : "s"}
                            </p>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#003527]">
              {sellerPackage.progress}%
            </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5ece8]">
                        <div
                            className="h-full rounded-full bg-[#003527]"
                            style={{ width: `${sellerPackage.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </button>
    );
}

function InfoPill({ icon, label, value }) {
    return (
        <div className="rounded-[20px] border border-[#e5ece8] bg-[#f8fbf9] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[18px]">
          {icon}
        </span>

                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                    {label}
                </p>
            </div>

            <p className="text-sm font-black text-[#121c2a]">{value}</p>
        </div>
    );
}

// Status badges normalize package state colors across the tracking page.
function StatusBadge({ status, label }) {
    const styles = {
        preparing: "bg-[#fff8e5] text-[#8a5a00]",
        confirmed: "bg-[#eaf4ff] text-[#1d5b8f]",
        delivered: "bg-[#f0faf6] text-[#087052]",
        delayed: "bg-[#fff0ec] text-[#9f2d20]",
    };

    return (
        <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-black ${
                styles[status] ?? "bg-[#f8fbf9] text-[#66736d]"
            }`}
        >
      <span className="material-symbols-outlined icon-fill text-[14px]">
        radio_button_checked
      </span>
            {label}
    </span>
    );
}

function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}

// Fixed mobile actions keep support and confirmation paths reachable after scrolling.
function MobileTrackingActions() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/delivery-confirmation"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Confirm
                    <span className="material-symbols-outlined text-[18px]">
            password
          </span>
                </Link>

                <Link
                    to="/order-details"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}
