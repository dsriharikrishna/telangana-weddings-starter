# API Contract & Integration Specification

> **Base URL**: `http://localhost:3002/api/v1` (Docker: `backend:3002`)  
> **Interactive Swagger UI**: `http://localhost:3002/api/v1/docs`  
> **OpenAPI JSON Spec**: `http://localhost:3002/api/v1/docs-json`  
> **Auth Strategy**: Bearer JWT (`Authorization: Bearer <accessToken>`)  
> **Standard Response Envelope**: `{ "success": boolean, "message": string, "data": T, "meta": null | object }`

---

## 1. Domain Coverage Matrix (25 Endpoints)

| Feature Domain | Method | Endpoint Path | Auth Required | Consumers |
| :--- | :--- | :--- | :--- | :--- |
| **System** | `GET` | `/health` | Public | DevOps, Smoke, Monitoring |
| **Auth & Identity** | `POST` | `/auth/send-otp` | Public | Web, App, Admin |
| | `POST` | `/auth/verify-otp` | Public | Web, App, Admin |
| | `POST` | `/auth/refresh` | Public | Web, App, Admin (Token Rotator) |
| | `POST` | `/auth/switch-role` | `CUSTOMER` / `VENDOR` | Web, App |
| | `GET` | `/auth/me` | Authenticated | Web, App, Admin |
| **Customer** | `GET` | `/customers/profile` | `CUSTOMER` | Web, App |
| | `PATCH` | `/customers/profile` | `CUSTOMER` | Web, App |
| **Taxonomy** | `GET` | `/categories` | Public | Web, App, Admin |
| | `GET` | `/categories/{slug}` | Public | Web, App |
| **Locations** | `GET` | `/locations/districts` | Public | Web, App, Admin |
| | `GET` | `/locations/districts/{districtId}/mandals`| Public | Web, App, Admin |
| | `GET` | `/locations/mandals/{mandalId}/villages` | Public | Web, App, Admin |
| | `GET` | `/locations/search` | Public | Web, App |
| **Vendor Discovery**| `GET` | `/vendors` | Public | Web, App, Admin |
| | `GET` | `/vendors/{slug}` | Public | Web, App |
| | `POST` | `/vendors/register` | Authenticated | Web, App |
| **Enquiries** | `POST` | `/enquiries` | Optional Auth | Web, App |
| | `POST` | `/enquiries/request-call` | Public | Web, App (Concierge) |
| | `GET` | `/enquiries/my` | `CUSTOMER` | Web, App |
| **Lead Management**| `GET` | `/vendor/leads` | `VENDOR_OWNER` | Web, App (Vendor Dashboard) |
| | `POST` | `/vendor/leads/{assignmentId}/unlock` | `VENDOR_OWNER` | Web, App (Vendor Dashboard) |
| **Admin Operations**| `GET` | `/admin/metrics` | `ADMIN` / `SUPER_ADMIN` | Admin Portal |
| | `GET` | `/admin/vendors` | `ADMIN` / `SUPER_ADMIN` | Admin Portal |
| | `PATCH`| `/admin/vendors/{id}/verification` | `ADMIN` / `SUPER_ADMIN` | Admin Portal |
| | `PATCH`| `/admin/vendors/{id}/credits` | `ADMIN` / `SUPER_ADMIN` | Admin Portal |

---

## 2. Detailed API Specifications by Consumer

### 2.1 Public & Customer Web / Mobile App

#### `POST /auth/send-otp`
- **Request Body**:
  ```json
  {
    "phone": "+919876543210"
  }
  ```
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully to your mobile number",
    "data": {
      "phone": "+919876543210",
      "isDevMock": true
    }
  }
  ```

#### `POST /auth/verify-otp`
- **Request Body**:
  ```json
  {
    "phone": "+919876543210",
    "otp": "123456",
    "role": "CUSTOMER",
    "fullName": "Anand Reddy"
  }
  ```
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "message": "Authentication successful",
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "user": {
        "id": "usr_abc123",
        "phone": "+919876543210",
        "fullName": "Anand Reddy",
        "activeRole": "CUSTOMER",
        "roles": ["CUSTOMER"]
      }
    }
  }
  ```

#### `GET /categories`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "message": "Success",
    "data": [
      {
        "id": "cat_photo",
        "slug": "traditional-photography",
        "nameEn": "Traditional Photography & Video",
        "nameTe": "సాంప్రదాయ ఫోటోగ్రఫీ & వీడియోగ్రఫీ",
        "sortOrder": 1,
        "isActive": true
      }
    ]
  }
  ```

#### `GET /locations/districts` & `GET /locations/search?q=Narayanpet`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "dist_narayanpet",
        "nameEn": "Narayanpet",
        "nameTe": "నారాయణపేట",
        "code": "NPT",
        "sortOrder": 1
      }
    ]
  }
  ```

