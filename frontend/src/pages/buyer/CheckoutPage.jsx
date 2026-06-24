import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype checkout basket; later this should come from the cart/checkout API.
const checkoutItems = [
    {
        id: "classic-white-sneakers",
        title: "Classic white everyday sneakers",
        seller: "Kasi Kicks",
        price: 899,
        oldPrice: 1099,
        quantity: 1,
        size: "UK 8",
        color: "White",
        deliveryFrom: 60,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "neutral-cotton-hoodie",
        title: "Oversized neutral cotton hoodie",
        seller: "Urban Thread",
        price: 549,
        oldPrice: 699,
        quantity: 2,
        size: "Large",
        color: "Stone",
        deliveryFrom: 80,
        image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: "canvas-weekender-bag",
        title: "Canvas weekender bag",
        seller: "Local Carry",
        price: 499,
        oldPrice: 650,
        quantity: 1,
        size: "Standard",
        color: "Olive",
        deliveryFrom: 70,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
];

// Saved addresses mirror the address book choices used elsewhere in the buyer account.
const savedAddresses = [
    {
        id: "home",
        label: "Home",
        recipient: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        line1: "24 Vilakazi Street",
        line2: "Orlando West",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "1804",
        instructions: "Call when arriving at the gate.",
        isDefault: true,
    },
    {
        id: "campus",
        label: "Campus",
        recipient: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        line1: "University Road",
        line2: "Main campus entrance",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "2092",
        instructions: "Meet at reception.",
        isDefault: false,
    },
];

// Delivery choices are shared by the delivery section and the order summary math.
const deliveryOptions = [
    {
        id: "courier",
        title: "Courier delivery",
        description: "Deliver each seller package to your selected address.",
        icon: "local_shipping",
        helper: "Best for multi-seller orders",
    },
    {
        id: "collection",
        title: "Click & Collect",
        description: "Collect from seller pickup locations when available.",
        icon: "storefront",
        helper: "No delivery fee",
    },
];

// Payment choices stay local while the real payment provider flow is still a prototype.
const paymentMethods = [
    {
        id: "card",
        title: "Card payment",
        description: "Pay securely with debit or credit card.",
        icon: "credit_card",
    },
    {
        id: "eft",
        title: "Instant EFT",
        description: "Pay using supported South African bank transfer.",
        icon: "account_balance",
    },
];

export default function CheckoutPage() {
    const [selectedAddressId, setSelectedAddressId] = useState("home");
    const [deliveryMethod, setDeliveryMethod] = useState("courier");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [orderNote, setOrderNote] = useState("");
    const [confirmChecked, setConfirmChecked] = useState(false);

    // Grouping by seller lets checkout explain multi-seller delivery before payment.
    const sellerGroups = useMemo(() => groupItemsBySeller(checkoutItems), []);

    const selectedAddress = savedAddresses.find(
        (address) => address.id === selectedAddressId
    );

    // Keep totals derived from the basket so summary values stay in sync with item data.
    const subtotal = checkoutItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const savings = checkoutItems.reduce((total, item) => {
        if (!item.oldPrice) return total;
        return total + (item.oldPrice - item.price) * item.quantity;
    }, 0);

    const deliveryFee =
        deliveryMethod === "courier"
            ? sellerGroups.reduce((total, group) => total + group.deliveryFrom, 0)
            : 0;

    const serviceFee = Math.round(subtotal * 0.015);
    const total = subtotal + deliveryFee + serviceFee;
    const itemCount = checkoutItems.reduce((count, item) => count + item.quantity, 0);

    // The checkout CTA stays disabled until the buyer confirms the key order details.
    const canPlaceOrder = Boolean(
        selectedAddress && deliveryMethod && paymentMethod && confirmChecked
    );

    return (
        <div className="space-y-8 pb-28 md:pb-12">
            <BuyerPageHeader
                eyebrow="Checkout"
                title="Confirm your order"
                description="Choose your delivery details, payment method, and review each seller package before placing your order."
                actions={
                    <Link
                        to="/cart"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
                        Back to cart
                    </Link>
                }
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-6 xl:col-span-8">
                    <CheckoutSection
                        number="1"
                        title="Delivery address"
                        description="Select where this order should be delivered."
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {savedAddresses.map((address) => (
                                <AddressOption
                                    key={address.id}
                                    address={address}
                                    active={selectedAddressId === address.id}
                                    onSelect={() => setSelectedAddressId(address.id)}
                                />
                            ))}
                        </div>

                        <Link
                            to="/account/addresses"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#003527] hover:underline"
                        >
                            Manage saved addresses
                            <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
                        </Link>
                    </CheckoutSection>

                    <CheckoutSection
                        number="2"
                        title="Delivery method"
                        description="Choose how you want to receive the order."
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {deliveryOptions.map((option) => (
                                <ChoiceCard
                                    key={option.id}
                                    option={option}
                                    active={deliveryMethod === option.id}
                                    onSelect={() => setDeliveryMethod(option.id)}
                                />
                            ))}
                        </div>
                    </CheckoutSection>

                    <CheckoutSection
                        number="3"
                        title="Payment method"
                        description="Payment stays protected until delivery or collection is confirmed."
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {paymentMethods.map((method) => (
                                <ChoiceCard
                                    key={method.id}
                                    option={method}
                                    active={paymentMethod === method.id}
                                    onSelect={() => setPaymentMethod(method.id)}
                                />
                            ))}
                        </div>
                    </CheckoutSection>

                    <CheckoutSection
                        number="4"
                        title="Seller packages"
                        description="Your order is grouped by seller so delivery and confirmation stay clear."
                    >
                        <div className="space-y-4">
                            {sellerGroups.map((group) => (
                                <SellerPackage
                                    key={group.seller}
                                    group={group}
                                    deliveryMethod={deliveryMethod}
                                />
                            ))}
                        </div>
                    </CheckoutSection>

                    <CheckoutSection
                        number="5"
                        title="Order note"
                        description="Add a short note for delivery or collection."
                    >
            <textarea
                value={orderNote}
                onChange={(event) => setOrderNote(event.target.value)}
                maxLength={180}
                rows={4}
                placeholder="Example: Please call before delivery."
                className="buyer-input resize-none"
            />

                        <p className="mt-2 text-right text-xs font-bold text-[#66736d]">
                            {orderNote.length}/180
                        </p>
                    </CheckoutSection>
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)] xl:sticky xl:top-24">
                        <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                            Order summary
                        </h2>

                        <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                            <SummaryRow label="Items" value={`${itemCount}`} />
                            <SummaryRow label="Subtotal" value={formatRand(subtotal)} />
                            <SummaryRow
                                label="Delivery"
                                value={deliveryFee === 0 ? "Free" : formatRand(deliveryFee)}
                            />
                            <SummaryRow label="Service fee" value={formatRand(serviceFee)} />
                            {savings > 0 && (
                                <SummaryRow
                                    label="Product savings"
                                    value={`- ${formatRand(savings)}`}
                                    positive
                                />
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
              <span className="text-base font-black text-[#121c2a]">
                Total to pay
              </span>

                            <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                {formatRand(total)}
              </span>
                        </div>

                        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-4">
                            <input
                                type="checkbox"
                                checked={confirmChecked}
                                onChange={(event) => setConfirmChecked(event.target.checked)}
                                className="mt-1 h-4 w-4 accent-[#003527]"
                            />

                            <span className="text-xs font-bold leading-5 text-[#404944]">
                I confirm that my delivery details are correct and I understand
                payment will only be released after delivery or collection is
                confirmed.
              </span>
                        </label>

                        <Link
                            to={canPlaceOrder ? "/payment-processing" : "#"}
                            aria-disabled={!canPlaceOrder}
                            onClick={(event) => {
                                if (!canPlaceOrder) event.preventDefault();
                            }}
                            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black shadow-[0_8px_24px_rgba(0,53,39,.22)] transition ${
                                canPlaceOrder
                                    ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                                    : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                            }`}
                        >
                            Place order
                            <span className="material-symbols-outlined text-[18px]">
                lock
              </span>
                        </Link>

                        <p className="mt-4 text-center text-xs leading-5 text-[#66736d]">
                            This is frontend-only for now. Later this action will create the
                            order and start payment processing.
                        </p>
                    </section>

                    <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">
              shield_locked
            </span>

                        <h2 className="mb-2 text-xl font-black">Buyer Protection</h2>

                        <p className="text-sm leading-7 text-white/70">
                            Payment is protected until the buyer confirms the order was
                            delivered or collected. If something goes wrong, the buyer can open
                            a dispute.
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
                </aside>
            </div>

            <MobilePlaceOrderBar total={total} canPlaceOrder={canPlaceOrder} />

            <style>{`
        .buyer-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: #f8fbf9;
          padding: 14px 16px;
          color: #121c2a;
          font-size: 14px;
          font-weight: 700;
          outline: none;
          transition: border-color .18s, background .18s, box-shadow .18s;
        }

        .buyer-input:focus {
          border-color: #003527;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 53, 39, .10);
        }

        .buyer-input::placeholder {
          color: #9aada7;
        }
      `}</style>
        </div>
    );
}

// Numbered sections preserve the buyer's mental model of checkout progress.
function CheckoutSection({ number, title, description, children }) {
    return (
        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
            <div className="mb-5 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-sm font-black text-white">
          {number}
        </span>

                <div>
                    <h2 className="text-xl font-black text-[#121c2a]">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#66736d]">
                        {description}
                    </p>
                </div>
            </div>

            {children}
        </section>
    );
}

// Address cards behave like selectable options while still showing delivery context.
function AddressOption({ address, active, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`rounded-[24px] border p-5 text-left transition ${
                active
                    ? "border-[#003527] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.08)]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba]"
            }`}
        >
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-black text-[#121c2a]">{address.label}</h3>

                        {address.isDefault && (
                            <span className="rounded-full bg-[#fff8e5] px-2.5 py-1 text-[11px] font-black text-[#8a5a00]">
                Default
              </span>
                        )}
                    </div>

                    <p className="mt-1 text-sm font-bold text-[#66736d]">
                        {address.recipient}
                    </p>
                </div>

                <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        active
                            ? "border-[#003527] bg-[#003527] text-white"
                            : "border-[#bfc9c3] bg-white"
                    }`}
                >
          {active && (
              <span className="material-symbols-outlined text-[15px]">
              check
            </span>
          )}
        </span>
            </div>

            <p className="text-sm leading-6 text-[#404944]">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
                <br />
                {address.city}, {address.province}, {address.postalCode}
            </p>

            <p className="mt-3 text-xs font-bold text-[#66736d]">{address.phone}</p>
        </button>
    );
}

