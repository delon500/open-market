// Explains the buyer protection promise in the product sidebar.
export default function BuyerProtectionCard() {
    return (
        <div className="rounded-[24px] border border-[#dbe6e1] bg-[#003527] p-5 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
            <span className="material-symbols-outlined icon-fill mb-2 block text-[22px] text-[#fed65b]">
                shield_locked
            </span>

            <h2 className="mb-1.5 text-sm font-black">Buyer Protection</h2>

            <p className="text-xs leading-6 text-white/70">
                Your payment is held safely by Open Market until you confirm delivery.
                If something goes wrong, raise a dispute and our team will step in.
            </p>
        </div>
    );
}
