# Telangana Weddings — Build & Execution Playbook

This document serves as the single source of truth for building, running, and testing all components in the **Telangana Weddings** monorepo.

---

## 1. Monorepo Architecture Overview

```mermaid
flowchart TD
    Client1["Customer & Vendor Web Portal<br/>(Next.js 16 - Port 3000)"] --> API["NestJS Backend API<br/>(Port 3002 /api/v1)"]
    Client2["Operations Admin Portal<br/>(Next.js 16 - Port 3001)"] --> API
    Client3["Mobile App<br/>(React Native / Expo 52)"] --> API
    API --> DB[("PostgreSQL 16<br/>(Port 5433:5432)")]
    API --> Cache[("Redis 7<br/>(Port 6379)")]
```

| Service | Directory | Tech Stack | Default Port | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Database** | `docker-compose` | PostgreSQL 16 Alpine | `5433` (host) / `5432` | Relational storage for users, vendors, leads, taxonomy |
| **Cache** | `docker-compose` | Redis 7 Alpine | `6379` | Rate limiting & fast token revocation |
| **Backend API** | `/backend` | NestJS 11, Prisma ORM, JWT, Swagger | `3002` | REST API (`/api/v1`) |
| **Customer & Vendor Web** | `/web` | Next.js 16 (App Router), Tailwind v4, React 19 | `3000` | Public Marketplace + Vendor Partner + Customer Portals |
| **Admin Portal** | `/admin` | Next.js 16 (App Router), Tailwind v4, React 19 | `3001` | Super Admin, KYC Verification, & Lead Monitoring |
| **Mobile App** | `/app` | Expo 52, React Native 0.76, NativeWind | Expo Dev Server | Mobile App for Android & iOS |
| **E2E Testing** | `/e2e` | Playwright | CLI | End-to-end integration test suite |

---

## 2. Option A: One-Command Docker Compose (All Services)

To boot up the entire stack (Database, Redis, Backend, Web, and Admin):

```bash
# 1. Start all containerized services in background
docker compose up -d

# 2. View streaming logs
docker compose logs -f

# 3. Check container health status
docker compose ps

# 4. Tear down containers
docker compose down
```

---

## 3. Option B: Local Development (Service by Service)

### Step 1: Start Database & Cache
```bash
docker compose up -d postgres redis
```

---

### Step 2: Backend API (`/backend`)
```bash
# Navigate to backend directory
cd backend

# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Run database migrations
npm run prisma:migrate

# 4. Seed initial master data (Districts, Mandals, Categories, Admin)
npm run prisma:seed

# 5. Start dev server with hot reload (Port 3002)
npm run start:dev

# 6. Production build & run
npm run build
npm run start:prod

# 7. Testing
npm run test
npm run test:e2e
```
* **API Base URL**: `http://localhost:3002/api/v1`
* **Swagger Documentation**: `http://localhost:3002/api/v1/docs`

---

### Step 3: Customer & Vendor Web Portal (`/web`)
```bash
# Navigate to web directory
cd web

# 1. Install dependencies
npm install

# 2. Start development server (Port 3000)
npm run dev

# 3. Production build
npm run build

# 4. Start production server
npm run start
```
* **Public Marketplace**: `http://localhost:3000`
* **Vendor Portal**: `http://localhost:3000/vendor/dashboard`
* **Customer Portal**: `http://localhost:3000/customer/dashboard`

---

### Step 4: Operations Admin Portal (`/admin`)
```bash
# Navigate to admin directory
cd admin

# 1. Install dependencies
npm install

# 2. Start development server (Port 3001)
npm run dev

# 3. Production build
npm run build

# 4. Start production server
npm run start
```
* **Admin Portal**: `http://localhost:3001/dashboard`
* **Vendor KYC Desk**: `http://localhost:3001/vendor-verification`

---

### Step 5: Mobile App (`/app`)
```bash
# Navigate to mobile app directory
cd app

# 1. Install dependencies
npm install

# 2. Start Expo development server
npm run start

# 3. Launch target platform
npm run android    # Android emulator / connected USB device
npm run ios        # iOS simulator (macOS only)
npm run web        # Web preview
```

---

### Step 6: End-to-End (E2E) Testing
```bash
# From workspace root:
npx playwright test

# Interactive UI test runner:
npx playwright test --ui
```

---

## 4. Environment Variables Reference

### Backend (`backend/.env`)
```env
PORT=3002
API_PREFIX=api/v1
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5433/telangana_weddings?schema=public
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=telangana-weddings-jwt-secret-2025-prod-ready
JWT_REFRESH_SECRET=telangana-weddings-refresh-secret-2025
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Web (`web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
```

### Admin (`admin/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1
```

---

## 5. Troubleshooting & FAQ

- **Port in use (`EADDRINUSE: 3000` or `3001` or `3002`)**:
  Check running processes or previous instances:
  ```powershell
  # Windows PowerShell: Find PID using port
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
  ```
- **Database connection error**:
  Ensure Docker Postgres container is up on port `5433`:
  ```bash
  docker compose ps postgres
  ```
- **Turbopack root warning**:
  `admin/next.config.ts` and `web/next.config.ts` are preconfigured with `turbopack: { root: path.resolve(__dirname) }` to avoid cross-lockfile ambiguity.

