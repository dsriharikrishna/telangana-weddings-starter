# TELANGANA WEDDINGS — FINAL MASTER PROMPT
## Customer Android Application | Product, UI/UX, Architecture & Implementation

Act as a **Senior React Native Architect, Mobile Product Engineer, UI/UX Designer, and Technical Lead**.

Your task is to plan and build the official Android customer application for **Telangana Weddings**, a hyperlocal wedding services discovery and matchmaking marketplace.

This is a production-oriented application, not a demo or a basic UI prototype.

You must inspect the existing repository, understand the product requirements, preserve established architecture, and integrate with the existing NestJS backend.

**Important: Do not start implementation immediately. First perform a complete audit and present your findings and implementation plan. Wait for approval before modifying code.**

---

# 1. PRODUCT CONTEXT

Telangana Weddings connects families with trusted local wedding service providers.

The initial target market is:

- Narayanpet district, Telangana.
- Mahabubnagar district, Telangana.
- Expansion to other Telangana districts later.
- Telugu-speaking families and English-speaking users.
- Urban, semi-urban, and rural customers.

The product should make discovering and contacting wedding vendors simple, trustworthy, and accessible.

### Core customer journey

1. Customer opens the application.
2. Selects preferred language and location.
3. Discovers wedding service categories.
4. Explores local vendors.
5. Views vendor profiles, portfolios, starting prices, and reviews.
6. Submits an enquiry or requests a callback.
7. Platform facilitates matching with suitable vendors.
8. Customer and vendor communicate directly.
9. Customer can track enquiry status and save preferred vendors.

The application is a **discovery and matchmaking marketplace**, not a wedding execution or booking-management platform.

### Product positioning

- Local vendors.
- Local communities.
- Authentic wedding traditions.
- Trusted discovery.
- Easy enquiries.
- Assisted support for families who are not comfortable using digital platforms.

---

# 2. STRICT MVP SCOPE

Build only the features required for the initial marketplace launch.

### Included

- Public vendor discovery.
- Dynamic wedding service categories.
- District, mandal, and village/town-based discovery.
- Vendor profiles.
- Vendor portfolios and images.
- Vendor starting prices.
- Vendor reviews and ratings.
- Customer registration and authentication.
- Customer profile management.
- Enquiry submission.
- Assisted call and callback requests.
- Enquiry history and status tracking.
- Favourite vendors.
- Notifications.
- Customer support.
- Telugu and English language support.
- Location preferences.

### Explicitly excluded from the customer app MVP

Do not build:

- Formal wedding booking workflows.
- Wedding event management.
- Full service fulfilment tracking.
- Customer payment collection.
- Escrow.
- In-app contracts.
- Dispute arbitration.
- Complex quotation approval.
- Complex wedding planning calendars.
- Multi-party settlements.
- Vendor commission management.
- Advanced analytics dashboards.

Do not reintroduce archived features simply because they exist in the old repository.

If an excluded feature is present in the backend or archived code, treat it as out of scope unless explicitly approved.

---

# 3. TECHNOLOGY STACK

Use the following stack unless the existing repository has a justified compatible decision.

| Area | Technology |
|---|---|
| Mobile framework | React Native |
| Development platform | Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| API state | TanStack Query |
| Client state | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Secure token storage | Expo SecureStore |
| Styling | NativeWind, where compatible |
| Native styling | React Native StyleSheet |
| Icons | Lucide React Native or compatible icon library |
| Image selection | Expo Image Picker |
| Notifications | Expo Notifications |
| Testing | Jest |
| Component testing | React Native Testing Library |
| Build and release | EAS Build |

Use stable, compatible package versions.

Do not install unnecessary dependencies.

Do not mix multiple libraries for the same responsibility.

---

# 4. BACKEND INTEGRATION

The mobile application must consume the existing backend.

### Backend architecture

- Node.js.
- NestJS.
- TypeScript.
- PostgreSQL.
- Prisma ORM.
- REST APIs.
- API versioning: `/api/v1`.
- JWT authentication.
- Refresh token rotation.
- Role-based access control.
- Redis and BullMQ where required.
- AWS S3 for media storage.

### Integration rules

1. Inspect existing backend API contracts before building screens.
2. Reuse existing endpoint paths, DTOs, enums, and response structures.
3. Never invent endpoints without identifying the missing backend capability.
4. Create a typed API client.
5. Centralize API configuration and error handling.
6. Use TanStack Query for server state.
7. Use Zustand only for appropriate client-side state.
8. Handle loading, empty, error, retry, and success states.
9. Implement pagination and filtering according to backend contracts.
10. Do not place secrets or privileged credentials in the mobile application.

