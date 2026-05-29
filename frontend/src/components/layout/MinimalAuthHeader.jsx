import { Link } from "react-router-dom";

export default function MinimalAuthHeader({
    prompt = "Already have an account?",
    actionLabel = "Sign In",
    actionTo = "/login",
}){
    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#d9e3f6] bg-white">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 md:px-10">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[#003527] transition hover:opacity-90"
                >
          <span className="material-symbols-outlined icon-fill text-[28px]">
            shopping_bag
          </span>
                    <span className="text-2xl font-bold tracking-[-0.02em]">
            Open Market
          </span>
                </Link>

                <p className="text-sm font-semibold text-[#404944]">
                    <span className="hidden sm:inline">{prompt}</span>
                    <Link
                        to={actionTo}
                        className="ml-1 font-bold text-[#003527] hover:underline"
                    >
                        {actionLabel}
                    </Link>
                </p>
            </div>
        </header>
    );
}