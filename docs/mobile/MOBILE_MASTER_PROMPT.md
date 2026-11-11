# TELANGANA WEDDINGS — CUSTOMER ANDROID APPLICATION
# MOBILE ARCHITECTURE & DEVELOPMENT MASTER PROMPT

## 1. ROLE AND RESPONSIBILITY

Act as a Senior React Native Engineer, Mobile Application Architect, Product Designer, UX Architect and Android Application Developer.

Your responsibility is to design and develop the production-ready customer Android application for Telangana Weddings.

Build a high-quality, culturally authentic, responsive and user-friendly mobile experience.

The application must connect to the existing Telangana Weddings NestJS backend.

Think like an engineer building a real commercial marketplace, not a demo application.

Responsibilities:

- Audit the existing repository.
- Understand the existing web application and backend.
- Define mobile architecture.
- Design navigation and user journeys.
- Build reusable UI components.
- Integrate NestJS APIs.
- Implement authentication.
- Build vendor discovery.
- Implement location-based search.
- Implement enquiry workflows.
- Implement favourites.
- Implement customer profile and support.
- Integrate notifications.
- Handle loading, empty, error and offline states.
- Write tests.
- Prepare Android builds and release documentation.

Do not start coding immediately.

First inspect the repository and prepare the mobile architecture and UI/UX plan.

---

# 2. PRODUCT CONTEXT

## Product

Telangana Weddings

## Product Vision

Build a hyperlocal wedding services discovery and matchmaking platform connecting wedding families with local service providers across Telangana.

The mobile application is primarily for customers and families who want to discover, compare and contact wedding vendors.

The experience must be simple enough for customers who may not be highly familiar with digital applications.

## Target Audience

- Wedding families.
- Brides and grooms.
- Parents and relatives.
- Customers in towns and villages.
- Telugu-speaking customers.
- English-speaking customers.

## Initial geographical focus

- Narayanpet district.
- Mahabubnagar district.
- Expandable to other Telangana districts.

Support:

- State.
- District.
- Mandal.
- Village / Town.

Do not hardcode the initial districts into application business logic.

## Application Ecosystem

The product contains:

1. Customer Website.
2. Customer Android Application.
3. Vendor Portal.
4. Admin Dashboard.
5. NestJS Backend.

This task is specifically for the CUSTOMER ANDROID APPLICATION.

Do not build vendor or admin mobile applications as part of this task.

---

# 3. MVP BUSINESS MODEL

Telangana Weddings is a hyperlocal discovery and lead-generation marketplace.

The customer application must support the following journey:

1. Customer opens the app.
2. Customer discovers wedding service categories.
3. Customer selects a category.
4. Customer chooses their location.
5. Customer explores relevant vendors.
6. Customer views vendor profiles and portfolios.
7. Customer saves favourite vendors.
8. Customer contacts vendors or submits an enquiry.
9. Platform matches the enquiry with eligible vendors.
10. Vendors receive the lead through their vendor portal.
11. Vendors unlock customer contact details according to platform rules.
12. Customer and vendor communicate directly.

## Important MVP boundaries

Do not implement active workflows for:

- Wedding service booking management.
- Escrow.
- In-app contract signing.
- Full service fulfillment tracking.
- Complex quotations.
- Wedding event project management.
- Customer payment for wedding services.
- Dispute arbitration.

Vendor subscriptions and lead-credit purchases are vendor-side operations. Do not build vendor payment management into the customer app.

Do not add features simply because they are common in other wedding applications.

Focus on customer discovery and enquiry conversion.

---

# 4. MANDATORY MOBILE TECHNOLOGY STACK

Use the following stack.

## Core

- React Native.
- Expo.
- TypeScript.
- Expo Router.
- Android-first development.

Use a stable Expo SDK compatible with the existing repository and dependencies.

## Navigation

- Expo Router.
- File-based routing.
- Protected route groups.
- Deep linking.

## Server State

- TanStack Query.
- Query caching.
- Mutations.
- Pagination.
- Query invalidation.
- API error handling.

## Client State

- Zustand.

Use Zustand only for shared client-side state such as:

- Selected location.
- User preferences.
- Temporary enquiry state.
- Application-level UI state.

Do not duplicate server data in Zustand when TanStack Query already manages it.

## Forms and Validation

- React Hook Form.
- Zod.
- Appropriate React Native form components.

## Styling

- NativeWind for Tailwind-style styling, if compatible with the existing Expo setup.
- Reusable design tokens.
- Shared component variants.
- React Native StyleSheet where it is more suitable.

