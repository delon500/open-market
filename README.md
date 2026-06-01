# Open Market

Open Market is a South African multi-vendor marketplace platform that connects local buyers with local sellers through a secure, trust-focused shopping experience.

The platform is being built around buyer protection, seller verification, protected payments, delivery confirmation, disputes, refunds, reviews, notifications, messaging, and account support.

## Project Vision

Open Market aims to make local online commerce easier, safer, and more accessible for South African buyers and entrepreneurs.

Buyers should be able to browse local products, save items, place orders, track deliveries, confirm receipt, open disputes, receive refund updates, and review sellers.

Sellers should be able to create a store profile, list products, manage orders, communicate with buyers, handle delivery updates, respond to disputes, build reputation, and receive eligible payouts after delivery confirmation.

## Core Principles

* Buyer and seller trust comes first.
* Payments are protected until delivery is confirmed.
* Public pages should feel calm, clear, and secure.
* Buyer registration and seller registration use separate flows.
* Admin access should not appear on public-facing pages.
* The design should feel modern, local, professional, and easy to use.

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Material Symbols icons
* Google SVG icon asset for social login

Current frontend dependencies include:

```txt
@tailwindcss/vite
axios
lucide-react
react
react-dom
react-router-dom
tailwindcss
```

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma
* PostgreSQL
* Zod
* JWT authentication planned
* Cookie-based auth support planned

Current backend dependencies include:

```txt
@prisma/client
bcryptjs
cookie-parser
cors
dotenv
express
helmet
jsonwebtoken
morgan
zod
```

### Database

* PostgreSQL for the application database
* Prisma schema for implementation
* DBML / dbdiagram.io for database planning and visualization

## Repository Structure

```txt
open-market/
├─ README.md
├─ DESIGN.md
├─ AGENT.md
├─ .gitignore
├─ .env.example
│
├─ docs/
│  ├─ api/
│  │  └─ api-routes.md
│  ├─ database/
│  │  └─ open-market.dbml
│  └─ product/
│     ├─ pages-checklist.md
│     └─ user-flows.md
│
├─ frontend/
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ vite.config.js
│  ├─ index.html
│  ├─ public/
│  └─ src/
│     ├─ assets/
│     │  └─ icons/
│     │     └─ google.svg
│     ├─ components/
│     │  ├─ auth/
│     │  ├─ common/
│     │  ├─ layout/
│     │  ├─ order/
│     │  ├─ payment/
│     │  └─ store/
│     ├─ context/
│     ├─ data/
│     ├─ hooks/
│     ├─ layouts/
│     ├─ pages/
│     │  ├─ auth/
│     │  ├─ buyer/
│     │  ├─ public/
│     │  └─ seller/
│     ├─ routes/
│     ├─ services/
│     ├─ styles/
│     ├─ utils/
│     ├─ App.jsx
│     ├─ index.css
│     └─ main.jsx
│
└─ backend/
   ├─ package.json
   ├─ package-lock.json
   ├─ tsconfig.json
   ├─ prisma.config.ts
   ├─ prisma/
   │  └─ schema.prisma
   └─ src/
      ├─ app.ts
      ├─ server.ts
      ├─ config/
      ├─ common/
      ├─ modules/
      └─ routes/
```

## Important Project Documents

```txt
README.md                         Project overview and setup guide
DESIGN.md                         Visual design system and UI rules
AGENT.md                          Instructions for coding agents
.env.example                      Shared environment variable template
docs/api/api-routes.md            API planning notes
docs/database/open-market.dbml    Database planning schema
docs/product/pages-checklist.md   Product page checklist
docs/product/user-flows.md        Product/user-flow notes
```

## Frontend Structure

```txt
frontend/src/
├─ assets/
│  └─ icons/
│     └─ google.svg
├─ components/
│  ├─ auth/
│  │  ├─ ConsentCheckbox.jsx
│  │  ├─ PasswordField.jsx
│  │  ├─ PasswordInput.jsx
│  │  ├─ PasswordStrengthMeter.jsx
│  │  └─ SocialButton.jsx
│  ├─ common/
│  │  └─ FormInput.jsx
│  ├─ layout/
│  │  ├─ AnnouncementBar.jsx
│  │  ├─ MinimalAuthHeader.jsx
│  │  ├─ MobileBottomNav.jsx
│  │  ├─ PublicFooter.jsx
│  │  └─ PublicHeader.jsx
│  ├─ order/
│  ├─ payment/
│  └─ store/
├─ layouts/
│  ├─ AuthLayout.jsx
│  └─ PublicLayout.jsx
├─ pages/
│  ├─ auth/
│  ├─ buyer/
│  ├─ public/
│  └─ seller/
├─ routes/
│  └─ AppRoutes.jsx
├─ services/
├─ styles/
├─ utils/
├─ App.jsx
├─ index.css
└─ main.jsx
```

## Backend Structure

```txt
backend/src/
├─ app.ts
├─ server.ts
├─ config/
│  └─ env.ts
├─ common/
│  ├─ errors/
│  │  ├─ ApiError.ts
│  │  └─ errorHandler.ts
│  ├─ middleware/
│  ├─ types/
│  └─ utils/
├─ modules/
│  ├─ auth/
│  ├─ buyers/
│  ├─ carts/
│  ├─ categories/
│  ├─ deliveries/
│  ├─ disputes/
│  ├─ messages/
│  ├─ notifications/
│  ├─ orders/
│  ├─ payments/
│  ├─ payouts/
│  ├─ products/
│  ├─ refunds/
│  ├─ reviews/
│  ├─ sellers/
│  ├─ support/
│  └─ users/
└─ routes/
   └─ index.ts
```

