import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ShopPage from "../pages/public/ShopPage.jsx";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterBuyerPage from "../pages/auth/RegisterBuyerPage.jsx";
import RegisterSellerPage from "../pages/auth/RegisterSellerPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage.jsx";
import PhoneVerificationPage from "../pages/auth/PhoneVerificationPage.jsx";
import AccountSuspendedPage from "../pages/auth/AccountSuspendedPage.jsx";

function PlaceholderPage({ title }) {
    return (
        <div className="mx-auto max-w-[1280px] px-4 py-20 md:px-10">
            <div className="rounded-2xl border border-[#bfc9c3] bg-white p-8">
                <h1 className="text-3xl font-bold text-[#121c2a]">{title}</h1>
                <p className="mt-2 text-[#404944]">This page will be built next.</p>
            </div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
            <Route path="/account-type" element={<PlaceholderPage title="Account Type Selection" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-buyer" element={<RegisterBuyerPage/>} />
            <Route path="/register-seller" element={<RegisterSellerPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/email-verification" element={<EmailVerificationPage />} />
            <Route path="/phone-verification" element={<PhoneVerificationPage />} />
            <Route path="/account-suspended" element={<AccountSuspendedPage />} />
            <Route path="/buyer-dashboard" element={<PlaceholderPage title="Buyer Dashboard" />} />
            <Route path="/seller-dashboard" element={<PlaceholderPage title="Seller Dashboard" />} />

            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
    );
}
