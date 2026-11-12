# Telangana Weddings — Docker & Database Operations Guide

This guide documents the Docker Compose setup, container management, volume persistence, and database maintenance commands for the **Telangana Weddings** NestJS backend.

---

## 1. Architecture Overview

- **PostgreSQL 16 (Alpine)**: Hyperlocal wedding marketplace database storing users, customer profiles, vendor profiles, categories, Telangana locations, enquiries, and credit transactions.
- **Redis 7 (Alpine)**: Cache and high-throughput session/OTP rate limiting.
- **Persistent Named Volumes**:
  - `postgres_data`: Persists database files across container restarts and updates at `/var/lib/postgresql/data`.
  - `redis_data`: Persists Redis snapshots across restarts at `/data`.
- **Port Mapping**:
  - PostgreSQL: Host `5433` -> Container `5432` *(avoiding conflicts with native host Postgres on 5432)*.
  - Redis: Host `6379` -> Container `6379`.

---

## 2. Quick Start Commands

Run all commands from either the repository root or the `backend/` directory:

### Start Services (Detached Mode)
```bash
# From workspace root
docker-compose -f backend/docker-compose.yml up -d

# Or inside backend/
cd backend
docker-compose up -d
```

### Check Container Status & Health
```bash
# View running containers and health checks
docker-compose -f backend/docker-compose.yml ps
```

### View Live Logs
```bash
# Stream logs for all services
docker-compose -f backend/docker-compose.yml logs -f

# Stream only PostgreSQL logs
docker-compose -f backend/docker-compose.yml logs -f postgres

# Stream only Redis logs
docker-compose -f backend/docker-compose.yml logs -f redis
```

### Stop Services (Preserving Volumes)
```bash
# Stops and removes containers while keeping volume data completely safe
docker-compose -f backend/docker-compose.yml down
```

### Restart Services
```bash
docker-compose -f backend/docker-compose.yml restart
```

---

## 3. Database Schema & Prisma Operations

Once the Docker container is running, execute schema synchronization and migrations:

### Push Schema directly to PostgreSQL
```bash
cd backend
npx prisma db push
```

### Generate Prisma Client
```bash
cd backend
npm run prisma:generate
# or
npx prisma generate
```

### Open Prisma Studio (Database GUI)
```bash
cd backend
npx prisma studio
# Opens visual GUI at http://localhost:5555
```

---

## 4. Interactive CLI & Direct Database Access

### Open `psql` Shell inside the Docker Container
```bash
docker exec -it telangana_weddings_db psql -U postgres -d telangana_weddings
```

### Common `psql` Queries:
- `\l` : List all databases
- `\dt` : List all tables in current schema
- `\d+ "VendorProfile"` : Inspect table columns and relations
- `SELECT count(*) FROM "User";` : Count registered users
- `\q` : Exit `psql`

### Test Redis Connection via `redis-cli`
```bash
docker exec -it telangana_weddings_redis redis-cli ping
# Output: PONG
```

---

## 5. Volume Management & Complete Reset

> [!CAUTION]
> The following command will permanently delete all stored data in the database and cache.

### Inspect Docker Volumes
```bash
docker volume ls | findstr telangana_weddings
# or
docker volume inspect backend_postgres_data
```

### Complete Reset (Wipe Database & Volumes)
```bash
# Stop containers and remove volumes
docker-compose -f backend/docker-compose.yml down -v

# Re-create fresh containers with clean volumes
docker-compose -f backend/docker-compose.yml up -d

# Push clean schema
cd backend
npx prisma db push
```

---

## 6. Connection Credentials Reference

| Variable | Value |
| :--- | :--- |
| **Host** | `localhost` |
| **Port** | `5433` *(container port 5432)* |
| **Database** | `telangana_weddings` |
| **Username** | `postgres` |
| **Password** | `postgrespassword` |
| **Prisma URL** | `postgresql://postgres:postgrespassword@localhost:5433/telangana_weddings?schema=public` |
| **Redis URL** | `redis://localhost:6379` |

