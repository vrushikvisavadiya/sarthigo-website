import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";

/**
 * Owner Types
 */
export interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
  ownerProfile: {
    id: string;
    companyName: string;
    city: string;
    verified: boolean;
    verifiedAt: string | null;
    verifiedBy: string | null;
    drivers: any[];
    cars: any[];
  };
  role: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateOwnerDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  city: string;
}

export interface UpdateOwnerDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  companyName?: string;
  city?: string;
}

/**
 * Query Keys
 */
export const ownerKeys = {
  all: ["owners"] as const,
  lists: () => [...ownerKeys.all, "list"] as const,
  list: (filters?: any) => [...ownerKeys.lists(), filters] as const,
  details: () => [...ownerKeys.all, "detail"] as const,
  detail: (id: string) => [...ownerKeys.details(), id] as const,
  me: () => [...ownerKeys.all, "me"] as const,
  drivers: (id: string) => [...ownerKeys.detail(id), "drivers"] as const,
  cars: (id: string) => [...ownerKeys.detail(id), "cars"] as const,
};

/**
 * Get all owners (Admin only)
 */
export const useOwners = () => {
  return useQuery({
    queryKey: ownerKeys.lists(),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Owner[]>(ENDPOINTS.OWNERS.LIST);
      return data;
    },
  });
};

/**
 * Get single owner by ID
 */
export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ownerKeys.detail(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Owner>(ENDPOINTS.OWNERS.DETAIL(id));
      return data;
    },
    enabled: !!id,
  });
};

/**
 * Get current owner profile
 */
export const useMyOwnerProfile = () => {
  return useQuery({
    queryKey: ownerKeys.me(),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Owner>(ENDPOINTS.OWNERS.ME);
      return data;
    },
  });
};

/**
 * Get owner's drivers
 */
export const useOwnerDrivers = (ownerId: string) => {
  return useQuery({
    queryKey: ownerKeys.drivers(ownerId),
    queryFn: async () => {
      const { data } = await axiosAuth.get(ENDPOINTS.OWNERS.DRIVERS(ownerId));
      return data;
    },
    enabled: !!ownerId,
  });
};

/**
 * Get owner's cars
 */
export const useOwnerCars = (ownerId: string) => {
  return useQuery({
    queryKey: ownerKeys.cars(ownerId),
    queryFn: async () => {
      const { data } = await axiosAuth.get(ENDPOINTS.OWNERS.CARS(ownerId));
      return data;
    },
    enabled: !!ownerId,
  });
};

/**
 * Create new owner
 */
export const useCreateOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ownerData: CreateOwnerDto) => {
      const { data } = await axiosAuth.post<Owner>(
        ENDPOINTS.OWNERS.CREATE,
        ownerData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};

/**
 * Update owner
 */
export const useUpdateOwner = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ownerData: UpdateOwnerDto) => {
      const { data } = await axiosAuth.patch<Owner>(
        ENDPOINTS.OWNERS.UPDATE(id),
        ownerData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};

/**
 * Verify owner
 */
export const useVerifyOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.patch<Owner>(
        ENDPOINTS.OWNERS.VERIFY(id),
      );
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};

/**
 * Toggle owner active status
 */
export const useToggleOwnerActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.patch<Owner>(
        ENDPOINTS.OWNERS.TOGGLE_ACTIVE(id),
      );
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};

/**
 * Delete owner (soft delete - deactivate)
 */
export const useDeleteOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.delete(ENDPOINTS.OWNERS.DELETE(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};

/**
 * Hard delete owner (permanent deletion)
 */
export const useHardDeleteOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.delete(ENDPOINTS.OWNERS.HARD_DELETE(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
};
