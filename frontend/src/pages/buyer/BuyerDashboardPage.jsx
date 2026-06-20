import { Link } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// Prototype account data is kept outside the component so it can be replaced by API results later.
const dashboardStats = [
    {
        label: "Total orders",
        value: "12",
        description: "All purchases",
        icon: "shopping_bag",
        tone: "green",
    },
    {
        label: "In progress",
        value: "3",
        description: "Being prepared or delivered",
        icon: "local_shipping",
        tone: "blue",
    },
    {
        label: "Saved items",
        value: "18",
        description: "Products in your wishlist",
        icon: "favorite",
        tone: "rose",
    },
    {
        label: "Open disputes",
        value: "1",
        description: "Waiting for an update",
        icon: "report",
        tone: "amber",
    },
];

const recentOrders = [
    {
        id: "OM-24061",
        seller: "Kasi Kicks",
        product: "Classic white everyday sneakers",
        amount: "R899.00",
        date: "16 June 2026",
        status: "Out for delivery",
        statusTone: "blue",
        icon: "steps",
    },
    {
        id: "OM-24048",
        seller: "Urban Thread",
        product: "Oversized neutral cotton hoodie",
        amount: "R549.00",
        date: "14 June 2026",
        status: "Preparing order",
        statusTone: "amber",
        icon: "apparel",
    },
    {
        id: "OM-23997",
        seller: "Soweto Leather Co.",
        product: "Handmade leather crossbody bag",
        amount: "R1,150.00",
        date: "8 June 2026",
        status: "Delivered",
        statusTone: "green",
        icon: "shopping_bag",
    },
];

const quickActions = [
    {
        title: "Track an order",
        text: "Follow delivery or collection progress.",
        icon: "route",
        to: "/my-orders",
    },
    {
        title: "View saved items",
        text: "Continue shopping from your wishlist.",
        icon: "favorite",
        to: "/wishlist",
    },
    {
        title: "Manage addresses",
        text: "Add or update delivery addresses.",
        icon: "location_on",
        to: "/account/addresses",
    },
    {
        title: "Get support",
        text: "Find help with an order or payment.",
        icon: "support_agent",
        to: "/help-centre",
    },
];

const activityItems = [
    {
        icon: "local_shipping",
        title: "Order OM-24061 is out for delivery",
        text: "Your courier delivery is expected today.",
        time: "25 minutes ago",
    },
    {
        icon: "inventory_2",
        title: "Kasi Kicks prepared your order",
        text: "The seller has completed order preparation.",
        time: "Yesterday",
    },
    {
        icon: "favorite",
        title: "A saved product changed price",
        text: "Canvas Weekender Bag is now R499.00.",
        time: "2 days ago",
    },
];

