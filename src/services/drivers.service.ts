import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { DRIVER_ENDPOINTS } from "@/config/endpoints";
import { toast } from "sonner";

// Types
export interface Driver {
  id: string;
  ownerId: string;
  name: string;
  phone: string;
  licenseNumber: string;
  verified: boolean;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  isActive: boolean;
  rating: number;
  totalTrips: number;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateDriverDto {
  ownerId: string;
  name: string;
  phone: string;
  licenseNumber: string;
}

export interface UpdateDriverDto {
  name?: string;
  phone?: string;
  licenseNumber?: string;
  ownerId?: string;
}

// Query Keys
export const driverKeys = {
  all: ["drivers"] as const,
  lists: () => [...driverKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...driverKeys.lists(), filters] as const,
  details: () => [...driverKeys.all, "detail"] as const,
  detail: (id: string) => [...driverKeys.details(), id] as const,
  byOwner: (ownerId: string) => [...driverKeys.all, "owner", ownerId] as const,
};

// Fetch all drivers
export const useDrivers = () => {
  return useQuery({
    queryKey: driverKeys.lists(),
    queryFn: async () => {
      const response = await axiosAuth.get<Driver[]>(DRIVER_ENDPOINTS.LIST);
      return response.data;
    },
  });
};

// Fetch single driver
export const useDriver = (id: string) => {
  return useQuery({
    queryKey: driverKeys.detail(id),
    queryFn: async () => {
      const response = await axiosAuth.get<Driver>(DRIVER_ENDPOINTS.DETAIL(id));
      return response.data;
    },
    enabled: !!id,
  });
};

// Fetch drivers by owner
export const useDriversByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: driverKeys.byOwner(ownerId),
    queryFn: async () => {
      const response = await axiosAuth.get<Driver[]>(
        DRIVER_ENDPOINTS.BY_OWNER(ownerId),
      );
      return response.data;
    },
    enabled: !!ownerId,
  });
};

// Create driver
export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDriverDto) => {
      const response = await axiosAuth.post<Driver>(
        DRIVER_ENDPOINTS.CREATE,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      toast.success("Driver created successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create driver";
      toast.error(message);
    },
  });
};

// Update driver
export const useUpdateDriver = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDriverDto) => {
      const response = await axiosAuth.patch<Driver>(
        DRIVER_ENDPOINTS.UPDATE(id),
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(id) });
      toast.success("Driver updated successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update driver";
      toast.error(message);
    },
  });
};

// Delete driver (soft delete)
export const useDeleteDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(DRIVER_ENDPOINTS.DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      toast.success("Driver deactivated successfully");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to deactivate driver";
      toast.error(message);
    },
  });
};

// Hard delete driver
export const useHardDeleteDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(DRIVER_ENDPOINTS.HARD_DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      toast.success("Driver permanently deleted");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete driver permanently";
      toast.error(message);
    },
  });
};

// Verify driver
export const useVerifyDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.patch<Driver>(
        DRIVER_ENDPOINTS.VERIFY(id),
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      toast.success("Driver verification status updated");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update verification status";
      toast.error(message);
    },
  });
};

// Toggle driver active status
export const useToggleDriverActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.patch<Driver>(
        DRIVER_ENDPOINTS.TOGGLE_ACTIVE(id),
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
      toast.success("Driver status updated");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update driver status";
      toast.error(message);
    },
  });
};
