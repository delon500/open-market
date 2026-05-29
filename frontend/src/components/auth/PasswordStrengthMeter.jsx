export default function PasswordStrengthMeter({ value }) {
    const score = getPasswordScore(value);
    const strength = getPasswordStrength(score);

    return (
        <>
            <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        className="h-[3px] flex-1 rounded-full transition"
                        style={{
                            backgroundColor: bar <= score ? strength.color : "#bfc9c3",
                        }}
                    />
                ))}
            </div>

            <p className="mt-2 text-xs" style={{ color: score > 0 ? strength.color : "#404944" }}>
                {strength.label}
            </p>
        </>
    );
}

function getPasswordScore(value) {
    let score = 0;

    if (value.length >= 8) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    return score;
}

function getPasswordStrength(score) {
    const options = {
        0: { label: "At least 8 characters", color: "#404944" },
        1: { label: "Weak password", color: "#ba1a1a" },
        2: { label: "Fair — try adding symbols", color: "#e8a838" },
        3: { label: "Good password", color: "#2b6954" },
        4: { label: "Strong password", color: "#003527" },
    };

    return options[score] || options[0];
}