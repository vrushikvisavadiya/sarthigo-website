/**
 * API Endpoints Configuration
 *
 * This file contains all API endpoint definitions for the Sarthi Go application.
 * Endpoints are organized by feature/module for better maintainability.
 */

// Base API URL - should be moved to environment variables in production
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Authentication Endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",
  REFRESH_TOKEN: "/auth/refresh",
} as const;

/**
 * User Management Endpoints
 */
export const USER_ENDPOINTS = {
  LIST: "/users",
  GET: (id: string) => `/users/${id}`,
  CREATE: "/users",
  UPDATE: (id: string) => `/users/${id}`,
  DELETE: (id: string) => `/users/${id}`,
} as const;

/**
 * Role Management Endpoints
 */
export const ROLE_ENDPOINTS = {
  LIST: "/roles",
  GET: (id: string) => `/roles/${id}`,
  CREATE: "/roles",
  UPDATE: (id: string) => `/roles/${id}`,
  DELETE: (id: string) => `/roles/${id}`,
} as const;

/**
 * Permission Management Endpoints
 */
export const PERMISSION_ENDPOINTS = {
  LIST: "/roles/permissions/all",
  GET: (id: string) => `/roles/permissions/${id}`,
  CREATE: "/roles/permissions",
  DELETE: (id: string) => `/roles/permissions/${id}`,
} as const;

/**
 * Owner Management Endpoints
 */
export const OWNER_ENDPOINTS = {
  LIST: "/owners",
  DETAIL: (id: string) => `/owners/${id}`,
  ME: "/owners/me",
  CREATE: "/owners",
  UPDATE: (id: string) => `/owners/${id}`,
  DELETE: (id: string) => `/owners/${id}`,
  HARD_DELETE: (id: string) => `/owners/${id}/hard-delete`,
  VERIFY: (id: string) => `/owners/${id}/verify`,
  TOGGLE_ACTIVE: (id: string) => `/owners/${id}/toggle-active`,
  DRIVERS: (id: string) => `/owners/${id}/drivers`,
  CARS: (id: string) => `/owners/${id}/cars`,
} as const;

/**
 * Driver Management Endpoints
 */
export const DRIVER_ENDPOINTS = {
  LIST: "/drivers",
  DETAIL: (id: string) => `/drivers/${id}`,
  BY_OWNER: (ownerId: string) => `/drivers/owner/${ownerId}`,
  CREATE: "/drivers",
  UPDATE: (id: string) => `/drivers/${id}`,
  DELETE: (id: string) => `/drivers/${id}`,
  HARD_DELETE: (id: string) => `/drivers/${id}/hard-delete`,
  VERIFY: (id: string) => `/drivers/${id}/verify`,
  TOGGLE_ACTIVE: (id: string) => `/drivers/${id}/toggle-active`,
} as const;

/**
 * Car Management Endpoints
 */
export const CAR_ENDPOINTS = {
  LIST: "/cars",
  DETAIL: (id: string) => `/cars/${id}`,
  BY_OWNER: (ownerId: string) => `/cars/owner/${ownerId}`,
  CREATE: "/cars",
  UPDATE: (id: string) => `/cars/${id}`,
  DELETE: (id: string) => `/cars/${id}`,
  HARD_DELETE: (id: string) => `/cars/${id}/hard-delete`,
  VERIFY: (id: string) => `/cars/${id}/verify`,
  TOGGLE_ACTIVE: (id: string) => `/cars/${id}/toggle-active`,
} as const;

/**
 * Vehicle Type Management Endpoints
 */
export const VEHICLE_TYPE_ENDPOINTS = {
  LIST: "/vehicle-types",
  ACTIVE: "/vehicle-types/active",
  DETAIL: (id: string) => `/vehicle-types/${id}`,
  CREATE: "/vehicle-types",
  UPDATE: (id: string) => `/vehicle-types/${id}`,
  DELETE: (id: string) => `/vehicle-types/${id}`,
  TOGGLE_ACTIVE: (id: string) => `/vehicle-types/${id}/toggle-active`,
} as const;

/**
 * City Management Endpoints
 */
export const CITY_ENDPOINTS = {
  LIST: "/cities",
  DETAIL: (id: string) => `/cities/${id}`,
  GET: (id: string) => `/cities/${id}`,
  CREATE: "/cities",
  UPDATE: (id: string) => `/cities/${id}`,
  DELETE: (id: string) => `/cities/${id}`,
  TOGGLE_ACTIVE: (id: string) => `/cities/${id}/toggle-active`,
} as const;

