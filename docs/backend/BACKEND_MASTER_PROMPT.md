# TELANGANA WEDDINGS
# FINAL BACKEND ARCHITECTURE & DEVELOPMENT MASTER PROMPT

---

# 1. ROLE AND RESPONSIBILITY

Act as a Principal Backend Architect, Senior NestJS Engineer, PostgreSQL Database Architect, API Designer, Application Security Engineer and AWS Cloud Engineer.

You are responsible for architecting and developing the production-ready backend for **Telangana Weddings**, a hyperlocal wedding services discovery and matchmaking marketplace.

Think like an engineer building a real commercial marketplace that will serve customers, local wedding vendors and administrators.

Your responsibility is to:

- Audit the existing repository.
- Understand existing frontend and admin applications.
- Design a feature-based backend architecture.
- Design a normalized PostgreSQL database.
- Define API contracts.
- Implement authentication and authorization.
- Develop vendor management.
- Develop location-based vendor discovery.
- Develop customer enquiries and lead matching.
- Implement vendor lead credits and subscriptions.
- Integrate payment services.
- Implement notifications and file uploads.
- Develop administrative APIs.
- Write unit, integration and end-to-end tests.
- Prepare Docker and AWS deployment.
- Maintain technical documentation.

**Do not start coding immediately. First inspect, understand, plan and document the architecture.**

---

# 2. PRODUCT CONTEXT

## Product Name

Telangana Weddings

## Product Vision

Build a hyperlocal wedding services marketplace connecting families with trusted local wedding service providers across Telangana.

The platform should help customers discover, compare and contact wedding professionals who understand their regional traditions, languages and locations.

Support Telugu and English audiences.

## Initial Target Market

- Narayanpet district.
- Mahabubnagar district.
- Other Telangana districts as the platform expands.

The backend must support geographical expansion without structural database changes.

## Application Ecosystem

The platform consists of:

1. Customer Website.
2. Customer Android Application.
3. Vendor Portal.
4. Admin Dashboard.
5. Central NestJS Backend API.

All applications must consume the common backend API with appropriate authentication, authorization and data access restrictions.

## User Types

### Customer

- Browse wedding service categories.
- Discover local vendors.
- Search by district, mandal and village.
- View vendor profiles.
- View service details and starting prices.
- View portfolio photos.
- Save favourite vendors.
- Submit enquiries.
- Request an assisted phone call.
- Track enquiry status.
- Receive vendor contact updates.
- Manage profile and preferences.

### Vendor

- Register a business.
- Create and update business profiles.
- Manage wedding service categories.
- Manage services and starting prices.
- Upload portfolio images and videos.
- Select service coverage areas.
- Submit verification documents.
- Track verification status.
- Receive customer leads.
- Unlock eligible leads.
- Manage lead credits.
- Purchase lead credit packages.
- Subscribe to vendor plans.
- View basic business analytics.

### Administrator

- Manage customers.
- Manage vendors.
- Approve or reject vendor applications.
- Manage vendor verification.
- Manage service categories.
- Manage geographical locations.
- View and assign customer enquiries.
- Manage lead delivery.
- Configure lead pricing.
- Manage subscriptions.
- View payment transactions.
- Manage platform settings.
- View business analytics.
- Manage customer and vendor support.

---

# 3. MVP BUSINESS MODEL — MOST IMPORTANT

Telangana Weddings is entering the market as a **Hyperlocal Matchmaking and Discovery Marketplace**.

It is not an end-to-end wedding service execution platform in Phase 1.

## Customer-to-vendor workflow

1. Customer discovers a wedding service.
2. Customer selects a suitable vendor or submits a service enquiry.
3. Customer provides event and location requirements.
4. Platform finds eligible vendors.
5. Lead is assigned to one or more vendors according to configurable rules.
6. Vendor receives a lead notification.
7. Vendor obtains authorized access to customer contact information.
8. Vendor and customer communicate directly.
9. Both parties finalize arrangements outside the platform.

## Monetization model

The platform may support:

- Fixed fee per lead.
- Vendor lead credit packages.
- Monthly vendor subscriptions.
- Optional vendor listing tiers.

All pricing must be configurable through the admin system.

Do not hardcode prices or commercial rules.

## Strict Phase 1 exclusions

Do not implement the following as active MVP business workflows:

- Full wedding booking management.
- Wedding service fulfillment tracking.
- Escrow payments.
- In-app contract signing.
- Dispute arbitration.
- Multi-party vendor settlements.
- Complex commission engines.
- Formal quotation approval workflows.
- Advanced wedding project management.
- Complex availability calendar management.

These may be considered in Phase 2.

Existing archived functionality must remain preserved.