export default function BuyerDashboardPage() {
    return (
        <div className="space-y-8">
            <BuyerPageHeader
                eyebrow="Buyer overview"
                title="Welcome back, Delon"
                description="Track orders, manage saved products, review account activity, and get support from one place."
                actions={
                    <>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                        >
                            Continue shopping
                            <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
                        </Link>

                        <Link
                            to="/wishlist"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
              <span className="material-symbols-outlined text-[18px]">
                favorite
              </span>
                            Saved items
                        </Link>
                    </>
                }
            />

            {/* Stats */}
            <section
                aria-label="Account summary"
                className="grid grid-cols-2 gap-4 xl:grid-cols-4"
            >
                {dashboardStats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                ))}
            </section>

            {/* Active order */}
            <section className="overflow-hidden rounded-[28px] border border-[#95d3ba] bg-white shadow-[0_8px_32px_rgba(0,53,39,.06)]">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="p-6 md:p-8 lg:col-span-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eff4ff] px-3 py-1.5 text-xs font-black text-[#244f9e]">
                  <span className="material-symbols-outlined text-[16px]">
                    local_shipping
                  </span>
                                    Out for delivery
                                </div>

                                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#66736d]">
                                    Active order · OM-24061
                                </p>

                                <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#121c2a]">
                                    Classic white everyday sneakers
                                </h2>

                                <p className="mt-2 text-sm font-semibold text-[#66736d]">
                                    Sold by Kasi Kicks
                                </p>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-xs font-bold text-[#66736d]">
                                    Expected delivery
                                </p>
                                <p className="mt-1 text-sm font-black text-[#121c2a]">
                                    Today, 14:00–17:00
                                </p>
                            </div>
                        </div>

                        <OrderProgress />

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/order-tracking/OM-24061"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                            >
                                Track order
                                <span className="material-symbols-outlined text-[18px]">
                  route
                </span>
                            </Link>

                            <Link
                                to="/my-orders/OM-24061"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#dbe6e1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                            >
                                View order details
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center bg-[#003527] p-6 text-white md:p-8 lg:col-span-4">
                        <div>
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fed65b]/15 text-[#fed65b]">
                <span className="material-symbols-outlined text-[26px]">
                  shield_locked
                </span>
                            </div>

                            <h3 className="mb-3 text-xl font-black">
                                Your payment is protected
                            </h3>

                            <p className="text-sm leading-7 text-white/70">
                                Confirm receipt only after the correct item has been delivered.
                                Report a serious problem before seller payout is processed.
                            </p>

                            <Link
                                to="/trust-safety"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                            >
                                Learn about protection
                                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Orders and quick actions */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7 xl:col-span-8">
                    <SectionHeader
                        title="Recent orders"
                        description="Your latest purchases and fulfilment updates."
                        linkLabel="View all orders"
                        linkTo="/my-orders"
                    />

                    <div className="mt-6 divide-y divide-[#e5ece8]">
                        {recentOrders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </div>
                </section>

                <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7 xl:col-span-4">
                    <SectionHeader
                        title="Quick actions"
                        description="Common account tasks."
                    />

                    <div className="mt-6 space-y-3">
                        {quickActions.map((action) => (
                            <QuickAction
                                key={action.title}
                                action={action}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Activity and account completion */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7 xl:col-span-7">
                    <SectionHeader
                        title="Recent activity"
                        description="Important updates from your account."
                        linkLabel="View notifications"
                        linkTo="/account/notifications"
                    />

                    <div className="mt-6 space-y-4">
                        {activityItems.map((item) => (
                            <ActivityItem
                                key={item.title}
                                item={item}
                            />
                        ))}
                    </div>
                </section>

                <section className="rounded-[28px] border border-[#c8ddd5] bg-[#f0faf6] p-6 md:p-7 xl:col-span-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#003527]">
              <span className="material-symbols-outlined text-[24px]">
                manage_accounts
              </span>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#003527]">
              75% complete
            </span>
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#121c2a]">
                        Complete your buyer profile
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-[#66736d]">
                        Add a phone number and delivery address to make checkout faster.
                    </p>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                        <div className="h-full w-3/4 rounded-full bg-[#003527]" />
                    </div>

                    <div className="mt-5 space-y-3">
                        <ProfileCheck
                            complete
                            label="Email address verified"
                        />
                        <ProfileCheck
                            complete
                            label="Basic profile completed"
                        />
                        <ProfileCheck label="Add phone number" />
                        <ProfileCheck label="Add delivery address" />
                    </div>

                    <Link
                        to="/account/profile"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
                    >
                        Complete profile
                        <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
                    </Link>
                </section>
            </div>
        </div>
    );
}

function StatCard({ stat }) {
    const toneStyles = {
        green: "bg-[#f0faf6] text-[#003527]",
        blue: "bg-[#eff4ff] text-[#244f9e]",
        rose: "bg-[#fff0f3] text-[#a3294c]",
        amber: "bg-[#fff8e5] text-[#8a5a00]",
    };

    return (
        <article className="rounded-[24px] border border-[#dbe6e1] bg-white p-4 shadow-[0_6px_24px_rgba(0,53,39,.04)] md:p-5">
            <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${
                    toneStyles[stat.tone]
                }`}
            >
        <span className="material-symbols-outlined text-[22px]">
          {stat.icon}
        </span>
            </div>

            <p className="text-2xl font-black tracking-[-0.04em] text-[#121c2a] md:text-3xl">
                {stat.value}
            </p>

            <h2 className="mt-1 text-sm font-black text-[#121c2a]">
                {stat.label}
            </h2>

            <p className="mt-1 hidden text-xs leading-5 text-[#66736d] sm:block">
                {stat.description}
            </p>
        </article>
    );
}

function OrderProgress() {
    // Each step drives both the status icon and the accessible text shown beneath the progress line.
    const steps = [
        {
            label: "Paid",
            complete: true,
        },
        {
            label: "Prepared",
            complete: true,
        },
        {
            label: "In transit",
            complete: true,
        },
        {
            label: "Delivered",
            complete: false,
        },
    ];

    return (
        <div>
            <div className="relative flex justify-between">
                <div className="absolute left-5 right-5 top-5 h-1 rounded-full bg-[#dbe6e1]">
                    <div className="h-full w-[68%] rounded-full bg-[#003527]" />
                </div>

                {steps.map((step) => (
                    <div
                        key={step.label}
                        className="relative z-[1] flex w-1/4 flex-col items-center text-center"
                    >
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-4 border-white ${
                                step.complete
                                    ? "bg-[#003527] text-white"
                                    : "bg-[#e5ece8] text-[#78837e]"
                            }`}
                        >
              <span className="material-symbols-outlined text-[18px]">
                {step.complete ? "check" : "circle"}
              </span>
                        </div>

                        <p
                            className={`mt-2 text-[11px] font-black sm:text-xs ${
                                step.complete
                                    ? "text-[#003527]"
                                    : "text-[#8b9791]"
                            }`}
                        >
                            {step.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SectionHeader({
                           title,
                           description,
                           linkLabel,
                           linkTo,
                       }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-xl font-black tracking-[-0.03em] text-[#121c2a]">
                    {title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#66736d]">
                    {description}
                </p>
            </div>

            {linkLabel && linkTo && (
                <Link
                    to={linkTo}
                    className="hidden shrink-0 items-center gap-1 text-sm font-black text-[#003527] hover:underline sm:inline-flex"
                >
                    {linkLabel}
                    <span className="material-symbols-outlined text-[16px]">
            arrow_forward
          </span>
                </Link>
            )}
        </div>
    );
}

function OrderRow({ order }) {
    const statusStyles = {
        blue: "bg-[#eff4ff] text-[#244f9e]",
        amber: "bg-[#fff8e5] text-[#8a5a00]",
        green: "bg-[#f0faf6] text-[#087052]",
    };

    return (
        <article className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
          <span className="material-symbols-outlined text-[25px]">
            {order.icon}
          </span>
                </div>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#66736d]">
                            {order.id}
                        </p>

                        <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
                                statusStyles[order.statusTone]
                            }`}
                        >
              {order.status}
            </span>
                    </div>

                    <h3 className="mt-1 truncate text-sm font-black text-[#121c2a]">
                        {order.product}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-[#66736d]">
                        {order.seller} · {order.date}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 pl-[72px] sm:pl-0">
                <p className="text-sm font-black text-[#121c2a]">
                    {order.amount}
                </p>

                <Link
                    to={`/my-orders/${order.id}`}
                    aria-label={`View order ${order.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#dbe6e1] text-[#003527] transition hover:bg-[#f0faf6]"
                >
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
                </Link>
            </div>
        </article>
    );
}

function QuickAction({ action }) {
    return (
        <Link
            to={action.to}
            className="group flex items-center gap-4 rounded-[20px] border border-[#e0e9e4] bg-[#f8fbf9] p-4 transition hover:border-[#95d3ba] hover:bg-[#f0faf6]"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
        <span className="material-symbols-outlined text-[22px]">
          {action.icon}
        </span>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-[#121c2a]">
                    {action.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#66736d]">
                    {action.text}
                </p>
            </div>

            <span className="material-symbols-outlined text-[18px] text-[#8b9791] transition group-hover:translate-x-0.5 group-hover:text-[#003527]">
        chevron_right
      </span>
        </Link>
    );
}

function ActivityItem({ item }) {
    return (
        <article className="flex items-start gap-4 rounded-[20px] border border-[#e0e9e4] bg-[#f8fbf9] p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#003527]">
        <span className="material-symbols-outlined text-[22px]">
          {item.icon}
        </span>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-[#121c2a]">
                    {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#66736d]">
                    {item.text}
                </p>

                <p className="mt-2 text-[11px] font-bold text-[#8b9791]">
                    {item.time}
                </p>
            </div>
        </article>
    );
}

function ProfileCheck({ label, complete = false }) {
    return (
        <div className="flex items-center gap-3">
      <span
          className={`material-symbols-outlined text-[19px] ${
              complete
                  ? "text-[#087052]"
                  : "text-[#9aada7]"
          }`}
      >
        {complete ? "check_circle" : "radio_button_unchecked"}
      </span>

            <span
                className={`text-sm font-bold ${
                    complete
                        ? "text-[#405049]"
                        : "text-[#66736d]"
                }`}
            >
        {label}
      </span>
        </div>
    );
}