Backend modules are currently scaffolded. Each module should generally use this structure when implementation begins:

```txt
module-name.routes.ts
module-name.controller.ts
module-name.service.ts
module-name.validation.ts
module-name.types.ts
```

## Current Implemented Frontend Pages

### Authentication and Account Access

```txt
/login
/register
/register-buyer
/register-seller
/forgot-password
/reset-password
/email-verification
/phone-verification
/account-suspended
```

These files live in:

```txt
frontend/src/pages/auth/
```

### Public Marketplace Pages

```txt
/
/shop
```

These files live in:

```txt
frontend/src/pages/public/
```

## Important Frontend Layout Rules

### Public marketplace pages

Use `PublicLayout` for public browsing pages:

```jsx
<PublicLayout>
  {/* page content */}
</PublicLayout>
```

`PublicLayout` includes:

* `AnnouncementBar`
* `PublicHeader`
* page content
* `PublicFooter`
* `MobileBottomNav`

Use it for pages such as:

```txt
/
/shop
/stores
/products/:id
/become-seller
/how-it-works
/help-centre
/contact
/trust-safety
```

### Focused auth/status pages

Use `MinimalAuthHeader` for focused auth pages instead of the full marketplace navigation.

Use it for:

```txt
/register-buyer
/register-seller
/forgot-password
/reset-password
/email-verification
/phone-verification
/account-suspended
```

These pages use a clean card-focused layout with a subtle dotted background.

## Design System

The design system is documented in `DESIGN.md`.

Current direction:

* Deep green primary color: `#003527`
* Green hover/primary container: `#064e3b`
* Warm gold accent: `#fed65b` / `#ffe088`
* Soft off-white page background: `#f8f9ff`
* White card surface: `#ffffff`
* Soft blue-grey surface: `#eff4ff`
* Border color: `#bfc9c3`
* Main text: `#121c2a`
* Muted text: `#404944`
* Soft text: `#707974`
* Font: Hanken Grotesk
* Icons: Material Symbols

## Public UI Rules

* Use `Open Market` consistently.
* Do not use placeholder names such as `Mzansi Market`.
* Do not show Admin on public-facing pages.
* Public auth pages should only mention Buyer, Seller, or Buyer + Seller.
* Use `shopping_bag` for the Open Market logo and cart.
* Do not use `shopping_cart` or `shopping_basket` for cart icons.
* Avoid `href="#"` for real navigation.
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
/register
  → /register-buyer
  → /email-verification
  → /phone-verification
  → /buyer-dashboard
```

### Seller Registration Flow

```txt
/register
  → /register-seller
  → /email-verification
  → /phone-verification
  → /seller-dashboard or seller setup later
```

### Password Recovery Flow

```txt
/forgot-password
  → /reset-password
  → /login
```

### Account Restriction Flow

```txt
/login
  → /account-suspended
  → /contact
```

## Planned Main Application Areas

### Public Pages

* Home
* Shop
* Stores
* Store details
* Product details
* Become a Seller
* How It Works
* Help Centre
* Contact
* Trust & Safety
* Terms
* Privacy
* Shipping Info

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

## Initial Setup

### 1. Clone or open the repository

```bash
git clone <repo-url>
cd open-market
```

Or open the existing local project:

```bash
cd D:\open-market
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

Create `backend/.env` from the example values.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/open_market?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:5173"
JWT_ACCESS_SECRET="replace_me_access_secret"
JWT_REFRESH_SECRET="replace_me_refresh_secret"
```

Important: do not commit `backend/.env`.

## Running the Project

### Run the backend

From the project root:

```bash
cd backend
npm run dev
```

Expected backend URL:

```txt
http://localhost:5000
```

Health check:

```txt
http://localhost:5000/api/health
```

Expected response shape:

```json
{
  "ok": true,
  "service": "open-market-api",
  "time": "..."
}
```

### Run the frontend

From the project root in a second terminal:

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
* Keep shared page shells in `frontend/src/layouts`.
* Keep route definitions in `frontend/src/routes/AppRoutes.jsx`.
* Keep backend business logic inside `backend/src/modules`.
* Keep database planning files in `docs/database`.
* Keep API route planning files in `docs/api`.
* Keep user-flow and page planning files in `docs/product`.
* Keep `DESIGN.md` as the visual source of truth.
* Keep `AGENT.md` updated for coding-agent instructions.
* Keep DBML as the database planning source of truth until Prisma implementation is completed.

## Git Workflow

Check changes:

```bash
git status
```

Stage and commit:

```bash
git add .
git commit -m "Describe the change clearly"
```

Push:

```bash
git push
```

## Recommended `.gitignore` Notes

The project should ignore local environment files and runtime logs.

Recommended entries:

```gitignore
node_modules/
dist/
build/
.env
.env.local
.env.*.local
*.log
frontend/vite-dev.log
frontend/vite-dev.err.log
backend/uploads/
.DS_Store
Thumbs.db
.vscode/
.idea/
```

## Current Status

The project is in early development.

Completed so far:

1. Initial monorepo structure.
2. React frontend setup with Vite and Tailwind.
3. Express TypeScript backend setup.
4. Shared public layout components.
5. Minimal auth header for focused auth pages.
6. Core authentication and account-access pages.
7. Home page and shop page started.
8. Database planning documentation started with DBML.
9. Agent instructions added in `AGENT.md`.

## Recommended Next Pages

Continue public marketplace pages first:

```txt
/stores
/products/:id
/become-seller
/how-it-works
/help-centre
/contact
/trust-safety
/cart
```

Then continue buyer and seller dashboards.