Do not assume web-only components or CSS APIs work in React Native.

## Secure Storage

- Expo SecureStore for sensitive tokens.
- Appropriate local persistence for non-sensitive preferences.

Never store access or refresh tokens in plain AsyncStorage.

## Device Integrations

- Expo Image Picker.
- Expo Notifications.
- Expo Location only where location-based functionality requires permission.
- Expo Linking.
- Expo Haptics where useful.
- Expo Application configuration.

Do not request unnecessary device permissions.

## Testing

- Jest.
- React Native Testing Library.
- API integration tests where appropriate.
- Expo-compatible testing tools.

## Build and Distribution

- EAS Build.
- EAS Submit when configured.
- Android APK for internal testing.
- Android AAB for Play Store distribution.

Do not assume store credentials or accounts already exist.

---

# 5. FIRST TASK — REPOSITORY AUDIT

Inspect the existing repository before implementation.

Identify:

- Root monorepo structure.
- Existing web application.
- Existing admin application.
- Existing NestJS backend.
- Existing shared types.
- Existing API client.
- Existing authentication contracts.
- Existing category taxonomy.
- Existing geographical data.
- Existing brand identity.
- Existing design tokens.
- Existing documentation.
- Existing mobile application, if any.

Check:

- AGENTS.md.
- APPLICATION.md.
- Existing package.json files.
- Backend Swagger specification.
- API endpoint contracts.
- Existing frontend components.
- Existing assets and images.

## Audit questions

1. Does a mobile application already exist?
2. Can any shared types or API clients be reused?
3. Are API contracts already implemented?
4. Which backend endpoints are missing?
5. What design assets can be reused?
6. What navigation and feature modules are required?
7. Are there compatibility issues with the current Expo SDK?
8. What dependencies are already installed?

Create:

`docs/mobile/MOBILE_AUDIT.md`

Clearly identify:

- Already implemented.
- Missing.
- Reusable.
- Recommended.
- Requires approval.

Do not replace existing applications or technologies blindly.

---

# 6. MOBILE FEATURE-BASED ARCHITECTURE

Use Feature-Based Architecture.

Organize the application by business features rather than putting all screens, hooks and services into global technical folders.

Suggested structure:

```text
mobile/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   │
│   ├── (public)/
│   │   ├── welcome.tsx
│   │   ├── categories/
│   │   ├── vendors/
│   │   └── locations/
│   │
│   ├── (auth)/
│   │   ├── login.tsx
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
│   ├── vendor/
│   │   └── [vendorSlug].tsx
│   │
│   ├── category/
│   │   └── [categorySlug].tsx
│   │
│   ├── enquiry/
│   │   ├── create.tsx
│   │   └── [enquiryId].tsx
│   │
│   └── settings/
│
├── src/
│   ├── core/
│   │   ├── api/
│   │   ├── query/
│   │   ├── storage/
│   │   ├── config/
│   │   └── errors/
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
│   │   ├── home/
│   │   ├── categories/
│   │   ├── locations/
│   │   ├── vendor-discovery/
│   │   ├── vendor-profile/
│   │   ├── enquiries/
│   │   ├── favourites/
│   │   ├── notifications/
│   │   ├── customer-profile/
│   │   └── support/
│   │
│   ├── providers/
│   ├── store/
│   └── navigation/
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── animations/
│
├── app.json
├── eas.json
├── tsconfig.json
└── package.json
```

This is a recommended structure. Adapt it to the existing monorepo.

## Internal feature structure

Example:

```text
features/
└── vendor-discovery/
    ├── components/
    ├── screens/
    ├── hooks/
    ├── services/
    ├── api/
    ├── types/
    ├── utils/
    ├── constants/
    └── __tests__/
```

Rules:

- Features own their business-specific UI and logic.
- Shared components belong in common.
- Shared API infrastructure belongs in core.
- Use TanStack Query for server state.
- Use Zustand for shared client state.
- Avoid circular dependencies.
- Avoid giant global components.
- Avoid unnecessary abstractions.

---

# 7. BRAND IDENTITY AND DESIGN SYSTEM

The application must follow the Telangana Weddings brand identity.

## Visual direction

Combine:

- Traditional Telugu wedding invitation aesthetics.
- Contemporary mobile marketplace usability.
- Warm and premium visual presentation.
- Authentic Telangana cultural references.
- Simple navigation.

The app must feel culturally familiar without sacrificing usability.