/**
 * Package Management Endpoints
 */
export const PACKAGE_ENDPOINTS = {
  LIST: "/packages",
  GET: (id: string) => `/packages/${id}`,
  CREATE: "/packages",
  UPDATE: (id: string) => `/packages/${id}`,
  DELETE: (id: string) => `/packages/${id}`,
  TOGGLE_ACTIVE: (id: string) => `/packages/${id}/toggle-active`,
} as const;

/**
 * Owner Package Subscription Endpoints
 */
export const SUBSCRIPTION_ENDPOINTS = {
  LIST: "/owner-subscriptions",
  MY_SUBSCRIPTIONS: "/owner-subscriptions/me",
  BY_OWNER: (ownerId: string) => `/owner-subscriptions?ownerId=${ownerId}`,
  GET: (id: string) => `/owner-subscriptions/${id}`,
  CREATE: "/owner-subscriptions",
  UPDATE: (id: string) => `/owner-subscriptions/${id}`,
  CANCEL: (id: string) => `/owner-subscriptions/${id}/cancel`,
  APPROVE: (id: string) => `/owner-subscriptions/${id}/approve`,
  REJECT: (id: string) => `/owner-subscriptions/${id}/reject`,
} as const;

/**
 * Booking Management Endpoints
 */
export const BOOKING_ENDPOINTS = {
  LIST: "/bookings",
  GET: (id: string) => `/bookings/${id}`,
  CREATE: "/bookings",
  UPDATE: (id: string) => `/bookings/${id}`,
  DELETE: (id: string) => `/bookings/${id}`,
} as const;

/**
 * Trip Assignment Endpoints
 */
export const TRIP_ENDPOINTS = {
  LIST: "/trips",
  GET: (id: string) => `/trips/${id}`,
  CREATE: "/trips",
  UPDATE: (id: string) => `/trips/${id}`,
  DELETE: (id: string) => `/trips/${id}`,
  BY_BOOKING: (bookingId: string) => `/trips/booking/${bookingId}`,
} as const;

/**
 * Admin Endpoints
 */
export const ADMIN_ENDPOINTS = {
  DASHBOARD: "/admin/dashboard",
  STATS: "/admin/stats",
  VERIFY_OWNER: (id: string) => `/admin/verify-owner/${id}`,
  VERIFY_DRIVER: (id: string) => `/admin/verify-driver/${id}`,
  VERIFY_CAR: (id: string) => `/admin/verify-car/${id}`,
} as const;

/**
 * Submission Management Endpoints
 */
export const SUBMISSION_ENDPOINTS = {
  LIST: "/submissions",
  GET: (id: string) => `/submissions/${id}`,
  CREATE: "/submissions",
  UPDATE: (id: string) => `/submissions/${id}`,
  DELETE: (id: string) => `/submissions/${id}`,
  STATS: "/submissions/stats",
} as const;

/**
 * Contact Message Endpoints
 */
export const CONTACT_ENDPOINTS = {
  LIST: "/contact",
  GET: (id: string) => `/contact/${id}`,
  CREATE: "/contact",
  UPDATE: (id: string) => `/contact/${id}`,
  DELETE: (id: string) => `/contact/${id}`,
  STATS: "/contact/stats",
} as const;

/**
 * Helper function to build full URL
 */
export const buildUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Export all endpoints as a single object for convenience
 */
export const ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  ROLE: ROLE_ENDPOINTS,
  PERMISSION: PERMISSION_ENDPOINTS,
  OWNERS: OWNER_ENDPOINTS,
  DRIVERS: DRIVER_ENDPOINTS,
  CARS: CAR_ENDPOINTS,
  CITIES: CITY_ENDPOINTS,
  PACKAGES: PACKAGE_ENDPOINTS,
  SUBSCRIPTIONS: SUBSCRIPTION_ENDPOINTS,
  BOOKINGS: BOOKING_ENDPOINTS,
  TRIPS: TRIP_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
  VEHICLE_TYPES: VEHICLE_TYPE_ENDPOINTS,
  SUBMISSIONS: SUBMISSION_ENDPOINTS,
  CONTACT: CONTACT_ENDPOINTS,
} as const;
