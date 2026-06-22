// Keeps marketplace grouping and totals independent from the cart presentation.
export function groupCartItemsBySeller(items) {
    const groupsBySeller = new Map();

    items.forEach((item) => {
        const existingGroup = groupsBySeller.get(item.seller);

        if (existingGroup) {
            existingGroup.items.push(item);
            existingGroup.itemCount += item.quantity;
            existingGroup.subtotal += item.price * item.quantity;
            return;
        }

        groupsBySeller.set(item.seller, {
            seller: item.seller,
            itemCount: item.quantity,
            subtotal: item.price * item.quantity,
            items: [item],
        });
    });

    return Array.from(groupsBySeller.values());
}

export function calculateCartTotals(items, promoApplied) {
    const totals = items.reduce(
        (current, item) => {
            const itemSubtotal = item.price * item.quantity;
            const itemSavings = item.oldPrice
                ? (item.oldPrice - item.price) * item.quantity
                : 0;

            return {
                subtotal: current.subtotal + itemSubtotal,
                savings: current.savings + itemSavings,
            };
        },
        { subtotal: 0, savings: 0 }
    );

    const promoDiscount = promoApplied
        ? Math.round(totals.subtotal * 0.05)
        : 0;

    return {
        ...totals,
        promoDiscount,
        total: totals.subtotal - promoDiscount,
    };
}

// Delivery is still confirmed at checkout; this only surfaces the lowest quoted starting fee.
export function getLowestDeliveryEstimate(items) {
    const estimates = items
        .map((item) => item.deliveryFrom)
        .filter((estimate) => Number.isFinite(estimate));

    return estimates.length > 0 ? Math.min(...estimates) : null;
}
