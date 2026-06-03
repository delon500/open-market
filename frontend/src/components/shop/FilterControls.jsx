// Reusable filter form controls shared by the desktop sidebar and mobile drawer.
export default function FilterControls({ mobile = false }) {
    const sectionClass = mobile
        ? "border-t-[1.5px] border-[#e6eeff] py-4"
        : "border-t-[1.5px] border-[#f0f4f8] py-3.5";
    const labelClass = mobile
        ? "mb-2.5 text-xs font-extrabold uppercase tracking-[.05em] text-[#121c2a]"
        : "mb-2.5 text-[11px] font-extrabold uppercase tracking-[.05em] text-[#121c2a]";

    return (
        <>
            <div className={sectionClass}>
                <p className={labelClass}>Location</p>
                <div className="relative">
                    <select className="w-full cursor-pointer appearance-none rounded-xl border-[1.5px] border-[#bfc9c3] bg-white px-3 py-2 text-[13px] font-bold text-[#121c2a] outline-none transition focus:border-[#003527]">
                        <option>All locations</option>
                        <option>Johannesburg</option>
                        <option>Cape Town</option>
                        <option>Durban</option>
                        <option>Pretoria</option>
                        <option>Port Elizabeth</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-[#707974]">
                        expand_more
                    </span>
                </div>
            </div>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Condition">
                <FilterCheckbox label="New" defaultChecked />
                <FilterCheckbox label="Used" defaultChecked />
                <FilterCheckbox label="Like new" />
            </FilterSection>

            <div className={sectionClass}>
                <p className={labelClass}>Price range (R)</p>
                <div className="mb-2 grid grid-cols-2 gap-2">
                    <PriceInput placeholder="Min" defaultValue={mobile ? "" : "0"} />
                    <PriceInput placeholder="Max" defaultValue={mobile ? "" : "1000"} />
                </div>
                <button
                    type="button"
                    className="w-full rounded-[10px] bg-[#003527] px-3 py-2.5 text-xs font-bold text-white transition hover:opacity-85"
                >
                    {mobile ? "Apply" : "Apply range"}
                </button>
            </div>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Seller">
                <FilterCheckbox label={mobile ? "Verified sellers" : "Verified only"} />
                <FilterCheckbox label="Top rated (4+)" />
                {!mobile ? <FilterCheckbox label="Local stores" /> : null}
            </FilterSection>

            <FilterSection className={sectionClass} titleClass={labelClass} title="Delivery">
                <FilterCheckbox label="Courier delivery" />
                <FilterCheckbox label="Collection available" />
            </FilterSection>
        </>
    );
}

function FilterSection({ className, titleClass, title, children }) {
    return (
        <div className={className}>
            <p className={titleClass}>{title}</p>
            <div className="flex flex-col gap-2.5">{children}</div>
        </div>
    );
}

function FilterCheckbox({ label, defaultChecked = false }) {
    return (
        <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-semibold text-[#404944]">
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="h-4 w-4 shrink-0 cursor-pointer rounded-[5px] border-[1.5px] border-[#bfc9c3] accent-[#003527]"
            />
            {label}
        </label>
    );
}

function PriceInput(props) {
    return (
        <input
            {...props}
            className="w-full rounded-[10px] border-[1.5px] border-[#bfc9c3] bg-[#f8f9ff] px-2.5 py-2 text-[13px] font-semibold text-[#121c2a] outline-none transition placeholder:text-[#9aada7] focus:border-[#003527]"
        />
    );
}
