import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const categories = [
    {
        title: "Fashion",
        icon: "checkroom",
        text: "Clothing, shoes, bags, accessories",
        to: "/shop?cat=fashion",
        image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Electronics",
        icon: "devices",
        text: "Phones, gadgets, tech accessories",
        to: "/shop?cat=electronics",
        image:
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Beauty",
        icon: "spa",
        text: "Skincare, perfumes, haircare",
        to: "/shop?cat=beauty",
        image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Home",
        icon: "home",
        text: "Decor, kitchenware, essentials",
        to: "/shop?cat=home",
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    },
];

const stores = [
    {
        name: "Kasi Kicks",
        location: "Johannesburg",
        category: "Sneakers",
        rating: "4.8",
        products: "128",
        to: "/stores/kasi-kicks",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=220&q=80",
        ],
    },
    {
        name: "Bloom Beauty",
        location: "Durban",
        category: "Beauty",
        rating: "4.7",
        products: "64",
        to: "/stores/bloom-beauty",
        images: [
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=220&q=80",
        ],
    },
    {
        name: "Home Nest",
        location: "Cape Town",
        category: "Home",
        rating: "4.9",
        products: "92",
        to: "/stores/home-nest",
        images: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=220&q=80",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=220&q=80",
        ],
    },
];

const products = [
    {
        title: "Nike Air Max 270",
        category: "Sneakers",
        location: "Johannesburg",
        condition: "Used",
        price: "R 850",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Classic Silver Watch",
        category: "Accessories",
        location: "Cape Town",
        condition: "New",
        price: "R 1,200",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Chanel No.5 EDP",
        category: "Beauty",
        location: "Durban",
        condition: "New",
        price: "R 2,400",
        image:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80",
    },
    {
        title: "Polaroid Now Camera",
        category: "Electronics",
        location: "Sandton",
        condition: "New",
        price: "R 1,750",
        image:
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    },
];

