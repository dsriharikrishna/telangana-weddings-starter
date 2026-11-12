# Telangana Weddings — Full Stack Docker Operations Guide

This guide documents the centralized multi-service Docker configuration for the complete **Telangana Weddings** platform.

---

## 1. Unified Architecture

The entire marketplace runs through a single root [`docker-compose.yml`](file:///c:/Users/Signi/Documents/WorkSpace/WebApplications/telangana-weddings-starter/docker-compose.yml):

| Service | Container Name | Technology | Internal Port | Host Port | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`postgres`** | `telangana_weddings_db` | PostgreSQL 16 (Alpine) | `5432` | `5433` | Primary database with persistent volume |
| **`redis`** | `telangana_weddings_redis` | Redis 7 (Alpine) | `6379` | `6379` | Cache & OTP/rate-limiting volume |
| **`backend`** | `telangana_weddings_backend` | NestJS 11 + Prisma | `3002` | `3002` | Central REST API & Swagger docs |
| **`web`** | `telangana_weddings_web` | Next.js 16 + Tailwind | `3000` | `3000` | Public Discovery & Vendor Portal |
| **`admin`** | `telangana_weddings_admin` | Next.js 16 + Tailwind | `3001` | `3001` | Administrative Dashboard |

---

## 2. Common Docker Commands

Run these commands from the root directory: `c:\Users\Signi\Documents\WorkSpace\WebApplications\telangana-weddings-starter`

### Build and Start Everything
```bash
docker-compose up -d --build
```

### Start Without Rebuilding (Fast Start)
```bash
docker-compose up -d
```

### Check Live Status & Health
```bash
docker-compose ps
```

### Stream Live Logs
```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f backend
docker-compose logs -f web
docker-compose logs -f admin
docker-compose logs -f postgres
```

### Stop All Services
```bash
docker-compose down
```

---

## 3. Targeted Service Management

You can also start, restart, or rebuild individual services:

```bash
# Rebuild only the backend service
docker-compose up -d --build backend

# Rebuild only the customer web frontend
docker-compose up -d --build web

# Rebuild only the admin frontend
docker-compose up -d --build admin

# Restart database only
docker-compose restart postgres
```

---

## 4. Database Maintenance & Shell Access

### Run Prisma Migrations / Schema Sync inside Backend Container
```bash
docker exec -it telangana_weddings_backend npx prisma db push
```

### Direct `psql` Terminal
```bash
docker exec -it telangana_weddings_db psql -U postgres -d telangana_weddings
```

### Direct Redis CLI
```bash
docker exec -it telangana_weddings_redis redis-cli ping
```

---

## 5. Clean Reset (Wipe All Volumes)

> [!CAUTION]
> This destroys all persisted database records in `postgres_data` and Redis cache in `redis_data`.

```bash
docker-compose down -v
docker-compose up -d --build
```

