import PublicLayout from "../../layouts/PublicLayout.jsx";

export default function HomePage() {
    return (
        <PublicLayout>
            <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-10">
                <div className="max-w-3xl">
                    <p className="mb-4 inline-flex rounded-full bg-[#fed65b] px-4 py-2 text-sm font-bold text-[#745c00]">
                        Proudly South African marketplace
                    </p>
                    <h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#121c2a] md:text-6xl">
                        Buy and sell locally with confidence.
                    </h1>
                    <p className="mb-8 text-lg leading-8 text-[#404944]">
                        Open Market connects South African buyers and sellers through protected payments,
                        delivery confirmation, trusted reviews, and secure account flows.
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}