import {BaseService} from "./base.service";

/**
 * Product Service Types
 */
export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  code: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock?: number;
}

export interface UpdateProductRequest {
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

/**
 * Product Service
 * Handles product master data API calls
 */
class ProductServiceClass extends BaseService {
  /**
   * Get all products
   */
  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>("/products");
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    return this.get<Product>(`/products/${id}`);
  }

  /**
   * Create new product
   */
  async createProduct(data: CreateProductRequest): Promise<Product> {
    return this.post<Product>("/products", data);
  }

  /**
   * Update product
   */
  async updateProduct(
    id: string,
    data: UpdateProductRequest
  ): Promise<Product> {
    return this.put<Product>(`/products/${id}`, data);
  }

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<void> {
    return this.delete<void>(`/products/${id}`);
  }
}

// Export singleton instance
export const ProductService = new ProductServiceClass();