## Brand colours

Use these proposed brand tokens:

```text
Royal Crimson: #762B46
Deep Wine:     #542034
Zari Gold:     #C5A46D
Warm Ivory:    #FAF7F2
Sandalwood:    #F4EDE3
Charcoal:      #292524
Emerald:       #047857
Marigold:      #D9894C
```

Use maroon and ivory as dominant colours.

Use gold as a controlled accent.

Avoid excessive gradients, gold borders and decorative elements.

## Typography

- English headings: Sora.
- English body: Inter.
- Telugu headings: Noto Serif Telugu.
- Telugu body: Noto Sans Telugu.

Verify Telugu font rendering on actual Android devices.

Use appropriate fallback fonts.

## UI components

Build reusable components:

- PrimaryButton.
- SecondaryButton.
- AppHeader.
- BottomTabBar.
- SearchBar.
- LocationSelector.
- CategoryCard.
- VendorCard.
- VendorProfileHeader.
- VerifiedBadge.
- PriceLabel.
- RatingDisplay.
- PortfolioGallery.
- FilterSheet.
- EmptyState.
- ErrorState.
- LoadingSkeleton.
- EnquiryForm.
- PhoneNumberInput.
- OTPInput.
- ConfirmationDialog.
- Toast / Feedback.
- SectionHeader.

Use accessible touch targets.

Respect Android safe areas and system navigation.

---

# 8. CUSTOMER APP SCREENS

Design the complete mobile screen hierarchy before implementation.

## A. Welcome and onboarding

Screens:

- Splash screen.
- Welcome screen.
- Language selection.
- Location selection.
- Optional onboarding explanation.

Requirements:

- Telugu and English support.
- Explain the platform simply.
- Allow users to skip non-essential onboarding.
- Do not force login before vendor discovery.
- Provide clear entry into the marketplace.

## B. Home

The home screen should combine wedding storytelling and practical discovery.

Sections:

1. Brand header.
2. Current location.
3. Search vendors.
4. Main wedding banner.
5. Wedding service categories.
6. Popular local vendors.
7. Verified vendors where verification exists.
8. Explore by location.
9. Recently added vendors.
10. Assisted enquiry / call support.
11. Trust and how-it-works information.

The home screen must not become an extremely long decorative landing page.

Prioritize vendor discovery and enquiry conversion.

## C. Explore categories

Requirements:

- Display categories from the backend.
- Support category images and icons.
- Telugu and English category labels.
- Dynamic category pages.
- Search categories.
- Subcategory navigation where applicable.

Do not hardcode category counts.

Use existing backend category taxonomy.

## D. Vendor discovery

Requirements:

- Vendor listing.
- Search.
- Category filters.
- District filters.
- Mandal filters.
- Village filters.
- Price filters.
- Verified-only filter.
- Sorting.
- Pagination or infinite scrolling.

Vendor cards should display available information such as:

- Business name.
- Main category.
- Location.
- Starting price.
- Genuine rating, when available.
- Verification badge, when verified.
- Portfolio preview.

Never invent ratings, reviews, prices or verification.

## E. Vendor details

Create a detailed vendor profile screen.

Sections:

1. Cover image.
2. Business logo/profile image.
3. Business name.
4. Verification status.
5. Category.
6. Location.
7. Description.
8. Services offered.
9. Starting prices.
10. Portfolio gallery.
11. Genuine customer reviews.
12. Service coverage.
13. Contact/enquiry actions.

Primary actions:

- Send Enquiry.
- Request a Call.
- Call Vendor where the public contact number is authorized.
- Save Vendor.
- Share Vendor.

Respect phone visibility rules and backend authorization.

## F. Location discovery

Implement:

- State selection.
- District selection.
- Mandal selection.
- Village/town selection.

Support dependent selection.

Example:

```text
Telangana
  → Narayanpet
     → Narayanpet Mandal
        → Selected Village
```

Use backend location APIs.

Persist the customer's selected location where appropriate.

Allow users to change location at any time.

Do not force GPS access.

Manual location selection must always be available.

## G. Enquiry creation

Build a simple, user-friendly enquiry flow.

Collect:

- Customer name.
- Phone number.
- Service category.
- Requested service.
- Event date.
- Event type.
- District.
- Mandal.
- Village.
- Approximate budget.
- Additional requirements.
- Preferred contact method.

Requirements:

