import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype order payload shared by the receipt, delivery, and payment summary sections.
const order = {
    id: "OM-24091",
    placedAt: "22 June 2026, 14:32",
    status: "processing",
    statusLabel: "Sellers preparing",
    paymentStatus: "Protected",
    paymentMethod: "Card payment",
    deliveryMethod: "Courier delivery",
    deliveryAddress: {
        label: "Home",
        recipient: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        line1: "24 Vilakazi Street",
        line2: "Orlando West",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "1804",
        instructions: "Call when arriving at the gate.",
    },
    subtotal: 2496,
    deliveryFee: 240,
    serviceFee: 37,
    savings: 435,
    total: 2773,
};

// Packages are separated by seller so buyers can track each seller's fulfilment status.
const packages = [
    {
        id: "pkg-kasi-kicks",
        seller: "Kasi Kicks",
        status: "Preparing item",
        statusType: "processing",
        progress: 35,
        estimatedArrival: "26–28 June 2026",
        deliveryFrom: 60,
        storeTo: "/stores/kasi-kicks",
        trackingTo: "/order-tracking",
        items: [
            {
                id: "classic-white-sneakers",
                title: "Classic white everyday sneakers",
                price: 899,
                oldPrice: 1099,
                quantity: 1,
                size: "UK 8",
                color: "White",
                condition: "New",
                image:
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
            },
        ],
    },
    {
        id: "pkg-urban-thread",
        seller: "Urban Thread",
        status: "Seller confirmed",
        statusType: "confirmed",
        progress: 45,
        estimatedArrival: "26–28 June 2026",
        deliveryFrom: 80,
        storeTo: "/stores/urban-thread",
        trackingTo: "/order-tracking",
        items: [
            {
                id: "neutral-cotton-hoodie",
                title: "Oversized neutral cotton hoodie",
                price: 549,
                oldPrice: 699,
                quantity: 2,
                size: "Large",
                color: "Stone",
                condition: "New",
                image:
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=220&q=80",
            },
        ],
    },
    {
        id: "pkg-local-carry",
        seller: "Local Carry",
        status: "Preparing item",
        statusType: "processing",
        progress: 30,
        estimatedArrival: "27–29 June 2026",
        deliveryFrom: 70,
        storeTo: "/stores/local-carry",
        trackingTo: "/order-tracking",
        items: [
            {
                id: "canvas-weekender-bag",
                title: "Canvas weekender bag",
                price: 499,
                oldPrice: 650,
                quantity: 1,
                size: "Standard",
                color: "Olive",
                condition: "New",
                image:
                    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=220&q=80",
            },
        ],
    },
];

// Timeline copy explains the protected payment lifecycle at the order level.
const timeline = [
    {
        title: "Order placed",
        description: "Payment was confirmed and the protected order was created.",
        time: "22 Jun, 14:32",
        icon: "receipt_long",
        complete: true,
    },
    {
        title: "Sellers notified",
        description: "Each seller received their package details.",
        time: "22 Jun, 14:35",
        icon: "storefront",
        complete: true,
    },
    {
        title: "Preparing packages",
        description: "Sellers are preparing items for delivery or collection.",
        time: "In progress",
        icon: "inventory_2",
        active: true,
    },
    {
        title: "Delivery starts",
        description: "Tracking updates will appear when packages are handed over.",
        time: "Pending",
        icon: "local_shipping",
        complete: false,
    },
    {
        title: "Buyer confirms receipt",
        description: "Seller payout is released after delivery is confirmed.",
        time: "Pending",
        icon: "verified",
        complete: false,
    },
];

