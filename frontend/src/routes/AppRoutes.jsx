import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterBuyerPage from "../pages/auth/RegisterBuyerPage.jsx";

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

            <Route path="/shop" element={<PlaceholderPage title="Shop" />} />
            <Route path="/cart" element={<PlaceholderPage title="Cart" />} />
            <Route path="/account-type" element={<PlaceholderPage title="Account Type Selection" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-buyer" element={<RegisterBuyerPage/>} />
            <Route path="/register-seller" element={<PlaceholderPage title="Register as Seller" />} />
            <Route path="/forgot-password" element={<PlaceholderPage title="Forgot Password" />} />
            <Route path="/reset-password" element={<PlaceholderPage title="Reset Password" />} />
            <Route path="/email-verification" element={<PlaceholderPage title="Email Verification" />} />
            <Route path="/phone-verification" element={<PlaceholderPage title="Phone Verification" />} />
            <Route path="/account-suspended" element={<PlaceholderPage title="Account Suspended" />} />
            <Route path="/buyer-dashboard" element={<PlaceholderPage title="Buyer Dashboard" />} />
            <Route path="/seller-dashboard" element={<PlaceholderPage title="Seller Dashboard" />} />

            <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
    );
}