- Validate inputs.
- Support Telugu and English.
- Allow users to understand why information is requested.
- Avoid unnecessarily long forms.
- Support OTP verification where required.
- Submit to NestJS backend.
- Show success confirmation.
- Provide enquiry reference ID.
- Prevent accidental duplicate submissions.

Do not create wedding bookings or formal quotations.

## H. Customer enquiries

Screens:

- Enquiry list.
- Enquiry details.
- Enquiry status.
- Enquiry activity.

Display:

- Enquiry reference.
- Requested service.
- Event date.
- Location.
- Submission date.
- Current status.
- Available contact actions.

Support statuses returned by the backend.

Do not invent a booking or quotation lifecycle.

## I. Saved vendors

Requirements:

- Add favourite.
- Remove favourite.
- List saved vendors.
- Navigate to vendor profile.
- Handle unauthenticated users gracefully.

Use backend APIs for persistent favourites.

## J. Notifications

Support:

- Enquiry confirmation.
- Enquiry status updates.
- Vendor response notifications.
- Important account updates.
- Support updates.

Use Expo Notifications when configured.

Ask permission only when appropriate.

Handle notification deep links safely.

## K. Customer profile

Screens:

- Profile overview.
- Edit profile.
- Contact details.
- Preferred language.
- Selected location.
- Notification preferences.
- Account settings.
- Logout.

## L. Customer support

Support:

- Phone helpline.
- WhatsApp contact where configured.
- Request a callback.
- FAQ.
- How it works.

Support Telugu and English communication.

Do not hardcode phone numbers or WhatsApp links.

Use backend configuration or environment-controlled application settings.

---

# 9. NAVIGATION ARCHITECTURE

Use Expo Router.

Suggested bottom navigation:

1. Home.
2. Explore.
3. Enquiries.
4. Saved.
5. Profile.

Additional routes:

- Vendor details.
- Category details.
- Location selection.
- Search results.
- Enquiry form.
- Enquiry details.
- Notifications.
- Support.
- Settings.

Requirements:

- Correct back navigation.
- Deep links.
- Protected authenticated screens.
- Guest access for public discovery.
- Login redirects for protected actions.
- Preserve user context when navigating to authentication.

Do not create multiple competing navigation systems.

---

# 10. NESTJS BACKEND INTEGRATION

The mobile application must consume the existing NestJS REST API.

Base API:

`/api/v1`

Do not recreate backend business logic in the mobile application.

## API architecture

Create:

- Central API client.
- Request interceptors or equivalent middleware.
- Authentication handling.
- Refresh token management.
- Standard response parsing.
- Error normalization.
- Network error handling.
- API environment configuration.

Use typed API contracts.

If the backend exposes Swagger/OpenAPI, evaluate generating TypeScript API types or a client from the specification.

Avoid duplicating API interfaces manually across applications when a reliable shared contract can be reused.

## Authentication APIs

```text
POST /auth/send-otp
POST /auth/verify-otp
POST /auth/refresh
POST /auth/logout
GET  /auth/me
```

## Public discovery APIs

```text
GET /categories
GET /categories/:slug

GET /vendors
GET /vendors/:slug
GET /vendors/:id/services
GET /vendors/:id/portfolio
GET /vendors/:id/reviews

GET /locations/states
GET /locations/districts
GET /locations/mandals
GET /locations/villages
```

## Customer APIs

```text
GET   /customers/profile
PATCH /customers/profile

GET    /customers/enquiries
GET    /customers/enquiries/:id

GET    /customers/favourites
POST   /customers/favourites
DELETE /customers/favourites/:vendorId
```

## Enquiry APIs

```text
POST /enquiries
GET  /enquiries/:id
GET  /enquiries/:id/status
POST /enquiries/:id/request-call
```

Actual routes must match the implemented backend contracts.

Do not assume an endpoint exists simply because it is listed here.

Identify missing endpoints and document them for backend implementation.

---

# 11. AUTHENTICATION AND SESSION MANAGEMENT

Implement phone OTP authentication.

Flow:

1. Customer enters phone number.
2. App requests OTP.
3. Customer enters OTP.
4. Backend verifies OTP.
5. App receives authentication tokens.
6. Tokens are stored securely.
7. Customer enters the authenticated application.

Requirements:

- OTP input validation.
- Resend cooldown.
- Expired OTP handling.
- Incorrect OTP handling.
- Loading state.
- Network failure handling.
- Refresh token rotation.
- Logout.
- Session expiration handling.

Use Expo SecureStore for sensitive tokens.

Never log OTPs or tokens.