Do not restore archived modules into active navigation or backend workflows without approval.

**The backend must be optimized for vendor discovery, enquiries, lead distribution and lead monetization.**

---

# 4. MANDATORY TECHNOLOGY STACK

Use the following stack.

## Backend

- Node.js LTS.
- TypeScript.
- NestJS.
- REST API.
- Modular Monolith.
- Feature-Based Architecture.
- Swagger / OpenAPI.

## Database

- PostgreSQL.
- Prisma ORM.
- Prisma Migrate.
- Prisma Client.

## Authentication

- Phone OTP authentication.
- JWT access tokens.
- Refresh token rotation.
- Argon2id if password authentication is supported.
- Role-Based Access Control.
- NestJS Guards.

## Validation and API

- class-validator.
- class-transformer.
- DTO validation.
- Swagger documentation.
- Global exception handling.

## Caching and Background Jobs

- Redis.
- BullMQ.
- Background workers.
- Scheduled jobs where necessary.

## Storage

- AWS S3.
- AWS CloudFront.
- Presigned upload URLs.
- Secure document storage.

## Integrations

- Razorpay for vendor subscriptions and lead credits.
- Configurable SMS provider.
- Amazon SES or configurable email provider.
- Socket.IO only where real-time updates provide clear value.

## Testing

- Jest.
- Supertest.
- Unit tests.
- Integration tests.
- End-to-end API tests.

## Infrastructure

- Docker.
- Docker Compose.
- GitHub Actions.
- AWS ECS or EC2 based on deployment requirements.
- Amazon RDS PostgreSQL.
- Amazon ElastiCache Redis when justified.
- AWS Secrets Manager.
- CloudWatch.
- Terraform.

Do not introduce technologies that are unnecessary for the MVP.

Reuse existing dependencies when appropriate.

---

# 5. EXISTING REPOSITORY AUDIT

Before implementation, inspect the existing monorepo.

Expected structure:

```text
project/
├── web/
├── admin/
├── backend/
├── docs/
│   ├── APPLICATION.md
│   ├── AGENTS.md
│   └── _archive/
└── ...
```

The actual repository may differ. Discover its real structure first.

Inspect:

- AGENTS.md.
- APPLICATION.md.
- Existing backend application.
- Existing NestJS modules.
- Existing Prisma schema.
- Existing migrations.
- Existing database configuration.
- Existing authentication.
- Existing API integrations.
- Frontend API clients.
- Customer pages.
- Vendor portal pages.
- Admin pages.
- Existing category taxonomy.
- Existing location data.
- Environment variables.
- Archived modules.

## Known MVP refinement decisions

The frontend and admin applications have already been streamlined according to the MVP direction.

Previously completed changes include:

- Consolidation of duplicate service pages into dynamic category routes.
- Simplification of customer navigation.
- Simplification of vendor navigation.
- Archiving of customer bookings, quotations, wedding plans and payments.
- Archiving of vendor bookings, quotations, packages, commissions and settlements.
- Archiving of admin bookings, commissions and disputes.
- Preservation of archived code under `docs/_archive/`.

Treat these decisions as existing product requirements.

Do not reverse them.

## Audit deliverable

Create:

`docs/backend/BACKEND_AUDIT.md`

Document:

1. Existing backend architecture.
2. Existing modules and functionality.
3. Existing frontend API dependencies.
4. Reusable code.
5. Missing functionality.
6. Database gaps.
7. Security gaps.
8. Recommended backend architecture.
9. Risks and migration requirements.

Never delete existing functionality without explicit approval.

---

# 6. MANDATORY ARCHITECTURE — FEATURE-BASED MODULAR MONOLITH

Use **Feature-Based Architecture (Vertical Slice Architecture)** with a modular monolith.

Organize the backend by business features, not primarily by technical layers.

Every feature should own its business logic and related implementation.

## Recommended folder structure

```text
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── core/
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── config/
│   │   ├── logger/
│   │   └── health/
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   ├── middleware/
│   │   ├── constants/
│   │   └── utils/
│   │
│   ├── infrastructure/
│   │   ├── redis/
│   │   ├── queues/
│   │   ├── storage/
│   │   ├── sms/
│   │   ├── email/
│   │   └── payment-gateway/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── customers/
│   │   ├── vendors/
│   │   ├── categories/
│   │   ├── locations/
│   │   ├── services/
│   │   ├── vendor-portfolio/
│   │   ├── vendor-verification/
│   │   ├── vendor-discovery/
│   │   ├── enquiries/
│   │   ├── lead-management/
│   │   ├── lead-credits/
│   │   ├── subscriptions/
│   │   ├── payments/
│   │   ├── favourites/
│   │   ├── reviews/
│   │   ├── notifications/
│   │   ├── uploads/
│   │   ├── support/
│   │   ├── admin/
│   │   └── analytics/
│   │
│   └── app.module.ts
│
├── test/
├── Dockerfile
├── docker-compose.yml
└── package.json
```

