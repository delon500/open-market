import { useState } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

export default function PasswordInput({
                                          id,
                                          label,
                                          placeholder,
                                          showStrength = false,
                                      }) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#121c2a]">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    autoComplete="new-password"
                    required
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="w-full rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 pr-12 text-[#121c2a] outline-none transition placeholder:text-[#707974] focus:border-[#003527] focus:ring-2 focus:ring-[#003527]/10"
                />

                <button
                    type="button"
                    onClick={() => setVisible((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#404944] transition hover:text-[#003527]"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
          <span className="material-symbols-outlined text-[20px]">
            {visible ? "visibility" : "visibility_off"}
          </span>
                </button>
            </div>

            {showStrength && <PasswordStrengthMeter value={value} />}
        </div>
    );
}