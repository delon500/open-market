// Keeps the store details page-specific motion, toolbar, and control styles out of the page coordinator.
export default function StoreDetailsStyles() {
    return (
        <style>{`
            .store-hero {
                position: relative;
                overflow: hidden;
                background-color: #003527;
                background-image:
                    linear-gradient(135deg, rgba(0,53,39,0.97) 0%, rgba(0,53,39,0.85) 50%, rgba(0,80,55,0.75) 100%),
                    radial-gradient(circle at top left, rgba(149,211,186,0.28) 0%, transparent 45%),
                    radial-gradient(circle at 85% 15%, rgba(254,214,91,0.18) 0%, transparent 35%);
            }

            .filter-chip {
                flex-shrink: 0;
                border-radius: 999px;
                padding: 8px 16px;
                font-size: 13px;
                font-weight: 800;
                border: 1.5px solid #dbe6e1;
                background: white;
                color: #404944;
                transition: background .15s, color .15s, border-color .15s, transform .1s, box-shadow .15s;
                white-space: nowrap;
                -webkit-tap-highlight-color: transparent;
            }

            .filter-chip:hover {
                border-color: #003527;
                color: #003527;
                box-shadow: 0 2px 8px rgba(0,53,39,0.1);
            }

            .filter-chip.active {
                background: #003527;
                border-color: #003527;
                color: white;
                box-shadow: 0 4px 12px rgba(0,53,39,0.25);
            }

            .filter-chip:active {
                transform: scale(.93);
            }

            .product-card {
                border-radius: 20px;
                border: 1.5px solid #e8eeeb;
                background: white;
                overflow: hidden;
                box-shadow: 0 2px 12px rgba(0,53,39,0.06);
                transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
                -webkit-tap-highlight-color: transparent;
            }

            .product-card:hover {
                transform: translateY(-3px);
                border-color: #95d3ba;
                box-shadow: 0 12px 32px rgba(0,53,39,0.12);
            }

            .product-card img {
                transition: transform .5s ease;
            }

            .product-card:hover img {
                transform: scale(1.05);
            }

            .card-cart-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                border-radius: 12px;
                background: #003527;
                color: white;
                padding: 10px 14px;
                font-size: 13px;
                font-weight: 900;
                border: none;
                cursor: pointer;
                transition: background .15s, transform .1s;
                white-space: nowrap;
                flex: 1;
                -webkit-tap-highlight-color: transparent;
            }

            .card-cart-btn:hover {
                background: #064e3b;
            }

            .wishlist-btn {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px;
                border: 1.5px solid #dbe6e1;
                background: white;
                color: #66736d;
                cursor: pointer;
                transition: border-color .15s, color .15s, background .15s;
                flex-shrink: 0;
                -webkit-tap-highlight-color: transparent;
            }

            .wishlist-btn:hover,
            .wishlist-btn.saved {
                border-color: #fca5a5;
                color: #e53e3e;
                background: #fff5f5;
            }

            .btn-primary-sidebar,
            .btn-secondary-sidebar {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                border-radius: 14px;
                padding: 14px 20px;
                font-size: 14px;
                font-weight: 900;
                transition: background .15s, box-shadow .15s, transform .1s, border-color .15s;
            }

            .btn-primary-sidebar {
                background: #003527;
                color: white;
                box-shadow: 0 4px 16px rgba(0,53,39,.25);
            }

            .btn-primary-sidebar:hover {
                background: #064e3b;
                box-shadow: 0 6px 20px rgba(0,53,39,.3);
            }

            .btn-secondary-sidebar {
                background: #f0f4f2;
                color: #003527;
                border: 1.5px solid #c8d8d2;
            }

            .btn-secondary-sidebar:hover {
                background: #e4ede8;
                border-color: #95d3ba;
            }

            .rating-bar-track {
                flex: 1;
                height: 7px;
                border-radius: 99px;
                background: #e8eeeb;
                overflow: hidden;
            }

            .rating-bar-fill {
                height: 100%;
                border-radius: 99px;
            }

            .sticky-toolbar {
                position: sticky;
                top: 57px;
                z-index: 30;
                background: #f0f4f2;
                padding: 10px 0 6px;
                margin-bottom: 4px;
            }

            @media (min-width: 768px) {
                .sticky-toolbar {
                    top: 65px;
                }
            }

            @media (max-width: 1023px) {
                .mobile-pad {
                    padding-bottom: 130px;
                }

                .mobile-products-first {
                    order: -1;
                }

                .mobile-sidebar-hide {
                    display: none;
                }
            }

            @keyframes storeFadeUp {
                from {
                    opacity: 0;
                    transform: translateY(12px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .fade-up {
                animation: storeFadeUp .38s ease both;
            }
        `}</style>
    );
}
