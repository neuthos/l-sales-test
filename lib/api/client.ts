import axios from "axios";
import Cookies from "js-cookie";

import { ApiError } from "@/lib/types/api";
import { getUserTimezone } from "@/lib/utils/date";

import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import type { ApiErrorResponse, ApiResponse } from "@/lib/types/api";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1/";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Request Interceptor
 * Add authentication token, company key, and timezone to requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get auth data from cookie
    const authCookie = Cookies.get("l-sales-auth");
    if (authCookie) {
      try {
        // Note: For real implementation, you'll store JWT token in auth state
        // const authData = JSON.parse(authCookie);
        // config.headers.Authorization = `Bearer ${authData.token}`;
      } catch {
        // Invalid cookie, ignore
      }
    }

    config.headers["Time-Zone"] = getUserTimezone();

    // Add company key header (you can get this from tenant context)
    // config.headers["X-Company-Key"] = getTenantId();

    if (["post", "put", "patch"].includes(config.method ?? "")) {
      config.headers["X-Idempotency-Key"] = crypto.randomUUID();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle API responses and errors based on backend format
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return the response data directly
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;

      // Check if response follows our API error format
      if (data && !data.success && data.message) {
        // Convert to ApiError
        throw new ApiError(data.message.code, data.message.msg, status);
      }

      // Fallback for non-standard errors
      throw new ApiError(
        "UNKNOWN_ERROR",
        error.message ?? "An unknown error occurred",
        status
      );
    } else if (error.request) {
      // Request was made but no response
      throw new ApiError(
        "NETWORK_ERROR",
        "Network error. Please check your connection.",
        0
      );
    } else {
      // Something else happened
      throw new ApiError(
        "REQUEST_ERROR",
        error.message ?? "An error occurred while setting up the request",
        0
      );
    }
  }
);

/**
 * Generic API request wrapper
 * Automatically handles response unwrapping and type safety
 */
export async function apiRequest<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  config?: Parameters<typeof apiClient.request>[0]
): Promise<T> {
  const response = await apiClient.request<ApiResponse<T>>({
    method,
    url,
    data,
    ...config,
  });

  // Check if response is successful
  if (response.data.success) {
    return response.data.data;
  }

  // This shouldn't happen because interceptor should catch errors
  // but we handle it just in case
  throw new ApiError(
    "UNEXPECTED_ERROR",
    "Unexpected response format",
    response.status
  );
}

/**
 * Convenience methods
 */
export const api = {
  get: <T>(url: string, config?: Parameters<typeof apiClient.get>[1]) =>
    apiRequest<T>("get", url, undefined, config),

  post: <T>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof apiClient.post>[2]
  ) => apiRequest<T>("post", url, data, config),

  put: <T>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof apiClient.put>[2]
  ) => apiRequest<T>("put", url, data, config),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: Parameters<typeof apiClient.patch>[2]
  ) => apiRequest<T>("patch", url, data, config),

  delete: <T>(url: string, config?: Parameters<typeof apiClient.delete>[1]) =>
    apiRequest<T>("delete", url, undefined, config),
};

export default apiClient;