export default function HomePage() {
    return (
        <PublicLayout>
            <style>{`
        .hero-bg {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149, 211, 186, .18), transparent 34%),
            radial-gradient(circle at 82% 18%, rgba(254, 214, 91, .12), transparent 30%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        .hero-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 28px 80px rgba(0,0,0,.24);
          backdrop-filter: blur(10px);
        }

        .soft-card {
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }

        .soft-card:hover {
          transform: translateY(-4px);
          border-color: #95d3ba;
          box-shadow: 0 18px 42px rgba(0,53,39,.09);
        }

        .product-card {
          transition: transform .22s ease, box-shadow .22s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(0,53,39,.10);
        }

        .product-card img,
        .category-card img {
          transition: transform .45s ease;
        }

        .product-card:hover img,
        .category-card:hover img {
          transform: scale(1.06);
        }

        .seller-cta {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at 90% 10%, rgba(149,211,186,.20), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.05) 1px, transparent 1px);
          background-size: auto, 24px 24px;
        }
      `}</style>

            <div className="bg-[#f8f9ff] text-[#121c2a]">
                {/* Hero */}
                <section className="hero-bg">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-14 md:px-10 md:py-20 lg:grid-cols-12 lg:py-24">
                        <div className="lg:col-span-6">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  verified_user
                </span>
                                Secure local marketplace
                            </div>

                            <h1
                                className="mb-5 max-w-[620px] text-white"
                                style={{
                                    fontSize: "clamp(40px, 6vw, 68px)",
                                    fontWeight: 900,
                                    lineHeight: 1.02,
                                    letterSpacing: "-0.055em",
                                }}
                            >
                                Buy and sell locally{" "}
                                <span className="text-[#fed65b]">with confidence.</span>
                            </h1>

                            <p className="mb-8 max-w-[530px] text-[17px] leading-8 text-white/70">
                                Discover products from South African sellers, pay securely,
                                track your order, and shop with buyer protection built in.
                            </p>

                            <div className="mb-7">
                                <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition focus-within:border-[#95d3ba] focus-within:ring-4 focus-within:ring-[#95d3ba]/20">
                  <span className="material-symbols-outlined text-[#95d3ba]">
                    search
                  </span>
                                    <input
                                        type="search"
                                        placeholder="Search clothing, electronics, beauty, home goods..."
                                        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/45 focus:ring-0"
                                    />
                                    <button className="rounded-xl bg-[#fed65b] px-4 py-2 text-sm font-black text-[#3a2e00] transition-opacity hover:opacity-90">
                                        Search
                                    </button>
                                </div>
                            </div>

                            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    to="/shop"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#fed65b] px-6 py-3.5 text-sm font-black text-[#3a2e00] transition-opacity hover:opacity-90"
                                >
                                    Browse products
                                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                                </Link>

                                <Link
                                    to="/#categories"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-black text-white transition-colors hover:bg-white/10"
                                >
                                    Explore categories
                                    <span className="material-symbols-outlined text-[18px]">
                    category
                  </span>
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <HeroPill icon="lock" label="Secure checkout" />
                                <HeroPill icon="local_shipping" label="Delivery tracking" />
                                <HeroPill icon="shield_locked" label="Buyer protection" />
                            </div>
                        </div>

                        <div className="hidden lg:col-span-6 lg:block">
                            <div className="hero-card rounded-[30px] p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 overflow-hidden rounded-[24px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80"
                                            alt="Local fashion products"
                                            className="h-[280px] w-full object-cover"
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-[22px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80"
                                            alt="Electronics"
                                            className="h-[190px] w-full object-cover"
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-[22px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80"
                                            alt="Beauty products"
                                            className="h-[190px] w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section id="categories" className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-16">
                    <SectionHeading
                        eyebrow="Shop by category"
                        title="Explore local products"
                        action="View all products →"
                        to="/shop"
                    />

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.title} category={category} />
                        ))}
                    </div>
                </section>

                {/* Stores */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <SectionHeading
                        eyebrow="Explore stores"
                        title="Shop from registered local stores"
                        action="View all stores →"
                        to="/stores"
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {stores.map((store) => (
                            <StoreCard key={store.name} store={store} />
                        ))}
                    </div>
                </section>

                {/* Latest listings */}
                <section className="border-y border-[#e6eeff] bg-white py-14">
                    <div className="mx-auto max-w-[1280px] px-4 md:px-10">
                        <SectionHeading
                            eyebrow="Latest listings"
                            title="Fresh products from local sellers"
                            action="See all listings →"
                            to="/shop"
                        />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.title} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust row */}
                <section className="mx-auto max-w-[1280px] px-4 py-14 md:px-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <TrustCard
                            icon="lock"
                            title="Secure payments"
                            text="Payments are handled safely so buyers and sellers can trade with more confidence."
                        />
                        <TrustCard
                            icon="local_shipping"
                            title="Delivery tracking"
                            text="Keep buyers updated from checkout to delivery with clear order status updates."
                        />
                        <TrustCard
                            icon="support_agent"
                            title="Dispute support"
                            text="If something goes wrong, buyers can raise a dispute and get support."
                        />
                    </div>
                </section>

                {/* How it works */}
                <section className="mx-auto max-w-[1280px] px-4 pb-14 md:px-10 md:pb-16">
                    <div className="rounded-[32px] bg-white p-7 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-12">
                        <SectionHeading
                            eyebrow="How it works"
                            title="Simple, safe local shopping"
                            action="Full guide →"
                            to="/how-it-works"
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <HowStep number="1" title="Browse" text="Find products from local South African sellers." />
                            <HowStep number="2" title="Pay securely" text="Checkout safely using protected payment flows." />
                            <HowStep number="3" title="Track delivery" text="Follow your order status until it arrives." />
                            <HowStep number="4" title="Confirm order" text="Confirm delivery and leave a seller review." />
                        </div>
                    </div>
                </section>

                {/* Seller CTA */}
                <section className="mx-auto max-w-[1280px] px-4 pb-16 md:px-10">
                    <div className="seller-cta rounded-[32px] p-8 shadow-[0_24px_56px_rgba(0,53,39,.18)] md:p-12">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                  <span className="material-symbols-outlined icon-fill text-[15px]">
                    storefront
                  </span>
                  For sellers
                </span>

                                <h2
                                    className="mb-4 max-w-[650px] text-white"
                                    style={{
                                        fontSize: "clamp(30px, 4vw, 46px)",
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.045em",
                                    }}
                                >
                                    Start selling to local buyers{" "}
                                    <span className="text-[#fed65b]">
                    from one simple dashboard.
                  </span>
                                </h2>

                                <p className="max-w-[560px] text-[15px] leading-7 text-white/70">
                                    Create a seller profile, list products, manage orders, and
                                    build trust with buyers across South Africa.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 lg:col-span-4">
                                <Link
                                    to="/register-seller"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#fed65b] px-6 py-4 text-sm font-black text-[#3a2e00] transition-opacity hover:opacity-90"
                                >
                                    Register as a seller
                                    <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                                </Link>

                                <Link
                                    to="/become-seller"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white transition-colors hover:bg-white/10"
                                >
                                    Learn about selling
                                    <span className="material-symbols-outlined text-[18px]">
                    open_in_new
                  </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}

