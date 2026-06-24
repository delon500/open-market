import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useBeforeUnload } from "react-router-dom";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

// ─── Constants ────────────────────────────────────────────────────────────────

// Step data drives both the mobile single-step card and the desktop progress grid.
const PAYMENT_STEPS = [
    {
        title: "Creating protected order",
        description: "Preparing your order and seller package details.",
        icon: "receipt_long",
    },
    {
        title: "Checking payment details",
        description: "Your selected payment method is being securely verified.",
        icon: "credit_card",
    },
    {
        title: "Protecting your payment",
        description: "Payment is linked to Buyer Protection until delivery is confirmed.",
        icon: "shield_locked",
    },
    {
        title: "Final confirmation",
        description: "Confirming the checkout result with the payment provider.",
        icon: "task_alt",
    },
];

const STEP_PROGRESS = [22, 48, 74, 96];
const TIMEOUT_MS = 30_000;

// Prototype order summary stays local until the real checkout/order API is connected.
const ORDER_SUMMARY = {
    orderNumber: "OM-24091",
    items: [
        { id: 1, title: "Classic white everyday sneakers", seller: "Kasi Kicks", price: 899 },
        { id: 2, title: "Oversized neutral cotton hoodie", seller: "Urban Thread", price: 549 },
        { id: 3, title: "Canvas weekender bag", seller: "Local Carry", price: 499 },
        { id: 4, title: "Woven leather belt", seller: "Local Carry", price: 349 },
    ],
    sellers: 3,
    total: 2601,
    paymentMethod: "Card payment",
    deliveryMethod: "Courier delivery",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRand(amount) {
    return `R ${Number(amount).toLocaleString("en-ZA")}`;
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PaymentProcessingPage() {
    // Processing state simulates a provider handoff while preserving retry/timeout flows.
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(STEP_PROGRESS[0]);
    const [status, setStatus] = useState("processing"); // "processing" | "ready" | "timeout" | "error"
    const [elapsed, setElapsed] = useState(0);
    const [showItems, setShowItems] = useState(false);
    const startTimeRef = useRef(null);
    const liveRegionRef = useRef(null);

    useBeforeUnload(
        (e) => {
            if (status === "processing") {
                e.preventDefault();
            }
        },
        { capture: true }
    );

    // Elapsed timer gives timeout/error copy a real sense of progress without backend data.
    useEffect(() => {
        if (status !== "processing") return;
        if (startTimeRef.current === null) {
            startTimeRef.current = Date.now();
        }
        const t = window.setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => window.clearInterval(t);
    }, [status]);

    // Processing sequence advances through prototype states and stops on timeout or success.
    useEffect(() => {
        if (status !== "processing") return;

        const timeoutId = window.setTimeout(() => {
            setStatus("timeout");
        }, TIMEOUT_MS);

        const stepTimer = window.setInterval(() => {
            setCurrentStep((current) => {
                const next = current + 1;
                if (next >= PAYMENT_STEPS.length) {
                    window.clearInterval(stepTimer);
                    window.setTimeout(() => {
                        setProgress(100);
                        setStatus("ready");
                    }, 700);
                    return current;
                }
                setProgress(STEP_PROGRESS[next]);

                // FIX #3: clear live region before writing so retry re-announces correctly
                if (liveRegionRef.current) {
                    liveRegionRef.current.textContent = "";
                    window.setTimeout(() => {
                        if (liveRegionRef.current) {
                            liveRegionRef.current.textContent = `Step ${next + 1} of ${PAYMENT_STEPS.length}: ${PAYMENT_STEPS[next].title}`;
                        }
                    }, 50);
                }

                return next;
            });
        }, 1100);

        return () => {
            window.clearTimeout(timeoutId);
            window.clearInterval(stepTimer);
        };
    }, [status]);

    const activeStep = PAYMENT_STEPS[currentStep];

    // FIX #1: header copy is neutral on success — the confirmation card owns that message
    const statusCopy = useMemo(() => {
        if (status === "ready") {
            return {
                eyebrow: "Order confirmed",
                title: "You're all set",
                description: null, // confirmation card below handles the detail
            };
        }
        if (status === "timeout") {
            return {
                eyebrow: "Taking longer than expected",
                title: "Still waiting for a response",
                description: "This is taking longer than usual. We could not confirm a completed payment yet. Please contact support if this persists.",
            };
        }
        if (status === "error") {
            return {
                eyebrow: "Something went wrong",
                title: "We could not confirm your payment",
                description: "We could not confirm the payment result yet. Please try again once, or contact support if you are unsure about the payment status.",
            };
        }
        return {
            eyebrow: "Secure checkout",
            title: "Processing your payment",
            description: "Please do not refresh or close this page while we confirm your protected payment.",
        };
    }, [status]);

    const isProcessing = status === "processing";
    const isReady = status === "ready";
    const isFailed = status === "timeout" || status === "error";

    function handleRetry() {
        // Retry returns the prototype to its first processing state without leaving the page.
        // FIX #3: clear live region on retry so assistive tech re-reads cleanly
        if (liveRegionRef.current) {
            liveRegionRef.current.textContent = "";
        }
        startTimeRef.current = Date.now();
        setCurrentStep(0);
        setProgress(STEP_PROGRESS[0]);
        setElapsed(0);
        setStatus("processing");
    }

    return (
        <div className="space-y-8 pb-[var(--bottom-nav-height,77px)] md:pb-12">
            <span
                ref={liveRegionRef}
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            />

            <BuyerPageHeader
                eyebrow={statusCopy.eyebrow}
                title={statusCopy.title}
                description={statusCopy.description}
                actions={
                    isFailed ? (
                        <Link
                            to="/checkout"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                            Back to checkout
                        </Link>
                    ) : null
                }
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                {/* ── Main column ── */}
                <section className="xl:col-span-8">
                    <div className="overflow-hidden rounded-[32px] border border-[#dbe6e1] bg-white shadow-[0_18px_50px_rgba(0,53,39,.08)]">
                        <div className={`p-6 text-white md:p-8 ${isFailed ? "bg-[#6b1c13]" : "bg-[#003527]"}`}>
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fed65b]">
                                        {statusCopy.eyebrow}
                                    </p>
                                    <h2 className="text-2xl font-black tracking-[-0.04em] md:text-3xl">
                                        {isReady
                                            ? "Payment confirmed"
                                            : isFailed
                                                ? "Payment could not be confirmed"
                                                : activeStep.title}
                                    </h2>
                                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
                                        {isReady
                                            ? "Your funds are held securely until you confirm delivery or collection."
                                            : isFailed
                                                ? "We could not confirm the payment result yet. Please do not retry multiple times until the payment status is checked."
                                                : activeStep.description}
                                    </p>
                                </div>

                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-white/10 text-[#fed65b] ring-1 ring-white/15">
                                    <span className="material-symbols-outlined icon-fill text-[42px]">
                                        {isReady ? "check_circle" : isFailed ? "error" : activeStep.icon}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-white/70">
                                    <span>Progress</span>
                                    <div className="flex items-center gap-3">
                                        {isProcessing && (
                                            <span className="font-semibold text-white/50">{elapsed}s</span>
                                        )}
                                        <span>{progress}%</span>
                                    </div>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-white/14">
                                    <div
                                        className="h-full rounded-full bg-[#fed65b] transition-all duration-700"
                                        style={{ width: `${progress}%` }}
                                        role="progressbar"
                                        aria-valuenow={progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-label="Payment processing progress"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step indicators */}
                        <div className="p-5 md:p-6">
                            {/* FIX #2: mobile step — only ever shows current step, no isMobileActive collision */}
                            <div className="md:hidden">
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                        Step {isReady ? PAYMENT_STEPS.length : currentStep + 1} of {PAYMENT_STEPS.length}
                                    </p>
                                    <div className="flex gap-1">
                                        {PAYMENT_STEPS.map((_, i) => (
                                            <span
                                                key={i}
                                                className={`block h-1.5 rounded-full transition-all duration-300 ${
                                                    isReady || i < currentStep
                                                        ? "w-5 bg-[#003527]"
                                                        : i === currentStep
                                                            ? "w-8 bg-[#003527]"
                                                            : "w-5 bg-[#dbe6e1]"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {/* FIX #2: pass isComplete explicitly, never mix isMobileActive with isReady logic */}
                                <MobileStepCard
                                    step={isReady ? PAYMENT_STEPS[PAYMENT_STEPS.length - 1] : activeStep}
                                    isComplete={isReady}
                                />
                            </div>

                            {/* Desktop 4-column grid */}
                            <div className="hidden grid-cols-4 gap-4 md:grid">
                                {PAYMENT_STEPS.map((step, index) => (
                                    <ProcessingStep
                                        key={step.title}
                                        step={step}
                                        index={index}
                                        currentStep={currentStep}
                                        isReady={isReady}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Status sections */}
                    {isProcessing && (
                        <section className="mt-6 rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0faf6] text-[#003527]">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">shield_locked</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[#121c2a]">Your money is protected</h2>
                                    <p className="mt-2 text-sm leading-7 text-[#66736d]">
                                        Even if this page closes unexpectedly, your payment is protected by Open Market's Buyer Protection until you confirm delivery.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {status === "timeout" && (
                        <section className="mt-6 rounded-[28px] border border-[#e8c29a] bg-[#fff8f0] p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0d6] text-[#8a5a00]">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">schedule</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-lg font-black text-[#121c2a]">Still waiting for the payment provider</h2>
                                    <p className="mt-2 text-sm leading-7 text-[#66736d]">
                                        This is taking longer than expected. We could not confirm a completed payment yet. Wait a moment longer, or contact our support team.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={handleRetry}
                                            className="inline-flex items-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white hover:bg-[#064e3b]"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                                            Try again
                                        </button>
                                        <Link
                                            to="/help-centre"
                                            className="inline-flex items-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3 text-sm font-black text-[#003527] hover:bg-[#f0faf6]"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                            Contact support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {status === "error" && (
                        <section className="mt-6 rounded-[28px] border border-[#e8a89c] bg-[#fff8f6] p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fdeeea] text-[#9f2d20]">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">error</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[#121c2a]">Payment was not completed</h2>
                                    <p className="mt-2 text-sm leading-7 text-[#66736d]">
                                        We could not confirm the payment result yet. Please do not retry multiple times until the payment status is checked. Return to checkout or contact support.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <Link
                                            to="/checkout"
                                            className="inline-flex items-center gap-2 rounded-2xl bg-[#9f2d20] px-5 py-3 text-sm font-black text-white hover:bg-[#842318]"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                            Back to checkout
                                        </Link>
                                        <Link
                                            to="/help-centre"
                                            className="inline-flex items-center gap-2 rounded-2xl border border-[#cbd7d1] bg-white px-5 py-3 text-sm font-black text-[#003527] hover:bg-[#f0faf6]"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                            Contact support
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* FIX #1: Ready state — confirmation card owns all success messaging */}
                    {isReady && (
                        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#b7e4d1] bg-white shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <div className="flex items-center gap-4 border-b border-[#e5ece8] bg-[#f0faf6] p-6">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#003527] text-white">
                                    <span className="material-symbols-outlined icon-fill text-[24px]">check_circle</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-[#121c2a]">Payment complete</h2>
                                    <p className="text-sm leading-6 text-[#66736d]">
                                        Order {ORDER_SUMMARY.orderNumber} is confirmed and protected. A confirmation email is on its way.
                                    </p>
                                </div>
                            </div>
                            <div className="p-6">
                                <Link
                                    to="/payment-success"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                                >
                                    View your order
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Dev simulation panel — gated, never shown to buyers */}
                    {import.meta.env.DEV && (
                        <section className="mt-6 rounded-[28px] border-2 border-dashed border-[#fed65b] bg-[#fffdf0] p-5">
                            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#8a5a00]">
                                Dev only — simulate payment result
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/payment-success"
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#003527] px-4 py-2.5 text-xs font-black text-white"
                                >
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    Simulate success
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setStatus("error")}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#e8a89c] bg-[#fdeeea] px-4 py-2.5 text-xs font-black text-[#9f2d20]"
                                >
                                    <span className="material-symbols-outlined text-[16px]">error</span>
                                    Simulate failure
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus("timeout")}
                                    className="inline-flex items-center gap-2 rounded-xl border border-[#e8c29a] bg-[#fff8f0] px-4 py-2.5 text-xs font-black text-[#8a5a00]"
                                >
                                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                                    Simulate timeout
                                </button>
                            </div>
                        </section>
                    )}
                </section>

                {/* ── Sidebar ── */}
                <aside className="xl:col-span-4">
                    <div className="space-y-6 xl:sticky xl:top-[88px]">
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <h2 className="mb-5 text-xl font-black text-[#121c2a]">Order details</h2>
                            <div className="space-y-3 border-b border-[#e5ece8] pb-5">
                                <SummaryRow label="Order number" value={ORDER_SUMMARY.orderNumber} />
                                <SummaryRow label="Items" value={`${ORDER_SUMMARY.items.length}`} />
                                <SummaryRow label="Sellers" value={`${ORDER_SUMMARY.sellers}`} />
                                <SummaryRow label="Payment" value={ORDER_SUMMARY.paymentMethod} />
                                <SummaryRow label="Delivery" value={ORDER_SUMMARY.deliveryMethod} />
                            </div>
                            <div className="border-b border-[#e5ece8] py-4">
                                <button
                                    type="button"
                                    onClick={() => setShowItems((v) => !v)}
                                    className="flex w-full items-center justify-between text-sm font-black text-[#003527]"
                                    aria-expanded={showItems}
                                >
                                    <span>View items</span>
                                    <span className={`material-symbols-outlined text-[18px] transition-transform ${showItems ? "rotate-180" : ""}`}>
                                        expand_more
                                    </span>
                                </button>
                                {showItems && (
                                    <ul className="mt-3 space-y-3">
                                        {ORDER_SUMMARY.items.map((item) => (
                                            <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                                                <div className="min-w-0">
                                                    <p className="truncate font-black text-[#121c2a]">{item.title}</p>
                                                    <p className="text-xs font-semibold text-[#66736d]">{item.seller}</p>
                                                </div>
                                                <span className="shrink-0 font-black text-[#003527]">{formatRand(item.price)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="flex items-center justify-between gap-4 pt-5">
                                <span className="text-base font-black text-[#121c2a]">Total</span>
                                <span className="text-2xl font-black tracking-[-0.04em] text-[#121c2a]">
                                    {formatRand(ORDER_SUMMARY.total)}
                                </span>
                            </div>
                        </section>

                        <section className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[32px] text-[#fed65b]">shield_locked</span>
                            <h2 className="mb-2 text-xl font-black">Buyer Protection</h2>
                            <p className="text-sm leading-7 text-white/70">
                                Your payment is held securely until you confirm delivery or collection. If anything goes wrong, we step in.
                            </p>
                            <Link
                                to="/trust-safety"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
                            >
                                Learn more
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </section>

                        {/* FIX #4: "Do not refresh" is blue-grey/neutral, not amber — amber is reserved for timeout urgency */}
                        {isProcessing && (
                            <section className="rounded-[28px] border border-[#dbe6e1] bg-[#f8fbf9] p-6">
                                <span className="material-symbols-outlined icon-fill mb-4 block text-[28px] text-[#66736d]">info</span>
                                <h2 className="mb-2 text-base font-black text-[#121c2a]">Do not refresh this page</h2>
                                <p className="text-sm leading-7 text-[#66736d]">
                                    Refreshing or closing during payment can interrupt the payment provider redirect. Wait for the result before taking any action.
                                </p>
                            </section>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

// ─── Mobile step card — separate component, no prop collision with ProcessingStep ──

// Mobile step card shows only the current payment phase to reduce small-screen noise.
function MobileStepCard({ step, isComplete }) {
    return (
        <article className={`rounded-[22px] border p-4 ${
            isComplete
                ? "border-[#b7e4d1] bg-[#f0faf6]"
                : "border-[#003527] bg-white shadow-[0_8px_24px_rgba(0,53,39,.08)]"
        }`}>
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
                isComplete ? "bg-[#003527] text-white" : "bg-[#fff8e5] text-[#8a5a00]"
            }`}>
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    {isComplete ? "check" : step.icon}
                </span>
            </div>
            <h3 className="text-sm font-black leading-5 text-[#121c2a]">{step.title}</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#66736d]">{step.description}</p>
        </article>
    );
}

// ─── Desktop step card ────────────────────────────────────────────────────────

// Desktop step cards show the full processing path and current phase at a glance.
function ProcessingStep({ step, index, currentStep, isReady }) {
    const isComplete = isReady || index < currentStep;
    const isActive = !isReady && index === currentStep;

    return (
        <article className={`rounded-[22px] border p-4 transition ${
            isComplete
                ? "border-[#b7e4d1] bg-[#f0faf6]"
                : isActive
                    ? "border-[#003527] bg-white shadow-[0_8px_24px_rgba(0,53,39,.08)]"
                    : "border-[#dbe6e1] bg-white"
        }`}>
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-2xl ${
                isComplete
                    ? "bg-[#003527] text-white"
                    : isActive
                        ? "bg-[#fff8e5] text-[#8a5a00]"
                        : "bg-[#f8fbf9] text-[#8b9791]"
            }`}>
                <span className="material-symbols-outlined icon-fill text-[21px]">
                    {isComplete ? "check" : step.icon}
                </span>
            </div>
            <h3 className="text-sm font-black leading-5 text-[#121c2a]">{step.title}</h3>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#66736d]">{step.description}</p>
        </article>
    );
}

// ─── Summary row ──────────────────────────────────────────────────────────────

// Summary rows keep payment details compact inside sidebar/card sections.
function SummaryRow({ label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-[#66736d]">{label}</span>
            <span className="text-right font-black text-[#121c2a]">{value}</span>
        </div>
    );
}
