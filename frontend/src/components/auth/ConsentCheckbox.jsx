export default function ConsentCheckbox({ children, required = false }) {
    return (
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#404944]">
            <input
                type="checkbox"
                required={required}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#bfc9c3] bg-[#f8f9ff] text-[#003527] focus:ring-[#003527]"
            />
            <span>{children}</span>
        </label>
    );
}