import { User, Order } from "./types";

// Sample users data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "editor",
    isActive: true,
    createdAt: "2025-01-02T11:00:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "viewer",
    isActive: false,
    createdAt: "2025-01-03T12:00:00Z",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "editor",
    isActive: true,
    createdAt: "2025-01-04T13:00:00Z",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "viewer",
    isActive: true,
    createdAt: "2025-01-05T14:00:00Z",
  },

  {
    id: "6",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "7",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },

  {
    id: "8",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "9",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "10",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "11",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  },
  
];

// Sample orders data
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "John Doe",
    status: "pending",
    total: 99.99,
    createdAt: "2025-03-01T10:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    status: "pending",
    total: 149.99,
    createdAt: "2025-03-02T11:00:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: "Bob Johnson",
    status: "cancelled",
    total: 199.99,
    createdAt: "2025-03-03T12:00:00Z",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: "Alice Brown",
    status: "cancelled",
    total: 79.99,
    createdAt: "2025-03-04T13:00:00Z",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: "Charlie Wilson",
    status: "shipped",
    total: 299.99,
    createdAt: "2025-03-05T14:00:00Z",
  },
];
