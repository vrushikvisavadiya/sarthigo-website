# Submissions System Setup Guide

## Overview

The submissions system has been successfully integrated into the Sarthi Go application. This guide will help you access and use the admin submissions page.

## 🔐 Authentication Required

The submissions endpoints require **admin role** authentication. You need to login with an admin account to access the submissions page.

### Default Admin Credentials

The backend seed file creates a superadmin user with the following credentials:

```
Email: superadmin@sarthi.com
Password: SuperAdmin@123
```

**⚠️ IMPORTANT:** Change this password after first login!

## 📋 How to Access Submissions Page

### Step 1: Login as Admin

1. Navigate to the login page: `http://localhost:3000/login`
2. Enter the superadmin credentials:
   - Email: `superadmin@sarthi.com`
   - Password: `SuperAdmin@123`
3. Click "Login"

### Step 2: Access Admin Dashboard

After successful login, you'll be redirected to the admin dashboard.

### Step 3: Navigate to Submissions

1. Go to: `http://localhost:3000/admin/submissions`
2. You should now see the submissions page with all form submissions

## 🎯 Features Available

### 1. **Statistics Dashboard**

- Total Submissions
- Pending Count
- Reviewed Count
- Contacted Count
- Resolved Count
- Driver Registrations Count
- Contact Forms Count
- Bookings Count

### 2. **Filters**

- **Type Filter:** All Types, Driver Registrations, Contact Forms, Bookings
- **Status Filter:** All Status, Pending, Reviewed, Contacted, Resolved, Rejected
- **Export CSV:** Download submissions data

### 3. **Data Table**

Displays all submissions with:

- Type badge
- Name
- Contact information (phone & email)
- Details (varies by submission type)
- Submission date & time
- Status badge
- Action buttons

### 4. **Actions**

#### For Pending Submissions:

- **👁️ View:** Opens detailed modal
- **👁️ Mark as Reviewed:** Changes status to reviewed
- **📞 Mark as Contacted:** Changes status to contacted
- **🗑️ Delete:** Removes submission (with confirmation)

#### For Reviewed/Contacted Submissions:

- **👁️ View:** Opens detailed modal
- **✅ Mark as Resolved:** Changes status to resolved
- **❌ Mark as Rejected:** Changes status to rejected
- **🗑️ Delete:** Removes submission (with confirmation)

### 5. **Submission Details Modal**

- Shows all submission data
- Displays current status
- Context-aware action buttons
- Delete option

## 🔄 Submission Status Flow

```
Pending → Reviewed → Resolved
       ↘ Contacted ↗
       ↘ Rejected
```

## 📊 Submission Types

### 1. **Driver Registration**

Fields displayed:

- Name, Phone, Email
- City
- Vehicle Model
- Experience
- Vehicle Type
- Vehicle Number

### 2. **Contact Form**

Fields displayed:

- Name, Phone, Email
- Subject
- Message

### 3. **Booking**

Fields displayed:

- Name, Phone, Email
- Pickup Location
- Drop Location
- Vehicle Type
- Pickup Date & Time
- Number of Passengers

## 🛠️ Technical Details

### API Endpoints Used

All endpoints require JWT authentication with admin role:

```typescript
GET    /api/submissions              // Get all submissions (with filters)
GET    /api/submissions/:id          // Get single submission
PATCH  /api/submissions/:id          // Update submission status
DELETE /api/submissions/:id          // Delete submission
GET    /api/submissions/stats        // Get statistics
```

### Frontend Service

Located at: `src/services/submissions.service.ts`

React Query Hooks:

- `useSubmissions(params)` - Fetch submissions with filters
- `useSubmission(id)` - Fetch single submission
- `useUpdateSubmission()` - Update submission
- `useDeleteSubmission()` - Delete submission

### Admin Page

Located at: `src/app/(dashboard)/admin/submissions/page.tsx`

Features:

- Real-time data fetching with React Query
- Loading states
- Error handling
- Toast notifications
- Optimistic updates
- Automatic cache invalidation

## 🚨 Troubleshooting

### 403 Forbidden Error

**Problem:** Getting "Access denied. Required roles: admin" error

**Solution:**

1. Make sure you're logged in
2. Verify you're using an admin account (superadmin@sarthi.com)
3. Check if JWT token is present in localStorage (key: `sarthi_access_token`)
4. Try logging out and logging in again

### No Data Showing

**Problem:** Submissions page shows "No submissions found"

**Solution:**

1. Check if backend is running on `http://localhost:3001`
2. Verify database has submissions data
3. Try creating a test submission via the Book Now page
4. Check browser console for API errors

### Backend Not Running

**Problem:** Cannot connect to API

**Solution:**

```bash
cd /Users/vrushik/Projects/work/sarthi-go-backend
npm run start:dev
```

## 📝 Creating Test Submissions

### Via Book Now Page

1. Navigate to: `http://localhost:3000/book`
2. Fill in the booking form
3. Submit the form
4. Check admin submissions page

### Via API (Postman/cURL)

```bash
curl -X POST http://localhost:3001/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "booking",
    "data": {
      "name": "Test User",
      "phone": "+919876543210",
      "email": "test@example.com",
      "pickupLocation": "Ahmedabad",
      "dropLocation": "Somnath",
      "vehicleType": "SUV",
      "pickupDate": "2025-04-01",
      "pickupTime": "10:00",
      "passengers": 4
    }
  }'
```

## 🔒 Security Notes

1. **JWT Authentication:** All admin endpoints require valid JWT token
2. **Role-Based Access:** Only users with 'admin' role can access submissions
3. **Token Storage:** Tokens stored in localStorage with keys:
   - `sarthi_access_token`
   - `sarthi_refresh_token`
4. **Auto Logout:** Invalid/expired tokens trigger automatic logout

## 📚 Related Files

### Frontend

- `src/app/(dashboard)/admin/submissions/page.tsx` - Admin submissions page
- `src/services/submissions.service.ts` - API service & React Query hooks
- `src/lib/axios/axios-config.ts` - Axios configuration with auth
- `src/config/endpoints.ts` - API endpoint definitions

### Backend

- `src/modules/submissions/submissions.controller.ts` - API controller
- `src/modules/submissions/submissions.service.ts` - Business logic
- `src/modules/submissions/dto/` - Data transfer objects
- `prisma/schema/submission.prisma` - Database schema

## ✅ Verification Checklist

- [ ] Backend server is running
- [ ] Database migrations are applied
- [ ] Seed data is created (superadmin user exists)
- [ ] Logged in as admin user
- [ ] Can access `/admin/submissions` page
- [ ] Can see submissions list
- [ ] Can filter submissions
- [ ] Can update submission status
- [ ] Can delete submissions
- [ ] Can view submission details

## 🎉 Success!

If you can access the submissions page and see the data table, the integration is complete and working correctly!

For any issues, check the browser console and backend logs for detailed error messages.
