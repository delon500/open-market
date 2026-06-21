import { useEffect, useMemo, useRef, useState } from "react";
import BuyerPageHeader from "../../components/buyer/BuyerPageHeader";

const emptyAddressForm = {
    label: "Home",
    customLabel: "",
    recipientName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
    deliveryInstructions: "",
};

const initialAddresses = [
    {
        id: "addr-1",
        label: "Home",
        customLabel: "",
        recipientName: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        addressLine1: "24 Vilakazi Street",
        addressLine2: "Orlando West",
        suburb: "Soweto",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "1804",
        deliveryInstructions: "Call when arriving at the gate.",
        isDefault: true,
    },
    {
        id: "addr-2",
        label: "Campus",
        customLabel: "",
        recipientName: "Delon Wenyeve",
        phone: "+27 72 000 0000",
        addressLine1: "University Road",
        addressLine2: "Main campus entrance",
        suburb: "Auckland Park",
        city: "Johannesburg",
        province: "Gauteng",
        postalCode: "2092",
        deliveryInstructions: "Meet at reception.",
        isDefault: false,
    },
];

const provinceOptions = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "North West",
    "Northern Cape",
    "Western Cape",
];

const labelOptions = ["Home", "Work", "Campus", "Family", "Other"];
const maxInstructionLength = 300;

function getAddressLabel(address) {
    return address.label === "Other" && address.customLabel
        ? address.customLabel
        : address.label;
}

function getAddressIcon(label) {
    if (label === "Work") return "business";
    if (label === "Campus") return "school";
    if (label === "Family") return "family_home";
    return "home";
}

