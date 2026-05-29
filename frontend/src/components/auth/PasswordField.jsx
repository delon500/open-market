import { useState } from "react";

export default function PasswordField({
                                          id = "password",
                                          label = "Password",
                                          placeholder = "Enter your password",
                                      }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-[#121c2a]"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 pr-12 text-[#121c2a] outline-none transition focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                />

                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404944] transition hover:text-[#003527]"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
          <span className="material-symbols-outlined">
            {visible ? "visibility" : "visibility_off"}
          </span>
                </button>
            </div>
        </div>
    );
}
