// Shows delivery and collection options inside the purchase panel.
export default function DeliveryInfo() {
    return (
        <div className="rounded-2xl border border-[#e6eeff] bg-[#f8f9ff] px-4 py-3.5">
            <div className="mb-2.5 flex items-start gap-2.5">
                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                    local_shipping
                </span>
                <div>
                    <div className="text-[13px] font-extrabold text-[#121c2a]">
                        Courier delivery - R65
                    </div>
                    <div className="text-xs font-semibold text-[#66736d]">
                        Ships within 1-3 business days - Est. delivery 3-5 days
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[18px] text-[#003527]">
                    store
                </span>
                <div>
                    <div className="text-[13px] font-extrabold text-[#121c2a]">
                        Collection available - Free
                    </div>
                    <div className="text-xs font-semibold text-[#66736d]">
                        Collect from Soweto - Ready in 1 day
                    </div>
                </div>
            </div>
        </div>
    );
}