### Suggested API organization

```text
/api/v1/auth
/api/v1/users
/api/v1/customers
/api/v1/categories
/api/v1/locations
/api/v1/vendors
/api/v1/vendor-discovery
/api/v1/enquiries
/api/v1/favourites
/api/v1/reviews
/api/v1/notifications
/api/v1/uploads
/api/v1/support
```

These are logical API groups, not permission to create duplicate or incompatible endpoints. Verify the actual backend before implementation.

---

# 5. UNIFIED IDENTITY AND RBAC

The platform must use **one unified identity system** for customers and vendors.

Do not create separate authentication identities for the same phone number.

### Identity model

A single User can have multiple roles.

Supported roles:

- CUSTOMER
- VENDOR_OWNER
- VENDOR_STAFF
- ADMIN
- SUPER_ADMIN

A user may be both:

- A customer.
- A vendor owner.

Customer and vendor profiles must remain separate.

### Expected identity relationships

```text
User
 ├── UserRole
 ├── CustomerProfile
 └── VendorMembership
       └── VendorProfile
```

A vendor membership relationship should support multiple users managing a business when required.

Do not assume that a vendor business must permanently belong to exactly one user.

### Customer app behavior

- A new customer registers using the unified authentication system.
- The backend assigns the CUSTOMER role when appropriate.
- A customer can browse vendors without registering.
- Protected actions require authentication.
- A customer who wants to become a vendor can use a "Register as Vendor" entry point.
- Vendor registration should create or associate a vendor profile with the existing user identity.
- Do not create another account for an existing phone number.
- Do not expose vendor management functionality inside the customer app MVP.

### Authorization rules

The backend is the source of truth for authorization.

Never trust a client-provided role, vendor ID, permission, or active application mode.

A user interface mode such as Customer Mode or Vendor Mode is only a navigation preference. It is not authorization.

The backend must validate:

- Authenticated identity.
- Assigned role.
- Vendor membership.
- Vendor membership status.
- Resource ownership.
- Lead assignment and lead access permissions.
- Vendor approval and verification requirements.

The mobile app should handle unauthorized responses gracefully.

Do not use frontend role checks as a replacement for backend authorization.

---

# 6. APPLICATION ARCHITECTURE

Use a **feature-based architecture**.

Avoid a giant components folder or a monolithic screen structure.

Suggested architecture:

```text
mobile/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── (public)/
│   │   ├── index.tsx
│   │   ├── categories/
│   │   ├── locations/
│   │   └── vendor/
│   │
│   ├── (auth)/
│   │   ├── welcome.tsx
│   │   ├── phone.tsx
│   │   ├── verify-otp.tsx
│   │   └── profile-setup.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── explore.tsx
│   │   ├── enquiries.tsx
│   │   ├── saved.tsx
│   │   └── profile.tsx
│   │
│   ├── category/
│   ├── vendor/
│   │   └── [vendorSlug].tsx
│   ├── enquiry/
│   ├── notifications/
│   └── settings/
│
├── src/
│   ├── core/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── errors/
│   │   ├── query/
│   │   ├── storage/
│   │   └── providers/
│   │
│   ├── common/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── utils/
│   │   └── theme/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── onboarding/
│   │   ├── home/
│   │   ├── categories/
│   │   ├── locations/
│   │   ├── vendor-discovery/
│   │   ├── vendor-profile/
│   │   ├── enquiries/
│   │   ├── favourites/
│   │   ├── reviews/
│   │   ├── notifications/
│   │   ├── customer-profile/
│   │   └── support/
│   │
│   ├── store/
│   └── assets/
│
├── components/
├── tests/
├── app.json
├── eas.json
├── package.json
└── tsconfig.json
```

Adapt the structure to the existing repository rather than forcing a duplicate architecture.

### Architecture rules

- Keep route files lightweight.
- Keep business logic inside feature modules.
- Separate API calls from screen components.
- Use reusable components.
- Use typed navigation.
- Use shared query keys.
- Keep forms and validation schemas organized.
- Avoid duplicate API clients.
- Avoid unnecessary abstractions.
- Avoid circular dependencies.
- Keep feature boundaries clear.
- Use environment-based API configuration.

---

# 7. CUSTOMER APP NAVIGATION

Use five primary bottom navigation items.

1. Home
2. Explore
3. Enquiries
4. Saved
5. Profile

### Home

The home screen should include:

- Brand identity.
- Current location selector.
- Search wedding services.
- Popular categories.
- Recommended local vendors.
- Recently viewed vendors.
- Trusted/verified vendor highlights.
- Local wedding inspiration.
- Assisted enquiry CTA.
- Support entry point.

Keep the homepage useful and discovery-oriented.

Do not turn it into a long marketing landing page.

### Explore

Include:

- Search.
- Category filters.
- District selection.
- Mandal selection.
- Village/town selection.
- Vendor cards.
- Price filters, if supported.
- Rating filters, if supported.
- Verified vendor filter.
- Sort options.
- Pagination or infinite scrolling.

### Vendor details

Show:

- Business name.
- Verification status.
- Vendor description.
- Location and service areas.
- Portfolio gallery.
- Services offered.
- Starting prices.
- Reviews and ratings.
- Contact/enquiry actions.
- Save vendor action.
- Share vendor action.

Clearly distinguish verified vendors from unverified vendors.

Do not invent trust badges or verification claims.

### Enquiries

Include:

- Enquiry list.
- Enquiry status.
- Enquiry details.
- Related vendor information.
- Submission date.
- Contact or callback status, when available.
- Empty states.
- Retry states.

Use backend-defined enquiry statuses.

### Saved vendors

Include:

- Favourite vendor list.
- Remove from favourites.
- Open vendor details.
- Empty state with discovery CTA.

### Profile

Include:

- Customer information.
- Phone number.
- Preferred language.
- Preferred location.
- Account settings.
- Notification preferences.
- Support.
- Privacy policy.
- Terms and conditions.
- Logout.

---

# 8. AUTHENTICATION AND ONBOARDING

Use phone-number-based authentication with OTP.

Expected flow:

```text
Welcome
  ↓
Select Language
  ↓
Select Location (optional)
  ↓
Enter Phone Number
  ↓
Request OTP
  ↓
Verify OTP
  ↓
Check Existing User
  ↓
Create or Retrieve Customer Profile
  ↓
Home
```

### Authentication requirements

- Secure OTP verification.
- OTP resend cooldown.
- OTP expiry handling.
- Invalid OTP handling.
- Rate-limit feedback.
- Refresh token rotation.
- Secure token storage.
- Logout and session cleanup.
- Expired session handling.
- Account deactivation handling.

Use Expo SecureStore for sensitive session tokens.

Never store authentication tokens in AsyncStorage.

Do not log OTPs, tokens, or sensitive personal information.

If the backend supports an existing account with multiple roles, preserve those roles and do not create a duplicate identity.

---

# 9. UI/UX AND BRAND DESIGN SYSTEM

The application must feel like an authentic Telangana wedding platform.

The visual direction should combine:

- Traditional Telugu wedding aesthetics.
- Modern mobile usability.
- Premium marketplace design.
- Local cultural authenticity.
- Clean, trustworthy interfaces.

### Brand palette

| Token | Color |
|---|---|
| Royal Crimson | `#762B46` |
| Deep Wine | `#542034` |
| Zari Gold | `#C5A46D` |
| Warm Ivory | `#FAF7F2` |
| Sandalwood | `#F4EDE3` |
| Charcoal | `#292524` |
| Emerald | `#047857` |
| Marigold | `#D9894C` |

Use semantic theme tokens rather than hardcoding colors throughout components.

### Typography

English:
- Sora for headings.
- Inter for body text.

Telugu:
- Noto Serif Telugu for selected traditional headings.
- Noto Sans Telugu for readable body content.

Ensure fonts render correctly on Android.

### Design characteristics

- Spacious layouts.
- Clear visual hierarchy.
- Consistent spacing.
- Rounded cards.
- Subtle borders.
- Restrained shadows.
- High-quality photography.
- Readable typography.
- Clear primary actions.
- Accessible contrast.
- Consistent icon sizing.

### Component standards

Create reusable components for:

- Primary and secondary buttons.
- Search bars.
- Location selectors.
- Category cards.
- Vendor cards.
- Rating displays.
- Verification indicators.
- Price displays.
- Image galleries.
- Filter chips.
- Bottom sheets.
- Empty states.
- Loading skeletons.
- Error states.
- Confirmation dialogs.
- Form fields.
- Toast messages.

Use native-feeling interactions and Android-friendly patterns.

Avoid excessive gradients, unnecessary animations, oversized typography, and decorative UI that harms usability.

---

# 10. TELUGU AND ENGLISH LOCALIZATION

Support:

- Telugu.
- English.

Requirements:

- Language selection during onboarding.
- Language switching from profile/settings.
- Centralized translation files.
- No hardcoded user-facing strings inside screens.
- Correct Telugu font rendering.
- Localized date and number formatting.
- Consistent terminology across the app.

Example:

```text
translations/
├── en.json
└── te.json
```

Do not machine-translate important wedding terminology without reviewing its meaning and cultural suitability.

---

# 11. LOCATION AND LOCAL DISCOVERY

Location is a core product capability.

Support the hierarchy:

```text
State
  └── District
       └── Mandal
            └── Village / Town
```

Initial market:

- Narayanpet.
- Mahabubnagar.

Requirements:

- Manual location selection.
- Remember selected location.
- Allow location changes.
- Filter vendors by service area.
- Display vendor service areas.
- Avoid forcing GPS permissions.
- Request location permission only when it provides a clear benefit.
- Provide manual fallback.

Use backend location master data.

Do not hardcode district, mandal, or village lists in application components.

---

# 12. ENQUIRY AND MATCHMAKING EXPERIENCE

This is the most important conversion flow.

### Customer enquiry flow

```text
Select Category
      ↓
Explore Vendors
      ↓
Select Vendor or Request Assistance
      ↓
Enter Enquiry Details
      ↓
Submit Enquiry
      ↓
Backend Validates and Matches
      ↓
Enquiry Confirmation
      ↓
Track Enquiry
```

### Enquiry form

Only request necessary information.

Potential fields:

- Customer name.
- Phone number.
- Wedding date, if known.
- Preferred location.
- Service category.
- Requirements/message.
- Preferred contact method.

Do not force users to provide every optional detail.

### Assisted enquiry

Provide an accessible callback/request-assistance option.

This is important for families who may prefer speaking with a person instead of completing a digital form.

### Enquiry behavior

- Prevent accidental duplicate submissions.
- Show submission progress.
- Display success confirmation.
- Handle network interruptions.
- Preserve entered information when reasonable.
- Show backend-defined enquiry status.
- Do not expose private vendor or customer information.
- Do not promise a match before the backend confirms one.

The platform facilitates the introduction. The family and vendor finalize arrangements directly.

---

# 13. PERFORMANCE AND RELIABILITY

Build for real-world Android devices and varying network conditions.

Requirements:

- Optimize image sizes.
- Use image caching.
- Lazy-load long lists.
- Use pagination.
- Avoid unnecessary re-renders.
- Use stable list keys.
- Keep navigation responsive.
- Handle slow networks.
- Add request timeouts.
- Support retry for recoverable errors.
- Avoid blocking the main UI thread.
- Minimize application startup time.
- Use skeleton loaders.
- Handle offline and reconnect states gracefully.

Do not add complex offline synchronization unless a concrete requirement exists.

---

# 14. SECURITY AND PRIVACY

Implement:

- Secure token storage.
- Backend-enforced RBAC.
- Input validation.
- Safe API error handling.
- Secure media upload flow.
- No exposed secret keys.
- No sensitive information in logs.
- Safe logout.
- Session expiry handling.
- Appropriate permission requests.
- Privacy-conscious analytics.

Do not trust the mobile client for authorization or pricing decisions.

Do not expose vendor lead information to unauthorized customers.

Do not store payment credentials or sensitive authentication data locally.

---

# 15. TESTING

Add tests for important product flows.

### Unit tests

- Validation schemas.
- Formatting utilities.
- Query key utilities.
- State logic.
- Authentication helpers.

### Component tests

- Vendor cards.
- Category cards.
- Search components.
- Enquiry forms.
- Empty states.
- Loading states.
- Error states.

### Integration tests

- Authentication flow.
- Vendor discovery.
- Vendor profile.
- Favourite management.
- Enquiry submission.
- Enquiry history.
- Logout.

### Manual Android testing

Test:

- Small-screen devices.
- Different Android screen sizes.
- Slow network.
- Failed network.
- Expired sessions.
- OTP errors.
- Telugu rendering.
- Keyboard behavior.
- Deep links.
- Back navigation.
- App background/resume.
- Image loading.

Do not claim production readiness without meaningful test results.

---

# 16. DEVELOPMENT PHASES

Implement in controlled phases.

## Phase 0 — Repository and Product Audit

No code modifications.

Inspect:

- Existing repository structure.
- Existing mobile application, if any.
- Backend API contracts.
- Authentication implementation.
- User and role models.
- Customer profile models.
- Vendor membership and profile models.
- Category and location APIs.
- Vendor discovery APIs.
- Enquiry APIs.
- Notification APIs.
- Existing design references.
- Environment configuration.
- Existing tests and build configuration.

