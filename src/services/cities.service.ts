import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/endpoints";
import { toast } from "sonner";
import { axiosAuth } from "@/lib/axios/axios-config";

// Types
export interface City {
  id: string;
  name: string;
  slug: string;
  state?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    packagesAsSource: number;
    packagesAsDestination: number;
  };
}

export interface CreateCityDto {
  name: string;
  slug: string;
  state?: string;
  isActive?: boolean;
}

export interface UpdateCityDto {
  name?: string;
  slug?: string;
  state?: string;
  isActive?: boolean;
}

// Query Keys
export const cityKeys = {
  all: ["cities"] as const,
  lists: () => [...cityKeys.all, "list"] as const,
  list: (filters: string) => [...cityKeys.lists(), { filters }] as const,
  details: () => [...cityKeys.all, "detail"] as const,
  detail: (id: string) => [...cityKeys.details(), id] as const,
};

// Hooks
export const useCities = (isActive?: boolean) => {
  return useQuery({
    queryKey: cityKeys.list(
      isActive !== undefined ? `isActive=${isActive}` : "",
    ),
    queryFn: async () => {
      const params =
        isActive !== undefined ? { isActive: isActive.toString() } : {};
      const { data } = await axiosAuth.get(ENDPOINTS.CITIES.LIST, { params });
      return data as City[];
    },
  });
};

export const useCity = (id: string) => {
  return useQuery({
    queryKey: cityKeys.detail(id),
    queryFn: async () => {
      const { data } = await axiosAuth.get(ENDPOINTS.CITIES.DETAIL(id));
      return data as City;
    },
    enabled: !!id,
  });
};

export const useCreateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cityData: CreateCityDto) => {
      const { data } = await axiosAuth.post(ENDPOINTS.CITIES.CREATE, cityData);
      return data as City;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
      toast.success("City created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create city");
    },
  });
};

export const useUpdateCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCityDto }) => {
      const response = await axiosAuth.patch(ENDPOINTS.CITIES.UPDATE(id), data);
      return response.data as City;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: cityKeys.detail(variables.id),
      });
      toast.success("City updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update city");
    },
  });
};

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.delete(ENDPOINTS.CITIES.DELETE(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
      toast.success("City deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete city");
    },
  });
};

export const useToggleCityActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosAuth.patch(
        ENDPOINTS.CITIES.TOGGLE_ACTIVE(id),
      );
      return data as City;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: cityKeys.lists() });
      queryClient.invalidateQueries({ queryKey: cityKeys.detail(id) });
      toast.success("City status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update city status",
      );
    },
  });
};