function HeroPill({ icon, label }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/75">
      <span className="material-symbols-outlined icon-fill text-[16px] text-[#95d3ba]">
        {icon}
      </span>
            {label}
    </span>
    );
}

function SectionHeading({ eyebrow, title, action, to }) {
    return (
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                    {eyebrow}
                </p>
                <h2 className="text-[28px] font-black tracking-[-0.04em] text-[#121c2a] md:text-[36px]">
                    {title}
                </h2>
            </div>

            <Link
                to={to}
                className="text-sm font-black text-[#003527] underline-offset-4 hover:underline"
            >
                {action}
            </Link>
        </div>
    );
}

function CategoryCard({ category }) {
    return (
        <Link
            to={category.to}
            className="category-card soft-card overflow-hidden rounded-3xl border border-[#dbe6e1] bg-white shadow-[0_6px_24px_rgba(0,53,39,0.04)]"
        >
            <div className="h-40 overflow-hidden md:h-48">
                <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
        <span className="material-symbols-outlined icon-fill mb-3 block text-[24px] text-[#003527]">
          {category.icon}
        </span>

                <h3 className="mb-1 font-black text-[#121c2a]">{category.title}</h3>

                <p className="text-sm leading-6 text-[#66736d]">{category.text}</p>
            </div>
        </Link>
    );
}

function StoreCard({ store }) {
    return (
        <Link
            to={store.to}
            className="soft-card rounded-3xl border border-[#dbe6e1] bg-white p-5 shadow-[0_6px_24px_rgba(0,53,39,0.04)]"
        >
            <div className="mb-5 flex items-center gap-4">
        <span className="material-symbols-outlined icon-fill shrink-0 text-[32px] text-[#003527]">
          store
        </span>

                <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                        <h3 className="truncate font-black text-[#121c2a]">
                            {store.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf6] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#003527]">
              <span className="material-symbols-outlined icon-fill text-[13px]">
                verified
              </span>
              Verified
            </span>
                    </div>

                    <p className="text-sm text-[#66736d]">
                        {store.location} · {store.category}
                    </p>
                </div>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-2">
                {store.images.map((image) => (
                    <div key={image} className="h-20 overflow-hidden rounded-2xl bg-[#f0faf6]">
                        <img
                            src={image}
                            alt={`${store.name} product`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#66736d]">
        <span className="inline-flex items-center gap-1">
          <span className="material-symbols-outlined icon-fill text-[16px] text-[#003527]">
            star
          </span>
            {store.rating} rating
        </span>
                <span>{store.products} products</span>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-black text-[#003527]">
        Visit store
        <span className="material-symbols-outlined text-[17px]">
          arrow_forward
        </span>
      </span>
        </Link>
    );
}

function ProductCard({ product }) {
    return (
        <article className="product-card overflow-hidden rounded-3xl border border-[#e6eeff] bg-white">
            <div className="h-[230px] overflow-hidden bg-[#f0faf6]">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-[#003527]">
                    {product.category}
                </p>

                <h3 className="mb-1 text-base font-black text-[#121c2a]">
                    {product.title}
                </h3>

                <p className="mb-4 text-sm text-[#66736d]">
                    {product.location} · {product.condition}
                </p>

                <div className="flex items-center justify-between">
          <span className="text-lg font-black text-[#003527]">
            {product.price}
          </span>

                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#003527] text-white transition-opacity hover:opacity-90"
                        aria-label={`Add ${product.title}`}
                    >
            <span className="material-symbols-outlined icon-fill text-[18px]">
              add
            </span>
                    </button>
                </div>
            </div>
        </article>
    );
}

function TrustCard({ icon, title, text }) {
    return (
        <div className="soft-card rounded-3xl border border-[#dbe6e1] bg-white p-6">
      <span className="material-symbols-outlined icon-fill mb-4 block text-[28px] text-[#003527]">
        {icon}
      </span>

            <h3 className="mb-2 text-lg font-black text-[#121c2a]">{title}</h3>

            <p className="text-sm leading-6 text-[#66736d]">{text}</p>
        </div>
    );
}

function HowStep({ number, title, text }) {
    return (
        <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#003527] text-sm font-black text-white">
                {number}
            </div>

            <h3 className="mb-2 font-black text-[#121c2a]">{title}</h3>

            <p className="text-sm leading-6 text-[#66736d]">{text}</p>
        </div>
    );
}