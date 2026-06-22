import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";
import {
    calculateCartTotals,
    getLowestDeliveryEstimate,
    groupCartItemsBySeller,
} from "./cartModel";

// Prototype inventory keeps all cart interactions usable until API-backed cart data is connected.
const initialCartItems = [
    {
        id: "classic-white-sneakers",
        title: "Classic white everyday sneakers",
        seller: "Kasi Kicks",
        price: 899,
        oldPrice: 1099,
        quantity: 1,
        maxQuantity: 3,
        size: "UK 8",
        color: "White",
        condition: "New",
        location: "Soweto, Johannesburg",
        delivery: "Courier or Click & Collect",
        deliveryFrom: 60,
        inStock: true,
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
        maxQuantity: 5,
        size: "Large",
        color: "Stone",
        condition: "New",
        location: "Braamfontein, Johannesburg",
        delivery: "Courier delivery",
        deliveryFrom: 80,
        inStock: true,
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
        maxQuantity: 2,
        size: "Standard",
        color: "Olive",
        condition: "New",
        location: "Pretoria, Gauteng",
        delivery: "Courier delivery",
        deliveryFrom: 70,
        inStock: true,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },
];

// Suggestions mirror the compact cross-sell panel without coupling it to the active cart state.
const recommendedProducts = [
    {
        id: "grey-cap",
        title: "Classic snapback cap",
        seller: "Kasi Kicks",
        price: 189,
        image:
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=120&q=80",
    },
    {
        id: "white-tee",
        title: "Essential white tee",
        seller: "Urban Thread",
        price: 229,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=120&q=80",
    },
    {
        id: "leather-belt",
        title: "Woven leather belt",
        seller: "Local Carry",
        price: 349,
        image:
            "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=120&q=80",
    },
];

