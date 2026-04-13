import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";

export interface VehicleType {
  id: string;
  name: string;
  description: string | null;
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

/**
 * Query Keys
 */
export const vehicleTypeKeys = {
  all: ["vehicle-types"] as const,
  lists: () => [...vehicleTypeKeys.all, "list"] as const,
  list: () => [...vehicleTypeKeys.lists()] as const,
  active: () => [...vehicleTypeKeys.all, "active"] as const,
  details: () => [...vehicleTypeKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleTypeKeys.details(), id] as const,
};

export const vehicleTypesService = {
  /**
   * Get all active vehicle types
   */
  getActive: async (): Promise<VehicleType[]> => {
    const response = await axiosAuth.get<VehicleType[]>(
      ENDPOINTS.VEHICLE_TYPES.ACTIVE,
    );
    return response.data;
  },

  /**
   * Get all vehicle types (admin only)
   */
  getAll: async (): Promise<VehicleType[]> => {
    const response = await axiosAuth.get<VehicleType[]>(
      ENDPOINTS.VEHICLE_TYPES.LIST,
    );
    return response.data;
  },

  /**
   * Get a single vehicle type by ID
   */
  getById: async (id: string): Promise<VehicleType> => {
    const response = await axiosAuth.get<VehicleType>(
      ENDPOINTS.VEHICLE_TYPES.DETAIL(id),
    );
    return response.data;
  },

  /**
   * Create a new vehicle type (admin only)
   */
  create: async (data: CreateVehicleTypeDto): Promise<VehicleType> => {
    const response = await axiosAuth.post<VehicleType>(
      ENDPOINTS.VEHICLE_TYPES.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Update a vehicle type (admin only)
   */
  update: async (
    id: string,
    data: UpdateVehicleTypeDto,
  ): Promise<VehicleType> => {
    const response = await axiosAuth.patch<VehicleType>(
      ENDPOINTS.VEHICLE_TYPES.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Delete a vehicle type (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await axiosAuth.delete(ENDPOINTS.VEHICLE_TYPES.DELETE(id));
  },

  /**
   * Toggle active status (admin only)
   */
  toggleActive: async (id: string): Promise<VehicleType> => {
    const response = await axiosAuth.patch<VehicleType>(
      ENDPOINTS.VEHICLE_TYPES.TOGGLE_ACTIVE(id),
    );
    return response.data;
  },
};

/**
 * React Query Hooks
 */

/**
 * Hook to get all active vehicle types
 */
export const useActiveVehicleTypes = () => {
  return useQuery({
    queryKey: vehicleTypeKeys.active(),
    queryFn: vehicleTypesService.getActive,
  });
};

/**
 * Hook to get all vehicle types (admin)
 */
export const useVehicleTypes = () => {
  return useQuery({
    queryKey: vehicleTypeKeys.list(),
    queryFn: vehicleTypesService.getAll,
  });
};

/**
 * Hook to get a single vehicle type
 */
export const useVehicleType = (id: string) => {
  return useQuery({
    queryKey: vehicleTypeKeys.detail(id),
    queryFn: () => vehicleTypesService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a vehicle type
 */
export const useCreateVehicleType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleTypesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.all });
    },
  });
};

/**
 * Hook to update a vehicle type
 */
export const useUpdateVehicleType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVehicleTypeDto }) =>
      vehicleTypesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.all });
    },
  });
};

/**
 * Hook to delete a vehicle type
 */
export const useDeleteVehicleType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleTypesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.all });
    },
  });
};

/**
 * Hook to toggle active status
 */
export const useToggleVehicleTypeActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehicleTypesService.toggleActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleTypeKeys.all });
    },
  });
};
