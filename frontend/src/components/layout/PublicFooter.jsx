import { Link } from "react-router-dom";

export default function PublicFooter() {
    return (
        <footer className="mt-auto bg-[#27313f] pb-20 text-[#eaf1ff] md:pb-0">
            <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-10">
                <div className="col-span-2 md:col-span-1">
                    <div className="mb-4 flex items-center gap-2 text-2xl font-bold">
                        <span className="material-symbols-outlined icon-fill">shopping_bag</span>
                        <span>Open Market</span>
                    </div>
                    <p className="max-w-xs text-sm text-[#eaf1ff]/80">
                        Empowering South African entrepreneurs and connecting them with local buyers through a secure,
                        easy-to-use platform.
                    </p>
                </div>

                <FooterColumn
                    title="Shop & Explore"
                    links={[
                        { label: "Terms of Service", to: "/terms" },
                        { label: "Privacy Policy", to: "/privacy" },
                        { label: "Shipping Info", to: "/shipping" },
                    ]}
                />

                <FooterColumn
                    title="For Sellers"
                    links={[
                        { label: "Seller Guidelines", to: "/seller-policy" },
                        { label: "Pricing & Plans", to: "/pricing" },
                        { label: "Seller Support", to: "/seller-support" },
                    ]}
                />

                <FooterColumn
                    title="Support"
                    links={[
                        { label: "Help Centre", to: "/help-centre" },
                        { label: "Contact Us", to: "/contact" },
                        { label: "Dispute Resolution", to: "/dispute-resolution" },
                    ]}
                />
            </div>

            <div className="border-t border-white/10 px-4 py-6 md:px-10">
                <div className="mx-auto max-w-[1280px] text-sm text-[#eaf1ff]/70">
                    © 2026 Open Market. Proudly South African.
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, links }) {
    return (
        <div>
            <h3 className="mb-4 text-sm font-bold text-white">{title}</h3>
            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link to={link.to} className="text-sm text-[#eaf1ff]/80 transition hover:text-[#ffe088]">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}