Adapt this structure to the existing repository.

## Internal feature structure

Example:

```text
features/
└── enquiries/
    ├── enquiries.module.ts
    ├── controllers/
    │   ├── enquiries.controller.ts
    │   └── admin-enquiries.controller.ts
    ├── services/
    │   ├── enquiries.service.ts
    │   └── enquiry-validation.service.ts
    ├── dto/
    ├── repositories/
    ├── types/
    ├── constants/
    └── __tests__/
```

Repository classes are optional. Introduce them when they provide meaningful separation for complex data access.

Do not create abstractions just to increase the number of files.

## Architecture rules

1. Each feature owns its business logic.
2. Controllers must remain thin.
3. Services contain use cases and business rules.
4. DTOs validate external inputs.
5. Prisma handles persistence.
6. Feature modules expose only necessary providers.
7. Features communicate through exported providers or explicit interfaces.
8. Use events for decoupled side effects.
9. Keep infrastructure separate from business rules.
10. Avoid circular dependencies.
11. Avoid giant generic services.
12. Avoid direct imports of another feature's internal files.
13. Write feature-level tests.
14. Keep modules independently understandable and maintainable.

Before implementation, create a feature dependency map and module responsibility matrix.

---

# 7. FEATURE MODULE RESPONSIBILITIES

| Feature | Responsibility |
|---|---|
| Auth | OTP, JWT, refresh tokens and sessions |
| Users | Shared identity and roles |
| Customers | Customer profiles and preferences |
| Vendors | Business profiles and staff |
| Categories | Categories and subcategories |
| Locations | District, mandal and village |
| Services | Vendor services and starting prices |
| Vendor Portfolio | Photos and videos |
| Vendor Verification | Approval and verification |
| Vendor Discovery | Search and filtering |
| Enquiries | Customer enquiry management |
| Lead Management | Matching, assignment and unlock |
| Lead Credits | Vendor credit wallet and ledger |
| Subscriptions | Vendor subscription plans |
| Payments | Razorpay integration |
| Favourites | Saved vendors |
| Reviews | Customer reviews and moderation |
| Notifications | In-app, SMS and email |
| Uploads | Secure media uploads |
| Support | Assisted enquiry and customer support |
| Admin | Administrative operations |
| Analytics | Basic marketplace reporting |

Avoid creating unnecessary modules.

If two closely related domains can remain together without violating clear ownership, prefer the simpler design.

---

# 8. DATABASE ARCHITECTURE — POSTGRESQL + PRISMA

Before coding:

1. Identify database entities.
2. Prepare an ER diagram.
3. Define relationships.
4. Design Prisma models.
5. Define constraints.
6. Define indexes.
7. Document transaction boundaries.
8. Define migration strategy.
9. Prepare seed data.

## A. Identity and authentication

Suggested models:

- User.
- RefreshToken.
- OtpVerification.
- UserSession.

Roles:

```text
CUSTOMER
VENDOR_OWNER
VENDOR_STAFF
ADMIN
SUPER_ADMIN
```

Requirements:

- Phone OTP registration.
- Phone OTP login.
- User profile.
- Role management.
- Refresh token rotation.
- Session revocation.
- Account status.
- OTP expiry.
- OTP attempt limits.
- Resend cooldown.

Never store plaintext OTPs or passwords.

## B. Customer

Suggested models:

- CustomerProfile.
- CustomerAddress.
- FavouriteVendor.

Requirements:

- Customer name.
- Phone number.
- Email where applicable.
- Preferred language.
- District.
- Mandal.
- Village.
- Contact preferences.
- Saved vendors.

Allow public vendor discovery without requiring login where appropriate.

Protect enquiry creation using rate limiting and abuse prevention.

## C. Vendor management

Suggested models:

- VendorProfile.
- VendorStaff.
- VendorDocument.
- VendorVerification.
- VendorSocialLink.

Requirements:

- Business name.
- Owner information.
- Business description.
- Contact details.
- Business location.
- Starting prices.
- Profile image.
- Service categories.
- Business status.
- Verification status.
- Multiple authorized staff support as an extensible capability.

Business statuses:

```text
DRAFT
PENDING_APPROVAL
APPROVED
REJECTED
SUSPENDED
INACTIVE
```

Verification statuses:

```text
NOT_SUBMITTED
PENDING
VERIFIED
REJECTED
```

Business approval and field verification must remain separate concepts.

