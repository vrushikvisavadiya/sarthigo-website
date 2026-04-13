import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth, axiosNoAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";

export interface CreateSubmissionDto {
  type: "contact_form" | "driver_registration" | "booking" | "other";
  data: Record<string, any>;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject: "booking" | "package" | "driver" | "other";
  message: string;
}

export interface Submission {
  id: string;
  type: string;
  data: Record<string, any>;
  name: string | null;
  email: string | null;
  phone: string | null;
  status: "pending" | "reviewed" | "approved" | "rejected";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface UpdateSubmissionDto {
  status?: "pending" | "reviewed" | "approved" | "rejected";
  notes?: string;
}

/**
 * Query Keys
 */
export const submissionKeys = {
  all: ["submissions"] as const,
  lists: () => [...submissionKeys.all, "list"] as const,
  list: (filters?: { type?: string; status?: string }) =>
    [...submissionKeys.lists(), filters] as const,
  details: () => [...submissionKeys.all, "detail"] as const,
  detail: (id: string) => [...submissionKeys.details(), id] as const,
};

export const submissionsService = {
  /**
   * Create a new submission (public - no auth required)
   */
  create: async (data: CreateSubmissionDto): Promise<Submission> => {
    const response = await axiosNoAuth.post<Submission>(
      ENDPOINTS.SUBMISSIONS.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Submit a contact form (public - no auth required)
   */
  submitContactForm: async (formData: ContactFormData): Promise<Submission> => {
    const response = await axiosNoAuth.post<Submission>(
      ENDPOINTS.SUBMISSIONS.CREATE,
      {
        type: "contact_form",
        data: formData,
      },
    );
    return response.data;
  },

  /**
   * Get all submissions (admin only)
   */
  getAll: async (params?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Submission>> => {
    const response = await axiosAuth.get<PaginatedResponse<Submission>>(
      ENDPOINTS.SUBMISSIONS.LIST,
      { params },
    );
    return response.data;
  },

  /**
   * Get a single submission by ID (admin only)
   */
  getById: async (id: string): Promise<Submission> => {
    const response = await axiosAuth.get<Submission>(
      ENDPOINTS.SUBMISSIONS.GET(id),
    );
    return response.data;
  },

  /**
   * Update a submission (admin only)
   */
  update: async (
    id: string,
    data: UpdateSubmissionDto,
  ): Promise<Submission> => {
    const response = await axiosAuth.patch<Submission>(
      ENDPOINTS.SUBMISSIONS.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Delete a submission (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await axiosAuth.delete(ENDPOINTS.SUBMISSIONS.DELETE(id));
  },

  /**
   * Get submission statistics (admin only)
   */
  getStats: async (): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recent: number;
  }> => {
    const response = await axiosAuth.get<{
      total: number;
      byType: Record<string, number>;
      byStatus: Record<string, number>;
      recent: number;
    }>(ENDPOINTS.SUBMISSIONS.STATS);
    return response.data;
  },
};

/**
 * React Query Hooks
 */

/**
 * Hook to get all submissions
 */
export const useSubmissions = (params?: {
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: submissionKeys.list(params),
    queryFn: () => submissionsService.getAll(params),
  });
};

/**
 * Hook to get a single submission
 */
export const useSubmission = (id: string) => {
  return useQuery({
    queryKey: submissionKeys.detail(id),
    queryFn: () => submissionsService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to update a submission
 */
export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubmissionDto }) =>
      submissionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.all });
    },
  });
};

/**
 * Hook to delete a submission
 */
export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submissionsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.all });
    },
  });
};

/**
 * Hook to create a submission (public - for contact forms, bookings, etc.)
 */
export const useCreateSubmission = () => {
  return useMutation({
    mutationFn: submissionsService.create,
  });
};

/**
 * Hook to submit a contact form (public)
 */
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: submissionsService.submitContactForm,
  });
};
