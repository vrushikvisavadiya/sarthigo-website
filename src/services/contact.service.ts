import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAuth, axiosNoAuth } from "@/lib/axios/axios-config";
import { ENDPOINTS } from "@/config/endpoints";

// ── Types ──────────────────────────────────────────────────────

export type ContactSubject = "booking" | "package" | "driver" | "other";
export type ContactStatus = "pending" | "reviewed" | "resolved" | "closed";

export interface CreateContactDto {
  name: string;
  phone: string;
  email?: string;
  subject: ContactSubject;
  message: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: ContactSubject;
  message: string;
  status: ContactStatus;
  notes: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateContactDto {
  status?: ContactStatus;
  notes?: string;
  reviewedBy?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedContactResponse {
  data: ContactMessage[];
  meta: PaginationMeta;
}

export interface ContactStats {
  total: number;
  byStatus: {
    pending: number;
    reviewed: number;
    resolved: number;
    closed: number;
  };
  bySubject: {
    booking: number;
    package: number;
    driver: number;
    other: number;
  };
}

// ── Query Keys ─────────────────────────────────────────────────

export const contactKeys = {
  all: ["contact"] as const,
  lists: () => [...contactKeys.all, "list"] as const,
  list: (filters?: {
    status?: string;
    subject?: string;
    page?: number;
    limit?: number;
  }) => [...contactKeys.lists(), filters] as const,
  details: () => [...contactKeys.all, "detail"] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
  stats: () => [...contactKeys.all, "stats"] as const,
};

// ── Service ────────────────────────────────────────────────────

export const contactService = {
  /**
   * Submit a contact form message (public — no auth required)
   */
  create: async (data: CreateContactDto): Promise<ContactMessage> => {
    const response = await axiosNoAuth.post<ContactMessage>(
      ENDPOINTS.CONTACT.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Get all contact messages (admin only)
   */
  getAll: async (params?: {
    status?: string;
    subject?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedContactResponse> => {
    const response = await axiosAuth.get<PaginatedContactResponse>(
      ENDPOINTS.CONTACT.LIST,
      { params },
    );
    return response.data;
  },

  /**
   * Get a single contact message by ID (admin only)
   */
  getById: async (id: string): Promise<ContactMessage> => {
    const response = await axiosAuth.get<ContactMessage>(
      ENDPOINTS.CONTACT.GET(id),
    );
    return response.data;
  },

  /**
   * Update a contact message (admin only)
   */
  update: async (
    id: string,
    data: UpdateContactDto,
  ): Promise<ContactMessage> => {
    const response = await axiosAuth.patch<ContactMessage>(
      ENDPOINTS.CONTACT.UPDATE(id),
      data,
    );
    return response.data;
  },

  /**
   * Delete a contact message (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await axiosAuth.delete(ENDPOINTS.CONTACT.DELETE(id));
  },

  /**
   * Get contact message statistics (admin only)
   */
  getStats: async (): Promise<ContactStats> => {
    const response = await axiosAuth.get<ContactStats>(ENDPOINTS.CONTACT.STATS);
    return response.data;
  },
};

// ── React Query Hooks ──────────────────────────────────────────

/**
 * Hook to submit a contact form (public)
 */
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: contactService.create,
  });
};

/**
 * Hook to get all contact messages (admin)
 */
export const useContactMessages = (params?: {
  status?: string;
  subject?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: contactKeys.list(params),
    queryFn: () => contactService.getAll(params),
  });
};

/**
 * Hook to get a single contact message (admin)
 */
export const useContactMessage = (id: string) => {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: () => contactService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook to update a contact message (admin)
 */
export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactDto }) =>
      contactService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
};

/**
 * Hook to delete a contact message (admin)
 */
export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.all });
    },
  });
};

/**
 * Hook to get contact statistics (admin)
 */
export const useContactStats = () => {
  return useQuery({
    queryKey: contactKeys.stats(),
    queryFn: contactService.getStats,
  });
};
