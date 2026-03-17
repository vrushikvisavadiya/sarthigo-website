/**
 * Roles & Permissions Service
 *
 * Handles all roles and permissions-related API calls using TanStack Query
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";

/**
 * Type Definitions
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    users: number;
  };
}

export interface CreateRoleDto {
  name: string;
  description?: string;
  permissionIds?: string[];
  isActive?: boolean;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissionIds?: string[];
  isActive?: boolean;
}

export interface CreatePermissionDto {
  name: string;
  description: string;
  resource: string;
  action: string;
}

/**
 * Query Keys
 */
export const rolesKeys = {
  all: ["roles"] as const,
  lists: () => [...rolesKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...rolesKeys.lists(), filters] as const,
  details: () => [...rolesKeys.all, "detail"] as const,
  detail: (id: string) => [...rolesKeys.details(), id] as const,
  permissions: () => [...rolesKeys.all, "permissions"] as const,
  permission: (id: string) => [...rolesKeys.permissions(), id] as const,
};

/**
 * Get all roles
 */
export const useRoles = () => {
  return useQuery({
    queryKey: rolesKeys.lists(),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Role[]>(ENDPOINTS.ROLE.LIST);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Get role by ID
 */
export const useRole = (id: string) => {
  return useQuery({
    queryKey: rolesKeys.detail(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Role>(ENDPOINTS.ROLE.GET(id));
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Create role
 */
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleData: CreateRoleDto) => {
      const { data } = await axiosAuth.post<Role>(
        ENDPOINTS.ROLE.CREATE,
        roleData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
    },
  });
};

/**
 * Update role
 */
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRoleDto }) => {
      const response = await axiosAuth.put<Role>(
        ENDPOINTS.ROLE.UPDATE(id),
        data,
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: rolesKeys.detail(variables.id),
      });
    },
  });
};

/**
 * Delete role
 */
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosAuth.delete(ENDPOINTS.ROLE.DELETE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
    },
  });
};

/**
 * Get all permissions
 */
export const usePermissions = () => {
  return useQuery({
    queryKey: rolesKeys.permissions(),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Permission[]>(
        ENDPOINTS.PERMISSION.LIST,
      );
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Get permission by ID
 */
export const usePermission = (id: string) => {
  return useQuery({
    queryKey: rolesKeys.permission(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Permission>(
        ENDPOINTS.PERMISSION.GET(id),
      );
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Create permission
 */
export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (permissionData: CreatePermissionDto) => {
      const { data } = await axiosAuth.post<Permission>(
        ENDPOINTS.PERMISSION.CREATE,
        permissionData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.permissions() });
    },
  });
};

/**
 * Delete permission
 */
export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosAuth.delete(ENDPOINTS.PERMISSION.DELETE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.permissions() });
    },
  });
};
