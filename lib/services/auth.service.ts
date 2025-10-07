import {BaseService} from "./base.service";

/**
 * Auth Service Types
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Auth Service
 * Handles authentication related API calls
 */
class AuthServiceClass extends BaseService {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>("/auth/login", credentials);
  }

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>("/auth/register", data);
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    return this.post<void>("/auth/logout");
  }

  /**
   * Get current user profile
   */
  async me(): Promise<User> {
    return this.get<User>("/auth/me");
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return this.post<LoginResponse>("/auth/refresh", {refreshToken});
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    return this.post<void>("/auth/forgot-password", {email});
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return this.post<void>("/auth/reset-password", {token, newPassword});
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    return this.post<void>("/auth/verify-email", {token});
  }
}

// Export singleton instance
export const AuthService = new AuthServiceClass();
