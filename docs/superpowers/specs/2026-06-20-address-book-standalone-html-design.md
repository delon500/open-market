# Standalone Address Book HTML Design

## Goal

Create `frontend/src/pages/buyer/AddressBookPage.html` as a standalone browser-ready version of `AddressBookPage.jsx`. The page must reproduce the complete buyer account layout and preserve the React prototype's address-book interactions using vanilla JavaScript.

## Presentation

- Load Tailwind CSS through the browser CDN.
- Load Material Symbols for the existing icon language.
- Reproduce the desktop buyer sidebar, sticky account header, responsive content area, mobile drawer, and mobile bottom navigation.
- Match the current Open Market colors, typography, spacing, cards, controls, and responsive breakpoints.
- Keep the page usable when opened directly through a `file:///` URL, with internet access required for CDN styling and fonts.

## Address Book Behavior

- Start with the same Home and Campus sample addresses as the React page.
- Allow users to add an address through a modal form.
- Allow users to edit an existing address using the same form populated with its values.
- Allow users to set any non-default address as the default.
- Ask for confirmation before deleting an address.
- When deleting the default address, automatically make the first remaining address the new default.
- Show the empty-address state after the final address is removed.
- Show contextual success feedback after add, edit, delete, and default-address actions.
- Update the default-address summary whenever address state changes.
- Keep state in memory so refreshing restores the original sample data, matching the React prototype.

## Interaction Architecture

- Store addresses, the editing ID, and the pending deletion ID in plain JavaScript variables.
- Render address cards and the default-address summary from the address array after every mutation.
- Use one reusable form modal for add and edit flows.
- Use event delegation for address-card actions so re-rendered cards remain interactive.
- Lock document scrolling while a modal or mobile drawer is open and restore it after closing.
- Close modals through their cancel buttons, close buttons, or backdrop controls.

## Accessibility

- Use semantic headings, navigation landmarks, forms, labels, and buttons.
- Give icon-only controls accessible names.
- Expose modal state with dialog semantics and move focus into opened dialogs.
- Keep keyboard focus indicators visible.
- Mark success feedback as a status message.

## Verification

- Open the HTML directly and verify desktop and mobile layouts.
- Exercise add, edit, set-default, delete, default reassignment, and empty-state flows.
- Confirm required form fields prevent invalid submission.
- Confirm the browser console has no JavaScript errors.
