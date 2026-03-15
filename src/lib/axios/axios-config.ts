/**
 * Axios Configuration
 *
 * Base axios configuration with interceptors for request/response handling
 */

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "@/config/endpoints";

/**
 * Token storage keys
 */
const TOKEN_KEY = "sarthi_access_token";
const REFRESH_TOKEN_KEY = "sarthi_refresh_token";

/**
 * Token management utilities
 */
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearTokens: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

/**
 * Create base axios instance
 */
const createAxiosInstance = (requiresAuth: boolean = false): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /**
   * Request Interceptor
   * Adds authentication token to requests if required
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (requiresAuth) {
        const token = tokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Log request in development
      if (process.env.NODE_ENV === "development") {
        console.log("🚀 API Request:", {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    },
  );

  /**
   * Response Interceptor
   * Handles response transformation and error handling
   */
  instance.interceptors.response.use(
    (response) => {
      // Log response in development
      if (process.env.NODE_ENV === "development") {
        console.log("✅ API Response:", {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Log error in development
      if (process.env.NODE_ENV === "development") {
        console.error("❌ API Error:", {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        });
      }

      // Handle 401 Unauthorized - Token expired
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        requiresAuth
      ) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          const refreshToken = tokenManager.getRefreshToken();

          if (refreshToken) {
            // TODO: Implement token refresh logic when backend supports it
            // const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            //   refreshToken,
            // });
            //
            // const { accessToken } = response.data;
            // tokenManager.setToken(accessToken);
            //
            // originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            // return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          tokenManager.clearTokens();

          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }

        // If no refresh token, clear and redirect
        tokenManager.clearTokens();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      // Handle other errors
      return Promise.reject(error);
    },
  );

  return instance;
};

/**
 * Axios instance for non-authenticated requests
 * Used for public endpoints like login, register, etc.
 */
export const axiosNoAuth = createAxiosInstance(false);

/**
 * Axios instance for authenticated requests
 * Automatically adds JWT token to requests
 */
export const axiosAuth = createAxiosInstance(true);

/**
 * Error response type
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

/**
 * Helper function to extract error message from axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || error.message || "An unexpected error occurred";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
