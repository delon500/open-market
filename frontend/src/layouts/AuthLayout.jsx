import PublicLayout from "./PublicLayout";

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <PublicLayout>
            <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-12 md:px-10 lg:grid-cols-12 lg:py-20">
                <aside className="lg:col-span-5">
                    <div className="rounded-2xl border border-[#bfc9c3] bg-[#eff4ff] p-8">
                        <h1 className="mb-4 text-3xl font-bold text-[#121c2a] md:text-4xl">{title}</h1>
                        <p className="mb-8 text-lg leading-7 text-[#404944]">{subtitle}</p>

                        <div className="space-y-5">
                            <TrustPoint icon="shield_locked" title="Protected payments" text="Payments are held until delivery is confirmed." />
                            <TrustPoint icon="storefront" title="Local sellers" text="Shop from South African sellers and small businesses." />
                            <TrustPoint icon="support_agent" title="Support when needed" text="Get help with account, orders, disputes, and refunds." />
                        </div>
                    </div>
                </aside>

                <div className="lg:col-span-7">{children}</div>
            </section>
        </PublicLayout>
    );
}

function TrustPoint({ icon, title, text }) {
    return (
        <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#003527]">
                <span className="material-symbols-outlined icon-fill">{icon}</span>
            </div>
            <div>
                <h3 className="font-semibold text-[#121c2a]">{title}</h3>
                <p className="text-sm text-[#404944]">{text}</p>
            </div>
        </div>
    );
}