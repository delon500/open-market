import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const MAX_TOTAL_BYTES = 5 * 1024 * 1024;
const TOPICS_NEEDING_ORDER = ["order", "payment", "dispute"];

const supportTypes = [
    { value: "order", label: "Order help" },
    { value: "payment", label: "Payment issue" },
    { value: "delivery", label: "Delivery or collection" },
    { value: "seller", label: "Seller support" },
    { value: "account", label: "Account support" },
    { value: "dispute", label: "Dispute or refund" },
];

const articleDatabase = {
    order: [
        { title: "Track your order status", to: "/help-centre" },
        { title: "What to do if your item has not arrived", to: "/help-centre" },
    ],
    payment: [
        { title: "Accepted payment methods", to: "/help-centre" },
        { title: "How Buyer Protection and payouts work", to: "/trust-safety" },
    ],
    delivery: [
        { title: "How Click & Collect works", to: "/how-it-works" },
        { title: "Arranging courier delivery", to: "/help-centre" },
    ],
    dispute: [
        { title: "When to open a dispute", to: "/help-centre" },
        { title: "Refund windows and support steps", to: "/help-centre" },
    ],
};

const contactOptions = [
    {
        icon: "support_agent",
        title: "General support",
        text: "Reach our support team by email or on WhatsApp.",
        type: "general",
    },
    {
        icon: "shopping_bag",
        title: "Order help",
        text: "Need help with delivery, collection, confirmation, or a dispute?",
        action: "View your orders",
        to: "/my-orders",
    },
    {
        icon: "storefront",
        title: "Seller support",
        text: "Need help opening your store, listing products, or understanding payouts?",
        action: "Become a seller",
        to: "/become-seller",
    },
];

const supportTopics = [
    {
        icon: "shield_locked",
        title: "Buyer Protection",
        text: "How protected payments work before and after delivery confirmation.",
        to: "/trust-safety",
    },
    {
        icon: "local_shipping",
        title: "Delivery & collection",
        text: "Delivery tracking, Click & Collect, and confirmation steps.",
        to: "/how-it-works",
    },
    {
        icon: "help",
        title: "Help articles",
        text: "Answers for buying, selling, payments, disputes, and your account.",
        to: "/help-centre",
    },
];

const initialValues = {
    name: "",
    email: "",
    supportType: "",
    orderNumber: "",
    subject: "",
    message: "",
};

function formatSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ContactPage() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const orderNumberRequired = TOPICS_NEEDING_ORDER.includes(values.supportType);
    const suggestedArticles = articleDatabase[values.supportType] || [];
    const totalFileSize = attachedFiles.reduce((sum, file) => sum + file.size, 0);

    const fileError = useMemo(() => {
        if (totalFileSize > MAX_TOTAL_BYTES) {
            return `Attachments total ${formatSize(totalFileSize)}. Please remove some - the limit is 5 MB.`;
        }

        return "";
    }, [totalFileSize]);

    function updateValue(name, value) {
        setValues((current) => ({ ...current, [name]: value }));
        setErrors((current) => {
            if (!current[name]) {
                return current;
            }

            const next = { ...current };
            delete next[name];
            return next;
        });
    }

    function addFiles(fileList) {
        const incomingFiles = Array.from(fileList || []);

        setAttachedFiles((current) => {
            const next = [...current];

            incomingFiles.forEach((file) => {
                const duplicate = next.some(
                    (existingFile) =>
                        existingFile.name === file.name && existingFile.size === file.size
                );

                if (!duplicate) {
                    next.push(file);
                }
            });

            return next;
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function removeFile(indexToRemove) {
        setAttachedFiles((current) =>
            current.filter((_, index) => index !== indexToRemove)
        );
    }

    function validateForm() {
        const nextErrors = {};

        if (!values.name.trim()) {
            nextErrors.name = "Please enter your name.";
        }

        const emailValue = values.email.trim();
        if (!emailValue) {
            nextErrors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            nextErrors.email = "Enter a valid email, like you@example.com.";
        }

        if (!values.supportType) {
            nextErrors.supportType = "Please choose a topic.";
        }

        if (orderNumberRequired && !values.orderNumber.trim()) {
            nextErrors.orderNumber = "An order number is required for this topic.";
        }

        if (!values.subject.trim()) {
            nextErrors.subject = "Please add a subject.";
        }

        if (!values.message.trim()) {
            nextErrors.message = "Please tell us what you need help with.";
        }

        if (fileError) {
            nextErrors.files = fileError;
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitted(true);
    }

    function resetForm() {
        setValues(initialValues);
        setErrors({});
        setAttachedFiles([]);
        setSubmitted(false);
    }

    return (
        <PublicLayout>
            <style>{`
        .contact-hero {
          position: relative;
          overflow: hidden;
          background-color: #003527;
          background-image:
            radial-gradient(circle at top left, rgba(149,211,186,.22), transparent 38%),
            radial-gradient(circle at 88% 16%, rgba(254,214,91,.16), transparent 32%),
            radial-gradient(circle, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: auto, auto, 28px 28px;
        }

        .form-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: #f8fbf9;
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 600;
          color: #121c2a;
          outline: none;
          transition: border-color .18s, box-shadow .18s, background .18s;
        }

        .form-input:focus {
          border-color: #003527;
          background: white;
          box-shadow: 0 0 0 3px rgba(0,53,39,.10);
        }

        .form-input::placeholder {
          color: #9aada7;
        }

        .form-input.field-error {
          border-color: #dc2626;
          background: #fef2f2;
        }

        .form-input.field-error:focus {
          box-shadow: 0 0 0 3px rgba(220,38,38,.12);
        }

        .drag-over {
          border-color: #003527 !important;
          background-color: #f0faf6 !important;
        }

        .skip-link {
          position: absolute;
          left: 16px;
          top: -60px;
          z-index: 60;
          border-radius: 12px;
          background: #003527;
          color: white;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 800;
          transition: top .18s ease;
        }

        .skip-link:focus {
          top: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .001ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <main id="main-content" className="bg-[#f6f9f7]">
                <section className="contact-hero">
                    <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-10 md:py-20">
                        <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#fed65b]/30 bg-[#fed65b]/15 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#fed65b]">
                <span className="material-symbols-outlined icon-fill text-[15px]">
                  contact_support
                </span>
                Contact Open Market
              </span>

                            <h1 className="my-5 text-[40px] font-black leading-[1.02] tracking-[-0.055em] text-white md:text-[66px]">
                                Need help? We're here to support you.
                            </h1>

                            <p className="mx-auto max-w-[620px] text-[17px] leading-8 text-white/70">
                                Get help with orders, payments, delivery, collections,
                                disputes, seller registration, or your account.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-4 py-8 md:px-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {contactOptions.map((item) => (
                            <ContactOption key={item.title} item={item} />
                        ))}
                    </div>
                </section>

                <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 pb-16 md:px-10 lg:grid-cols-12">
                    <section className="lg:col-span-8">
                        <div className="rounded-[32px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.06)] md:p-8">
                            <div className="mb-7">
                                <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                                    Send a message
                                </p>

                                <h2 className="mb-3 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#121c2a] md:text-[38px]">
                                    Tell us what you need help with
                                </h2>

                                <p className="max-w-2xl text-sm leading-7 text-[#404944]">
                                    Share a few details and the support team will get back to
                                    you. For order issues, include your order number.
                                </p>
                            </div>

                            {submitted ? (
                                <ConfirmationMessage onReset={resetForm} />
                            ) : (
                                <>
                                    {Object.keys(errors).length > 0 && (
                                        <div
                                            className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4"
                                            role="alert"
                                        >
                                            <p className="flex items-center gap-2 text-sm font-black text-red-700">
                        <span className="material-symbols-outlined icon-fill text-[18px]">
                          error
                        </span>
                                                Please fix the highlighted fields below.
                                            </p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <FormField
                                                label="Full name"
                                                id="name"
                                                error={errors.name}
                                            >
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    value={values.name}
                                                    onChange={(event) =>
                                                        updateValue("name", event.target.value)
                                                    }
                                                    placeholder="Enter your name"
                                                    className={`form-input ${
                                                        errors.name ? "field-error" : ""
                                                    }`}
                                                    aria-invalid={errors.name ? "true" : undefined}
                                                />
                                            </FormField>

                                            <FormField
                                                label="Email address"
                                                id="email"
                                                error={errors.email}
                                            >
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={values.email}
                                                    onChange={(event) =>
                                                        updateValue("email", event.target.value)
                                                    }
                                                    placeholder="you@example.com"
                                                    className={`form-input ${
                                                        errors.email ? "field-error" : ""
                                                    }`}
                                                    aria-invalid={errors.email ? "true" : undefined}
                                                />
                                            </FormField>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                            <FormField
                                                label="Support type"
                                                id="supportType"
                                                error={errors.supportType}
                                            >
                                                <select
                                                    id="supportType"
                                                    name="supportType"
                                                    value={values.supportType}
                                                    onChange={(event) =>
                                                        updateValue("supportType", event.target.value)
                                                    }
                                                    className={`form-input ${
                                                        errors.supportType ? "field-error" : ""
                                                    }`}
                                                    aria-invalid={
                                                        errors.supportType ? "true" : undefined
                                                    }
                                                >
                                                    <option value="">Select a topic</option>
                                                    {supportTypes.map((type) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormField>

                                            <FormField
                                                label="Order number"
                                                id="orderNumber"
                                                optional={!orderNumberRequired}
                                                requiredText={orderNumberRequired}
                                                error={errors.orderNumber}
                                            >
                                                <input
                                                    id="orderNumber"
                                                    name="orderNumber"
                                                    type="text"
                                                    value={values.orderNumber}
                                                    onChange={(event) =>
                                                        updateValue("orderNumber", event.target.value)
                                                    }
                                                    placeholder={
                                                        orderNumberRequired
                                                            ? "Required - e.g. OM-1024"
                                                            : "Example: OM-1024"
                                                    }
                                                    className={`form-input ${
                                                        errors.orderNumber ? "field-error" : ""
                                                    }`}
                                                    aria-invalid={
                                                        errors.orderNumber ? "true" : undefined
                                                    }
                                                />
                                            </FormField>
                                        </div>

                                        {suggestedArticles.length > 0 && (
                                            <DeflectionCenter articles={suggestedArticles} />
                                        )}

                                        <FormField
                                            label="Subject"
                                            id="subject"
                                            error={errors.subject}
                                        >
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                value={values.subject}
                                                onChange={(event) =>
                                                    updateValue("subject", event.target.value)
                                                }
                                                placeholder="Briefly describe the issue"
                                                className={`form-input ${
                                                    errors.subject ? "field-error" : ""
                                                }`}
                                                aria-invalid={errors.subject ? "true" : undefined}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Message"
                                            id="message"
                                            error={errors.message}
                                        >
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={values.message}
                        onChange={(event) =>
                            updateValue("message", event.target.value)
                        }
                        placeholder="Tell us what happened and what you need help with..."
                        className={`form-input resize-none ${
                            errors.message ? "field-error" : ""
                        }`}
                        aria-invalid={errors.message ? "true" : undefined}
                    />
                                        </FormField>

                                        <AttachmentDropzone
                                            files={attachedFiles}
                                            fileError={errors.files || fileError}
                                            dragOver={dragOver}
                                            fileInputRef={fileInputRef}
                                            onAddFiles={addFiles}
                                            onRemoveFile={removeFile}
                                            onDragOverChange={setDragOver}
                                        />

                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b] sm:w-fit"
                                        >
                                            Send message
                                            <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </section>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-5">
                            <SupportHoursCard />
                            <OrderIssueCard />
                            <SupportTopicsCard />
                        </div>
                    </aside>
                </section>
            </main>
        </PublicLayout>
    );
}

function ContactOption({ item }) {
    if (item.type === "general") {
        return (
            <div className="flex flex-col justify-between rounded-[24px] border border-[#dbe6e1] bg-white p-5 shadow-[0_6px_24px_rgba(0,53,39,0.04)]">
                <div>
          <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#003527]">
            {item.icon}
          </span>
                    <h2 className="mb-1 font-black text-[#121c2a]">{item.title}</h2>
                    <p className="mb-4 text-sm leading-6 text-[#404944]">{item.text}</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <a
                        href="mailto:support@openmarket.co.za"
                        className="inline-flex items-center justify-between rounded-xl border border-[#dbe6e1] bg-[#f8fbf9] px-4 py-2.5 text-xs font-black text-[#003527] transition hover:border-[#95d3ba]"
                    >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">mail</span>
              support@openmarket.co.za
            </span>
                        <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
                    </a>

                    <a
                        href="https://wa.me/27123456789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between rounded-xl border border-[#bbf7d0] bg-[#e6f7ed] px-4 py-2.5 text-xs font-black text-[#15803d] transition hover:bg-[#dcfce7]"
                    >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Chat on WhatsApp
            </span>
                        <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <Link
            to={item.to}
            className="group flex flex-col justify-between rounded-[24px] border border-[#dbe6e1] bg-white p-5 shadow-[0_6px_24px_rgba(0,53,39,0.04)] transition hover:-translate-y-1 hover:border-[#95d3ba]"
        >
            <div>
        <span className="material-symbols-outlined icon-fill mb-3 block text-[30px] text-[#003527]">
          {item.icon}
        </span>
                <h2 className="mb-1 font-black text-[#121c2a]">{item.title}</h2>
                <p className="mb-4 text-sm leading-6 text-[#404944]">{item.text}</p>
            </div>

            <span className="mt-auto inline-flex items-center gap-2 text-sm font-black text-[#003527]">
        {item.action}
                <span className="material-symbols-outlined text-[16px]">
          arrow_forward
        </span>
      </span>
        </Link>
    );
}

function FormField({
    label,
    id,
    children,
    error,
    optional = false,
    requiredText = false,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-black text-[#121c2a]">
                {label}{" "}
                {optional && (
                    <span className="text-xs font-normal text-[#66736d]">(optional)</span>
                )}
                {requiredText && (
                    <span className="text-xs font-black text-red-600">(required)</span>
                )}
            </label>

            {children}

            {error && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-600">
          <span className="material-symbols-outlined icon-fill text-[14px]">
            error
          </span>
                    {error}
        </p>
            )}
        </div>
    );
}

function DeflectionCenter({ articles }) {
    return (
        <div className="rounded-2xl border border-[#fed65b] bg-[#fffbeb] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#745c00]">
                <span className="material-symbols-outlined icon-fill text-[20px]">
                    lightbulb
                </span>
                <h4 className="text-sm font-black">
                    These articles might solve it faster
                </h4>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                {articles.map((article) => (
                    <Link
                        key={article.title}
                        to={article.to}
                        className="flex items-center justify-between gap-2 rounded-xl border border-[#fed65b]/40 bg-white p-3 text-xs font-bold text-[#745c00] transition hover:bg-[#fffdf5]"
                    >
                        <span>{article.title}</span>
                        <span className="material-symbols-outlined text-[14px]">
              open_in_new
            </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function AttachmentDropzone({
    files,
    fileError,
    dragOver,
    fileInputRef,
    onAddFiles,
    onRemoveFile,
    onDragOverChange,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-black text-[#121c2a]">
                Attachments{" "}
                <span className="text-xs font-normal text-[#66736d]">(optional)</span>
            </label>

            <label
                onDragEnter={(event) => {
                    event.preventDefault();
                    onDragOverChange(true);
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    onDragOverChange(true);
                }}
                onDragLeave={(event) => {
                    event.preventDefault();
                    onDragOverChange(false);
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    onDragOverChange(false);
                    onAddFiles(event.dataTransfer.files);
                }}
                className={`relative block cursor-pointer rounded-2xl border-2 border-dashed border-[#dbe6e1] bg-[#f8fbf9] p-6 text-center transition ${
                    dragOver ? "drag-over" : "hover:border-[#95d3ba] hover:bg-[#f0faf6]"
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="sr-only"
                    onChange={(event) => onAddFiles(event.target.files)}
                />

                <span className="material-symbols-outlined icon-fill mb-2 block text-[30px] text-[#003527]">
                    upload_file
                </span>
                <p className="text-sm font-bold text-[#121c2a]">
                    Drag and drop files here, or{" "}
                    <span className="text-[#003527] underline">browse</span>
                </p>
                <p className="mt-1 text-xs text-[#66736d]">
                    PNG, JPG, or PDF - up to 5 MB total
                </p>
            </label>

            {fileError && (
                <p className="mt-1.5 flex items-center gap-1 text-xs font-bold text-red-600">
          <span className="material-symbols-outlined icon-fill text-[14px]">
            error
          </span>
                    {fileError}
        </p>
            )}

            {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, index) => (
                        <span
                            key={`${file.name}-${file.size}-${index}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#003527] py-1 pl-3 pr-1.5 text-xs font-semibold text-white"
                        >
              <span className="material-symbols-outlined text-[12px]">
                description
              </span>
              <span className="max-w-[160px] truncate">{file.name}</span>
              <span className="text-white/60">{formatSize(file.size)}</span>
              <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white/20"
                  aria-label={`Remove ${file.name}`}
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function ConfirmationMessage({ onReset }) {
    return (
        <div
            className="rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] p-6"
            role="status"
            aria-live="polite"
        >
      <span className="material-symbols-outlined icon-fill mb-3 block text-[34px] text-[#003527]">
        check_circle
      </span>

            <h3 className="mb-2 text-xl font-black text-[#121c2a]">
                Message received
            </h3>

            <p className="text-sm leading-7 text-[#404944]">
                Thanks - we have logged your message and the support team will reply
                during support hours.
            </p>

            <button
                type="button"
                onClick={onReset}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                Send another message
            </button>
        </div>
    );
}

function SupportHoursCard() {
    return (
        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
      <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">
        schedule
      </span>

            <h2 className="mb-2 text-xl font-black text-[#121c2a]">Support hours</h2>

            <div className="space-y-3 text-sm leading-6 text-[#404944]">
                <p>
                    <strong className="text-[#121c2a]">Monday - Friday:</strong>{" "}
                    08:00 - 17:00
                </p>
                <p>
                    <strong className="text-[#121c2a]">Saturday:</strong> 09:00 - 13:00
                </p>
                <p>
                    <strong className="text-[#121c2a]">Sunday:</strong> Closed
                </p>
            </div>
        </div>
    );
}

function OrderIssueCard() {
    return (
        <div className="rounded-[28px] bg-[#003527] p-6 text-white shadow-[0_18px_44px_rgba(0,53,39,.16)]">
      <span className="material-symbols-outlined icon-fill mb-4 block text-[30px] text-[#fed65b]">
        shield_locked
      </span>

            <h2 className="mb-2 text-xl font-black">Order or payment issue?</h2>

            <p className="text-sm leading-7 text-white/70">
                Do not confirm delivery if there is a problem with your order. Contact
                support or open a dispute before the payout is released.
            </p>

            <Link
                to="/help-centre"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#fed65b] hover:underline"
            >
                Visit Help Centre
                <span className="material-symbols-outlined text-[16px]">
          arrow_forward
        </span>
            </Link>
        </div>
    );
}

function SupportTopicsCard() {
    return (
        <div className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_38px_rgba(0,53,39,0.05)]">
            <h2 className="mb-4 text-xl font-black text-[#121c2a]">
                Popular support topics
            </h2>

            <div className="space-y-3">
                {supportTopics.map((topic) => (
                    <SupportTopic key={topic.title} topic={topic} />
                ))}
            </div>
        </div>
    );
}

function SupportTopic({ topic }) {
    return (
        <Link
            to={topic.to}
            className="flex gap-3 rounded-2xl border border-[#dbe6e1] bg-[#f8fbf9] p-4 transition hover:border-[#95d3ba] hover:bg-[#f0faf6]"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#003527]">
        <span className="material-symbols-outlined icon-fill text-[20px]">
          {topic.icon}
        </span>
            </div>

            <div>
                <h3 className="mb-1 text-sm font-black text-[#121c2a]">
                    {topic.title}
                </h3>
                <p className="text-xs leading-5 text-[#66736d]">{topic.text}</p>
            </div>
        </Link>
    );
}