const validPromoCodes = ["OPENMARKET5", "WELCOME5"];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [successNotice, setSuccessNotice] = useState(null);
    const [itemToRemove, setItemToRemove] = useState(null);

    const sellerGroups = useMemo(
        () => groupCartItemsBySeller(cartItems),
        [cartItems]
    );
    const { subtotal, savings, promoDiscount, total } = useMemo(
        () => calculateCartTotals(cartItems, promoApplied),
        [cartItems, promoApplied]
    );
    const lowestDeliveryEstimate = useMemo(
        () => getLowestDeliveryEstimate(cartItems),
        [cartItems]
    );
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    function updateQuantity(itemId, nextQuantity) {
        setCartItems((current) =>
            current.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity: Math.min(
                            Math.max(nextQuantity, 1),
                            item.maxQuantity
                        ),
                    }
                    : item
            )
        );
    }

    function confirmRemove() {
        if (!itemToRemove) return;

        setCartItems((current) =>
            current.filter((item) => item.id !== itemToRemove.id)
        );

        setSuccessNotice({
            title: `${itemToRemove.title} removed.`,
            body: "The item has been removed from your cart. You can add it back from the product page.",
        });
        setItemToRemove(null);
    }

    function moveToWishlist(item) {
        setCartItems((current) =>
            current.filter((cartItem) => cartItem.id !== item.id)
        );
        setSuccessNotice({
            title: `${item.title} saved to Wishlist.`,
            body: "We've moved this item to your Wishlist so you can come back to it anytime.",
        });
        setItemToRemove(null);
    }

    function handleApplyPromo(event) {
        event.preventDefault();

        const trimmedCode = promoCode.trim();

        if (!trimmedCode) {
            return;
        }

        if (validPromoCodes.includes(trimmedCode.toUpperCase())) {
            setPromoApplied(true);
            setPromoError("");
            setSuccessNotice({
                title: "Promo code applied!",
                body: "A 5% discount has been applied to your subtotal.",
            });
        } else {
            setPromoApplied(false);
            setPromoError("This promo code is invalid or has expired.");
        }
    }

    function clearCart() {
        setCartItems([]);
        setSuccessNotice({
            title: "Cart cleared.",
            body: "All items have been removed. Browse the shop to add new products.",
        });
    }

    return (
        <div className="space-y-8 pb-44 md:pb-12">
                <BuyerPageHeader
                    eyebrow="Shopping cart"
                    title="Review your cart"
                    description="Review items from each seller before confirming delivery and payment at checkout."
                    actions={
                        <>
                            <Link
                                to="/shop"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                Continue shopping
                            </Link>

                            {cartItems.length > 0 && (
                                <CartActionsMenu onClear={clearCart} />
                            )}
                        </>
                    }
                />

                {successNotice && (
                    <div className="flex items-start gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-5">
          <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[22px] text-[#003527]">
            check_circle
          </span>

                        <div className="min-w-0 flex-1">
                            <h2 className="mb-1 font-black text-[#003527]">
                                {successNotice.title}
                            </h2>

                            <p className="text-sm leading-7 text-[#003527]">
                                {successNotice.body}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSuccessNotice(null)}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white"
                            aria-label="Dismiss message"
                        >
            <span className="material-symbols-outlined text-[19px]">
              close
            </span>
                        </button>
                    </div>
                )}

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                        <section className="space-y-5 xl:col-span-8">
                            <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-black text-[#121c2a]">
                                            Cart items
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-[#66736d]">
                                            {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
                                        </p>
                                    </div>

                                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                  <span className="material-symbols-outlined icon-fill text-[15px]">
                    shield_locked
                  </span>
                  Protected checkout
                </span>
                                </div>
                            </div>

                            {sellerGroups.map((group) => (
                                <SellerCartGroup
                                    key={group.seller}
                                    group={group}
                                    onDecrease={(item) =>
                                        updateQuantity(item.id, item.quantity - 1)
                                    }
                                    onIncrease={(item) =>
                                        updateQuantity(item.id, item.quantity + 1)
                                    }
                                    onWishlist={moveToWishlist}
                                    onRemove={setItemToRemove}
                                />
                            ))}
                        </section>

                        <aside className="space-y-6 xl:col-span-4">
                            <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                                <h2 className="mb-5 text-xl font-black text-[#121c2a]">
                                    Order summary
                                </h2>

                                <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                    <SummaryRow label="Subtotal" value={formatRand(subtotal)} />
                                    <SummaryRow
                                        label="Delivery"
                                        value={
                                            lowestDeliveryEstimate === null
                                                ? "Calculated at checkout"
                                                : `From R${lowestDeliveryEstimate}`
                                        }
                                    />
                                    {savings > 0 && (
                                        <SummaryRow
                                            label="Product savings"
                                            value={`- ${formatRand(savings)}`}
                                            positive
                                        />
                                    )}
                                    {promoApplied && (
                                        <SummaryRow
                                            label="Promo discount"
                                            value={`- ${formatRand(promoDiscount)}`}
                                            positive
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between gap-4 border-b border-[#e5ece8] py-5">
                <span className="text-base font-black text-[#121c2a]">
                  Estimated total
                </span>
                                    <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                  {formatRand(total)}
                </span>
                                </div>

                                <form onSubmit={handleApplyPromo} className="mt-5">
                                    <label
                                        htmlFor="promoCode"
                                        className="mb-2 block text-sm font-black text-[#121c2a]"
                                    >
                                        Promo code
                                    </label>

                                    <div className="flex gap-2">
                                        <input
                                            id="promoCode"
                                            type="text"
                                            value={promoCode}
                                            onChange={(event) => {
                                                setPromoCode(event.target.value);
                                                if (promoError) setPromoError("");
                                            }}
                                            placeholder="Enter code"
                                            className={`buyer-input ${promoError ? "buyer-input-error" : ""}`}
                                            aria-invalid={Boolean(promoError)}
                                            aria-describedby={promoError ? "promoError" : undefined}
                                        />

                                        <button
                                            type="submit"
                                            className="shrink-0 rounded-2xl bg-[#003527] px-4 text-sm font-black text-white transition hover:bg-[#064e3b]"
                                        >
                                            Apply
                                        </button>
                                    </div>

                                    {promoError && (
                                        <p id="promoError" className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#9f2d20]">
                                            <span className="material-symbols-outlined text-[15px]">error</span>
                                            {promoError}
                                        </p>
                                    )}

                                    {promoApplied && !promoError && (
                                        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#087052]">
                                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                                            5% promo discount applied
                                        </p>
                                    )}
                                </form>

                                {sellerGroups.length > 1 && (
                                    <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-3.5">
                                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[17px] text-[#003527]">
                                        call_split
                                    </span>
                                        <p className="text-xs font-bold leading-5 text-[#404944]">
                                            Your items are from {sellerGroups.length} sellers. You'll confirm delivery and payment separately for each at checkout.
                                        </p>
                                    </div>
                                )}

                                <Link
                                    to="/checkout"
                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    Proceed to checkout
                                    <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
                                </Link>

                                <p className="mt-4 text-center text-xs leading-5 text-[#66736d]">
                                    Final delivery fees and address confirmation will be checked on
                                    the checkout page.
                                </p>
                            </section>

                            <RecommendedProducts products={recommendedProducts} />
                        </aside>
                    </div>
                ) : (
                    <EmptyCartState />
                )}

                {cartItems.length > 0 && (
                    <MobileCheckoutBar total={total} />
                )}

                {itemToRemove && (
                    <RemoveItemModal
                        item={itemToRemove}
                        onCancel={() => setItemToRemove(null)}
                        onConfirm={confirmRemove}
                        onWishlist={() => moveToWishlist(itemToRemove)}
                    />
                )}

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

        .buyer-input-error {
          border-color: #efc5bd;
          background: #fff8f6;
        }

        .buyer-input-error:focus {
          border-color: #9f2d20;
          box-shadow: 0 0 0 3px rgba(159, 45, 32, .10);
        }
      `}</style>
        </div>
    );
}

function CartActionsMenu({ onClear }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Match native menu behavior by closing on outside clicks and Escape.
    useEffect(() => {
        if (!isOpen) return undefined;

        function handlePointerDown(event) {
            if (!menuRef.current?.contains(event.target)) setIsOpen(false);
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex h-[50px] w-[50px] items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white text-[#003527] transition hover:bg-[#f0faf6]"
                aria-label="Cart actions"
                aria-expanded={isOpen}
                aria-haspopup="menu"
                title="Cart actions"
            >
                <span className="material-symbols-outlined">more_vert</span>
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-44 rounded-2xl border border-[#efc5bd] bg-white p-2 shadow-[0_16px_40px_rgba(18,28,42,.14)]"
                >
                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            onClear();
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-black text-[#9f2d20] transition hover:bg-[#fff0ec]"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                        Clear cart
                    </button>
                </div>
            )}
        </div>
    );
}

function SellerCartGroup({
    group,
    onDecrease,
    onIncrease,
    onWishlist,
    onRemove,
}) {
    return (
        <section className="overflow-hidden rounded-[28px] border border-[#dbe6e1] bg-white shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5ece8] bg-[#fbfdfc] px-5 py-4 md:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#003527] text-sm font-black text-white">
                        {group.seller.charAt(0)}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate font-black text-[#121c2a]">
                            {group.seller}
                        </p>
                        <p className="text-xs font-semibold text-[#66736d]">
                            {group.itemCount} item{group.itemCount === 1 ? "" : "s"}
                        </p>
                    </div>
                </div>

                <Link
                    to={`/stores/${toStoreSlug(group.seller)}`}
                    className="inline-flex items-center gap-1 rounded-full border border-[#dbe6e1] bg-white px-3 py-1.5 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]"
                >
                    <span className="material-symbols-outlined text-[14px]">storefront</span>
                    View store
                </Link>
            </header>

            <div className="divide-y divide-[#e5ece8]">
                {group.items.map((item) => (
                    <CartItemCard
                        key={item.id}
                        item={item}
                        onDecrease={() => onDecrease(item)}
                        onIncrease={() => onIncrease(item)}
                        onWishlist={() => onWishlist(item)}
                        onRemove={() => onRemove(item)}
                    />
                ))}
            </div>

            <div className="flex items-start gap-2 border-t border-[#e5ece8] bg-[#f0faf6] px-5 py-3.5 text-xs font-bold leading-5 text-[#315c50] md:px-6">
                <span className="material-symbols-outlined mt-0.5 text-[17px] text-[#003527]">
                    local_shipping
                </span>
                Delivery or collection is confirmed separately for this seller at checkout.
            </div>
        </section>
    );
}

function CartItemCard({
    item,
    onDecrease,
    onIncrease,
    onWishlist,
    onRemove,
}) {
    return (
        <article className="p-5 md:p-6">
            <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 md:grid-cols-[140px_minmax(0,1fr)_auto] md:gap-5">
                <Link
                    to={`/products/${item.id}`}
                    className="aspect-square overflow-hidden rounded-2xl bg-[#f0faf6] md:rounded-[22px]"
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                    />
                </Link>

                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f0faf6] px-2.5 py-1 text-[11px] font-black text-[#087052]">
              In stock
            </span>

                        <span className="rounded-full bg-[#fff8e5] px-2.5 py-1 text-[11px] font-black text-[#8a5a00]">
              {item.condition}
            </span>

                        {item.maxQuantity <= 2 && (
                            <span className="rounded-full bg-[#fff8e5] px-2.5 py-1 text-[11px] font-black text-[#8a5a00]">
                                Only {item.maxQuantity} left
                            </span>
                        )}
                    </div>

                    <Link
                        to={`/products/${item.id}`}
                        className="block text-base font-black leading-snug text-[#121c2a] transition hover:text-[#003527] md:text-lg"
                    >
                        {item.title}
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-[#66736d]">
                        <span>{item.size}</span>
                        <span>•</span>
                        <span>{item.color}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                    </div>

                    <p className="mt-2 hidden items-center gap-1 text-xs font-bold text-[#66736d] sm:inline-flex">
            <span className="material-symbols-outlined text-[17px] text-[#003527]">
              local_shipping
            </span>
                        {item.delivery}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-lg font-black text-[#121c2a] md:text-xl">
              {formatRand(item.price)}
            </span>

                        {item.oldPrice && (
                            <span className="text-xs font-bold text-[#8b9791] line-through">
                {formatRand(item.oldPrice)}
              </span>
                        )}
                    </div>
                </div>

                <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:w-40 md:flex-col md:items-end md:justify-between">
                    <div>
                        <div className="inline-flex items-center rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-1">
                            <button
                                type="button"
                                onClick={onDecrease}
                                disabled={item.quantity <= 1}
                                    className="flex h-11 w-11 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white disabled:cursor-not-allowed disabled:text-[#b8c4be]"
                                aria-label={`Decrease quantity for ${item.title}`}
                            >
                <span className="material-symbols-outlined text-[18px]">
                  remove
                </span>
                            </button>

                            <span className="w-10 text-center text-sm font-black text-[#121c2a]">
                {item.quantity}
              </span>

                            <button
                                type="button"
                                onClick={onIncrease}
                                disabled={item.quantity >= item.maxQuantity}
                                    className="flex h-11 w-11 items-center justify-center rounded-xl text-[#003527] transition hover:bg-white disabled:cursor-not-allowed disabled:text-[#b8c4be]"
                                aria-label={`Increase quantity for ${item.title}`}
                            >
                <span className="material-symbols-outlined text-[18px]">
                  add
                </span>
                            </button>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 md:flex-col md:items-end">
                        <p className="hidden text-sm font-black text-[#121c2a] md:block">
                            Item total: {formatRand(item.price * item.quantity)}
                        </p>

                        <button
                            type="button"
                            onClick={onWishlist}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-[#003527] transition hover:bg-[#f0faf6] md:h-auto md:w-auto md:gap-2 md:rounded-xl md:px-3 md:py-2 md:text-sm md:font-black"
                            aria-label={`Save ${item.title} to wishlist`}
                            title="Save for later"
                        >
                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                            <span className="hidden md:inline">Save for later</span>
                        </button>

                        <button
                            type="button"
                            onClick={onRemove}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-[#9f2d20] transition hover:bg-[#fff0ec] md:h-auto md:w-auto md:gap-2 md:rounded-xl md:px-3 md:py-2 md:text-sm md:font-black"
                            aria-label={`Remove ${item.title} from cart`}
                            title="Remove item"
                        >
              <span className="material-symbols-outlined text-[18px]">
                delete
              </span>
                            <span className="hidden md:inline">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function MobileCheckoutBar({ total }) {
    return (
        <div className="fixed inset-x-0 bottom-[73px] z-40 border-t border-[#dbe6e1] bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(18,28,42,.12)] backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase text-[#66736d]">
                        Estimated total
                    </p>
                    <p className="text-xl font-black text-[#121c2a]">
                        {formatRand(total)}
                    </p>
                </div>

                <Link
                    to="/checkout"
                    className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 text-sm font-black text-white shadow-[0_8px_20px_rgba(0,53,39,.20)] transition hover:bg-[#064e3b]"
                >
                    Proceed to checkout
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                    </span>
                </Link>
            </div>
        </div>
    );
}

function RecommendedProducts({ products }) {
    return (
        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
            <h2 className="mb-4 text-lg font-black text-[#121c2a]">
                You might also like
            </h2>

            <div className="space-y-3">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="group grid grid-cols-[68px_minmax(0,1fr)] gap-3 rounded-2xl border border-transparent p-2 transition hover:border-[#dbe6e1] hover:bg-[#f8fbf9]"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="aspect-square h-[68px] w-[68px] rounded-xl object-cover"
                        />
                        <div className="min-w-0 self-center">
                            <p className="truncate text-sm font-black text-[#121c2a] group-hover:text-[#003527]">
                                {product.title}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-[#66736d]">
                                {product.seller}
                            </p>
                            <p className="mt-1 text-sm font-black text-[#003527]">
                                {formatRand(product.price)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
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

function EmptyCartState() {
    return (
        <section className="rounded-[28px] border border-dashed border-[#bfc9c3] bg-white p-10 text-center">
      <span className="material-symbols-outlined mb-3 block text-[48px] text-[#9aada7]">
        shopping_bag
      </span>

            <h2 className="mb-2 text-2xl font-black tracking-[-0.035em] text-[#121c2a]">
                Your cart is empty
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-[#66736d]">
                Add products to your cart and return here when you are ready to
                checkout.
            </p>

            <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Browse products
                <span className="material-symbols-outlined text-[18px]">
          arrow_forward
        </span>
            </Link>
        </section>
    );
}

function RemoveItemModal({ item, onCancel, onConfirm, onWishlist }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#001a13]/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="removeItemTitle"
        >
            <button
                type="button"
                aria-label="Cancel removing cart item"
                className="absolute inset-0"
                onClick={onCancel}
            />

            <section className="relative w-full rounded-t-[30px] bg-white p-6 shadow-[0_-20px_60px_rgba(0,0,0,.2)] sm:max-w-md sm:rounded-[30px]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#9f2d20]">
          <span className="material-symbols-outlined icon-fill text-[24px]">
            delete
          </span>
                </div>

                <h2 id="removeItemTitle" className="text-xl font-black text-[#121c2a]">
                    Remove item from cart?
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#66736d]">
                    Remove <strong>{item.title}</strong> from your cart. You can add it
                    again from the product page.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={onWishlist}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                        Save to Wishlist instead
                    </button>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="inline-flex items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className="inline-flex items-center justify-center rounded-2xl bg-[#9f2d20] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#842318]"
                        >
                            Remove item
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function formatRand(amount) {
    return `R ${amount.toLocaleString("en-ZA")}`;
}

function toStoreSlug(seller) {
    return seller.toLowerCase().replace(/\s+/g, "-");
}
