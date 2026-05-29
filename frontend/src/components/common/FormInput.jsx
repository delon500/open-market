export default function FormInput({
                                      id,
                                      label,
                                      type = "text",
                                      placeholder,
                                      autoComplete,
                                      required = true,
                                      helperText,
}){
  return (
      <div>
          <label htmlFor={id} className="mb-2 block text-sm font-semibold text-[#121c2a]">
              {label}
          </label>

          <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={required}
              className="w-full rounded-xl border border-[#bfc9c3] bg-[#f8f9ff] px-4 py-3 text-[#121c2a] outline-none transition placeholder:text-[#707974] focus:border-[#003527] focus:ring-2 focus:ring-[#003527]/10"
          />
          {helperText && <p className="mt-2 text-xs text-[#404944]">{helperText}</p>}
      </div>
  );
}