#### `GET /vendors?district=Narayanpet&category=cat_photo&page=1&limit=20`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": "vnd_123",
          "slug": "sri-venkateshwara-studios",
          "businessName": "Sri Venkateshwara Digital Studios",
          "startingPrice": 25000,
          "ratingAvg": 4.8,
          "reviewsCount": 24,
          "baseDistrict": "Narayanpet",
          "baseMandal": "Makthal",
          "verificationStatus": "VERIFIED"
        }
      ],
      "pagination": { "page": 1, "limit": 20, "total": 1, "totalPages": 1 }
    }
  }
  ```

#### `POST /enquiries`
- **Request Body**:
  ```json
  {
    "customerName": "Kavitha Reddy",
    "customerPhone": "+919988776655",
    "categorySlug": "traditional-photography",
    "eventDate": "2026-12-25T00:00:00.000Z",
    "district": "Narayanpet",
    "mandal": "Makthal",
    "villageOrTown": "Station Road",
    "budget": 50000,
    "notes": "Require traditional wedding photography and candid videography."
  }
  ```
- **Response** `201 Created`:
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully",
    "data": {
      "id": "enq_123",
      "referenceNumber": "ENQ-964061-9066",
      "status": "NEW"
    }
  }
  ```

#### `POST /enquiries/request-call` (Assisted Concierge)
- **Request Body**:
  ```json
  {
    "customerName": "Ramanaiah Garu",
    "customerPhone": "+919848022338",
    "district": "Mahabubnagar",
    "categorySlug": "traditional-photography",
    "notes": "Elderly assisted request: Need guidance booking venue and purohit."
  }
  ```
- **Response** `201 Created`:
  ```json
  {
    "success": true,
    "message": "Callback request registered. A local wedding coordinator will reach out shortly.",
    "data": {
      "referenceNumber": "ENQ-837114-9999"
    }
  }
  ```

---

### 2.2 Vendor Flow (Lead Inbox & Monetization)

#### `GET /vendor/leads`
- **Headers**: `Authorization: Bearer <VENDOR_TOKEN>`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "data": {
      "walletBalance": 5,
      "leads": [
        {
          "assignmentId": "asg_789",
          "status": "ASSIGNED",
          "categorySlug": "traditional-photography",
          "district": "Narayanpet",
          "mandal": "Makthal",
          "villageOrTown": "Station Road",
          "eventDate": "2026-12-25T00:00:00.000Z",
          "budgetPaise": 5000000,
          "isUnlocked": false,
          "customerName": "Ka***",
          "customerPhone": "+9199*****"
        }
      ]
    }
  }
  ```

#### `POST /vendor/leads/{assignmentId}/unlock`
- **Headers**: `Authorization: Bearer <VENDOR_TOKEN>`
- **Behavior**: Atomically deducts 1 credit from vendor wallet and unmasks full customer phone and name.
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "message": "Lead unlocked successfully. 1 credit deducted.",
    "data": {
      "assignmentId": "asg_789",
      "status": "UNLOCKED",
      "unlockedAt": "2026-11-12T07:15:00.000Z",
      "remainingCredits": 4,
      "lead": {
        "customerName": "Kavitha Reddy",
        "customerPhone": "+919988776655"
      }
    }
  }
  ```

---

### 2.3 Admin Portal (Operations & Backoffice)

#### `GET /admin/metrics`
- **Headers**: `Authorization: Bearer <ADMIN_TOKEN>`
- **Response** `200 OK`: Total vendors, pending verifications, active enquiries, leads generated, and credits distributed.

#### `PATCH /admin/vendors/{id}/verification`
- **Request Body**:
  ```json
  {
    "status": "VERIFIED",
    "notes": "Aadhaar and business storefront verified on-site by field agent."
  }
  ```

#### `PATCH /admin/vendors/{id}/credits`
- **Request Body**:
  ```json
  {
    "amount": 10,
    "reason": "Town launch starter promotion bonus"
  }
  ```

---

## 3. Frontend Client Integration Architecture

To ensure clean code without direct fetch calls scattered in React components, create unified typed API clients:

```
packages / shared client:
  ├── src/api/client.ts        # Axios/Fetch wrapper with JWT auto-refresh interceptor
  ├── src/api/auth.ts          # sendOtp, verifyOtp, switchRole, me
  ├── src/api/categories.ts    # getCategories, getCategoryBySlug
  ├── src/api/locations.ts     # getDistricts, getMandals, searchLocations
  ├── src/api/vendors.ts       # getVendors, getVendorBySlug, registerVendor
  ├── src/api/enquiries.ts     # submitEnquiry, requestCall, getMyEnquiries
  ├── src/api/leads.ts         # getVendorLeads, unlockLead
  └── src/api/admin.ts         # getMetrics, getAdminVendors, verifyVendor, grantCredits
```

