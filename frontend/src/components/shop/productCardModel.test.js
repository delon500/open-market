import assert from "node:assert/strict";
import test from "node:test";
import { createWishlistCardProduct } from "./productCardModel.js";

test("creates the shared product-card model for a wishlist item", () => {
    const product = createWishlistCardProduct(
        {
            id: "saved-shoes",
            title: "Saved shoes",
            seller: "Local Seller",
            price: 899,
            oldPrice: 1099,
            category: "Shoes",
            condition: "New",
            location: "Johannesburg",
            rating: 4.8,
            reviews: 42,
            delivery: "Courier",
            inStock: true,
            badge: "Price dropped",
            image: "/saved-shoes.jpg",
        },
        "Saved yesterday"
    );

    assert.deepEqual(product, {
        id: "saved-shoes",
        title: "Saved shoes",
        seller: "Local Seller",
        sellerInitial: "L",
        sellerColor: "#003527",
        verified: true,
        price: "R 899",
        previousPrice: "R 1,099",
        category: "Shoes",
        condition: "New",
        location: "Johannesburg",
        rating: 4.8,
        reviews: 42,
        delivery: "Courier",
        image: "/saved-shoes.jpg",
        imageBg: "#f0faf6",
        inStock: true,
        wishlistBadge: "Price dropped",
        savedLabel: "Saved yesterday",
    });
});