Never display a vendor as verified unless verification has actually been approved.

## D. Categories and services

Suggested models:

- Category.
- Subcategory.
- VendorService.
- VendorServiceMedia.
- VendorServicePricing.

Requirements:

- Hierarchical service categories.
- Telugu and English names.
- Dynamic slugs.
- Category descriptions.
- Images and icons.
- Starting prices.
- Service details.
- Active/inactive status.
- Configurable ordering.

Use the existing project taxonomy as the source of truth.

Do not hardcode category counts.

## E. Geographical locations

Suggested models:

- State.
- District.
- Mandal.
- Village.

Hierarchy:

```text
Telangana
  └── District
       └── Mandal
            └── Village / Town
```

Requirements:

- Correct relational hierarchy.
- Location search.
- Duplicate prevention.
- Admin management.
- Vendor service coverage.
- Future geographical expansion.

Location data must be manageable through the admin dashboard.

Do not hardcode only Narayanpet and Mahabubnagar into the business logic.

## F. Vendor service areas

Suggested model:

- VendorServiceArea.

Requirements:

- Multiple districts and mandals.
- Village-level coverage.
- Configurable service coverage.
- Efficient location filtering.
- Duplicate prevention.

Support vendors who travel to nearby locations.

## G. Vendor portfolio

Suggested models:

- VendorPortfolio.
- VendorPortfolioMedia.

Requirements:

- Image uploads.
- Supported video uploads.
- Captions.
- Ordering.
- Media moderation.
- S3 object references.
- Secure upload workflow.

Use presigned URLs.

Do not transfer large media files through the NestJS application unnecessarily.

## H. Enquiries

This is a core MVP domain.

Suggested models:

- Enquiry.
- EnquiryStatusHistory.
- EnquiryActivity.

Enquiry fields:

- Customer ID where available.
- Customer name.
- Customer phone.
- Category.
- Requested service.
- Event date.
- Event type or wedding function.
- District.
- Mandal.
- Village.
- Approximate budget.
- Additional requirements.
- Preferred contact method.
- Enquiry source.

Support authenticated and assisted enquiries.

Possible statuses:

```text
NEW
PROCESSING
MATCHING
ASSIGNED
CONTACTED
COMPLETED
CANCELLED
```

Track status changes.

Do not confuse an enquiry with a confirmed wedding booking.

## I. Lead management

Suggested models:

- LeadAssignment.
- LeadStatusHistory.
- LeadActivity.
- LeadUnlock.

Requirements:

1. Enquiry is created.
2. Eligible vendors are identified.
3. Matching rules are applied.
4. Leads are assigned.
5. Vendors receive notifications.
6. Vendor unlocks lead access when eligible.
7. Customer contact details are revealed only to authorized vendors.
8. Every assignment and unlock is recorded.

Assignment statuses:

```text
PENDING
AVAILABLE
UNLOCKED
CONTACTED
EXPIRED
CANCELLED
```

Support:

- Automatic assignment.
- Admin-assisted assignment.
- One-vendor assignment.
- Multiple-vendor assignment.
- Configurable assignment limits.

Do not assume unlimited lead distribution.

Make matching and assignment rules configurable.

## J. Lead credits

Suggested models:

- VendorLeadWallet.
- LeadCreditTransaction.
- LeadPricingRule.

Requirements:

- Vendor credit balance.
- Credit purchase.
- Lead unlock.
- Credit deduction.
- Refund or reversal where applicable.
- Transaction history.
- Configurable lead pricing.
- Admin adjustments with audit records.

Critical rules:

- No negative balances.
- No duplicate deductions.
- No duplicate unlocks.
- Atomic credit deduction.
- Idempotent operations.
- Complete credit ledger.

Use PostgreSQL transactions and appropriate concurrency controls.

## K. Vendor subscriptions

Suggested models:

- SubscriptionPlan.
- VendorSubscription.

Requirements:

- Configurable monthly or other subscription plans.
- Subscription status.
- Start and expiry dates.
- Plan limits.
- Renewal status.
- Payment reference.

Do not implement complex commission or settlement systems.

## L. Payments

Suggested models:

- PaymentTransaction.
- PaymentWebhookEvent.
- PaymentReceipt.

Payment scope:

- Lead credit purchases.
- Vendor subscriptions.

Requirements:

- Razorpay integration.
- Order creation.
- Payment verification.
- Webhook signature validation.
- Idempotent webhook processing.
- Failed payment handling.
- Payment transaction history.
- Receipts.

Never trust payment status received from the frontend.

Do not implement customer wedding-service escrow in Phase 1.

## M. Favourites

Suggested model:

- FavouriteVendor.

Requirements:

