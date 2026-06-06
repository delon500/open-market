// Shows temporary feedback for store save, wishlist, message, and add-to-bag actions.
export default function StoreToast({ message }) {
    return (
        <div className="fixed bottom-[130px] left-1/2 z-[90] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#121c2a] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_6px_24px_rgba(0,0,0,0.28)] lg:bottom-8">
            {message}
        </div>
    );
}
