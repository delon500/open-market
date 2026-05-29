import { Link } from "react-router-dom";
import googleIcon from "../../assets/icons/google.svg";

export default function SocialButton({
                                         type = "button",
                                         icon,
                                         label,
                                         to,
                                         dark = false,
                                     }) {
    const className = dark
        ? "flex items-center justify-center gap-2.5 rounded-xl bg-[#121c2a] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        : "flex items-center justify-center gap-2.5 rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 text-sm font-semibold text-[#121c2a] transition hover:bg-[#eff4ff]";

    const content = (
        <>
            {icon === "google" ? (
                <img src={googleIcon} alt="" className="h-5 w-5 shrink-0" />
            ) : (
                <span className="material-symbols-outlined text-[20px] text-[#003527]">
          {icon}
        </span>
            )}
            {label}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} className={className}>
            {content}
        </button>
    );
}