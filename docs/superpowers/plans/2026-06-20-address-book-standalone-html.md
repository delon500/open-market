# Standalone Address Book HTML Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a browser-ready Tailwind CDN version of the complete buyer Address Book page with all address-management interactions implemented in vanilla JavaScript.

**Architecture:** Create one standalone HTML document containing the buyer account shell, address-book markup targets, modal templates, scoped CSS, and a state-driven JavaScript controller. Address cards and summaries render from one in-memory address array, while event delegation connects actions to dynamically rendered cards.

**Tech Stack:** HTML5, Tailwind CSS browser CDN, Material Symbols, vanilla JavaScript, in-app browser verification

---

### Task 1: Build the Complete Responsive Buyer Shell

**Files:**
- Create: `frontend/src/pages/buyer/AddressBookPage.html`
- Reference: `frontend/src/layouts/BuyerLayout.jsx`
- Reference: `frontend/src/components/buyer/BuyerSidebar.jsx`
- Reference: `frontend/src/components/buyer/BuyerHeader.jsx`
- Reference: `frontend/src/components/buyer/BuyerMobileNav.jsx`
- Reference: `frontend/src/pages/buyer/AddressBookPage.jsx`

- [ ] **Step 1: Create the document head and shared visual rules**

Add the Tailwind browser CDN, Material Symbols, Open Market metadata, responsive viewport, and the small CSS layer needed for form controls, focus states, modal scroll locking, and icon fill:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Address Book | Open Market</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <style>
    body { font-family: "Hanken Grotesk", system-ui, sans-serif; }
    body.is-locked { overflow: hidden; }
    .material-symbols-outlined { font-variation-settings: "FILL" 0, "wght" 500, "GRAD" 0, "opsz" 24; }
    .icon-fill { font-variation-settings: "FILL" 1, "wght" 600, "GRAD" 0, "opsz" 24; }
    .buyer-input { width: 100%; border: 1px solid #dbe6e1; border-radius: 16px; background: #f8fbf9; padding: 14px 16px; color: #121c2a; font-size: 14px; font-weight: 700; outline: none; }
    .buyer-input:focus { border-color: #003527; background: #fff; box-shadow: 0 0 0 3px rgba(0,53,39,.1); }
    .buyer-input::placeholder { color: #9aada7; font-weight: 500; }
  </style>
</head>
```

- [ ] **Step 2: Recreate the desktop and mobile account navigation**

Build the fixed desktop sidebar, sticky header with search and account controls, responsive mobile menu drawer, and five-item mobile bottom navigation. Use clean paths such as `/account`, `/shop`, and `/account/profile`, and use `shopping_bag` for order/cart-related UI.

- [ ] **Step 3: Add the address-book content structure**

Inside the account layout, add the page heading, Add Address button, hidden status banner, address-list render target, default-address summary target, delivery guidance card, and modal containers:

```html
<main class="mx-auto w-full max-w-[1440px] px-4 py-7 pb-28 md:px-6 md:py-9 lg:px-8 lg:pb-10">
  <section aria-labelledby="page-title" class="space-y-8">
    <header class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div class="max-w-3xl">
        <p class="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#003527]">Address book</p>
        <h1 id="page-title" class="text-[30px] font-black leading-tight text-[#121c2a] md:text-[42px]">Manage delivery addresses</h1>
        <p class="mt-3 text-sm leading-7 text-[#66736d] md:text-base">Save delivery addresses for faster checkout, courier delivery, and Click & Collect communication.</p>
      </div>
      <button id="add-address-button" type="button">Add address</button>
    </header>
    <div id="success-message" class="hidden" role="status" aria-live="polite"></div>
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <section id="address-list" class="space-y-5 xl:col-span-8" aria-label="Saved addresses"></section>
      <aside class="space-y-6 xl:col-span-4">
        <section id="default-address-summary"></section>
        <section id="delivery-guidance"></section>
      </aside>
    </div>
  </section>
</main>
<div id="address-modal-root"></div>
<div id="delete-modal-root"></div>
```

- [ ] **Step 4: Open the HTML directly for the first render check**

Open:

```text
file:///D:/open-market/frontend/src/pages/buyer/AddressBookPage.html
```

Expected: the complete buyer shell renders at desktop and mobile widths with no horizontal overflow, even though dynamic address targets are not populated yet.

### Task 2: Implement State-Driven Address Rendering

**Files:**
- Modify: `frontend/src/pages/buyer/AddressBookPage.html`

- [ ] **Step 1: Define the address state and safe HTML helper**

Add the two React sample addresses, editing/deletion identifiers, and an escaping helper:

```javascript
let addresses = [
  {
    id: "addr-1", label: "Home", recipientName: "Delon Wenyeve",
    phone: "+27 72 000 0000", addressLine1: "24 Vilakazi Street",
    addressLine2: "Orlando West", suburb: "Soweto", city: "Johannesburg",
    province: "Gauteng", postalCode: "1804",
    deliveryInstructions: "Call when arriving at the gate.", isDefault: true
  },
  {
    id: "addr-2", label: "Campus", recipientName: "Delon Wenyeve",
    phone: "+27 72 000 0000", addressLine1: "University Road",
    addressLine2: "Main campus entrance", suburb: "Auckland Park",
    city: "Johannesburg", province: "Gauteng", postalCode: "2092",
    deliveryInstructions: "Meet at reception.", isDefault: false
  }
];
let editingAddressId = null;
let deletingAddressId = null;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}
```

- [ ] **Step 2: Render cards, default summary, and empty state from one source**

Implement `renderAddressBook()`, `renderAddressCard(address)`, and `renderEmptyState()`. Every mutation must call `renderAddressBook()` so card order, default badges, action buttons, and the right-hand summary stay synchronized.

```javascript
function renderAddressBook() {
  const list = document.querySelector("#address-list");
  const defaultAddress = addresses.find((address) => address.isDefault);
  list.innerHTML = addresses.length
    ? addresses.map(renderAddressCard).join("")
    : renderEmptyState();
  document.querySelector("#default-address-summary").innerHTML = renderDefaultSummary(defaultAddress);
}
```

- [ ] **Step 3: Connect card actions with event delegation**

Listen once on `#address-list`, read `data-action` and `data-address-id`, and route clicks to edit, delete, set-default, or add flows:

```javascript
document.querySelector("#address-list").addEventListener("click", (event) => {
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const { action, addressId } = control.dataset;
  if (action === "add") openAddressForm();
  if (action === "edit") openAddressForm(addressId);
  if (action === "delete") openDeleteDialog(addressId);
  if (action === "set-default") setDefaultAddress(addressId);
});
```

- [ ] **Step 4: Verify initial rendering**

Refresh the direct-file page.

Expected: Home and Campus cards render, Home carries the Default badge, Campus shows Set default, and the right-hand summary displays Home.

### Task 3: Implement Add and Edit Address Modal Flows

**Files:**
- Modify: `frontend/src/pages/buyer/AddressBookPage.html`

- [ ] **Step 1: Render one reusable form dialog**

Implement `openAddressForm(addressId = null)` to populate all fields for edits or clear them for additions. Include label, recipient name, phone, postal code, two address lines, suburb, city, province, and delivery instructions. Apply `role="dialog"`, `aria-modal="true"`, and focus `#recipientName` after rendering.

- [ ] **Step 2: Close the dialog safely**

Implement `closeAddressForm()` to clear `editingAddressId`, empty the modal root, remove `is-locked` from the body when no other overlay is open, and return focus to `#add-address-button`.

- [ ] **Step 3: Save additions and edits**

Handle form submission through `FormData` and normalize every field with `.trim()`:

```javascript
function saveAddress(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const formAddress = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, String(value).trim()])
  );

  if (editingAddressId) {
    addresses = addresses.map((address) =>
      address.id === editingAddressId ? { ...address, ...formAddress } : address
    );
    showSuccess("Address updated.");
  } else {
    addresses = [{
      id: `addr-${Date.now()}`,
      ...formAddress,
      isDefault: addresses.length === 0
    }, ...addresses];
    showSuccess("Address added.");
  }

  closeAddressForm();
  renderAddressBook();
}
```

- [ ] **Step 4: Verify add and edit flows**

Expected:
- Required fields block empty submissions.
- Adding prepends a new card and shows `Address added.`
- Editing updates the correct card and shows `Address updated.`
- Cancelling leaves the array unchanged.

### Task 4: Implement Default Selection and Deletion

**Files:**
- Modify: `frontend/src/pages/buyer/AddressBookPage.html`

- [ ] **Step 1: Implement default-address selection**

```javascript
function setDefaultAddress(addressId) {
  const target = addresses.find((address) => address.id === addressId);
  if (!target) return;
  addresses = addresses.map((address) => ({
    ...address,
    isDefault: address.id === addressId
  }));
  renderAddressBook();
  showSuccess(`${target.label} is now your default delivery address.`);
}
```

- [ ] **Step 2: Render the delete confirmation dialog**

Implement `openDeleteDialog(addressId)` with the target label and address. If it is the default, include the automatic reassignment explanation. Focus the Cancel button when the dialog opens.

- [ ] **Step 3: Delete and reassign defaults**

```javascript
function confirmDelete() {
  const target = addresses.find((address) => address.id === deletingAddressId);
  if (!target) return closeDeleteDialog();

  let remaining = addresses.filter((address) => address.id !== deletingAddressId);
  let reassignedLabel = "";
  if (target.isDefault && remaining.length) {
    reassignedLabel = remaining[0].label;
    remaining = remaining.map((address, index) => ({ ...address, isDefault: index === 0 }));
  }
  addresses = remaining;
  closeDeleteDialog();
  renderAddressBook();
  showSuccess(reassignedLabel
    ? `${target.label} address removed. ${reassignedLabel} is now your default address.`
    : `${target.label} removed.`);
}
```

- [ ] **Step 4: Verify destructive and empty-state flows**

Expected:
- Cancel leaves the target address untouched.
- Deleting a non-default address leaves the current default unchanged.
- Deleting the default reassigns the first remaining card.
- Deleting the final card displays the empty state and no-address summary.
- The empty-state Add Address button opens a blank form.

### Task 5: Complete Responsive and Browser Verification

**Files:**
- Verify: `frontend/src/pages/buyer/AddressBookPage.html`

- [ ] **Step 1: Verify the mobile drawer and bottom navigation**

At a 390x844 viewport, open and close the drawer through the menu button, backdrop, close button, and navigation links. Confirm the page behind the drawer does not scroll and the bottom navigation does not cover address actions.

- [ ] **Step 2: Verify desktop layout**

At a 1440x900 viewport, confirm the sidebar remains visible, the header remains sticky, address cards occupy eight grid columns, the summary occupies four, and no content overlaps.

- [ ] **Step 3: Run the complete interaction checklist**

Exercise add, edit, set default, delete non-default, delete default, default reassignment, delete final address, and add from empty state. Confirm each success message matches the completed action.

- [ ] **Step 4: Inspect browser errors**

Expected console result: no JavaScript exceptions, failed selectors, or invalid form-handler errors. Network messages are acceptable only if the Tailwind CDN or Google Fonts are unavailable.

- [ ] **Step 5: Review the final source**

Run:

```powershell
Select-String -Path 'frontend/src/pages/buyer/AddressBookPage.html' -Pattern 'href="#"','shopping_cart','shopping_basket','escrow'
```

Expected: no matches.
