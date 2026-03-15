/**
 * Authentication Service
 *
 * Handles all authentication-related API calls using TanStack Query
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  axiosNoAuth,
  axiosAuth,
  tokenManager,
  getErrorMessage,
} from "@/lib/axios/axios-config";
import { AUTH_ENDPOINTS } from "@/config/endpoints";

/**
 * Type Definitions
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
  profileImage: string | null;
  role: {
    id: string;
    name: string;
    description: string | null;
    permissions: Permission[];
  };
}

export interface Permission {
  id: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
}

/**
 * Query Keys
 */
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
  user: (id: string) => [...authKeys.all, "user", id] as const,
};

/**
 * API Functions
 */
const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosNoAuth.post<LoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials,
    );
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await axiosAuth.get<User>(AUTH_ENDPOINTS.PROFILE);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    // Clear tokens
    tokenManager.clearTokens();

    // Optional: Call backend logout endpoint if it exists
    // await axiosAuth.post(AUTH_ENDPOINTS.LOGOUT);
  },
};

/**
 * React Query Hooks
 */

/**
 * Login Mutation Hook
 *
 * @example
 * const { mutate: login, isPending, error } = useLogin();
 *
 * login({ email: 'admin@example.com', password: 'password' }, {
 *   onSuccess: (data) => {
 *     console.log('Logged in:', data.user);
 *     router.push('/dashboard');
 *   },
 *   onError: (error) => {
 *     console.error('Login failed:', error);
 *   }
 * });
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log("data: ", data);
      // Store access token
      tokenManager.setToken(data.accessToken);

      // Cache user data
      queryClient.setQueryData(authKeys.profile(), data.user);
    },
    onError: (error) => {
      // Clear any existing tokens on login failure
      tokenManager.clearTokens();
      console.error("Login error:", getErrorMessage(error));
    },
  });
};

/**
 * Profile Query Hook
 *
 * @example
 * const { data: user, isLoading, error } = useProfile();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return <div>Welcome, {user.firstName}!</div>;
 */
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: !!tokenManager.getToken(), // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on 401
  });
};

/**
 * Logout Mutation Hook
 *
 * @example
 * const { mutate: logout } = useLogout();
 *
 * logout(undefined, {
 *   onSuccess: () => {
 *     router.push('/login');
 *   }
 * });
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};

/**
 * Auth State Hook
 *
 * Provides authentication state and user information
 *
 * @example
 * const { isAuthenticated, user, isLoading } = useAuthState();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (!isAuthenticated) return <Navigate to="/login" />;
 *
 * return <div>Welcome, {user.firstName}!</div>;
 */
export const useAuthState = () => {
  const { data: user, isLoading } = useProfile();
  const hasToken = !!tokenManager.getToken();

  return {
    isAuthenticated: hasToken && !!user,
    user: user || null,
    isLoading: hasToken && isLoading,
  };
};

/**
 * Permission Check Hook
 *
 * Check if user has specific permission
 *
 * @example
 * const hasPermission = useHasPermission('users:create');
 *
 * if (!hasPermission) return <div>Access Denied</div>;
 */
export const useHasPermission = (permissionName: string): boolean => {
  const { user } = useAuthState();

  if (!user) return false;

  return user.role.permissions.some(
    (permission) =>
      permission.name === permissionName || permission.name === "all:*",
  );
};

/**
 * Role Check Hook
 *
 * Check if user has specific role
 *
 * @example
 * const isAdmin = useHasRole('admin');
 *
 * if (!isAdmin) return <div>Admin Only</div>;
 */
export const useHasRole = (roleName: string): boolean => {
  const { user } = useAuthState();

  if (!user) return false;

  return user.role.name.toLowerCase() === roleName.toLowerCase();
};
