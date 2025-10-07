import {BaseService} from "./base.service";

/**
 * User Service Types
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * User Service
 * Handles user management API calls
 */
class UserServiceClass extends BaseService {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    return this.get<User[]>("/users");
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  /**
   * Update user profile
   */
  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    return this.put<User>(`/users/${id}`, data);
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    return this.post<void>("/users/change-password", data);
  }
}

// Export singleton instance
export const UserService = new UserServiceClass();
