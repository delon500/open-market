import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BuyerProtectionCard from "../../components/product/BuyerProtectionCard";
import MobileAddToCart from "../../components/product/MobileAddToCart";
import ProductBreadcrumb from "../../components/product/ProductBreadcrumb";
import ProductGallery from "../../components/product/ProductGallery";
import ProductLightbox from "../../components/product/ProductLightbox";
import ProductTabs from "../../components/product/ProductTabs";
import PurchasePanel from "../../components/product/PurchasePanel";
import RelatedProducts from "../../components/product/RelatedProducts";
import SellerCard from "../../components/product/SellerCard";
import {
    outOfStockProductSizes,
    productDetailsProducts,
    productSizes,
    relatedProductDetails,
} from "../../data/productDetails";
import PublicLayout from "../../layouts/PublicLayout";

// Coordinates product page state while child components own each visual section.
export default function ProductDetailsPage() {
    const { productId } = useParams();
    const product = useMemo(
        () =>
            productDetailsProducts.find((item) => item.id === productId) ||
            productDetailsProducts[0],
        [productId]
    );

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.selectedSize);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [saved, setSaved] = useState(false);
    const [added, setAdded] = useState(false);
    const [shareToast, setShareToast] = useState(false);

    const instalment = (product.price / 3).toFixed(2);

    function moveImage(direction) {
        setActiveImageIndex((current) => {
            const next = current + direction;

            if (next < 0) return product.images.length - 1;
            if (next >= product.images.length) return 0;

            return next;
        });
    }

    function handleSelectSize(size) {
        if (outOfStockProductSizes.includes(size)) return;
        setSelectedSize(size);
    }

    function handleQuantityChange(direction) {
        setQuantity((current) => {
            const next = current + direction;
            if (next < 1) return 1;
            if (next > product.stock) return product.stock;
            return next;
        });
    }

    function handleAddToCart() {
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1600);
    }

    async function handleShare() {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.title,
                    url,
                });
            } catch {
                return;
            }
        } else {
            await navigator.clipboard.writeText(url);
            setShareToast(true);

            setTimeout(() => {
                setShareToast(false);
            }, 2200);
        }
    }

    return (
        <PublicLayout>
            <main className="bg-[#f8f9ff] pb-36 md:pb-16">
                <ProductBreadcrumb product={product} />

                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 md:px-10 lg:grid-cols-12 lg:py-12">
                    <div className="lg:col-span-7">
                        <ProductGallery
                            product={product}
                            activeImageIndex={activeImageIndex}
                            setActiveImageIndex={setActiveImageIndex}
                            moveImage={moveImage}
                            openLightbox={() => setLightboxOpen(true)}
                        />

                        <ProductTabs
                            product={product}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="sticky top-28 space-y-4">
                            <PurchasePanel
                                product={product}
                                sizes={productSizes}
                                outOfStockSizes={outOfStockProductSizes}
                                selectedSize={selectedSize}
                                quantity={quantity}
                                saved={saved}
                                added={added}
                                instalment={instalment}
                                onShare={handleShare}
                                onSelectSize={handleSelectSize}
                                onQuantityChange={handleQuantityChange}
                                onAddToCart={handleAddToCart}
                                onToggleSaved={() => setSaved((current) => !current)}
                                onReviewClick={() => setActiveTab("reviews")}
                            />

                            <SellerCard seller={product.seller} />

                            <BuyerProtectionCard />
                        </div>
                    </aside>
                </section>

                <RelatedProducts product={product} items={relatedProductDetails} />

                <MobileAddToCart
                    product={product}
                    selectedSize={selectedSize}
                    quantity={quantity}
                    added={added}
                    onAddToCart={handleAddToCart}
                />

                {lightboxOpen && (
                    <ProductLightbox
                        product={product}
                        activeImageIndex={activeImageIndex}
                        setActiveImageIndex={setActiveImageIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}

                {shareToast && (
                    <div className="fixed bottom-24 left-1/2 z-[99] -translate-x-1/2 rounded-full bg-[#121c2a] px-5 py-2 text-xs font-bold text-white shadow-lg">
                        Link copied!
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}