Deliver:

1. Current architecture report.
2. Existing implementation inventory.
3. Missing capabilities.
4. API integration gap analysis.
5. Identity/RBAC compatibility analysis.
6. Proposed mobile architecture.
7. Screen inventory.
8. Navigation map.
9. Design system proposal.
10. Development phases.
11. Risks and dependencies.

**Stop after presenting the audit. Wait for explicit approval.**

## Phase 1 — UI/UX Foundation

After approval:

- Establish design tokens.
- Configure typography.
- Build shared components.
- Configure navigation.
- Implement theme support.
- Implement localization.
- Build reusable layouts.

## Phase 2 — Application Foundation

- Configure Expo.
- Configure TypeScript.
- Configure environment variables.
- Set up API client.
- Configure TanStack Query.
- Configure Zustand.
- Configure secure storage.
- Configure error handling.
- Configure application providers.

## Phase 3 — Authentication and Identity

- Phone authentication.
- OTP verification.
- Session management.
- Customer profile setup.
- Unified identity integration.
- Role-aware navigation where required.

## Phase 4 — Discovery

- Home.
- Categories.
- Locations.
- Search.
- Vendor listing.
- Filters.
- Vendor details.
- Portfolio gallery.

## Phase 5 — Customer Engagement

- Enquiry form.
- Assisted callback.
- Enquiry confirmation.
- Enquiry history.
- Favourite vendors.
- Reviews, where supported.

## Phase 6 — Notifications and Support

- Push notification registration.
- Notification list.
- Notification preferences.
- Customer support.
- Profile settings.
- Language switching.

## Phase 7 — Quality and Release

- Testing.
- Performance optimization.
- Android compatibility.
- Accessibility.
- Error monitoring.
- EAS development build.
- EAS production build.
- Release documentation.

---

# 17. CODING STANDARDS

Follow these rules throughout implementation:

1. TypeScript strict mode.
2. Avoid `any`.
3. Prefer explicit types and interfaces.
4. Keep screens small and focused.
5. Extract reusable business logic.
6. Avoid duplicated components.
7. Keep API contracts typed.
8. Use centralized error handling.
9. Use consistent naming conventions.
10. Follow feature-based architecture.
11. Avoid unnecessary dependencies.
12. Do not introduce microservices or complex architecture into the mobile application.
13. Do not rewrite working backend functionality without a clear reason.
14. Preserve existing working features.
15. Do not delete archived modules or documentation.
16. Update documentation when architecture or API integration changes.
17. Run relevant tests and type checks after each implementation phase.

For every important implementation, explain:

- What was implemented.
- Why it was implemented.
- Files created or modified.
- API dependencies.
- Tests performed.
- Known limitations.

---

# 18. DEFINITION OF DONE

The customer Android application is considered MVP-ready only when:

- A customer can browse vendors without signing in.
- A customer can register and authenticate.
- A customer can discover vendors by category and location.
- Vendor profiles display accurate backend information.
- A customer can save and remove favourite vendors.
- A customer can submit an enquiry.
- A customer can request assisted contact.
- A customer can view enquiry history.
- Notifications work where backend support exists.
- Telugu and English are supported.
- The application handles loading, empty, error, and network states.
- Authentication tokens are stored securely.
- Backend authorization is respected.
- No excluded booking or fulfilment functionality has been introduced.
- Important flows have automated tests.
- The Android build succeeds.
- Setup and release documentation is available.

---

# 19. FINAL INSTRUCTIONS TO THE CODING AGENT

Think like a technical lead responsible for launching a real marketplace.

Prioritize:

1. Correct product scope.
2. Existing backend compatibility.
3. Unified identity and authorization.
4. Simple customer experience.
5. Local discovery.
6. Enquiry conversion.
7. Performance and reliability.
8. Maintainability.
9. Security.
10. Production readiness.

Do not over-engineer.

Do not build features merely because they are common in other wedding applications.

Do not make assumptions about existing backend capabilities.

Do not replace established repository architecture without justification.

**YOUR FIRST RESPONSE MUST CONTAIN ONLY THE PHASE 0 AUDIT REPORT AND RECOMMENDED IMPLEMENTATION PLAN. DO NOT MODIFY FILES, INSTALL PACKAGES, CREATE SCREENS, OR WRITE IMPLEMENTATION CODE UNTIL I REVIEW AND APPROVE THE PLAN.**

After approval, implement one phase at a time and report progress with test results.
