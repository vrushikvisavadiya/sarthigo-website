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
 * Driver Management Endpoints
 */
export const DRIVER_ENDPOINTS = {
  LIST: "/drivers",
  GET: (id: string) => `/drivers/${id}`,
  CREATE: "/drivers",
  UPDATE: (id: string) => `/drivers/${id}`,
  DELETE: (id: string) => `/drivers/${id}`,
} as const;

/**
 * Ride Management Endpoints
 */
export const RIDE_ENDPOINTS = {
  LIST: "/rides",
  GET: (id: string) => `/rides/${id}`,
  CREATE: "/rides",
  UPDATE: (id: string) => `/rides/${id}`,
  DELETE: (id: string) => `/rides/${id}`,
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
 * Admin Endpoints
 */
export const ADMIN_ENDPOINTS = {
  DASHBOARD: "/admin/dashboard",
  STATS: "/admin/stats",
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
  DRIVER: DRIVER_ENDPOINTS,
  RIDE: RIDE_ENDPOINTS,
  BOOKING: BOOKING_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
} as const;