- Add favourite.
- Remove favourite.
- List favourites.
- Prevent duplicate records.

## N. Reviews

Suggested models:

- Review.
- ReviewModeration.

Requirements:

- Genuine customer reviews.
- Moderation.
- Duplicate prevention.
- Rating aggregation.

Do not generate fake reviews or ratings.

Do not claim every review is booking-verified unless a valid verification mechanism exists.

## O. Notifications

Suggested models:

- Notification.
- NotificationPreference.
- NotificationDeliveryLog.

Events:

- Enquiry submitted.
- Lead assigned.
- Lead unlocked.
- Vendor approved.
- Vendor rejected.
- Verification updated.
- Subscription expiring.
- Lead credits updated.
- Assisted call requested.

Support:

- In-app notifications.
- SMS.
- Email.
- Push notifications as a future extension.

Use BullMQ for appropriate asynchronous workflows.

## P. Admin and auditing

Suggested models:

- AdminAuditLog.
- PlatformSetting.

Requirements:

- Vendor approval.
- Vendor verification.
- Customer management.
- Category management.
- Location management.
- Enquiry management.
- Lead assignment.
- Lead pricing configuration.
- Subscription configuration.
- Payment transaction viewing.
- Basic reporting.
- Platform configuration.

Audit sensitive administrative actions.

---

# 9. LEAD MATCHING ENGINE

Implement matching inside the `lead-management` feature.

Do not place matching logic in controllers.

## Matching criteria

A vendor must:

1. Be approved.
2. Be active.
3. Offer the requested category or service.
4. Cover the customer's location.
5. Meet configured eligibility conditions.

## Location matching

Support:

- Exact village match.
- Mandal-level coverage.
- District-level coverage.
- Explicit additional service areas.

## Matching capabilities

- Find eligible vendors.
- Apply configurable matching rules.
- Assign one or multiple vendors.
- Prevent duplicate assignment.
- Exclude suspended or inactive vendors.
- Record matching outcomes.
- Support manual admin assignment.
- Support lead expiry.

Do not invent popularity or rating scores.

Any ranking algorithm must use real data and documented rules.

---

# 10. LEAD UNLOCK AND CONTACT PRIVACY

Customer privacy is critical.

Before authorized lead access:

- Vendor may see permitted enquiry summary.
- Customer phone number remains hidden.
- Restricted personal details remain hidden.

After successful lead unlock:

- Verify vendor ownership and eligibility.
- Verify available credits or subscription entitlement.
- Deduct credits where applicable.
- Record the unlock.
- Reveal authorized contact details.

The unlock operation must be atomic.

Use idempotency and concurrency protection.

A vendor must never pay twice for the same lead due to duplicate requests, retries or concurrent operations.

Ensure a vendor cannot access another vendor's unlocked leads.

---

# 11. ASSISTED ENQUIRY SYSTEM

Many rural and town wedding customers may prefer phone assistance.

Support:

- Request a phone call.
- Admin-created enquiry.
- Support coordinator follow-up.
- Manual vendor assignment.
- Customer contact preferences.
- Enquiry source tracking.

The enquiry source should distinguish:

```text
WEBSITE
ANDROID_APP
ADMIN_CREATED
PHONE_ASSISTED
OTHER
```

Protect customer details and record administrative activity.

---

# 12. API DESIGN — REST + SWAGGER

Base API:

`/api/v1`

Use consistent naming and response structures.

## Authentication

```text
POST /auth/send-otp
POST /auth/verify-otp
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Customers

```text
GET   /customers/profile
PATCH /customers/profile

GET    /customers/enquiries
GET    /customers/enquiries/:id

GET    /customers/favourites
POST   /customers/favourites
DELETE /customers/favourites/:vendorId
```

## Public vendor discovery

```text
GET /vendors
GET /vendors/:slug
GET /vendors/:id/services
GET /vendors/:id/portfolio
GET /vendors/:id/reviews
```

Support filters:

- Category.
- Subcategory.
- District.
- Mandal.
- Village.
- Keyword.
- Minimum price.
- Maximum price.
- Verification status.
- Pagination.
- Sorting.

Return only public and approved vendor information.

## Vendor portal

```text
POST  /vendors/register
GET   /vendors/me
PATCH /vendors/me
GET   /vendors/dashboard

GET    /vendors/services
POST   /vendors/services
PATCH  /vendors/services/:id
DELETE /vendors/services/:id

GET    /vendors/service-areas
POST   /vendors/service-areas
DELETE /vendors/service-areas/:id

GET    /vendors/portfolio
POST   /vendors/portfolio
DELETE /vendors/portfolio/:id

