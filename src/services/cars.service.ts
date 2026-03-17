import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuth } from "@/lib/axios/axios-config";
import { CAR_ENDPOINTS } from "@/config/endpoints";

// Car Types
export type CarType = string;

export interface Car {
  id: string;
  ownerId: string;
  carModel: string;
  carType: CarType;
  carNumber: string;
  seats: number;
  ac: boolean;
  verified: boolean;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    companyName: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  _count?: {
    tripAssignments: number;
  };
}

export interface CreateCarDto {
  ownerId: string;
  carModel: string;
  carType: CarType;
  carNumber: string;
  seats: number;
  ac: boolean;
}

export interface UpdateCarDto {
  carModel?: string;
  carType?: CarType;
  carNumber?: string;
  seats?: number;
  ac?: boolean;
  ownerId?: string;
}

// Query Keys
export const carKeys = {
  all: ["cars"] as const,
  lists: () => [...carKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...carKeys.lists(), filters] as const,
  details: () => [...carKeys.all, "detail"] as const,
  detail: (id: string) => [...carKeys.details(), id] as const,
  byOwner: (ownerId: string) => [...carKeys.all, "owner", ownerId] as const,
};

// Fetch all cars
export const useCars = () => {
  return useQuery({
    queryKey: carKeys.lists(),
    queryFn: async () => {
      const response = await axiosAuth.get<Car[]>(CAR_ENDPOINTS.LIST);
      return response.data;
    },
  });
};

// Fetch single car
export const useCar = (id: string) => {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: async () => {
      const response = await axiosAuth.get<Car>(CAR_ENDPOINTS.DETAIL(id));
      return response.data;
    },
    enabled: !!id,
  });
};

// Fetch cars by owner
export const useCarsByOwner = (ownerId: string) => {
  return useQuery({
    queryKey: carKeys.byOwner(ownerId),
    queryFn: async () => {
      const response = await axiosAuth.get<Car[]>(
        CAR_ENDPOINTS.BY_OWNER(ownerId),
      );
      return response.data;
    },
    enabled: !!ownerId,
  });
};

// Create car
export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCarDto) => {
      const response = await axiosAuth.post<Car>(CAR_ENDPOINTS.CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Update car
export const useUpdateCar = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCarDto) => {
      const response = await axiosAuth.patch<Car>(
        CAR_ENDPOINTS.UPDATE(id),
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Verify car
export const useVerifyCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.patch<Car>(CAR_ENDPOINTS.VERIFY(id));
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: carKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Toggle car active status
export const useToggleCarActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.patch<Car>(
        CAR_ENDPOINTS.TOGGLE_ACTIVE(id),
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: carKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Delete car (soft delete)
export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(CAR_ENDPOINTS.DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Hard delete car
export const useHardDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosAuth.delete(CAR_ENDPOINTS.HARD_DELETE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: carKeys.lists() });
    },
  });
};

// Helper function to get car type label
export const getCarTypeLabel = (carType: CarType): string => {
  return carType;
};
