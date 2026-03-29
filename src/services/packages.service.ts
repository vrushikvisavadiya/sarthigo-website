/**
 * Package Management Service
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";
import type {
  Package,
  CreatePackageDto,
  UpdatePackageDto,
  PackageFilters,
  OwnerPackageSubscription,
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from "@/types/package.types";

/**
 * Query Keys
 */
export const packageKeys = {
  all: ["packages"] as const,
  lists: () => [...packageKeys.all, "list"] as const,
  list: (filters?: PackageFilters) =>
    [...packageKeys.lists(), filters] as const,
  details: () => [...packageKeys.all, "detail"] as const,
  detail: (id: string) => [...packageKeys.details(), id] as const,
  byCity: (cityId: string) => [...packageKeys.all, "city", cityId] as const,
  subscriptions: () => [...packageKeys.all, "subscriptions"] as const,
  subscription: (id: string) => [...packageKeys.subscriptions(), id] as const,
  ownerSubscriptions: (ownerId: string) =>
    [...packageKeys.subscriptions(), "owner", ownerId] as const,
};

/**
 * Get all packages
 */
export const usePackages = (filters?: PackageFilters) => {
  return useQuery({
    queryKey: packageKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
      }
      const { data } = await axiosAuth.get<Package[]>(
        `${ENDPOINTS.PACKAGES.LIST}?${params.toString()}`,
      );
      return data;
    },
  });
};

/**
 * Get single package by ID
 */
export const usePackage = (id: string) => {
  return useQuery({
    queryKey: packageKeys.detail(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Package>(ENDPOINTS.PACKAGES.GET(id));
      return data;
    },
    enabled: !!id,
  });
};

/**
 * Get packages by city
 */
export const usePackagesByCity = (cityId: string) => {
  return useQuery({
    queryKey: packageKeys.byCity(cityId),
    queryFn: async () => {
      const { data } = await axiosAuth.get<Package[]>(
        `${ENDPOINTS.PACKAGES.LIST}?cityId=${cityId}`,
      );
      return data;
    },
    enabled: !!cityId,
  });
};

/**
 * Create new package (Admin only)
 */
export const useCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageData: CreatePackageDto) => {
      const { data } = await axiosAuth.post<Package>(
        ENDPOINTS.PACKAGES.CREATE,
        packageData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
    },
  });
};

/**
 * Update package (Admin only)
 */
export const useUpdatePackage = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (packageData: UpdatePackageDto) => {
      const { data } = await axiosAuth.patch<Package>(
        ENDPOINTS.PACKAGES.UPDATE(id),
        packageData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
    },
  });
};

/**
 * Delete package (Admin only)
 */
export const useDeletePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.delete(ENDPOINTS.PACKAGES.DELETE(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
    },
  });
};

/**
 * Toggle package active status (Admin only)
 */
export const useTogglePackageActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.patch<Package>(
        `${ENDPOINTS.PACKAGES.UPDATE(id)}/toggle-active`,
      );
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: packageKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: packageKeys.lists() });
    },
  });
};

/**
 * Get owner's package subscriptions
 */
export const useOwnerSubscriptions = (ownerId?: string) => {
  return useQuery({
    queryKey: ownerId
      ? packageKeys.ownerSubscriptions(ownerId)
      : packageKeys.subscriptions(),
    queryFn: async () => {
      const endpoint = ownerId
        ? `/owner-subscriptions?ownerId=${ownerId}`
        : "/owner-subscriptions/me";
      const { data } =
        await axiosAuth.get<OwnerPackageSubscription[]>(endpoint);
      return data;
    },
  });
};

/**
 * Get single subscription
 */
export const useSubscription = (id: string) => {
  return useQuery({
    queryKey: packageKeys.subscription(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get<OwnerPackageSubscription>(
        `/owner-subscriptions/${id}`,
      );
      return data;
    },
    enabled: !!id,
  });
};

/**
 * Create package subscription (Owner)
 */
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionData: CreateSubscriptionDto) => {
      const { data } = await axiosAuth.post<OwnerPackageSubscription>(
        "/owner-subscriptions",
        subscriptionData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.subscriptions() });
    },
  });
};

/**
 * Update subscription (Admin/Owner)
 */
export const useUpdateSubscription = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subscriptionData: UpdateSubscriptionDto) => {
      const { data } = await axiosAuth.patch<OwnerPackageSubscription>(
        `/owner-subscriptions/${id}`,
        subscriptionData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.subscription(id) });
      queryClient.invalidateQueries({ queryKey: packageKeys.subscriptions() });
    },
  });
};

/**
 * Cancel subscription (Owner)
 */
export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.patch<OwnerPackageSubscription>(
        `/owner-subscriptions/${id}/cancel`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packageKeys.subscriptions() });
    },
  });
};
