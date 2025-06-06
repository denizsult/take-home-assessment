// Common Types
export type ResourceId = string;

export type SortDirection = 'asc' | 'desc';

 
export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

// User Types
export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: ResourceId;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

// Order Types
export type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: ResourceId;
  orderNumber: string;
  customer: string;
  status: OrderStatus;
  orderDate: string;
  total: number;
}