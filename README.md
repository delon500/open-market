# Open Market

Open Market is a South African multi-vendor marketplace platform that connects local buyers with local sellers through a secure, trust-focused shopping experience.

The platform is designed around buyer protection, seller verification, protected payments, delivery confirmation, disputes, refunds, reviews, notifications, messaging, and account security.

## Project Vision

Open Market aims to make local online commerce easier, safer, and more accessible for South African buyers and entrepreneurs.

Buyers should be able to shop confidently, track orders, confirm delivery, open disputes, receive refund updates, and review sellers. Sellers should be able to create a store profile, list products, manage orders, handle delivery updates, respond to disputes, build reputation, and receive eligible payouts after delivery confirmation.

## Core Principles

* Buyer and seller trust comes first.
* Payments are protected until delivery is confirmed.
* Public pages should feel calm, clear, and secure.
* Buyer registration and seller registration are separate flows.
* Admin access should not appear on public-facing pages.
* The design should feel modern, local, professional, and easy to use.

## Recommended Tech Stack

### Frontend

* React
* JavaScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Material Symbols icons

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma
* PostgreSQL
* Zod
* JWT authentication

### Database

* PostgreSQL for the application database
* Prisma schema for implementation
* DBML / dbdiagram.io for database planning and visualization

## Repository Structure

```txt
open-market/
├─ README.md
├─ DESIGN.md
├─ .gitignore
├─ .env.example
│
├─ docs/
│  ├─ database/
│  │  ├─ open-market.dbml
│  │  └─ schema-notes.md
│  ├─ product/
│  │  ├─ pages-checklist.md
│  │  └─ user-flows.md
│  └─ api/
│     └─ api-routes.md
│
├─ frontend/
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ index.html
│  ├─ public/
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ routes/
│     ├─ layouts/
│     ├─ pages/
│     ├─ components/
│     ├─ services/
│     ├─ hooks/
│     ├─ context/
│     ├─ data/
│     ├─ styles/
│     └─ utils/
│
└─ backend/
   ├─ package.json
   ├─ tsconfig.json
   ├─ .env.example
   ├─ prisma/
   │  ├─ schema.prisma
   │  ├─ seed.ts
   │  └─ migrations/
   └─ src/
      ├─ server.ts
      ├─ app.ts
      ├─ config/
      ├─ common/
      ├─ modules/
      └─ routes/
```

## Frontend Structure

The frontend is organized around reusable layouts, pages, and components.

```txt
frontend/src/
├─ routes/
├─ layouts/
├─ pages/
│  ├─ public/
│  ├─ auth/
│  ├─ buyer/
│  └─ seller/
├─ components/
│  ├─ common/
│  ├─ layout/
│  ├─ auth/
│  ├─ product/
│  ├─ order/
│  └─ payment/
├─ services/
├─ hooks/
├─ context/
├─ data/
├─ styles/
└─ utils/
```

Important shared layout components:

```txt
components/layout/
├─ AnnouncementBar.jsx
├─ PublicHeader.jsx
├─ PublicFooter.jsx
├─ MobileBottomNav.jsx
├─ BuyerSidebar.jsx
└─ SellerSidebar.jsx
```

These components should be reused across pages to prevent inconsistent headers, footers, and mobile navigation.

## Backend Structure

The backend uses a module-based Express structure.

```txt
backend/src/
├─ server.ts
├─ app.ts
├─ config/
├─ common/
│  ├─ errors/
│  ├─ middleware/
│  ├─ utils/
│  └─ types/
├─ modules/
│  ├─ auth/
│  ├─ users/
│  ├─ buyers/
│  ├─ sellers/
│  ├─ products/
│  ├─ categories/
│  ├─ carts/
│  ├─ orders/
│  ├─ payments/
│  ├─ deliveries/
│  ├─ disputes/
│  ├─ refunds/
│  ├─ reviews/
│  ├─ messages/
│  ├─ notifications/
│  ├─ payouts/
│  └─ support/
└─ routes/
```

Each backend module should generally contain:

