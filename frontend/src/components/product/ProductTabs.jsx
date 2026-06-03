import ProductReviews from "./ProductReviews";

// Owns the description, details, and reviews tab surface for the product page.
export default function ProductTabs({ product, activeTab, setActiveTab }) {
    return (
        <div className="mt-6 rounded-[24px] border border-[#dbe6e1] bg-white shadow-[0_4px_20px_-4px_rgba(0,53,39,0.06)]">
            <div className="flex overflow-x-auto border-b border-[#e6eeff]">
                <TabButton
                    label="Description"
                    active={activeTab === "description"}
                    onClick={() => setActiveTab("description")}
                />
                <TabButton
                    label="Details"
                    active={activeTab === "details"}
                    onClick={() => setActiveTab("details")}
                />
                <TabButton
                    active={activeTab === "reviews"}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews
                    <span className="ml-1 rounded-full bg-[#e8f5ee] px-2 py-0.5 text-[11px] font-extrabold text-[#003527]">
                        {product.reviewCount}
                    </span>
                </TabButton>
            </div>

            <div className="p-6">
                {activeTab === "description" && (
                    <div>
                        <p className="mb-4 text-sm leading-7 text-[#404944]">
                            {product.description}
                        </p>

                        <ul className="space-y-2 text-sm text-[#404944]">
                            {product.highlights.map((highlight) => (
                                <li key={highlight} className="flex items-start gap-2">
                                    <span className="material-symbols-outlined icon-fill mt-0.5 text-[16px] text-[#003527]">
                                        check_circle
                                    </span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === "details" && <ProductDetailsTable />}

                {activeTab === "reviews" && <ProductReviews />}
            </div>
        </div>
    );
}

function TabButton({ label, active, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-bold transition ${
                active
                    ? "border-[#003527] text-[#003527]"
                    : "border-transparent text-[#66736d] hover:text-[#003527]"
            }`}
        >
            {children || label}
        </button>
    );
}

function ProductDetailsTable() {
    const details = [
        ["Condition", "New"],
        ["Category", "Sneakers"],
        ["Material", "Synthetic / Rubber"],
        ["Colour", "Black"],
        ["Gender", "Unisex"],
        ["Weight", "~320 g per shoe"],
        ["SKU", "KSC-BLK-001"],
        ["Listed", "May 2026"],
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            {details.map(([label, value]) => (
                <div
                    key={label}
                    className="flex justify-between border-b border-[#f0f4f8] py-3"
                >
                    <span className="text-sm font-bold text-[#9aada7]">{label}</span>
                    <span className="text-sm font-bold text-[#121c2a]">{value}</span>
                </div>
            ))}
        </div>
    );
}