GET   /vendors/enquiries
GET   /vendors/enquiries/:id
POST  /vendors/enquiries/:id/unlock
PATCH /vendors/enquiries/:id/status

GET /vendors/lead-credits
GET /vendors/lead-credits/transactions

GET /vendors/subscription
```

Ensure customer contact information is protected until the vendor is authorized.

## Enquiries

```text
POST /enquiries
GET  /enquiries/:id
GET  /enquiries/:id/status

POST /enquiries/:id/request-call
```

Restrict access to the customer who owns the enquiry, authorized assigned vendors and authorized administrators.

## Lead credits

```text
GET  /lead-credits/plans
GET  /lead-credits/balance
GET  /lead-credits/transactions
POST /lead-credits/purchase
```

## Subscriptions

```text
GET  /subscriptions/plans
GET  /subscriptions/current
POST /subscriptions/checkout
```

## Payments

```text
POST /payments/create-order
POST /payments/verify
POST /payments/webhooks/razorpay

GET /payments/transactions
GET /payments/transactions/:id
```

## Categories

```text
GET /categories
GET /categories/:slug
```

## Locations

```text
GET /locations/states
GET /locations/districts
GET /locations/mandals
GET /locations/villages
```

Support parent-based filtering.

## Admin

```text
GET   /admin/dashboard

GET   /admin/vendors
GET   /admin/vendors/:id
PATCH /admin/vendors/:id/status

GET   /admin/vendor-verification
PATCH /admin/vendor-verification/:id

GET   /admin/customers

GET   /admin/enquiries
GET   /admin/enquiries/:id
POST  /admin/enquiries/:id/assign

GET    /admin/categories
POST   /admin/categories
PATCH  /admin/categories/:id
DELETE /admin/categories/:id

GET   /admin/locations
POST  /admin/locations
PATCH /admin/locations/:id

GET   /admin/payments
GET   /admin/subscriptions

