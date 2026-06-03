// Compact metric box used inside store cards for rating and product counts.
export default function StoreStats({ value, label, highlight = false }) {
    return (
        <div className="rounded-[14px] bg-[#f8f9ff] p-3">
            <span
                className={`block text-base font-black leading-none tracking-[-0.02em] ${
                    highlight ? "text-[#f59e0b]" : "text-[#121c2a]"
                }`}
            >
                {value}
            </span>

            <span className="mt-1 block text-[11px] font-extrabold uppercase tracking-wide text-[#7b8781]">
                {label}
            </span>
        </div>
    );
}
