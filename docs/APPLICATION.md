# Telangana Weddings (తెలంగాణ పెళ్లిళ్లు) - Application Documentation

> **Hyper-Local, Culture-First Wedding Services Platform for Telangana**  
> Serving tier-2/3 towns, mandals, and villages across Telangana with authentic traditional wedding services, multi-language support (Telugu & English), and seamless vendor discovery and management.

---

## 1. Project Overview

**Telangana Weddings** is a specialized full-stack marketplace platform connecting couples and families planning weddings with trusted, verified local wedding service providers across Telangana.

From traditional ritual specialists (Purohitulu/Siddhanthi, Sannai Melam, Talambralu pearls) to modern services (4K drone cinematography, candid photography, luxury banquet halls, and designer bridal couture), the platform provides granular geographic targeting down to district, mandal, and village levels.

### Key Highlights
- **Bilingual Experience**: Built natively with Telugu (తెలుగు) and English localization throughout the customer, vendor, and admin journeys.
- **Micro-Local Hierarchy**: Full Telangana administrative structure mapping across districts (e.g., Narayanpet, Mahabubnagar, Hyderabad, Warangal, Rangareddy), mandals, and villages/towns.
- **Multi-Portal Architecture**:
  - **Web Portal (`/web`)**: Public discovery, SEO-optimized landing pages, vendor catalogs, customer dashboard, and vendor onboarding/management.
  - **Admin Portal (`/admin`)**: Operations center for platform moderation, vendor verification, commissions, disputes, categories, and financial reporting.
  - **Backend (`/backend`)**: API and services layer for core business logic, real-time messaging, and transactional operations.

---

## 2. Architecture & Monorepo Structure

```
telangana-weddings-starter/
├── web/                     # Customer & Vendor Next.js Application (Port 3000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/    # SEO & Guest pages (Home, Services, Locations, Vendors, Info)
│   │   │   ├── auth/        # Customer/Vendor Login, Registration, OTP Verification
│   │   │   ├── customer/    # Customer Portal (Bookings, Enquiries, Wishlist, Profile)
│   │   │   └── vendor/      # Vendor Portal (Dashboard, Services, Quotations, Packages, Settlements)
│   │   ├── components/      # Reusable Radix/Tailwind UI components & shared widgets
│   │   ├── context/         # Auth, Language (EN/TE), Modal, and Theme contexts
│   │   ├── data/            # Telangana location hierarchy, vendor catalog, categories mock data
│   │   ├── features/        # Feature modules (landing, search, booking, chat, reviews)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions, formatters, validation schemas
│   │   ├── store/           # Zustand state management
│   │   └── types/           # Core TypeScript data contracts and entity models
│   ├── public/              # Static assets and icons
│   └── package.json
│
├── admin/                   # Administrative Next.js Application (Port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (portal)/    # Admin Dashboard, Vendors, Approvals, Disputes, Reports, Settings
│   │   │   └── auth/        # Admin Authentication & MFA/OTP
│   │   ├── components/      # Admin data tables, metrics cards, review dialogs
│   │   ├── data/            # Master location hierarchy, commission rules, sample credentials
│   │   └── lib/             # Admin utilities and helpers
│   └── package.json
│
├── backend/                 # Backend Node/Express/TypeScript API Engine
│   ├── src/                 # Services, controllers, models, and integrations
│   └── package.json
│
├── .agents/                 # AI Assistant skills & Design System intelligence
│   └── skills/              # UI/UX Pro Max, Design Tokens, Banner Design, Brand Cohesion
├── AGENTS.md                # Agent workspace instructions & design system guidelines
└── APPLICATION.md           # This comprehensive application documentation
```

---