GET   /admin/settings
PATCH /admin/settings
```

These are initial API contracts. Inspect existing frontend API integrations and adjust where necessary.

Do not create duplicate APIs unnecessarily.

Document every endpoint in Swagger.

---

# 13. AUTHENTICATION AND AUTHORIZATION

Implement secure authentication.

## Authentication

- Phone OTP.
- OTP verification.
- JWT access tokens.
- Refresh token rotation.
- Logout.
- Session revocation.
- Account status checks.

## RBAC

Roles:

```text
CUSTOMER
VENDOR_OWNER
VENDOR_STAFF
ADMIN
SUPER_ADMIN
```

Implement:

- Authentication Guards.
- Role Guards.
- Permission checks.
- Ownership checks.
- Vendor resource isolation.
- Admin route protection.

Do not rely on frontend role checks for security.

A user must only access records they are authorized to access.

Design permissions so future staff roles can be introduced without rewriting the authentication architecture.

---

# 14. FILE STORAGE — AWS S3

Use S3 for:

- Vendor profile images.
- Portfolio images.
- Supported portfolio videos.
- Vendor verification documents.

Implement:

- Presigned upload URLs.
- File type validation.
- File size limits.
- Unique object keys.
- Vendor-specific access isolation.
- Secure document access.
- Media metadata.
- CloudFront delivery for appropriate public assets.
- Deletion and cleanup workflows.

Never expose AWS credentials to the frontend.

Use IAM roles in AWS environments.

---

# 15. NOTIFICATIONS AND BACKGROUND PROCESSING

Use BullMQ with Redis where background processing is justified.

Background jobs may include:

- OTP delivery.
- Email delivery.
- SMS notifications.
- Lead assignment notifications.
- Subscription expiry reminders.
- Payment webhook processing.
- Media cleanup.
- Administrative alerts.

Use retry policies and failure handling.

Prevent duplicate processing for critical jobs.

For multi-step database updates and event publishing, use reliable patterns such as an outbox where necessary.

Do not introduce a distributed event architecture for simple MVP operations.

---

# 16. API RESPONSE AND ERROR HANDLING

Use consistent response conventions.

Success:

```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {},
  "meta": null
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [],
  "statusCode": 400
}
```

Implement:

- Global exception filter.
- Global validation pipe.
- Consistent HTTP status codes.
- Pagination metadata.
- Structured error messages.
- Request correlation IDs.
- Production-safe error responses.
- Structured logging.

Do not expose stack traces or secrets in production.

---

# 17. SECURITY REQUIREMENTS

Implement:

- Input validation.
- Authentication.
- Authorization.
- Rate limiting.
- OTP throttling.
- Secure token rotation.
- Secure environment configuration.
- CORS configuration.
- Helmet headers.
- Payment signature verification.
- Webhook idempotency.
- Ownership checks.
- File upload validation.
- Sensitive data redaction.
- Audit logging.
- Least-privilege AWS IAM.
- Protection against mass assignment.
- Safe error handling.

Customer phone numbers and personal information must never be exposed to unauthorized users.

Never trust frontend-supplied payment status, vendor verification status, lead unlock status or pricing values.

All financial and credit-related operations must be validated on the server.

---

# 18. DATABASE AND API PERFORMANCE

Implement:

- Pagination on all list APIs.
- Appropriate PostgreSQL indexes.
- Efficient Prisma queries.
- Avoid N+1 queries.
- Select only required fields.
- Database transactions for critical operations.
- Redis caching for suitable public read-heavy data.
- Background processing for non-blocking work.
- Database connection pooling appropriate to deployment.

Avoid caching private customer data without a clear security strategy.

Do not add unnecessary database indexes or caching without understanding query patterns.

---

# 19. TESTING STRATEGY

Write tests for all critical business workflows.

## Authentication tests

- Valid OTP.
- Invalid OTP.
- Expired OTP.
- OTP retry limits.
- Token refresh.
- Session revocation.

## Vendor tests

- Registration.
- Approval and rejection.
- Service management.
- Service area management.
- Portfolio management.
- Verification.
- Unauthorized access.

## Discovery tests

- Category filtering.
- Location filtering.
- Price filtering.
- Pagination.
- Approved vendor visibility.
- Inactive vendor exclusion.

## Enquiry tests

- Enquiry creation.
- Authenticated enquiry.
- Assisted enquiry.
- Input validation.
- Enquiry ownership.
- Duplicate submission prevention where applicable.

## Lead management tests

- Exact village matching.
- Mandal matching.
- District matching.
- Multiple vendor assignment.
- Manual assignment.
- Duplicate assignment prevention.
- Lead expiry.
- Contact information visibility.

## Lead credit tests

- Successful unlock.
- Insufficient credits.
- Duplicate unlock.
- Concurrent unlock requests.
- Atomic deduction.
- Ledger consistency.

## Payment tests

- Payment order creation.
- Signature verification.
- Invalid webhook.
- Duplicate webhook.
- Successful credit purchase.
- Failed payment.
- Subscription payment.

## Authorization tests

- Customer cannot access another customer's enquiry.
- Vendor cannot access another vendor's leads.
- Unapproved vendor cannot use restricted features.
- Unauthorized users cannot access admin APIs.

Use unit tests, integration tests and API end-to-end tests.

Do not mark a feature complete merely because TypeScript compilation succeeds.

---

# 20. OBSERVABILITY AND MONITORING

Implement:

- Structured logging with Pino.
- Request IDs.
- Error logging.
- Health checks.
- Database health.
- Redis health when used.
- Background job monitoring.
- CloudWatch integration.
- Application metrics where useful.

Never log passwords, OTPs, access tokens, payment secrets or unnecessary customer personal information.

---

# 21. DOCUMENTATION

Maintain the following documentation:

```text
docs/backend/
├── BACKEND_AUDIT.md
├── ARCHITECTURE.md
├── FEATURE_DEPENDENCIES.md
├── DATABASE_DESIGN.md
├── ER_DIAGRAM.md
├── API_SPECIFICATION.md
├── AUTHENTICATION.md
├── LEAD_MATCHING.md
├── LEAD_MONETIZATION.md
├── SECURITY.md
├── TESTING.md
└── DEPLOYMENT.md
```

Documentation must match actual code.

Include:

- Module responsibilities.
- Feature dependencies.
- Database relationships.
- API examples.
- Authentication flow.
- Lead matching flow.
- Lead unlock logic.
- Payment workflow.
- Deployment instructions.

---

# 22. ENVIRONMENT CONFIGURATION

Create `.env.example`.

Include required variables such as:

```env
NODE_ENV=
PORT=
API_PREFIX=

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

AWS_REGION=
AWS_S3_BUCKET=
AWS_CLOUDFRONT_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

SMS_PROVIDER=
SMS_API_KEY=

EMAIL_PROVIDER=
EMAIL_FROM=