export default function OrderDetailsPage() {
    const [activePackageId, setActivePackageId] = useState(packages[0].id);
    const [showAddressDetails, setShowAddressDetails] = useState(false);

    // Active package drives the package detail panel without changing the page route.
    const activePackage = packages.find((item) => item.id === activePackageId);

    // Item count is derived from package contents so the header stays accurate.
    const itemCount = useMemo(
        () =>
            packages.reduce(
                (total, sellerPackage) =>
                    total +
                    sellerPackage.items.reduce(
                        (packageTotal, item) => packageTotal + item.quantity,
                        0
                    ),
                0
            ),
        []
    );

    return (
        <div className="space-y-8 pb-[calc(var(--bottom-nav-height,77px)+96px)] md:pb-12">
            <BuyerPageHeader
                eyebrow="Order details"
                title={`Order ${order.id}`}
                description="Review seller packages, delivery progress, protected payment status, and order actions."
                actions={
                    <>
                        <Link
                            to="/my-orders"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
                            Back to orders
                        </Link>

                        <Link
                            to="/order-tracking"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Track order
                            <span className="material-symbols-outlined text-[18px]">
                local_shipping
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
                  shopping_bag
                </span>
                            </div>

                            <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                Protected order
                            </p>

                            <h2 className="text-3xl font-black tracking-[-0.05em] md:text-4xl">
                                Sellers are preparing your order
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72 md:text-base">
                                Payment is protected while each seller prepares their package.
                                Confirm receipt only after checking the delivered or collected
                                items.
                            </p>
                        </div>

                        <div className="rounded-[26px] bg-white/10 p-5 ring-1 ring-white/15">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">
                                Order number
                            </p>

                            <p className="mt-2 text-2xl font-black text-[#fed65b]">
                                {order.id}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-white/65">
                                Placed {order.placedAt}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-y divide-[#e5ece8] md:grid-cols-4 md:divide-y-0">
                    <OrderStat icon="inventory_2" label="Items" value={itemCount} />
                    <OrderStat icon="storefront" label="Sellers" value={packages.length} />
                    <OrderStat
                        icon="shield_locked"
                        label="Payment"
                        value={order.paymentStatus}
                    />
                    <OrderStat icon="payments" label="Total" value={formatRand(order.total)} />
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Order progress
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Follow the order from payment confirmation to delivery
                                    confirmation.
                                </p>
                            </div>

                            <StatusBadge status={order.status} label={order.statusLabel} />
                        </div>

                        <div className="space-y-4">
                            {timeline.map((step, index) => (
                                <TimelineItem
                                    key={step.title}
                                    step={step}
                                    isLast={index === timeline.length - 1}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Seller packages
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    Your order is split by seller so each package can be tracked
                                    clearly.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  call_split
                </span>
                Multi-seller order
              </span>
                        </div>

                        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

                        {activePackage && <PackageDetails sellerPackage={activePackage} />}
                    </section>

                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-black text-[#121c2a]">
                                    Delivery address
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                    This is the address linked to the order.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowAddressDetails((current) => !current)}
                                className="inline-flex items-center gap-2 rounded-2xl border border-[#dbe6e1] bg-white px-4 py-2.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                                aria-expanded={showAddressDetails}
                                aria-controls="order-delivery-address"
                            >
                                {showAddressDetails ? "Hide" : "View"} details
                            </button>
                        </div>

                        <div
                            id="order-delivery-address"
                            className="rounded-[24px] border border-[#e5ece8] bg-[#f8fbf9] p-5"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-black text-[#121c2a]">
                                    {order.deliveryAddress.label}
                                </h3>

                                <span className="rounded-full bg-[#fff8e5] px-2.5 py-1 text-[11px] font-black text-[#8a5a00]">
                  Delivery address
                </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-[#66736d]">
                                {order.deliveryAddress.recipient} • {order.deliveryAddress.phone}
                            </p>

                            {showAddressDetails && (
                                <div className="mt-4 text-sm leading-7 text-[#404944]">
                                    <p>
                                        {order.deliveryAddress.line1},{" "}
                                        {order.deliveryAddress.line2}
                                    </p>
                                    <p>
                                        {order.deliveryAddress.city},{" "}
                                        {order.deliveryAddress.province},{" "}
                                        {order.deliveryAddress.postalCode}
                                    </p>

                                    <div className="mt-4 rounded-2xl border border-[#dbe6e1] bg-white p-4">
                                        <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                            Instructions
                                        </p>
                                        <p>{order.deliveryAddress.instructions}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Order summary
                        </h2>

                        <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                            <SummaryRow label="Order number" value={order.id} />
                            <SummaryRow label="Status" value={order.statusLabel} />
                            <SummaryRow label="Payment" value={order.paymentMethod} />
                            <SummaryRow label="Delivery" value={order.deliveryMethod} />
                            <SummaryRow label="Items" value={`${itemCount}`} />
                            <SummaryRow label="Sellers" value={`${packages.length}`} />
                        </div>

                        <div className="space-y-3 border-b border-[#e5ece8] py-5">
                            <SummaryRow label="Subtotal" value={formatRand(order.subtotal)} />
                            <SummaryRow
                                label="Delivery"
                                value={formatRand(order.deliveryFee)}
                            />
                            <SummaryRow
                                label="Service fee"
                                value={formatRand(order.serviceFee)}
                            />
                            <SummaryRow
                                label="Product savings"
                                value={`- ${formatRand(order.savings)}`}
                                positive
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4 py-5">
              <span className="text-base font-black text-[#121c2a]">
                Total paid
              </span>

                            <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {formatRand(order.total)}
              </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <Link
                                to="/order-tracking"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                            >
                                Track order
                                <span className="material-symbols-outlined text-[18px]">
                  local_shipping
                </span>
                            </Link>

                            <Link
                                to="/open-dispute"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#efc5bd] bg-white px-6 py-4 text-sm font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                            >
                                Report a problem
                                <span className="material-symbols-outlined text-[18px]">
                  report
                </span>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
              shield_locked
            </span>

                        <h2 className="mb-2 text-xl font-black">Buyer Protection active</h2>

                        <p className="text-sm leading-7 text-white/70">
                            Seller payout is only released after delivery or collection is
                            confirmed. Check each item carefully before confirming receipt.
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
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#003527]">
              password
            </span>

                        <h2 className="mb-2 text-lg font-black text-[#121c2a]">
                            Delivery confirmation
                        </h2>

                        <p className="text-sm leading-7 text-[#405049]">
                            Your delivery confirmation code will be used when the order is
                            handed over. Only share it after checking the item.
                        </p>

                        <Link
                            to="/delivery-confirmation"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            View confirmation process
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </section>
                </aside>
            </div>

            <MobileOrderActions />

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

// Stat tiles summarize the order before buyers dive into package-level details.
function OrderStat({ icon, label, value }) {
    return (
        <article className="p-5 md:p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[22px]">
          {icon}
        </span>
            </div>

            <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {value}
            </p>

            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                {label}
            </p>
        </article>
    );
}

// Timeline items show the protected payment journey without exposing backend internals.
function TimelineItem({ step, isLast }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
        <span
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                step.complete
                    ? "bg-[#003527] text-white"
                    : step.active
                        ? "bg-[#fff8e5] text-[#8a5a00]"
                        : "bg-[#f8fbf9] text-[#8b9791]"
            }`}
        >
          <span className="material-symbols-outlined icon-fill text-[22px]">
            {step.complete ? "check" : step.icon}
          </span>
        </span>

                {!isLast && <span className="mt-2 h-full w-px bg-[#dbe6e1]" />}
            </div>

            <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-black text-[#121c2a]">{step.title}</h3>

                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
            {step.time}
          </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {step.description}
                </p>
            </div>
        </div>
    );
}

// Package detail cards keep seller-specific items, tracking, and actions together.
function PackageDetails({ sellerPackage }) {
    return (
        <article className="overflow-hidden rounded-[24px] border border-[#dbe6e1]">
            <header className="flex flex-col gap-4 border-b border-[#e5ece8] bg-[#fbfdfc] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#003527] text-sm font-black text-white">
            {sellerPackage.seller.charAt(0)}
          </span>

                    <div className="min-w-0">
                        <h3 className="truncate font-black text-[#121c2a]">
                            {sellerPackage.seller}
                        </h3>

                        <p className="text-xs font-semibold text-[#66736d]">
                            {sellerPackage.status} • Estimated {sellerPackage.estimatedArrival}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Link
                        to={sellerPackage.storeTo}
                        className="inline-flex items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
            <span className="material-symbols-outlined text-[14px]">
              storefront
            </span>
                        View store
                    </Link>

                    <Link
                        to={sellerPackage.trackingTo}
                        className="inline-flex items-center gap-1 rounded-full bg-[#003527] px-3 py-1.5 text-xs font-black text-white transition hover:bg-[#064e3b]"
                    >
                        Track package
                    </Link>
                </div>
            </header>

            <div className="p-5">
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

                <div className="divide-y divide-[#e5ece8]">
                    {sellerPackage.items.map((item) => (
                        <OrderItemRow key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </article>
    );
}

// Item rows keep product metadata compact inside each seller package.
function OrderItemRow({ item }) {
    return (
        <div className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <Link
                to={`/products/${item.id}`}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#f0faf6]"
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                />
            </Link>

            <div className="min-w-0 flex-1">
                <Link
                    to={`/products/${item.id}`}
                    className="block font-black text-[#121c2a] hover:text-[#003527]"
                >
                    {item.title}
                </Link>

                <p className="mt-1 text-xs font-bold text-[#66736d]">
                    {item.size} • {item.color} • {item.condition} • Qty {item.quantity}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-base font-black text-[#121c2a]">
            {formatRand(item.price * item.quantity)}
          </span>

                    {item.oldPrice && (
                        <span className="text-xs font-bold text-[#8b9791] line-through">
              {formatRand(item.oldPrice * item.quantity)}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// Centralize status badge styling so package states remain visually consistent.
function StatusBadge({ status, label }) {
    const styles = {
        processing: "bg-[#fff8e5] text-[#8a5a00]",
        delivered: "bg-[#f0faf6] text-[#087052]",
        attention: "bg-[#fff0ec] text-[#9f2d20]",
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

function SummaryRow({ label, value, positive = false }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span
                className={`text-right font-black ${
                    positive ? "text-[#087052]" : "text-[#121c2a]"
                }`}
            >
        {value}
      </span>
        </div>
    );
}

// Mobile action bar keeps tracking and delivery confirmation reachable after scrolling.
function MobileOrderActions() {
    return (
        <div className="no-print fixed inset-x-0 bottom-[var(--bottom-nav-height,77px)] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
                <Link
                    to="/order-tracking"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Track
                    <span className="material-symbols-outlined text-[18px]">
            local_shipping
          </span>
                </Link>

                <Link
                    to="/open-dispute"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-[#efc5bd] bg-white px-5 text-sm font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                >
                    Report issue
                </Link>
            </div>
        </div>
    );
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