// Reused for delivery and payment choices because both share the same card behavior.
function ChoiceCard({ option, active, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`rounded-[24px] border p-5 text-left transition ${
                active
                    ? "border-[#003527] bg-[#f0faf6] shadow-[0_8px_24px_rgba(0,53,39,.08)]"
                    : "border-[#dbe6e1] bg-white hover:border-[#95d3ba]"
            }`}
        >
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#003527]">
          <span className="material-symbols-outlined icon-fill">
            {option.icon}
          </span>
                </div>

                <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        active
                            ? "border-[#003527] bg-[#003527] text-white"
                            : "border-[#bfc9c3] bg-white"
                    }`}
                >
          {active && (
              <span className="material-symbols-outlined text-[15px]">
              check
            </span>
          )}
        </span>
            </div>

            <h3 className="font-black text-[#121c2a]">{option.title}</h3>

            <p className="mt-1 text-sm leading-6 text-[#66736d]">
                {option.description}
            </p>

            {option.helper && (
                <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[#003527]">
                    {option.helper}
                </p>
            )}
        </button>
    );
}

// Seller packages make multi-vendor checkout explicit before the buyer pays.
function SellerPackage({ group, deliveryMethod }) {
    return (
        <article className="overflow-hidden rounded-[24px] border border-[#dbe6e1]">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5ece8] bg-[#fbfdfc] px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003527] text-sm font-black text-white">
            {group.seller.charAt(0)}
          </span>

                    <div className="min-w-0">
                        <h3 className="truncate font-black text-[#121c2a]">
                            {group.seller}
                        </h3>
                        <p className="text-xs font-semibold text-[#66736d]">
                            {group.itemCount} item{group.itemCount === 1 ? "" : "s"}
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
          {deliveryMethod === "courier"
              ? `Delivery R${group.deliveryFrom}`
              : "Collection"}
        </span>
            </header>

            <div className="divide-y divide-[#e5ece8]">
                {group.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <Link
                                to={`/products/${item.id}`}
                                className="block truncate font-black text-[#121c2a] hover:text-[#003527]"
                            >
                                {item.title}
                            </Link>

                            <p className="mt-1 text-xs font-bold text-[#66736d]">
                                {item.size} • {item.color} • Qty {item.quantity}
                            </p>

                            <p className="mt-2 text-sm font-black text-[#003527]">
                                {formatRand(item.price * item.quantity)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}

function SummaryRow({ label, value, positive = false }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span
                className={`font-black ${
                    positive ? "text-[#087052]" : "text-[#121c2a]"
                }`}
            >
        {value}
      </span>
        </div>
    );
}

// Fixed mobile bar keeps the final action reachable after long checkout sections.
function MobilePlaceOrderBar({ total, canPlaceOrder }) {
    return (
        <div className="fixed inset-x-0 bottom-[73px] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase text-[#66736d]">
                        Total to pay
                    </p>

                    <p className="text-xl font-black text-[#121c2a]">
                        {formatRand(total)}
                    </p>
                </div>

                <Link
                    to={canPlaceOrder ? "/payment-processing" : "#"}
                    aria-disabled={!canPlaceOrder}
                    onClick={(event) => {
                        if (!canPlaceOrder) event.preventDefault();
                    }}
                    className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black shadow-[0_8px_20px_rgba(0,53,39,.20)] transition ${
                        canPlaceOrder
                            ? "bg-[#003527] text-white hover:bg-[#064e3b]"
                            : "cursor-not-allowed bg-[#d8e2dd] text-[#7c8b84]"
                    }`}
                >
                    Place order
                    <span className="material-symbols-outlined text-[18px]">
            lock
          </span>
                </Link>
            </div>
        </div>
    );
}

// Convert cart items into seller-level packages for delivery fees and review.
function groupItemsBySeller(items) {
    const groups = new Map();

    items.forEach((item) => {
        const currentGroup = groups.get(item.seller) ?? {
            seller: item.seller,
            itemCount: 0,
            deliveryFrom: item.deliveryFrom,
            items: [],
        };

        currentGroup.items.push(item);
        currentGroup.itemCount += item.quantity;
        currentGroup.deliveryFrom = Math.min(
            currentGroup.deliveryFrom,
            item.deliveryFrom
        );

        groups.set(item.seller, currentGroup);
    });

    return Array.from(groups.values());
}

// Keep prototype currency formatting aligned with South African Rand display.
function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}
