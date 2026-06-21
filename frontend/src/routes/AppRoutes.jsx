import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import ShopPage from "../pages/public/ShopPage.jsx";
import StoresPage from "../pages/public/StoresPage";
import ProductDetailsPage from "../pages/public/ProductDetailsPage.jsx";
import StoreDetailsPage from "../pages/public/StoreDetailsPage";
import BecomeSellerPage from "../pages/public/BecomeSellerPage.jsx";
import HowItWorksPage from "../pages/public/HowItWorksPage.jsx";
import HelpCentrePage from "../pages/public/HelpCentrePage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import TrustSafetyPage from "../pages/public/TrustSafetyPage";
import TermsPage from "../pages/public/TermsPage.jsx";
import PrivacyPage from "../pages/public/PrivacyPage.jsx";
import ShippingPage from "../pages/public/ShippingPage.jsx";
import SellerPolicyPage from "../pages/public/SellerPolicyPage.jsx";
import SellerSupportPage from "../pages/public/SellerSupportPage.jsx";
import DisputeResolutionPage from "../pages/public/DisputeResolutionPage.jsx";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterBuyerPage from "../pages/auth/RegisterBuyerPage.jsx";
import RegisterSellerPage from "../pages/auth/RegisterSellerPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage.jsx";
import PhoneVerificationPage from "../pages/auth/PhoneVerificationPage.jsx";
import AccountSuspendedPage from "../pages/auth/AccountSuspendedPage.jsx";

import BuyerLayout from "../layouts/BuyerLayout.jsx";
import BuyerDashboardPage from "../pages/buyer/BuyerDashboardPage.jsx";
import BuyerProfilePage from "../pages/buyer/BuyerProfilePage.jsx";
import AddressBookPage from "../pages/buyer/AddressBookPage.jsx";
import WishlistPage from "../pages/buyer/WishlistPage.jsx";

function PlaceholderPage({ title }) {
    return (
        <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-10">
            <div className="rounded-2xl border border-[#bfc9c3] bg-white p-8">
                <h1 className="text-3xl font-bold text-[#121c2a]">
                    {title}
                </h1>

                <p className="mt-2 text-[#404944]">
                    This page will be built next.
                </p>
            </div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public marketplace routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/stores" element={<StoresPage />} />

            <Route
                path="/products/:productId"
                element={<ProductDetailsPage />}
            />

            <Route
                path="/stores/:storeId"
                element={<StoreDetailsPage />}
            />

            <Route
                path="/become-seller"
                element={<BecomeSellerPage />}
            />

            <Route
                path="/how-it-works"
                element={<HowItWorksPage />}
            />

            <Route
                path="/help-centre"
                element={<HelpCentrePage />}
            />

            <Route path="/contact" element={<ContactPage />} />

            <Route
                path="/trust-safety"
                element={<TrustSafetyPage />}
            />

            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/shipping" element={<ShippingPage />} />

            <Route
                path="/seller-policy"
                element={<SellerPolicyPage />}
            />

            <Route
                path="/seller-support"
                element={<SellerSupportPage />}
            />

            <Route
                path="/dispute-resolution"
                element={<DisputeResolutionPage />}
            />

            {/* Authentication routes */}
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/account-type"
                element={
                    <PlaceholderPage title="Account Type Selection" />
                }
            />

            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/register-buyer"
                element={<RegisterBuyerPage />}
            />

            <Route
                path="/register-seller"
                element={<RegisterSellerPage />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
            />

            <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
            />

            <Route
                path="/email-verification"
                element={<EmailVerificationPage />}
            />

            <Route
                path="/phone-verification"
                element={<PhoneVerificationPage />}
            />

            <Route
                path="/account-suspended"
                element={<AccountSuspendedPage />}
            />

            {/* Buyer account routes */}
            <Route element={<BuyerLayout />}>
                <Route
                    path="/account"
                    element={<BuyerDashboardPage />}
                />

                <Route
                    path="/account/profile"
                    element={<BuyerProfilePage />}
                />

                <Route
                    path="/account/addresses"
                    element={<AddressBookPage />}
                />

                <Route
                    path="/account/notifications"
                    element={<PlaceholderPage title="Notifications" />}
                />

                <Route
                    path="/account/settings"
                    element={<PlaceholderPage title="Buyer Settings" />}
                />

                <Route
                    path="/my-orders"
                    element={<PlaceholderPage title="My Orders" />}
                />

                <Route
                    path="/wishlist"
                    element={<WishlistPage />}
                />

                <Route
                    path="/disputes"
                    element={<PlaceholderPage title="My Disputes" />}
                />
            </Route>

            {/* Pages not yet connected to a dedicated layout */}
            <Route
                path="/cart"
                element={<PlaceholderPage title="Cart" />}
            />

            <Route
                path="/seller-dashboard"
                element={<PlaceholderPage title="Seller Dashboard" />}
            />

            {/* Not found */}
            <Route
                path="*"
                element={<PlaceholderPage title="Page Not Found" />}
            />
        </Routes>
    );
}