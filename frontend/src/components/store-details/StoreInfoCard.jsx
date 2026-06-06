// Lists practical store details used in the desktop sidebar and mobile About tab.
export default function StoreInfoCard({ store }) {
    return (
        <>
            <h2 className="mb-5 text-xl font-black text-[#121c2a] lg:text-base">
                Store information
            </h2>

            <div className="space-y-4">
                <InfoRow icon="location_on" label="Location" value={store.location} />
                <InfoRow icon="category" label="Category" value={store.category} />
                <InfoRow
                    icon="inventory_2"
                    label="Products"
                    value={`${store.productsCount} listed`}
                />
                <InfoRow icon="schedule" label="Response time" value={store.response} />
                <InfoRow icon="local_shipping" label="Delivery" value={store.delivery} />
            </div>
        </>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#003527]">
                <span className="material-symbols-outlined icon-fill text-[20px]">
                    {icon}
                </span>
            </div>
            <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-[#9aada7]">
                    {label}
                </p>
                <p className="text-sm font-bold text-[#121c2a]">{value}</p>
            </div>
        </div>
    );
}