CORS_ORIGINS=
```

Validate environment variables at startup.

Never commit actual credentials.

Use AWS Secrets Manager or an equivalent secure secret provider in production.

---

# 23. IMPLEMENTATION PHASES

Implement in controlled phases.

Do not attempt to build the complete backend in one operation.

## Phase 0 — Audit and architecture

- Inspect repository.
- Understand existing implementation.
- Review frontend API requirements.
- Identify reusable components.
- Define feature modules.
- Prepare dependency map.
- Prepare entity inventory.
- Create ER diagram.
- Define API contracts.
- Identify decisions requiring approval.

Deliverables:

- BACKEND_AUDIT.md
- ARCHITECTURE.md
- FEATURE_DEPENDENCIES.md
- DATABASE_DESIGN.md
- API_SPECIFICATION.md

Wait for approval.

## Phase 1 — Backend foundation

- NestJS configuration.
- Environment validation.
- PostgreSQL.
- Prisma.
- Global validation.
- Exception handling.
- Swagger.
- Pino logging.
- Health checks.
- Docker development environment.

Deliverable: Working backend foundation.

## Phase 2 — Identity and access

- Users.
- OTP authentication.
- JWT.
- Refresh token rotation.
- RBAC.
- Customer profiles.
- Vendor registration.

Deliverable: Secure identity system.

## Phase 3 — Master data and vendors

- Categories.
- Subcategories.
- Locations.
- Vendor profiles.
- Vendor services.
- Service areas.
- Vendor portfolio.
- Verification.

Deliverable: Vendor management and discovery-ready APIs.

## Phase 4 — Discovery and matchmaking

- Public vendor directory.
- Vendor profile APIs.
- Search.
- Filters.
- Customer enquiries.
- Assisted enquiries.
- Vendor matching.
- Lead assignment.
- Lead activity tracking.

Deliverable: Complete customer-to-vendor matchmaking.

## Phase 5 — Lead monetization

- Lead pricing.
- Lead wallet.
- Lead credits.
- Lead unlock.
- Credit ledger.
- Subscription plans.
- Razorpay integration.
- Payment webhooks.

Deliverable: Working vendor monetization.

## Phase 6 — Admin and notifications

- Admin APIs.
- Vendor approval.
- Verification management.
- Enquiry management.
- Manual lead assignment.
- Platform settings.
- Notifications.
- Basic dashboard analytics.

Deliverable: Operational administration.

## Phase 7 — Production readiness

- Unit testing.
- Integration testing.
- E2E testing.
- Security review.
- Database optimization.
- Docker production image.
- CI/CD.
- AWS deployment.
- Monitoring.
- Backup and recovery strategy.

Deliverable: Production deployment readiness.

---

# 24. DEVELOPMENT RULES

Follow these rules throughout development.

1. Inspect before modifying.
2. Plan before coding.
3. Follow feature-based architecture.
4. Implement one phase at a time.
5. Use strict TypeScript.
6. Keep controllers thin.
7. Put business logic in feature services.
8. Use DTOs for input validation.
9. Use Prisma transactions for critical operations.
10. Keep feature boundaries clear.
11. Avoid circular dependencies.
12. Avoid unnecessary abstractions.
13. Preserve existing frontend API contracts where possible.
14. Document breaking API changes.
15. Never expose customer information without authorization.
16. Never trust frontend payment status.
17. Never hardcode lead prices.
18. Never create fake reviews or verification records.
19. Do not restore archived Phase 2 features.
20. Write tests for critical workflows.
21. Keep documentation updated.
22. Run relevant tests after each phase.
23. Report implementation status honestly.
24. Do not claim deployment or testing succeeded unless it actually did.

---

# 25. FIRST RESPONSE REQUIRED FROM THE AI AGENT

When this prompt is provided, do not immediately generate implementation code.

First perform the repository audit.

Then respond with:

1. Existing repository structure.
2. Current backend technology and architecture.
3. Existing modules and functionality.
4. Missing backend functionality.
5. Recommended feature-based folder structure.
6. Feature responsibility matrix.
7. Feature dependency map.
8. Database entity inventory.
9. ER diagram.
10. API module breakdown.
11. Lead matching workflow.
12. Lead unlock and credit workflow.
13. Security considerations.
14. Existing frontend integration requirements.
15. Implementation phases.
16. Decisions requiring product-owner approval.

Clearly distinguish:

- Already implemented.
- Missing.
- Recommended.
- Requires approval.
- Deferred to Phase 2.

Do not modify existing files during the initial audit unless explicitly requested.

Wait for approval before beginning implementation.

---

# FINAL ENGINEERING PRINCIPLE

Build Telangana Weddings as a production-ready, feature-based NestJS modular monolith.

The MVP is a hyperlocal wedding vendor discovery, lead generation and matchmaking marketplace.

Focus on making these five capabilities work exceptionally well:

1. Customer discovery.
2. Vendor management.
3. Location-based matching.
4. Enquiry and lead delivery.
5. Vendor lead monetization.

Build only the functionality required to make this business model successful.

Keep the architecture extensible for future bookings, payments, fulfillment and other advanced capabilities, but do not overengineer Phase 1.

**Simplicity first. Strong domain boundaries. Secure business logic. Production-quality implementation.**

