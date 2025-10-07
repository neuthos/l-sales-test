import { api } from "@/lib/api/client";

import type { AxiosRequestConfig } from "axios";

/**
 * Base Service Class
 * Provides common methods for all services
 */
export class BaseService {
  /**
   * GET request
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return api.get<T>(url, config);
  }

  /**
   * POST request
   */
  protected async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return api.post<T>(url, data, config);
  }

  /**
   * PUT request
   */
  protected async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return api.put<T>(url, data, config);
  }

  /**
   * PATCH request
   */
  protected async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return api.patch<T>(url, data, config);
  }

  /**
   * DELETE request
   */
  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return api.delete<T>(url, config);
  }
}
