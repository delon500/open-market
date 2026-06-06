// Renders the desktop save-store control and reflects the saved state text/icon.
export default function SaveStoreButton({ saved, onClick, className }) {
    return (
        <button type="button" onClick={onClick} className={className}>
            <span
                className={`material-symbols-outlined text-[18px] ${
                    saved ? "icon-fill" : ""
                }`}
            >
                bookmark
            </span>
            <span>{saved ? "Store saved" : "Save store"}</span>
        </button>
    );
}
