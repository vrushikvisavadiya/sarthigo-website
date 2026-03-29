# Package Management System Documentation

## Overview

This document provides comprehensive documentation for the Package Management System implemented in the Sarthi Go application. The system allows super admins to create and manage tour packages, and owners to subscribe to these packages for their business.

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [API Endpoints](#api-endpoints)
4. [Frontend Components](#frontend-components)
5. [User Roles](#user-roles)
6. [Workflows](#workflows)
7. [Database Schema](#database-schema)
8. [Installation & Setup](#installation--setup)

---

## Architecture

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **State Management**: TanStack Query (React Query)
- **UI Components**: Shadcn/ui, Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

### Project Structure

```
src/
├── app/
│   └── (dashboard)/
│       ├── admin/
│       │   ├── packages/page.tsx          # Admin package management
│       │   └── subscriptions/page.tsx     # Admin subscription approvals
│       └── owner/
│           ├── page.tsx                   # Owner dashboard
│           └── packages/page.tsx          # Owner package browsing
├── components/
│   ├── admin/
│   │   ├── package-form.tsx              # Package create/edit form
│   │   └── package-details.tsx           # Package details view
│   └── owner/
│       └── subscription-form.tsx         # Subscription request form
├── services/
│   ├── packages.service.ts               # Package API hooks
│   └── cities.service.ts                 # Cities API hooks
├── types/
│   └── package.types.ts                  # TypeScript interfaces
└── config/
    └── endpoints.ts                      # API endpoint definitions
```

---

## Features

### Super Admin Features

1. **Package Management**
   - Create new tour packages
   - Edit existing packages
   - Delete packages
   - Toggle package active/inactive status
   - Set package pricing and details
   - Manage package highlights, inclusions, and exclusions
   - Create detailed itineraries
   - Add package images
   - Mark packages as Premium or Popular
   - Add custom badges

2. **Subscription Management**
   - View all subscription requests
   - Approve pending subscriptions
   - Reject subscription requests
   - Monitor active subscriptions
   - Track subscription payments
   - View subscription analytics

3. **City Management**
   - Create and manage cities
   - Associate packages with cities
   - Toggle city active status

### Owner Features

1. **Package Browsing**
   - Browse available packages
   - Filter by city
   - Search packages
   - View detailed package information
   - See package pricing and duration

2. **Subscription Management**
   - Subscribe to packages
   - Set subscription period
   - View pending subscriptions
   - Monitor active subscriptions
   - Track subscription status
   - View subscription history

3. **Dashboard**
   - View active package count
   - See pending approvals
   - Track total investment
   - Monitor verification status
   - Quick access to packages

---

## API Endpoints

### Package Endpoints

```typescript
// List all packages
GET /api/packages
Query params: cityId, minPrice, maxPrice, minDuration, maxDuration, isPremium, isPopular, isActive

// Get single package
GET /api/packages/:id

// Create package (Admin only)
POST /api/packages
Body: CreatePackageDto

// Update package (Admin only)
PATCH /api/packages/:id
Body: UpdatePackageDto

// Delete package (Admin only)
DELETE /api/packages/:id

// Toggle package active status (Admin only)
PATCH /api/packages/:id/toggle-active
```

### Subscription Endpoints

```typescript
// List all subscriptions (Admin)
GET /api/owner-subscriptions

// Get owner's subscriptions
GET /api/owner-subscriptions/me

// Get subscriptions by owner ID
GET /api/owner-subscriptions?ownerId=:ownerId

// Get single subscription
GET /api/owner-subscriptions/:id

// Create subscription (Owner)
POST /api/owner-subscriptions
Body: CreateSubscriptionDto

// Update subscription (Admin/Owner)
PATCH /api/owner-subscriptions/:id
Body: UpdateSubscriptionDto

// Cancel subscription (Owner)
PATCH /api/owner-subscriptions/:id/cancel

// Approve subscription (Admin)
PATCH /api/owner-subscriptions/:id/approve

// Reject subscription (Admin)
PATCH /api/owner-subscriptions/:id/reject
```

---

## Frontend Components

### Admin Components

#### PackageForm Component

**Location**: `src/components/admin/package-form.tsx`

**Purpose**: Create and edit packages

**Features**:

- Form validation with Zod
- Dynamic field arrays for highlights, inclusions, exclusions
- Image URL management
- City selection
- Premium/Popular toggles
- Custom badge input
- Itinerary builder

**Props**:

```typescript
interface PackageFormProps {
  package?: Package; // Optional for edit mode
  cities: City[]; // Available cities
  onSuccess: () => void; // Success callback
}
```

#### PackageDetails Component

**Location**: `src/components/admin/package-details.tsx`

**Purpose**: Display comprehensive package information

**Features**:

- Package metadata display
- Highlights and inclusions list
- Exclusions list
- Detailed itinerary view
- Image gallery
- Status badges

### Owner Components

#### SubscriptionForm Component

**Location**: `src/components/owner/subscription-form.tsx`

**Purpose**: Request package subscription

**Features**:

- Package summary display
- Date range selection
- Terms and conditions
- Price calculation
- Validation

**Props**:

```typescript
interface SubscriptionFormProps {
  package: Package; // Package to subscribe to
  onSuccess: () => void; // Success callback
}
```

---

## User Roles

### Super Admin

- Full access to all features
- Can create, edit, delete packages
- Can approve/reject subscriptions
- Can manage cities and settings
- Access to analytics

### Owner

- Can browse packages
- Can subscribe to packages
- Can manage their subscriptions
- Can view their drivers and vehicles
- Limited to their own data

### Driver

- No package management access
- Can view assigned trips
- Can manage profile

---

## Workflows

### Package Creation Workflow (Admin)

1. Admin navigates to `/admin/packages`
2. Clicks "Create Package" button
3. Fills out package form:
   - Basic information (name, description, city)
   - Duration and pricing
   - Highlights and inclusions
   - Exclusions (optional)
   - Itinerary (optional)
   - Images (optional)
   - Tags and badges
4. Submits form
5. Package is created and appears in list
6. Package is available for owners to subscribe

### Subscription Request Workflow (Owner)

1. Owner navigates to `/owner/packages`
2. Browses available packages
3. Filters by city or searches
4. Views package details
5. Clicks "Subscribe" button
6. Fills subscription form:
   - Reviews package details
   - Selects subscription period
   - Reviews terms
7. Submits request
8. Subscription status: **Pending**
9. Owner sees pending subscription on dashboard

### Subscription Approval Workflow (Admin)

1. Admin navigates to `/admin/subscriptions`
2. Views pending subscriptions
3. Reviews subscription details
4. Options:
   - **Approve**: Subscription becomes active
   - **Reject**: Subscription is cancelled
5. Owner is notified of decision
6. If approved, owner can offer package to customers

---

## Database Schema

### Package Table

```typescript
interface Package {
  id: string;
  name: string;
  description: string;
  cityId: string;
  city?: City;
  duration: number; // in days
  nights: number;
  basePrice: number;
  maxPassengers: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  isActive: boolean;
  isPremium: boolean;
  isPopular: boolean;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}
```

### OwnerPackageSubscription Table

```typescript
interface OwnerPackageSubscription {
  id: string;
  ownerId: string;
  packageId: string;
  package: Package;
  status: "pending" | "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  price: number;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
}
```

### City Table

```typescript
interface City {
  id: string;
  name: string;
  slug: string;
  state?: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- Backend API running
- Database configured

### Frontend Setup

1. **Install Dependencies**

```bash
npm install
```

2. **Environment Variables**
   Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. **Run Development Server**

```bash
npm run dev
```

4. **Access Application**

- Admin: `http://localhost:3000/admin/packages`
- Owner: `http://localhost:3000/owner/packages`

### Backend Requirements

The backend API should implement the following endpoints:

1. **Package Management**
   - CRUD operations for packages
   - Package filtering and search
   - Toggle active status

2. **Subscription Management**
   - CRUD operations for subscriptions
   - Approval/rejection workflow
   - Status updates

3. **City Management**
   - CRUD operations for cities
   - Active/inactive toggle

4. **Authentication**
   - JWT-based authentication
   - Role-based access control
   - Token refresh mechanism

---

## Usage Examples

### Creating a Package (Admin)

```typescript
// Using the service hook
const createPackage = useCreatePackage();

const handleCreate = async () => {
  await createPackage.mutateAsync({
    name: "Somnath Darshan Day Trip",
    description: "Visit the famous Somnath Temple",
    cityId: "city-id-123",
    duration: 1,
    nights: 0,
    basePrice: 999,
    maxPassengers: 4,
    highlights: [
      "Somnath Jyotirlinga Temple",
      "Bhalka Tirth",
      "Triveni Sangam",
    ],
    inclusions: ["AC taxi for full day", "Verified local driver"],
    exclusions: ["Food", "Entry tickets"],
    itinerary: [],
    images: [],
    isPremium: false,
    isPopular: true,
    badge: "Best Value",
  });
};
```

### Subscribing to a Package (Owner)

```typescript
// Using the service hook
const createSubscription = useCreateSubscription();

const handleSubscribe = async () => {
  await createSubscription.mutateAsync({
    packageId: "package-id-123",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
  });
};
```

### Approving a Subscription (Admin)

```typescript
// Using the service hook
const updateSubscription = useUpdateSubscription(subscriptionId);

const handleApprove = async () => {
  await updateSubscription.mutateAsync({
    status: "active",
  });
};
```

---

## Best Practices

### For Admins

1. **Package Creation**
   - Use clear, descriptive names
   - Provide detailed descriptions
   - Add comprehensive highlights
   - Include all inclusions and exclusions
   - Set realistic pricing
   - Add high-quality images

2. **Subscription Management**
   - Review subscriptions promptly
   - Verify payment status before approval
   - Communicate rejection reasons
   - Monitor active subscriptions

### For Owners

1. **Package Selection**
   - Review package details carefully
   - Check inclusions and exclusions
   - Verify pricing and duration
   - Read terms and conditions
   - Choose appropriate subscription period

2. **Subscription Management**
   - Keep track of expiry dates
   - Renew subscriptions in advance
   - Monitor subscription status
   - Report issues promptly

---

## Troubleshooting

### Common Issues

1. **Package Not Appearing**
   - Check if package is active
   - Verify city is active
   - Clear cache and refresh

2. **Subscription Request Failed**
   - Verify package is active
   - Check date range validity
   - Ensure no duplicate subscription
   - Verify owner account status

3. **Approval Not Working**
   - Check admin permissions
   - Verify subscription status
   - Check payment status
   - Review backend logs

---

## Future Enhancements

1. **Payment Integration**
   - Online payment gateway
   - Payment tracking
   - Invoice generation

2. **Advanced Features**
   - Package recommendations
   - Seasonal pricing
   - Bulk subscriptions
   - Package bundles

3. **Analytics**
   - Subscription trends
   - Popular packages
   - Revenue reports
   - Owner performance

4. **Notifications**
   - Email notifications
   - SMS alerts
   - In-app notifications
   - Subscription reminders

---

## Support

For issues or questions:

- Check this documentation
- Review code comments
- Contact development team
- Submit GitHub issues

---

## License

This package management system is part of the Sarthi Go application.

---

**Last Updated**: March 29, 2026
**Version**: 1.0.0