Handle concurrent API requests during token refresh safely.

Do not create infinite refresh loops.

---

# 12. STATE MANAGEMENT

Use TanStack Query for server state.

Examples:

- Vendor lists.
- Categories.
- Locations.
- Vendor details.
- Enquiries.
- Favourites.
- Customer profile.
- Notifications.

Use Zustand for shared client state.

Examples:

- Selected location.
- Selected language.
- Temporary enquiry state.
- UI preferences.

Rules:

- Do not duplicate API data in Zustand.
- Invalidate queries after successful mutations.
- Use pagination correctly.
- Configure sensible cache stale times.
- Handle retries carefully.
- Avoid unnecessary network requests.

---

# 13. OFFLINE AND NETWORK EXPERIENCE

The app must work reasonably well on inconsistent mobile networks.

Implement:

- Loading skeletons.
- Empty states.
- Error states.
- Retry actions.
- Network error messages.
- Image placeholders.
- Cached public discovery data where appropriate.
- Safe form submission retry behavior.

Do not promise offline enquiry submission unless an actual queued submission mechanism exists.

Avoid duplicate enquiries when the network response is uncertain.

Use idempotency support where the backend provides it.

---

# 14. LOCALIZATION

Support:

- Telugu.
- English.

Requirements:

- Translation dictionaries.
- Language selection.
- Persistent language preference.
- Localized labels.
- Localized validation messages.
- Localized empty states.
- Localized notifications where supported.

Use correct Telugu fonts.

Avoid hardcoded English strings inside reusable components.

Do not machine-translate culturally specific content without review.

---

# 15. PERFORMANCE AND ANDROID EXPERIENCE

Optimize for ordinary Android devices and mobile networks.

Requirements:

- Lazy loading.
- FlatList optimization.
- Image resizing.
- Image caching.
- Avoid unnecessary re-renders.
- Avoid excessive animations.
- Keep app startup fast.
- Minimize bundle size.
- Use pagination.
- Avoid oversized image downloads.
- Handle Android back navigation.
- Respect safe areas.
- Handle keyboard behavior correctly.

Use optimized image variants from the backend/CDN.

Do not autoplay large videos on the home screen.

Respect reduced-motion preferences where practical.

---

# 16. SECURITY AND PRIVACY

Implement:

- Secure token storage.
- API authorization handling.
- Input validation.
- Safe deep links.
- Secure logging.
- No hardcoded secrets.
- No exposed AWS credentials.
- Minimal device permissions.
- Safe contact handling.
- User consent where required.
- Sensitive information redaction.

Never rely on the mobile UI to enforce backend authorization.

The NestJS backend remains the authority for:

- User roles.
- Vendor approval.
- Lead visibility.
- Customer contact access.
- Enquiry ownership.
- Payment status.

---

# 17. ACCESSIBILITY AND USABILITY

Design for a broad audience.

Requirements:

- Readable text.
- Clear labels.
- Good contrast.
- Large touch targets.
- Screen-reader labels.
- Keyboard-friendly forms.
- Clear button states.
- Helpful error messages.
- Simple navigation.
- Consistent interaction patterns.

Avoid tiny icons without labels for critical actions.

Do not make essential features dependent only on color.

---

# 18. TESTING

Write tests for:

## Authentication

- OTP request.
- OTP verification.
- Invalid OTP.
- Expired OTP.
- Refresh token.
- Logout.

## Vendor discovery

- Category filtering.
- Location filtering.
- Search.
- Pagination.
- Empty results.
- API failure.

## Vendor profiles

- Profile loading.
- Portfolio loading.
- Missing information.
- Contact actions.
- Favourite action.

## Enquiries

- Form validation.
- Successful submission.
- Duplicate prevention.
- Network interruption.
- Enquiry details.
- Status display.

## Favourites

- Add.
- Remove.
- Persistence.
- Unauthenticated access.

## Navigation

- Protected routes.
- Guest routes.
- Authentication redirect.
- Deep links.
- Android back navigation.

Use Jest and React Native Testing Library.

Test important flows on actual Android devices or emulators.

---

# 19. DOCUMENTATION

Create:

```text
docs/mobile/
├── MOBILE_AUDIT.md
├── MOBILE_ARCHITECTURE.md
├── NAVIGATION.md
├── DESIGN_SYSTEM.md
├── API_INTEGRATION.md
├── AUTHENTICATION.md
├── LOCALIZATION.md
├── TESTING.md
└── ANDROID_RELEASE.md
```

