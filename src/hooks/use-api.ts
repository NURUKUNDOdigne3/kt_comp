import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

// Get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token");
  }
  return null;
};

// Fetcher function for SWR with Authorization header
const fetcher = async (url: string) => {
  const token = getToken();
  // console.log("Token from localStorage:", token);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // console.log("Headers being sent:", headers);

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// Generic API hook
export function useApi<T>(url: string | null, config?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean;
    data: T;
  }>(url, fetcher, config);

  return {
    data: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Products hooks
export function useProducts(params?: {
  categoryId?: string;
  brandId?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.categoryId) queryParams.set("categoryId", params.categoryId);
  if (params?.brandId) queryParams.set("brandId", params.brandId);
  if (params?.featured) queryParams.set("featured", "true");
  if (params?.search) queryParams.set("search", params.search);
  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.limit) queryParams.set("limit", params.limit.toString());

  const url = `/api/products${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return useApi<{
    products: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(url);
}

export function useProduct(id: string | null) {
  return useApi<any>(id ? `/api/products/${id}` : null);
}

// Categories hooks
export function useCategories() {
  return useApi<any[]>("/api/categories");
}

export function useCategory(id: string | null) {
  return useApi<any>(id ? `/api/categories/${id}` : null);
}

// Brands hooks
export function useBrands() {
  return useApi<any[]>("/api/brands");
}

export function useBrand(id: string | null) {
  return useApi<any>(id ? `/api/brands/${id}` : null);
}

// Orders hooks
export function useOrders(params?: { page?: number; limit?: number }) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set("page", params.page.toString());
  if (params?.limit) queryParams.set("limit", params.limit.toString());

  const url = `/api/orders${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return useApi<{
    orders: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(url);
}

export function useOrder(id: string | null) {
  return useApi<any>(id ? `/api/orders/${id}` : null);
}

// Current user hook
export function useCurrentUser() {
  return useApi<any>("/api/auth/me");
}

// Cart hook
export function useCart() {
  return useApi<any[]>("/api/cart");
}

// Mutation helpers
async function sendRequest(url: string, { arg }: { arg: any }) {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(arg),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

async function updateRequest(url: string, { arg }: { arg: any }) {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(arg),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

async function deleteRequest(url: string) {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

// Auth mutations
export function useLogin() {
  return useSWRMutation("/api/auth/login", sendRequest);
}

export function useRegister() {
  return useSWRMutation("/api/auth/register", sendRequest);
}

export function useLogout() {
  return useSWRMutation("/api/auth/logout", sendRequest);
}

// Product mutations
export function useCreateProduct() {
  return useSWRMutation("/api/products", sendRequest);
}

export function useUpdateProduct(id: string) {
  return useSWRMutation(`/api/products/${id}`, updateRequest);
}

export function useDeleteProduct(id: string) {
  return useSWRMutation(`/api/products/${id}`, () =>
    deleteRequest(`/api/products/${id}`)
  );
}

// Category mutations
export function useCreateCategory() {
  return useSWRMutation("/api/categories", sendRequest);
}

export function useUpdateCategory(id: string) {
  return useSWRMutation(`/api/categories/${id}`, updateRequest);
}

export function useDeleteCategory(id: string) {
  return useSWRMutation(`/api/categories/${id}`, () =>
    deleteRequest(`/api/categories/${id}`)
  );
}

// Brand mutations
export function useCreateBrand() {
  return useSWRMutation("/api/brands", sendRequest);
}

export function useUpdateBrand(id: string) {
  return useSWRMutation(`/api/brands/${id}`, updateRequest);
}

export function useDeleteBrand(id: string) {
  return useSWRMutation(`/api/brands/${id}`, () =>
    deleteRequest(`/api/brands/${id}`)
  );
}

// Order mutations
export function useCreateOrder() {
  return useSWRMutation("/api/orders", sendRequest);
}

export function useUpdateOrderStatus(id: string) {
  return useSWRMutation(`/api/orders/${id}`, updateRequest);
}

export function useCancelOrder(id: string) {
  return useSWRMutation(`/api/orders/${id}`, () =>
    deleteRequest(`/api/orders/${id}`)
  );
}

// User hooks
export function useUsers(params?: {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.role) queryParams.append("role", params.role);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `/api/users${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return useApi(url);
}

export function useUser(id?: string) {
  return useApi(id ? `/api/users/${id}` : null);
}

export function useDeleteUser(id: string) {
  return useSWRMutation(`/api/users/${id}`, () =>
    deleteRequest(`/api/users/${id}`)
  );
}

// Review hooks
export function useReviews(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `/api/reviews${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return useApi(url);
}

export function useReview(id?: string) {
  return useApi(id ? `/api/reviews/${id}` : null);
}

export function useUpdateReviewStatus(id: string) {
  return useSWRMutation(`/api/reviews/${id}`, updateRequest);
}

export function useDeleteReview(id: string) {
  return useSWRMutation(`/api/reviews/${id}`, () =>
    deleteRequest(`/api/reviews/${id}`)
  );
}
