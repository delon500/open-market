// Keeps buyer page titles and optional actions visually consistent across account screens.
export default function BuyerPageHeader({
                                            eyebrow,
                                            title,
                                            description,
                                            actions,
                                        }) {
    return (
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
                {eyebrow && (
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                        {eyebrow}
                    </p>
                )}

                <h1 className="text-[30px] font-black leading-tight tracking-[-0.045em] text-[#121c2a] md:text-[42px]">
                    {title}
                </h1>

                {description && (
                    <p className="mt-3 text-sm leading-7 text-[#66736d] md:text-base">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div className="flex shrink-0 flex-wrap gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
