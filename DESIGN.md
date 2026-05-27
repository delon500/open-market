---
name: Open Market
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#404944'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#442800'
  on-tertiary: '#ffffff'
  tertiary-container: '#623c00'
  on-tertiary-container: '#f69f0d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The brand identity is rooted in the concept of "Premium Accessibility." It bridges the gap between a high-end editorial experience and a bustling, energetic marketplace. The design system prioritizes trust, growth, and South African warmth, utilizing a **Corporate Modern** foundation infused with **Soft Minimalist** layouts.

The visual language communicates authority and security through structured grids, while maintaining a welcoming atmosphere through rounded geometry and vibrant accents. The emotional response should be one of reliability (it works), quality (it's curated), and local pride (it's ours).

- **Minimalism:** Used in the generous whitespace to prevent "marketplace clutter."
- **Corporate Modern:** Used in the precision of the typography and the systematic approach to components.
- **Vibrant Accents:** Used to channel the energy of South African commerce.

## Colors

The palette is inspired by the rich natural and economic landscape of South Africa.

- **Primary (Deep Green):** Represents forest and emerald tones, signifying stability, trust, and organic growth. It is the dominant color for navigation and primary brand moments.
- **Secondary (Gold):** Used sparingly to denote premium features, verified sellers, and high-quality curations. It adds a layer of prestige to the interface.
- **Accent (Warm Orange):** An energetic call-to-action color used to drive conversion and highlight friendly, local interactions.
- **Neutrals:** Dark Charcoal (Base-900) is used for high-readability typography, while Light Grey (Base-100) provides subtle scaffolding for borders and background sections.

## Typography

The design system utilizes **Hanken Grotesk** for its sharp, contemporary, and professional personality. It provides the technical precision required for a fintech-adjacent marketplace while remaining approachable for everyday shoppers.

- **Headlines:** Use Bold and ExtraBold weights to establish an authoritative hierarchy. The tight letter-spacing on larger sizes creates a premium, editorial feel.
- **Body:** Standardized at 16px for optimal legibility. Use Medium weights for sub-headers and emphasis.
- **Labels:** Used for metadata, category tags, and navigation items. These are often slightly tracked out to improve scanability at smaller sizes.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The philosophy is "Generous Spacing," prioritizing clarity over information density.

- **Vertical Rhythm:** Built on an 8px baseline. Sections are separated by large 80px - 120px gaps to allow the eye to rest and focus on specific product categories.
- **Margins:** Desktop views utilize a 40px outer margin to frame the content, while mobile scales down to 16px to maximize real estate.
- **Alignment:** Content is generally center-aligned within the 1280px container to maintain a focused, high-end catalog feel.

## Elevation & Depth

To maintain a premium feel, the design system avoids heavy shadows in favor of **Ambient Shadows** and **Tonal Layering**.

