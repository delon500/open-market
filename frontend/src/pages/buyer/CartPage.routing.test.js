import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("CartPage delegates its outer shell to BuyerLayout", async () => {
    const source = await readFile(new URL("./CartPage.jsx", import.meta.url), "utf8");

    assert.doesNotMatch(source, /import PublicLayout/);
    assert.doesNotMatch(source, /<\/?PublicLayout/);
    assert.match(source, /<div className="space-y-8 pb-44 md:pb-12">/);
});

test("the only cart route is nested inside BuyerLayout", async () => {
    const source = await readFile(
        new URL("../../routes/AppRoutes.jsx", import.meta.url),
        "utf8"
    );
    // Slice the buyer route group so this guard catches both duplicate routes and layout regressions.
    const buyerLayoutStart = source.indexOf('<Route element={<BuyerLayout />}>');
    const buyerLayoutEnd = source.indexOf("</Route>", buyerLayoutStart);
    const buyerRoutes = source.slice(buyerLayoutStart, buyerLayoutEnd);
    const cartRoutes = source.match(/path="\/cart"/g) ?? [];

    assert.notEqual(buyerLayoutStart, -1, "Expected a BuyerLayout route group");
    assert.match(buyerRoutes, /path="\/cart"/);
    assert.equal(cartRoutes.length, 1);
});
