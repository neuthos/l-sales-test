export interface ApiErrorMessage {
  code: string;
  msg: string;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: ApiErrorMessage;
  data: Record<string, never>;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(public code: string, public msg: string, public status?: number) {
    super(msg);
    this.name = "ApiError";
  }
}