export default function AddressBookPage() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [formOpen, setFormOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [formData, setFormData] = useState(emptyAddressForm);
    const [successMessage, setSuccessMessage] = useState("");
    const [deletingAddressId, setDeletingAddressId] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const previousScrollPosition = useRef(0);

    const defaultAddress = useMemo(
        () => addresses.find((address) => address.isDefault),
        [addresses]
    );

    const deletingAddress = useMemo(
        () => addresses.find((address) => address.id === deletingAddressId) || null,
        [addresses, deletingAddressId]
    );

    const nextDefaultAddress = useMemo(() => {
        if (!deletingAddress?.isDefault) return null;
        return addresses.find((address) => address.id !== deletingAddress.id) || null;
    }, [addresses, deletingAddress]);

    const isEditing = Boolean(editingAddressId);

    // Keep short-lived feedback readable without leaving stale status on the page.
    useEffect(() => {
        if (!successMessage) return undefined;
        const timer = window.setTimeout(() => setSuccessMessage(""), 5000);
        return () => window.clearTimeout(timer);
    }, [successMessage]);

    // Lock the page behind either modal while preserving the user's scroll position on iOS.
    useEffect(() => {
        if (!formOpen && !deletingAddress) return undefined;
        previousScrollPosition.current = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${previousScrollPosition.current}px`;
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, previousScrollPosition.current);
        };
    }, [formOpen, deletingAddress]);

    // Close an address action menu when focus moves elsewhere on the page.
    useEffect(() => {
        if (!activeMenuId) return undefined;
        const closeMenu = (event) => {
            if (!event.target.closest("[data-address-menu]")) setActiveMenuId(null);
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [activeMenuId]);

    function openAddForm() {
        setEditingAddressId(null);
        setFormData(emptyAddressForm);
        setFormOpen(true);
        setSuccessMessage("");
        setActiveMenuId(null);
    }

    function openEditForm(address) {
        setEditingAddressId(address.id);
        setFormData({
            label: address.label,
            customLabel: address.customLabel || "",
            recipientName: address.recipientName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            suburb: address.suburb,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode,
            deliveryInstructions: address.deliveryInstructions,
        });
        setFormOpen(true);
        setSuccessMessage("");
        setActiveMenuId(null);
    }

    function closeForm() {
        setFormOpen(false);
        setEditingAddressId(null);
        setFormData(emptyAddressForm);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => {
            if (name === "label" && value !== "Other") {
                return {
                    ...current,
                    label: value,
                    customLabel: "",
                };
            }

            return {
                ...current,
                [name]: value,
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (isEditing) {
            setAddresses((current) =>
                current.map((address) =>
                    address.id === editingAddressId
                        ? {
                            ...address,
                            ...formData,
                        }
                        : address
                )
            );

            setSuccessMessage("Address updated.");
        } else {
            const newAddress = {
                id: `addr-${Date.now()}`,
                ...formData,
                isDefault: addresses.length === 0,
            };

            setAddresses((current) => [newAddress, ...current]);
            setSuccessMessage("Address added.");
        }

        closeForm();
    }

    function handleSetDefault(addressId) {
        const target = addresses.find((address) => address.id === addressId);

        setAddresses((current) =>
            current.map((address) => ({
                ...address,
                isDefault: address.id === addressId,
            }))
        );

        setSuccessMessage(
            target ? `${getAddressLabel(target)} is now your default delivery address.` : "Default delivery address updated."
        );
        setActiveMenuId(null);
    }

    function openDeleteConfirm(addressId) {
        setDeletingAddressId(addressId);
        setActiveMenuId(null);
    }

    function cancelDelete() {
        setDeletingAddressId(null);
    }

    function confirmDelete() {
        const addressToDelete = addresses.find(
            (address) => address.id === deletingAddressId
        );

        if (!addressToDelete) {
            setDeletingAddressId(null);
            return;
        }

        const remainingAddresses = addresses.filter(
            (address) => address.id !== deletingAddressId
        );

        const shouldAssignNewDefault =
            addressToDelete.isDefault && remainingAddresses.length > 0;

        const updatedAddresses = shouldAssignNewDefault
            ? remainingAddresses.map((address, index) => ({
                ...address,
                isDefault: index === 0,
            }))
            : remainingAddresses;

        const reassignedTo = shouldAssignNewDefault
            ? getAddressLabel(updatedAddresses[0])
            : null;

        setAddresses(updatedAddresses);

        setSuccessMessage(
            reassignedTo
                ? `${getAddressLabel(addressToDelete)} removed. ${reassignedTo} is now your default.`
                : `${getAddressLabel(addressToDelete)} removed.`
        );

        setDeletingAddressId(null);
    }

    return (
        <div className="space-y-8">
            <BuyerPageHeader
                eyebrow="Address book"
                title="Manage delivery addresses"
                description="Save delivery addresses for faster checkout, courier delivery, and Click & Collect communication."
                actions={
                    <button
                        type="button"
                        onClick={openAddForm}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_22px_rgba(0,53,39,.2)] transition hover:bg-[#064e3b]"
                    >
                        Add address
                        <span className="material-symbols-outlined text-[18px]">
              add_location_alt
            </span>
                    </button>
                }
            />

            {successMessage && (
                <div className="flex items-center gap-3 rounded-[24px] border border-[#b7e4d1] bg-[#f0faf6] px-5 py-4" role="status">
                    <span className="material-symbols-outlined icon-fill shrink-0 text-[20px] text-[#003527]">check_circle</span>
                    <p className="flex-1 text-sm font-black text-[#003527]">{successMessage}</p>
                    <button type="button" onClick={() => setSuccessMessage("")} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#003527] transition hover:bg-[#003527]/10" aria-label="Dismiss">
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <section className="space-y-5 xl:col-span-8">
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                onEdit={() => openEditForm(address)}
                                onDelete={() => openDeleteConfirm(address.id)}
                                onSetDefault={() => handleSetDefault(address.id)}
                                menuOpen={activeMenuId === address.id}
                                onToggleMenu={() => setActiveMenuId((current) => current === address.id ? null : address.id)}
                            />
                        ))
                    ) : (
                        <EmptyAddressState onAdd={openAddForm} />
                    )}
                </section>

                <aside className="space-y-6 xl:col-span-4">
                    <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <span className={`material-symbols-outlined icon-fill text-[34px] ${defaultAddress ? "text-[#003527]" : "text-[#9aada7]"}`}>home_pin</span>
                            {defaultAddress && (
                                <button type="button" onClick={() => openEditForm(defaultAddress)} className="inline-flex items-center gap-1.5 rounded-xl border border-[#dbe6e1] bg-white px-3 py-2 text-xs font-black text-[#003527] transition hover:bg-[#f0faf6]">
                                    <span className="material-symbols-outlined text-[15px]">edit</span>
                                    Edit
                                </button>
                            )}
                        </div>

                        <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                            Default delivery address
                        </h2>

                        {defaultAddress ? (
                            <div>
                                <p className="text-sm font-black text-[#121c2a]">
                                    {getAddressLabel(defaultAddress)}
                                </p>

                                <p className="mt-2 text-sm leading-7 text-[#66736d]">
                                    {defaultAddress.addressLine1}
                                    {defaultAddress.addressLine2
                                        ? `, ${defaultAddress.addressLine2}`
                                        : ""}
                                    <br />
                                    {defaultAddress.suburb}, {defaultAddress.city}
                                    <br />
                                    {defaultAddress.province}, {defaultAddress.postalCode}
                                </p>

                                <div className="mt-5 flex items-center gap-2 border-t border-[#e5ece8] pt-5 text-xs font-black text-[#087052]">
                                    <span className="material-symbols-outlined icon-fill text-[18px]">check_circle</span>
                                    Used automatically at checkout
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm leading-7 text-[#66736d]">Add an address to make checkout and delivery setup faster.</p>
                                <button type="button" onClick={openAddForm} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#003527] px-4 py-3 text-sm font-black text-white transition hover:bg-[#064e3b]">
                                    <span className="material-symbols-outlined text-[17px]">add_location_alt</span>
                                    Add address
                                </button>
                            </div>
                        )}
                    </section>

                    {addresses.length > 0 && (
                        <section className="rounded-[28px] border border-[#dbe6e1] bg-white p-6 shadow-[0_8px_32px_rgba(0,53,39,.05)]">
                            <span className="material-symbols-outlined icon-fill mb-4 block text-[34px] text-[#003527]">local_shipping</span>
                            <h2 className="mb-2 text-xl font-black text-[#121c2a]">Delivery-ready details</h2>
                            <p className="text-sm leading-7 text-[#66736d]">Accurate contact and location details help sellers, couriers, and support resolve delivery questions quickly.</p>
                            <div className="mt-5 space-y-3 border-t border-[#e5ece8] pt-5 text-sm font-bold text-[#405049]">
                                <DeliveryCheck>Include a reachable phone number</DeliveryCheck>
                                <DeliveryCheck>Add useful gate or reception notes</DeliveryCheck>
                                <DeliveryCheck>Review details before checkout</DeliveryCheck>
                            </div>
                        </section>
                    )}
                </aside>
            </div>

            {formOpen && (
                <AddressFormModal
                    formData={formData}
                    isEditing={isEditing}
                    onChange={handleChange}
                    onClose={closeForm}
                    onSubmit={handleSubmit}
                />
            )}

            {deletingAddress && (
                <DeleteConfirmModal
                    address={deletingAddress}
                    nextDefaultAddress={nextDefaultAddress}
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            )}

            <style>{`
        .buyer-input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid #dbe6e1;
          background: #f8fbf9;
          padding: 14px 16px;
          color: #121c2a;
          font-size: 14px;
          font-weight: 700;
          outline: none;
          transition: border-color .18s, background .18s, box-shadow .18s;
        }

        .buyer-input:focus {
          border-color: #003527;
          background: white;
          box-shadow: 0 0 0 3px rgba(0, 53, 39, .10);
        }

        .buyer-input::placeholder {
          color: #9aada7;
        }

        .modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #b7c8c0 transparent;
        }

        .action-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          z-index: 50;
          min-width: 180px;
          border: 1px solid #dbe6e1;
          border-radius: 18px;
          background: white;
          padding: 6px;
          box-shadow: 0 12px 40px rgba(0, 53, 39, .12);
        }

        .action-menu button {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          border-radius: 12px;
          padding: 10px 14px;
          color: #121c2a;
          font-size: 14px;
          font-weight: 800;
          text-align: left;
          transition: background .15s;
        }

        .action-menu button:hover {
          background: #f0faf6;
        }

        .action-menu button.danger {
          color: #9f2d20;
        }

        .action-menu button.danger:hover {
          background: #fdeeea;
        }

        @media (prefers-reduced-motion: reduce) {
          .action-menu button {
            transition-duration: 0ms;
          }
        }
      `}</style>
        </div>
    );
}

function AddressCard({ address, onEdit, onDelete, onSetDefault, menuOpen, onToggleMenu }) {
    const label = getAddressLabel(address);

    return (
        <article className="rounded-[28px] border border-[#dbe6e1] bg-white p-5 shadow-[0_8px_32px_rgba(0,53,39,.05)] md:p-7">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0faf6] px-3 py-1.5 text-xs font-black text-[#003527]">
                            <span className="material-symbols-outlined icon-fill text-[15px]">{getAddressIcon(address.label)}</span>
                            {label}
                        </span>

                        {address.isDefault && (
                            <span className="rounded-full bg-[#fff8e5] px-3 py-1.5 text-xs font-black text-[#8a5a00]">
                Default
              </span>
                        )}
                    </div>

                    <h2 className="text-lg font-black text-[#121c2a]">
                        {address.recipientName}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-[#66736d]">
                        {address.phone}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#404944]">
                        {address.addressLine1}
                        {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                        <br />
                        {address.suburb}, {address.city}
                        <br />
                        {address.province}, {address.postalCode}
                    </p>

                    {address.deliveryInstructions && (
                        <div className="mt-4 rounded-[18px] border border-[#e0e9e4] bg-[#f8fbf9] p-4">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#66736d]">
                                Delivery instructions
                            </p>
                            <p className="text-sm leading-6 text-[#404944]">
                                {address.deliveryInstructions}
                            </p>
                        </div>
                    )}
                </div>

                <div className="relative shrink-0" data-address-menu>
                    <button
                        type="button"
                        onClick={onToggleMenu}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#dbe6e1] bg-white text-[#003527] transition hover:bg-[#f0faf6]"
                        aria-label={`More options for ${label} address`}
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                    >
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>

                    {menuOpen && (
                        <div className="action-menu" role="menu" aria-label="Address actions">
                            {!address.isDefault && (
                                <button type="button" onClick={onSetDefault} role="menuitem">
                                    <span className="material-symbols-outlined icon-fill text-[18px] text-[#003527]">where_to_vote</span>
                                    Set as default
                                </button>
                            )}
                            <button type="button" onClick={onEdit} role="menuitem">
                                <span className="material-symbols-outlined text-[18px] text-[#003527]">edit</span>
                                Edit address
                            </button>
                            <div className="my-1 h-px bg-[#e5ece8]" />
                            <button type="button" onClick={onDelete} className="danger" role="menuitem">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

function DeleteConfirmModal({ address, nextDefaultAddress, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#001a13]/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="delete-address-title">
            <button
                type="button"
                aria-label="Cancel delete"
                className="absolute inset-0"
                onClick={onCancel}
            />

            <section className="relative w-full max-w-md rounded-t-[30px] bg-white p-6 shadow-[0_-20px_60px_rgba(0,0,0,.2)] sm:rounded-[30px] sm:p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff0ec] text-[#9f2d20]">
                    <span className="material-symbols-outlined text-[24px]">delete</span>
                </div>

                <h2 id="delete-address-title" className="mb-2 text-xl font-black text-[#121c2a]">
                    Remove this address?
                </h2>

                <p className="mb-1 text-sm leading-7 text-[#404944]">
                    <strong className="font-black text-[#121c2a]">{getAddressLabel(address)}</strong> &mdash;{" "}
                    {address.addressLine1}, {address.suburb}, {address.city} will be permanently removed from your address book.
                </p>

                {nextDefaultAddress && (
                    <p className="mt-3 flex items-start gap-2 rounded-2xl border border-[#fde68a] bg-[#fffdf4] p-3 text-xs font-bold leading-5 text-[#854d0e]">
                        <span className="material-symbols-outlined icon-fill mt-0.5 shrink-0 text-[16px]">info</span>
                        <span>This is your default address. <strong className="font-black">{getAddressLabel(nextDefaultAddress)}</strong> will automatically become your new default.</span>
                    </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-6 py-3.5 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9f2d20] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#84251a]"
                    >
                        Remove address
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </section>
        </div>
    );
}

function EmptyAddressState({ onAdd }) {
    return (
        <div className="rounded-[28px] border border-dashed border-[#bfc9c3] bg-white p-10 text-center">
      <span className="material-symbols-outlined mb-3 block text-[44px] text-[#9aada7]">
        add_location_alt
      </span>

            <h2 className="mb-2 text-xl font-black text-[#121c2a]">
                No saved addresses yet
            </h2>

            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-[#66736d]">
                Add your first delivery address to speed up checkout and order
                fulfilment.
            </p>

            <button
                type="button"
                onClick={onAdd}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#064e3b]"
            >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add address
            </button>
        </div>
    );
}

function AddressFormModal({
                              formData,
                              isEditing,
                              onChange,
                              onClose,
                              onSubmit,
                          }) {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#001a13]/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="address-form-title">
            <button
                type="button"
                aria-label="Close address form"
                className="absolute inset-0"
                onClick={onClose}
            />

            <section className="modal-scroll relative max-h-[92vh] w-full overflow-y-auto rounded-t-[30px] bg-white p-5 shadow-[0_-20px_60px_rgba(0,0,0,.2)] sm:max-w-3xl sm:rounded-[30px] sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">
                            {isEditing ? "Edit address" : "New address"}
                        </p>

                        <h2 id="address-form-title" className="text-2xl font-black tracking-[-0.035em] text-[#121c2a]">
                            {isEditing ? "Update delivery address" : "Add delivery address"}
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-[#66736d]">
                            Use accurate details so delivery and support can contact the right
                            person.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dbe6e1] text-[#003527] transition hover:bg-[#f0faf6]"
                        aria-label="Close"
                    >
            <span className="material-symbols-outlined">
              close
            </span>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="grid gap-5">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8b9791]">Contact</p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField label="Recipient name" id="recipientName">
                            <input
                                id="recipientName"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={onChange}
                                type="text"
                                required
                                autoFocus
                                placeholder="Who will receive the order?"
                                className="buyer-input"
                            />
                        </FormField>
                        <FormField label="Phone number" id="phone">
                            <input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={onChange}
                                type="tel"
                                required
                                placeholder="+27 00 000 0000"
                                className="buyer-input"
                            />
                        </FormField>
                    </div>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b9791]">Location</p>

                    <FormField label="Address line 1" id="addressLine1">
                        <input
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={onChange}
                            type="text"
                            required
                            placeholder="Street address, building, complex, or house number"
                            className="buyer-input"
                        />
                    </FormField>

                    <FormField label="Address line 2" id="addressLine2" optional>
                        <input
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={onChange}
                            type="text"
                            placeholder="Apartment, floor, unit, landmark"
                            className="buyer-input"
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                        <FormField label="Suburb" id="suburb">
                            <input
                                id="suburb"
                                name="suburb"
                                value={formData.suburb}
                                onChange={onChange}
                                type="text"
                                required
                                placeholder="Suburb"
                                className="buyer-input"
                            />
                        </FormField>

                        <FormField label="City" id="city">
                            <input
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={onChange}
                                type="text"
                                required
                                placeholder="City"
                                className="buyer-input"
                            />
                        </FormField>

                        <FormField label="Province" id="province">
                            <select
                                id="province"
                                name="province"
                                value={formData.province}
                                onChange={onChange}
                                required
                                className="buyer-input"
                            >
                                <option value="">Province</option>
                                {provinceOptions.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <FormField label="Postal code" id="postalCode">
                            <input
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={onChange}
                                type="text"
                                required
                                placeholder="1804"
                                className="buyer-input"
                            />
                        </FormField>
                    </div>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b9791]">Label</p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField label="Address label" id="label">
                            <select id="label" name="label" value={formData.label} onChange={onChange} className="buyer-input">
                                {labelOptions.map((label) => <option key={label} value={label}>{label}</option>)}
                            </select>
                        </FormField>

                        {formData.label === "Other" && (
                            <FormField label="Custom label" id="customLabel">
                                <input
                                    id="customLabel"
                                    name="customLabel"
                                    value={formData.customLabel}
                                    onChange={onChange}
                                    type="text"
                                    required
                                    maxLength={40}
                                    placeholder="e.g. Grandma's place, Warehouse"
                                    className="buyer-input"
                                />
                            </FormField>
                        )}
                    </div>

                    <div className="mt-2">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8b9791]">Delivery instructions <span className="font-semibold normal-case text-[#66736d]">optional</span></p>
                        <textarea id="deliveryInstructions" name="deliveryInstructions" value={formData.deliveryInstructions} onChange={onChange} rows={3} maxLength={maxInstructionLength} placeholder="Example: Call before arrival, gate code, reception instructions..." className="buyer-input mt-3 resize-none" />
                        <p className="mt-1.5 text-right text-xs font-semibold text-[#9aada7]">{formData.deliveryInstructions.length} / {maxInstructionLength}</p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[#e5ece8] pt-6 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center justify-center rounded-2xl border border-[#cbd7d1] bg-white px-6 py-4 text-sm font-black text-[#003527] transition hover:bg-[#f0faf6]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#003527] px-6 py-4 text-sm font-black text-white shadow-[0_8px_24px_rgba(0,53,39,.22)] transition hover:bg-[#064e3b]"
                        >
                            {isEditing ? "Save address" : "Add address"}
                            <span className="material-symbols-outlined text-[18px]">
                check
              </span>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

function FormField({ label, id, optional = false, children }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-black text-[#121c2a]"
            >
                {label}

                {optional && (
                    <span className="ml-1 font-semibold text-[#66736d]">
            optional
          </span>
                )}
            </label>

            {children}
        </div>
    );
}

function DeliveryCheck({ children }) {
    return (
        <p className="flex items-center gap-3">
            <span className="material-symbols-outlined icon-fill text-[19px] text-[#087052]">check_circle</span>
            {children}
        </p>
    );
}