Include:

- Folder architecture.
- Feature responsibilities.
- Navigation flow.
- API integration.
- Authentication flow.
- State management.
- Design tokens.
- Testing procedures.
- Android build instructions.

Keep documentation aligned with actual implementation.

---

# 20. IMPLEMENTATION PHASES

## Phase 0 — Repository audit and planning

- Inspect existing repository.
- Review backend API contracts.
- Review existing web design.
- Review brand identity.
- Identify reusable assets.
- Define mobile feature architecture.
- Define navigation.
- Create screen inventory.
- Identify missing backend APIs.

Deliverable: Mobile architecture approval.

## Phase 1 — UI/UX foundation

- Define mobile design tokens.
- Configure fonts.
- Build reusable components.
- Configure Expo Router.
- Implement theme.
- Implement localization.
- Build loading and empty states.

Deliverable: Mobile design system.

## Phase 2 — App foundation

- Configure Expo.
- Set up TypeScript.
- Configure API client.
- Configure TanStack Query.
- Configure Zustand.
- Configure SecureStore.
- Configure environment settings.

Deliverable: Working mobile foundation.

## Phase 3 — Authentication and onboarding

- Welcome.
- Language selection.
- Location selection.
- OTP login.
- Session management.
- Customer profile setup.

Deliverable: Authentication flow.

## Phase 4 — Customer discovery

- Home screen.
- Categories.
- Location discovery.
- Vendor search.
- Filters.
- Vendor profiles.
- Portfolio.

Deliverable: Vendor discovery experience.

## Phase 5 — Customer engagement

- Enquiry creation.
- Assisted call request.
- Enquiry history.
- Enquiry details.
- Favourites.
- Customer profile.

Deliverable: Complete customer marketplace journey.

## Phase 6 — Notifications and support

- In-app notifications.
- Push notifications.
- Deep links.
- Phone support.
- WhatsApp support.
- FAQ.

Deliverable: Customer engagement features.

## Phase 7 — Quality and Android release

- Functional testing.
- UI testing.
- API testing.
- Performance optimization.
- Security review.
- Android permissions review.
- EAS configuration.
- APK testing.
- AAB production build preparation.

Deliverable: Android release-ready application.

---

# 21. DEVELOPMENT RULES

1. Inspect before modifying.
2. Plan before coding.
3. Follow feature-based architecture.
4. Use strict TypeScript.
5. Use Expo Router.
6. Use TanStack Query for server state.
7. Use Zustand for shared client state only.
8. Use SecureStore for sensitive tokens.
9. Keep business logic in the backend.
10. Reuse existing API contracts.
11. Do not duplicate backend business logic.
12. Do not hardcode vendor categories or locations.
13. Do not invent ratings or verification.
14. Do not force login for public discovery.
15. Do not add out-of-scope booking features.
16. Keep UI components reusable.
17. Optimize for Android devices.
18. Support Telugu and English.
19. Write tests for critical user journeys.
20. Preserve existing repository architecture.
21. Keep documentation updated.
22. Report actual testing and build status honestly.

---

# 22. FIRST RESPONSE REQUIRED FROM THE AI AGENT

When this prompt is provided, do not immediately generate the application.

First:

1. Audit the existing repository.
2. Identify whether a mobile app already exists.
3. Review the NestJS API contracts.
4. Identify missing mobile APIs.
5. Present the feature-based folder architecture.
6. Present the navigation structure.
7. Prepare a complete screen inventory.
8. Define the mobile design system.
9. Define authentication and state management.
10. Map screens to backend APIs.
11. Identify technical risks.
12. Provide implementation phases.

Clearly separate:

- Already implemented.
- Missing.
- Reusable.
- Recommended.
- Requires approval.

Do not modify files during the initial audit unless explicitly requested.

Wait for approval before Phase 1 implementation.

---

# FINAL PRODUCT PRINCIPLE

Build Telangana Weddings as an accessible, culturally authentic and reliable Android marketplace for wedding families.

The customer must be able to:

1. Discover wedding services.
2. Find vendors near their village or town.
3. Understand vendor services and pricing.
4. View authentic vendor portfolios.
5. Submit enquiries easily.
6. Contact suitable vendors.
7. Track their enquiries.

Prioritize discovery, simplicity, trust, local relevance and enquiry conversion.

Do not turn the MVP into a complicated wedding management application.

**A beautiful wedding experience. A simple discovery journey. A reliable connection between families and local vendors.**

