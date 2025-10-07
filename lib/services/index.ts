/**
 * Service Layer
 * Centralized API service classes with singleton pattern
 *
 * Usage:
 * import { AuthService, UserService, ProductService } from "@/lib/services";
 *
 * const user = await AuthService.login({ email, password });
 * const users = await UserService.getUsers();
 * const products = await ProductService.getProducts();
 */

export {AuthService} from "./auth.service";
export {UserService} from "./user.service";
export {ProductService} from "./product.service";

// Export types
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User as AuthUser,
} from "./auth.service";

export type {
  User,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "./user.service";

export type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "./product.service";