- **Surface Levels:** The main page background uses #f8f9ff. Pure white (#ffffff) is reserved for elevated cards, forms, product surfaces, and surface-container-lowest areas. Elevated surfaces like product cards use a very subtle "Natural Shadow" - a low-opacity (4-6%) blur with a slight tint of the primary green or charcoal.
- **Interactive Depth:** Elements do not "lift" aggressively on hover. Instead, they utilize a subtle shift in shadow density and a slight scale-up (1.02x) to indicate interactivity.
- **Borders:** Use 1px solid strokes in Light Grey (#E5E7EB) for secondary containers, keeping the UI light and airy.

## Shapes

The shape language is defined by modern, exaggerated softness to evoke friendliness.

- **Cards:** Use `rounded-2xl` styling. In this project, cards should generally feel between 16px and 24px radius depending on density, with tighter radii for dense account panels and larger radii for hero, product, and form cards.
- **Buttons & Inputs:** Use `rounded-xl` to provide a comfortable touch target that feels safer and more approachable than sharp corners.
- **Badges & Chips:** Use fully pill-shaped (999px) containers for status indicators, feature chips, account states, verification badges, and availability labels.

## Components

### Buttons
- **Primary:** Deep Green background with White text. High-contrast and authoritative. Examples include "Create Account", "Sign In", "Verify Phone Number", "Update Password", and "Contact Support."
- **Secondary:** Surface or outlined buttons for lower-priority actions such as returning to sign in, visiting the Help Centre, comparing plans, or changing a verification method.
- **Tertiary/Ghost:** Gold text on transparent backgrounds, used for navigation or "View All" actions to maintain the premium thread.
- **Warning/Restriction Actions:** Avoid aggressive red CTAs unless the action is destructive. Account support actions should remain calm, clear, and supportive.

### Cards
- **Product Cards:** `rounded-2xl` with a subtle ambient shadow. Photography should be top-aligned with no padding, while product details (title, price, seller) sit in a padded area below.
- **Seller Listings:** Feature a circular avatar of the seller, a "Verified" badge in Gold, and a brief description.

### Input Fields
- Soft grey borders that transition to a 2px Deep Green border on focus. Labels are positioned above the field in `label-md` weight.

### Trust Elements
- **Verified Badges:** Gold icons with a shield or checkmark.
- **Security Banners:** Located in the footer and checkout flow, using subtle green tints and secure lock icons to reassure users.

### Lists & Navigation
- Horizontal scrolling "chips" for categories on mobile.
- Clean, icon-led navigation for account and cart management using thin-stroke linear icons.

## Public Page Shell

Public pages and authentication pages share a consistent shell so the marketplace feels like one Open Market application.

### Announcement Bar
- Fixed or top-positioned bar above the header.
- Deep green background with gold accent text and icon.
- Uses the `shield_locked` icon.
- Standard text: "Buyer Protection on every order — payments held until delivery is confirmed."

### Public Header
- Open Market logo uses `shopping_bag`.
- Logo links to `index.html`.
- Navigation links:
    - Shop -> `shop.html`
    - Become a Seller -> `become-seller.html`
    - Categories -> `index.html#categories`
    - How It Works -> `how-it-works.html`
    - Help -> `help-centre.html`
- Search bar is shown on desktop.
- Cart uses `shopping_bag` and links to `cart.html`.
- Cart badge should show item count.
- Sign In -> `login.html`.
- Join Now -> `account-type.html`.
- Mobile menu icon should be available on small screens.

### Mobile Bottom Nav
- Used on mobile pages for quick navigation.
- Links:
    - Shop -> `shop.html`
    - Categories -> `index.html#categories`
    - Cart -> `cart.html`
    - Account -> current auth/account page
- Cart icon must be `shopping_bag`.
- Active item uses the primary color.

### Footer
- Public footer uses dark `bg-inverse-surface`.
- Open Market logo uses `shopping_bag`.
- Brand description: "Empowering South African entrepreneurs and connecting them with local buyers through a secure, easy-to-use platform."
- Footer columns:
    - Shop & Explore:
        - Terms of Service -> `terms.html`
        - Privacy Policy -> `privacy.html`
        - Shipping Info -> `shipping.html`
    - For Sellers:
        - Seller Guidelines -> `seller-policy.html`
        - Pricing & Plans -> `pricing.html`
        - Seller Support -> `seller-support.html`
    - Support:
        - Help Centre -> `help-centre.html`
        - Contact Us -> `contact.html`
        - Dispute Resolution -> `dispute-resolution.html`
- Copyright: "© 2026 Open Market. Proudly South African."

## Authentication & Account Pages

Public authentication pages must only mention Buyer, Seller, or Buyer + Seller.

- Do not show Admin on public-facing auth pages.
- Admin/internal roles may exist in the database, but admin access should not appear in public UI.
- Auth pages use a two-column desktop layout:
    - Left side: trust, safety, benefits, or guidance panel.
    - Right side: form/action card.
- On mobile, the layout stacks vertically.
- Forms use clear labels above inputs.
- Password fields should include visibility toggle icons.
- Primary actions use deep green buttons.
- Secondary actions use outlined or surface buttons.
- Helper cards should be calm, trust-focused, and practical.

Current auth-page examples:
- `login.html`
- `register.html`
- `register-buyer.html`
- `register-seller.html`
- `forgot-password.html`
- `reset-password.html`
- `email-verification.html`
- `phone-verification.html`
- `account-suspended.html`

## Marketplace Trust Language

- Use "Buyer Protection" for public reassurance.
- Use "protected payment" or "payment held safely by Open Market."
- Avoid using the word "escrow" in public UI copy.
- Preferred wording:
    - "payments held until delivery is confirmed"
    - "payment held safely by Open Market"
    - "seller payout after delivery confirmation"
    - "eligible seller payout is processed according to the order status"
- Support and restriction pages must sound calm, clear, and helpful.
- Avoid threatening language.

## Icon Rules

- Use Material Symbols icons.
- Use `shopping_bag` for:
    - Open Market logo
    - Cart icon
    - Mobile bottom nav cart
- Do not use `shopping_cart` or `shopping_basket` for the cart in Open Market pages.
- Use `shield_locked` for buyer protection and security.
- Use `storefront` for seller/store concepts.
- Use `favorite` for wishlist/saved items.
- Use `local_shipping` for delivery.
- Use `report` for disputes/safety reports.
- Use `support_agent` for help/support.
- Use `mark_email_read` for email verification.
- Use `smartphone` for phone/OTP verification.
- Use `block` for suspended/restricted account states.

## Page Consistency Rules

- Keep Open Market branding consistent.
- Use "Open Market", never "Mzansi Market."
- Footer year must be 2026.
- Cart icon must always be `shopping_bag`.
- Public auth pages must not mention Admin.
- Avoid `href="#"` except for visual-only prototype buttons.
- Public support/security pages should link to:
    - `contact.html`
    - `help-centre.html`
    - `trust-safety.html`
- Register flows should remain separated:
    - `register.html` is a routing page.
    - `register-buyer.html` is buyer registration.
    - `register-seller.html` is seller registration.
- Verification flow:
    - `email-verification.html` -> `phone-verification.html`
    - `phone-verification.html` -> `buyer-dashboard.html` for prototype purposes.
- Password recovery flow:
    - `forgot-password.html` -> `reset-password.html` -> `login.html`.