```txt
module-name.routes.ts
module-name.controller.ts
module-name.service.ts
module-name.validation.ts
module-name.types.ts
```

## Main Application Areas

### Public Pages

* Home
* Shop
* Product details
* Become a Seller
* How It Works
* Help Centre
* Contact
* Trust & Safety
* Terms
* Privacy
* Shipping Info

### Authentication Pages

* Login
* Register routing page
* Register as Buyer
* Register as Seller
* Forgot Password
* Reset Password
* Email Verification
* Phone / OTP Verification
* Account Type Selection
* Account Suspended

### Buyer Pages

* Buyer Dashboard
* Buyer Profile
* Address Book
* Wishlist / Saved Items
* Cart
* Checkout
* Payment Success / Failed
* My Orders
* Order Details
* Order Tracking
* Delivery Confirmation
* Delivery Code
* Open Dispute
* Dispute Details
* Refund Status
* Review Seller
* Review Product
* Notifications
* Messages

### Seller Pages

* Seller Dashboard
* Seller Profile
* Store Settings
* Seller Products
* Create Product
* Edit Product
* Seller Orders
* Seller Order Details
* Seller Payouts
* Seller Disputes
* Seller Messages

## Design System

The design system is documented in `DESIGN.md`.

Current direction:

* Deep green primary color
* Warm gold accent color
* Soft off-white page background
* Blue-grey surface cards
* Hanken Grotesk typography
* Rounded cards and inputs
* Ambient shadows
* Material Symbols icons
* `shopping_bag` for logo and cart
* Dark public footer
* Mobile bottom navigation
* Trust-focused marketplace language

## Public UI Rules

* Use `Open Market` consistently.
* Do not use placeholder names such as `Mzansi Market`.
* Do not show Admin on public-facing pages.
* Public auth pages should only mention Buyer, Seller, or Buyer + Seller.
* Use `shopping_bag` for the Open Market logo and cart.
* Do not use `shopping_cart` or `shopping_basket` for cart icons.
* Avoid `href="#"` except for visual-only prototype buttons.
* Footer year must be 2026.

## Marketplace Trust Language

Use:

* Buyer Protection
* protected payment
* payment held safely by Open Market
* payments held until delivery is confirmed
* seller payout after delivery confirmation

Avoid:

* escrow
* threatening restriction language
* public admin references

## Key User Flows

### Buyer Registration Flow

```txt
register.html
  → register-buyer.html
  → email-verification.html
  → phone-verification.html
  → buyer-dashboard.html
```

### Seller Registration Flow

```txt
register.html
  → register-seller.html
  → email-verification.html
  → phone-verification.html
  → seller setup / seller dashboard
```

### Password Recovery Flow

```txt
forgot-password.html
  → reset-password.html
  → login.html
```

### Account Restriction Flow

```txt
login.html
  → account-suspended.html
  → contact.html
```

## Initial Setup

### 1. Create or clone the repository

```bash
git clone <repo-url>
cd open-market
```

Or create it locally:

```bash
mkdir open-market
cd open-market
git init
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure backend environment

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/open_market?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:5173"
JWT_ACCESS_SECRET="replace_me_access_secret"
JWT_REFRESH_SECRET="replace_me_refresh_secret"
```

### 5. Run the backend

```bash
cd backend
npm run dev
```

Expected health endpoint:

```txt
http://localhost:5000/api/health
```

### 6. Run the frontend

```bash
cd frontend
npm run dev
```

Expected frontend URL:

```txt
http://localhost:5173
```

## Development Notes

* Keep reusable UI in `frontend/src/components`.
* Keep pages in `frontend/src/pages`.
* Keep backend business logic inside `backend/src/modules`.
* Keep validation close to the module that uses it.
* Keep database planning files in `docs/database`.
* Keep API route planning files in `docs/api`.
* Keep user-flow and page planning files in `docs/product`.
* Keep `DESIGN.md` as the visual source of truth.
* Keep DBML as the database planning source of truth until Prisma implementation begins.
