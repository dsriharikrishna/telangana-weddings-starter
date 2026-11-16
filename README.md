# Telangana Weddings — Monorepo Architecture & Build Context

Telangana Weddings is an end-to-end matchmaking & discovery platform for rural and tier-2/3 weddings in Telangana. The monorepo consists of 4 main applications, a central database, and caching infrastructure.

---

## 🏗️ Architecture & Port Mapping

| Service | Directory | Tech Stack | Default Port | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Database** | — | PostgreSQL 16 | `5433` (host) / `5432` (internal) | Main relational database |
| **Cache** | — | Redis 7 Alpine | `6379` | Rate limiting & fast caching |
| **Backend API** | `/backend` | NestJS 11, Prisma ORM, JWT, Swagger | `3002` | REST API (`/api/v1`) |
| **Customer & Vendor Web** | `/web` | Next.js 16 (App Router), Tailwind v4, React 19 | `3000` | Public Marketplace + Vendor + Customer Portals |
| **Operations Admin** | `/admin` | Next.js 16 (App Router), Tailwind v4, React 19 | `3001` | Super Admin, KYC Verification, & Lead Monitoring |
| **Mobile App** | `/app` | Expo 52, React Native 0.76, NativeWind | Expo Dev Server | Mobile App for Android & iOS |

---

## ⚡ Quick Start: Full Stack via Docker

To start the database, Redis, NestJS backend, customer/vendor web portal, and admin portal together:

```bash
# 1. Start all containerized services in background
docker compose up -d

# 2. View streaming logs
docker compose logs -f

# 3. Stop all services
docker compose down
```

---

## 💻 Local Development Commands

### 1. Database & Cache (Docker Prerequisites)
If running apps locally without Dockerizing Next.js/NestJS, start just Postgres & Redis:
```bash
docker compose up -d postgres redis
```

---

### 2. Backend Service (`/backend`)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run DB Migrations
npm run prisma:migrate

# Seed Initial Master Data (Categories, Districts, Mandals, Admin)
npm run prisma:seed

# Start in Development Mode (Watch) - http://localhost:3002/api/v1
npm run start:dev

# Interactive Swagger Documentation
# Open in browser: http://localhost:3002/api/v1/docs

# Build Production Output
npm run build

# Run Unit / E2E Tests
npm run test
npm run test:e2e
```

---

### 3. Customer & Vendor Web Portal (`/web`)
```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start Development Server - http://localhost:3000
npm run dev

# Build Production Bundle
npm run build

# Start Production Server
npm run start
```

---

### 4. Admin Portal (`/admin`)
```bash
# Navigate to admin directory
cd admin

# Install dependencies
npm install

# Start Development Server - http://localhost:3001
npm run dev

# Build Production Bundle
npm run build

# Start Production Server
npm run start
```

---

### 5. Mobile App (`/app`)
```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Start Expo Development Server
npm run start

# Launch on Android Emulator / Device
npm run android

# Launch on iOS Simulator
npm run ios
```

---

### 6. End-to-End (E2E) Testing (`/e2e`)
```bash
# Run Playwright tests from root
npx playwright test

# Run Playwright with UI Inspector
npx playwright test --ui
```

---

## 🔑 Default Environment Variables

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
