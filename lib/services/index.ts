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

export { AuthService } from "./auth.service";
export { ProductService } from "./product.service";
export { UserService } from "./user.service";

// Export types
export type {
  User as AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "./auth.service";
export type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "./product.service";
export type {
  ChangePasswordRequest,
  UpdateUserRequest,
  User,
} from "./user.service";
