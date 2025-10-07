# Service Layer

Service layer untuk mengelompokkan API calls berdasarkan domain/feature menggunakan **Singleton Factory Pattern**.

## Structure

```
lib/services/
├── base.service.ts          # Base class dengan common methods
├── auth.service.ts          # Authentication services
├── user.service.ts          # User management services
├── product.service.ts       # Product master services
├── index.ts                 # Export all services
└── README.md                # This file
```

## Usage

### Import Service

```typescript
import {AuthService, UserService, ProductService} from "@/lib/services";
```

### Call Service Methods

```typescript
// Login
const loginData = await AuthService.login({
  email: "user@example.com",
  password: "password123",
});

// Get users
const users = await UserService.getUsers();

// Create product
const product = await ProductService.createProduct({
  code: "P001",
  name: "Product Name",
  price: 100000,
});
```

### With React Query

```typescript
import {useQuery, useMutation} from "@tanstack/react-query";
import {ProductService} from "@/lib/services";

// Query
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
  });
}

// Mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) =>
      ProductService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["products"]});
    },
  });
}
```

## How to Create New Service

### 1. Create Service File

Create `lib/services/order.service.ts`:

```typescript
import { BaseService } from "./base.service";

// Define types
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  total: number;
  status: string;
}

export interface CreateOrderRequest {
  customerId: string;
  items: OrderItem[];
}

// Create service class
class OrderServiceClass extends BaseService {
  async getOrders(): Promise<Order[]> {
    return this.get<Order[]>("/orders");
  }

  async getOrderById(id: string): Promise<Order> {
    return this.get<Order>(\`/orders/\${id}\`);
  }

  async createOrder(data: CreateOrderRequest): Promise<Order> {
    return this.post<Order>("/orders", data);
  }

  async updateOrder(id: string, data: UpdateOrderRequest): Promise<Order> {
    return this.put<Order>(\`/orders/\${id}\`, data);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.delete<void>(\`/orders/\${id}\`);
  }
}

// Export singleton instance
export const OrderService = new OrderServiceClass();
```

### 2. Export in Index

Update `lib/services/index.ts`:

```typescript
export {OrderService} from "./order.service";
export type {Order, CreateOrderRequest} from "./order.service";
```

### 3. Use in Component

```typescript
import {OrderService} from "@/lib/services";

const orders = await OrderService.getOrders();
```

## Benefits

✅ **Singleton Pattern** - Service instance dibuat sekali, reuse di seluruh app
✅ **Type-Safe** - Full TypeScript support
✅ **Organized** - API calls dikelompokkan berdasarkan domain
✅ **DRY** - Inherit dari BaseService, no code duplication
✅ **Easy to Use** - Direct call: `AuthService.login()` tanpa `new`
✅ **Testable** - Easy to mock untuk testing

## Best Practices

1. **Group by Domain** - Satu service per domain (Auth, User, Product, Order, dll)
2. **Type Everything** - Selalu define request/response types
3. **Consistent Naming** - Gunakan verb + noun (getUsers, createProduct, updateOrder)
4. **Error Handling** - Let service throw errors, handle di component/query
5. **Single Responsibility** - Satu method untuk satu API endpoint
