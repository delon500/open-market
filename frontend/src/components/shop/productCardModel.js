function formatRand(amount) {
    return `R ${amount.toLocaleString("en-US")}`;
}

// Adapts buyer wishlist data to the product shape shared by marketplace cards.
export function createWishlistCardProduct(item, savedLabel) {
    return {
        id: item.id,
        title: item.title,
        seller: item.seller,
        sellerInitial: item.seller.trim().charAt(0).toUpperCase(),
        sellerColor: "#003527",
        verified: true,
        price: formatRand(item.price),
        previousPrice: item.oldPrice ? formatRand(item.oldPrice) : null,
        category: item.category,
        condition: item.condition,
        location: item.location,
        rating: item.rating,
        reviews: item.reviews,
        delivery: item.delivery,
        image: item.image,
        imageBg: "#f0faf6",
        inStock: item.inStock,
        wishlistBadge: item.badge,
        savedLabel,
    };
}
