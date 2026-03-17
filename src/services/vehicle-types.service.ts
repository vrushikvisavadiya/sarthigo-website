import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { VEHICLE_TYPE_ENDPOINTS } from "@/config/endpoints";

// Vehicle Type Types
export interface VehicleType {
  id: string;
  name: string;
  description?: string | null;
  seats: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehicleTypeDto {
  name: string;
  description?: string;
  seats: number;
  isActive?: boolean;
}

export interface UpdateVehicleTypeDto {
  name?: string;
  description?: string;
  seats?: number;
  isActive?: boolean;
}

// Query Keys
export const vehicleTypeKeys = {
  all: ["vehicle-types"] as const,
  lists: () => [...vehicleTypeKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...vehicleTypeKeys.lists(), filters] as const,
  active: () => [...vehicleTypeKeys.all, "active"] as const,
  details: () => [...vehicleTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleTypeKeys.details(), id] as const,
};

// Fetch all vehicle types
export const useVehicleTypes = () => {
  return useQuery({
    queryKey: vehicleTypeKeys.lists(),
    queryFn: async () => {
      const response = await axiosAuth.get<VehicleType[]>(
        VEHICLE_TYPE_ENDPOINTS.LIST,
      );
      return response.data;
    },
  });
};

// Fetch active vehicle types only
export const useActiveVehicleTypes = () => {
  return useQuery({
    queryKey: vehicleTypeKeys.active(),
    queryFn: async () => {
      const response = await axiosAuth.get<VehicleType[]>(
        VEHICLE_TYPE_ENDPOINTS.ACTIVE,
      );
      return response.data;
    },
  });
};

// Fetch single vehicle type
export const useVehicleType = (id: string) => {
  return useQuery({
    queryKey: vehicleTypeKeys.detail(id),
    queryFn: async () => {
      const response = await axiosAuth.get<VehicleType>(
        VEHICLE_TYPE_ENDPOINTS.DETAIL(id),
      );
      return response.data;
    },
    enabled: !!id,
  });
};

// Create vehicle type
export const useCreateVehicleType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateVehicleTypeDto) => {
      const response = await axiosAuth.post<VehicleType>(
        VEHICLE_TYPE_ENDPOINTS.CREATE,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.active() });
    },
  });
};

// Update vehicle type
export const useUpdateVehicleType = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateVehicleTypeDto) => {
      const response = await axiosAuth.patch<VehicleType>(
        VEHICLE_TYPE_ENDPOINTS.UPDATE(id),
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.active() });
    },
  });
};

// Toggle vehicle type active status
export const useToggleVehicleTypeActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.patch<VehicleType>(
        VEHICLE_TYPE_ENDPOINTS.TOGGLE_ACTIVE(id),
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: vehicleTypeKeys.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.active() });
    },
  });
};

// Delete vehicle type
export const useDeleteVehicleType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(
        VEHICLE_TYPE_ENDPOINTS.DELETE(id),
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.active() });
    },
  });
};