## 3. Technology Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Runtime / UI** | [React 19](https://react.dev/) |
| **Styling & CSS** | [Tailwind CSS 4](https://tailwindcss.com/), `class-variance-authority`, `tailwind-merge` |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (`Slot`, `Dialog`, `DropdownMenu`, `Accordion`, `Select`, `Tabs`, `Popover`) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) & [TanStack React Query 5](https://tanstack.com/query) |
| **Icons & Motion** | [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 4. Design System & Brand Identity

The interface adheres to an intentional heritage color palette inspired by Telangana traditions and handlooms (Pochampally Ikat, Gadwal and Narayanpet zari borders):

- **Royal Crimson / Maroon (`#762B46` / `#542034`)**: Primary brand color symbolizing wedding auspiciousness (Kumkum/Pasupu-Kunkuma).
- **Zari Gold (`#C5A46D` / `#B08E56`)**: Accent and badge color representing prosperity and traditional zari weaving.
- **Warm Cream / Sandalwood (`#FAF7F2` / `#F4EDE3` / `#E7DECF`)**: Softer background canvas providing high readability and elegance.
- **Charcoal Slate (`#292524`)**: Deep contrast text color meeting WCAG accessibility standards.
- **Emerald Forest (`#047857`)**: Trust indicators, verified vendor badges, and confirmed booking states.

---

## 5. Core Wedding Service Categories

The platform indexes 25+ essential Telangana wedding service categories, with bilingual naming and regional specializations:

1. **Function Halls & Tent Houses** (*ఫంక్షన్ హాళ్ళు & టెంట్ హౌస్*) — AC/Non-AC Convention Centers, Kalyana Mandapams, Shamiana sets.
2. **Catering & Traditional Cooking Teams** (*వంటల బృందం & క్యాటరింగ్*) — Authentic Telangana Vantalu, Bagara Rice & Dalcha, Rayalaseema & Andhra delicacies.
3. **Wedding Photography** (*వెడ్డింగ్ ఫోటోగ్రఫీ*) — Candid portraits, traditional Muhurtham ceremony documentation, heirloom albums.
4. **Cinematic Videography & Drone** (*వెడ్డింగ్ వీడియోగ్రఫీ*) — 4K wedding films, live LED wall telecast, teaser reels.
5. **Stage & Mandap Decoration** (*స్టేజ్ & కళ్యాణ మండప డెకరేషన్*) — Traditional Telugu pandiri, flower arrangements, Pellikuturu ceremony backdrops.
6. **Purohitulu & Astrologers** (*పురోహితులు & సిద్ధాంతులు*) — Muhurtham calculation, Vedic ritual execution, Lagna Patrika.
7. **Sannai Melam & Band Melam** (*సన్నాయి మేళం & బ్యాండ్ బాజా*) — Traditional Nadaswaram, Dappu performers, brass bands.
8. **Bridal Makeup & Mehendi** (*బ్రైడల్ మేకప్ & మెహందీ*) — HD bridal makeup, traditional Gorintaku / Maruthani artists.
9. **Wedding Jewelry & Pattu Sarees** (*బంగారు నగల అద్దె & పట్టు చీరలు*) — Gadwal, Narayanpet, Pochampally bridal wear & temple jewelry on rent.
10. **Wedding Transport & Doli** (*పెళ్లి వాహనాలు & పల్లకి*) — Vintage cars, decorated buses, traditional bridal palanquins.

---

## 6. Portals & Workflows

### 6.1 Public & Customer Journey (`/web/src/app/(public)`)
- **Location-Aware Discovery**: Filter vendors by District $\rightarrow$ Mandal $\rightarrow$ Village/Town.
- **Granular Categories**: Direct routing by service slug (`/services/[category]/[subcategory]`).
- **Assisted Help & Callback**: Modal-based concierge service for families needing end-to-end planning guidance.
- **Customer Dashboard (`/customer`)**:
  - Track booking statuses (Pending, Confirmed, In-Progress, Completed, Cancelled).
  - Review custom vendor quotations.
  - Manage direct inquiries and chat threads.

### 6.2 Vendor Workspace (`/web/src/app/vendor`)
- **Vendor Onboarding (`/vendor/register`)**: Identity verification, Aadhaar/Business proofs, service area selection.
- **Service & Package Management**: Define base rates, event-specific packages, and availability calendars.
- **Quotation Generator**: Build customized quotations with broken-down itemized costs.
- **Settlement & Payout Tracker**: Track completed events, platform commissions, and payout schedules.

### 6.3 Admin Governance (`/admin/src/app/(portal)`)
- **Verification Queue**: Review uploaded documents (KYC, business registration, prior work).
- **Dispute Resolution**: Mediate cancellations, date conflicts, and refund claims.
- **Commission Management**: Configure tier-based or category-based platform fees.
- **Taxonomy Administration**: Add new mandals, villages, categories, and tags dynamically.

---

## 7. Getting Started

### Prerequisites
- Node.js `v20.x` or higher
- `pnpm` (recommended) or `npm`

### Installation & Local Run

#### Running the Customer / Vendor Web App:
```bash
cd web
pnpm install
pnpm dev
# Web application starts at http://localhost:3000
```

#### Running the Admin Portal:
```bash
cd admin
pnpm install
pnpm dev
# Admin portal starts at http://localhost:3001
```

#### Type Check & Linting:
```bash
# In web or admin:
pnpm lint
npx tsc --noEmit
```

---

## 8. Environment Variables

Create `.env.local` in `web/` and `admin/`:

```env
# Next.js Application Environment
NEXT_PUBLIC_APP_NAME="Telangana Weddings"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:4000/api"

# Feature Flags
NEXT_PUBLIC_ENABLE_TELUGU=true
NEXT_PUBLIC_DEFAULT_LOCALE="te"
```

---

## 9. License & Contribution

Proprietary — Built with pride for the celebrations and traditions of Telangana.

